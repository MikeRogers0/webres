/* Load up the JS stuff. The new Date() * 1 stuff is just the break the cache */
head.js(
	'js/core/config.js', // The main variables we're going to use.
	'js/objects/convoy.js', // convoy - So we can have images of trucks and what not?
	'js/objects/terrain.js', // terrain object
	'js/objects/weather.js',  // weather object
	'js/objects/mines.js',  // mines object
	'js/objects/gridDot.js', // gridDot object
	'js/objects/grid.js', // grid object
	'js/objects/dijkstras.js', // dijkstras object
	'js/core/runSimulation.js', // This runs the above objects
	function(){
		runSimulation();
	}
);