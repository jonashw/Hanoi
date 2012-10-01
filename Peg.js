function Peg(disks,height){
	this.disks = disks ? disks : [];
	this.topDisk = this.disks.length ? this.disks[this.disks.length-1] : null;//encapsulate!
	this.height = height;
}

Peg.prototype.isEmpty = function(){
	return this.disks.length == 0;
}
Peg.prototype.pushDisk = function(disk){
	this.disks.push(disk);
	this.topDisk = disk;
	disk.peg = this;
}
Peg.prototype.popDisk = function(){
	var disk = this.disks.pop();
	disk.peg = null;
	this.topDisk = this.disks.length ? this.disks[this.disks.length-1] : null;//encapsulate!
	return disk;
}
Peg.prototype.empty = function(){
	this.disks = [];
}
