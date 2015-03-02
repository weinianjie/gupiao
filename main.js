var stockArr = new Array();
var sina_base_url = "http://hq.sinajs.cn/list=s_sh000001,s_sz399001";
var qq_flow_url = "http://qt.gtimg.cn/q=";

//var a = ((("37.79" - "37.15") / "37.15" * 100) + "_").substr(0,4);
//alert(a);

$(document).ready(function(){
	//初始化数据和事件
	$(".stock_block").each(function(){
		stockId = $(this).attr("id").split("_")[1];
		stockArr.push(stockId);
		sina_base_url += "," + stockId;
		qq_flow_url += ",ff_" + stockId;
	});
	
	// 切换分时图和日K线图
	$("#t_d").click(function(){
		$(".map .tkmap, .map .dkmap").toggle();
	});
	
	fastData();
	//setInterval("fastData()", 5000);
	slowData();
	//setInterval("slowData()", 30000);	
});

// 快数据
function fastData() {
	$.ajax({url: sina_base_url, dataType:"script", cache:true, success:function(){
			// 大盘
			var shArr = hq_str_s_sh000001.split(',');
			var szArr = hq_str_s_sz399001.split(',');
			var msClass = shArr[3] >= 0? "up" : "down";
			var summary_html = "<span>上证指数:" + shArr[1] + "</span>";
			summary_html += "<span>涨跌:" + shArr[3] + "</span>";
			summary_html += "<span>交易:" + shArr[5]/10000 + "亿</span>";
			summary_html += "|";
			summary_html += "<span>深证指数:" + szArr[1] + "</span>";
			summary_html += "<span>涨跌:" + szArr[3] + "</span>";
			summary_html += "<span>交易:" + szArr[5]/10000 + "亿</span>";
			$(".dapan").html(summary_html).parent(".summary").removeClass("up").removeClass("down").addClass(msClass);
			
			// 个股
			for(var i=0;i<stockArr.length;i++){
				eval("var sinaArr = hq_str_" + stockArr[i] + ".split(',')");
				if(sinaArr && sinaArr.length > 0) {
					var msClass = (sinaArr[3] - sinaArr[2]) >= 0? "up" : "down";
					var rate = (((sinaArr[3] - sinaArr[2]) / sinaArr[2] * 100) + "").substr(0,5);
					var summary_html = "<span>" + sinaArr[0] + "(" + stockId + ")</span>";
					summary_html += "<span>昨:" + sinaArr[2] + "</span>";
					summary_html += "<span>开:" + sinaArr[1] + "</span>";
					summary_html += "<span>当:" + sinaArr[3] + "</span>";
					summary_html += "<span>高:" + sinaArr[4] + "</span>";
					summary_html += "<span>低:" + sinaArr[5] + "</span>";
					summary_html += "<span>" + rate + "</span>";
					$(".gegu").eq(i).html(summary_html).parent(".summary").removeClass("up").removeClass("down").addClass(msClass);										
				}
			}
		}
	});
}

// 慢数据
function slowData() {
	// 柱状图高度数据初始化
	var box_height = $(".today_flow").height();
	var now = new Date();
	if(now.getHours() < 13){box_height = box_height/3*2;}// 上午的盘取2/3高度
	box_height = box_height/3*2;// 最大值高度设置为box高度的2/3
	
	$.ajax({url: qq_flow_url, dataType:"script", cache:true, success:function(){
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
				$(".map .tkmap").eq(i).attr("src", "http://image.sinajs.cn/newchart/min/n/" + stockArr[i] + ".gif");
			}
		}
	});
}