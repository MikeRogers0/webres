var Roads = function(){
	this.image = null;
	
	// When this object is done, run the next object via cal
	this.callback = function(){};
}

Roads.prototype.getFillStyle = function(){
	return 'rgba(255,255,255,1)';
}

/**
 *  Run this function when you want to update the map.
 */
Roads.prototype.updateCanvas = function(){
	this.image = new Image();
	this.image.onload = function(){roadsMap.analyse();};
	this.image.src = this.getGMapURL();
}

/**
 * Gets the static maps URL
 */
Roads.prototype.getGMapURL = function(){
	// To get the map URL's I used: http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
	// &style=feature:landscape.man_made|visibility:simplified|color:0x6E1B00 < this is buildings.
	return gStaticMapURL = 'gmap.php?url='+encodeURIComponent('size=640x400&sensor=false&maptype=roadmap&style=visibility:off&style=feature:transit.line|visibility:simplified|color:0x40ff30&style=feature:road.highway|visibility:simplified|color:0x40fd30&style=feature:road.arterial|visibility:simplified|color:0x40fe30&markers='
	+'color:blue%7Clabel:S%7C%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+encodeURIComponent(latLngs.start.value)
	+'&markers='
	+'color:blue%7Clabel:E%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+encodeURIComponent(latLngs.end.value));
}

Roads.prototype.analyse = function(){	
	this.canvas = null;
	
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
	
	//debugger;
	
	
	var popPixel = {};
	
	// Go through each of the pixles and if it's got the green we are looking for draw it on the canvas.
	for(var i = 0, n = pix.length; i < n; i += 4) {
		if(pix[i+1] == 255 || pix[i+1] == 254 || pix[i+1] == 253){ //If we are looking at the colour green, draw it on the canvas.
			
			// Set the x & y
			pixelPos = (i / 4); // Number of pixles up to this point.
			y = parseInt(pixelPos / 640);
			x = pixelPos%640; // * Use a Modulo operation to get the remaining lines.
			
			if(pix[i+1] == 253){ // It's a highway, use it!
				canvas.ctx.clearRect(x-2, y-2, 4, 4);
			} else if(pix[i+1] == 254){ // Important road
				canvas.ctx.clearRect(x-1, y-1, 2,2);
			} else {
				canvas.ctx.clearRect(x, y, 1, 1);
			}
			
		}
		
		//if(popPixel[pix[i]+','+pix[i+1]+','+pix[i+2]]){
		//	popPixel[pix[i]+','+pix[i+1]+','+pix[i+2]]++;
		//} else {
		//	popPixel[pix[i]+','+pix[i+1]+','+pix[i+2]] = 1;
		//}
		
	}
	//debugger;
	this.callback();
}

Roads.prototype.initialize = function(){
	roadsMap.updateCanvas();
}

var roadsMap = new Roads();