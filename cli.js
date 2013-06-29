#!/usr/bin/env node
"use strict";

var y2md = require("./lib/yuidoc2md"),
    fs = require("fs"),
    path = require("path"),
    Thing = require("nature").Thing;

global.l = console.log;
process.argv.splice(0, 2);

var options  = new Thing()
    .mixIn(y2md.getMarkdown.getOptions())
    .set(process.argv);

var markdowns = y2md.getMarkdown(options);
l(markdowns);
