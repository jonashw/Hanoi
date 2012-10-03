//canvas display works differently.  it hold a reference to each peg.  
//each peg holds a reference to a peg canvas graphic and a reference to each disk.
//each disk holds a reference to a disk canvas graphic.
//CanvasDisplay calls display() on each peg.graphic, each peg.graphic calls display() on each peg.disk[i].graphic
//CanvasDisplay.display() is called when the 'move' event is fired by Game
//in the constructor below, a canvas graphic is assigned to each peg/disk
function CanvasDisplay(options){
	var colorOrder = [
		colors.blue,
		colors.purple,
		colors.red,
		colors.orange,
		colors.yellow,
		colors.green
	];
	this.ctx = options.ctx;
	this.game = options.game;
	var self = this;
	for(var d=0; d<game.disks.length; d++){
		var disk = game.disks[d];
		disk.graphic = new DiskGraphic({'ctx':self.ctx, 'disk':disk, 'color':colorOrder[d], 'thickness':10, 'radiusFactor':10});
	}
	var pegHeight = (this.game.disks.length + 2) * disk.graphic.thickness;
	var pegSpacing = 2 * (this.game.disks.length + 1) * disk.graphic.radiusFactor;
	for(var p=0; p<game.pegs.length; p++){
		var peg = this.game.pegs[p];
		peg.graphic = new PegGraphic({'ctx':self.ctx, 'peg':peg, 'height':pegHeight,'x':peg.id*pegSpacing - (pegSpacing/2), 'y':0});
	}
	var self = this;
	EventRegistry.addListener(this.game, 'move_success', function(){
		self.display();
	});
	EventRegistry.addListener(this.game, 'restarted', function(){
		self.display();
	});
	//and finally, adjust the canvas to fit the game pieces
	this.ctx.canvas.height = pegHeight;
	this.ctx.canvas.width = this.game.pegs.length * pegSpacing;
	this.ctx.scale(1,-1); //flip vertically 
	this.ctx.translate(0,-this.ctx.canvas.height); //move beneath original position
}
CanvasDisplay.prototype.display = function(){
	this.ctx.clearRect(0,0,500,500);
	for(var i=0; i<this.game.pegs.length; i++){
		var peg = this.game.pegs[i];
		if ('graphic' in peg && peg.graphic){
			peg.graphic.draw();
		}
	}
}
