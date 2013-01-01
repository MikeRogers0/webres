var Building = function(){
	self = this;
	self.image = null;
}

Building.prototype.getFillStyle = function(dangerLevel){
	return 'rgba(160,82,45,'+dangerLevel+')';
}

/**
 *  Run this function when you want to update the map.
 */
Building.prototype.updateCanvas = function(){
	self.image = new Image();
	self.image.onload = self.analyse;
	self.image.src = self.getGMapURL();
}

/**
 * Gets the static maps URL
 */
Building.prototype.getGMapURL = function(){
	// To get the map URL's I used: http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
	// & < this is buildings.
	return gStaticMapURL = 'gmap.php?url='+encodeURIComponent('size=640x400&maptype=roadmap&style=visibility:off&style=feature:landscape.man_made|visibility:simplified|color:0x40ff30&sensor=false&markers='
	+'color:blue%7Clabel:S%7C%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+latLngs.start.lat.value+','+latLngs.start.lng.value
	+'&markers='
	+'color:blue%7Clabel:E%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+latLngs.end.lat.value+','+latLngs.end.lng.value);
}

Building.prototype.analyse = function(){
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
	
	//debugger;
	
	
	var popPixel = {};
	
	// Go through each of the pixles and if it's got the green we are looking for draw it on the canvas.
	for(var i = 0, n = pix.length; i < n; i += 4) {
		if(pix[i+1] == 254){ //If we are looking at the colour green, draw it on the canvas.
			;
			// Set the x & y
			pixelPos = (i / 4); // Number of pixles up to this point.
			y = parseInt(pixelPos / 640);
			x = pixelPos%640; // * Use a Modulo operation to get the remaining lines.

			canvas.ctx.fillStyle = self.getFillStyle('0.2');
			canvas.ctx.fillRect(x, y, 1, 1);
		}
		
	}
}

var buildingsMap = new Building();