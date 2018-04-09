//JSONP
function loadData(_url,data,fn){
	var url = "",t=document.createElement("script");
	//if(fn){url = _url+"?"+data+"&callback="+fn;}
	//else{url = _url+"?"+data;}
	url = _url+"?"+data;	
	t.src=url,t.type="text/javascript",t.async=!0//,n.parentNode.insertBefore(t,n)
	document.getElementsByTagName("head")[0].appendChild(t);
	t.onload=function(){document.getElementsByTagName("head")[0].removeChild(t);if(!!fn){fn();}}
	}

//ajax
function ajax(method,url,para,callback){
		var xmlhttp=new XMLHttpRequest(),_url,_para;
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4&&xmlhttp.status==200){
				callback(xmlhttp.responseText.length>0?eval("(" +  xmlhttp.responseText + ")"):'');
				}
			};
		if(method=="GET"){
			_url=url+"?"+para;
			_para=null;
			}
		else if(method=="POST"){
			_url=url;
			_para=para;
			}
		xmlhttp.open(method,_url,true);
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xmlhttp.send(_para);
		}
//ajax("GET","Handler/getCheckInfo.ashx","url="+window.location.href,wxConfigStatrt);

//获取参数的hdindex
function getURLPara(str){
	var ary=[],obj={},wls=window.location.search,temp='',i=0;
	if(wls!==""){
		if(wls.indexOf("&")!=-1){ary=wls.substring(1).split("&");}
		else{ary[0]=wls.substring(1)}
		i=ary.length;
		for(;i--;){console.log(i);
			temp=ary[i].split("=");
			obj[temp[0]]=temp[1];
			}
		}
	if(str){return obj[str];}
	else{return obj;}
}

//模拟alert
function alertpop(t,fn,fn2){
	var popobj=document.getElementById("alertpop");
	popobj.parentNode.style.display="block";
	popobj.style.display="block";
	popobj.children[0].innerHTML=t;
	popobj.style.marginTop=(0-popobj.offsetHeight/2)+"px";
	popobj.children[1].onclick=popobj.children[2].onclick=function(){
		popobj.parentNode.style.display="none";
		popobj.style.display="none";
		popobj.children[0].innerHTML='';
		}
	if(!!fn&&(typeof fn == 'function')&&!fn2){popobj.children[1].onclick=popobj.children[2].onclick=function(){
		fn();popobj.parentNode.style.display="none";popobj.style.display="none";popobj.children[0].innerHTML='';}
		}
	else if(!!fn&&(typeof fn == 'function')&&!!fn2&&(typeof fn2 == 'function')){
		popobj.children[1].onclick=function(){
			fn();popobj.parentNode.style.display="none";popobj.style.display="none";popobj.children[0].innerHTML='';
			}
		popobj.children[2].onclick=function(){
			fn2();popobj.parentNode.style.display="none";popobj.style.display="none";popobj.children[0].innerHTML='';
			}
		}
	}


function initalertpop(doc){
	var div=doc.createElement('div');
	div.className="alertpopbox";
	div.innerHTML='<div class="pop" id="alertpop"><p></p><a href="javascript:;" class="closepop">确定</a><a href="javascript:;" class="closepop">取消</a></div>';
	doc.getElementsByTagName("body")[0].appendChild(div);
	}
initalertpop(document);

//微信分享
function wxConfigStatrt(data){console.log(data);
	if(data.Tsuccess==0){
		if(wxConfigStatrt.count>=10){alert("服务器发生未知异常，请稍后重试");}
		else{
			ajax("GET","../inc/GetCheckInfo.php","url="+encodeURIComponent(window.location.href),wxConfigStatrt);
			wxConfigStatrt.count++;
		}
		return false;
		}
	wx.config({
		debug: false,
		appId: 'wx96a7770c738bf0f5',
		timestamp: data.timestamp,
		nonceStr: data.nonceStr,
		signature: data.signature,
		jsApiList: [
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage'
		  ]
	});
	wx.ready(function(){
		wx.onMenuShareTimeline({
			title:wxShareConfig.title, // 分享标题
			link:wxShareConfig.link, // 分享链接
			imgUrl: wxShareConfig.imgUrl, // 分享图标
			success: function () {shareJiFen();},
			cancel: function () {}
		});
	
		wx.onMenuShareAppMessage({
			title:wxShareConfig.title, // 分享标题
			desc: wxShareConfig.desc, // 分享描述
			link: wxShareConfig.link, // 分享链接
			imgUrl: wxShareConfig.imgUrl, // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () {shareJiFen();},
			cancel: function () {}
		});
	});
}
wxConfigStatrt.count=0;//ajax

var wxShareConfig={
					"title":'',
					"desc":'',
					"imgUrl":'',
					"link":''
					}
