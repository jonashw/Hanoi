function PegAreaGraphic(options){
	this.ctx = options.ctx;
	this.x = options.x;
	this.y = options.y;
	this.width = options.width;
	this.height = options.height;
	this.peg = options.peg;
	var self = this;
	EventRegistry.addListener(this.ctx.canvas, 'click', function(coords){
		if(self.containsPoint(coords)) EventRegistry.notifyListeners(self, 'click');
	});
}
PegAreaGraphic.prototype.containsPoint = function(point){
	var self = this;
	var y2 = this.height - this.y;
	var y1 = -this.y;
	var x1 = this.x;
	var x2 = this.x + this.width;
	//console.log(x1,x2,y1,y2);
	return (point.x >= x1 && point.x <= x2) && (point.y >= y1 && point.y <= y2);
}
PegAreaGraphic.prototype.draw = function(){
	this.ctx.save();
	this.ctx.fillStyle = this.peg.selected ? colors.lightGray : colors.white;
	this.ctx.fillRect(this.x,this.y,this.width,this.height);
	this.ctx.restore();
}
PegAreaGraphic.prototype.toString = function(){
	return 'PegAreaGraphic' + this.peg.id;
}
PegAreaGraphic.prototype.valueOf = function(){
	return 'PegAreaGraphic' + this.peg.id;
}
