<?php  
$url='http://table.finance.yahoo.com/table.csv?s=000001.sz';  
$html = file_get_contents($url);  

echo $html;  
?> 