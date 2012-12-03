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

And here follows a 500 line demo, with the output of the utility "yes" piped into the Textruder.

<div white-space="pre-wrap">
                                y
                               yyy                              
                              y  yy                             
                             yyyy yy                            
                            y   y  yy                           
                           yyy yyyy yy                          
                          y  y    y  yy                         
                         yyyyyy  yyyy yy                        
                        y     yyy   y  yy                       
                       yyy   y  yy yyyy yy                      
                      y  yy yyyy y    y  yy                     
                     yyyy y    y yy  yyyy yy                    
                    y   y yy  yy  yyy   y  yy                   
                   yyy yy  yyy yyy  yy yyyy yy                  
                  y  y  yyy  y   yyy y    y  yy                 
                 yyyyyyy  yyyyy y  y yy  yyyy yy                
                y      yyy    y yyyy  yyy   y  yy               
               yyy    y  yy  yy    yyy  yy yyyy yy              
              y  yy  yyyy yyy yy  y  yyy y    y  yy             
             yyyy yyy   y   y  yyyyyy  y yy  yyyy yy            
            y   y   yy yyy yyyy     yyyy  yyy   y  yy           
           yyy yyy y y   y    yy   y   yyy  yy yyyy yy          
          y  y   y y yy yyy  y yy yyy y  yyy y    y  yy         
         yyyyyy yy y  y   yyyy  y   y yyy  y yy  yyyy yy        
        y     y  y yyyyy y   yyyyy yy   yyyy  yyy   y  yy       
       yyy   yyyyy     y yy y    y  yy y   yyy  yy yyyy yy      
      y  yy y    yy   yy  y yy  yyyy y yy y  yyy y    y  yy     
     yyyy y yy  y yy y yyyy  yyy   y y  y yyy  y yy  yyyy yy    
    y   y y  yyyy  y y    yyy  yy yy yyyy   yyyy  yyy   y  yy   
   yyy yy yyy   yyyy yy  y  yyy y  y    yy y   yyy  yy yyyy yy  
  y  y  y   yy y   y  yyyyyy  y yyyyy  y y yy y  yyy y    y  yy 
y  y  y  yy     yy  y  yyyy y    yyy y         y  y   yyy  y   y
 y  y  y   yyyy   y  y  yy   yyy  y   yyyyyyyy  y  yy  y y  yy  
  y  y  yy  yy yy  y  y   yy  y y  yy  yyyyyy y  y   y    y   yy
y  y  y   y      y  y  yy   y    y   y  yyyy   y  yy  yyy  yy   
 y  y  yy  yyyyy  y  y   yy  yyy  yy  y  yy yy  y   y  y y   yy 
  y  y   y  yyy y  y  yy   y  y y   y  y      y  yy  y    yy   y
y  y  yy  y  y   y  y   yy  y    yy  y  yyyyy  y   y  yyy   yy  
 y  y   y  y  yy  y  yy   y  yyy   y  y  yyy y  yy  y  y yy   y 
  y  yy  y  y   y  y   yy  y  y yy  y  y  y   y   y  y     yy  y
y  y   y  y  yy  y  yy   y  y     y  y  y  yy  yy  y  yyyy   y  
 y  yy  y  y   y  y   yy  y  yyyy  y  y  y   y   y  y  yy yy  y 
  y   y  y  yy  y  yy   y  y  yy y  y  y  yy  yy  y  y      y  y
y  yy  y  y   y  y   yy  y  y     y  y  y   y   y  y  yyyyy  y  
 y   y  y  yy  y  yy   y  y  yyyy  y  y  yy  yy  y  y  yyy y  y 
  yy  y  y   y  y   yy  y  y  yy y  y  y   y   y  y  y  y   y  y
y   y  y  yy  y  yy   y  y  y     y  y  yy  yy  y  y  y  yy  y  
 yy  y  y   y  y   yy  y  y  yyyy  y  y   y   y  y  y  y   y  y 
   y  y  yy  y  yy   y  y  y  yy y  y  yy  yy  y  y  y  yy  y  y
yy  y  y   y  y   yy  y  y  y     y  y   y   y  y  y  y   y  y  
  y  y  yy  y  yy   y  y  y  yyyy  y  yy  yy  y  y  y  yy  y  y 
y  y  y   y  y   yy  y  y  y  yy y  y   y   y  y  y  y   y  y  y
 y  y  yy  y  yy   y  y  y  y     y  yy  yy  y  y  y  yy  y  y  
  y  y   y  y   yy  y  y  y  yyyy  y   y   y  y  y  y   y  y  yy
y  y  yy  y  yy   y  y  y  y  yy y  yy  yy  y  y  y  yy  y  y   
 y  y   y  y   yy  y  y  y  y     y   y   y  y  y  y   y  y  yy 
  y  yy  y  yy   y  y  y  y  yyyy  yy  yy  y  y  y  yy  y  y   y
y  y   y  y   yy  y  y  y  y  yy y   y   y  y  y  y   y  y  yy  
 y  yy  y  yy   y  y  y  y  y     yy  yy  y  y  y  yy  y  y   y 
  y   y  y   yy  y  y  y  y  yyyy   y   y  y  y  y   y  y  yy  y
y  yy  y  yy   y  y  y  y  y  yy yy  yy  y  y  y  yy  y  y   y  
 y   y  y   yy  y  y  y  y  y      y   y  y  y  y   y  y  yy  y 
  yy  y  yy   y  y  y  y  y  yyyyy  yy  y  y  y  yy  y  y   y  y
y   y  y   yy  y  y  y  y  y  yyy y   y  y  y  y   y  y  yy  y  
 yy  y  yy   y  y  y  y  y  y  y   yy  y  y  y  yy  y  y   y  y 
   y  y   yy  y  y  y  y  y  y  yy   y  y  y  y   y  y  yy  y  y
yy  y  yy   y  y  y  y  y  y  y   yy  y  y  y  yy  y  y   y  y  
  y  y   yy  y  y  y  y  y  y  yy   y  y  y  y   y  y  yy  y  y 
y  y  yy   y  y  y  y  y  y  y   yy  y  y  y  yy  y  y   y  y  y
 y  y   yy  y  y  y  y  y  y  yy   y  y  y  y   y  y  yy  y  y  
  y  yy   y  y  y  y  y  y  y   yy  y  y  y  yy  y  y   y  y  yy
y  y   yy  y  y  y  y  y  y  yy   y  y  y  y   y  y  yy  y  y   
 y  yy   y  y  y  y  y  y  y   yy  y  y  y  yy  y  y   y  y  yy 
  y   yy  y  y  y  y  y  y  yy   y  y  y  y   y  y  yy  y  y   y
y  yy   y  y  y  y  y  y  y   yy  y  y  y  yy  y  y   y  y  yy  
 y   yy  y  y  y  y  y  y  yy   y  y  y  y   y  y  yy  y  y   y 
  yy   y  y  y  y  y  y  y   yy  y  y  y  yy  y  y   y  y  yy  y
     y                     y                       y            
