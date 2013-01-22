// Set up the semantic objects.
var semanticData = {
	bgMap: {
		object: backgroundMap
	},
	climb: {
		elm: document.querySelector('#climbCBX'),
		object: climbMap
	},
	buildings: {
		elm: document.querySelector('#buildingsCBX'),
		object: buildingsMap
	},
	water: {
		elm: document.querySelector('#waterCBX'),
		object: waterMap
	},
	roads: {
		elm: document.querySelector('#roadsCBX'),
		object: roadsMap
	},
	weather: {
		elm: document.querySelector('#weatherCBX'),
		object: WeatherMap
	},
	mines: {
		elm: document.querySelector('#minesCBX'),
		object: minesMap
	},
	grid: {
		object: GridMap
	},
	gridDot: {
		object: GridDotMap
	}
};

/**
 * Draws all the canvaes ticked & finds the best route.
 */
var runSimulation = function(){
	// Turn on the loading gif
	document.querySelector('.canvas-maps').className = "canvas-maps loading";
	
	// Lock the buttons which update the map
	document.getElementById('updateMap').disabled = true;
	document.getElementById('downloadMap').className = 'btn disabled';
	

	// Clear the combined maps
	background.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	canvas.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	flare.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	canvasRoutes.ctx.clearRect(0, 0, canvas.elm.width, canvas.elm.height);
	
	// Set the base danger level on the canvas to a .4
	canvas.ctx.fillStyle = "rgba(209, 222, 186, 0.8)";
	if(document.getElementById('offroadAbility').checked){
		canvas.ctx.fillStyle = "rgba(209, 222, 186, 0.3)";
	}
	canvas.ctx.fillRect(0, 0, 640, 400);
	
	// Itterate through each canvas updating their maps via the callback.
	var lastSemanticObject = null;
	var firstSemanticObject = null;
	
	// Loop through the objects, listing all the enabled ones & logging the first & last objects.
	for(i in semanticData){
		if(semanticData[i].elm == undefined || (semanticData[i].elm != undefined && semanticData[i].elm.checked)){
			if(lastSemanticObject == null){
				firstSemanticObject = i;
			} else {
				semanticData[lastSemanticObject].object.callback = semanticData[i].object.initialize;
			}
			
			lastSemanticObject = i;
		}
	}
	
	// Make the last object enable show the map.
	semanticData[lastSemanticObject].object.callback = function(){
	
		StartEndMap.setPoints(function(){
			// Do the dijkstras stuff here.
			
			//debugger;
			findRoute(dijkstras.start.x, dijkstras.start.y, dijkstras.end.x, dijkstras.end.y);
			
			
			// Now remove the loading gif.
			document.querySelector('.canvas-maps').className = "canvas-maps";
			document.getElementById('updateMap').disabled = false;
			document.getElementById('downloadMap').className = 'btn';
			
			// Merge all the canvases together
			var superCanvas = document.createElement('canvas');
			superCanvas.width = 640;
			superCanvas.height = 400;
			var superCanvasContext = superCanvas.getContext('2d');
			
			//superCanvasContext.drawImage(background.elm, 0, 0);
			superCanvasContext.drawImage(background.elm, 0, 0);
			superCanvasContext.drawImage(canvas.elm, 0, 0);
			superCanvasContext.drawImage(canvasRoutes.elm, 0, 0);
			
			document.getElementById('downloadMap').href = superCanvas.toDataURL();
			
			delete superCanvas;
		});
		
	};
	
	// Run the first object.
	semanticData[firstSemanticObject].object.initialize();
}

// Add the listners
document.querySelector('#updateMap').addEventListener('click', runSimulation, false);

// Add listners for the sliders
$('input.slider').change(function(){
	$('#'+$(this).attr('data-target')).html($(this).val());
	
	if($(this).attr('data-opacity-target')){
		$('#'+$(this).attr('data-opacity-target')).css('opacity', $(this).val() / 100);
	}
});

$('input.slider').change();


//for(i in semanticData){
//	semanticData[i].elm.addEventListener('click', runSimulation, false);
//}