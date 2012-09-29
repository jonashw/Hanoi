function ConsoleDisplay(game){
	this.game = game;
}
ConsoleDisplay.prototype.display = function(){
	for(var i in this.game.pegs){
		console.log('Peg ' + i);
		this.displayPeg(this.game.pegs[i]);			
	}	
}
ConsoleDisplay.prototype.displayPeg = function(peg){
	var pegHeight = this.game.disks.length + 1;
	var disksOnThisPeg = peg.disks.length;
	if (disksOnThisPeg < pegHeight){
		for(var i = 0; i<pegHeight - disksOnThisPeg; i++){
			console.log('    |');
		}
	}
	for(var i = peg.disks.length-1; i>=0; i--){
		var disk = peg.disks[i];
		this.displayDisk(disk);
	}
}

ConsoleDisplay.prototype.displayDisk = function(disk){
	var maxRadius = this.game.disks.length;
	switch(disk.radius){
		case 1:	
			console.log('   (o)');
			break;
		case 2:	
			console.log('  ((o))');
			break;
		case 3:	
			console.log(' (((o)))');
			break;
		case 4:	
			console.log('((((o))))');
			break;
	}
}
