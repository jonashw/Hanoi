function PegGraphic(options){
	this.x = options.x;
	this.y = options.y;
	this.peg = options.peg;
	this.ctx = options.ctx;
	this.height = options.height;
	this.thickness = ('thickness' in options) ? options.thickness : 4;
}
PegGraphic.prototype.draw = function(){
	//console.log('draw called on ' + this);
	var thicknessRadius = this.thickness/2;
	this.ctx.save();
	this.ctx.fillStyle = colors.lightGray;
	this.ctx.fillRect(this.x-thicknessRadius, this.y, this.thickness, this.height);
	this.ctx.restore();
	for(var d=0; d<this.peg.disks.length; d++){
		this.peg.disks[d].graphic.draw();
	}
}
PegGraphic.prototype.toString = function(){
	return 'PegGraphic' + this.peg.id;
}
