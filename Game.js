function Game(num_disks,num_pegs){
	var num_pegs = num_pegs ? num_pegs : 3; //3 is the default number of pegs
	this.pegs=[];
	this.disks=[];
	this.selectedPeg = null;
	var self = this;
	for (var i=0; i<num_pegs; i++){
		this.pegs.push(new Peg({'disks':null, 'id':i+1}));		
		(function(){
			var peg = self.pegs[i];
			//console.log(peg);
			EventRegistry.addListener(peg, 'click', function(){
				//console.log(peg);
				if(!self.selectedPeg){//make selection
					self.selectPeg(peg);
				} else if(self.selectedPeg === peg){//kill selection
					self.deselectPeg();
				} else {//attempt move
					self.attemptMove(self.selectedPeg,peg);
				}
			});
		})();
	}
	for (var i=num_disks; i>0; i--){
		var disk = new Disk(i);
		this.disks.push(disk);
	}
	this.id = 'Game' + Math.random();
	this.setup();
	console.log('Game initiated with ' + num_disks + ' disks and ' + num_pegs + ' pegs');
	console.log('You may move with the move command: move(src_peg_num, dst_peg_num)');
	console.log('Go!');
}
Game.prototype.selectPeg = function(peg){
	this.selectedPeg = peg;
	this.selectedPeg.selected = true;
	EventRegistry.notifyListeners(this, 'peg_selection_change');
}
Game.prototype.deselectPeg = function(){
	if(this.selectedPeg) this.selectedPeg.selected = false;
	this.selectedPeg = null;	
	EventRegistry.notifyListeners(this, 'peg_selection_change');
}
Game.prototype.setup = function(){
	this.victory=false;
	this.movesTaken=0;
	for(var i in this.disks){
		this.pegs[0].pushDisk(this.disks[i]);
	}
}
Game.prototype.restart = function(){
	for(var i in this.pegs){
		this.pegs[i].empty();
	}
	this.setup();
	console.log('Game restarted');
	EventRegistry.notifyListeners(this, 'restarted');
}

Game.prototype.move = function(src_pegnum, dst_pegnum){
	if(src_pegnum >= this.pegs.length) throw('source pegnum is out of bounds: '+src_pegnum);
	if(dst_pegnum >= this.pegs.length) throw('destination pegnum is out of bounds: '+dst_pegnum);
	var sPeg = this.pegs[src_pegnum];
	var dPeg = this.pegs[dst_pegnum];
	this.attemptMove(sPeg,dPeg);
}
Game.prototype.attemptMove = function(pegA, pegB){
	if (this.victory) return;
	if(pegA.isEmpty()){
		console.log('Source peg is empty. Try again!');
		return false;
	}
	var disk = pegA.topDisk;
	if(!disk.canMoveToPeg(pegB)){
		console.log('Cannot complete move.  Disks may only be moved to empty pegs or on top of larger disks. Try again!');
		return false;
	}
	pegB.pushDisk(pegA.popDisk());
	this.movesTaken++;
	//console.log('great move!');
	EventRegistry.notifyListeners(this, 'move_success');	
	this.deselectPeg();
	this.checkForWin();
	return true;
}
Game.prototype.checkForWin = function(){
	//important note: optimal solutions can only be computed for 3-peg games. 
	//winners of 4-peg games will receive unreliable feedback about their performance
	for (var i=1; i<this.pegs.length; i++){
		if(this.pegs[i].disks.length == this.disks.length){
			var fewest_moves_possible = Math.pow(2,this.disks.length)-1;
			var optimal_win = fewest_moves_possible == this.movesTaken;
			this.victory = true;
			if (this.pegs.length == 3){
				if(optimal_win){
					var suffix = ' (This is the best possible solution!)';
				} else {
					var suffix = ' (a better solution is possible)';
				}
			} else {
				var suffix = ' (an optimal solution could not be computed for this game setup)';
			}
			console.log('You\'ve won! And it only took you ' + this.movesTaken + ' moves.' + suffix);
			EventRegistry.notifyListeners(this, 'won', optimal_win);
		}
	}
}
Game.prototype.toString = function(){
	return this.id;
}
