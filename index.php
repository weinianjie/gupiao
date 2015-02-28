<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>做作业</title>         
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript">
			$(document).ready(function(){
				var stockArr = new Array("sz000333","sz000651","sz002190","sz000768","sz002594","sz000650","sz000952","sz000417","sz002336");				
				for(var i=0;i<stockArr.length;i++){
					$(".stock_block").eq(i).attr("src", "stock.php?stockId=" + stockArr[i]);
				}
			});
		</script>
  </head>
  <body>
  	<div class="warpper">
  		<div class="summary">
			
  		</div>
  		<div class="stock_list">
  			<!--<iframe class="stock_block" src="stock.php?stockId=sz000333" scrolling="no"></iframe>-->
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  			<iframe class="stock_block" src="" scrolling="no"></iframe>
  		</div>
  	</div>
  </body>
</html>
