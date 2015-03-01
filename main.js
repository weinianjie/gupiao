var stockArr = new Array();
var sinaUrl = "http://hq.sinajs.cn/list=s_sh000001,s_sz399001";

$(document).ready(function(){
	$(".stock_block").each(function(){
		stockId = $(this).attr("id").split("_")[1];
		stockArr.push(stockId);
		sinaUrl += "," + stockId;
	});
	initPage();
	//setInterval("initPage()", 5000);
});
//var a = ((("37.79" - "37.15") / "37.15" * 100) + "_").substr(0,4);
//alert(a);
function initPage() {
	$.ajax({url: sinaUrl, dataType:"script", cache:true, success:function(){
			// 大盘
			var shArr = hq_str_s_sh000001.split(',');
			var szArr = hq_str_s_sz399001.split(',');
			var msClass = shArr[3] > 0? "up" : "down";
			var summary_html = "<span>上证指数:" + shArr[1] + "</span>";
			summary_html += "<span>涨跌:" + shArr[3] + "</span>";
			summary_html += "<span>交易:" + shArr[5]/10000 + "亿</span>";
			summary_html += "|";
			summary_html += "<span>深证指数:" + szArr[1] + "</span>";
			summary_html += "<span>涨跌:" + szArr[3] + "</span>";
			summary_html += "<span>交易:" + szArr[5]/10000 + "亿</span>";
			$(".dapan").html(summary_html).removeClass("up").removeClass("down").addClass(msClass);
			
			// 个股
			for(var i=0;i<stockArr.length;i++){
				eval("var sinaArr = hq_str_" + stockArr[i] + ".split(',')");
				if(sinaArr && sinaArr.length > 0) {
					var msClass = (sinaArr[3] - sinaArr[2]) > 0? "up" : "down";
					var rate = (((sinaArr[3] - sinaArr[2]) / sinaArr[2] * 100) + "_").substr(0,5);
					var summary_html = "<span>" + sinaArr[0] + "(" + stockId + ")</span>";
					summary_html += "<span>昨:" + sinaArr[2] + "</span>";
					summary_html += "<span>开:" + sinaArr[1] + "</span>";
					summary_html += "<span>当:" + sinaArr[3] + "</span>";
					summary_html += "<span>高:" + sinaArr[4] + "</span>";
					summary_html += "<span>低:" + sinaArr[5] + "</span>";
					summary_html += "<span>" + rate + "</span>";
					$(".gegu").eq(i).html(summary_html).removeClass("up").removeClass("down").addClass(msClass);
					
					$(".map .tkmap").eq(i).attr("src", "http://image.sinajs.cn/newchart/min/n/" + stockArr[i] + ".gif");
				}
			}
		}
	});
}