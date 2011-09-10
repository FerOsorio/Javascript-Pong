var collision = {}

collision = {
	/*
		Detects the collision between two rectabgle objects
	*/
	rectangleDetection:function(obj1, obj2){	
		var yCollision = obj1.y >= obj2.y && obj1.y <= obj2.y + obj2.height;
	  	var xCollision = obj1.x >= obj2.x && obj1.x <= obj2.x + obj2.width ||
 			obj1.x + obj1.width >= obj2.x && obj1.x + obj1.width <= obj2.x + obj2.width;
 		
 		return {
 			collide: yCollision && xCollision,
 			yCollision: yCollision,
 			xCollision: xCollision,
 			//TODO: return the side of the collision based on the object 1
 			side: 0
 		} 		
	}
}