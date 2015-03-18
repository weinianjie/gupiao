<?php require_once("dbUtils.php");?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>股哥</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta property="qc:admins" content="3404475667615266375" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
  </head>
  <body>
  	<div class="summary" style="border-bottom:solid 1px #ccc;">
  		<span class="dapan"></span>
  		<span class="dapan_flow"></span>
  		<!-- <a href="javascript:void(0);" class="bt" id="qq_login">登录</a> -->
  		<a href="javascript:void(0);" class="bt" id="t_d">切换K图</a>
  		<!-- <a href="setting.php" class="bt" target="_blank">配置股票</a> -->
  		<a href="stocklist.php" class="bt" target="_blank">自选列表</a>
  		<a href="http://finance.qq.com/stock/xingu/index.htm?pgv_ref=fi_quote_navi_bar" class="bt" target="_blank">新股</a>
  		<span class="bt">weinianjie@163.com</span>
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
					$dbUtils = new DbUtils();
					$zixuanList = $dbUtils->getZixuangu();
					$zixuanStr = '';
					foreach($zixuanList as $stockCode) {
						$stockId = strpos($stockCode, "6") === 0? "sh".$stockCode : "sz".$stockCode;
						$zixuanStr = $zixuanStr.','.$stockId;
					}
					if($zixuanStr != ''){
						$zixuanStr = substr($zixuanStr, 1);
					}
					
					$trackList = $dbUtils->getTrack();
					$trackStr = '';
					foreach($trackList as $stockCode) {
						$stockId = strpos($stockCode, "6") === 0? "sh".$stockCode : "sz".$stockCode;
						$trackStr = $trackStr.','.$stockId;
					}
					if($trackStr != ''){
						$trackStr = substr($trackStr, 1);
					}					
				?>
				<input type="hidden" name="zixuanStr" value="<?php echo $zixuanStr; ?>" />
				<input type="hidden" name=trackStr value="<?php echo $trackStr; ?>" />
				<?php
					for($i=0;$i<8;$i++){
				?>
						<div class="stock_block">
							<div class="summary gegu">
							</div>
							<table border="1" class="detail">
								<tr>
									<td class="map" colspan="2">
										<div class="limit">
											<img class="tkmap" src="" />
											<img class="dkmap hide" src="" />
										</div>									
									</td>
									<td class="dadan" rowspan="2">
										<div class="percent"></div>
										<div class="deal"></div>
									</td>
								</tr>
								<tr>
									<td class="today_flow">
										<div class="summary extends"></div>
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
