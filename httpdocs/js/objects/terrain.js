var Terrain = function(){
	// Set lat/lng from the input fields.
	this.lat = null;
	this.lng = null;
}

Terrain.prototype.getFillStyle = function(dangerLevel){
	return 'rgba(0,255,0,'+dangerLevel+')';
}

/**
 *  Run this function when you want to update the map.
 */
Terrain.prototype.updateCanvas = function(){
	// Reset the lap/lng.
	this.load();
	this.draw();
}

/**
 *  Load up the terrain info from a source on the internet.
 */
Terrain.prototype.load = function(){
	// Do the API call & magic *Shiny eyes*.
	
	// For now I'm ganna draw a bunch of circles.
	
}



/**
 *  
 */
Terrain.prototype.draw = function(){
	// We are going to make some areas which varing dangers.
	canvas.ctx.fillStyle = this.getFillStyle(0.2);
	canvas.ctx.beginPath();
	canvas.ctx.arc(75, 75, 40, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.1);
	canvas.ctx.beginPath();
	canvas.ctx.arc(50, 300, 30, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.1);
	canvas.ctx.beginPath();
	canvas.ctx.arc(275, 275, 40, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.3);
	canvas.ctx.beginPath();
	canvas.ctx.arc(375, 175, 60, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.3);
	canvas.ctx.beginPath();
	canvas.ctx.arc(600, 50, 50, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = this.getFillStyle(0.1);
	canvas.ctx.beginPath();
	canvas.ctx.arc(700, 300, 50, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
}