yyyy   yyyyyyyyyyyyyyyyyyy   yyyyyyyyyyyyyyyyyyyyy   yyyyyyyyyyy
yyy  y  yyyyyyyyyyyyyyyyy  y  yyyyyyyyyyyyyyyyyyy  y  yyyyyyyyyy
yy       yyyyyyyyyyyyyyy       yyyyyyyyyyyyyyyyy       yyyyyyyyy
y  yyyyy  yyyyyyyyyyyyy  yyyyy  yyyyyyyyyyyyyyy  yyyyy  yyyyyyyy
    yyy    yyyyyyyyyyy    yyy    yyyyyyyyyyyyy    yyy    yyyyyyy
 yy  y  yy  yyyyyyyyy  yy  y  yy  yyyyyyyyyyy  yy  y  yy  yyyyy 
             yyyyyyy               yyyyyyyyy               yyy  
yyyyyyyyyyyy  yyyyy  yyyyyyyyyyyyy  yyyyyyy  yyyyyyyyyyyyy  y  y
yyyyyyyyyyy    yyy    yyyyyyyyyyy    yyyyy    yyyyyyyyyyy       
 yyyyyyyyy  yy  y  yy  yyyyyyyyy  yy  yyy  yy  yyyyyyyyy  yyyyy 
  yyyyyyy               yyyyyyy        y        yyyyyyy    yyy  
y  yyyyy  yyyyyyyyyyyyy  yyyyy  yyyyyy   yyyyyy  yyyyy  yy  y  y
    yyy    yyyyyyyyyyy    yyy    yyyy  y  yyyy    yyy           
yyy  y  yy  yyyyyyyyy  yy  y  yy  yy       yy  yy  y  yyyyyyyyyy
yy           yyyyyyy                 yyyyy             yyyyyyyyy
y  yyyyyyyyy  yyyyy  yyyyyyyyyyyyyyy  yyy  yyyyyyyyyyy  yyyyyyyy
    yyyyyyy    yyy    yyyyyyyyyyyyy    y    yyyyyyyyy    yyyyyyy
 yy  yyyyy  yy  y  yy  yyyyyyyyyyy  yy   yy  yyyyyyy  yy  yyyyy 
      yyy               yyyyyyyyy      y      yyyyy        yyy  
yyyyy  y  yyyyyyyyyyyyy  yyyyyyy  yyyy   yyyy  yyy  yyyyyy  y  y
yyyy       yyyyyyyyyyy    yyyyy    yy  y  yy    y    yyyy       
 yy  yyyyy  yyyyyyyyy  yy  yyy  yy           yy   yy  yy  yyyyy 
      yyy    yyyyyyy        y      yyyyyyyyy    y          yyy  
yyyyy  y  yy  yyyyy  yyyyyy   yyyy  yyyyyyy  yy   yyyyyyyy  y  y
yyyy           yyy    yyyy  y  yy    yyyyy      y  yyyyyy       
 yy  yyyyyyyyy  y  yy  yy         yy  yyy  yyyy     yyyy  yyyyy 
      yyyyyyy             yyyyyyy      y    yy  yyy  yy    yyy  
yyyyy  yyyyy  yyyyyyyyyyy  yyyyy  yyyy   yy      y      yy  y  y
yyyy    yyy    yyyyyyyyy    yyy    yy  y    yyyy   yyyy         
 yy  yy  y  yy  yyyyyyy  yy  y  yy       yy  yy  y  yy  yyyyyyy 
                 yyyyy             yyyyy                 yyyyy  
yyyyyyyyyyyyyyyy  yyy  yyyyyyyyyyy  yyy  yyyyyyyyyyyyyyy  yyy  y
               yyyy yyyy         yyyy yyyy             yyyy yyyy
y             yy  y y  yy       yy  y y  yy           yy  y y  y
yy           yyyyy   yyyyy     yyyyy   yyyyy         yyyyy   yyy
 yy         yy   yy yy   yy   yy   yy yy   yy       yy   yy yy  
yyyy       yyyy yyy yyy yyyy yyyy yyy yyy yyyy     yyyy yyy yyy 
y  yy     yy  y y y y y y  y y  y y y y y y  yy   yy  y y y y y 
 yyyyy   yyyyy           yy   yy           yyyyy yyyyy          
yy   yy yy   yy         yyyy yyyy         yy   y y   yy         
yyy yyy yyy yyyy       yy  y y  yy       yyyy y   y yyyy       y
  y y y y y y  yy     yyyyy   yyyyy     yy  y  y y  y  yy     yy
yy           yyyyy   yy   yy yy   yy   yyyyy yy   yy yyyyy   yyy
 yy         yy   yy yyyy yyy yyy yyyy yy   y yyy yyy y   yy yy  
yyyy       yyyy yyy y  y y y y y y  y yyy y  y y y y  y yyy yyy 
y  yy     yy  y y y  yy           yy  y y  yy       yy  y y y y 
 yyyyy   yyyyy     yyyyy         yyyyy   yyyyy     yyyyy        
yy   yy yy   yy   yy   yy       yy   yy yy   yy   yy   yy       
yyy yyy yyy yyyy yyyy yyyy     yyyy yyy yyy yyyy yyyy yyyy     y
  y y y y y y  y y  y y  yy   yy  y y y y y y  y y  y y  yy   yy
yy           yy   yy   yyyyy yyyyy           yy   yy   yyyyy yyy
 yy         yyyy yyyy yy   y y   yy         yyyy yyyy yy   y y  
yyyy       yy  y y  y yyy y   y yyyy       yy  y y  y yyy y   y 
y  yy     yyyyy   yy  y y  y y  y  yy     yyyyy   yy  y y  y y  
 yyyyy   yy   yy yyyyy   yy   yy yyyyy   yy   yy yyyyy   yy   yy
 y   yy yyyy yyy y   yy yyyy yyy y   yy yyyy yyy y   yy yyyy yyy
  y yyy y  y y y  y yyy y  y y y  y yyy y  y y y  y yyy y  y y y
yy  y y  yy     yy  y y  yy     yy  y y  yy     yy  y y  yy     
yyyy   yyyyy   yyyyy   yyyyy   yyyyy   yyyyy   yyyyy   yyyyy   y
   yy yy   yy yy   yy yy   yy yy   yy yy   yy yy   yy yy   yy yy
y yyy yyy yyy yyy yyy yyy yyy yyy yyy yyy yyy yyy yyy yyy yyy yy
y y y y y y y y y y y y y y y y y y y y y y y y y y y y y y y y 
    y   y     y   y yy     y  y  yy       yy yy yy y  y   yy    
   y y y y   y y y    y   y yy yy  y     y          yy y y  y   
  y       y y     y  y y y       yy y   y y        y      yy y  
 y y     y   y   y yy     y     y    y y   y      y y    y    y 
y y  yyyy  yy  yy y y yyyy  yyyy  yyy y  yy  yyyyy y  yyy  yyy  
 y  y   y y y y yy y y   y y   y y  yy  y y y    yy  y  y y  y y
y  y  yy y y y y yy y  yy y  yy y  y y y y y  yyy y y  y y  y y 
  y  y yy y y y y yy  y yy  y yy  y y y y y  y  yy y  y y  y y y
 y  y y yy y y y y y y y y y y y y y y y y  y  y yy  y y  y y y 
y  y y y yy y y y y y y y y y y y y y y y  y  y y y y y  y y y  
  y y y y yy y y y y y y y y y y y y y y  y  y y y y y  y y y  y
 y y y y y yy y y y y y y y y y y y y y  y  y y y y y  y y y  y 
