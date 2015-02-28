<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
  <head>
    <title>做作业</title>         
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript">
			$(document).ready(function(){
								
			});
		</script>
  </head>
  <body>
  	<div class="warpper">
  		<div class="summary">
			
  		</div>
  		<div class="stock_list">
  			<iframe class="stock_block" src="stock.php"></iframe>
  			<div class="stock_block"></div>
  			<div class="stock_block"></div>
  			<div class="stock_block"></div>
  			<div class="stock_block"></div>
  			<div class="stock_block"></div>
  			<div class="stock_block"></div>
  			<div class="stock_block"></div>
  			<div class="stock_block"></div>
  		</div>
  		
  		<div>
				<?php
					if(isset($_GET["count"])){

						//定义菜单
						$menu = array(
						array("title"=>"红烧冬瓜","price"=>9,"weight"=>1),
						array("title"=>"酸辣土豆丝","price"=>9,"weight"=>1),
						array("title"=>"手撕包菜","price"=>9,"weight"=>2),
						array("title"=>"鲮鱼油麦菜","price"=>10,"weight"=>4),
						array("title"=>"茄子豆角","price"=>10,"weight"=>1),
						array("title"=>"豆豉椒通菜梗","price"=>10,"weight"=>1),
						array("title"=>"西红柿炒鸡蛋","price"=>11,"weight"=>3),
						array("title"=>"酸豆角肉沫","price"=>11,"weight"=>1),
						array("title"=>"麻婆豆腐","price"=>11,"weight"=>1),
						array("title"=>"时蔬肉片","price"=>11,"weight"=>3),
						array("title"=>"农家煎豆腐","price"=>12,"weight"=>1),
						array("title"=>"酸包菜薯条","price"=>12,"weight"=>1),
						array("title"=>"莴笋五花肉","price"=>12,"weight"=>1),
						array("title"=>"菜花烧肉","price"=>12,"weight"=>1),
						array("title"=>"香菇烧肉","price"=>12,"weight"=>3),
						array("title"=>"青椒肉丝","price"=>12,"weight"=>1),
						array("title"=>"四季豆炒肉","price"=>12,"weight"=>4),
						array("title"=>"木耳肉丝","price"=>12,"weight"=>1),
						array("title"=>"青瓜肉片","price"=>12,"weight"=>4),
						array("title"=>"韭菜炒鸡蛋","price"=>12,"weight"=>3),
						array("title"=>"攸县香干","price"=>13,"weight"=>1),
						array("title"=>"外婆菜炒蛋","price"=>13,"weight"=>3),
						array("title"=>"干豆角花肉","price"=>13,"weight"=>1),
						array("title"=>"小笋酸菜肉沫","price"=>13,"weight"=>1),
						array("title"=>"尖椒回锅肉","price"=>13,"weight"=>1),
						array("title"=>"红烧鱼块","price"=>13,"weight"=>1),
						array("title"=>"小炒肉","price"=>13,"weight"=>3),
						array("title"=>"鱼香肉丝","price"=>13,"weight"=>1),
						array("title"=>"泡椒鸡杂","price"=>13,"weight"=>1),
						array("title"=>"蒜台烧肉","price"=>13,"weight"=>1),
						array("title"=>"拆骨肉油豆腐","price"=>13,"weight"=>1),
						array("title"=>"脆笋烧肉","price"=>13,"weight"=>3),
						array("title"=>"干豆角腊肉","price"=>14,"weight"=>1),
						array("title"=>"啤酒鸭","price"=>14,"weight"=>1),
						array("title"=>"回锅烧鸭","price"=>14,"weight"=>4),
						array("title"=>"小炒拆骨肉","price"=>14,"weight"=>3),
						array("title"=>"辣子鸡丁","price"=>14,"weight"=>1),
						array("title"=>"韭菜炒河虾","price"=>14,"weight"=>4),
						array("title"=>"土匪猪肝","price"=>14,"weight"=>3),
						array("title"=>"萝卜干腊肉","price"=>14,"weight"=>1),
						array("title"=>"浏阳火焙鱼","price"=>14,"weight"=>1),
						array("title"=>"烟笋腊肉","price"=>15,"weight"=>1),
						array("title"=>"老干妈腊肉","price"=>15,"weight"=>1),
						array("title"=>"酸辣肥肠","price"=>15,"weight"=>1),
						array("title"=>"土豆红烧肉","price"=>15,"weight"=>2),
						array("title"=>"梅菜扣肉","price"=>16,"weight"=>1),
						array("title"=>"野山椒牛肉","price"=>16,"weight"=>1)
						);
						
						//权重附加
						$indexArr = array();
						$index = 0;
						for($i=0;$i<count($menu);$i++){
							for($j=0;$j<$menu[$i]["weight"];$j++){
								array_push($indexArr, $i);
								$index++;
							}
						}
						
						//总人数
						$count = $_GET["count"];
						$menuLen = count($menu);
						$randNum = array();
						for($i=0;$i<$count;$i++){
							$r = rand(0, $index-1);
							$find = false;
							foreach($randNum as $r2){
								if($indexArr[$r]==$indexArr[$r2]){
									$find = true;
									break;
								}
							}
							//echo $r."</br>";
							if(!$find) {
								array_push($randNum, $r);//附加
							}else{
								$i--;//重算
							}
						}
						
						//echo "leng:".count($randNum)."</br>";
						
						//打印菜单
						$priceTotal=0;
						echo "<table class='menu_table'>";
						foreach($randNum as $r){
							$priceTotal += $menu[$indexArr[$r]]["price"];
							echo "<tr><td class='td1'>".$menu[$indexArr[$r]]["title"]."</td><td class='td2'>".$menu[$indexArr[$r]]["price"]."</td></tr>";
						}
						echo "</table>";
						echo "<div>总价：".$priceTotal."</div>";
						echo "<div>人均：".$priceTotal/$count."</div>";
						
					}
				?>
  		</div>
  	</div>
  </body>
</html>
