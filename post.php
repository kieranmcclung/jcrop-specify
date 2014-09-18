<?php
if ( isset($_POST['src'] ) ) {

	$image_url = $_POST['src'];
	$image_name = basename( $image_url, '.jpg' );
	$image_name = $image_name.time();

	$ch = curl_init(); 
	curl_setopt($ch, CURLOPT_URL, $image_url); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
	curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1); 
	$data = curl_exec($ch); 
	curl_close($ch);

	$targ_w = $_POST['w']; 
	$targ_h = $_POST['h']; 

	$image = imagecreatefromstring( $data ); 
	$dst_r = imagecreatetruecolor( $targ_w, $targ_h ); 

	if ( !$image )
		exit( 'No valid image' );

	imagecopyresampled( $dst_r, $image, 0, 0, $_POST['x'], $_POST['y'], $targ_w, $targ_h, $_POST['w'], $_POST['h'] ); 

	@ob_end_clean();

	if(ini_get('zlib.output_compression'))
		ini_set('zlib.output_compression', 'Off');

	header('Content-Type: application/force-download');
	header('Content-Disposition: attachment; filename="crop-'.$image_name.'.jpg"');
	header('Content-Transfer-Encoding: binary');
	header('Accept-Ranges: bytes');

	header('Cache-control: no-cache, pre-check=0, post-check=0');
	header('Cache-control: private');
	header('Pragma: private');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

	imagejpeg( $dst_r, NULL, 100 );
	imagedestroy( $dst_r );

} else {
	exit( 'Error occured' );
}