/**
@module fixture
*/

/**
The description for ClassA
@class ClassA
@constructor
*/
function ClassA(){
    
    /**
    @property someProp
    @type String
    @example
        this.someProp = "test property";
    */
    this.someProp = "whatever";
}

/**
@method methodA
@param {String} str A string
@param {Number} num A number
*/
ClassA.prototype.methodA = function(){};

