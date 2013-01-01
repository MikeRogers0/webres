var Grid = function(){
	self = this;
	// Set lat/lng from the input fields.
	this.lat = null;
	this.lng = null;
}

/**
 *  Run this function when you want to update the map.
 */
Grid.prototype.updateCanvas = function(){
	// Reset the lap/lng.
	self.draw();
}

Grid.prototype.draw = function(){
	// We are going to make some areas which varing dangers.
	flare.ctx.fillStyle = '#e5e5e5';
	
	// Set max width for grid
	var xMax = 770, yMax = 350;
	var x = 0, y = 10;

	while(y < yMax){
		flare.ctx.fillRect(x, y, xMax, 1);
		y = y+10;
	}
	
	var x = 10, y = 0;
	while(x < xMax){
		flare.ctx.fillRect(x, y, 1, yMax);
		x = x+10;
	}

}