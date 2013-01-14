var canvas = {
	elm: document.getElementById('canvasMap'),
	ctx: document.getElementById('canvasMap').getContext('2d')
};

var background = {
	elm: document.getElementById('canvasBackground'),
	ctx: document.getElementById('canvasBackground').getContext('2d')
};

var flare = {
	elm: document.getElementById('canvasFlare'),
	ctx: document.getElementById('canvasFlare').getContext('2d')
};

var canvasRoutes = {
	elm: document.getElementById('canvasRoutes'),
	ctx: document.getElementById('canvasRoutes').getContext('2d')
};

var latLngs = {
	start: document.getElementById('start'),
	end: document.getElementById('end')
}