y y y y y y yy y y y y y y y y y y y y  y  y y y y y  y y y  y  
 y y y y y y yy y y y y y y y y y y y  y  y y y y y  y y y  y  y
y y y y y y y yy y y y y y y y y y y  y  y y y y y  y y y  y  y 
 y y y y y y y yy y y y y y y y y y  y  y y y y y  y y y  y  y y
y y y y y y y y yy y y y y y y y y  y  y y y y y  y y y  y  y y 
 y y y y y y y y yy y y y y y y y  y  y y y y y  y y y  y  y y y
y y y y y y y y y yy y y y y y y  y  y y y y y  y y y  y  y y y 
 y y y y y y y y y yy y y y y y  y  y y y y y  y y y  y  y y y y
y y y y y y y y y y yy y y y y  y  y y y y y  y y y  y  y y y y 
                              y  y          y      y  y         
yyyyyyyyyyyyyyyyyyyyyyyyyyyyy  y  yyyyyyyyy  yyyyy  y  yyyyyyyyy
yyyyyyyyyyyyyyyyyyyyyyyyyyyy y  y  yyyyyyy y  yyy y  y  yyyyyyyy
yyyyyyyyyyyyyyyyyyyyyyyyyyy   y  y  yyyyy   y  y   y  y  yyyyyyy
yyyyyyyyyyyyyyyyyyyyyyyyyy yy  y  y  yyy yy  y  yy  y  y  yyyyyy
yyyyyyyyyyyyyyyyyyyyyyyyy    y  y  y  y    y  y   y  y  y  yyyyy
yyyyyyyyyyyyyyyyyyyyyyyy yyy  y  y  y  yyy  y  yy  y  y  y  yyyy
yyyyyyyyyyyyyyyyyyyyyyy   y y  y  y  y  y y  y   y  y  y  y  yyy
yyyyyyyyyyyyyyyyyyyyyy yy    y  y  y  y    y  yy  y  y  y  y  yy
yyyyyyyyyyyyyyyyyyyyy    yyy  y  y  y  yyy  y   y  y  y  y  y  y
yyyyyyyyyyyyyyyyyyyy yyy  y y  y  y  y  y y  yy  y  y  y  y  y  
 yyyyyyyyyyyyyyyyyy   y y    y  y  y  y    y   y  y  y  y  y  y 
  yyyyyyyyyyyyyyyy yy    yyy  y  y  y  yyy  yy  y  y  y  y  y  y
y  yyyyyyyyyyyyyy    yyy  y y  y  y  y  y y   y  y  y  y  y  y  
 y  yyyyyyyyyyyy yyy  y y    y  y  y  y    yy  y  y  y  y  y  y 
  y  yyyyyyyyyy   y y    yyy  y  y  y  yyy   y  y  y  y  y  y  y
y  y  yyyyyyyy yy    yyy  y y  y  y  y  y yy  y  y  y  y  y  y  
 y  y  yyyyyy    yyy  y y    y  y  y  y     y  y  y  y  y  y  y 
  y  y  yyyy yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y  y
y  y  y  yy   y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  y  
 y  y  y   yy    yyy  y y    y  y  y  y     y  y  y  y  y  y  y 
  y  y  yy   yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y  y
y  y  y   yy  y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  y  
 y  y  yy   y    yyy  y y    y  y  y  y     y  y  y  y  y  y  y 
  y  y   yy  yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y  y
y  y  yy   y  y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  y  
 y  y   yy  y    yyy  y y    y  y  y  y     y  y  y  y  y  y  y 
  y  yy   y  yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y  y
y  y   yy  y  y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  y  
 y  yy   y  y    yyy  y y    y  y  y  y     y  y  y  y  y  y  y 
  y   yy  y  yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y  y
y  yy   y  y  y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  y  
 y   yy  y  y    yyy  y y    y  y  y  y     y  y  y  y  y  y  y 
  yy   y  y  yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y  y
y   yy  y  y  y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  y  
 yy   y  y  y    yyy  y y    y  y  y  y     y  y  y  y  y  y  y 
   yy  y  y  yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y  y
yy   y  y  y  y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  y  
  yy  y  y  y    yyy  y y    y  y  y  y     y  y  y  y  y  y  y 
y   y  y  y  yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y  y
 yy  y  y  y  y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  y  
   y  y  y  y    yyy  y y    y  y  y  y     y  y  y  y  y  y  yy
yy  y  y  y  yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  y   
  y  y  y  y  y y    yyy  y y  y  y  y  yy y  y  y  y  y  y  yy 
y  y  y  y  y    yyy  y y    y  y  y  y     y  y  y  y  y  y   y
 y  y  y  y  yyy  y y    yyy  y  y  y  yyyy  y  y  y  y  y  yy  
  y  y  y  y  y y    y    y y  y  y  y  yy y  y  y  y  y  y   y 
   y  y  y  y    y    y      y  y  y  y     y  y  y  y  y  y   y
y   y  y  y  y    y    y      y  y  y  y     y  y  y  y  y  y   
 y   y  y  y  y    y    y      y  y  y  y     y  y  y  y  y  y  
  y   y  y  y  y    y    y      y  y  y  y     y  y  y  y  y  y 
   y   y  y  y  y    y    y      y  y  y  y     y  y  y  y  y  y
y   y   y  y  y  y    y    y      y  y  y  y     y  y  y  y  y  
 y   y   y  y  y  y    y    y      y  y  y  y     y  y  y  y  y 
  y   y   y  y  y  y    y    y      y  y  y  y     y  y  y  y  y
y  y   y   y  y  y  y    y    y      y  y  y  y     y  y  y  y  
 y  y   y   y  y  y  y    y    y      y  y  y  y     y  y  y  y 
  y  y   y   y  y  y  y    y    y      y  y  y  y     y  y  y  y
y  y  y   y   y  y  y  y    y    y      y  y  y  y     y  y  y  
 y  y  y   y   y  y  y  y    y    y      y  y  y  y     y  y  y 
  y  y  y   y   y  y  y  y    y    y      y  y  y  y     y  y  y
y  y  y  y   y   y  y  y  y    y    y      y  y  y  y     y  y  
 y  y  y  y   y   y  y  y  y    y    y      y  y  y  y     y  y 
  y  y  y  y   y   y  y  y  y    y    y      y  y  y  y     y  y
y  y  y  y  y   y   y  y  y  y    y    y      y  y  y  y     y  
 y  y  y  y  y   y   y  y  y  y    y    y      y  y  y  y     y 
  y  y  y  y  y   y   y  y  y  y    y    y      y  y  y  y     y
                y   y            yy   yy   yyyy            yyy  
yyyyyyyyyyyyyyy   y   yyyyyyyyyy    y    y  yy  yyyyyyyyyy  y  y
yyyyyyyyyyyyyy  y   y  yyyyyyyy  yy   yy         yyyyyyyy       
 yyyyyyyyyyyy     y     yyyyyy      y    yyyyyyy  yyyyyy  yyyyy 
  yyyyyyyyyy  yyy   yyy  yyyy  yyyy   yy  yyyyy    yyyy    yyy  
