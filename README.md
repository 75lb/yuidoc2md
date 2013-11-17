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

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/73a8cb7dd34b538b81fbfa6d8339aee2 "githalytics.com")](http://githalytics.com/75lb/yuidoc2md)
[![NPM](https://nodei.co/npm-dl/yuidoc2md.png?months=1)](https://nodei.co/npm/yuidoc2md/)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/75lb/yuidoc2md/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
