<?php
class DbUtils {
	private $connection = null;
	private $db_host='127.0.0.1';
	// $db_username='a0226150238';
	// $db_password='92395451';
	// $db_database='a0226150238';
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
			$query="select stockCode from stock order by priority";
			$result=mysql_query($query);//执行查询
			while($result_row=mysql_fetch_row(($result))){
				array_push($stockList, $result_row[0]);
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
			$query="select stockCode from stock order by priority limit 20";
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
	
	// 新增
	public function add() {
		$stockList = array();
		$this->openConnect();
		if($this->connection){
			$query="select stockCode from stock order by priority";
			$result=mysql_query($query);//执行查询
			while($result_row=mysql_fetch_row(($result))){
				array_push($stockList, $result_row[0]);
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
			$query="select stockCode from stock order by priority";
			$result=mysql_query($query);//执行查询
			while($result_row=mysql_fetch_row(($result))){
				array_push($stockList, $result_row[0]);
			}
		}
		$this->closeConnect();
		return $stockList;
	}	
}
?>