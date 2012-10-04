function DiskGraphic(options){
	this.ctx = options.ctx;
	this.disk = options.disk;
	this.color = options.color;
	this.thickness = ('thickness' in options) ? options.thickness : 5;
	this.radiusFactor = ('radiusFactor' in options) ? options.radiusFactor : 5;
	var self = this;
	EventRegistry.addListener(this.ctx.canvas, 'click', function(coords){
		console.log('canvas click detected by ' + self, coords);
	});
}
DiskGraphic.prototype.draw = function(){
	//console.log('Draw called on ' + this);
	var radius = this.disk.radius * this.radiusFactor;
	var x = this.disk.peg.graphic.x;
	var y = this.disk.index * this.thickness;
	this.ctx.save();
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.moveTo(x + radius, y);
	this.ctx.lineTo(x + radius, y + this.thickness);
	this.ctx.lineTo(x - radius, y + this.thickness);
	this.ctx.lineTo(x - radius, y);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.restore();
	//this.drawCenter();
}
DiskGraphic.prototype.drawCenter = function(){
	this.ctx.save();
	this.ctx.fillStyle = colors.black;
	this.ctx.fillRect(this.x,this.y,1,1);
	this.ctx.restore();
}
DiskGraphic.prototype.toString = function(){
	return 'DiskGraphic' + this.disk.radius;
}
