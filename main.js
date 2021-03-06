var zixuanArr = new Array();
var trackArr = new Array();
var qq_base_url = "http://qt.gtimg.cn/?q=s_sh000001,s_sz399001";//大盘和个股数据
var qq_flow_gegu_url = "http://qt.gtimg.cn/?q=";//个股资金动态
var qq_flow_dapan_url = "http://stock.gtimg.cn/data/view/flow.php?t=1"//全股资金动态
var qq_hangye_sort_url = "http://qt.gtimg.cn/?q=bkhz_Ind_inc,bkhz_Ind_fi";//行业资金和涨跌排行
var qq_hangye_detail_url = "http://qt.gtimg.cn/?q=";
var qq_dadan_summary = "http://stock.gtimg.cn/data/index.php?appn=dadan&action=summary&c=";
var qq_dadan_detail = "http://stock.finance.qq.com/sstock/list/view/dadan.php?t=js&max=100&p=1&opt=12&o=0&c=";//12代表500万以上

var drag_stock = "";

//var a = ((("37.79" - "37.15") / "37.15" * 100) + "_").substr(0,4);
//alert(a);
$(document).ready(function(){
	//初始化数据和事件
	var zixuanStr = $("input[name=zixuanStr]").val();
	if(zixuanStr && zixuanStr != "") {
		zixuanArr = zixuanStr.split(",");
		for(var i=0;i<zixuanArr.length;i++){
			qq_base_url += ",s_" + zixuanArr[i];
		}
	}
	var trackStr = $("input[name=trackStr]").val();
	if(trackStr && trackStr != "") {
		_trackArr = trackStr.split(",");
		for(var i=0;i<_trackArr.length;i++){
			_tArr = _trackArr[i].split("_");
			trackArr.push({"stockId" : _tArr[0], "track" : _tArr[1]});
			qq_base_url += "," + _tArr[0];
			qq_flow_gegu_url += ",ff_" + _tArr[0];
		}
	}
	
	// 拖动添加跟踪
	$(".stock_list .page_right .table_list").live("mousedown", function(e){
		var jdom = $(e.target);
		if(jdom.hasClass("IMG")) {
			drag_stock = jdom.parent().parent().find(".sname a").attr("title");
			$(document).bind("selectstart",function(){return false;});// 禁止选中文字
			$("body").css({cursor:"move"});// 改变鼠标样式
		}
	});
	$(document).live("mouseup", function(e){
		var jdom = $(e.target).closest(".stock_block");
		if(drag_stock != "" && jdom.length > 0){// 判断是否为.stock_block的子元素或自身
			var curStockCode = "";
			var curTrack = jdom.index(".stock_block") + 1;
			// 原来有跟踪则先移除			
			var as = jdom.find("a");
			if(as.size() > 0) {
				curStockCode = as.eq(0).attr("title");
				var curStockId = curStockCode.indexOf("6") == 0? "sh"+curStockCode:"sz"+curStockCode;
				for(var i=0;i<trackArr.length;i++) {
					if(trackArr[i]['stockId'] == curStockId) {
						trackArr.splice(i, 1);
						qq_base_url = qq_base_url.replace("\," + curStockId, "");
						qq_flow_gegu_url = qq_flow_gegu_url.replace("\,ff_" + curStockId, "");
						break;
					}
				}
			}
			// 新增当前要跟踪的
			var dragStockId = drag_stock.indexOf("6") == 0? "sh"+drag_stock:"sz"+drag_stock;
			trackArr.push({"stockId":dragStockId,"track":curTrack});
			qq_base_url += "," + dragStockId;
			qq_flow_gegu_url += ",ff_" + dragStockId;
			//立刻刷新
			fastData();
			mediumData();
			slowData();
			// 发送到后台保存
			var data = {};
			data['oldStock'] = curStockCode;
			data['newStock'] = drag_stock;
			data['newTrack'] = curTrack;
			$.ajax({url:'action.php?fn=dragRelace', type:'post', data:data, success:function(rs){
					console.info("追踪更新结果：" + rs);
				}
			});
			
		}
		drag_stock = "";
		$(document).unbind("selectstart");// 解除禁止选中文字
		$("body").css({cursor:"default"});// 接触改变鼠标样式
	});	
	
	// 切换分时图和日K线图
	$("#t_d").click(function(){
		$(".map .tkmap, .map .dkmap").toggle();
	});
	
	// QQ登录
//	$("#qq_login").click(function(){
//		window.open("qc/oauth/index.php", "TencentLogin",  "width=450,height=320,menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
//	});
	
	// 窗口调整
//	$(window).unbind("resize").resize(function() {
//	});
//	$(window).resize();
	
	// 数据定时器
	fastData();
	setInterval("fastData()", 3600);
	mediumData();
	setInterval("mediumData()", 15001);	
	slowData();
	setInterval("slowData()", 60001);	
});

