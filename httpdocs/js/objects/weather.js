var Weather = function(){
	self = this;
	// Set lat/lng from the input fields.
	self.lat = null;
	self.lng = null;
}

Weather.prototype.getFillStyle = function(dangerLevel){
	return 'rgba(0,0,255,'+dangerLevel+')';
}

/**
 *  Run this function when you want to update the map.
 */
Weather.prototype.updateCanvas = function(){
	// Reset the lap/lng.
	self.load();
	self.draw();
}

/**
 *  Load up the terrain info from a source on the internet.
 */
Weather.prototype.load = function(){
	// Do the API call & magic *Shiny eyes*.
	
	// For now I'm ganna draw a bunch of circles.
	
}

/**
 *  
 */
Weather.prototype.draw = function(){
	// We are going to make some areas which varing dangers.
	canvas.ctx.fillStyle = self.getFillStyle(0.2);
	canvas.ctx.beginPath();
	canvas.ctx.arc(275, 75, 40, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = self.getFillStyle(0.2);
	canvas.ctx.beginPath();
	canvas.ctx.arc(75, 275, 40, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
	
	canvas.ctx.fillStyle = self.getFillStyle(0.3);
	canvas.ctx.beginPath();
	canvas.ctx.arc(375, 175, 20, 0, Math.PI*2, true); 
	canvas.ctx.closePath();
	canvas.ctx.fill();
}