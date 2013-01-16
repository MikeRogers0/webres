var Weather = function(){
	// Set lat/lng from the input fields.
	this.lat = null;
	this.lng = null;
	
	// When this object is done, run the next object via cal
	this.callback = function(){};
}

Weather.prototype.getFillStyle = function(){
	return 'rgba(0,0,255,'+(Math.random() / 5)+')';
}

/**
 *  Run this function when you want to update the map.
 */
Weather.prototype.updateCanvas = function(){
	// Reset the lap/lng.
	this.draw();
	this.callback();
}

/**
 *  Draw a bunch of random clouds
 */
Weather.prototype.draw = function(){
	for(var i = 0; i < (Math.random() * 15); i++){
		// We are going to make some areas which varing dangers.
		canvas.ctx.fillStyle = this.getFillStyle();
		canvas.ctx.beginPath();
		canvas.ctx.arc(Math.random() * 650, Math.random() * 400, Math.random() * 50, 0, Math.PI*2, true); 
		canvas.ctx.closePath();
		canvas.ctx.fill();
	}
}

Weather.prototype.initialize = function(){
	WeatherMap.updateCanvas();
}

WeatherMap = new Weather();