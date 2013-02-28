---
layout: post
title: "A mental steam shovel part two: the algorithm"
date: 2013-02-24 22:56
comments: true
categories: algorithms, AI, projects
---

In the [first article][0] of this series, I introduced the four in a row game concept and linked to my code for an AI to play it. I will now set about explaining how I did this.

Algorithms make/help make an increasing number of decisions. How to get from [one place to another][8], who to [go on a date][9] with, which [movie to watch][10] next, even the rapid on/off patterns of [anti-lock brakes][7].

<!-- more -->

What is an algorithm?
-------
An algorithm is a series of instructions, which when done over some input, produces an output in a finite amount of time. This concept is the analog of physics in the example of a shovel. Applied physics tells us how much the force we apply  will be multiplied by using the leverage of the shovel. The application of an algorithm tells us how quickly we can convert inputs to outputs, and exactly which instructions to use. The speed or running time of an algorithm is often expressed in big O notation. This is a way of relating the number of instructions needed to produce an output in relation to the number of inputs, in the worst case scenario. 

For example, O(n) is linear time. So the amount of calculation required should scale linearly with the number of inputs. Suppose we have a list of five unsorted numbers. We would like to know if the number 7 is in that list. One way to accomplish this task would be to check each number in the list, one by one, and see if it is equal to the number 7. If it is, we can stop and answer the question. If we get to the end of the list and have not found the number 7, then we know it is not in the list. So the time it takes to search for the presence of 7 is linearly related to the number of numbers in our list. When the number we are searching for is not in the list, we encounter the worst case for the linear search. If there is a 7 at the front of the list, we will know the answer in only one comparison. Big O notation gives the worst case running time. These measures of algorithm complexity can range from O(1), constant time, to O(n^2), polynomial time, to O(n!), factorial time, and points beyond.

The time complexity of the linear search algorithm, O(n), tells us that if we want to search though a list of 100,000,000 numbers, the (worst case) time taken will be 100,000,000 times longer than if we had searched a list of a single number. However, if we wanted to do something more complicated with those lists of numbers, perhaps a complexity of O(n^2), the 100,000,000 item list would take 10,000,000,000,000,000 times as long as if we did that same operation to a list of one. This is important for determining the applicability of the algorithm for use in actual projects. This is similar to the knowledge of how much force must be applied to a shovel with a specific leverage point to move something of a particular weight. When we scale the example up to a steam shovel, much more complexity is introduced, but the basic principles of leverage still apply. So it is with algorithms. Our linear search algorithm is simple compared to the algorithm used for the four in a row AI, but both are a series of instructions which will run for some time which is related to the number of inputs.

{% img center /images/empty_board.png %}

Four in a Row AI
--------
It turns out that the artificial intelligence technique we will employ is a search as well. It is a search of the "state space" of the game. The state space is the total number of possible configurations of the game board. The case of connect four, the [state space is 10^13][1]. That is, there are roughly 10^13 ways of placing the red and black pieces in the 42 slots. When the AI is deciding where to move, it will search this state space, starting from the current board configuration and making each move it could make (7 in the case of four in row), in order to find which move is best to make. So if the algorithm used brute force to exhaustively check every possible game state, it would take quite a long time to make any move, since it would have to calculate 10^13 moves each time. Limiting the search space will help to cut this down, at the cost of certainty.

Since there is (usually) not enough time to calculate the rest of the game after each move, something must be done. The first approach is to limit the depth of our search. That is, after each move, only search ahead some fixed number of moves, or [ply][6]. One ply would be considering each option of where to place the very next piece, and no further. In the four in a row game, there are 7 possible moves.

{% img center /images/one_ply_board.png %}

Two ply would be considering all the options of where to place the next piece, and then each possible play from all of those possibilities. In this example, that leads to 49 game states to consider. 

{% img center /images/two_ply_board.png %}

I have only pictured the full possibilities of a play at column four to illustrate the point. 

MiniMax Algorithm
-----------
So what will we do once we create this tree of possible boards? Search them! We will be using the MiniMax algorithm. I used [Algorithms in a Nutshell from O'Reilly][2] as a reference when coding this, and you may also find it useful. Though there are [many][3] [alternatives][4]. Minimax needs a way to score each board in the search space. A board in which the AI wins is scored as positive infinity, a loss is negative infinity, and everything inbetween is scored at the discresion of the programmer. The better the intermediate scores, the better the AI will do with lower ply searches that are less likely to encounter winning boards.

Once each board in the search tree is populated and scored, then starting from the leaf nodes (the deepest board states), the min or max of the possible moves is selected. If the current ply represents the AI's move, then the max is chosen. Otherwise, the min of the possible moves is chosen. This assumes that the opponent will act to minimize the AI's score and models the opponent's moves accordingly.

{% img center /images/two_ply_board_choose.png %}

The minimax algorithm gets run once each time it's the AI's turn. The current board state is the only input, and the AI's move is the only output. The time complexity of this algorithm is O(b^d), where b is the [branching factor][5] and d is the depth, or ply. 

Conclusion
----------
It is easy to see how the AI can keep track of a far greater number of possible board states than a human opponent. And so, just as a shovel can be outclassed by a steam shovel, but both are governed by the same rules of physics, so a particular implementation of the AI on a particular machine can be outclassed by a better implementation on a superior machine. The smoother the design and the more computing power, the deeper the search can go. 

{% img center /images/Steamshovel_Hollywoodland.jpg %}

The next installment in this series will outline the next steps for this algorithm's birth into the physical world. Not long from now, this project will be completed and there will be a physical four in a row board upon which a person will be able to play against the AI.

[0]: http://archetyp.al/blog/2013/02/14/a-mental-steam-shovel/ "A Mental Steam Shovel"
[1]: http://en.wikipedia.org/wiki/Game_complexity "connect four state space complexity"
[2]: http://www.amazon.com/gp/product/059651624X/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=059651624X&linkCode=as2&tag=archetypal-20 "Algorithms in a nutshell"
[3]: http://en.wikipedia.org/wiki/Minimax "wikipedia MiniMax"
[4]: https://www.cs.tcd.ie/Glenn.Strong/3d5/minimax-notes.pdf "tic-tac-toe minimax"
[5]: http://en.wikipedia.org/wiki/Branching_factor "branching factor"
[6]: http://en.wikipedia.org/wiki/Ply_(game_theory) "ply"
[7]: http://www.docstoc.com/docs/47562161/Fuzzy-Logic-and-Anti-Lock-Braking-Systems "anti-lock brakes"
[8]: http://en.wikipedia.org/wiki/Shortest_path_problem "shortest path"
[9]: http://blog.ted.com/2013/02/13/a-look-at-okcupids-algorithm-getting-personal-with-ted-ed-for-valentines-day/ "okcupid algorithm"
[10]: http://en.wikipedia.org/wiki/Netflix_Prize "netflix"
