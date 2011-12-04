var Collision = function(){

}

Collision.rectangle = function(a, b, callback){
  var yCollision = a.position.y >= b.position.y && a.position.y <= b.position.y + b.height;
  var xCollision = a.position.x >= b.position.x && a.position.x <= b.position.x + b.width ||
                   a.position.x + a.width >= b.position.x && a.position.x + a.width <= b.position.x + b.width;

  var res = {
    collide: xCollision && yCollision,
    yCollision: yCollision,
  }

  if(res.collide){
    callback(res);
  }

  return res;
}
