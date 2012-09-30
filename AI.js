function AI(game, options){
	this.game = game;
	this.success = false;
	var options = options ? options : {};
	this.loopDelay = ('loopDelay' in options) ? options.loopDelay : 20;
	var self = this;
	this.timer = null;
	EventRegistry.addListener(game, 'won', function(){
		self.success = true;
	});
	EventRegistry.addListener(game, 'restarted', function(){
		if(self.timer) clearTimeout(self.timer);
		self.success = false;
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
	console.log('PUNY HUMAN. COMPUTER SHALL SOLVE THE PUZZLE FOR YOU.');
	this.solveLoop();
}

AI.prototype.solveLoop = function(){//this is meant to be private
	currentMode = this.modes[this.i];	
	var leftPeg = this.pegs[currentMode[0]];
	var rightPeg = this.pegs[currentMode[1]];
	//the ai is reckless.  it tries moving left to right each time, only right to left if the first fails.
	if(!this.game.attemptMove(leftPeg, rightPeg)) this.game.attemptMove(rightPeg, leftPeg);
	//there are exactly three move modes that are used in rotation, regardless of the number of disks
	if(++this.i > 2) this.i=0;
	var self = this;
	//we delay the loop so that the user can see how the AI solves the puzzle
	if (this.success){
		console.log('COMPUTER WINS AGAIN. COMPUTER FEELS SO SASSY.          \\o\\  /o/  \\o\\  /o/  \\o\\  /o/  \\o/     BOO YAW.');
	} else {
		this.timer = setTimeout(function(){self.solveLoop()}, this.loopDelay);
	}
}
