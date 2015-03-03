var stockArr = new Array();
var qq_base_url = "http://qt.gtimg.cn/?q=s_sh000001,s_sz399001";//大盘和个股数据
var qq_flow_gegu_url = "http://qt.gtimg.cn/?q=";//个股资金动态
var qq_flow_hangye_url = "http://stock.gtimg.cn/data/view/flow.php?t=2";//行业资金动态
var qq_flow_dapan_url = "http://stock.gtimg.cn/data/view/flow.php?t=1"//全股资金动态

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
	
	
	
	fastData();
	//setInterval("fastData()", 3000);
	mediumData();
	//setInterval("mediumData()", 15001);	
	slowData();
	//setInterval("slowData()", 30001);	
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
					var summary_html = "<span>" + qqArr[1] + "(" + qqArr[2] + ")</span>";
					summary_html += "<span>昨:" + qqArr[4] + "</span>";
					summary_html += "<span>开:" + qqArr[5] + "</span>";
					summary_html += "<span>当:" + qqArr[3] + "</span>";
					summary_html += "<span>高:" + qqArr[33] + "</span>";
					summary_html += "<span>低:" + qqArr[34] + "</span>";
					summary_html += "<span>" + qqArr[32] + "%</span>";
					$(".stock_block .gegu").eq(i).html(summary_html).parent(".summary").removeClass("up").removeClass("down").addClass(msClass);
					$(".today_flow .extends").eq(i).html("<span>净:" + qqArr[46] + "</span><span>盈:" + qqArr[39] + "</span>");
					$(".money_flow .total_value").eq(i).html("<span>总:" + (qqArr[45] + "").split(".")[0] + "亿</span><span>流:" + (qqArr[44] + "").split(".")[0] + "亿</span>");
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
					var five_html = ("<div>" + (qqArr[3]/1 + qqArr[7]/1)).split(".")[0] + "万</div>"
					for(var j=14;j<=17;j++){
						var qqArr2 = qqArr[j].split("^");
						five_html += ("<div>" + (qqArr2[1]/1 - qqArr2[2]/1)).split(".")[0] + "万</div>";
					}
					$(".five_flow").eq(i).html(five_html);
				}
				
				// 分时K图
				$(".map .tkmap").eq(i).attr("src", "http://image.sinajs.cn/newchart/min/n/" + stockArr[i] + ".gif&_=" + parseInt(100000*Math.random()));
			}
		}
	});
	
	// 行业资金流向
	$.ajax({url: qq_flow_hangye_url, dataType:"script", cache:false, success:function(){
			var qqArr = v_s_boardzhuli.split('^');
			if(qqArr && qqArr.length >=8){
				var html1 = "<ul><li class='extends'>主力流入</li>";
				var html2 = "<ul><li class='extends'>主力流出</li>";
				for(var i=0;i<10;i++){
					var qqArrX = qqArr[i].split("~");
					var qqArrY = qqArr[qqArr.length-1-i].split("~");
					console.info(global_data_hangye["hy"+qqArrX[0]]);
					html1 += "<li><span class='sname'><a href='http://stockapp.finance.qq.com/mstats/?id=" + qqArrX[0] + "' target='_blank'>" + global_data_hangye["hy"+qqArrX[0]] + "</a></span><span class='flow'>" + (qqArrX[4]/10000).toFixed(2) + "亿</span></li>";
					html2 += "<li><span class='sname'><a href='http://stockapp.finance.qq.com/mstats/?id=" + qqArrY[0] + "' target='_blank'>" + global_data_hangye["hy"+qqArrY[0]] + "</a></span><span class='flow'>" + (qqArrY[4]/10000).toFixed(2) + "亿</span></li>";
				}
				html1 += "</ul>";
				html2 += "</ul>";
				$(".basic_info .info").eq(2).html(html1);
				$(".basic_info .info").eq(3).html(html2);
			}
		}
	});		
	
	// 全股资金流向
	$.ajax({url: qq_flow_dapan_url, dataType:"script", cache:false, success:function(){
			var qqArr = v_funds_dapan.split('~');			
			$(".dapan_flow").html("全股资金:" + ((qqArr[2]/1 + qqArr[5]/1)/10000 + "").split(".")[0] + "亿");
		}
	});
}

// 慢数据
function slowData() {
	
}