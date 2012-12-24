<?php
// Gets the google static map & lets us embed it without CORS issues
header('Content-type: image/png');
echo file_get_contents($_GET['url']);
?>