(function(){

 var SCREEN_WIDTH = window.innerWidth,
 SCREEN_HEIGHT = window.innerHeight,
 canvas = document.querySelector( 'canvas' ),
 ctx = canvas.getContext( '2d' ),
 sounds = {}; 
 
 var pong = {
 	//Play board
 	board: {
 		draw:function(){
			//Draw the black background in the field
			ctx.fillStyle = 'black';
			ctx.fillRect(0,0,500,300);
			
			//Draw the field separation
			
			var split_height = 10,
			split_space_height = 3,
			split_x = canvas.width/2,
			split_y_min = 0, 	
			split_y_max = canvas.height;
			ctx.lineWidth = 5;
			ctx.strokeStyle = "white";
			
			ctx.beginPath();
			
			for(i = 1 ; i < split_y_max ; i+= split_height + split_space_height  ){				
				ctx.moveTo(split_x, i);
				ctx.lineTo(split_x, i + split_height);
				ctx.moveTo(split_x, i + split_height + split_space_height);
				
			}
			ctx.stroke(); 
			
			//Draw the goals for each player (just for testing)
 		}
 	},
 	//Pock sprite
 	pock : {
 		color:'white',
 		width:10,
 		height:10,
 		x:0,
 		y:0,
 		speed:5,
 		x_direction: 1,
 		y_direction: 1,
 		init:function(){
 			this.x_direction = Math.ceil(Math.random()*2)-1 == 0 ? -1 : 1;
 			this.y_direction = Math.ceil(Math.random()*2)-1 == 0 ? -1 : 1;
 			this.x = canvas.width/2 - this.width/2;
 			this.y = canvas.height/2 - this.height/2;
 		},
 		draw:function(){
 			//console.log('begin pong.pock.draw');
 			ctx.fillStyle = this.color;
 			ctx.fillRect(this.x,this.y,this.width,this.height);
 			//console.log('end pong.pock.draw'); 			
 		}
 	},

 	
 	//Players
 	players : [new Player(1), new Player(2)]
 };
 
 /*
 	Draw:
 */
 pong.draw = function(){

	//console.log('begin pong.draw'); 
	
 	pong.board.draw();
 	pong.pock.draw(); 	
 	pong.players[0].draw(ctx);
 	pong.players[1].draw(ctx);
 	
 	//Detect collision with the player's bar
    player1 = pong.players[0];
    player2 = pong.players[1];
 	
 	//Detect collision with the player's bar
 	var collisionPlayerOne = collision.rectangleDetection(pong.pock, player1),
 	collisionPlayerTwo = collision.rectangleDetection(pong.pock, player2);
 	
 	if(collisionPlayerTwo.collide || collisionPlayerOne.collide){
		pong.pock.x_direction *= -1;
		//pong.pock.y_direction =  Math.ceil(Math.random()*2)-1 == 0 ? -1 : 1
 		sounds.pong.play();
 	}
 	
 	//Detect collision with the goals
 	
 	//Detect collision with the borders
 	
 	if( pong.pock.x <= 0 ){
 		pong.pock.x_direction = 1;
 		player2.score();
 		sounds.score.play();
 	}else if( pong.pock.x > canvas.width - pong.pock.width ){
 		pong.pock.x_direction = -1;
 		player1.score();
 		sounds.score.play();
 	}
 	
 	if( pong.pock. y < 0 ){
 		pong.pock.y_direction = 1;
 		sounds.border.play();
 	}else if(pong.pock.y > canvas.height - pong.pock.height){
 		pong.pock.y_direction = -1;
 		sounds.border.play();
 	}
 	
 	pong.pock.x += pong.pock.x_direction * pong.pock.speed ;
 	pong.pock.y += pong.pock.y_direction * pong.pock.speed ;
	
	
	//console.log('end pong.draw'); 		
 	 	
 }
 /*
 	Update: 
 	Updates the game at every defined N seconds
 */
 pong.update = function(){
  	
 	//Initialize game main loop    
    window.requestAnimationFrame( pong.update );
    pong.draw();
    
 };
 /*
  This is the entry point of the application, the first screen
  will be render here and the animation frame will be invoked 
  from here as well.
 */
 pong.init = function(){
 	console.log('begin pong.init');
 	
 	//Load Sounds
 	sounds.border = new Audio('./snd/pong.mp3');
 	sounds.pong = new Audio('./snd/pong2.mp3');
 	sounds.score  = new Audio('./snd/score.mp3');
 	
 	//Adjust canvas size
 	canvas.width = 500;//SCREEN_WIDTH;
 	canvas.height = 300;//SCREEN_HEIGHT; 	
 	
 	//Draw the initial screen
 	pong.pock.init();
 	
 	pong.draw();
 	pong.update();
 	
 	
 	console.log('end pong.init');
 }
 
 /**
  * Provides requestAnimationFrame in a cross browser way.
  * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  */
 if ( !window.requestAnimationFrame ) {
   window.requestAnimationFrame = ( function() {
     return window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.oRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
       window.setTimeout( callback, 1000 / 60 );
     };
   } )();
 }
 
 pong.init();

})();


