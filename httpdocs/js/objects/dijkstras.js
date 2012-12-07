var Dijkstras = function(){
	// This is like the init function
}

Dijkstras.prototype.someFunction = function(){
	// You can run this by calling: this.someFunction(); or dijkstras.someFunction();
}

/**
 * Gets the danger level of a point on the map.
 * Returns a value between 0 and 1, for example 0.65
 * Example usage: this.getDangerLevel(375, 175);
 * dijkstras.getDangerLevel(375, 175);
 */
Dijkstras.prototype.getDangerLevel = function(x,y){
	// Get a get the image data on that pixel.
	imgData = canvas.ctx.getImageData(x, y, 1, 1);
	
	/**
	 * imgData returns the image data, but in rgba format (0 - 255 (maybe 256)). 
	 * So when we ask for the 4th (0,1,2,3) bit of data, we get the alpha channel of the 1st pixel
	 * but on a scale of 0 - 255, so thats why we return the crazy bit of code below.
	 */
	return (imgData.data[3] / 255);
}


dijkstras = new Dijkstras();