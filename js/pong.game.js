(function(exports){

  var paused  = false,
      canvas  = document.getElementById( 'canvas' ),
      ctx     = canvas.getContext( '2d' );

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
    document.addEventListener('keydown', pongKeyDownHandler);
    exports.addEventListener('resize', pongOnResizeHandler);
    canvas.width = this.board.width ;
    canvas.height = this.board.height;
    //Set the players in the correct position
    var boardHalfHeight = this.board.height / 2;
    var boardWidth = this.board.width;
    this.playerOne.position.set(20,boardHalfHeight - this.playerOne.height / 2);
    this.playerTwo.position.set(boardWidth-20 - this.playerTwo.width, boardHalfHeight - this.playerTwo.height / 2);
    //Set the puck in the initial position
    this.puck.position.set(boardWidth/2 - this.puck.width /2, boardHalfHeight - this.puck.height / 2 );

    //Initialize the game main loop
    this.draw();
  };

  Pong.prototype.draw =
  function() {
    this.board.draw(ctx);
    this.puck.draw(ctx);
    this.playerOne.draw(ctx);
    this.playerTwo.draw(ctx);
  };

  //Event delegates
  function pongKeyDownHandler(e){
    switch(e.keyCode) {
      //ESC Key
      case 27:
        paused = ~paused;
        if(paused){
          console.log("Game paused");
        }else{
          console.log("Game unpaused");
        }
        break;
    }
  }

  function pongOnResizeHandler(){
    //throw not implemented exception
  }

  function drawScores(){
    //TODO: Implement this method
  }

  exports.pong = new Pong();

})(this.window);
