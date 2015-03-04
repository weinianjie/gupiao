var stockArr = new Array();
var qq_base_url = "http://qt.gtimg.cn/?q=s_sh000001,s_sz399001";//大盘和个股数据
var qq_flow_gegu_url = "http://qt.gtimg.cn/?q=";//个股资金动态
var qq_flow_dapan_url = "http://stock.gtimg.cn/data/view/flow.php?t=1"//全股资金动态
var qq_hangye_sort_url = "http://qt.gtimg.cn/?q=bkhz_Ind_inc,bkhz_Ind_fi";//行业资金和涨跌排行
var qq_hangye_detail_url = "http://qt.gtimg.cn/?q=";

//var a = ((("37.79" - "37.15") / "37.15" * 100) + "_").substr(0,4);
//alert(a);

$(document).ready(function(){
	//初始化数据和事件
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
	
	
	// 绑定qq登录回调函数
	/*QC.Login({},
		function(){// 登录成功
			alert(2);
		},
		function(){// 注销成功
			alert(3);
		}
	);
	
	// 使用qq登录
	$("#qq_login").click(function(){
		QC.Login.showPopup({
	    appId:"101196619"/*,
	    redirectURI:"http://www.ym26.com/qc_callback.html"
		});
	});*/
	
	$("#test").click(function(){
		window.open("http://www.baidu.com");
	});
	
	//data-appid="101196619" data-redirecturi="REDIRECTURI" data-callback="true"
	
	
	
	fastData();
	//setInterval("fastData()", 3000);
	mediumData();
	//setInterval("mediumData()", 15001);	
	slowData();
	//setInterval("slowData()", 60001);	
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
			
			// 个股
			for(var i=0;i<stockArr.length;i++){
				eval("var qqArr = v_" + stockArr[i] + ".split('~')");
				if(qqArr && qqArr.length > 0) {
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
				if(qqArr && qqArr.length > 0) {
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
	$.ajax({url: qq_hangye_sort_url, dataType:"script", cache:false, success:function(){
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
			$.ajax({url: qq_hangye_detail_url + url_param, dataType:"script", cache:false, success:function(){
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
}

// 慢数据
function slowData() {
	for(var i=0;i<stockArr.length;i++){
		// 分时K图
		$(".map .tkmap").eq(i).attr("src", "http://image.sinajs.cn/newchart/min/n/" + stockArr[i] + ".gif&_=" + parseInt(100000*Math.random()));		
	}
}