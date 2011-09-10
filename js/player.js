function Player(side){

	var score = 0;
	this.width = 14;
	this.height = 50;
	this.color = "white";	
	this.name = "";
	this.side = side;
	this.y = 10;
	this.x = 10;
	this.speed = 30;
	
	this.getWidth = function(){
		return this.width;
	}	
	
	this.getHeight = function(){
		return this.height;
	}
	
	this.score = function(){
		score+=1;
	}
	
	this.getScore = function(){
		return score;
	}
		
	//AddEvent Listeners for player
	if(this.side == 1){	
		this.setControllerHandler = this.setController.apply(this, [{
			UP_KeyCode:87,
			DOWN_KeyCode:83
		}]);
	}else if( this.side == 2 ){
		this.setControllerHandler = this.setController.apply(this, [{
			UP_KeyCode:38,
			DOWN_KeyCode:40
		}]);
	}
}

Player.prototype.draw = function(ctx){
	//Validate the boundaries for the vertial movement at the top
	if(this.y < 0) 
		this.y = 0;
	//Validate the boundaries for the vertial movement at the bottom		
	if(this.y + this.getHeight() > ctx.canvas.height) 
		this.y = ctx.canvas.height - this.getHeight();
		
	if(this.side == 1){			
		this.x = 10;
		ctx.font="30pt Lucida Console, monospace"
		ctx.fillText(this.getScore(), ctx.canvas.width/2 - 100, 50)
	}else if( this.side == 2 ){
		this.x = ctx.canvas.width - 10 - this.width;
		ctx.font="30pt Lucida Console, monospace"
		ctx.fillText(this.getScore(), ctx.canvas.width/2 + 100, 50)

	}
	
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.getWidth(), this.getHeight());
}

Player.prototype.setController = function(controller){
	var that = this,
	ctrl = arguments[0];
	
	document.addEventListener('keydown',function(e){
			if(e.keyCode == ctrl.UP_KeyCode){	
				that.y -= that.speed;	
			}else if(e.keyCode == ctrl.DOWN_KeyCode ){
				that.y += that.speed;
			}			
		}, false);	
}