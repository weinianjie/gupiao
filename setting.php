<?php require_once("dbUtils.php");?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>股哥</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){

    	// 修改股票代码的时候重置track为0
    	$("input[name=stockCode]").bind( 'input propertychange', function(){
    		$("select[name=track]").val("0");
        });
        
    	// 新增
    	$(".add").click(function(){
        	var data = {};

        	//股票代码
        	data['stockCode'] = $("input[name=stockCode]").val();
        	if(!data['stockCode'] || data['stockCode'].length != 6){
        		alert("股票代码长度为应该为6");
        		return;
        	}

        	// 追踪序号
        	data['track'] = $("select[name=track]").val();

        	// 排序
        	data['priority'] = $("input[name=priority]").val().substr(0,16);

        	// 股票名称
        	var stockId = data['stockCode'].substr(0,1) == "0"? "sz"+data['stockCode']:"sh"+data['stockCode'];
        	$.ajax({url: "http://qt.gtimg.cn/?q=s_" + stockId, dataType:"script", cache:false, success:function(){
        			try {
	        			eval("var qqArr = v_s_" + stockId + ".split('~')");
	        			if(qqArr && qqArr.length > 0) {
	            			data['stockName'] = qqArr[1];
	            			console.info(data['stockCode'] + "|" + data['stockName'] + "|" + data['track'] + "|" + data['priority']);
			            	$.ajax({url:'action.php?fn=addOrUpdate', type:'post', data:data, success:function(rs){
				            		if(rs == "1") {
					            		alert("操作成功");
					            		location.reload();
				            		}else{
				            			alert("操作失败");
				            		}
			            		}
			        		});
	        			}
        			}catch(e){
            			alert("获取股票名称失败");
        			}
        		}
        	});
        	
        });

        // 修改
    	$(".update").click(function(){
    		var tr = $(this).parent("td").parent("tr");
			$("input[name=stockCode]").val(tr.find("td").eq(1).text());
			$("input[name=priority]").val(tr.find("td").eq(3).text());
			$("select[name=track]").val(tr.find("td").eq(4).text());
        });

        // 删除
    	$(".delete").click(function(){
        	var stockCode = $(this).parent("td").parent("tr").attr("id");
        	$.ajax({url:'action.php?fn=delete', type:'post', data:{stockCode:stockCode}, success:function(rs){
        		location.reload();
    			}
			});      	
        });
    });
    </script>
  </head>
  <body>
  <form action="#" style="width:100%; border:solid 1px #ccc;">
  	<span>股票代码</span><input type="text" name="stockCode" />
  	<span>排序</span><input type="text" name="priority" />
  	<span>追踪序号
	  	<select name="track">
	  		<option value="0">0</option>
	  		<option value="1">1</option>
	  		<option value="2">2</option>
	  		<option value="3">3</option>
	  		<option value="4">4</option>
	  		<option value="5">5</option>
	  		<option value="6">6</option>
	  		<option value="7">7</option>
	  		<option value="8">8</option>
	  	</select>
  	</span>
  	<input type="button" class="add" value="确定" />
  </form>
  <?php
  	$dbUtils = new DbUtils();
  	$list = $dbUtils->getAll(); 
  ?>
  <table border="1" class="setting_table">
  	<tr>
  		<th>序号</th>
  		<th>股票代码</th>
  		<th>股票名称</th>  		
  		<th>股票排序</th>
  		<th>跟踪序号</th>
  		<th>操作</th>
  	</tr>
  	<?php
  		foreach ($list as $key=>$stock) {
  	?>
  	<tr id="<?php echo $stock[0]; ?>">
  		<td><?php echo $key+1; ?></td>
  		<td><?php echo $stock[0]; ?></td>
  		<td><?php echo $stock[1]; ?></td>  		
  		<td><?php echo $stock[3]; ?></td>
  		<td><?php echo $stock[2]; ?></td>
  		<td><a href="javascript:void(0);" class="update">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="delete">删除</a></td>
  	</tr>
  	<?php 
  		} 
  	?>
  </table>
  </body>
  </html>