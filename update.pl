#!/usr/bin/env perl

use strict;
use warnings;
use Term::ANSIColor;

system("rake generate");

system("git st");

system("git add .");
print color("green"), "==============================\n";

my $message;
while( ! $message) {
    print color("green"), "Enter commit message: ";
    chomp($message = <>);
    if (not $message) {
        print color("red"), "no message received, please enter a commit message.\n";
    }
}
print color("green"), "==============================\n";
print color("reset");
system("git commit -m \"$message\"");
system("git push heroku master");


print color("green"), "==============================\n\n";
print color("green"), "Done updating. Pushing backup to github...\n";
print color("green"), "==============================\n\n";
print color("reset");

system("git push github master");

print color("green"), "==============================\n\n";
print color("blue"), "completed!\n";
print color("green"), "==============================\n\n";
print color("reset");
