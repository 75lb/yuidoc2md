yuidoc2md
=========
A markdown generator for yuidoc documentation. 

Usage
-----
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



[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/73a8cb7dd34b538b81fbfa6d8339aee2 "githalytics.com")](http://githalytics.com/75lb/yuidoc2md)
