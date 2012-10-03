function Peg(options){
	this.id = options.id;
	this.disks = ('disks' in options) && options.disks ? options.disks : [];
	this.topDisk = this.disks.length ? this.disks[this.disks.length-1] : null;//encapsulate!
	this.graphic = null;
}

Peg.prototype.isEmpty = function(){
	return this.disks.length == 0;
}
Peg.prototype.pushDisk = function(disk){
	this.disks.push(disk);
	this.topDisk = disk;
	disk.peg = this;
	disk.index = this.disks.length - 1;
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
Peg.prototype.toString = function(){
	return 'Peg' & this.id;
}
