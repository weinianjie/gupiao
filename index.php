<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>股哥</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript" src="static.data.js"></script>
    <script type="text/javascript" src="jquery.min.js"></script>    
    <script type="text/javascript" src="main.js"></script>
  </head>
  <body>
  	<div class="summary">
  		<span class="dapan"></span>
  		<span class="dapan_flow"></span>
  		<a href="javascript:void(0);" id="t_d">T-D</a>
  		<!--<a href="javascript:void(0);">T-D</a>-->
  	</div>
		<div class="stock_list">
			<div class="basic_info">
				<div class="info"></div>
				<div class="info" style="background-color:#eee;"></div>
				<div class="info"></div>
				<div class="info" style="background-color:#eee;"></div>
			</div>
			<?php
				$stockList = array("000333","000651","002190","002594","000650","000952","000417","002336");
				foreach($stockList as $stockCode){
					$stockId = strpos($stockCode, "6") === 0? "sh".$stockCode : "sz".$stockCode;
			?>
					<div class="stock_block" id="s_<?php echo $stockId; ?>">
						<div class="summary">
							<span class="gegu"></span>
						</div>
						<table border="1" class="detail">
							<tr>
								<td class="map" colspan="2">
									<div class="limit">
										<img class="tkmap" src="" />
										<img class="dkmap hide" src="http://image.sinajs.cn/newchart/daily/n/<?php echo $stockId; ?>.gif" />
									</div>									
								</td>
								<td class="deal" rowspan="2"></td>
								<td class="other" rowspan="2">
				  				<div class="bt"><a href="http://stockhtm.finance.qq.com/sstock/ggcx/<?php echo $stockCode; ?>.shtml" target="_blank">详细</a></div>
				  				<div class="bt"><a href="#" target="_blank">动态</a></div>
				  				<div class="bt"><a href="#" target="_blank">设置</a></div>
								</td>
							</tr>
							<tr>
								<td class="today_flow">
									<div class="summary extends">1</div>
									<div class="pillar m1"><div class="word"></div><div class="view v1"></div></div>
									<div class="pillar m2"><div class="word"></div><div class="view v2"></div></div>
									<div class="pillar m3"><div class="word"></div><div class="view v1"></div></div>
									<div class="pillar m4"><div class="word"></div><div class="view v2"></div></div>
								</td>
								<td class="money_flow">
									<div class="total_value"></div>
									<div class="five_flow"></div>
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