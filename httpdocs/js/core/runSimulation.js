// Set up the semantic objects.
var semanticData = {
	terrain: {
		elm: document.querySelector('#terrainCBX'),
		object: new Terrain()
	},
	weather: {
		elm: document.querySelector('#weatherCBX'),
		object: new Weather()
	},
	mines: {
		elm: document.querySelector('#minesCBX'),
		object: new Mines()
	}
};

/**
 * Draws all the canvaes ticked & finds the best route.
 */
var runSimulation = function(){
	// Clear the combined map
	canvas.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	canvas.ctx.save();
	// Itterate through each canvas updating their maps via the callback.
	for(i in semanticData){
		if(semanticData[i].elm.checked){
			semanticData[i].object.updateCanvas();
		}
	}
	canvas.ctx.restore();
	
	// Do the dijkstras stuff here.
}

// Add the listners
document.querySelector('#updateMap').addEventListener('click', runSimulation, false);
for(i in semanticData){
	semanticData[i].elm.addEventListener('click', runSimulation, false);
}