y  yyyyyyyy    y  y  y    yy    yy  y      yyy  yy  yy  yy  y  y
    yyyyyy  yy         yy    yy       yyyy  y                   
yyy  yyyy      yyyyyyy    yy    yyyyy  yy     yyyyyyyyyyyyyyyyyy
yy    yy  yyyy  yyyyy  yy    yy  yyy      yyy  yyyyyyyyyyyyyyyyy
y  yy      yy    yyy      yy      y  yyyy  y    yyyyyyyyyyyyyyyy
      yyyy    yy  y  yyyy    yyyy     yy     yy  yyyyyyyyyyyyyyy
 yyyy  yy  yy         yy  yy  yy  yyy    yyy      yyyyyyyyyyyyy 
  yy          yyyyyyy              y  yy  y  yyyy  yyyyyyyyyyy  
y    yyyyyyyy  yyyyy  yyyyyyyyyyyy            yy    yyyyyyyyy  y
  yy  yyyyyy    yyy    yyyyyyyyyy  yyyyyyyyyy    yy  yyyyyyy    
y      yyyy  yy  y  yy  yyyyyyyy    yyyyyyyy  yy      yyyyy  yyy
  yyyy  yy               yyyyyy  yy  yyyyyy      yyyy  yyy    yy
   yy      yyyyyyyyyyyyy  yyyy        yyyy  yyyy  yy    y  yy   
yy    yyyy  yyyyyyyyyyy    yy  yyyyyy  yy    yy      yy       yy
y  yy  yy    yyyyyyyyy  yy      yyyy      yy    yyyy    yyyyy  y
          yy  yyyyyyy      yyyy  yy  yyyy    yy  yy  yy  yyy    
yyyyyyyyy      yyyyy  yyyy  yy        yy  yy              y  yyy
yyyyyyyy  yyyy  yyy    yy      yyyyyy        yyyyyyyyyyyy     yy
yyyyyyy    yy    y  yy    yyyy  yyyy  yyyyyy  yyyyyyyyyy  yyy  y
yyyyyy  yy    yy       yy  yy    yy    yyyy    yyyyyyyy    y    
 yyyy      yy    yyyyy        yy    yy  yy  yy  yyyyyy  yy   yy 
  yy  yyyy    yy  yyy  yyyyyy    yy              yyyy      y    
y      yy  yy      y    yyyy  yy    yyyyyyyyyyyy  yy  yyyy   yyy
  yyyy        yyyy   yy  yy      yy  yyyyyyyyyy        yy  y  yy
   yy  yyyyyy  yy  y        yyyy      yyyyyyyy  yyyyyy          
yy      yyyy         yyyyyy  yy  yyyy  yyyyyy    yyyy  yyyyyyyyy
y  yyyy  yy  yyyyyyy  yyyy        yy    yyyy  yy  yy    yyyyyyyy
    yy        yyyyy    yy  yyyyyy    yy  yy          yy  yyyyyyy
 yy    yyyyyy  yyy  yy      yyyy  yy        yyyyyyyy      yyyyy 
    yy  yyyy    y      yyyy  yy      yyyyyy  yyyyyy  yyyy  yyy  
yyy      yy  yy   yyyy  yy      yyyy  yyyy    yyyy    yy    y  y
yy  yyyy        y  yy      yyyy  yy    yy  yy  yy  yy    yy     
     yy  yyyyyy       yyyy  yy      yy                yy    yyy 
yyyy      yyyy  yyyyy  yy      yyyy    yyyyyyyyyyyyyy    yy  y  
 yy  yyyy  yy    yyy      yyyy  yy  yy  yyyyyyyyyyyy  yy        
      yy      yy  y  yyyy  yy            yyyyyyyyyy      yyyyyyy
 yyyy    yyyy         yy      yyyyyyyyyy  yyyyyyyy  yyyy  yyyyy 
  yy  yy  yy  yyyyyyy    yyyy  yyyyyyyy    yyyyyy    yy    yyy  
y              yyyyy  yy  yy    yyyyyy  yy  yyyy  yy    yy  y  y
  yyyyyyyyyyyy  yyy          yy  yyyy        yy      yy         
y  yyyyyyyyyy    y  yyyyyyyy      yy  yyyyyy    yyyy    yyyyyyyy
    yyyyyyyy  yy y   yyyyyy  yyyy      yyyy  yy  yy  yy  yyyyyyy
 yy  yyyyyy      y y  yyyy    yy  yyyy  yy                yyyyy 
      yyyy  yyyy y y   yy  yy      yy      yyyyyyyyyyyyyy  yyy  
yyyyy  yy    yy  y y y        yyyy    yyyy  yyyyyyyyyyyy    y  y
yyyy      yy     y y y yyyyyy  yy  yy  yy    yyyyyyyyyy  yy y   
 yy  yyyy    yyy y y y  yyyy              yy  yyyyyyyy      y y 
      yy  yy  y  y y y   yy  yyyyyyyyyyyy      yyyyyy  yyyy y y 
yyyyy         y  y y y y      yyyyyyyyyy  yyyy  yyyy    yy  y y 
 yyy  yyyyyyy y  y y y y yyyy  yyyyyyyy    yy    yy  yy     y y 
  y    yyyyy  y  y y y y  yy    yyyyyy  yy    yy        yyy y y 
y y yy  yyy   y  y y y y     yy  yyyy      yy    yyyyyy  y  y y 
y y      y  y y  y y y y yyy      yy  yyyy    yy  yyyy   y  y y 
y y yyyy y  y y  y y y y  y  yyyy      yy  yy      yy  y y  y y 
y y  yy  y  y y  y y y y  y   yy  yyyy        yyyy     y y  y y 
y y      y  y y  y y y y  y y      yy  yyyyyy  yy  yyy y y  y y 
y y yyyy y  y y  y y y y  y y yyyy      yyyy        y  y y  y y 
y y  yy  y  y y  y y y y  y y  yy  yyyy  yy  yyyyyy y  y y  y y 
y y      y  y y  y y y y  y y       yy        yyyy  y  y y  y y 
y y yyyy y  y y  y y y y  y y yyyyy    yyyyyy  yy   y  y y  y y 
y y  yy  y  y y  y y y y  y y  yyy  yy  yyyy      y y  y y  y y 
y y      y  y y  y y y y  y y   y        yy  yyyy y y  y y  y y 
y y yyyy y  y y  y y y y  y y y y yyyyyy      yy  y y  y y  y y 
y y  yy  y  y y  y y y y  y y y y  yyyy  yyyy     y y  y y  y y 
y y      y  y y  y y y y  y y y y   yy    yy  yyy y y  y y  y y 
y y yyyy y  y y  y y y y  y y y y y    yy      y  y y  y y  y y 
y y  yy  y  y y  y y y y  y y y y y yy    yyyy y  y y  y y  y y 
y y      y  y y  y y y y  y y y y y    yy  yy  y  y y  y y  y y 
y y yyyy y  y y  y y y y  y y y y y yy         y  y y  y y  y y 
y y  yy  y  y y  y y y y  y y y y y    yyyyyyy y  y y  y y  y y 
y y      y  y y  y y y y  y y y y y yy  yyyyy  y  y y  y y  y y 
y y yyyy y  y y  y y y y  y y y y y      yyy   y  y y  y y  y y 
y y  yy  y  y y  y y y y  y y y y y yyyy  y  y y  y y  y y  y y 
y y      y  y y  y y y y  y y y y y  yy   y  y y  y y  y y  y y 
y y yyyy y  y y  y y y y  y y y y y     y y  y y  y y  y y  y y 
y y  yy  y  y y  y y y y  y y y y y yyy y y  y y  y y  y y  y y 
y y      y  y y  y y y y  y y y y y  y  y y  y y  y y  y y  y y 
y y yyyy y  y y  y y y y  y y y y y  y  y y  y y  y y  y y  y y 
y y  yy  y  y y  y y y y  y y y y y  y  y y  y y  y y  y y  y y 
y y      y  y y  y y y y  y y y y y  y  y y  y y  y y  y y  y y 
   yyyyy  y    y        y          y  y    y    y    y    y     
