<?php
require_once("../API/qqConnectAPI.php");
$qc = new QC();
if($qc->is_login()) {
	var_dump($qc->get_user_info());
}else{
	echo "no login";
}
//echo $qc->qq_callback();
//echo $qc->get_openid();
