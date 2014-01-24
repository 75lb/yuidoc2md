[![NPM version](https://badge.fury.io/js/yuidoc2md.png)](http://badge.fury.io/js/yuidoc2md)
[![Dependency Status](https://david-dm.org/75lb/yuidoc2md.png)](https://david-dm.org/75lb/yuidoc2md)
![Analytics](https://ga-beacon.appspot.com/UA-27725889-14/yuidoc2md/README.md?pixel)

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
$ yuidoc2md [options] <files>

-t, --template    A handlebars template filename to override the default
-j, --json        Output json
-h, --help        Print this help
```

Output markdown doc for all source under `src/` to `stdout`:
```sh
$ yuidoc2md src/*
```

Output markdown doc for all source under `src/` to a file:
```sh
$ yuidoc2md src/* > documentation.md
```

Generate using your own [handlebars](http://handlebarsjs.com) template:
```sh
$ yuidoc2md src/* --template mytemplate.hbs
```

Generate html using [marked](https://github.com/chjj/marked):
```sh
$ yuidoc2md src/* | marked
```

Generate JSON
```sh
$ yuidoc2md src/* --json
```

[![NPM](https://nodei.co/npm-dl/yuidoc2md.png?months=3)](https://nodei.co/npm/yuidoc2md/)
