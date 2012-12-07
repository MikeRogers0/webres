var Mines = function(){
	// Set lat/lng from the input fields.
	this.lat = null;
	this.lng = null;
}

Mines.prototype.getFillStyle = function(dangerLevel){
	return 'rgba(0,0,0,'+dangerLevel+')';
}

/**
 *  Run this function when you want to update the map.
 */
Mines.prototype.updateCanvas = function(){
	// Reset the lap/lng.
	this.load();
	this.draw();
}

/**
 *  Load up the terrain info from a source on the internet.
 */
Mines.prototype.load = function(){
	// Do the API call & magic *Shiny eyes*.
	
	// For now I'm ganna draw a bunch of circles.
	
}

/**
 *  
 */
Mines.prototype.draw = function(){
	// We are going to make some areas which varing dangers.
	canvas.ctx.fillStyle = this.getFillStyle(0.2);
	canvas.ctx.beginPath();
	canvas.ctx.arc(175, 75, 40, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.2);
	canvas.ctx.beginPath();
	canvas.ctx.arc(75, 175, 40, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.3);
	canvas.ctx.beginPath();
	canvas.ctx.arc(375, 175, 10, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
}