yy  yyy y  yyy  yyyyyyy  yyyyyyyyy  y  yyy  yyy  yyy  yyy  yyyyy
y y  y   y  y y  yyyyy y  yyyyyyy y  y  y y  y y  y y  y y  yyyy
   y  yy  y    y  yyy   y  yyyyy   y  y    y    y    y    y  yyy
yy  y   y  yyy  y  y yy  y  yyy yy  y  yyy  yyy  yyy  yyy  y  y 
  y  yy  y  y y  y     y  y  y    y  y  y y  y y  y y  y y  y   
y  y   y  y    y  yyyy  y  y  yyy  y  y    y    y    y    y  yyy
 y  yy  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy  y  yy
  y   y  y  y y  y     y  y  y    y  y  y y  y y  y y  y y  y   
y  yy  y  y    y  yyyy  y  y  yyy  y  y    y    y    y    y  yyy
 y   y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy  y  yy
  yy  y  y  y y  y     y  y  y    y  y  y y  y y  y y  y y  y   
y   y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y    y  yyy
 yy  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy  y  yy
   y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  y y  y   
yy  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y    y  yyy
y y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy  y  yy
   y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  y y  y  y
yy  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y    y  y  
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy  y  y 
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  y y  y  y
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y    y  y  
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy  y  yy
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  y y  y   
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y    y  yy 
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy  y   y
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  y y  yy  
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y    y   y 
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy  yy  y
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  y y   y  
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y    yy  y 
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyy   y  y
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  y yy  y  
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y     y  y 
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyyy  y  y
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  yy y  y  
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y     y  y 
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyyy  y  y
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  yy y  y  
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y     y  y 
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyyy  y  y
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  yy y  y  
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y     y  y 
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyyy  y  y
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  yy y  y  
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y     y  y 
  y  y  y  yyy  y  yy y  y  y  y y  y  yyy  yyy  yyy  yyyy  y  y
y  y  y  y  y y  y     y  y  y    y  y  y y  y y  y y  yy y  y  
 y  y  y  y    y  yyyy  y  y  yyy  y  y    y    y    y     y  y 
y  y  y  y  yyy  y   y y  y  y  y y  y  yyy  yyy  yyy  yyyy  y  
  y  y  y  y  y y  yy y  y  y  y y  y  y  y y  y y  y y   y y  y
 y  y  y  y  y y  y yy  y  y  y y  y  y  y y  y y  y y  yy y  y 
y  y  y  y  y y  y y y y  y  y y  y  y  y y  y y  y y  y yy  y  
  y  y  y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y
 y  y  y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y 
y  y  y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  
  y  y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y
 y  y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y 
y  y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  
  y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y
 y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y 
y  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  
  y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y
 y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y 
y y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  
 y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y
y  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y 
  y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y
 y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y 
y y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y  
 y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y  y
y y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y  y 
 y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y  y y
y y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y  y y 
 y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y  y y y
y  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y  y y y 
  y  y y  y  y  y y  y y  y y  y y y y  y  y  y  y  y y  y y y y
y  y    y  y  y    y    y    y        y  y  y  y  y    y        
 y  yyy  y  y  yyy  yyy  yyy  yyyyyyy  y  y  y  y  yyy  yyyyyyy 
  y  y y  y  y  y y  y y  y y  yyyyy y  y  y  y  y  y y  yyyyy y
y  y    y  y  y    y    y    y  yyy   y  y  y  y  y    y  yyy   
 y  yyy  y  y  yyy  yyy  yyy  y  y yy  y  y  y  y  yyy  y  y yy 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
y  y    y  y  y    y    y    y  yyyy  y  y  y  y  y    y  yyyy  
 y  yyy  y  y  yyy  yyy  yyy  y  yy y  y  y  y  y  yyy  y  yy y 
  y  y y  y  y  y y  y y  y y  y     y  y  y  y  y  y y  y     y
 y  y y  y  y  y y  y y  y y  y  yyyy  y  y  y  y  y y  y  yyyy 
y  y y  y  y  y y  y y  y y  y  y   y y  y  y  y  y y  y  y   y 
  y y  y  y  y y  y y  y y  y  y  yy y  y  y  y  y y  y  y  yy y
 y y  y  y  y y  y y  y y  y  y  y yy  y  y  y  y y  y  y  y yy 
y y  y  y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y 
 y  y  y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y
y  y  y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y 
  y  y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y
 y  y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y 
y  y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  
  y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y
 y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y 
y  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  
  y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y
 y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y 
y y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  
 y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y
y  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y 
  y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y
 y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y 
y y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  
 y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y
y  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y 
  y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y
 y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y 
y y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  
 y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y
y  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y 
  y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y
 y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y 
y  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y  
  y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y  y
 y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y  y 
y  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y  y  
  y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y  y  y
 y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y  y  y 
y y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y  y  y  
 y y y  y  y  y y  y  y  y y y y y  y  y  y y  y y  y y  y  y  y
      yy yy yy   yy yy yy         yy yy yy   yy   yy   yy yy yy 
     y        y y        y       y        y y  y y  y y        y
y   y y      y   y      y y     y y      y   yy   yy   y      y 
 y y   y    y y y y    y   y   y   y    y y y  y y  y y y    y  
y   y y y  y       y  y y y y y y y y  y     yy   yy     y  y y 
 y y     yy y     y yy               yy y   y  y y  y   y yy    
y   y   y    y   y    y             y    y y yy   yy y y    y   
 y y y y y  y y y y  y y           y y  y      y y      y  y y y
          yy       yy   y         y   yy y    y   y    y yy     
         y  y     y  y y y       y y y    y  y y y y  y    y    
        y yy y   y yy     y     y     y  y yy       yy y  y y   
       y      y y    y   y y   y y   y yy    y     y    yy   y  
      y y    y   y  y y y   y y   y y    y  y y   y y  y  y y y 
     y   y  y y y yy     y y   y y   y  y yy   y y   yy yy     y
y   y y y yy        y   y   y y   y y yy    y y   y y     y   y 
 y y        y      y y y y y   y y      y  y   y y   y   y y y  
y   y      y y    y         y y   y    y yy y y   y y y y     y 
 y y y    y   y  y y       y   y y y  y        y y       y   y  
y     y  y y y yy   y     y y y     yy y      y   y     y y y y 
 y   y yy        y y y   y     y   y    y    y y y y   y        
