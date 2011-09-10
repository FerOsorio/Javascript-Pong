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
      console.log("goUp...");
    }else if(keyCode == ctrl.keyDown){
      that.goDown = true;
      console.log("goDown...");
    }else{
      that.goUp = that.goDown = false;
    }

  });
};
