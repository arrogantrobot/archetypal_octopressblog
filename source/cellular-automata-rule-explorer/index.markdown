---
layout: page
title: "cellular-automata-rule-explorer"
date: 2012-07-08 15:57
comments: true
sharing: true
footer: true
---

{% img /images/ca_image_2.png cellular automata art %}

A much more in-depth explanation of [cellular automata][0] can be obtained from other, more eloquent sources. A particularly comprehensive and eloquent source can be found in [A New Kind of Science][1] by Stephen Wolfram. In brief, a cellular automaton (singular) is a system composed of multiple discrete units called cells. These units each maintain some form of internal state. This state is changed by the operating rules and the current state of the cell, along with the states of the neighboring cells, over some discrete time steps. 

##One Dimensional Cellular Automata

In a one-dimensional cellular automaton, the constituent cells are aligned in a linear fashion. This is, each cell has at most two neighbors, a right and a left neighbor. 

{% img /images/one_dimensional_ca.png one dimensional cellular automata %}

In the above example, cell B has two neighbors, cells A and C. So cell B's state at time _t_ will depend entirely upon the state of B at time _t - 1_ and the states of A and C at time _t - 1_.

An interesting effect occurs when the history of cell states is made visible over time. In the [cellular automata explorer][2], I have implemented just such a view. There is a single line of cells in this one-dimensional automaton. It lives at the top of the screen and pushes its old states, in the form of black and white pixels (one pixel per cell), down and off the screen. The pattern grows like a fingernail out of this line of cells. Initially there is one cell set to "on" in the middle of the screen. As the history builds up, a [pattern emerges][3] from the interaction of the individual cells, mediated by the rule, which is 129 by default.

##An Archetypical Programming Project

In the process of learning to program GUI applications on Linux, I decided to implement the Wolfram style one-dimensional cellular automaton. In the process of implementing this application, I had to use data structures and algorithms from the Standard Template Library, API calls from the GTK framework, and implement classes to support the cells in their neighborhoods. None of these activities represent any unique works on my part, but do form the ideal pattern of use for how to learn a programming environment. I had to learn about graphics, loading, manipulating, and displaying bitmaps, concepts like double buffering, and in order to get things running at an appropriate speed, various debugging and profiling techniques. 

Since the original implementation, I have implemented the one-dimensional cellular automaton repeatedly on multiple platforms. 

###C++ / GTK

This implementation can be found on github under the name [Cellular-Automata-Rule-Explorer][4]. Aside from being the first implementation of this project, the C++/GTK version has some unique features.

There is an automated image capture feature which allows the user to automatically save the contents of the output to a png file on the file-system. This was triggered to happen each time a full screen of output had passed. This gives the ability to stitch together one continuous image showing the progress of the automaton over even a larger period of time than is possible in the program's typical output. I refer to these longer images as [tapestries][5].

A mechanism to vary the rules over time, without human intervention, was also added to this iteration of the project. The user may create a list of rules from which the program will randomly select at random intervals. This has the effect of producing a continuous stream of novel images, all containing rhyming motifs, resulting from applying the same rules repeatedly, to unique input configurations.

###Javascript

The javascript implementation takes the form of a [web app][2]. The page is outlined by an html file, styled by a css file, and animated by the javascript portion of the project. This version of the web app accomplishes double buffering by using two canvas elements which are alternately hidden and shown. The old lines are copied and translated down one pixel to the hidden canvas, and the new line as drawn at the top. When this is completed, the shown canvas is hidden and the hidden show, effectively flipping the buffers. The source repository can be found on github under the name [Celluar-Automata-Explorer][6].

Upon the initial completion of the javascript cellular automata project, I [posted it to reddit.com/r/math][7] for comments and suggestions, some of which were incorporated into the project.

###Android

The latest iteration of the one-dimensional cellular automaton project is on the Android platform. I have two projects under way which are both incomplete. The first is an app which implements the now typical rule explorer behavior, start/stop, change rules, save the screen to an image file, etc. This version also provides the ability to set the current image as a wallpaper or to share the current image to any services that accept image sharing on the android, including but not limited to gmail, google plus, MMS, and twitter. This project is currently stalled while some threading issues are wrung out.

The second variety of Android app is a live wallpaper. This was implemented in a similar way to the continuously changing rules of the original C++/GTK app. There is a pre-set list of rules which were determined by trial and error to produce interesting and long-lived images when employed together. At a random time interval, a new rule is chosen from this list. A new feature was added to allow a wider selection of rules to be included. This feature also solves a problem that arose in the older version, the death of the automaton. 

The metaphor of death is appropriate for this phenomenon. For when the states of all the cells in the automaton are identical, no more patterns may emerge. The only possible changes are entire rows of all black or all white. While there may be some oscillation between these two states depending upon the current rule, no columnar variation will ever be re-introduced. 

So in order to re-animate the automaton, a watcher is placed in the program loop. This watcher is looking for cell uniformity. When all cells are on or all cells are off, the watcher randomly chooses to re-seed the automaton with either a single variant cell in the center of the linear array of cells, or to visit each cell, with a 0.5 probability of turning each cell on. So when the automaton does die, it is immediately re-seeded with life, and the patterns can continue.

[0]: http://en.wikipedia.org/wiki/Cellular_automaton "cellulat automata"
[1]: http://www.amazon.com/gp/product/1579550088/ref=as_li_ss_tl?ie=UTF8&tag=archetypal-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1579550088 "new kind of science"
[2]: /other_pages/care.html "care"
[3]: http://en.wikipedia.org/wiki/Sierpinski_triangle "sierpinski triangle"
[4]: https://github.com/arrogantrobot/Cellular-Automata-Rule-Explorer "Cellular-Automata-Rule-Explorer"
[5]: http://automatown.org/tapestries "tapestry"
[6]: https://github.com/arrogantrobot/Cellular-Automata-Explorer "Cellular-Automata-Explorer"
[7]: http://www.reddit.com/r/math/comments/r6ps4/cellular_automata_rule_explorer_feed_the_output/ "reddit comments"
