<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>做作业</title>         
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css" />

  </head>
  <body>
  	<?php
			if(isset($_GET["stockId"])){
				$stockId = $_GET["stockId"];
				$stockCode = substr($stockId,-6)
		?>
		
		
  	<table class="stock" border=1>
  		<tr class="summary">
  			<td colspan="3">
  			</td>
  		</tr>
  		<tr class="stock_detail">
  			<td class="map">
  				<img class="kmap" src="http://image.sinajs.cn/newchart/min/n/<?php echo $stockId; ?>.gif" />
  				<img class="kmap" src="http://image.sinajs.cn/newchart/daily/n/<?php echo $stockId; ?>.gif" />
  			</td>
  			<td class="deal">
  				
  			</td>
  			<td class="other">
  				<div class="bt"><a href="http://stockhtm.finance.qq.com/sstock/ggcx/<?php echo $stockCode; ?>.shtml" target="_blank">详细</a></div>
  				<div class="bt"><a href="#" target="_blank">动态</a></div>
  				<div class="bt"><a href="#" target="_blank">设置</a></div>
  			</td>
  		</tr>  		
  	</table>
  			
  			
		<?php
			}else{
		?>
		stockId is null!
		<?php
			}		
		?>  	
  </body>
</html>
