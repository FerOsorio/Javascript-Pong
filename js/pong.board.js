var Board = function(){
  this.width = 100;
  this.height = 100;
  this.fillStyle = "rgb(0,0,0)";
  this.initialize.apply(this, arguments);
}

Board.prototype.initialize =
function(width, height) {
  this.width = width || 100;
  this.height = height || 100;
  return this;
};

Board.prototype.draw =
function(ctx) {
  ctx.fillStyle = this.fillStyle;
  ctx.fillRect(0,0,this.width, this.height);
  //Draw dashed line in the middle of the field
  var split_height = 10,
  split_space_height = 3,
  split_x = ctx.canvas.width/2,
  split_y_min = 0,
  split_y_max = ctx.canvas.height;
  ctx.lineWidth = 5;
  ctx.strokeStyle = "white";
  
  ctx.beginPath();
  for(i = 1 ; i < split_y_max ; i+= split_height + split_space_height  ){
   ctx.moveTo(split_x, i);
   ctx.lineTo(split_x, i + split_height);
   ctx.moveTo(split_x, i + split_height + split_space_height);
  }
  ctx.stroke();

};

