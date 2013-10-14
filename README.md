[![NPM version](https://badge.fury.io/js/yuidoc2md.png)](http://badge.fury.io/js/yuidoc2md)

yuidoc2md
=========
A markdown generator for yuidoc documentation. 

Install
-------
```sh
$ npm install -g yuidoc2md
```

*Linux/Mac users may need to run the above with `sudo`*


Usage
-----
```sh
Usage:
$ yuidoc2md [--exclude <src-dir-list>] [--template <filename>] [--output-dir <dir>] <src-dir> <src-dir> ...
$ yuidoc2md --input <filename> [--output <filename>]

-d, --output-dir  Where the output markdown files will be written
-e, --exclude     A comma-separated list of source directories to exclude
-t, --template    Override the built-in moustache template
-i, --input       Input file to process
-o, --output      Output file
-h, --help        Print this help
```

Write markdown documentation for all source under `src/` to the default output directory `yuidoc2md`:
```sh
$ yuidoc2md src/
```

Output to a specific folder
```sh
$ yuidoc2md src --output-dir out
```

Generate using your own [mustache](https://github.com/janl/mustache.js) template:
```sh
$ yuidoc2md src --template mytemplate.mustache
```

Read multiple source directories: 
```sh
$ yuidoc2md src/ lib/ test/
```

Operate on a file-by-file basis
```sh
$ yuidoc2md --input src/main.js --output docs/main.md
```


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/73a8cb7dd34b538b81fbfa6d8339aee2 "githalytics.com")](http://githalytics.com/75lb/yuidoc2md)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/75lb/yuidoc2md/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