y y y    y      y     y y y   y y y y  y y  y       y y y       
     y  y y    y y   y     y y       yy   yy y     y     y     y
y   y yy   y  y   y y y   y   y     y  y y    y   y y   y y   y 
 y y    y y yy y y     y y y y y   y yy   y  y y y   y y   y y  
y   y  y          y   y         y y    y y yy     y y   y y   y 
 y y yy y        y y y y       y   y  y      y   y   y y   y y  
y        y      y       y     y y y yy y    y y y y y   y y   y 
 y      y y    y y     y y   y          y  y         y y   y y  
y y    y   y  y   y   y   y y y        y yy y       y   y y   y 
   y  y y y yy y y y y y y     y      y      y     y y y   y y  
  y yy                    y   y y    y y    y y   y     y y   y 
 y    y                  y y y   y  y   y  y   y y y   y   y y y
  y  y y                y     y y yy y y yy y y     y y y y     
 y yy   y              y y   y                 y   y       y    
y    y y y            y   y y y               y y y y     y y   
 y  y     y          y y y     y             y       y   y   y y
  yy y   y y        y     y   y y           y y     y y y y y   
 y    y y   y      y y   y y y   y         y   y   y         y  
 y yy y y y y yyyy y y y y y y y y yyyyyyy y y y y y yyyyyyy y y
 y    y y y y  yy  y y y y y y y y  yyyyy  y y y y y  yyyyy  y y
 y yy y y y y      y y y y y y y y   yyy   y y y y y   yyy   y y
 y    y y y y yyyy y y y y y y y y y  y  y y y y y y y  y  y y y
 y yy y y y y  yy  y y y y y y y y y  y  y y y y y y y  y  y y y
 y    y y y y      y y y y y y y y y  y  y y y y y y y  y  y y y
 y yy y y y y yyyy y y y y y y y y y  y  y y y y y y y  y  y y y
 y    y y y y  yy  y y y y y y y y y  y  y y y y y y y  y  y y y
 y yy y y y y      y y y y y y y y y  y  y y y y y y y  y  y y y
 y    y y y y yyyy y y y y y y y y y  y  y y y y y y y  y  y y y
 y yy y y y y  yy  y y y y y y y y y  y  y y y y y y y  y  y y y
 y    y y y y      y y y y y y y y y  y  y y y y y y y  y  y y y
 y yy y y y y yyyy y y y y y y y y y  y  y y y y y y y  y  y y y
 y    y y y y  yy  y y y y y y y y y  y  y y y y y y y  y  y y y
 y yy y y y y      y y y y y y y y y  y  y y y y y y y  y  y y y
 y    y y y y yyyy y y y y y y y y y  y  y y y y y y y  y  y y y
 y yy y y y y  yy  y y y y y y y y y  y  y y y y y y y  y  y y y
 y    y y y y      y y y y y y y y y  y  y y y y y y y  y  y y y
 y yy y y y y yyyy y y y y y y y y y  y  y y y y y y y  y  y y y
               yy                   y  y              y  y      
yyyyyyyyyyyyyy   yyyyyyyyyyyyyyyyyy  y  yyyyyyyyyyyyy  y  yyyyyy
yyyyyyyyyyyyy yy  yyyyyyyyyyyyyyyy y  y  yyyyyyyyyyy y  y  yyyyy
yyyyyyyyyyyy    y  yyyyyyyyyyyyyy   y  y  yyyyyyyyy   y  y  yyyy
yyyyyyyyyyy yyy  y  yyyyyyyyyyyy yy  y  y  yyyyyyy yy  y  y  yyy
yyyyyyyyyy   y y  y  yyyyyyyyyy    y  y  y  yyyyy    y  y  y  yy
yyyyyyyyy yy    y  y  yyyyyyyy yyy  y  y  y  yyy yyy  y  y  y  y
yyyyyyyy    yyy  y  y  yyyyyy   y y  y  y  y  y   y y  y  y  y  
 yyyyyy yyy  y y  y  y  yyyy yy    y  y  y  y  yy    y  y  y  y 
  yyyy   y y    y  y  y  yy    yyy  y  y  y  y   yyy  y  y  y  y
y  yy yy    yyy  y  y  y   yyy  y y  y  y  y  yy  y y  y  y  y  
 y      yyy  y y  y  y  yy  y y    y  y  y  y   y    y  y  y  y 
  yyyyy  y y    y  y  y   y    yyy  y  y  y  yy  yyy  y  y  y  y
y  yyy y    yyy  y  y  yy  yyy  y y  y  y  y   y  y y  y  y  y  
 y  y   yyy  y y  y  y   y  y y    y  y  y  yy  y    y  y  y  y 
  y  yy  y y    y  y  yy  y    yyy  y  y  y   y  yyy  y  y  y  y
y  y   y    yyy  y  y   y  yyy  y y  y  y  yy  y  y y  y  y  y  
 y  yy  yyy  y y  y  yy  y  y y    y  y  y   y  y    y  y  y  y 
  y   y  y y    y  y   y  y    yyy  y  y  yy  y  yyy  y  y  y  y
y  yy  y    yyy  y  yy  y  yyy  y y  y  y   y  y  y y  y  y  y  
 y   y  yyy  y y  y   y  y  y y    y  y  yy  y  y    y  y  y  y 
  yy  y  y y    y  yy  y  y    yyy  y  y   y  y  yyy  y  y  y  y
y   y  y    yyy  y   y  y  yyy  y y  y  yy  y  y  y y  y  y  y  
 yy  y  yyy  y y  yy  y  y  y y    y  y   y  y  y    y  y  y  y 
   y  y  y y    y   y  y  y    yyy  y  yy  y  y  yyy  y  y  y  y
yy  y  y    yyy  yy  y  y  yyy  y y  y   y  y  y  y y  y  y  y  
  y  y  yyy  y y   y  y  y  y y    y  yy  y  y  y    y  y  y  y 
y  y  y  y y    yy  y  y  y    yyy  y   y  y  y  yyy  y  y  y  y
 y  y  y    yyy   y  y  y  yyy  y y  yy  y  y  y  y y  y  y  y  
  y  y  yyy  y yy  y  y  y  y y    y   y  y  y  y    y  y  y  yy
y  y  y  y y     y  y  y  y    yyy  yy  y  y  y  yyy  y  y  y   
 y  y  y    yyyy  y  y  y  yyy  y y   y  y  y  y  y y  y  y  yy 
  y  y  yyy  yy y  y  y  y  y y    yy  y  y  y  y    y  y  y   y
y  y  y  y y     y  y  y  y    yyy   y  y  y  y  yyy  y  y  yy  
 y  y  y    yyyy  y  y  y  yyy  y yy  y  y  y  y  y y  y  y   y 
  y  y  yyy  yy y  y  y  y  y y     y  y  y  y  y    y  y  yy  y
y  y  y  y y     y  y  y  y    yyyy  y  y  y  y  yyy  y  y   y  
 y  y  y    yyyy  y  y  y  yyy  yy y  y  y  y  y  y y  y  yy  y 
  y  y  yyy  yy y  y  y  y  y y     y  y  y  y  y    y  y   y  y
