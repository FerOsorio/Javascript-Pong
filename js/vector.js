(function(exports){
    /*
    * Vector class definition, this class contains three main properties:
    * x = Horiontal position for the current vector
    * y = Vertical position for the current vector
    * v = Velocity of the current vector. Constraints: v >= 0.
    * */
    exports.Vector = function(x, y){
      this.x = x || 0;
      this.y = y || 0;

      this.scalar = function(scalar){
        this.x *= scalar || 1;
        this.y *= scalar || 1;

        return this;
      }

      this.sum = function(vector){
        var tmp = Vector.sum(this, vector);
        this.x = tmp.x;
        this.y = tmp.y;
        return this;
      }

      return this;
    }

    exports.Vector.prototype.set =
    function(x,y) {
      this.x = x || 0;
      this.y = y || 0;
    };

    /*
    * Gets the length of the vector.
    * */
    exports.Vector.prototype.length = 
    function() {
      return Math.sqrt(
        (this.x * this.x) + (this.y * this.y)
      );
    };

    /*
    * Gets the dot product between the current instance of the vector and vector "b"
    * */
    exports.Vector.prototype.dot =
    function(b) {
      if(!b || !(b instanceof Vector)){
        throw {Message:'Invalid parameter. Expected Vector.'};
      }
      return (this.x * b.x)+(this.y * b.y);
    };
    
    exports.Vector.prototype.normalize =
    function() {
      var len = this.length();
      return new Vector(this.x / len, this.y / len);
    };

    exports.Vector.prototype.toString =
    function() {
        return "<x:"+ this.x.toFixed(2) +",y:"+ this.y.toFixed(2) +">";
    };

    exports.Vector.operator = function(delegate){
      console.log(arguments);
      if(typeof delegate !== 'function'){
        throw {Message:'Invalid function delegate'};
      }

      var curVector = undefined,
          resVector = new Vector(),
          vectors = arguments[1] || [];

      for(var i=0; i<vectors.length;i++){
        if((curVector=vectors[i]) instanceof Vector){
          delegate(resVector, curVector);
        }
      }
      return resVector;
    }

    exports.Vector.sum = function(){
      return Vector.operator(function(res, cur){
        res.x+= cur.x;
        res.y+= cur.y;
      }, arguments);
    }

    exports.Vector.sub = function(){
      return Vector.operator(function(res, cur){
        res.x-= cur.x;
        res.y-= cur.y;
      },arguments);
    }

    /*
    * Gets the scalar distance in pixels from one vector to another
    * */
    exports.Vector.prototype.distance =
    function() {
      return Vector.operator(function(a, b){
       var deltaX = b.x - a.x;
       var deltaY = b.y - a.y;

       return Math.sqrt((deltaX*deltaX)+(deltaY*deltaY));

      }, arguments);
    };

}( typeof exports === 'undefined' ?  this : exports ));
