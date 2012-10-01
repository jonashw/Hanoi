function Board(container){
	this.canvas=document.createElement('canvas');
	container.appendChild(this.canvas);
	this.ctx=this.canvas.getContext('2d');
}
