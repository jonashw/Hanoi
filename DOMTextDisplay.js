function DOMTextDisplay(game,container){
	this.game = game;
	this.container = container;
	this.pegElements=[];
	this.pegDisplays=[];
	this.selectedPegDisplay = null;
	var self = this;
	for(var i in this.game.pegs){
		var maxDiskRadius = this.game.disks.length;
		var pegDisplay = new PegTextDisplay(this.game.pegs[i], maxDiskRadius, this.game.disks.length+2);
		this.pegElements.push(pegDisplay.element);
		this.container.appendChild(pegDisplay.element);
		pegDisplay.initListeners();
		EventRegistry.addListener(pegDisplay, 'click', function(pegDisplay){
			self.pegClicked(pegDisplay)
		});
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
		if(self.game.pegs.length == 3){
			if(optimal_win){
				var suffix = '\n(This is the best possible solution!)';
			} else {
				var suffix = '\n(A better solution is possible)';
			}
		} else {
			var suffix = '\n(Optimal solution could not be computed for this game setup)';
		}
		alert('You won in ' + this.game.movesTaken + ' moves' + suffix);
		self.unselectPegDisplay();
		self.display();
	});
}
DOMTextDisplay.prototype.pegClicked = function(pegDisplay){
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

DOMTextDisplay.prototype.selectPegDisplay = function(pegDisplay){
	this.unselectPegDisplay();
	this.selectedPegDisplay = pegDisplay;
	this.selectedPegDisplay.was_selected();
}

DOMTextDisplay.prototype.unselectPegDisplay = function(){
	if(this.selectedPegDisplay) this.selectedPegDisplay.was_unselected();
	this.selectedPegDisplay = null;	
}

DOMTextDisplay.prototype.display = function(){
	for(var i in this.pegDisplays){
		this.pegDisplays[i].display();
	}	
}
