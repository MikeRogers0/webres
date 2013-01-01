var GridDot = function(){
	// Set lat/lng from the input fields.
	this.lat = null;
	this.lng = null;
	
	// When this object is done, run the next object via cal
	this.callback = function(){};
}

/**
 *  Run this function when you want to update the map.
 */
GridDot.prototype.updateCanvas = function(){
	// Reset the lap/lng.
	this.draw();
}

GridDot.prototype.draw = function(){
	// We are going to make some areas which varing dangers.
	flare.ctx.fillStyle = 'black';
	
	// Set max width for grid
	var xMax = 770, yMax = 350;
	var x = 5, y = 5;
	
	// Draws grid onto canvas
	while(y < yMax){
		while(x < xMax){
			flare.ctx.fillRect(x,y,1,1);
			x = x+10;
		}
		x = 5;
		y = y+10;
	};
	
	this.callback();
}

GridDot.prototype.initialize = function(){
	GridDotMap.updateCanvas();
}

GridDotMap = new GridDot();