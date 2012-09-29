function Game(num_disks,num_pegs){
	this.pegs=[];
	this.disks=[];
	for (var i=0; i<num_pegs; i++){
		this.pegs.push(new Peg(null,num_disks+1));		
	}
	for (var i=num_disks; i>0; i--){
		var disk = new Disk(i);
		this.disks.push(disk);
	}
	this.id = 'Game' + Math.random();
	this.setup();
	console.log('Game initiated with ' + num_disks + ' disks and ' + num_pegs + ' pegs');
	console.log('You may move with the move command: move(src_pegnum, dst_pegnum)');
	console.log('Go!');
}
Game.prototype.setup = function(){
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
	console.log('great move!');
	EventRegistry.notifyListeners(this, 'update');	
	EventRegistry.notifyListeners(this, 'move_success');	

}
Game.prototype.toString = function(){
	return this.id;
}
