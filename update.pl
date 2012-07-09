#!/usr/bin/env perl

use strict;
use warnings;

system("rake generate");

system("git st");

system("git add .");

my $message;
while( ! $message) {
    print "Enter commit message: ";
    chomp($message = <>);
    if (not $message) {
        print "no message received, please enter a commit message.\n";
    }
}
system("git commit -m \"$message\"");
system("git push heroku master");

print "Done updating. Pushing backup to github...\n";

system("git push github master");

print "completed!\n";
