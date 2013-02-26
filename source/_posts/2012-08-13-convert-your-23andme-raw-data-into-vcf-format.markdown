---
layout: post
title: "Convert your 23andme raw data into VCF format"
date: 2012-08-13 18:36
comments: true
categories: [ bioinformatics, github ]
---

A week ago I received my results from [23andme.com] [0]. Aside from the obvious points of interest, health risks, heritage, neanderthal composition, etc., I was also interested in getting my own data in raw format. While 23andme does provide a way to download your "raw" data, they are not really providing raw data. One cannot access the image data from the microarray sequencer that they used. What they do provide is formatted as follows:

{% codeblock %}
# rsid  chromosome  position    genotype
rs4477212   1   82154   TT
rs3094315   1   752566  TC
rs3131972   1   752721  AA
rs12124819  1   776546  AC
rs11240777  1   798959  GA
rs6681049   1   800007  CC
{% endcodeblock %}

<!-- more -->

Rows that begin with a '#' are header rows, of which, there may be as many as you please. 23andme puts some data in here, like which reference the coordinates are based on. This is an interesting topic as the build being used has just recently changed from hg18 to hg19. If you downloaded your raw data before August 9, 2012, you have hg18, after, and you have hg19. However, someone forgot to update the header to reflect this, so it still reads "build36". 

The rsid column is a unique identifier for reference SNP identifier from [dbSNP] [1]. These identifiers were more useful before the completion of the human genome project, as there was no coordinate system capable of resolving the locations of these various SNP's. Now it is possible to address them like you might address a house, with the State or City being analogous to the chromosome and the street address being analogous to the "position". The position is the number of bases from the beginning of the chromosome that a SNP is located at. 

The final column is the genotype at the listed address. There are two bases listed because humans have two copies of each chromosome.

VCF Format
----------
So this leaves us with a list of addresses. This is well and good, but many bioinformatics applications use a different format, not all that different, called the ["Variant Call Format"] [2]. Specifically, a tool for predicting the biological effects of mutations (bases different than the reference bases), uses the VCF format. It is [snpEff] [3], or SNP effect predictor. 

In order to facilitate the use of the various and sundry tools that use the VCF format, I have made a tool for converting the 23andme raw format to VCF. It is the [23andme2vcf converter] [4]. In order to use it, follow these steps:

{% codeblock %}
git clone git://github.com/arrogantrobot/23andme2vcf.git
cd 23andme2vcf
perl 23andme2vcf.pl /path/to/23andme/raw/data.zip /desired/path/to/output.vcf
{% endcodeblock %}

If you do not use git, you may download the tarball from [github] [5], unpack it, and run line 3 of the above commands.

[0]: http://www.23andme.com "23andme.com"
[1]: http://www.ncbi.nlm.nih.gov/SNP/get_html.cgi?whichHtml=how_to_submit#REFSNP "dbSNP"
[2]: http://www.1000genomes.org/wiki/Analysis/Variant%20Call%20Format/vcf-variant-call-format-version-41 "VCF format"
[3]: http://snpeff.sourceforge.net/ "snpEff"
[4]: https://github.com/arrogantrobot/23andme2vcf "23andme2vcf converter"
[5]: https://github.com/arrogantrobot/23andme2vcf/tarball/master "23andme2vcf converter tarball"
