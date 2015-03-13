var zixuanArr = new Array();
var stockArr = new Array();
var qq_base_url = "http://qt.gtimg.cn/?q=s_sh000001,s_sz399001";//大盘和个股数据
var qq_flow_gegu_url = "http://qt.gtimg.cn/?q=";//个股资金动态
var qq_flow_dapan_url = "http://stock.gtimg.cn/data/view/flow.php?t=1"//全股资金动态
var qq_hangye_sort_url = "http://qt.gtimg.cn/?q=bkhz_Ind_inc,bkhz_Ind_fi";//行业资金和涨跌排行
var qq_hangye_detail_url = "http://qt.gtimg.cn/?q=";
var qq_dadan_summary = "http://stock.gtimg.cn/data/index.php?appn=dadan&action=summary&c=";
var qq_dadan_detail = "http://stock.finance.qq.com/sstock/list/view/dadan.php?t=js&max=100&p=1&opt=12&o=0&c=";//12代表500万以上

//var a = ((("37.79" - "37.15") / "37.15" * 100) + "_").substr(0,4);
//alert(a);

$(document).ready(function(){
	//初始化数据和事件
	var zixuanStr = $("input[name=zixuanStr]").val();
	if(zixuanStr && zixuanStr != "") {
		zixuanArr = zixuanStr.substr(1).split(",");
		for(var i=0;i<zixuanArr.length;i++){
			qq_base_url += ",s_" + zixuanArr[i];
		}
	}
	$(".stock_block").each(function(){
		stockId = $(this).attr("id").split("_")[1];
		stockArr.push(stockId);
		qq_base_url += "," + stockId;
		qq_flow_gegu_url += ",ff_" + stockId;
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
			var msClass = shArr[5] >= 0? "up" : "down";
			var summary_html = "<span>上证指数:" + shArr[3] + "</span>";
			summary_html += "<span>涨跌:" + shArr[5] + "%</span>";
			summary_html += "<span>交易:" + shArr[7]/10000 + "亿</span>";
			summary_html += "|";
			summary_html += "<span>深证指数:" + szArr[3] + "</span>";
			summary_html += "<span>涨跌:" + szArr[5] + "%</span>";
			summary_html += "<span>交易:" + szArr[7]/10000 + "亿</span>";
			$(".dapan").html(summary_html).parent(".summary").removeClass("up").removeClass("down").addClass(msClass);
			
			// 追踪个股
			for(var i=0;i<stockArr.length;i++){
				eval("var qqArr = v_" + stockArr[i] + ".split('~')");
				if(qqArr && qqArr.length > 1) {
					var msClass = qqArr[32] >= 0? "up" : "down";
					var summary_html = "<span><a href='http://stockhtm.finance.qq.com/sstock/ggcx/" + qqArr[2] + ".shtml' target='_blank'>" + qqArr[1] + "</a>" + qqArr[2] + "</span>";
					summary_html += "<span>昨:" + qqArr[4] + "</span>";
					summary_html += "<span>开:" + qqArr[5] + "</span>";
					summary_html += "<span>当:" + qqArr[3] + "</span>";
					summary_html += "<span>高:" + qqArr[33] + "</span>";
					summary_html += "<span>低:" + qqArr[34] + "</span>";
					summary_html += "<span>" + qqArr[32] + "%</span>";
					$(".stock_block .gegu").eq(i).html(summary_html).removeClass("up").removeClass("down").addClass(msClass);
					$(".today_flow .extends").eq(i).html("<span>净:" + qqArr[46] + "</span><span>盈:" + qqArr[39] + "</span>");
					$(".money_flow .zong_value").eq(i).html("总:" + (qqArr[45] + "").split(".")[0] + "亿");
					$(".money_flow .flow_value").eq(i).html("流:" + (qqArr[44] + "").split(".")[0] + "亿");
				}
			}
			
			// 自选个股
			var html = "<table border='0' class='table_list'>";
			for(var i=0;i<zixuanArr.length;i++){
				eval("var qqArr = v_s_" + zixuanArr[i] + ".split('~')");
				html += "<tr><td class='sname'><a href='http://stockhtm.finance.qq.com/sstock/ggcx/" + qqArr[2] + ".shtml' target='_blank' title='" + qqArr[2] + "'>" + qqArr[1] + "</a></td>";
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
			for(var i=0;i<stockArr.length;i++){
				eval("var qqArr = v_ff_" + stockArr[i] + ".split('~')");
				if(qqArr && qqArr.length > 1) {
					// 当日流动柱状图
					var i_max = Math.max(qqArr[2], qqArr[3], qqArr[5], qqArr[6]);
					$(".today_flow").eq(i).find(".view").eq(0).height(box_height*qqArr[1]/i_max);
					$(".today_flow").eq(i).find(".view").eq(1).height(box_height*qqArr[2]/i_max);
					$(".today_flow").eq(i).find(".view").eq(2).height(box_height*qqArr[5]/i_max);
					$(".today_flow").eq(i).find(".view").eq(3).height(box_height*qqArr[6]/i_max);
					$(".today_flow").eq(i).find(".word").eq(0).text(qqArr[1].split(".")[0]);
					$(".today_flow").eq(i).find(".word").eq(1).text(qqArr[2].split(".")[0]);
					$(".today_flow").eq(i).find(".word").eq(2).text(qqArr[5].split(".")[0]);
					$(".today_flow").eq(i).find(".word").eq(3).text(qqArr[6].split(".")[0]);					
					
					
					
					// 五日流动性
					$(".stock_block").eq(i).find(".five_flow").eq(0).html((qqArr[3]/1 + qqArr[7]/1 + "").split(".")[0] + "万");
					for(var j=14;j<=17;j++){
						var qqArr2 = qqArr[j].split("^");
						$(".stock_block").eq(i).find(".five_flow").eq(j-13).html((qqArr2[1]/1 - qqArr2[2]/1 + "").split(".")[0] + "万");
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
	for(var i=0;i<stockArr.length;i++){
		(function(i){
			// 概要
			$.ajax({url: qq_dadan_summary + stockArr[i], dataType:"script", cache:false, success:function(){
					eval("var qqArr = v_dadan_summary_" + stockArr[i] + "[12]");//100W，opt=10的项目，在返回数组的第12个元素上
					if(qqArr && qqArr.length > 1){
						var html = "<div>100万以上概要<div>";
						html += "<div>买：" + qqArr[4] + "手</div>";
						html += "<div>卖：" + qqArr[5] + "手</div>";
						html += "<div>中：" + qqArr[6] + "手</div>";
						$(".stock_block .dadan .percent").eq(i).html(html);
					}
				}
			});
			
			// 明细，查找500W以上的
			$.ajax({url: qq_dadan_detail + stockArr[i], dataType:"script", cache:false, success:function(){
					eval("var qqArr = (v_dadan_data_" + stockArr[i] + "[1]).split('^')");
					var html = "<ul>";
					html += "<li>500万以上明细<li>";
					for(var j=0;j<qqArr.length;j++) {
						var qqArr2 = qqArr[j].split("~");
						if(qqArr2 && qqArr2.length > 1){
							html += "<li>" + qqArr2[1] + "~" + qqArr2[2] + "~" + qqArr2[4].split(".")[0] + "~" + qqArr2[5] + "</li>";
						}
					}
					$(".stock_block .dadan .deal").eq(i).html(html+"</ul>");
				}
			});				
		}(i));
	}
}

// 慢数据
function slowData() {
	for(var i=0;i<stockArr.length;i++){
		// 分时K图
		$(".map .tkmap").eq(i).attr("src", "http://image.sinajs.cn/newchart/min/n/" + stockArr[i] + ".gif&_=" + parseInt(100000*Math.random()));		
	}
}