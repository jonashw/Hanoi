function PegGraphic(options){
	this.x = options.x;
	this.y = options.y;
	this.peg = options.peg;
	this.ctx = options.ctx;
	this.height = options.height;
	this.thickness = ('thickness' in options) ? options.thickness : 4;
	var self = this;
}
PegGraphic.prototype.getOrigin = function(){
	var thicknessRadius = this.thickness/2;
	var self = this;
	return {'x':self.x-thicknessRadius,'y':self.y}; 
}
PegGraphic.prototype.getAreaCorners = function(){
	/*
			  y1	 
		x1			x2	
			  y2 
	*/
	var self = this;
	var origin = this.getOrigin();
	return {x1: origin.x, x2:origin.x+self.thickness , y1:origin.y, y2:origin.y+self.height};
}
PegGraphic.prototype.containsPoint = function(point){
	var corners = this.getCorners();
	var y1 = this.ctx.canvas.height-corners.y2;
	var y2 = this.ctx.canvas.height-corners.y1;
	return (point.x >= corners.x1 && point.x <= corners.x2) && (point.y >= y1 && point.y <= y2);
}
PegGraphic.prototype.draw = function(){
	var origin = this.getOrigin();
	var thicknessRadius = this.thickness/2;
	this.ctx.save();
	this.ctx.fillStyle = colors.gray;
	this.ctx.fillRect(origin.x, origin.y, this.thickness, this.height);
	this.ctx.restore();
	for(var d=0; d<this.peg.disks.length; d++){
		this.peg.disks[d].graphic.draw();
	}
}
PegGraphic.prototype.toString = function(){
	return 'PegGraphic' + this.peg.id;
}
