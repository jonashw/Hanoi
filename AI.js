function AI(game){
	this.game = game;
	this.success = false;
	var self = this;
	EventRegistry.addListener(game, 'won', function(){
		self.success = true;
	});
}

AI.prototype.solve = function(){
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
		modes = evenModes;
	} else {
		modes = oddModes;
	}
	var i = 0;
	var pegs = this.game.pegs;
	var currentMode;
	while(!this.success){
		currentMode = modes[i];	
		var leftPeg = pegs[currentMode[0]];
		var rightPeg = pegs[currentMode[1]];
		if(!this.game.attemptMove(leftPeg, rightPeg)) this.game.attemptMove(rightPeg, leftPeg);
		//next mode
		if(++i > 2) i=0;
	}
}
