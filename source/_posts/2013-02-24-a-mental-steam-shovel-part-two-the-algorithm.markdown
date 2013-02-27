---
layout: post
title: "A mental steam shovel part two: the algorithm"
date: 2013-02-24 22:56
comments: true
categories: algorithms, AI, projects
---

In the [first article][0] of this series, I introduced the four in a row game concept and linked to my code for an AI to play it. I will now set about explaining how I did this.

What is an algorithm?
-------
An algorithm is a series of instructions, which when done over some input, produces an output in a finite amount of time. This concept is the analog of physics in the example of a shovel. Applied physics tells us how much our force will be multiplied by using the leverage of the shovel. The application of an algorithm tells us how quickly we can convert inputs to outputs, and exactly which instructions to use. The speed or running time of an algorithm is often expressed in big O notation. This is a way of relating the number of instructions needed to produce an output in relation to the number of inputs, in the worst case scenario. 

For example, O(n) is linear time. So the amount of calculation required should scale linearly with the number of inputs. Suppose we have a list of five unsorted numbers. We would like to know if the number 7 is in that list. One way to accomplish this task would be to check each number in the list, one by one, and see if it is equal to the number 7. If it is, we can stop and answer the question. If we get to the end of the list and have not found the number 7, then we know it is not in the list. So the time it takes to search for the presence of 7 is linearly related to the number of numbers in our list. When the number we are searching for is not in the list, we encounter the worst case for the linear search. If there is a 7 at the front of the list, we will know the answer in only one comparison. Big O notation gives the worst case running time. These measures of algorithm complexity can range from O(1), constant time, to O(n^2), polynomial time, to O(n!), factorial time, and points beyond.

The time complexity of the linear search algorithm, O(n), tells us that if we want to search though a list of 100,000,000 numbers, the (worst case) time taken will be 100,000,000 times longer than if we had searched a list of a single number. However, if we wanted to do something more complicated with those lists of numbers, perhaps a complexity of O(n^2), the 100,000,000 item list would take 10,000,000,000,000,000 times as long as if we did that same operation to a list of one. This is important for determining the applicability of the algorithm for use in actual projects. This is similar to the knowledge of how much force must be applied to a shovel with a specific leverage point to move something of a particular weight. When we scale the example up to a steam shovel, much more complexity is introduced, but the basic principles of leverage still apply. So it is with algorithms. Our linear search algorithm is simple compared to the algorithm used for the four in a row AI, but both are a series of instructions which will run for some time which is related to the number of inputs.

Four in a Row AI
--------
It turns out that the artificial intelligence technique we will employ is a search as well. It is a search of the "state space" of the game. The state space is the total number of possible configurations of the game board. The case of connect four, the [state space is 10^13][1]. That is, there are roughly 10^13 ways of placing the red and black pieces in the 42 slots. When the AI is deciding where to move, it will search this state space, starting from the current board configuration and making each move it could make (7 in the case of four in row), in order to find which move is best to make. So if the algorithm used brute force to exhaustively check every possible game state, it would take quite a long time to make any move, since it would have to calculate 10^13 moves each time. Limiting the search space will help to cut this down, at the cost of certainty.

Since there is (usually) not enough time to calculate the rest of the game after each move, something must be done. The first approach is to limit the depth of our search. That is, after each move, only search ahead some fixed number of moves, or ply. One ply would be considering each option of where to place the very next piece, and no further. In the four in a row game, there are 7 possible moves




[0]: http://archetyp.al/blog/2013/02/14/a-mental-steam-shovel/ "A Mental Steam Shovel"
[1]: http://en.wikipedia.org/wiki/Game_complexity "connect four state space complexity"
