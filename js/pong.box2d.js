var Box2D = function(){
  this.width;     //Number
  this.height;    //Number
  this.position;  //Vector
  this.direction; //Vector
  this.initialize.apply(this, arguments);
}

Box2D.prototype.initialize =
function(args) {
  this.width = args.width || 0;
  this.height = args.height || 0;
  this.position = args.position || new Vector;
  this.direction = args.position || new Vector;
  return this;
};

Box2D.prototype.minSpace =
function(){
  return new Vector(this.position.x, this.position.y);
}

Box2D.prototype.maxSpace =
function() {
  return new Vector(this.position.x + this.width, this.position.y + this.height);
};

Box2D.prototype.center =
function() {
  return new Vector(this.minSpace().x + this.width / 2,
                    this.minSpace().y + this.height / 2);
};
