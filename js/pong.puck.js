/*
* Represents a puck in the pong game
* */
var Puck = function(){
  this.color = "white",
  this.width = 10,
  this.height = 10,
  this.position = new Vector,
  this.speed = 5, 
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
  console.log("begin Puck.draw");
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  ctx.stroke();
  console.log("end Puck.draw");
};
//Resets the position of the puck to the center of the board
Puck.prototype.reset =
function(){
  //TODO: Method not implemented
}
