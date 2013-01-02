var GridDot = function(){
	// Set lat/lng from the input fields.
	this.lat = null;
	this.lng = null;
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
	canvas.ctx.fillStyle = 'black';
	
	// Set max width for grid
	var xMax = $('#canvasMap').width();
	var yMax = $('#canvasMap').height();
	var x = 5, y = 5;
	
	// Draws grid onto canvas
	while(y < yMax){
		while(x < xMax){
			canvas.ctx.fillRect(x,y,1,1);
			x = x+10;
		}
		x = 5;
		y = y+10;
	};
}