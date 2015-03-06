<?php
class DbUtils {
	private $connection = null;
// 	private $db_host='127.0.0.1';
// 	private $db_username='a0226150238';
// 	private $db_password='92395451';
// 	private $db_database='a0226150238';
	private $db_username='root';
	private $db_password='linux';
	private $db_database='sheep';
	
	// 打开连接
	private function openConnect() {
		$this->connection=mysql_connect($this->db_host, $this->db_username, $this->db_password);//连接到数据库
		mysql_query("set names 'utf8'");//编码转化
		$db_selecct=mysql_select_db($this->db_database);//选择数据库
	}
	
	// 关闭连接
	private function closeConnect() {
		mysql_close($this->connection);
	}
	
	// 获取所有
	public function getAll() {
		$stockList = array();
		$this->openConnect();
		if($this->connection){
			$query="select stockCode,stockName,track,priority from stock order by priority limit 100";
			$result=mysql_query($query);//执行查询
			while($result_row=mysql_fetch_row(($result))){
				$item = array();
				array_push($item, $result_row[0]);
				array_push($item, $result_row[1]);
				array_push($item, $result_row[2]);
				array_push($item, $result_row[3]);
				array_push($stockList, $item);
			}
		}
		$this->closeConnect();
		return $stockList;
	}	
	
	// 获取自选股
	public function getZixuangu() {
		$stockList = array();
		$this->openConnect();
		if($this->connection){
			$query="select stockCode from stock order by priority limit 100";
			$result=mysql_query($query);//执行查询
			while($result_row=mysql_fetch_row(($result))){
				array_push($stockList, $result_row[0]);
			}		
		}
		$this->closeConnect();
		return $stockList;
	}
	
	// 获取追踪的股票
	public function getTrack(){
		$stockList = array();
		$this->openConnect();
		if($this->connection){
			$query="select stockCode from stock where track=1 order by priority limit 8";
			$result=mysql_query($query);//执行查询
			while($result_row=mysql_fetch_row(($result))){
				array_push($stockList, $result_row[0]);
			}		
		}
		$this->closeConnect();
		return $stockList;
	}
	
	// 新增或者修改
	public function addOrUpdate($stockCode, $stockName, $priority, $track) {
		$stockList = array();
		$this->openConnect();
		if($this->connection){
			$sql = "insert into stock values('".$stockCode."','".$stockName."',".$track.",".$priority.",now(),now()) ";
			$sql .= "on duplicate key update stockName='".$stockName."', track=".$track.", priority=".$priority.", uts=now()";
			if(mysql_query($sql)) {
				return true;
			}else {
				return false;
			}
		}
		$this->closeConnect();
		return $stockList;
	}

	// 删除
	public function delete($stockCode) {
		$stockList = array();
		$this->openConnect();
		if($this->connection){
			$sql="delete from stock where stockCode='".$stockCode."'";
			if(mysql_query($sql)) {
				return true;
			}else {
				return false;
			}
		}
		$this->closeConnect();
		return $stockList;
	}	
}
?>