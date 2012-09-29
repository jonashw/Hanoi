function PegDisplay(peg,maxDiskRadius){
	this.peg = peg;
	this.element = document.createElement('textarea');
	this.element.setAttribute('class','PegTextArea');
	this.element.setAttribute('readonly','true');
	this.id = 'PegDisplay'+Math.random();
	this.highlighted=false;
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
	if (disksOnThisPeg < pegHeight){
		for(var i = 0; i<pegHeight - disksOnThisPeg; i++){
			pegElement.innerHTML += '    |';
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
	switch(disk.radius){
		case 1:	
			pegElement.innerHTML += '   (o)';
			break;
		case 2:	
			pegElement.innerHTML += '  ((o))';
			break;
		case 3:	
			pegElement.innerHTML += ' (((o)))';
			break;
		case 4:	
			pegElement.innerHTML += '((((o))))';
			break;
	}
}
