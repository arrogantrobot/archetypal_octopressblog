---
layout: post
title: "Textruder"
date: 2012-12-02 20:04
comments: true
categories: [ cellular-automata, generative-art, github ]
---

[Textruder] [0] is the next installment in a long line of [one-dimensional cellular automata implementations] [1] on various platforms and various media. This adventure begins like so many, on the command line. The inspiration for this project came from reading one of [Stephen Wolfram's papers on cellular automata] [2]. The original output of the programs testing the concepts of cellular automata was not graphical in the sense of directly mapping each cell to a pixel or block of pixels. Instead, they simply used the command line to emulate this behavior, printing out a new line for each iteration of the row of cells, with an "*" character representing the on cells and a space for the off cells.

So I set about making a command line version of the one-dimensional cellular automata. After using [cmake] [3] extensively for my day job, I found it to be an excellent tool for organizing C++ projects. So this project is built in cmake.

This project began simply as a command line cellular automaton and grew to become something a little bigger. It is now a program which will "extrude" any ascii printable text through the pattern of a one-dimensional cellular automaton. So instead of simply printing out a "*" character each time an "on" cell was encountered, I decided to print the next character of the specified source material. Textruder accepts both ascii text files and standard in.

This causes the source material to be extruded through the pattern of the cellular automaton. I have used the same method applied in my android live wallpaper [Emergent Wallpaper] [4] of randomly picking from a short list of interesting rules and allowing that rule to play out for a random interval before randomly selecting a rule from the list again and changing to it. This results in a continuous stream of non-repeating patterns without the need for human intervention. So the user of Textruder need only run the app and provide input, and the rest will happen automatically.


[0]: https://github.com/arrogantrobot/textruder "textruder github"
[1]: http://archetyp.al/cellular-automata-rule-explorer "cellular automata rule explorer"
[2]: http://www.stephenwolfram.com/publications/articles/ca/83-cellular/ "wolfram 1983"
[3]: http://www.cmake.org/ "cmake website"
[4]: https://play.google.com/store/apps/details?id=com.farawaylabs.android.emergentwallpaper "Emergent Wallpaper"
