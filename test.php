<?php require_once("simple_html_dom.php");?>
<?php  
// $url='http://table.finance.yahoo.com/table.csv?s=000001.sz';  
// $html = file_get_contents($url);  
// 新建一个Dom实例
$html = new simple_html_dom();

// 从url中加载
$html->load_file('http://money.finance.sina.com.cn/corp/go.php/vMS_MarketHistory/stockid/002597.phtml');

$ret = $html->find('#FundHoldSharesTable tbody tr td', 2);

// print_r($ret);
echo $ret; 
?> 