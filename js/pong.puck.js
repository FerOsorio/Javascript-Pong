/*
* Represents a puck in the pong game
* */
var Puck = function(){
  this.color = "white",
  this.width = 10,
  this.height = 10,
  this.position = new Vector,
  this.direction = new Vector,
  this.speed = {
    current:0,
    min:5,
    max:7,
    decay:-0.025
  }, 
  this.friction = .025;
  this.initialize.apply(this, arguments);
};
/*
* Initializes a new instance of the Puck object and replaces the base constructor method.
* */
Puck.prototype.initialize =
function() {
  console.log('Puck begin pong.puck.initialize');
  return this;
}
/*
* Displays the object in the provied 2d context.
* */
Puck.prototype.draw =
function(ctx) {

  //Recalculate the current speed of the puck
  this.speed.current += this.speed.decay;
  if(this.speed.current <= this.speed.min){
    this.speed.current = this.speed.min;
  }

  //Boundary limits
  var pos = this.position,
      dir = this.direction,
      cnv = ctx.canvas;

  pos.x += dir.x * this.speed.current;
  pos.y += dir.y * this.speed.current; 

  if(pos.x <= 0 || pos.x + this.width >= cnv.width){
    dir.x *= -1;
    //this.speed.current = (Math.random() * this.speed.max)+this.speed.min;
  }

  if(pos.y <=0 || pos.y + this.height >= cnv.height){
    dir.y *= -1;
  }


  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  ctx.stroke();
};

Puck.prototype.move =
function() {
  // bodydd...
  var angle = (Math.random() * 360)+1;
  var deltaX = Math.sin(angle);
  var deltaY = Math.cos(angle);
  this.direction = new Vector(deltaX, deltaY).normalize();
  this.speed.current = 5;
};

//Resets the position of the puck to the center of the board
Puck.prototype.reset =
function(){
  //TODO: Method not implemented
}
