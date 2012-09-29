function PegDisplay(peg,maxDiskRadius){
	this.peg = peg;
	this.element = document.createElement('textarea');
	this.element.setAttribute('class','PegTextArea');
	this.element.setAttribute('readonly','true');
	this.id = 'PegDisplay'+Math.random();
	this.highlighted=false;
	this.maxDiskRadius = maxDiskRadius;
}
PegDisplay.prototype.initListeners = function(){
	var self = this;
	this.element.addEventListener('click',function(){
		EventRegistry.notifyListeners(self, 'click', self); 
	});
	this.element.addEventListener('focus',function(){
		this.blur();
	});
}
PegDisplay.prototype.display = function(){
	var pegHeight = this.peg.height;
	var pegElement = this.element;
	this.element.innerHTML = '';
	var disksOnThisPeg = this.peg.disks.length;
	var peg_prefix = '';
	for (var i=0; i<this.maxDiskRadius; i++){
		peg_prefix += ' ';
	}
	if (disksOnThisPeg < pegHeight){
		for(var i = 0; i<pegHeight - disksOnThisPeg; i++){
			pegElement.innerHTML += peg_prefix + '|';
			pegElement.innerHTML += '\n';
		}
	}
	for(var i = this.peg.disks.length-1; i>=0; i--){
		var disk = this.peg.disks[i];
		this.displayDisk(disk, pegElement);
		pegElement.innerHTML += '\n';
	}
}
PegDisplay.prototype.was_selected = function(){
	this.element.setAttribute('class',this.element.getAttribute('class') + ' selected');
}
PegDisplay.prototype.was_unselected = function(){
	this.element.setAttribute('class',this.element.getAttribute('class').replace('selected',''));
}
PegDisplay.prototype.toString = function(){
	return this.id;	
}
PegDisplay.prototype.displayDisk = function(disk, pegElement){
	var disk_prefix = '';
	var disk_suffix = '';
	for(var i=0; i<this.maxDiskRadius-disk.radius; i++){
		disk_prefix += ' ';
	}
	for(var i=0; i<disk.radius; i++){
		disk_prefix += '(';
		disk_suffix += ')';
	}
	pegElement.innerHTML += disk_prefix + 'o' + disk_suffix;	
}
