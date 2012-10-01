function PegGraphic(ctx,peg,x,y){
	this.x=x;
	this.y=y;
	this.peg = peg;
	this.id = 'PegGraphic'+Math.random();
	this.ctx=ctx;
	this.thickness = 2;
	this.heightFactor = 10;
}
PegGraphic.prototype.draw = function(){
	var thicknessRadius = this.thickness/2;
	this.ctx.save();
	this.ctx.fillStyle = colors.mediumGray;
	this.ctx.fillRect(this.x-thicknessRadius, this.y, this.thickness+1, this.heightFactor * this.peg.height);
	this.ctx.restore();
}
