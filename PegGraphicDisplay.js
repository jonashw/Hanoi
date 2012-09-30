function PegGraphicDisplay(peg,maxDiskRadius,ctx,x,y){
	this.x=x;
	this.y=y;
	this.peg = peg;
	this.id = 'PegDisplay'+Math.random();
	this.highlighted=false;
	this.maxDiskRadius = maxDiskRadius;
	this.ctx=ctx;
}
PegGraphicDisplay.prototype.initListeners = function(){
}
PegGraphicDisplay.prototype.display = function(){
	this.ctx.save();
	this.ctx.fillStyle=colors.mediumGray;
	this.ctx.fillRect(this.x-3, this.y, 6, 10*this.peg.height);
	this.ctx.restore();
}
PegGraphicDisplay.prototype.was_selected = function(){
	this.element.setAttribute('class',this.element.getAttribute('class') + ' selected');
}
PegGraphicDisplay.prototype.was_unselected = function(){
	this.element.setAttribute('class',this.element.getAttribute('class').replace('selected',''));
}
PegGraphicDisplay.prototype.toString = function(){
	return this.id;	
}
PegGraphicDisplay.prototype.displayDisk = function(disk, pegElement){
}
/*  Test: 
	p = new PegGraphicDisplay(game.pegs[0], 6, ctx,5,5);
	p.display();
*/
