<?php require_once("qc/API/qqConnectAPI.php"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>股哥</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta property="qc:admins" content="34044756475246451006375" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
  </head>
  <body>
  	<div class="summary" style="border-bottom:solid 1px #ccc;">
  		<span class="dapan"></span>
  		<span class="dapan_flow"></span>
  		<a href="javascript:void(0);" class="bt" id="qq_login">QQ登录</a>
  		<a href="javascript:void(0);" class="bt" id="t_d">切换K图</a>
  		<a href="stocklist.php" class="bt" target="_blank">自选列表</a>
  		<a href="http://finance.qq.com/stock/xingu/index.htm?pgv_ref=fi_quote_navi_bar" class="bt" target="_blank">新股</a>
  	</div>
		<div class="stock_list">
			<div class="page_left">
				<div class="basic_info">
					<div class="info"></div>
					<div class="info" style="background-color:#eee;"></div>
					<div class="info"></div>
					<div class="info" style="background-color:#eee;"></div>
				</div>
				<?php
					$zixuanList = array("000333","000651","002190","002594","000650","000952","000417","002336");
					$zixuanStr = '';
					foreach($zixuanList as $stockCode) {
						$stockId = strpos($stockCode, "6") === 0? "sh".$stockCode : "sz".$stockCode;
						$zixuanStr = $zixuanStr.','.$stockId;
					}
				?>
				<input type="hidden" name="zixuanStr" value="<?php echo $zixuanStr; ?>" />
				<?php
					$stockList = array("000333","000651","002190","002594","000650","000952","000417","002336");
					foreach($stockList as $stockCode){
						$stockId = strpos($stockCode, "6") === 0? "sh".$stockCode : "sz".$stockCode;
				?>
						<div class="stock_block" id="s_<?php echo $stockId; ?>">
							<div class="summary gegu">
							</div>
							<table border="1" class="detail">
								<tr>
									<td class="map" colspan="2">
										<div class="limit">
											<img class="tkmap" src="" />
											<img class="dkmap hide" src="http://image.sinajs.cn/newchart/daily/n/<?php echo $stockId; ?>.gif" />
										</div>									
									</td>
									<td class="dadan" rowspan="2">
										<div class="percent"></div>
										<div class="deal"></div>
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
										<ul>
											<li class="zong_value"></li>
											<li class="flow_value"></li>
											<li class="five_flow"></li>
											<li class="five_flow"></li>
											<li class="five_flow"></li>
											<li class="five_flow"></li>
											<li class="five_flow"></li>
										</ul>
									</td>
								</tr>
							</table>
						</div>
				<?php
					}
				?>
			</div>
			<div class="page_right">
			</div>
		</div>
  </body>
</html>
