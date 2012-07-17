---
layout: post
title: "cae.js: hand it a canvas and stand back"
date: 2012-07-16 20:49
comments: true
categories: [ cellular-automata, javascript ]
---

The [cae.js project][0] is a distillation of the cellular automaton built into the earlier [cellular automata explorer][1] project. It is a self-contained [javascript class][2]. It can instantiated thusly:

First, include the cae.js source in your html:

{% codeblock include cae.js lang:html %}
<script src="/javascripts/cae.js"></script>
{% endcodeblock %}

Then create an instance of cae:

{% codeblock create a new cae object and start it lang:javascript %}
my_cae = new cae();
my_cae.init("my_canvas");
my_cae.draw();
{% endcodeblock %}

And that's it. Just replace "my_canvas" with the id of the canvas you'd like cae to draw upon, and it will determine the proper width and height. There are a few more moving pieces to fiddle with if you like. 

First, frames per second:

{% codeblock frames per second lang:javascript %}
my_cae.setFramesPerSecond(60);
{% endcodeblock %}

Depending upon your processor and browser, your outcome will vary greatly.

You can also set the number of pixels per cell:

{% codeblock pixels per cell lang:javascript %}
my_cae.setPixelsPerCell(5);
{% endcodeblock %}

The lower limit for pixels per cell is 1, with the upper limit being the min of the width and height of your canvas. Though one cell is going to make for a pretty boring display. Actually, now that I think of it, this would cause the cell to be its own neighbor...

<canvas id="my_canvas" width="100" height="100"></canvas>
<script type="text/javascript">
    my_cae = new cae();
    my_cae.setPixelsPerCell(100);
    my_cae.init("my_canvas");
    my_cae.draw();
</script>

I admit, it's not very exciting. I think I just invented the zero-dimensional cellular automata.

Now to something much more exciting:

<canvas id="my_other_canvas" width="300" height="700"></canvas>
<script type="text/javascript">
    my_other_cae = new cae();
    my_other_cae.setPixelsPerCell(5);
    my_other_cae.init("my_other_canvas");
    my_other_cae.draw();
</script>


[0]: https://github.com/arrogantrobot/cae.js "cae.js"
[1]: https://github.com/arrogantrobot/Cellular-Automata-Explorer "cellular automata explorer"
[2]: http://www.webmonkey.com/2010/02/make_oop_classes_in_javascript/ "functions all the way down"