// 快数据
function fastData() {
	$.ajax({url: qq_base_url, dataType:"script", cache:false, success:function(){
			// 大盘
			var shArr = v_s_sh000001.split('~');
			var szArr = v_s_sz399001.split('~');
			var msClass = "medium";
			if(shArr[5] != 0){
				msClass = shArr[5] > 0? "up" : "down";
			}
			var summary_html = "<span>上证指数:" + shArr[3] + "</span>";
			summary_html += "<span>涨跌:" + shArr[5] + "%</span>";
			summary_html += "<span>交易:" + shArr[7]/10000 + "亿</span>";
			summary_html += "|";
			summary_html += "<span>深证指数:" + szArr[3] + "</span>";
			summary_html += "<span>涨跌:" + szArr[5] + "%</span>";
			summary_html += "<span>交易:" + szArr[7]/10000 + "亿</span>";
			$(".dapan").html(summary_html).parent(".summary").removeClass("medium").removeClass("up").removeClass("down").addClass(msClass);
			
			// 追踪个股
			for(var i=0;i<trackArr.length;i++){
				eval("var qqArr = v_" + trackArr[i]['stockId'] + ".split('~')");
				var stock_block = $(".stock_block").eq(trackArr[i]['track']-1);
				if(qqArr && qqArr.length > 1 && stock_block.size() > 0) {
					var msClass = "medium";
					if(qqArr[32] != 0){
						msClass = qqArr[32] > 0? "up" : "down";
					}					
					var summary_html = "<span><a href='http://stockhtm.finance.qq.com/sstock/ggcx/" + qqArr[2] + ".shtml' title='" + qqArr[2] + "' target='_blank'>" + qqArr[1] + "</a></span>";
					summary_html += "<span>昨:" + qqArr[4] + "</span>";
					summary_html += "<span>开:" + qqArr[5] + "</span>";
					summary_html += "<span>当:" + qqArr[3] + "</span>";
					summary_html += "<span>高:" + qqArr[33] + "</span>";
					summary_html += "<span>低:" + qqArr[34] + "</span>";
					summary_html += "<span>" + qqArr[32] + "%</span>";
					stock_block.find(".gegu").html(summary_html).removeClass("medium").removeClass("up").removeClass("down").addClass(msClass);
					stock_block.find(".today_flow .extends").html("<span>净:" + qqArr[46] + "</span><span>盈:" + qqArr[39] + "</span>");
					stock_block.find(".money_flow .zong_value").html("总:" + (qqArr[45] + "").split(".")[0] + "亿");
					stock_block.find(".money_flow .flow_value").html("流:" + (qqArr[44] + "").split(".")[0] + "亿");
				}
			}
			
			// 自选个股
			var html = "<table border='0' class='table_list'>";
			for(var i=0;i<zixuanArr.length;i++){
				eval("var qqArr = v_s_" + zixuanArr[i] + ".split('~')");
        		var c = "medium";
        		if(qqArr[5] != 0) {
        			c = qqArr[5] > 0? "up" : "down";
        		}				
				html += "<tr class=" + c + ">";
//				html += "<td class='pic'><img src='1.png' title='拖动到左边查看详细' /></td>";
				html += "<td class='pic'><a class='IMG' title='拖动到左边查看详细'></a></td>";
				html += "<td class='sname'><a href='http://stockhtm.finance.qq.com/sstock/ggcx/" + qqArr[2] + ".shtml' target='_blank' title='" + qqArr[2] + "'>" + qqArr[1] + "</a></td>";
				html += "<td class='sfudu'>" + qqArr[3] + "</td>";
				html += "<td class='sbaifen'>" + qqArr[5] + "%</td></tr>";
			}
			html += "</table>";
			$(".page_right").html(html);
		}
	});
}

