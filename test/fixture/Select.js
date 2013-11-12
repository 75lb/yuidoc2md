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
@example var select = new Select(one, two);
*/
function Select(arg1, arg2){
    
    /**
    A property called someProp
    @property someProp
    @type String
    @default "whatever"
    @example
    set a value: 
    
        this.someProp = "val";
    */
    this.someProp = "whatever";

    /**
    @property anotherProp
    @type String
    @default "don't care"
    @example this.anotherProp = "val";
    */
    this.anotherProp = "don't care";
}

/**
@method methodA
@param {String} str A string
@param {Number} num A number
@return {Number} return val
@chainable
@example
THis is how to use it: 

    select.methodA(some, shit);

*/
Select.prototype.methodA = function(){};

/**
This is Method B

@method methodB
@param {String} str A string
@param {Number} num A number
@return {Number} return val
*/
Select.prototype.methodB = function(){
    /**
    it emits an event
    @event somthing
    @param {String} message The message for the event
    */
    this.emit("something", message);
};
