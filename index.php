<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>金钱宝</title>         
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript">
			function initPage() {
				
				var url = "http://hq.sinajs.cn/list=s_sh000001,s_sz399001";
				//var url = "http://hq.sinajs.cn/list=s_sh000001,s_sz399001;
				
				$.ajax({url: url, dataType:"script", cache:true, success:function(){
						var shArr = hq_str_s_sh000001.split(',');
						var szArr = hq_str_s_sz399001.split(',');
						var summary_html = "<span>上证指数：" + shArr[1] + "</span>";
						summary_html += "<span>涨跌：" + shArr[3] + "</span>";
						summary_html += "<span>交易：" + shArr[5]/10000 + "亿</span>";
						summary_html += "|";
						summary_html += "<span>深证指数：" + szArr[1] + "</span>";
						summary_html += "<span>涨跌：" + szArr[3] + "</span>";
						summary_html += "<span>交易：" + szArr[5]/10000 + "亿</span>";
						$(".summary").html(summary_html);
					}
				});
				
				var stockArr = new Array("sz000333","sz000651","sz002190","sz000768","sz002594","sz000650","sz000952","sz000417","sz002336");				
				for(var i=0;i<stockArr.length;i++){
					$(".stock_block").eq(i).attr("src", "stock.php?stockId=" + stockArr[i]);
				}
			}
			$(document).ready(function(){
				initPage();
				setInterval("initPage()", 5000);
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
