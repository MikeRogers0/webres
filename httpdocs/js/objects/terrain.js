var Terrain = function(){
	// Set lat/lng from the input fields.
	this.lat = null;
	this.lng = null;
	this.image = new Image();
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
	// To get the map URL's I used: http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
	//http://maps.googleapis.com/maps/api/staticmap?center=53.453894,-1.588915&zoom=8&format=png&sensor=false&size=640x480&maptype=roadmap&style=visibility:off&style=feature:landscape.natural.terrain|visibility:simplified|color:0x40ff30&style=feature:water|visibility:simplified

	var gStaticMapURL = 'http://maps.googleapis.com/maps/api/staticmap?size=640x400&maptype=roadmap&style=visibility:off&style=feature:landscape.natural.terrain|visibility:simplified|color:0x40ff30&style=feature:landscape.man_made|visibility:simplified|color:0x40ff30&style=feature:water|visibility:simplified&sensor=false&markers='
	+'color:blue%7Clabel:S%7C%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+latLngs.start.lat.value+','+latLngs.start.lng.value
	+'&markers='
	+'color:blue%7Clabel:E%7Cshadow:false%7Cicon:http://webres.fullondesign.co.uk/img/pixel.png%7C'
	+latLngs.end.lat.value+','+latLngs.end.lng.value;
	
	// Now load that image into the DOM
    this.image.onload = function(){terrainMap.analyse();}; // This will fire when the above is ready
    this.image.src = gStaticMapURL;
}

Terrain.prototype.analyse = function(){
	//this.image;
	this.draw();
}

/**
 *  
 */
Terrain.prototype.draw = function(){	
	canvas.ctx.drawImage(this.image, 0, 0);
}

var terrainMap = new Terrain();