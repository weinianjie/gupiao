<?php require_once("dbUtils.php");?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>股哥</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript">
	// 获取当前数据
    var zixuanArr = new Array();
    var murl = "http://qt.gtimg.cn/?q=";
    function getCurrent() {
        if(murl.substr(-1, 1) == ",") {// 有数据
        	$.ajax({url: murl, dataType:"script", cache:false, success:function(){
        			for(var i=0;i<zixuanArr.length;i++){
        				eval("var qqArr = v_s_" + zixuanArr[i] + ".split('~')");
            			var c = qqArr[5]/1 >= 0? "up":"down";
        				$("#s_" + qqArr[2] + " td").eq(2).html(qqArr[3] + "%").addClass(c);
        				$("#s_" + qqArr[2] + " td").eq(3).html(qqArr[5]  + "%").addClass(c);
    				}
        		}
        	});
    	}
	}
    
    $(document).ready(function(){
    	$(".mtr").each(function(){

        	// 请求历史数据
        	var stockCode = $(this).attr("id").split("_")[1];
        	$.ajax({url:"history.php?stockCode=" + stockCode, success:function(rs){
            	if(rs && rs.length > 0) {
                	var line = rs.split("~");
                	for(var i=0;i<line.length;i++) {
                		var arr = line[i].split(",");
                		var s = ((arr[4] - arr[1])*100/arr[1]).toFixed(2);
                		var c = s>=0? "up" : "down";
                		$("#s_" + stockCode + " td").eq(i+4).html(s + "%").addClass(c);
                	}
            	}
            }});
            
			// 组装当前数据的url
        	var stockId = stockCode.substr(0,1) == "0"? "sz"+stockCode:"sh"+stockCode;
        	zixuanArr.push(stockId);
            murl += "s_" + stockId + ",";
        });

        // 刷新当前数据
        getCurrent();
        setInterval("getCurrent()", 5000);
    });
    </script>
  </head>
  <body>
  <?php
  	$dbUtils = new DbUtils();
  	$list = $dbUtils->getAll(); 
  ?>
  <table border="1" class="stocklist_table">
    	<tr>
	  		<th>序号</th>
	  		<th>股票名称</th>
	  		<th>当前</th>  		
	  		<th>涨跌</th>
	  		<th colspan="21">历史数据</th>
  		</tr>
  	<?php
  		foreach ($list as $key=>$stock) {
  	?>
  	<tr class="mtr" id="s_<?php echo $stock[0]; ?>">
  		<td class="no"><?php echo $key+1; ?></td>
  		<td class="sname"><a href="http://stockhtm.finance.qq.com/sstock/ggcx/<?php echo $stock[0]; ?>.shtml" target="_blank" title="<?php echo $stock[0]; ?>"><?php echo $stock[1]; ?></a></td><!-- 股票名称 -->
  		<td></td><!-- 当前价 -->
  		<td></td><!-- 当前涨跌 -->
  		<td></td><!-- 历史涨跌0 -->
  		<td></td><!-- 历史涨跌1 -->
  		<td></td><!-- 历史涨跌2 -->
  		<td></td><!-- 历史涨跌3 -->
  		<td></td><!-- 历史涨跌4 -->
  		<td></td><!-- 历史涨跌5 -->
  		<td></td><!-- 历史涨跌6 -->
  		<td></td><!-- 历史涨跌7 -->
  		<td></td><!-- 历史涨跌8 -->
  		<td></td><!-- 历史涨跌9 -->
  		<td></td><!-- 历史涨跌10 -->
  		<td></td><!-- 历史涨跌11 -->
  		<td></td><!-- 历史涨跌12 -->
  		<td></td><!-- 历史涨跌13 -->
  		<td></td><!-- 历史涨跌14 -->
  		<td></td><!-- 历史涨跌15 -->
  		<td></td><!-- 历史涨跌16 -->
  		<td></td><!-- 历史涨跌17 -->
  		<td></td><!-- 历史涨跌18 -->
  		<td></td><!-- 历史涨跌19 -->
  		<td></td><!-- 历史涨跌20 -->
  	</tr>
  	<?php 
  		} 
  	?>
  </table>
  </body>
  </html>