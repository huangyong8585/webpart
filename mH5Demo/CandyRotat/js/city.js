var ALL_CITY={"citys":[{"cityname":"\u4e0a\u6d77","cityid":"1","centers":{"center":[{"centername":"\u4e0a\u6d77\u8679\u6865","centerid":"4"},{"centername":"\u4e0a\u6d77\u9ec4\u6d66","centerid":"5"},{"centername":"\u4e0a\u6d77\u5927\u5b81","centerid":"18"},{"centername":"\u4e0a\u6d77\u8054\u6d0b","centerid":"42"},{"centername":"\u4e0a\u6d77\u95f5\u884c","centerid":"1007"},{"centername":"\u4e0a\u6d77\u6768\u6d66","centerid":"1019"}]}},{"cityname":"\u5e7f\u5dde","cityid":"2","centers":{"center":[{"centername":"\u5e7f\u5dde\u65f6\u4ee3","centerid":"9"},{"centername":"\u5e7f\u5dde\u4e07\u535a","centerid":"13"},{"centername":"\u5e7f\u5dde\u5bcc\u90a6","centerid":"121"}]}},{"cityname":"\u5927\u8fde","cityid":"4","centers":{"center":{"centername":"\u5927\u8fde\u5f00\u53d1\u533a\u4e07\u548c\u6c47","centerid":"1029"}}},{"cityname":"\u6e29\u5dde","cityid":"10","centers":{"center":{"centername":"\u4e50\u6e05\u4e16\u8d38","centerid":"106"}}},{"cityname":"\u9752\u5c9b","cityid":"13","centers":{"center":{"centername":"\u9752\u5c9b\u5e02\u5357","centerid":"26"}}},{"cityname":"\u5b81\u6ce2","cityid":"17","centers":{"center":{"centername":"\u5b81\u6ce2\u5929\u4e00","centerid":"31"}}},{"cityname":"\u592a\u539f","cityid":"19","centers":{"center":{"centername":"\u592a\u539f\u8fce\u6cfd","centerid":"33"}}},{"cityname":"\u5357\u4eac","cityid":"21","centers":{"center":[{"centername":"\u5357\u4eac\u6c34\u6e38\u57ce","centerid":"38"},{"centername":"\u5357\u4eac\u516b\u4f70\u4f34","centerid":"94"},{"centername":"\u5357\u4eac\u9f99\u6c5f","centerid":"1042"}]}},{"cityname":"\u53a6\u95e8","cityid":"22","centers":{"center":{"centername":"\u53a6\u95e8\u78d0\u57fa","centerid":"35"}}},{"cityname":"\u957f\u6c99","cityid":"25","centers":{"center":{"centername":"\u957f\u6c99\u8299\u84c9","centerid":"40"}}},{"cityname":"\u6b66\u6c49","cityid":"26","centers":{"center":{"centername":"\u6b66\u6c49\u4f1a\u5c55","centerid":"53"}}},{"cityname":"\u957f\u6625","cityid":"28","centers":{"center":{"centername":"\u957f\u6625\u7ecf\u5f00","centerid":"47"}}},{"cityname":"\u798f\u5dde","cityid":"29","centers":{"center":{"centername":"\u798f\u5dde\u91d1\u878d\u8857","centerid":"1009"}}},{"cityname":"\u5408\u80a5","cityid":"33","centers":{"center":[{"centername":"\u5408\u80a5\u6b22\u4e50\u9882","centerid":"88"},{"centername":"\u5408\u80a5\u5929\u9e45\u6e56","centerid":"1028"}]}},{"cityname":"\u5357\u5b81","cityid":"39","centers":{"center":{"centername":"\u5357\u5b81\u822a\u6d0b","centerid":"97"}}},{"cityname":"\u4e49\u4e4c","cityid":"43","centers":{"center":{"centername":"\u4e49\u4e4c\u7a20\u57ce","centerid":"103"}}},{"cityname":"\u5609\u5174","cityid":"45","centers":{"center":{"centername":"\u5609\u5174\u65ed\u8f89","centerid":"104"}}},{"cityname":"\u91d1\u534e","cityid":"47","centers":{"center":{"centername":"\u91d1\u534e\u798f\u534e","centerid":"107"}}},{"cityname":"\u6d4e\u5b81","cityid":"48","centers":{"center":{"centername":"\u6d4e\u5b81\u8fd0\u6cb3\u57ce","centerid":"108"}}},{"cityname":"\u7ecd\u5174","cityid":"52","centers":{"center":{"centername":"\u7ecd\u5174\u8d8a\u57ce","centerid":"114"}}},{"cityname":"\u7ef5\u9633","cityid":"54","centers":{"center":{"centername":"\u7ef5\u9633\u5357\u6cb3","centerid":"116"}}},{"cityname":"\u4e34\u6c82","cityid":"56","centers":{"center":{"centername":"\u4e34\u6c82\u5170\u5c71","centerid":"119"}}},{"cityname":"\u5f20\u5bb6\u6e2f","cityid":"59","centers":{"center":{"centername":"\u5f20\u5bb6\u6e2f\u51e4\u51f0","centerid":"1004"}}},{"cityname":"\u6ed5\u5dde","cityid":"69","centers":{"center":{"centername":"\u6ed5\u5dde\u4e66\u57ce","centerid":"1025"}}},{"cityname":"\u829c\u6e56","cityid":"70","centers":{"center":{"centername":"\u829c\u6e56\u6ee8\u6c5f","centerid":"1027"}}},{"cityname":"\u5fb7\u9633","cityid":"71","centers":{"center":{"centername":"\u5fb7\u9633\u6587\u5e99","centerid":"1034"}}},{"cityname":"\u79e6\u7687\u5c9b","cityid":"74","centers":{"center":{"centername":"\u79e6\u7687\u5c9b\u6d77\u6e2f","centerid":"1043"}}}]};

