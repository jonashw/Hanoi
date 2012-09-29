function Disk(radius){
	this.radius = radius ? radius : 1;
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
