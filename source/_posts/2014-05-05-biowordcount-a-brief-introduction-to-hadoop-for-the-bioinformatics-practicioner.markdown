---
layout: post
title: "BioWordCount: A Brief Introduction to Hadoop For The Bioinformatics Practitioner"
date: 2014-05-05 22:09
comments: true
categories: [ bioinformatics, hadoop, bigdata ]
---

Many people who do bioinformatics (the field seems to have settled on "bioinformatician", but I like "bioinformaticist" better) find themselves dealing with large data sets and long running processes, arranged in myriad pipelines. In our time, this inevitably demands distributed computing. Life innovated during the [Cambrian explosion][0] by going from single cells to colonies of cells. Life found a way to distribute and parallelize its processes. In order for us to properly focus our analytical microscopes on life, we imitate life in this strategy and distribute our processes across multiple CPU's.

There are many strategies for distributing computation across multiple cores, processors, or physical computers, but this writeup will only cover the solutions provided by the [Hadoop][1] ecosystem, as packaged by [Cloudera][2]. It is the case that as it is widely used now, the Hadoop system of distributed computation and storage does not provide the best solution for long running computations that input or output little data. Even tasks which do use lots of data like sequence alignment, can resist parallelization such that the benefits of Hadoop are negated. Hadoop shines when inputs and or outputs are large in scale, but made of many independent records. Why is this?

Hadoop is a series of services, which when taken together, provide an environment for distributed computation. Each computer in a Hadoop cluster is referred to as a node. A Hadoop environment contains one or more nodes. The majority of the nodes in a multi-node cluster are known as "DataNodes", which store the data and do most of the computation. There are usually at least "NameNodes", which serve to maintain the state of the Hadoop distributed filesystem, but not the contents of any of the files on that filesystem, just the directory structure and the locations of the blocks that make up the files in it.

The Hadoop Ecosystem
--------------------
HDFS is the conceptual core of Hadoop. This is the part that, once understood, can unlock one's view of the whole picture. The key concept is that instead of pushing data to where computations are happening, the computation is pushed to where the data lives. A good example of this is [Platform LSF][3] or [Sun Grid Engine][4], where the state of the art is to have NFS mounts on your compute nodes, such that when a job lands on that node, it then fetches the required inputs over the network, then does computation on them. Hadoop inverts this order of things by breaking each file up into chunks, default chunk size is 64MB, and distributing these chunks to the DataNodes. The NameNodes track which DataNode has which chunk of which file.

In order to do some computation on those distributed chunks, the MapReduce paradigm enters the picture. When computation needs to be done on a particular file, the required executables (jar files in this case) are sent to those DataNodes hosting at least one chunk of the file. The results of these computations are then gathered in HDFS, and potentially grouped by some key value. This is why large files, containing millions of small, homogeneous records are best for this paradigm. Each chunk is processed, line by line, with the results being aggregated for the whole.

From these two components, HDFS and MapReduce, the other services can be inferred or constructed. There is a distributed column-store database called [HBase][5], there is a workflow manager called [Oozie][6], there is an indexer/search service provided by [SolrCloud][7]. 

It is doubtful that any bioinformatics shop will entirely rely on Hadoop for all its distributed computing needs. It's more and more plausible every day, with projects like [Crossbow, for bowtie alignment][8] and [Contrail for assembly][9]. But in order to really learn how Hadoop works, I suggest an example problem. 

I have selected the problem of calculating the mutational spectrum, as it is trivial to understand the mechanics of, is somewhat biologically relevant, and mimics exactly the flow of the classic [Word Count MapReduce example][10].

In short, [mutational spectrum][11] is rate at which different types of mutations occur. Transitions are changes from a pyramidine base to another pyramidine, or a purine to another purine. A transversion is the substitution of a purine for a pyramidine, or vice versa.

My goal will be to generate a list of mutations, ```A -> C```, ```A -> G```, etc, with the associated number of occurences in a VCF file. The result will be several lines of text output.

BioWordCount: The MapReduce Job
-------------------------------

