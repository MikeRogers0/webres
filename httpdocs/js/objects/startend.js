var StartEnd = function(){
	this.image = null;
	this.callback = function(){};
}

StartEnd.prototype.getFillStyle = function(dangerLevel){
	return 'rgba(173,216,230,'+dangerLevel+')';
}

/**
 *  Run this function when you want to update the map.
 */
StartEnd.prototype.setPoints = function(callback){
	this.callback = callback;
	this.image = new Image();
	this.image.onload = function(){StartEndMap.analyse();};
	this.image.src = this.getGMapURL();
}

/**
 * Gets the static maps URL
 */
StartEnd.prototype.getGMapURL = function(){
	// To get the map URL's I used: http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
	// &style=feature:landscape.man_made|visibility:simplified|color:0x6E1B00 < this is buildings.
	return gStaticMapURL = 'gmap.php?url='+encodeURIComponent('size=640x400&maptype=roadmap&sensor=false&style=visibility:off&markers='
	+'icon:http://webres.fullondesign.co.uk/img/p-blue.png%7C'
	+encodeURIComponent(latLngs.start.value)
	+'&markers='
	+'icon:http://webres.fullondesign.co.uk/img/p-red.png%7C'
	+encodeURIComponent(latLngs.end.value));
}



StartEnd.prototype.analyse = function(){
	this.canvas = null;
	this.ctx = null;

	// Create a tempory clean canvas.
	this.canvas = document.createElement('canvas');
	this.canvas.width = 640;
	this.canvas.height = 400;
	this.ctx = this.canvas.getContext('2d');
	
	// Draw the loaded on image onto the temp canvas. Load it as a pattern to get around CORS.
	this.ctx.drawImage(this.image, 0,0);
	
	//var pixles = this.ctx.createImageData(this.canvas.width, this.canvas.height, this.image);
	var pix = this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height);
	
	pix = pix.data;
	var popPixel = {};
	
	// Go through each of the pixles
	for(var i = 0, n = pix.length; i < n; i += 4) {
		// Check if it's red or blue
		if((pix[i] == 252 || pix[i+2] == 248) && pix[i+3] == 255){ // If it's the same colour as the pixel we put in there.
			
			// Set the x & y
			pixelPos = (i / 4); // Number of pixles up to this point.
			y = parseInt(pixelPos / 640);
			x = pixelPos%640; // * Use a Modulo operation to get the remaining lines.
			
			// Set the dijkstras variables.
			if(pix[i+2] == 248){
				dijkstras.start = {x:x,y:y};
			} else {
				dijkstras.end = {x:x,y:y};
			}
		}
		
		if(popPixel[pix[i]]){
			popPixel[pix[i]]++;
		} else {
			popPixel[pix[i]] = 1;
		}
	}
	
	debugger;
	
	this.callback();
}

StartEnd.prototype.initialize = function(){
	StartEndMap.updateCanvas();
}

var StartEndMap = new StartEnd();