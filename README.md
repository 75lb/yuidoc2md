[![view on npm](http://img.shields.io/npm/v/yuidoc2md.svg)](https://www.npmjs.org/package/yuidoc2md)
![npm module downloads per month](http://img.shields.io/npm/dm/yuidoc2md.svg)
[![Dependency Status](https://david-dm.org/75lb/yuidoc2md.svg)](https://david-dm.org/75lb/yuidoc2md)
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

Globstar matching is supported, enabling recursive expressions like: (processes all .js files from the current directory down)
```sh
$ yuidoc2md "**/*.js"
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

Example
-------
Running yuidoc2md on this Javascript: 

```js
/**
@module form
*/

/**
The description for ComboBox
@class ComboBox
@extends Object
@uses clive.txt
@uses hater.txt
@constructor
@param arg1 {String} arg1 description
@param arg2 {Number} arg2 description
*/
function ComboBox(arg1, arg2){
    
    /**
    @property someProp
    @type String
    @default "whatever"
    @example this.someProp = "val";
    */
    this.someProp = "whatever";
}

/**
@method methodA
@param {String} str A string
@param {Number} num A number
@return {Number} return val
@chainable
*/
ComboBox.prototype.methodA = function(){};

/**
@method methodB
@param {Object} options An options hash
    @param {String} options.one First thing
    @param {Number} options.two Second thing
@return {Boolean} return val
*/
ComboBox.prototype.methodB = function(){};
```

would produce this markdown:

```md
#form/ComboBox

The description for ComboBox

**Extends**: Object  
**Uses**: 
* clive.txt
* hater.txt


##Properties

###someProp

**type**: String  
**default**: &quot;whatever&quot;

####Example
 this.someProp = "val";

##Methods

###methodA

**Chainable**: true

**Returns**: _Number_ - return val

**Params**:  
*   str _String_

    A string
*   num _Number_

    A number


###methodB

**Returns**: _Boolean_ - return val

**Params**:  
*   options _Object_

    An options hash
    * one _String_ - First thing
    * two _Number_ - Second thing
```

and this json:

```json
{
   "modules": [
      {
         "name": "form",
         "classes": [
            {
               "name": "ComboBox",
               "properties": [
                  {
                     "name": "someProp",
                     "type": "String",
                     "default": "\"whatever\"",
                     "examples": [
                        " this.someProp = \"val\";"
                     ]
                  }
               ],
               "methods": [
                  {
                     "name": "methodA",
                     "chainable": "true",
                     "params": [
                        {
                           "name": "str",
                           "description": "A string",
                           "type": "String"
                        },
                        {
                           "name": "num",
                           "description": "A number",
                           "type": "Number"
                        }
                     ],
                     "returns": {
                        "description": "return val",
                        "type": "Number"
                     }
                  },
                  {
                     "name": "methodB",
                     "chainable": null,
                     "params": [
                        {
                           "name": "options",
                           "description": "An options hash",
                           "type": "Object",
                           "props": [
                              {
                                 "name": "one",
                                 "description": "First thing",
                                 "type": "String"
                              },
                              {
                                 "name": "two",
                                 "description": "Second thing",
                                 "type": "Number"
                              }
                           ]
                        }
                     ],
                     "returns": {
                        "description": "return val",
                        "type": "Boolean"
                     }
                  }
               ],
               "events": [],
               "description": "The description for ComboBox",
               "extends": "Object",
               "uses": [
                  "clive.txt",
                  "hater.txt"
               ],
               "constructorArgs": [
                  {
                     "name": "arg1",
                     "description": "arg1 description",
                     "type": "String"
                  },
                  {
                     "name": "arg2",
                     "description": "arg2 description",
                     "type": "Number"
                  }
               ]
            }
         ]
      }
   ]
}
```
