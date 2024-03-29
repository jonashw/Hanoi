function Disk(radius){
	this.radius = radius ? radius : 1;
	this.peg = null;
	this.graphic = null;
}

Disk.prototype.isSmallerThan = function(otherDisk){
	return otherDisk.radius > this.radius;
}

Disk.prototype.isLargerThan = function(otherDisk){
	return otherDisk.radius < this.radius;
}

Disk.prototype.canMoveToPeg = function(peg){
	return peg.isEmpty() || peg.topDisk.isLargerThan(this);	
}
