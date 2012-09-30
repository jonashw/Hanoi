function AI(game, options){
	this.game = game;
	this.success = false;
	var options = options ? options : {};
	this.loopDelay = ('loopDelay' in options) ? options.loopDelay : 20;
	var self = this;
	EventRegistry.addListener(game, 'won', function(){
		self.success = true;
	});
}

AI.prototype.solve = function(){
	this.pegs = this.game.pegs;
	var evenModes = [
		[0,1],
		[0,2],
		[1,2]
	];
	var oddModes = [
		[0,2],
		[0,1],
		[1,2]
	];
	if (this.game.disks.length % 2 == 0){
		this.modes = evenModes;
	} else {
		this.modes = oddModes;
	}
	this.currentMode = null;
	this.i = 0;
	this.solveLoop();
}
AI.prototype.solveLoop = function(){
	currentMode = this.modes[this.i];	
	var leftPeg = this.pegs[currentMode[0]];
	var rightPeg = this.pegs[currentMode[1]];
	if(!this.game.attemptMove(leftPeg, rightPeg)) this.game.attemptMove(rightPeg, leftPeg);
	if(++this.i > 2) this.i=0;
	var self = this;
	if (!this.success) setTimeout(function(){self.solveLoop()}, this.loopDelay);
}
