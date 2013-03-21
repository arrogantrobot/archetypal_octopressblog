---
layout: post
title: "Digital Ocean hosting: error 2002 can't connect with local server, and a solution"
date: 2013-03-21 00:12
comments: true
categories: [tech-support]
---

I have recently started using [Digital Ocean][0] for hosting. I was previously using the free [Heroku][1] hosting, which I liked very much. The DNS was a bit tricky to set up, but once it got configured, it was smooth. I was able to get a one second load time for the archetyp.al index. It's all static files, but I was still happy with Heroku, especially for free. However, I've been diving much deeper into web development lately, and I've decided I need a larger base of operations on the web, and Digital Ocean was at the top of my short list of candidates (along with dreamhost and linode). The SSD's on every machine is what finally sold me.

I've been working on a rails project lately, and I need a dev machine on the cloud for testing purposes. So I found myself needing to set up a rails environment on my new Digital Ocean instance. I naturally went with my friend [chris's][2] excellent blog on [setting up rails for Ubuntu 12.10 with NginX, etc][3]. I decided to go with MySQL instead of postgres.

<!-- more -->

ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'
---------
When I went through the steps outlined in Chris's blog, I encountered a few snags, including an issue where I couldn't compile Nginx with Passenger support because I didn't have enough ram (I'll write about this soon). I was able to finish after some tinkering. So when it came time to 'rake db:migrate', I pushed button and did NOT receive bacon:

{% codeblock ERROR 2002 (HY000) %}
[rob@mandelbrot ~ ] sudo mysql -u root -p
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'
{% endcodeblock %}

Naturally, I went through the various steps one takes when cryptic error messages arise. I checked to see if the mysql process was running:

{% codeblock No MySQL process running %}
[ rob@mandelbrot ~ ] ps aux | grep mysql
rob      11749  0.0  0.0   9388   884 pts/1    S+   00:40   0:00 grep --color=auto mysql
{% endcodeblock %}

Indeed, the process was not running. Right. So at least the basic problem is known now, the mysql-server process itself is not running. So what next? Well, let's try to start it!

{% codeblock service restart failed.. %}
[ rob@mandelbrot ~ ] sudo service mysql start
start: Job failed to start
{% endcodeblock %}

Again, no bacon. So I then attempted to re-install the mysql-server package.

{% codeblock purge mysql-servr package %}
[ rob@mandelbrot ~ ] sudo apt-get remove mysql-server --purge
{% endcodeblock %}

Again, negative in the bacon dimension. The same results from attempting to start the mysql service. Then finally, I came across the right answer on the [askubuntu][4] stack exchange site. After stumbling through many forum threads where the complete removal of mysql-server was never quite reached, askubutu came through:

{% codeblock completely remove mysql-server for real %}
sudo apt-get purge mysql-server mysql-common
sudo rm -rf /var/lib/mysql
sudo apt-get clean
sudo apt-get install mysql-server
{% endcodeblock %}

That finally did it. After going through the setup process again, I had a working database server.

[0]: https://www.digitalocean.com/ "Digital Ocean"
[1]: http://www.heroku.com/ "Heroku"
[2]: http://excid3.com/ "excid3"
[3]: http://excid3.com/blog/setting-up-rails-on-ubuntu-12-10-quantal-quetzal-with-ruby-node-js-nginx-passenger-and-mysql-or-postgres/#.UUqZKXGGggR "excid3 on rails setup"
[4]: http://askubuntu.com/a/213353 "askubuntu"
