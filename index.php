<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>金钱宝</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
  </head>
  <body>
  	<div class="summary dapan">
  	</div>
		<div class="stock_list">
			<?php
				$stockList = array("000333","000651","002190","000768","002594","000650","000952","000417","002336");
				foreach($stockList as $stockCode){
					$stockId = strpos($stockCode, "6") === 0? "sh".$stockCode : "sz".$stockCode;
			?>
					<div class="stock_block" id="s_<?php echo $stockId; ?>">
						<div class="summary gegu"></div>
						<table border="1" class="detail">
							<tr>
								<td class="map">
									<div class="limit">
										<img class="tkmap" src="http://image.sinajs.cn/newchart/min/n/<?php echo $stockId; ?>.gif" />
									</div>
									<div class="limit">
										<img class="dkmap" src="http://image.sinajs.cn/newchart/daily/n/<?php echo $stockId; ?>.gif" />
									</div>
								</td>
								<td class="deal"></td>
								<td class="other">
				  				<div class="bt"><a href="http://stockhtm.finance.qq.com/sstock/ggcx/<?php echo $stockCode; ?>.shtml" target="_blank">详细</a></div>
				  				<div class="bt"><a href="#" target="_blank">动态</a></div>
				  				<div class="bt"><a href="#" target="_blank">设置</a></div>
								</td>
							</tr>
						</table>
					</div>
			<?php
				}
			?>
		</div>
  </body>
</html>