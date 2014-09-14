---
layout: post
title: "BioWordCount: An Intro To Bioinformatics on Apache Spark"
date: 2014-09-07 18:48
comments: true
categories: [ bioinformatics, spark, hadoop, bigdata ]
---

Previously on [archetyp.al][2], I demonstrated a [bioinformatics use for Hadoop MapReduce][0]. The idea was to build on the ubiquitous word count example, but using a problem which is at least somewhat relevant to bioinformatics. So I read in a VCF file and parsed out the reference and the variant bases, and collected an overall count of the mutation spectrum. So here we are, back at it with an [Apache Spark][1] version of the demo.

Why Spark? There are a lot of reasons to go with Spark instead of MapReduce, but for me the most convincing reason is time. In this case the MapReduce solution written in Java takes north of 100 lines of code to set up. Granted, some of that is taken up parsing VCF lines for details which go unused, but 100 is a fair count. Now have a look at the Spark solution:

``` scala BioWordCountSpark.scala https://github.com/plantimals/BioWordCountSpark/blob/master/src/main/scala/al/archetyp/biowordcount/BioWordCountSpark.scala link to github
import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._
import org.apache.spark.SparkConf

object BioWordCountSpark {
  def main(args:Array[String]){
    val sc = new SparkContext(new SparkConf().setAppName("BioWordCount-Spark"))
    val file = sc.textFile(args(0))
    val rows = file.filter(!_.startsWith("#"))
    val refVar = rows.map(_.split("\t").drop(3).take(2))
    val refVarNoIndel = refVar.filter(refvar => (refvar(0).length() == 1) && (refvar(1).length() == 1))
    val answer = refVarNoIndel.map(data => (data(0)+" -> "+data(1) -> 1)).reduceByKey(_ + _)
    answer.sortByKey().saveAsTextFile("answer")
  }
}
```

What is this code doing? If you are familiar with Scala, it accomplishes what it looks like it's doing, but via different means. Start out defining a singleton object which contains the main function to be invoked upon execution. The ```SparkContext``` object is used to set up the Spark job. Then the input file is loaded from the first command line parameter, ```arg(0)```. All header lines, those which begin with a '#' are filtered. 

The ```refVar = ...``` line is where I drop the first three columns and take only the next 2 columns, which are the "reference" and "variant" columns, respectively. I feel like there's a better way to select arbitrary columns to keep than the take/drop combination. If you have a suggestion, please leave a comment. Then the collection of ref and variant columns is filtered for length == 1, because we want to remove any indels or structural variants.

Line 12 is really where the magic happens. This is the step that is explicitly a MapReduce operation. The map function is provided a [lambda (or anonymous function)][6], which is run on each member of the ```refVarNoIndel``` collection. This lambda function simply concatenates the two columns, ref and var, into a single string "ref -> var" and then constructs a tuple with that string as the first value, and the number 1 as the second value.

Then, following immediately after the map operation, and on the same line no less, is the ```reduceByKey``` function. For those unfamiliar with Scala, the odd looking lambda, ```(_ + _)``` is shorthand for ```(a, b => (a + b))```. This defines how the reduce function combines the values it receives from the map function, it adds each data point to a running total by key, and returns a list of those keys and their respective totals.

Line 13 then sorts the results and pushes them out to the ```./answer``` directory.

And that's pretty much everything. There's a an sbt file, which I lifted straight from the [spark wordcount example][3]. In fact, this whole demo is really an adaptation of the afore mentioned Spark demo, with a slightly different example problem.

In order to set this all up, create a folder to work in. Create a file named ```build.sbt``` in the root of your project and paste in the sbt outline from the Spark wordcount example:

``` scala build.sbt
name := "BioWordCount-Spark"
version := "1.0"
scalaVersion := "2.10.4"
libraryDependencies += "org.apache.spark" %% "spark-core" % "1.0.2"
resolvers += "Akka Repository" at "http://repo.akka.io/releases/"
```

With the sbt file out of the way, let's create the proper spot for the source file ```mkdir -p src/main/scala/al/archetyp/biowordcount```. The source file ```BioWordCountSpark.scala``` belongs in the biowordcount directory.

From the root directory of the project, run ```sbt package```. You should see the source file get compiled, and a jar created under ```./target```.

