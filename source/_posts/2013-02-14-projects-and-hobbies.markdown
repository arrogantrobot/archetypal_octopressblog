---
layout: post
title: "A mental steam shovel"
date: 2013-02-14 23:41
comments: true
categories: c++, programming, ai
---

A month ago I was hanging out with my friend [Chris][0]. We were having our weekly meetup, talking about our approach to our work, recent experiences, and just enjoying our [surroundings][1]. I noticed a connect four game sitting in the corner, on a dark wooden ledge. The old, disjoint of additive and subtractive primary colors, blue and yellow plastic version of the game would have done the trick, but this was even better. It was a wooden version of the board. There were two wooden dowels, each half the width of the board, inserted just beneath the bottom row, which held the pieces in the board. When you draw them out, one from each side, the game is reset and the pieces fall to the bottom of the game board.

“I'm sure there's some simple heuristics to this I've long since forgotten.”

“Yeah, I used to play this all the time.”

“What's the quickest way to lose...? Oh right, allow the opponent to get three in a row on the bottom with an open slot to the right and left.”

And on and on we went. We played for almost an hour until we hit upon an improvement. 

“Let's enact the chess rules around checkmate. You have to call check, and you can't move in a way that will cause you to lose the game on the next turn.”

“Right, so you can't win by distracting someone, or because they didn't see you stacking three pieces in a row, you have to win by building an inescapable trap, like check-mate." 

This new approach instantly changed our engagement with the game. We are probably not the first people to hit upon this strategy (a perfunctory search failed to falsify this notion), but we redoubled our interest in this simple game simply by adding a dimension to it, one which forced us into a different mode of thinking.

This experience got me thinking about games and AI. I had previously implemented an Othello AI for a class at [SIUE][2], and had a wonderful time doing it. I spent a week, just tuning the various heuristics.  I improved it to the point that I could almost never beat it myself.

I saw what had to be done, and set about doing it. I began the implementation of a [connect four AI][3]. I didn't know exactly what form it would take, or if it would even be completed. I am enthralled by algorithms and their ability to leverage some bit of truth. A wrench allows its user to bring leverage to bear on a physical task, and so it is with algorithms and the domain of information. We are not shocked by the fact that a person can wring some elements from the earth and form them into a tool that is stronger and more durable than its maker. However, this is much more shocking when it happens with informational tools. My goal for the connect four AI was to build just such a tool. 

This task is certainly not new territory. Connect four is a classic example for AI programming exercises everywhere. There's even one from the precambrian era of interactive web development, [implemented in cgi][4]. I set about this for the joy of seeing it done. What will follow is an account of my implementing the AI and the various projects that have followed from it.

If you are wondering where this is going, like all truly interesting projects in the 21st century, this one leads to [Github][3], the [Raspberry Pi][5], being a maker, and composing elements of high complexity to form modules of even higher complexity.

[0]: http://excid3.com "excid3.com"
[1]: http://www.thecivillifebrewingcompany.com/TheCivilLife/Welcome.html "civil life brewing company"
[2]: http://www.cs.siue.edu/ "cs.siue.edu"
[3]: https://github.com/arrogantrobot/connect_four "connect four github repo"
[4]: http://www.pomakis.com/c4/online/c4.cgi "n in a row"
[5]: http://www.raspberrypi.org/ "raspberry pi"