// 中数据
function mediumData() {
	// 柱状图高度数据初始化
	var box_height = $(".today_flow").height();
	var now = new Date();
	if(now.getHours() < 13){box_height = box_height/3*2;}// 上午的盘取2/3高度
	box_height = box_height/3*2;// 最大值高度设置为box高度的2/3
	
	$.ajax({url: qq_flow_gegu_url, dataType:"script", cache:false, success:function(){
			for(var i=0;i<trackArr.length;i++){
				eval("var qqArr = v_ff_" + trackArr[i]['stockId'] + ".split('~')");
				var stock_block = $(".stock_block").eq(trackArr[i]['track']-1);
				if(qqArr && qqArr.length > 1 && stock_block.size() > 0) {
					// 当日流动柱状图
					var i_max = Math.max(qqArr[2], qqArr[3], qqArr[5], qqArr[6]);
					stock_block.find(".today_flow .view").eq(0).height(box_height*qqArr[1]/i_max);
					stock_block.find(".today_flow .view").eq(1).height(box_height*qqArr[2]/i_max);
					stock_block.find(".today_flow .view").eq(2).height(box_height*qqArr[5]/i_max);
					stock_block.find(".today_flow .view").eq(3).height(box_height*qqArr[6]/i_max);
					stock_block.find(".today_flow .word").eq(0).text(qqArr[1].split(".")[0]);
					stock_block.find(".today_flow .word").eq(1).text(qqArr[2].split(".")[0]);
					stock_block.find(".today_flow .word").eq(2).text(qqArr[5].split(".")[0]);
					stock_block.find(".today_flow .word").eq(3).text(qqArr[6].split(".")[0]);					
					
					
					
					// 五日流动性
					stock_block.find(".five_flow").eq(0).html((qqArr[3]/1 + qqArr[7]/1 + "").split(".")[0] + "万");
					for(var j=14;j<=17;j++){
						var qqArr2 = qqArr[j].split("^");
						stock_block.find(".five_flow").eq(j-13).html((qqArr2[1]/1 - qqArr2[2]/1 + "").split(".")[0] + "万");
					}
				}
			}
		}
	});
	
	// 全股资金流向
	$.ajax({url: qq_flow_dapan_url, dataType:"script", cache:false, success:function(){
			var qqArr = v_funds_dapan.split('~');
			$(".dapan_flow").html("全股进出:" + ((qqArr[2]/1 + qqArr[5]/1)/10000 + "").split(".")[0] + "亿");
		}
	});	
	
	// 行业涨跌和资金
	$.ajax({url: qq_hangye_sort_url, dataType:"script", cache:false, success:function(){// 获取排序
			var zhangdieArr = v_bkhz_Ind_inc.split('~');
			var zijinArr = v_bkhz_Ind_fi.split('~');
			var url_param = "";
			for(var i=0;i<8;i++){
				if(url_param.indexOf(zhangdieArr[i]) == -1){
					url_param += "bkhz" + zhangdieArr[i] + ",";
				}
				if(url_param.indexOf(zhangdieArr[zhangdieArr.length-1-i]) == -1){
					url_param += "bkhz" + zhangdieArr[zhangdieArr.length-1-i] + ",";
				}				
				if(url_param.indexOf(zijinArr[i]) == -1){
					url_param += "bkhz" + zijinArr[i] + ",";
				}
				if(url_param.indexOf(zijinArr[zijinArr.length-1-i]) == -1){
					url_param += "bkhz" + zijinArr[zijinArr.length-1-i] + ",";
				}				
			}
			$.ajax({url: qq_hangye_detail_url + url_param, dataType:"script", cache:false, success:function(){// 获取具体值
					var html0 = "<ul><li class='extends'>行业涨幅榜</li>";
					var html1 = "<ul><li class='extends'>行业跌幅榜</li>";
					var html2 = "<ul><li class='extends'>主力流入榜</li>";
					var html3 = "<ul><li class='extends'>主力流出榜</li>";						
					for(var i=0;i<8;i++){
						eval("var qqArr0 = v_bkhz" + zhangdieArr[i] + ".split('~')");
						eval("var qqArr1 = v_bkhz" + zhangdieArr[zhangdieArr.length-1-i] + ".split('~')");
						eval("var qqArr2 = v_bkhz" + zijinArr[i] + ".split('~')");
						eval("var qqArr3 = v_bkhz" + zijinArr[zijinArr.length-1-i] + ".split('~')");
						html1 += "<li><span class='sname'><a href='http://stockapp.finance.qq.com/mstats/?id=" + qqArr0[0] + "' target='_blank'>" + qqArr0[1] + "</a></span><span class='sdata'>" + qqArr0[8] + "%</span></li>";
						html0 += "<li><span class='sname'><a href='http://stockapp.finance.qq.com/mstats/?id=" + qqArr1[0] + "' target='_blank'>" + qqArr1[1] + "</a></span><span class='sdata'>" + qqArr1[8] + "%</span></li>";
						html3 += "<li><span class='sname'><a href='http://stockapp.finance.qq.com/mstats/?id=" + qqArr2[0] + "' target='_blank'>" + qqArr2[1] + "</a></span><span class='sdata'>" + (qqArr2[15]/10000).toFixed(2) + "亿</span></li>";
						html2 += "<li><span class='sname'><a href='http://stockapp.finance.qq.com/mstats/?id=" + qqArr3[0] + "' target='_blank'>" + qqArr3[1] + "</a></span><span class='sdata'>" + (qqArr3[15]/10000).toFixed(2) + "亿</span></li>";
					}
					$(".basic_info .info").eq(0).html(html0 + "</ul>");
					$(".basic_info .info").eq(1).html(html1 + "</ul>");
					$(".basic_info .info").eq(2).html(html2 + "</ul>");
					$(".basic_info .info").eq(3).html(html3 + "</ul>");
				}
			});
		}
	});
	
	// 大单数据
	for(var i=0;i<trackArr.length;i++){
		(function(i){
			// 概要
			$.ajax({url: qq_dadan_summary + trackArr[i]['stockId'], dataType:"script", cache:false, success:function(){
					eval("var qqArr = v_dadan_summary_" + trackArr[i]['stockId'] + "[12]");//100W，opt=10的项目，在返回数组的第12个元素上
					var stock_block = $(".stock_block").eq(trackArr[i]['track']-1);
					if(qqArr && qqArr.length > 1 && stock_block.size() > 0){
						var html = "<div>100万以上概要<div>";
						html += "<div>买：" + qqArr[4] + "手</div>";
						html += "<div>卖：" + qqArr[5] + "手</div>";
						html += "<div>中：" + qqArr[6] + "手</div>";
						stock_block.find(".dadan .percent").html(html);
					}
				}
			});
			
			// 明细，查找500W以上的
			$.ajax({url: qq_dadan_detail + trackArr[i]['stockId'], dataType:"script", cache:false, success:function(){
					eval("var qqArr = (v_dadan_data_" + trackArr[i]['stockId'] + "[1]).split('^')");
					var stock_block = $(".stock_block").eq(trackArr[i]['track']-1);
					if(stock_block.size() > 0) {
						var html = "<ul>";
						html += "<li>500万以上明细<li>";
						for(var j=0;j<qqArr.length;j++) {
							var qqArr2 = qqArr[j].split("~");
							if(qqArr2 && qqArr2.length > 1){
								html += "<li>" + qqArr2[1] + "~" + qqArr2[2] + "~" + qqArr2[4].split(".")[0] + "~" + qqArr2[5] + "</li>";
							}
						}
						stock_block.find(".dadan .deal").html(html+"</ul>");
					}
				}
			});				
		}(i));
	}
}

// 慢数据
function slowData() {
	for(var i=0;i<trackArr.length;i++){
		// 分时K图
		var stock_block = $(".stock_block").eq(trackArr[i]['track']-1);
		if(stock_block.size() > 0){
			stock_block.find(".map .tkmap").attr("src", "http://image.sinajs.cn/newchart/min/n/" + trackArr[i]['stockId'] + ".gif&_=" + parseInt(100000*Math.random()));
		}
	}
}