The application should now be compiled and packaged up for usage. Let's look for a tasty VCF to crunch with our new Spark app. I went to [1000genomes.org][5] and dug up a VCF containing only variants from human chromosome 22, the shortest autosomal contig. You can find the exact file I used [here][4]. Once unzipped, the file is 10GB, with over 1,000,000 lines. There are over 2000 samples in this VCF, which means each row has more than 2000 columns. I used the following spark-submit command to run the app on this VCF file:

``` bash spark-submit command
time /Users/rob/bin/spark/spark-1.0.2-bin-hadoop2/bin/spark-submit \
--class "BioWordCountSpark" \
--master local[4] \
target/scala-2.10/biowordcount-spark_2.10-1.0.jar \
/Users/rob/Downloads/vcf/ALL.chr22.phase3_shapeit2_mvncall_integrated_v4.20130502.genotypes.vcf
```

Your paths will vary, especially the location of the spark-submit bin and the vcf file to be counted. The "master" portion of the command directs spark to run this app locally, using as many as 4 cores. If you have a cluster, perhaps on aws, the ```--master``` argument should be replaced with the url of the Spark master.

Here follows my resuling count for the 1000genomes VCF:
``` bash output
cat ./answer/*
(A -> C,31555)
(A -> G,119609)
(A -> T,27133)
(C -> A,46771)
(C -> G,49737)
(C -> T,253419)
(G -> A,254137)
(G -> C,49410)
(G -> T,47227)
(T -> A,26446)
(T -> C,118881)
(T -> G,31131)
```

When running the app locally on my 2014 Macbook Pro with four cores, it was able to complete within 1 minute and 1 second. The OSX kernel may have cached some of the data, as I did run this command several times, with slight improvements each time. However, for processing a 10GB file with 1 million rows, and over 2000 columns, 1 minute is pretty good. Just to see how this approach stacks up against a python script, I decided to solve the same problem in python. I know that the real benefit to Spark comes when you are running on a multinode cluster, but I was sufficiently impressed with this performance that I wanted to get an idea how long it would take for python to do something similar. Here's my python solution:

``` python biowordcount.py https://github.com/plantimals/BioWordCountSpark/blob/master/src/main/python/biowordcount.py
#!/usr/bin/env python

import sys

count = {}
with open(sys.argv[1], 'r') as fh:
  for l in fh:
    if l[0] == "#":
      continue
    cols = l.strip().split("\t")
    ref = cols[3]
    var = cols[4]
    if len(ref) == 1 and len(var) == 1:
      key = "{0} -> {1}".format(ref,var)
      if count.get(key, -1) == -1:
        count[key] = 1
      else:
        count[key] += 1

for k in count:
  print "({0},{1})".format(k, count[k])
```

When running the above python script on the same vcf, the running time was 1 minute and 40 seconds, reliably. So the speed up is not that amazing. I grabbed larger VCF, this time [chromosome 1 from 1000 genomes][5], which is 61GB when unzipped. The Spark solution took 5 minutes and 50 seconds, while the python solution took 12 minutes and 5 seconds. 

Not only is the Spark code faster to write (once you understand the basics), but it actually runs faster. Turn around times on test rus are reduced when the app itself runs faster. It is not unreasonable to assume that code which can be written so much faster and in so many fewer lines will be much easier to read and understand. The density of Scala allows the reader to see and understand larger swaths of the code with in the space of a glance. I'm lookging forward to exploring the Spark ecosystem further.


[0]: http://archetyp.al/blog/2014/05/05/biowordcount-a-brief-introduction-to-hadoop-for-the-bioinformatics-practicioner/ "previous archetyp.al post on hadoop mapreduce" 
[1]: http://spark.apache.org/ "Apache Spark Homepage"
[2]: http://archetyp.al "archetyp.al homepage"
[3]: http://spark.apache.org/docs/latest/quick-start.html#standalone-applications "spark standalone apps"
[4]: ftp://ftp-trace.ncbi.nih.gov/1000genomes/ftp/release/20130502/ALL.chr22.phase3_shapeit2_mvncall_integrated_v4.20130502.genotypes.vcf.gz "1000 genomes VCF chr22 download"
[5]: ftp://ftp-trace.ncbi.nih.gov/1000genomes/ftp/release/20130502/ALL.chr1.phase3_shapeit2_mvncall_integrated_v4.20130502.genotypes.vcf.gz "100 genomes VCF chr1 download"
[6]: http://docs.scala-lang.org/tutorials/tour/anonymous-function-syntax.html "lambdas or anonymous functions"
