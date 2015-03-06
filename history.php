<?php
$outText = "";
if(isset($_GET['stockCode'])) {
	$stockCode = $_GET['stockCode'];
	$stockStr = strpos($stockCode, "6") === 0? $stockCode.".ss" : $stockCode.".sz";
	$url='http://table.finance.yahoo.com/table.csv?s='.$stockStr;
	try{
		$html = file_get_contents($url);
		$lineArr = split("\n", $html);
		$lineArr2 = array_slice($lineArr, 1, 21);
		$outText .= join("~", $lineArr2);
	}catch(Exception $e) {}	
}
echo $outText;
?> 