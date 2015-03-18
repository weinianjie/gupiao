<?php require_once("dbUtils.php");?>
<?php
if(isset($_GET['fn'])) {
	
	$fn = $_GET['fn'];
	
	// 新增或者修改
	if($fn == 'addOrUpdate') {
		
		$stockCode = $_POST['stockCode'];
		$stockName = $_POST['stockName'];
		$priority = $_POST['priority'];
		$track = $_POST['track'];
		if(!empty($stockCode) && !empty($stockName)) {
			$dbUtils = new DbUtils();
			echo $dbUtils->addOrUpdate($stockCode, $stockName, $priority, $track)? 1:0;
		}else {
			echo 0;
		}
		
	// 删除
	}else if($fn == 'delete') {
		
		$stockCode = $_POST['stockCode'];
		if(!empty($stockCode)) {
			$dbUtils = new DbUtils();
			echo $dbUtils->delete($stockCode)? 1:0;
		}
		
	// 拖动替换追踪
	}else if($fn == 'dragRelace'){
		
		$oldStock = $_POST['oldStock'];
		$newStock = $_POST['newStock'];
		$newTrack = $_POST['newTrack'];
		if(!empty($newStock) && !empty($newTrack)) {
			$dbUtils = new DbUtils();
			$rs = $dbUtils->updateTrack($newStock, $newTrack);
			if(!empty($oldStock) && $rs) {
				$rs = $dbUtils->updateTrack($oldStock, 0);
			}
			echo $rs? 1:0;
		}
		
	}else {
		echo 0;
	}
} else {
	echo 0;
}
?>