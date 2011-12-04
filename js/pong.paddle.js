var Paddle = function(){
  this.score = 0;
  this.color = "white",
  this.width = 14,
  this.height = 50,
  this.position = new Vector,
  this.speed = 5, 
  this.friction = .025;
  this.args = {};
  this.goUp = false;
  this.goDown = false;
  this.initialize.apply(this, arguments); 
}

Paddle.prototype.initialize =
function(args) {
  this.args = args;
  //Create the handlers for the game
  this.setControllerHandler = this.setController.apply(this, [args]);
};

Paddle.prototype.draw =
function(ctx) {
  
  if(this.goUp){
    this.position.y-=this.speed;
    if(this.position.y <= 0)
      this.position.y = 0;
  }else if(this.goDown){
    this.position.y+=this.speed;
    if(this.position.y + this.height >= ctx.canvas.height)
      this.position.y = ctx.canvas.height - this.height;
  }

  ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Paddle.prototype.setController =
function() {
  var that = this;
  var ctrl = arguments[0];
  document.addEventListener('keydown', function(e){
    
    var keyCode = e.keyCode;
    if(keyCode == ctrl.keyUp){
      that.goUp = true;
    }else if(keyCode == ctrl.keyDown){
      that.goDown = true;
    }

  });

  document.addEventListener('keyup',function(e){
    var keyCode = e.keyCode;
    if(keyCode == ctrl.keyUp){
      that.goUp = false
    }else if(keyCode == ctrl.keyDown){
      that.goDown = false;
    }
  });
};
