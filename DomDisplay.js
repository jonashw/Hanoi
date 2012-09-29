function DOMDisplay(game,container){
	this.game = game;
	this.container = container;
	this.pegElements=[];
	this.pegDisplays=[];
	this.selectedPegDisplay = null;
	this.moveCountElement=document.createElement('div');
	this.restartBtn=document.createElement('button');
	this.restartBtn.innerHTML = 'Restart';
	var self = this;
	for(var i in this.game.pegs){
		var maxDiskRadius = this.game.disks.length;
		var pegDisplay = new PegDisplay(this.game.pegs[i], maxDiskRadius);
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
		if(optimal_win){
			var suffix = '\n(This is the best possible solution!)';
		} else {
			var suffix = '\n(A better solution is possible)';
		}
		alert('You won in ' + this.game.movesTaken + ' moves' + suffix);
		self.unselectPegDisplay();
		self.display();
	});
	this.container.appendChild(this.moveCountElement);
	this.container.appendChild(this.restartBtn);
	this.restartBtn.addEventListener('click',function(){
		self.game.restart();
	});
}
DOMDisplay.prototype.pegClicked = function(pegDisplay){
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

DOMDisplay.prototype.selectPegDisplay = function(pegDisplay){
	this.unselectPegDisplay();
	this.selectedPegDisplay = pegDisplay;
	this.selectedPegDisplay.was_selected();
}

DOMDisplay.prototype.unselectPegDisplay = function(){
	if(this.selectedPegDisplay) this.selectedPegDisplay.was_unselected();
	this.selectedPegDisplay = null;	
}

DOMDisplay.prototype.display = function(){
	for(var i in this.pegDisplays){
		this.pegDisplays[i].display();
	}	
	this.moveCountElement.innerHTML = 'Moves Taken: ' + game.movesTaken;
}
