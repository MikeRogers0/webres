var Dijkstras = function(){
	// This is like the init function
	this.hasPixels = false;
	this.start = {x: 0, y: 0};
	this.end = {x: 0, y: 0};
	
	// When this object is done, run the next object via cal
	this.callback = function(){};
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
	return (imgData.data[3]);
}

Dijkstras.prototype.initialize = function(){
	dijkstras.someFunction();
}

dijkstras = new Dijkstras();

// Set a bunch of global variables 
var graph, adj, currentSquare, startX, startY, endX, endY, map, xLimit, yLimit, arrayPos, posX, width, height, posX, posY, count, _id, adj, distance;

function buildGraphMatrix(){
	
	// Do the dijkstras stuff here.

	// set dimensions
	map = $('#canvasMap');
	distance = 10;//DO NOT PUT LOWER THAN 5!!!!!!!
	width = Math.round(map.width()/distance);
	height = map.height()/distance;
	posX = 1;
	posY = 1;
	count = 0;
	_id = 1;
	
	
	
	
	//populate graph
	graph = new Array(height);
	
	// Rebuild graph as 2 bimensional array of objects
	for(i=0;i<width;i++){
		graph[i] = new Array(height);
		posX = distance;
		for(j=0;j<height;j++){
			graph[i][j] = {};
			graph[i][j].danger = dijkstras.getDangerLevel(posX, posY);
			graph[i][j]._id = _id;
			graph[i][j].x = i;
			graph[i][j].xPix = i*distance;
			graph[i][j].y = j;
			graph[i][j].yPix = j*distance;
			graph[i][j].val = Infinity;
			_id += 1;
			posX += distance;
		}
		posY += distance;
	}
	return graph;
}

//Calculates movement cost between 2 nodes
function moveCost(p){
	if(p%2 == 0){
		return 0.10;
	}else{
		return 0.14142;
	}
}

//Finds a nodes index in the adj array based on its coordinates
function findIndex(x, y){
	for(var i=0; i<adj.length; i++){
		if(adj[i].x == x && adj[i].y == y){
			return i;
		}
	}
}

//Main route finding method
function findRoute(sx, sy, fx, fy){
	
	//get graph data
	graph = buildGraphMatrix();
	
	startX = parseInt(sx / distance); //between 0 - 76
	startY = parseInt(sy / distance); //between 0 - 34
	endX = parseInt(fx / distance); //between 0 - 76
	endY = parseInt(fy / distance); //between 0 - 34
	map = $('#canvasMap');
	xLimit = map.width()/distance-1;
	yLimit = map.height()/distance-1;
	adj = [];
	
	
	
	//set start square to current square, reset value to 0
	currentSquare = graph[startX][startY];
	currentSquare.val = 0;
	currentSquare.perm = true;
	
	
	//
	function addAdj(x, y, p){
		//check if within boundaries of map
		if(x <= xLimit && x >= 0 && y >= 0 && y <= yLimit){
			if(graph[x][y].perm != true){
				
				//work out movement cost
				var mc = moveCost(p);
				
				if(currentSquare.val + graph[x][y].danger + mc < graph[x][y].val){
					if(graph[x][y].val == Infinity){ //not yet been visited, set value and add to adj array
						graph[x][y].val = currentSquare.val + graph[x][y].danger + mc;
						graph[x][y].parent = p;
						adj.push(graph[x][y]);
					}else{ // already has a value set and must update obj in adj array
						var newValue = currentSquare.val + graph[x][y].danger + mc;
						updateSquare(x, y, newValue, p);
					}
				}
			}
		}
	}
	
	//update a nodes values that has already been set
	function updateSquare(x, y, v, p){
		var index = findIndex(x, y);
		adj[index].parent = p;
		adj[index].val = v;
		graph[x][y].parent;
		graph[x][y].val = v;
	}
	
	//get parent coordinates of current node
	function getParentCoords(x, y, p){
		switch(p){
			case 0:
				x = x;
				y = y-1;
				break;
			case 1:
				x = x+1
				y = y-1;
				break;
			case 2: 
				x = x+1;
				y = y;
				break;
			case 3:
				x = x+1;
				y = y+1;
				break;
			case 4: 
				x = x;
				y = y+1;
				break;
			case 5: 
				x = x-1;
				y = y+1;
				break;
			case 6: 
				x = x-1;
				y = y;
				break;
			case 7: 
				x = x-1;
				y = y-1;
				break;
		}
		
		return [x,y];
	}

	
	/**
	*	STEP 1
	*  Iterate through canvas and set paths	
	*/
	
	while(currentSquare.x !== endX || currentSquare.y !== endY){		
		
		//find adjacent node with smallest val
		for(sq=0; sq < 8; sq++){
			var newX;
			var newY;
			var parent;
			switch(sq){
				case 0: //above
					newX = currentSquare.x;
					newY = currentSquare.y-1;
					parent = 4;
					addAdj(newX, newY, parent);
					break;
				case 1: //above-right
					newX = currentSquare.x+1;
					newY = currentSquare.y-1;
					parent = 5;
					addAdj(newX, newY, parent);
					break;
				case 2: //right
					newX = currentSquare.x+1;
					newY = currentSquare.y;
					parent = 6;
					addAdj(newX, newY, parent);
					break;
				case 3: //bottom-right
					newX = currentSquare.x+1;
					newY = currentSquare.y+1;
					parent = 7;
					addAdj(newX, newY, parent);
					break;
				case 4: //bottom
					newX = currentSquare.x;
					newY = currentSquare.y+1;
					parent = 0;
					addAdj(newX, newY, parent);
					break;
				case 5: //bottom-left
					newX = currentSquare.x-1;
					newY = currentSquare.y+1;
					parent = 1;
					addAdj(newX, newY, parent);
					break;
				case 6: //left
					newX = currentSquare.x-1;
					newY = currentSquare.y;
					parent = 2;
					addAdj(newX, newY, parent);
					break;
				case 7: //top-left
					newX = currentSquare.x-1;
					newY = currentSquare.y-1;
					parent = 3;
					addAdj(newX, newY, parent);
					break;
				default:
					break;	
				
			}
		}
		
		//sort adj array into order lowest - highest
		adj.sort(function(a,b){
			return a.val - b.val;
		});
		
		//mark lowest value as done!
		adj[0].perm = true;

		//mark next(lowest) node as current node
		currentSquare = adj[0];
		
		//remove from adj
		adj.splice(0,1);


	} //end loop
	
	
	/**
	*	STEP 2
	*	Draw shortest path	
	*/
	
	var path = currentSquare;
	while(path.x !== startX || path.y !== startY){ 
		
		//find pathX parent
		pathParent = getParentCoords(path.x, path.y, path.p);
		
		//draw path to parent
		canvas.ctx.beginPath();
		canvas.ctx.moveTo(path.x*distance, path.y*distance);
		canvas.ctx.lineTo(pathParent[0]*distance, pathParent[1]*distance);
		canvas.ctx.stroke();
		
		//set parent as current
		path.x = pathParent[0];
		path.y = pathParent[1];
		path.p = graph[path.x][path.y].parent;
	}
}