y  y  y  y y     y  y  y  y    yyyy  y  y  y  y  yyy  y  yy  y  
 y  y  y    yyyy  y  y  y  yyy  yy y  y  y  y  y  y y  y   y  y 
 y  y  y     yy   y  y  y   y      y  y  y  y  y  y y  y   y  y 
 y  y  y          y  y  y   y      y  y  y  y  y  y y  y   y  y 
 y  y  y          y  y  y   y      y  y  y  y  y  y y  y   y  y 
 y  y  y          y  y  y   y      y  y  y  y  y  y y  y   y  y 
 y  y  y          y  y  y   y      y  y  y  y  y  y y  y   y  y 
 y  y  y          y  y  y   y      y  y  y  y  y  y y  y   y  y 
 y  y  y          y  y  y   y      y  y  y  y  y  y y  y   y  y 
 y  y  y          y  y  y   y      y  y  y  y  y  y y  y   y  y 
         yyyyyyyy         y   yyyy                       y      
yyyyyyyy  yyyyyy  yyyyyyy   y  yy  yyyyyyyyyyyyyyyyyyyyy   yyyyy
yyyyyyy    yyyy    yyyyy  y         yyyyyyyyyyyyyyyyyyy  y  yyyy
yyyyyy  yy  yy  yy  yyy     yyyyyyy  yyyyyyyyyyyyyyyyy       yyy
yyyyy                y  yyy  yyyyy    yyyyyyyyyyyyyyy  yyyyy  yy
yyyy  yyyyyyyyyyyyyy     y    yyy  yy  yyyyyyyyyyyyy    yyy    y
yyy    yyyyyyyyyyyy  yyy   yy  y        yyyyyyyyyyy  yy  y  yy  
 y  yy  yyyyyyyyyy    y  y       yyyyyy  yyyyyyyyy              
         yyyyyyyy  yy      yyyyy  yyyy    yyyyyyy  yyyyyyyyyyyyy
 yyyyyyy  yyyyyy      yyyy  yyy    yy  yy  yyyyy    yyyyyyyyyyy 
  yyyyy    yyyy  yyyy  yy    y  yy          yyy  yy  yyyyyyyyy  
y  yyy  yy  yy    yy      yy       yyyyyyyy  y        yyyyyyy  y
    y          yy    yyyy    yyyyy  yyyyyy     yyyyyy  yyyyy    
yyy   yyyyyyyy    yy  yy  yy  yyy    yyyy  yyy  yyyy    yyy  yyy
yy  y  yyyyyy  yy              y  yy  yy    y    yy  yy  y    yy
y       yyyy      yyyyyyyyyyyy           yy   yy           yy  y
  yyyyy  yy  yyyy  yyyyyyyyyy  yyyyyyyyy    y    yyyyyyyyy      
y  yyy        yy    yyyyyyyy    yyyyyyy  yy   yy  yyyyyyy  yyyyy
    y  yyyyyy    yy  yyyyyy  yy  yyyyy      y      yyyyy    yyyy
 yy     yyyy  yy      yyyy        yyy  yyyy   yyyy  yyy  yy  yy 
    yyy  yy      yyyy  yy  yyyyyy  y    yy  y  yy    y          
yyy  y      yyyy  yy        yyyy     yy           yy   yyyyyyyyy
yy     yyyy  yy      yyyyyy  yy  yyy    yyyyyyyyy    y  yyyyyyyy
y  yyy  yy      yyyy  yyyy        y  yy  yyyyyyy  yy     yyyyyyy
    y      yyyy  yy    yy  yyyyyy         yyyyy      yyy  yyyyyy
 yy   yyyy  yy      yy      yyyy  yyyyyyy  yyy  yyyy  y    yyyy 
    y  yy      yyyy    yyyy  yy    yyyyy    y    yy     yy  yy  
yyy       yyyy  yy  yy  yy      yy  yyy  yy   yy    yyy        y
yy  yyyyy  yy              yyyy      y      y    yy  y  yyyyyy  
     yyy      yyyyyyyyyyyy  yy  yyyy   yyyy   yy         yyyy   
yyyy  y  yyyy  yyyyyyyyyy        yy  y  yy  y    yyyyyyy  yy  yy
yyy       yy    yyyyyyyy  yyyyyy              yy  yyyyy        y
yy  yyyyy    yy  yyyyyy    yyyy  yyyyyyyyyyyy      yyy  yyyyyy  
     yyy  yy      yyyy  yy  yy    yyyyyyyyyy  yyyy  y    yyyy   
yyyy  y      yyyy  yy          yy  yyyyyyyy    yy     yy  yy  yy
yyy     yyyy  yy      yyyyyyyy      yyyyyy  yy    yyy          y
yy  yyy  yy      yyyy  yyyyyy  yyyy  yyyy      yy  y  yyyyyyyy  
     y      yyyy  yy    yyyy    yy    yy  yyyy         yyyyyy   
yyyy   yyyy  yy      yy  yy  yy    yy      yy  yyyyyyy  yyyy  yy
yyy  y  yy      yyyy            yy    yyyy      yyyyy    yy    y
yy         yyyy  yy  yyyyyyyyyy    yy  yy  yyyy  yyy  yy    yy  
   yyyyyyy  yy        yyyyyyyy  yy          yy    y      yy     
yy  yyyyy      yyyyyy  yyyyyy      yyyyyyyy    yy   yyyy    yyyy
y    yyy  yyyy  yyyy    yyyy  yyyy  yyyyyy  yy    y  yy  yy  yyy
  yy  y    yy    yy  yy  yy    yy    yyyy      yy             yy
        yy    yy            yy    yy  yy  yyyy    yyyyyyyyyyy   
yyyyyyy    yy    yyyyyyyyyy    yy          yy  yy  yyyyyyyyy  yy
yyyyyy  yy    yy  yyyyyyyy  yy    yyyyyyyy          yyyyyyy    y
yyyyy      yy      yyyyyy      yy  yyyyyy  yyyyyyyy  yyyyy  yy  
 yyy  yyyy    yyyy  yyyy  yyyy      yyyy    yyyyyy    yyy       
  y    yy  yy  yy    yy    yy  yyyy  yy  yy  yyyy  yy  y  yyyyyy
    yy            yy    yy      yy            yy           yyyy 
yyy    yyyyyyyyyy    yy    yyyy    yyyyyyyyyy    yyyyyyyyy  yy  
 y  yy  yyyyyyyy  yy    yy  yy  yy  yyyyyyyy  yy  yyyyyyy       
         yyyyyy      yy              yyyyyy        yyyyy  yyyyyy
 yyyyyyy  yyyy  yyyy    yyyyyyyyyyyy  yyyy  yyyyyy  yyy    yyyy 
  yyyyy    yy    yy  yy  yyyyyyyyyy    yy    yyyy    y  yy  yy  
y  yyy  yy    yy          yyyyyyyy  yy    yy  yy  yy           y
    y      yy    yyyyyyyy  yyyyyy      yy            yyyyyyyyy  
yyy   yyyy    yy  yyyyyy    yyyy  yyyy    yyyyyyyyyy  yyyyyyy  y
yy  y  yy  yy      yyyy  yy  yy    yy  yy  yyyyyyyy    yyyyy    
              yyyy  yy          yy          yyyyyy  yy  yyy  yy 
