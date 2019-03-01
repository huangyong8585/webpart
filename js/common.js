//JSONP
function loadData(_url,data,fn){
	var nosamename=function(){
		var tempname='jsonp',O=true,i=1;
		while(O){
			if(!window[tempname+i]){window[tempname+i]=1;O=false;}
			else{i++;}
		}return tempname+i;
	}
	var url = "",t=document.createElement("script"),fnName='';
	if(!!fn&&(typeof fn == 'function')){
		fnName=nosamename();window[fnName]=fn;
		url = _url+"?"+data+"&callback="+fnName;
	}
	else if(fn){url = _url+"?"+data+"&callback="+fn;}
	else{url = _url+"?"+data;}
	//n=document.getElementsByTagName("script")[0];
	//document.getElementsByTagName("head")[0].appendChild(t);
	t.src=url,t.type="text/javascript",t.async=!0,t.charset="UTF-8"//,n.parentNode.insertBefore(t,n)
	document.getElementsByTagName("head")[0].appendChild(t);
	t.onload=function(){document.getElementsByTagName("head")[0].removeChild(t);}
	}

//ajax
function ajax(method,url,para,callback){
		var xmlhttp=new XMLHttpRequest(),_url,_para;
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4&&xmlhttp.status==200){
				callback(eval("(" +  xmlhttp.responseText + ")"));
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
		for(;i--;){
            if(ary[i].indexOf('=')>-1){
                temp=ary[i].split("=");
                obj[temp[0]]=decodeURIComponent(temp[1].replace(/\+/g,"%20"));
            }
        }
	}
	if(str){return obj[str];}
	else{return obj;}
}