//添加城市选项
function addcitylist(){
	var htm="";
	$.each(ALL_CITY.citys,function(key,value){
		htm+="<option value='" + key + "' cityid='"+value.cityid+"'>" + value.cityname + "</option>";
	});
	$("#select_city").html(htm).change(function(){addCityDetailList(this.value);});
	addCityDetailList(0);
	}
	
//添加城市报名点选项
function addCityDetailList(n){
	var tmp_i = 0,html="",dataArray=ALL_CITY.citys[n].centers.center,da,db,isAry=dataArray instanceof Array;
	if(isAry){
		$.each(dataArray, function (key, value) {
			//dataArray = value.split('#'),da = dataArray[0],db = dataArray[1];
			html+="<option value='" + (value.centerid) + "'>" + (value.centername) + "</option>";
			tmp_i++;
		});
	}
	else{
		html+="<option value='" + (dataArray.centerid) + "'>" + (dataArray.centername) + "</option>";
		tmp_i++;
		}
	if (tmp_i == 0) {
		$("#select_center").append("<option value='-1'>无</option>");
	}
	else{
		$("#select_center").html(html);
		}
	}

function C2U(source){
		if(!source){return;}
		var result='';
		for (var i=0; i<source.length; i++){
			//alert(Number(source.value.charCodeAt(i),16));
			//if(source.charCodeAt(i)>255) result += '\\u' + source.charCodeAt(i).toString(16);
			//else result+=source.charAt(i);
			result += '\\u' + source.charCodeAt(i).toString(16);
		}
		console.log("C2U-source:"+source,"C2U-result:"+result);
		return result;
	}

function U2C(source) { 
	 //Unicode -> ASCII
	 var code = source.split("\\u"),result = '';
	 if(code == null){return;}
	 for(var i=1; i<code.length; i++){
		//alert(parseInt(code[i],16));
		result += String.fromCharCode(parseInt(code[i],16));
		}
	 return result;
	}

//获取接口json数据
function loadData(_url,data,fn){
	var url = _url+"?"+data+"&callback="+fn;
	var t=document.createElement("script");
	t.src=url,t.type="text/javascript",t.charset='utf-8',t.async=!0
	document.getElementsByTagName("head")[0].appendChild(t);
	t.onload=function(){document.getElementsByTagName("head")[0].removeChild(t);}
	}

//表单验证
function checkform(){
	var reg = /^1([0-9][0-9])\d{8}$/g,
		phone=$("#phone")[0],
		phone_val=phone.value,
		city=$("#select_city option").not(function(){return !this.selected}).text(),
		center=$("#select_center option").not(function(){return !this.selected}).text(),
		city_U,center_U;
		city_U=$("#select_city option").not(function(){return !this.selected}).attr('cityid');
		center_U=$("#select_center").val();
		console.log(isNaN(phone_val),phone_val.length);
	if(isNaN(phone_val)){showAlertBox("手机号码必须为数字，请正确填写！");phone.focus();}
	else if(phone_val.length == 0) {showAlertBox("手机号码不能为空，请填写！");phone.focus();}
	else if(phone_val.length < 11) {showAlertBox("手机号码不足11位，请正确填写！");phone.focus();}
	else if(!reg.test(phone_val)){showAlertBox("手机号码有误，请正确填写！");phone.focus();}
	else{
		//loadData(_url,data,fn)
		//console.log('http://shqqlx.duapp.com/grab_clock.php?phone=13800138000&city=&center=&score=350&system=ios')
		//console.log(phone_val,city,center,playGame.score,system)
		loadData('halloween.php','phone='+phone_val+'&city='+city_U+'&center='+center_U+'&score='+$("#score").text()+'&system='+phoneSystem+'&useragent='+o,'pagehandle');
		loadData('http://shqqlx.duapp.com/CandyRotat/halloween_self.php','phone='+phone_val+'&city='+city+'&center='+center+'&score='+$("#score").text()+'&system='+phoneSystem+'&useragent='+o,'pagehandle');
		}
	}
//提交手机号的回调函数
function pagehandle(data){
	if(data.code==0){
		showAlertBox(data.msg);
		}
	else if(data.code==1){
		showAlertBox.success=true;
		showAlertBox(data.msg);
		}
	}