/**
@module form
*/

/**
The description for Select
@class Select
@extends Object
@uses clive.txt
@uses hater.txt
@constructor
@param arg1 {String} arg1 description
@param arg2 {Number} arg2 description
*/
function Select(arg1, arg2){
    
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
Select.prototype.methodA = function(){};

