/*=======Author:louxiaojian=========*/
/*===========Version:4.0===========*/
/*===E-mail:louxiaojian@gmail.com===*/
/*===================================

date:2010-05-25  
1.�����л�ǰ���л�����¼��ӿ�
2.������������ִ��һ��this.action(this.de)����ʾĬ�ϵ����ڵ�λ��
3.���ӵ�ֻ�в˵�ʱ������Ҳ����ִ��(�磺����10)2010-06-22
4.�л���������ɺ�����������2010-06-22

===================================*/
function Rotation(set){
	   this.set(set);
	   this.aNtag=this.s.nTag;//��������
	   this.aMtag=this.s.mTag;//��������
	   this.aText=this.s.text;//��������
	   this.dis=Math.abs(this.s.slider.dis);
	   this.sbj=this.s.slider.obj;
	   //if(this.sbj) this.sbj.key=1;
	   this.dir=this.s.slider.dir || this.s.dir;
	   this.Tween=this.s.slider.Tween || this.s.Tween;
	   this.de=this.s.index;
	   this.start=this.B(this,this.s.start);
	   this.callBack=this.B(this,this.s.callBack);
	   this.key=true;//�Ƿ�����л�
	   this.eType=['click','mouseover'];
	   this.run();
}
Rotation.prototype={
		B:function(object, fun) {
		  var args = Array.prototype.slice.call(arguments).slice(2);
		  return function() {
			  return fun.apply(object, args);
		  }
		 },
		G:function(o){return document.getElementById(o)},
		E:function(destination, source) {
		  for (var property in source) {
			destination[property] = source[property];
		  }
		},
		pre:function(evt){
			if (evt.preventDefault) {
				evt.preventDefault();
			}
			else {
				evt.returnValue = false;
			}
		}, 
		aE:function(oTarget, sEventType, fnHandler) {
		  if (oTarget.addEventListener) {
			  oTarget.addEventListener(sEventType, fnHandler, false);
		  } else if (oTarget.attachEvent) {
			  oTarget.attachEvent("on" + sEventType, fnHandler);
		  } else {
			  oTarget["on" + sEventType] = fnHandler;
		  }
		},
		set:function(s){
		  this.s={
			  evt:0,
			  index:0,
			  auto:[0,2000],
			  cur:"cur",
			  intTabTime:50,
			  interval:50,
			  nTag:[],
			  mTag:[],
			  text:[],//��������
			  slider:{obj:null,dis:0},
			  dir:'top',
			  Tween:function(t,b,c,d){return -c * ((t=t/d-1)*t*t*t - 1) + b},
			  start:function(){},
			  callBack:function(){}
			}
			this.E(this.s,s||{})
		},
		action:function(n){
			    this.start();
				if(!this.key) return false;
				this.TabLi(n);
				this.TabText(n);
                this.dis ? this.slider(n) : this.TabChange(n);
				this.callBack();
		},
		autoplay:function(m){
			  if(m){this.de = (this.de<this.aMtag.length-1) ? this.de+1 :0;}
			  else{this.de = (this.de!=0) ? this.de-1 :this.aMtag.length-1;}
			  this.action(this.de);
		},
		autoFun:function(){this.clearAuto();this.intAuto=setInterval(this.B(this,this.autoplay,1),this.s.auto[1])},
		clearAuto:function(){if(this.intAuto){clearInterval(this.intAuto)}},
		TabLi:function(n){
		   if(this.aNtag!=''){
			   var a=this.aNtag[n],c='className',s=this.s.cur;
			   if(this.lLi){
				 this.lLi[c]=this.lLi[c].replace(s,"");
				 this.lLi.key=0;
			   }
			   if(a[c].indexOf(s)==-1){a[c]+=" "+s;a.key=1}
			   this.lLi=a;
		   };
		},
		TabText:function(n){
			if(this.aText!=''){
			   this.lText && (this.lText.style.display="none");
			   this.aText[n].style.display="block";
			   this.lText=this.aText[n];
			 };
		},
		TabChange:function(n){
			 if(this.aMtag!=''){
			   var m=this.aMtag[n];
			   if(this.lDiv&&this.lDiv!=m){this.lDiv.style.display="none"}
			   m.style.display="block";
			   this.lDiv=m;
			 }
		},
		slider:function(n){
			var sb=this.sbj,
			dr=this.dir,/*��������*/
			ds=this.dis;/*��������*/
			if(ds && !this.sliderInit){
				sb.style.position='absolute';
				sb.style[dr]=-this.de*this.dis+"px";
				this.sliderInit=true;
			}/*������غ���ִ��һ�Σ��Ժ󶼲�ִ��*/
			var t=0,b=parseInt(this.sbj.style[dr]),c=-n*ds-b,d=this.s.interval;
			this.Move=function(){
				if(!c){return false}
				if(this.moveTime){clearTimeout(this.moveTime)}
				sb.style[dr]=Math.round(this.Tween(t,b,c,d))+"px";
				if(t<d){t++;this.moveTime=setTimeout(this.B(this,this.Move),10)}
			};
			this.Move();
		},
		clearintTab:function(){if(this.intTab){clearTimeout(this.intTab)}},
		aNtagAct:function(o){
			if(this.lLi==o){return false}
			this.clearintTab();
			this.clearAuto();
			this.intTab=setTimeout(this.B(this,function(){
							this.de=o.cNub;
							this.action(o.cNub);
						  }),this.s.intTabTime);
			return this;
		},
		run:function(){
			  if(this.aNtag!=''){		  
				  for(var n=0,len=this.aNtag.length;n<len;n++){
						var tg=this.aNtag[n],aTag=tg.getElementsByTagName("a")[0] || tg.tagName.toLocaleLowerCase()=="a" && tg;
						if(!tg.cNub) tg.cNub=n;
						/*ȥ�����ӵ����߿��Ĭ����Ϊ*/
						if(aTag){
							this.aE(aTag,"focus",this.B(this,function(p){p.blur()},aTag));
							if(this.s.evt==0){this.aE(aTag,'click',this.pre)}
						}
					   /*���¼�*/
					   this.aE(tg,this.eType[this.s.evt],this.B(this,function(o){this.aNtagAct(o)},tg))
					   
					   if(this.s.auto[0]==1){
						   this.aE(tg,'mouseover',this.B(this,function(o){if(!o.key) return;this.clearAuto()},tg));
						   this.aE(tg,"mouseout",this.B(this,function(o){if(!o.key) return;this.autoFun();this.clearintTab()},tg));
					   }else{
						   this.aE(tg,"mouseout",this.B(this,this.clearintTab));
					   }
					   
					   
					 }
				}; 
			   this.action(this.de);//Ĭ����ʾ�ڼ���
			   /*==�Զ�����==*/
			   if(this.s.auto[0]==1){
				   this.autoFun()
				   var mg=this.aMtag;
				   if(mg!=''){
					 for(var m=0,men=mg.length;m<men;m++){
					   this.aE(mg[m],'mouseover',this.B(this,this.clearAuto));
					   this.aE(mg[m],"mouseout",this.B(this,this.autoFun));
					 }
				   }
				   
			  }
			   /*==�Զ�����==*/ 
				
		}
 
}
