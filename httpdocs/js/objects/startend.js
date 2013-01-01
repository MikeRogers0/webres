var StartEnd = function(){
	self = this;
	self.image = null;
	self.showOnCanvas = false;
	self.callback = function(){};
}

StartEnd.prototype.reset = function(){
	self.image = null;
	self.showOnCanvas = false;
	self.callback = function(){};
}

StartEnd.prototype.getFillStyle = function(dangerLevel){
	return 'rgba(173,216,230,'+dangerLevel+')';
}

/**
 *  Run this function when you want to update the map.
 */
StartEnd.prototype.updateCanvas = function(){
	self.showOnCanvas = true;
}

StartEnd.prototype.setPoints = function(callback){
	self.callback = callback;

	self.image = new Image();
	self.image.onload = self.analyse;
	self.image.src = self.getGMapURL();
}

/**
 * Gets the static maps URL
 */
StartEnd.prototype.getGMapURL = function(){
	// To get the map URL's I used: http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
	// &style=feature:landscape.man_made|visibility:simplified|color:0x6E1B00 < this is buildings.
	return gStaticMapURL = 'gmap.php?url='+encodeURIComponent('size=640x400&maptype=roadmap&sensor=false&style=visibility:off&markers='
	+'color:blue%7Clabel:S%7C%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/blue.png%7C'
	+latLngs.start.lat.value+','+latLngs.start.lng.value
	+'&markers='
	+'color:red%7Clabel:E%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/red.png%7C'
	+latLngs.end.lat.value+','+latLngs.end.lng.value);
}



StartEnd.prototype.analyse = function(){
	// Create a tempory clean canvas.
	self.canvas = document.createElement('canvas');
	self.canvas.width = 640;
	self.canvas.height = 400;
	self.ctx = self.canvas.getContext('2d');
	
	
	// Draw the loaded on image onto the temp canvas. Load it as a pattern to get around CORS.
	self.ctx.drawImage(self.image, 0,0);
	
	//var pixles = self.ctx.createImageData(self.canvas.width, self.canvas.height, self.image);
	var pix = self.ctx.getImageData(0,0, self.canvas.width, self.canvas.height);
	
	pix = pix.data;
	
	// Go through each of the pixles and if it's got the green we are looking for draw it on the canvas.
	for(var i = 0, n = pix.length; i < n; i += 4) {
		if((pix[i] == 252 || pix[i+2] == 248) && pix[i+3] == 255){ //If we are looking at the colour green, draw it on the canvas.
			
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
	}
	
	self.callback();
	
}

var StartEndMap = new StartEnd();