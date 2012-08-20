---
layout: post
title: "Iterated Prisoner's Dilemma"
date: 2012-08-19 17:55
comments: true
categories: 
---

I recently decided to re-read a book I had read long ago, in order that I might filter it through the knowledge and experience I've accrued since I first read it. It occurred to me that so much of what I have done in the intervening years has an impact on my understanding of it, that I could scarcely hold a conversation with my past self on the topic. The book in question is [The Selfish Gene] [0] by [Richard Dawkins] [1].

Dawkins' main point in the book is his thesis that species are not the salient unit of evolution, nor are individuals. The indivisible atomic unit of evolution, according to Dawkins, is the gene. The term "gene" has taken on a very specific technical meaning, that of a single stretch of DNA which can [transcribed] [2] into [RNA] [3], then [translated] [4] into a protein. However, Dawkins explains that his intent is to refer to the minimum stretch of DNA required to encode a [phenotype] [5]. One of the consequences of Dawkins' view on the topic of evolution is that the biological units we think of as individuals, i.e. a specific instance of a species, are actually vehicles manifested by genes in order to further replicate themselves.

Upon initial inspection, this idea seems obvious. This sense of "obviousness" is how to detect a remarkably good idea. While it may seem obvious, there must have been some individual to point it out to everyone else first, and this case, it was Dawkins. The best analogy I can make is that of Darwinian Evolution. It seems so painfully obvious, yet it took tens of thousands of years, so far as we know, for humans to produce this idea.

Indeed, as I read The Selfish Gene once more, I found myself totally engrossed in it. Each chapter is well constructed as an efficient implement to ram home the message of its author. One chapter in particular caught my attention this time around: "Nice Guys Finish First". This is the chapter in which some of the game-theoretic ideas behind the Selfish Gene theory are elucidated via the example of [Iterated Prisoner's Dilemma] [6].

The singleton version, simply Prisoner's Dilemma, is a [2x2 game] [7], where there are only two players, with each player simultaneously playing one of two strategies. In this case, the two available strategies are cooperation and defection. If both players cooperate, they both receive a reward, 3 points. If one player chooses cooperation and one chooses defection, the cooperator receives zero points and the defector receives 5 points. If both defect, both players receive 1 point. So in the singleton version of the game, the rational actor with always choose defection. However, if the game is played multiple times between the same two players, a channel of communication is opened which can allow coordination, along with deception. If both players cooperate, the highest total points will be generated, as _3 + 3 > 5 + 0_.

The discussion of the various strategies goes on at length in [The Selfish Gene] [0], and is recapped somewhat in a very interesting [episode of Radiolab] [8]. I was inspired by the discussion to implement my own instance of [iterated prisoner's dilemma in java] [9].

I am still in the early phases of this development. I have roughed in the classes for players and made two example strategies. One is the "Random" strategy which simply flips a coin each time and goes with that. I also implemented a widely discussed strategy called "Tit for Tat" which starts out cooperating, but will mirror the other player's last play after the first. So if two T.F.T players meet, they will sail through, cooperating the whole way. If you would like to add a strategy, please do so! Here is my Tit for Tat implementation:

{% codeblock Tit for Tat Strategy lang:java http://github.com/arrogantrobot/iterated-prisoners-dilemma/blob/master/iterated-prisoners-dilemma/src/main/java/com/farawaylabs/ipd/TitForTat.java TitForTat.java %}
package com.farawaylabs.ipd;

class TitForTat extends Player {

    private boolean lastPlay = true;

    public TitForTat() {}

    @Override
    public boolean getPlay() {return this.lastPlay;}

    @Override
    public void result(boolean result) {this.lastPlay = result;}

    public String getPlayerName() {return "TitForTat";}
}

{% endcodeblock %}

The _getPlay()_ method returns a boolean, with _true_ being cooperation and _false_ being defection. The _result()_ method gets called after each round, feeding the other player's choice back to the agent, just in case it needs to do something with this, as Tit for Tat does. The _getPlayerName()_ returns a string naming the strategy.


[0]: http://www.amazon.com/gp/product/B000SEHIG2/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000SEHIG2&linkCode=as2&tag=archetypal-20 "The Selfish Gene, by Richard Dawkins"
[1]: http://en.wikipedia.org/wiki/Richard_Dawkins "Richard Dawkins"
[2]: http://en.wikipedia.org/wiki/Transcription_(genetics) "transcription"
[3]: http://en.wikipedia.org/wiki/Transcription_(genetics) "RNA"
[4]: http://en.wikipedia.org/wiki/Translation_(biology) "translation"
[5]: http://en.wikipedia.org/wiki/Phenotype "phenotype"
[6]: http://en.wikipedia.org/wiki/Prisoner%27s_dilemma#The_iterated_prisoners.27_dilemma "Iterated Prisoner's Dilemma"
[7]: http://en.wikipedia.org/wiki/Symmetric_game#Symmetry_in_2x2_games "2x2 games"
[8]: http://www.radiolab.org/blogs/radiolab-blogland/2010/dec/14/prisoners-dilemma/ "radiolab"
[9]: https://github.com/arrogantrobot/iterated-prisoners-dilemma "ipd"
