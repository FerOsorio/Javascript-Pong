(function(exports){
  var canvas  = document.getElementById( 'canvas' ),
      ctx     = canvas.getContext( '2d' )
      gameLoop = null;

  var Pong = function(){
    this.board = new Board(500, 300);
    this.puck = new Puck;
    this.playerOne = new Paddle({keyUp:87, keyDown:83});
    this.playerTwo = new Paddle({keyUp:38, keyDown:40});
    this.initialize.apply(this, arguments);
  };

  Pong.prototype.initialize =
  function() {
    //Set the event listeners
    this.setControllerHandler = this.setController.apply(this,[{
      PauseKeyCode:27,  //ESC Key
      StartKeyCode:13   //ENTER Key
    }]);
    //Set the canvas' width/height based on the board's dimension.
    canvas.width = this.board.width ;
    canvas.height = this.board.height;
    //Set the players in the correct position
    var boardHeight = this.board.height;
    var boardWidth = this.board.width;
    this.playerOne.position.set(10,boardHeight / 2 - this.playerOne.height / 2);
    this.playerTwo.position.set(boardWidth-10 - this.playerTwo.width, boardHeight / 2 - this.playerTwo.height / 2);
    //Set the puck in the initial position
    this.puck.position.set(boardWidth / 2 - this.puck.width / 2, boardHeight / 2 - this.puck.height / 2 );

    //Initialize the game main loop
    this.draw();
  };

  Pong.prototype.gameState = 
  (function(){
    return {
      isInProgress:false,
      isFinished:false,
      isPaused:false,

      reset:function(){
        this.isInProgress = false;
        this.gameState.isFinished = false;
        this.isPaused = false;
      },

      start:function(){
        if(!this.isInProgress){
          this.isInProgress = true;
          this.isFinished = false;
          this.isPaused = false;
          return true;
        }
        return false;
      },

      end: function(){
        this.isInProgress = false;
        this.isFinished = true;
        this.isPaused = false;
      },

      togglePause:function(){
        if(this.isInProgress){
          this.isPaused = !this.isPaused;
          return true;
        }
        return false;
      }
    }
  })();

  Pong.prototype.draw =
  function() {
    var that = this;

    this.board.draw(ctx);
    this.puck.draw(ctx);
    this.playerOne.draw(ctx);
    this.playerTwo.draw(ctx);

    //Collision detection
    Collision.rectangle(this.playerOne, this.puck, function(res){
      console.log("collision detected");
      that.puck.direction.scalar(-1);
    });

  };

  Pong.prototype.start =
  function() {
      if(this.gameState.start()){
        console.log("begin pong.start");
        this.puck.move();
        this.update();
        console.log("end pong.start");
      }
  };

  Pong.prototype.pause =
  function() {
     if(this.gameState.togglePause()){
      console.log("begin pong.pause");
      console.log("GameState.isPaused: " + this.gameState.isPaused);
      console.log("end pong.pause");
     }
  };

  Pong.prototype.update =
  function() {
    window.requestAnimationFrame( pong.update );
    if(!pong.gameState.isPaused){
      pong.draw();
    }
  };

  //Event handlers
  Pong.prototype.setController =
  function() {
    var that = this;
    var ctrl = arguments[0];
    document.addEventListener('keydown',function(e){
      var gs = that.gameState;
      switch(e.keyCode) {
          case ctrl.PauseKeyCode:
            that.pause();
            break;
          case ctrl.StartKeyCode:
            that.start();
            break;
        }
    });
  };

  function drawScores(){
    //TODO: Implement this method
  }

  exports.pong = new Pong();
})(this.window);