yyyyyyyyyyyyy  yy      yyyyyyyy    yyyyyyyy  yyyy        y      
 yyyyyyyyyyy      yyyy  yyyyyy  yy  yyyyyy    yy  yyyyyy   yyyy 
  yyyyyyyyy  yyyy  yy    yyyy        yyyy  yy      yyyy  y  yy  
y  yyyyyyy    yy      yy  yy  yyyyyy  yy      yyyy  yy         y
    yyyyy  yy    yyyy          yyyy      yyyy  yy      yyyyyyy  
yyy  yyy      yy  yy  yyyyyyyy  yy  yyyy  yy      yyyy  yyyyy  y
yy    y  yyyy          yyyyyy        yy      yyyy  yy    yyy    
   yy     yy  yyyyyyyy  yyyy  yyyyyy    yyyy  yy      yy  y  yy 
yy    yyy      yyyyyy    yy    yyyy  yy  yy      yyyy           
       y        yyyy            yy                yy            
       y         yy                                             
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
       y                                                        
      y y                                                       
     y   y                                                      
    y y y y                                                     
   y       y                                                    
  y y     y y                                                   
 y   y   y   y                                                  
y y y y y y y y                                                 
               y                                               y
y             y y                                             y 
 y           y   y                                           y  
y y         y y y y                                         y y 
   y       y       y                                       y    
  y y     y y     y y                                     y y   
 y   y   y   y   y   y                                   y   y  
y y y y y y y y y y y y                                 y y y y 
                       y                               y        
                      y y                             y y       
                     y   y                           y   y      
                    y y y y                         y y y y     
                   y       y                       y       y    
                  y y     y y                     y y     y y   
                 y   y   y   y                   y   y   y   y  
                y y y y y y y y                 y y y y y y y y 
               y               y               y               y
y             y y             y y             y y             y 
 y           y   y           y   y           y   y           y  
y y         y y y y         y y y y         y y y y         y y 
   y       y       y       y       y       y       y       y    
  y y     y y     y y     y y     y y     y y     y y     y y   
 y   y   y   y   y   y   y   y   y   y   y   y   y   y   y   y  
y y y y y y y y y y y y y y y y y y y y y y y y y y y y y y y y 
y     yy   yyyy      y  yy yyyy  yyyyy        y               yy
 yyyy   yy  yy yyyyy  y     yy y  yyy yyyyyyy  yyyyyyyyyyyyyy  y
  yy yy   y     yyy y  yyyy     y  y   yyyyy y  yyyyyyyyyyyy y  
y      yy  yyyy  y   y  yy yyyy  y  yy  yyy   y  yyyyyyyyyy   yy
 yyyyy   y  yy y  yy  y     yy y  y   y  y yy  y  yyyyyyyy yy  y
  yyy yy  y     y   y  yyyy     y  yy  y     y  y  yyyyyy    y  
y  y    y  yyyy  yy  y  yy yyyy  y   y  yyyy  y  y  yyyy yyy  yy
 y  yyy  y  yy y   y  y     yy y  yy  y  yy y  y  y  yy   y y  y
  y  y y  y     yy  y  yyyy     y   y  y     y  y  y   yy    y  
y  y    y  yyyy   y  y  yy yyyy  yy  y  yyyy  y  y  yy   yyy  yy
 y  yyy  y  yy yy  y  y     yy y   y  y  yy y  y  y   yy  y y  y
  y  y y  y      y  y  yyyy     yy  y  y     y  y  yy   y    y  
y  y    y  yyyyy  y  y  yy yyyy   y  y  yyyy  y  y   yy  yyy  yy
 y  yyy  y  yyy y  y  y     yy yy  y  y  yy y  y  yy   y  y y  y
  y  y y  y  y   y  y  yyyy      y  y  y     y  y   yy  y    y  
y  y    y  y  yy  y  y  yy yyyyy  y  y  yyyy  y  yy   y  yyy  yy
 y  yyy  y  y   y  y  y     yyy y  y  y  yy y  y   yy  y  y y  y
  y  y y  y  yy  y  y  yyyy  y   y  y  y     y  yy   y  y    y  
y  y    y  y   y  y  y  yy y  yy  y  y  yyyy  y   yy  y  yyy  yy
 y  yyy  y  yy  y  y  y     y   y  y  y  yy y  yy   y  y  y y  y
  y  y y  y   y  y  y  yyyy  yy  y  y  y     y   yy  y  y    y  
y  y    y  yy  y  y  y  yy y   y  y  y  yyyy  yy   y  y  yyy  yy
 y  yyy  y   y  y  y  y     yy  y  y  y  yy y   yy  y  y  y y  y
  y  y y  yy  y  y  y  yyyy   y  y  y  y     yy   y  y  y    y  
y  y    y   y  y  y  y  yy yy  y  y  y  yyyy   yy  y  y  yyy  yy
 y  yyy  yy  y  y  y  y      y  y  y  y  yy yy   y  y  y  y y  y
  y  y y   y  y  y  y  yyyyy  y  y  y  y      yy  y  y  y    y  
y  y    yy  y  y  y  y  yyy y  y  y  y  yyyyy   y  y  y  yyy  yy
 y  yyy   y  y  y  y  y  y   y  y  y  y  yyy yy  y  y  y  y y  y
  y  y yy  y  y  y  y  y  yy  y  y  y  y  y    y  y  y  y    y  
y  y     y  y  y  y  y  y   y  y  y  y  y  yyy  y  y  y  yyy  yy
 y  yyyy  y  y  y  y  y  yy  y  y  y  y  y  y y  y  y  y  y y  y
  y  yy y  y  y  y  y  y   y  y  y  y  y  y    y  y  y  y    y  
y y     y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y yyy y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
  y  y  y  y  y  y  y  y y y  y  y  y  y  y    y  y  y  y    y  
y y  y  y  y  y  y  y  y y y  y  y  y  y  y yy y  y  y  y yy y y
yy  y  y  y  y  y  y  y y y  y  y  y  y  y y yy  y  y  y y yy y 
 y y  y  y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y yy y
y y  y  y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y yy 
 y  y  y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y yy
y  y  y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y
y y  y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y 
 y  y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y
y  y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y 
  y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y
 y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y 
y  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  
  y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y
 y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y 
y  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  
  y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y
 y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y 
y  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  
  y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y
 y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y 
y  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  
  y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y
 y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y 
y y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  
 y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y
y y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y 
 y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y
y  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y 
  y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y
 y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y 
y  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  
  y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y
 y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y 
y  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  
  y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y
 y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y 
y  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  
  y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y
 y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y 
y  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  
  y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y
 y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y 
y y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y  
 y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y  y
y y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y  y 
 y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y  y y
y y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y  y y 
 y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y  y y y
y y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y  y y y 
 y  y  y y y y y y y y y  y  y  y  y  y y y  y  y  y  y  y y y y
</div>



[0]: https://github.com/arrogantrobot/textruder "textruder github"
[1]: http://archetyp.al/cellular-automata-rule-explorer "cellular automata rule explorer"
[2]: http://www.stephenwolfram.com/publications/articles/ca/83-cellular/ "wolfram 1983"
[3]: http://www.cmake.org/ "cmake website"
[4]: https://play.google.com/store/apps/details?id=com.farawaylabs.android.emergentwallpaper "Emergent Wallpaper"