(function (doc, win) {
	var docEl = doc.documentElement,
		docBody = doc.getElementsByTagName("body")[0],
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function () {
				var clientWidth = (docEl.clientWidth||win.innerWidth);
				if (!clientWidth) return;
				docBody.style.fontSize = 12 * (clientWidth / 320) + 'px';	//body的fontsize em单位
				if(clientWidth >= 750){docEl.style.fontSize = '100px';} 	//html的fontsize rem单位
				else{docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';}
			};
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//模拟alert
function alertpop(t){
		var popobj=document.getElementById("alertpop");
		popobj.parentNode.style.display="block";
		popobj.style.display="block";
		popobj.children[0].innerHTML=t;
		popobj.style.marginTop=(0-popobj.offsetHeight/2)+"px";
		popobj.children[1].onclick=function(){
			popobj.parentNode.style.display="none";
			popobj.style.display="none";
			popobj.children[0].innerHTML='';
			}
		}
	
//模拟confirm
function confirmpop(t,fn,fn2){
	var popobj=document.getElementById("confirmpop");
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

//打开分享指引
function showShareImg(t){
	var box=document.getElementById("sharetip");
	if(t){
		box.children[2].innerHTML=t;
		box.style.top=0;
		box.style.webkitTransform='translateY(0)';
		box.style.transform='translateY(0)';
		box.children[0].onclick=function(){
			box.style.top="150%";
			box.style.webkitTransform='translateY(350%)';
			box.style.transform='translateY(350%)';
			}
		}
	else{
		box.children[2].innerHTML="";
		box.style.top="150%";
		box.style.webkitTransform='translateY(350%)';
		box.style.transform='translateY(350%)';
		}
	}

function initalertpop(doc){
	var div=doc.createElement('div'),css=doc.createElement('style');
	css.innerHTML="\
	.alertpopbox{display:none;position:fixed;width:100%;height:100%;left:0;top:0;background-color:rgba(0,0,0,0.6);z-index:20;}\
	.alertpopbox .pop{display:none;position:absolute;width:68%;left:16%;top:50%;background-color:#fff;border-radius:.5em;}\
	.alertpopbox .pop p{font-size:1em;line-height:1.5;padding:10% 5%;word-break:break-all;border-bottom:1px solid #d4d4d4;}\
	.alertpopbox .pop a{display:block;text-align:center;width:100%;font-size:1em;box-sizing:border-box;height:3em;line-height:3em;}";
	doc.getElementsByTagName("head")[0].appendChild(css);
	div.className="alertpopbox";
	div.innerHTML='<div class="pop" id="alertpop"><p></p><a href="javascript:;" class="closepop">确定</a></div>';
	doc.getElementsByTagName("body")[0].appendChild(div);
	}
initalertpop(document);

function initconfirmpop(doc){
	var div=doc.createElement('div'),css=doc.createElement('style');
	css.innerHTML="\
	.confirmpopbox{display:none;position:fixed;width:100%;height:100%;left:0;top:0;background-color:rgba(0,0,0,0.6);z-index:20;}\
	.confirmpopbox .pop{display:none;position:absolute;width:68%;left:16%;top:50%;background-color:#fff;border-radius:.5em;}\
	.confirmpopbox .pop p{font-size:1em;line-height:1.5;padding:10% 5%;word-break:break-all;border-bottom:1px solid #d4d4d4;color:#303030;}\
	.confirmpopbox .pop a{display:inline-block;text-align:center;width:50%;font-size:1em;box-sizing:border-box;height:3em;line-height:3em;color:#303030;}\
	.confirmpopbox .pop a:last-child{border-left:1px solid #d4d4d4;}";
	doc.getElementsByTagName("head")[0].appendChild(css);
	div.className="confirmpopbox";
	div.innerHTML='<div class="pop" id="confirmpop"><p></p><a href="javascript:;" class="closepop">确定</a><a href="javascript:;" class="closepop">取消</a></div>';
	doc.getElementsByTagName("body")[0].appendChild(div);
	}
initconfirmpop(document);

function initSharepop(doc){
	var div=doc.createElement('div'),css=doc.createElement('style');
	css.innerHTML="\
	.sharetip{position:fixed;width:100%;height:100%;overflow:hidden;left:0;top:150%;background-color:rgba(0,0,0,0.6);z-index:50;-webkit-transform:translateY(350%);-moz-transform:translateY(350%);transform:translateY(350%);\
	-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;transition:all .5s ease-in-out; text-align:right;}\
	.sharetip img{width:20%;margin-right:3%;}\
	.sharetip .tips{width:90%;display:block;text-align:center;margin:.25em auto 0;padding:.25em .5em;line-height:1.8;border:1px solid rgba(255,255,255,0.85);color:rgba(255,255,255,0.85);font-size:1.2em;}\
	.sharetip .closeSharetip{width:6em;height:6em;border-radius:6em;position:absolute;right:-1.2em;bottom:-1.2em; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfAgMAAABiwP6qAAAACVBMVEUAAAAVCgIkGRJnPJyuAAAAAXRSTlMAQObYZgAAAFpJREFUGNNFkEEOACEIAyHhsEeexNP26WLTjGooChRqTGhVtHChhBvIC7KjFEVtvuv8DqcLXNo6qjB97jZr2em2UyMwCy/kUAUPzPSiO/P4Nsz8VKALpWjnNw4evAWS9iAWqwAAAABJRU5ErkJggg==) 45% 45% no-repeat rgba(255,255,255,0.5);background-size:2em 2em;}"
	doc.getElementsByTagName("head")[0].appendChild(css);
	div.className="sharetip";
	div.id="sharetip";
	div.innerHTML='<div class="closeSharetip"></div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABlCAMAAAD+r9R1AAAAOVBMVEUAAAD19fXs7Ozi4uLv7+/v7+/l5eXp6enq6urw8PD19fXv7+/u7u76+vr6+vr////39/j7+/v///9S6T+3AAAAEHRSTlMA/g4FM18dSY7plrzUInhmWux2jAAAAzpJREFUaN7NlYF2qyAMQCegqAhV//9jX1LAFCpWop7zbqLQbd5kpOv+2Dj99wh6Xe3fA9h1XRtxv1c0K2DuF5v1jbvb69aAvntwkaW709stqw8QN/I+r2zWAKrH+8QjKhdI8MLyusv7WgA0Rr26x6vA5mPbiDu8AnzIp3mQNwxuWHYYbxhcdGG/RHvV25I0RV0dXIlVXBxcEXNFbJYDHN/rlkM016uXH1ie18KjM6Zf4SL8i0bw/hdFw7ytFP6VYQ9uzoxUy7tfjMHN89uFt3jHwMQ9LpwBat9hkONFdWgBujpv16AoCMlPt63QIOs+0ubPRjcRuWkda8RjdOVW2hPtee9rrkKd9aq5jkac/cuYKxnkycFVM54fXIPZxA2uMWnB8HlmgC09Q57EQkWp9O8BqreCoklf51uqJ34PLjMVIq9ojsUGvTvM/k47zBR35JU2xaGA+ovq2ZtsSt1nURlskU/ROl8UD091PBW1/2vHTw1PPCVWT4nbI3F7QeyeEpsBBAPEzWIxREAf7bi/KlZDBihJr/li9+X1/eJ1SWymoUADqdheO20MEJDkBfjidtpjiHRs8TiVGPAS7JMwbya8Jsgc/kkYYkJ/sIfFcL1yNAZyjwmj54rVGDEYXzj2SYwZmb5lekUqzdvni3UfGPtdu1HM0bk+ZYRMaljm6EiZ2OlXEMzR9a73iVfux+R5O/dBj5nrW2bD4Hv1r3AjSK95DbdvHASofQW0BtDOm51uU3qsgEm/heR4bbsP9u88rCMWuTDvHlAcsYLHdXuM4ExOAy1cuPj4rsM5CJ3TxiAYJyGVLkJywfIqpTFK4Mkw3mkqIa8Rjr/je3NSvaz1diQ6siuG1+axpxfVXmtBlfh2/XVa2VmkgwhLp7p3pdxf17DoMixeIZT1Su9me0slQveC6S2WiKdUc7xCdOKLDuNbX9Fw8KRRLFDTLomIrxJBL063W0JmJXADebpduXmkl8n4KiXKT2k3B3nQTu68wMmD2DqjAgDJ/Saxy3PtyngIRLRDUgna/LYGZ5HkW9sk5W8tPX+M2JbfXv9zdKSA3A/IbefXhFPvDwhM3FKERPxXCl4+0Uklcf8Ee95/7nB2fneLSRgAAAAASUVORK5CYII=" /><span class="tips"></span>';
	doc.getElementsByTagName("body")[0].appendChild(div);
	}
initSharepop(document);


	