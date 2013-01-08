<?php
// Gets the google static map & lets us embed it without CORS issues
if(isset($_GET['url']) && isset($_GET['debug'])){
	die('http://maps.googleapis.com/maps/api/staticmap?'.$_GET['url']);
}

if(isset($_GET['url'])){
	header('Content-type: image/png');
	echo file_get_contents('http://maps.googleapis.com/maps/api/staticmap?'.$_GET['url']);	
}
?>