function DiskGraphic(options){
	this.ctx = options.ctx;
	this.disk = options.disk;
	this.color = options.color;
	this.thickness = ('thickness' in options) ? options.thickness : 5;
	this.radiusFactor = ('radiusFactor' in options) ? options.radiusFactor : 5;
	var self = this;
}
DiskGraphic.prototype.getCenter = function(){
	var self = this;
	return {'x':self.disk.peg.graphic.x, 'y': (self.disk.index * self.thickness)};
}
DiskGraphic.prototype.getCorners = function(){
	/*
			  y1	 
		x1			x2	
			  y2 
	*/
	var self = this;
	var center = this.getCenter();
	var radius = this.disk.radius * this.radiusFactor;
	return {x1: center.x-radius, x2:center.x+radius , y1:center.y, y2:center.y+self.thickness};
}
DiskGraphic.prototype.containsPoint = function(point){
	var corners = this.getCorners();
	var y1 = this.ctx.canvas.height-corners.y2;
	var y2 = this.ctx.canvas.height-corners.y1;
	return (point.x >= corners.x1 && point.x <= corners.x2) && (point.y >= y1 && point.y <= y2);
}
DiskGraphic.prototype.draw = function(){
	var corners = this.getCorners();
	this.ctx.save();
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.moveTo(corners.x1, corners.y1);
	this.ctx.lineTo(corners.x2, corners.y1);
	this.ctx.lineTo(corners.x2, corners.y2);
	this.ctx.lineTo(corners.x1, corners.y2);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.restore();
	//this.drawCenter();
}
DiskGraphic.prototype.drawCenter = function(){
	this.ctx.save();
	var center = this.getCenter();
	this.ctx.fillStyle = colors.black;
	this.ctx.fillRect(center.x,center.y,1,1);
	this.ctx.restore();
}
DiskGraphic.prototype.toString = function(){
	return 'DiskGraphic' + this.disk.radius;
}
