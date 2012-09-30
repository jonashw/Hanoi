function DOMGraphicDisplay(game,container){
	this.game = game;
	this.container = container;
	this.pegElements=[];
	this.pegDisplays=[];
	this.selectedPegDisplay = null;
	this.canvas = document.createElement('canvas');
	this.ctx = canvas.getContext('2d');
	this.canvas.setAttribute('height',150);
	this.canvas.setAttribute('width',450);
	this.canvas.appendTo(container);
	var self = this;
	for(var i in this.game.pegs){
		var maxDiskRadius = this.game.disks.length;
		var pegDisplay = new PegDisplay(this.game.pegs[i], maxDiskRadius);
		this.pegElements.push(pegDisplay.element);
		this.container.appendChild(pegDisplay.element);
		this.pegDisplays.push(pegDisplay);
	}
	EventRegistry.addListener(game, 'move_success', function(){
		self.unselectPegDisplay();
		self.display();
	});
	EventRegistry.addListener(game, 'restarted', function(){
		self.unselectPegDisplay();
		self.display();
	});
	EventRegistry.addListener(game, 'won', function(optimal_win){
		self.unselectPegDisplay();
		self.display();
	});
}
DOMGraphicDisplay.prototype.pegClicked = function(pegDisplay){
	if(this.selectedPegDisplay){
		if(this.selectedPegDisplay === pegDisplay){
			//player wants to unselect
			this.unselectPegDisplay();	
			//console.log('unselected');
		} else {
			//player intends a move
			//console.log('move attempt');
			this.game.attemptMove(this.selectedPegDisplay.peg, pegDisplay.peg);
		}
	} else {
		//console.log(this);
		this.selectPegDisplay(pegDisplay);
		//console.log('selected');
	}
}

DOMGraphicDisplay.prototype.selectPegDisplay = function(pegDisplay){
	this.unselectPegDisplay();
	this.selectedPegDisplay = pegDisplay;
	this.selectedPegDisplay.was_selected();
}

DOMGraphicDisplay.prototype.unselectPegDisplay = function(){
	if(this.selectedPegDisplay) this.selectedPegDisplay.was_unselected();
	this.selectedPegDisplay = null;	
}

DOMGraphicDisplay.prototype.display = function(){
	for(var i in this.pegDisplays){
		this.pegDisplays[i].display();
	}	
}