The task of parsing each line of the VCF will be accomplished by a mapreduce job, which will be fed from an input in HDFS, and output an answer to HDFS as well. Begin by creating an empty maven project. There is an excellent tutorial on [how to generate an empty maven project with the hadoop libraries at Cloudera's website][12]. Follow this, and you will end up with a project ready for our java files. Begin in the ```src/main/java/al/archetyp/biowordcount``` directory, replacing the archetyp.al namespace for one of your choosing (preferably the one you used when creating your project).

The first class we create will be the BioWordCount class, which will hold both our mapper and reducer class. For a project of any size, the practice of putting the mapper and reducer in the same class that contains our Main, would be unwise. However, my goal with this demo is to push the complexity down low enough that one can concentrate purely on what mapreduce is and how one might use it.

The mapper class will look like this:

``` java BioWordCount https://github.com/plantimals/biowordcount/blob/master/src/main/java/al/archetyp/biowordcount/BioWordCount.java link to github
public static class Map extends Mapper<LongWritable, Text, Text, IntWritable> {
    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        if(value.toString().startsWith("#")) return;
        VcfLine vcfLine = new VcfLine(value.toString());
        for(String titv : vcfLine.getTiTv()) {
            word.set(titv);
            context.write(word, one);
        }
    }
}
```
The four type parameters to the Mapper class that we extend are important. The first type, LongWritable, describes the type of the input key, in this case it will be an offset into the file, a line number. The second type is the value of the input. Text is a Hadoop specific type for passing around lines of text from a file. The next two types are the key and value types of the output of the mapper. For the purposes of the biowordcount app, the text  key will be something like "A -> C" and the value, the IntWritable, will always be one, as each line that is processed will only yield a single transition or transversion.

Very simply, for each line of our input file, in this case [a VCF][13], the ```void map(...)``` function above will be called. The magic of hadoop is that it doesn't matter if that VCF is 100 lines long or 100 million lines long. This class will be distributed to each node where a portion of the file is stored and executed on the lines of the file contained therein. 

Each line of the header is skipped by simply returning without writing something to the output context if the line received starts with ```#```. Then we see a helper class I created for this project to contain the parsing of VCF lines. The relevant parts of the VcfLine class are:

``` java VcfLine https://github.com/plantimals/biowordcount/blob/master/src/main/java/al/archetyp/biowordcount/VcfLine.java link to github
public VcfLine(String line) {
    StringTokenizer tokenizer = new StringTokenizer(line);
    List<String> vcfFields = new ArrayList<String>();
    while (tokenizer.hasMoreTokens()) {
        vcfFields.add(tokenizer.nextToken());
    }
    setChrom(vcfFields.get(0));
    setPos(new Long(vcfFields.get(1)));
    setRef(vcfFields.get(3));
    alts = new ArrayList<String>(Arrays.asList(vcfFields.get(4).split(",")));
    isIndel = line.contains("INDEL");
}

public List<String> getTiTv() {
    List<String> answer = new ArrayList<String>();
    if (isIndel()) {
        return answer;
    }
    for (String alt : getAlts()) {
        answer.add(getRef()+" -> "+alt);
    }
    return answer;
} 
```

The constructor method pulls in a row from a VCF file and parses out each column so we can interrogate the variant in our mapper, finding which [transition][14] and or [transversion][15] to report. Returning to the Map class, each single nucleotide variation (SNV) is written to the context. This is where the magic happens. We are writing a key/value pair. In this example, the key is the mutation type, "A -> C" for example, and the value will be one. The value is meant to represent a count of the mutations enountered that match the value.

At this point, each SNV is represented as a key value pair in flight between the mapper and the reducer. The ```void reduce()``` method of the reducer class will receive a collection containing all those key/value pairs with identical keys. For the purpose of counting the number of like mutations, these collections will be iterated over and summed up, providing a total count of the number of each mutation type. 

``` java BioWordCount https://github.com/plantimals/biowordcount/blob/master/src/main/java/al/archetyp/biowordcount/BioWordCount.java link to github

public static class Reduce extends Reducer<Text, IntWritable, Text, IntWritable> {

    public void reduce(Text key, Iterable<IntWritable> values, Context context)
            throws IOException, InterruptedException {
        int sum = 0;
        for (IntWritable val : values) {
            sum += val.get();
        }
        context.write(key, new IntWritable(sum));
    }
}
```
The last line of the ```void reduce()``` function is vital, this is where the aggregated results are written out to the output directory. In order to inspect the complete project with the setup code, the mapper and reduce, along with the VCF parser, [have a look at the github repo][16].

Compile and Run
---------------

Once these components are all put together, go to the root of the project folder where the ```pom.xml``` file lives. From here, run the command ```mvn install```. This will run for a little while, compiling your java into bytecode and packaging everything into a jar, which should land in the ```target``` subdirectory. This jar is what will need to be sent into the Cloudera VM in order to run the job.

### The Cloudera VM


In order to encapsulate the complexity of installing the Hadoop components on your dev machine, grab the [Cloudera QuickStart Vm (CDH 4.6)][17], and download it. I am using Virtual Box, but they also provide vmware and KVM versions of the virtual machine, if those suit your setup better. Cloudera also includes some parts of their own making, like Cloudera Manager, which similarly wraps the complexity of administering the services of hadoop. So all you have to do in order to start using these services, is download the vm and start it up. This step saves hours, if not days, of setup time.

Once you have downloaded the VM and started it, go dig around. It should start up with firefox open to a page that links you to Cloudera Manager. Go to CM and click on the "services" menu on the toolbar at the top, then select "all services". It is possible to stop, start, and restart all the services here. For our purposes, you will need to start, in this order, zookeeper, hdfs, and mapreduce. 

I chose to create a shared directory to transfer data and jars between the host system and the guest Cloudera VM. Once the VM is setup and the shared directory created and used, or the jar and vcf data have been scp'd into the guest machine, it is time to run the compiled jar. Once the jar and source data are on the VM, open a terminal or ssh into the VM. The first step to running this example will be to put the source data into HDFS, so that it will be available when the mapreduce job is executed. ```hadoop fs -mkdir data``` then ```hadoop fs -put data/mydata.vcf``` and ```hadoop fs -mkdir output``` should do the trick. Then execute the job by running the command:

```
hadoop jar BioWordCount.jar al.archetyp.biowordcount.BioWordCount /user/cloudera/data/mydata.vcf /user/cloudera/output
```

At this point, the jar is sent to those nodes that hold chunks of mydata.vcf. Those nodes then run the various compoenents of the mapreduce process and the final result is deposited in /user/cloudera/output. This can be accessed by the command ```hadoop fs -cat /user/cloudera/output/part-r-00000```, which should produce similar results to those shown below.

Here's what the results look like.

```
A -> .	78509
A -> C	14752
A -> G	62310
A -> T	610
C -> .	96966
C -> A	14675
C -> G	989
C -> T	62729
G -> .	96803
G -> A	63172
G -> C	795
G -> T	14519
T -> .	79135
T -> A	696
T -> C	62786
T -> G	14491
a -> .	33572
a -> C	6954
a -> G	29519
a -> T	107
c -> .	38822
c -> A	6981
c -> G	172
c -> T	29764
g -> .	38282
g -> A	29399
g -> C	151
g -> T	7010
t -> .	33106
t -> A	113
t -> C	29760
t -> G	6951
```

The sum total of sites is 954600, which matches exactly the number of non-header lines in the input VCF. While this does not prove the correctness of this approach, it certainly suggests that there are no gross errors where data is added or lost. It's always a good idea to look for ways to check your thinking at each stage of the process. Disproving assumptions can be difficult, but is more likely to result in good work. 

I decided to leave in those sites that did not contain variants, ```X -> .```, so that the information would be present in the results. Again, the right course of action always depends upon the context, but I do like to leave in as much data as possible as far into the process as possible, so that the user can decide if it is relevant or not. There are different records for cases where the reference was a capital letter and when the reference was lower case. This is also information I decided to leave in the results. A lowercase letter represents a reference of the genome which lies in the repeatmaker regions, or regions of low complexity.

I used my own data for this project, which was obtained from [23andme][18] in the raw format and then converted to VCF via the [23andme2vcf conversion script described here][19].

Conclusion
----------

Do what thou wilt. As mentioned above, bioinformatics as a field is fairly young, and bioinformatics on Hadoop is even younger. The distributed, mapreduce paradigm is a valuable tool. It is not the only tool, but let's not allow the fact that it doesn't do everything get in the way of letting Hadoop do something, those things that it does well. With the development of more frameworks and tools for Bioinformatics on Hadoop, more adoption will be possible and it will grow.

[0]: https://en.wikipedia.org/wiki/Cambrian_explosion "Cambrian Explosion"
[1]: https://hadoop.apache.org/ "Hadoop"
[2]: http://www.cloudera.com/content/cloudera/en/home.html "Cloudera"
[3]: http://www-03.ibm.com/systems/technicalcomputing/platformcomputing/products/lsf/ "Platform LSF"
[4]: https://en.wikipedia.org/wiki/Oracle_Grid_Engine "Sun Grid Engine"
[5]: https://hbase.apache.org/ "HBase"
[6]: https://oozie.apache.org/ "Oozie"
[7]: https://cwiki.apache.org/confluence/display/solr/SolrCloud "SolrCloud"
[8]: http://bowtie-bio.sourceforge.net/crossbow/index.shtml "Crossbow"
[9]: http://sourceforge.net/apps/mediawiki/contrail-bio/index.php?title=Contrail "Contrail"
[10]: https://hadoop.apache.org/docs/r1.2.1/mapred_tutorial.html "WordCount tutorial"
[11]: https://en.wikipedia.org/wiki/Mutation_rate#Mutational_spectrum "Mutational Spectrum"
[12]: http://blog.cloudera.com/blog/2012/08/developing-cdh-applications-with-maven-and-eclipse/ "maven tutorial"
[13]: http://www.1000genomes.org/wiki/Analysis/Variant%20Call%20Format/vcf-variant-call-format-version-41 "VCF format"
[14]: https://en.wikipedia.org/wiki/Transition_(genetics) "transition"
[15]: https://en.wikipedia.org/wiki/Transversion "transversion"
[16]: https://github.com/plantimals/biowordcount "BioWordCount github"
[17]: http://www.cloudera.com/content/support/en/downloads/download-components/download-products.html?productID=F6mO278Rvo&version=2 "Cloudera VM"
[18]: https://www.23andme.com/ "23andme"
[19]: http://archetyp.al/blog/2012/08/13/convert-your-23andme-raw-data-into-vcf-format/ "23andme2vcf archetyp.al"
