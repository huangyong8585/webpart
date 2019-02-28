<?php
/*if(isset($_GET["callback"])){
	if($_GET["callback"]!=''){
		$callback=$_GET["callback"];
	}
	else{
		$callback='pagehandle';
		}
}
else{
	$callback='pagehandle';
	}*/

if(!$_GET['phone']){
	die('pagehandle({code:0,msg:"手机号不能为空！"})');
}
$phone=safe_replace($_GET['phone']);//手机
$city=safe_replace($_GET['city']);//城市
$center=safe_replace($_GET['center']);//中心
$score=safe_replace($_GET['score']);//分数
$system=safe_replace($_GET['system']);//系统
$useragent=safe_replace($_GET['useragent']);//用户代理

if(strlen($phone)!=11){
  die('pagehandle({code:0,msg:"请检查输入的手机号！"})');
}
if($score>200){
  die('pagehandle({code:0,msg:"靠，接口有那么好玩吗"})');
}

 //echo(mb_strlen($city,'UTF8')."||".mb_strlen(trim($username),'UTF8')."||".strlen($yzm));
function safe_replace($string) {//防止SQL注入
	if(!!mysql_real_escape_string($string)){
		$string = mysql_real_escape_string($string);
		}
  //$string = mysql_real_escape_string($string);
	$string = str_replace('%20','',$string);
	$string = str_replace('%27','',$string);
	$string = str_replace('%2527','',$string);
	$string = str_replace('*','',$string);
	$string = str_replace('"','"',$string);
	$string = str_replace("'",'',$string);
	$string = str_replace('"','',$string);
	$string = str_replace(';','',$string);
	$string = str_replace('<','<',$string);
	$string = str_replace('>','>',$string);
	$string = str_replace("{",'',$string);
	$string = str_replace('}','',$string);
	$string = str_replace('\\','',$string);
	$string = str_replace('\0','',$string);
	return $string;
}

/*替换为你自己的数据库名*/
$dbname = 'weixin';
/*填入数据库连接信息*/
$host = 'weixin.ftkseries.com';
//$port = 4050;
$user = 'weixinuser';//用户名(api key)
$pwd = '9Fjkie8w$iq5';//密码(secret key)
 /*以上信息都可以在数据库详情页查找到
 
/*接着调用mysql_connect()连接服务器*/
//$link = @mysql_connect("{$host}:{$port}",$user,$pwd,true);
$link = @mysql_connect("{$host}",$user,$pwd,true);
if(!$link) {
    die("连接服务器失败: " . mysql_error());
}
/*连接成功后立即调用mysql_select_db()选中需要连接的数据库*/
if(!mysql_select_db($dbname,$link)) {
    die("选择数据库失败: " . mysql_error($link));
}

$sql="select phone,city,center,score,system,useragent from Act_Halloween where phone='".$phone."'";
$query=mysql_query($sql);
$result_data=mysql_fetch_array($query);
$num_result=mysql_num_rows($query);//检查取回数据行数,该结果集从 mysql_query() 的调用中得到；
//echo $num_result.'<br />';
//echo rand(0,50000).'<br />';//生成1-50000的任意随机数;
if($num_result==1){
		$update_sql="update Act_Halloween set score='".$score."',city='".$city."',center='".$center."' where phone='".$phone."'";
		mysql_query($update_sql);
	}
else if($num_result==0){
		$insert_sql="insert into Act_Halloween(phone,city,center,score,system,useragent) values('".$phone."','".$city."','".$center."','".$score."','".$system."','".$useragent."')" ;
		mysql_query($insert_sql);
	}
//echo('pagehandle({code:1,msg:"提交成功"})');
//echo $result_data['id'].'|'.$result_data['qq'].'|'.$result_data['phone'].'|'.$result_data['date'];
/*至此连接已完全建立，就可对当前数据库进行相应的操作了*/
/*！！！注意，无法再通过本次连接调用mysql_select_db来切换到其它数据库了！！！*/
/* 需要再连接其它数据库，请再使用mysql_connect+mysql_select_db启动另一个连接*/
 
/**
 * 接下来就可以使用其它标准php mysql函数操作进行数据库操作
 */
 
/*显式关闭连接，非必须*/
mysql_close($link);
?>