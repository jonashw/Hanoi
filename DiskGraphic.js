function DiskGraphic(board, disk, x, y, color){
	this.disk=disk;
	this.x = x;
	this.y = y;
	this.color = color;
	this.thickness = 5;
	this.radiusFactor = 5;
	this.ctx=board.ctx;
}
DiskGraphic.prototype.draw = function(){
	var radius = this.disk.radius * this.radiusFactor;
	var thicknessRadius = parseInt(this.thickness/2);
	this.ctx.save();
	this.ctx.fillStyle = this.color;
	this.ctx.beginPath();
	this.ctx.moveTo(this.x + radius, this.y - thicknessRadius);
	this.ctx.lineTo(this.x + radius, this.y + thicknessRadius);
	this.ctx.lineTo(this.x - radius, this.y + thicknessRadius);
	this.ctx.lineTo(this.x - radius, this.y - thicknessRadius);
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
