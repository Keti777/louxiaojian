/*===
t: current time����ǰʱ�䣩��
b: beginning value����ʼֵ����
c: change in value���仯��������λ����
d: duration������ʱ�䣩��
ps��Elastic��Back��������ѡ���������涼��˵����
=====*/
var Tween = {
	Quad: {
		easeIn: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		}
	}
} 
function $(o){return typeof(o)=='string' ? document.getElementById(o) : o}

/*===��Ӣ�ĵ��ʵ�һ����ĸתΪ��д��ĸ*/
 function replaceReg(str){ 
  reg = /\b(\w)|\s(\w)/g;
  str = str.toLowerCase(); 
  return str.replace(reg,function(m){return m.toUpperCase()}) 
 }  
/*===��Ӣ�ĵ��ʵ�һ����ĸתΪ��д��ĸ*/


function uncamelize(s, sep) {
	sep = sep || '-';
	return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
		return p1 + sep + p2.toLowerCase();
	});
};
function camelize(s) {
	return s.replace(/-(\w)/g, function (strMatch, p1){
		return p1.toUpperCase();
	});
}
function addEvent( node, type, listener ) {
	if(!(node = $(node))) return false;
    if (node.addEventListener) {
        node.addEventListener( type, listener, false );
        return true;
    } else if(node.attachEvent) {
        node['e'+type+listener] = listener;
        node[type+listener] = function(){node['e'+type+listener]( window.event );}
        node.attachEvent( 'on'+type, node[type+listener] );
        return true;
    }
    return false;
};
function setStyle(element, styles) {
	// Retrieve an object reference
	if(!(element = $(element))) return false;
	// Loop through  the styles object an apply each property
	for (property in styles) {
		if(!styles.hasOwnProperty(property)) continue;
		if(element.style.setProperty) {
			//DOM2 Style method
			element.style.setProperty(
			uncamelize(property,'-'),styles[property],null);
		} else {
			//Alternative method
			element.style[camelize(property)] = styles[property];
		}
	}
	return true;
};

function TScroll(s){
        var self = this;
        if (!(self instanceof TScroll)){
            return new TScroll(s);
        }
	    this.init(s);
}
TScroll.prototype={
		/*��ʼ������*/
		init:function(s){
		   var width;
		   this.content=$(s.content);
		   this.c=s.c || 180;
		   this.d=s.d || 200;
		   this.interval=s.interval || 1000;
		   this.tagName=s.tagName || 'li';
		   this.oPrevious=$(s.previous) || null;
		   this.oNext=$(s.next) || null;
		   this.direction=s.direction || 'left';
		   this.auto=s.auto;//�Ƿ��Զ�����
		   this.cycle=s.cycle;//�Ƿ�ѭ������
		   this.related={'previous':1,'next':-1,'left':'width','top':'height'}
		   getBx=this.getBx();
		   this.maxScroll=getBx-this.content.parentNode['offset'+replaceReg(this.related[this.direction])]; //�ܹ�������·��
		   this.content.style[this.related[this.direction]]=getBx+'px';
		   this.judgePageStyle();
           this.bindingEvents();
		   this.IntermittentScroll();
		},
		/*��ȡ�������ݵĿ��*/
		getBx:function(a){
			var subTags=this.content.getElementsByTagName(this.tagName),w=0;
			if(a){//���ڵȿ�ģ�����ֱ�����ÿ��
				w=subTags.length*a
			}else{//�Զ���ȡ���
			  for(var i=0,j=subTags.length;i<j;i++){
					w+=subTags[i]['client'+replaceReg(this.related[this.direction])] > subTags[i]['offset'+replaceReg(this.related[this.direction])] ? subTags[i]['client'+replaceReg(this.related[this.direction])] : subTags[i]['offset'+replaceReg(this.related[this.direction])];
			  }
			}
			return w;
		},
		/*��һҳ����һҳ����ʽ*/
		judgePageStyle:function(){
		   var l=this.content.style[this.direction];
		   parseInt(l)==0 || !l ? setStyle(this.oPrevious,{color:'#ccc',cursor:'text'}) : setStyle(this.oPrevious,{color:'#000',cursor:'pointer'})
		   Math.abs(parseInt(l))===this.maxScroll ? setStyle(this.oNext,{color:'#ccc',cursor:'text'}) : setStyle(this.oNext,{color:'#000',cursor:'pointer'});
		},
		bindingEvents:function(){
		   var self=this;
		   if(!this.oPrevious || !this.oNext) return false
		   //@����һ����ô����click��mousedownʱ�䴥������
		   addEvent(this.oPrevious,'mousedown',function(){
						self.goScroll('previous')
						self.mdm=setTimeout(function(){self.DS=true;self.goScrollDown('previous')},200)
					})
		   addEvent(this.oPrevious,'mouseup',function(){
						//@�ж��Ƿ�ִ�й�self.goScrollDown����
						if(self.DS){
							self.DownStop=true;
							self.DS=false
						}
						//@�ж��Ƿ�ִ�й�self.goScrollDown����
						if(self.mdm){clearTimeout(self.mdm);self.mdm=null}
						if(self.mdTime){clearInterval(self.mdTime);self.mdTime=null}
					})
		   
		   addEvent(this.oNext,'mousedown',function(){
					 self.goScroll('next')
					 self.mdm=setTimeout(function(){self.DS=true;self.goScrollDown('next')},200)
					})
		   addEvent(this.oNext,'mouseup',function(){
						
						//@�ж��Ƿ�ִ�й�self.goScrollDown����
						if(self.DS){
							self.DownStop=true;
							self.DS=false
						}
						//@�ж��Ƿ�ִ�й�self.goScrollDown����
						
						if(self.mdm){clearTimeout(self.mdm);self.mdm=null}
						if(self.mdTime){clearInterval(self.mdTime);self.mdTime=null}
					})
		},
		/*��������*/
		goto:function(c,d,callback){
		  if(this.timeid){clearTimeout(this.timeid);this.timeid=null};
		  var b=parseInt(this.content.style[this.direction]) || 0,abs_b=Math.abs(b),t=0,self=this,tm,beginTime;
		  
		  //���Զ�ѭ������
		  if(c<0){
				if((this.maxScroll-abs_b)<Math.abs(c)){c=abs_b-this.maxScroll}//�����ƶ�·��
				if(abs_b===this.maxScroll){
					this.stopScroll();return false
				}
		  }else{
				if(abs_b<c && abs_b!==this.maxScroll){c=abs_b}//�����ƶ�·��
				if(abs_b==0){this.stopScroll();return true}
		  }
		  //���Զ�ѭ������
		  tm=c>0 ? 'ceil' : 'floor';
		  beginTime=new Date().getTime();
		  new function(){
			  var curTime=new Date().getTime();
			  if((t=curTime-beginTime)<d){
				  self.content.style[self.direction] = Math[tm](Tween.Quad.easeIn(t,b,c,d)) + "px";
				  self.judgePageStyle();
				  self.timeid=setTimeout(arguments.callee, 10);
			  }else{
				  self.content.style[self.direction]=b+c+'px';
				  callback && callback()
			      t=d;
			  }
		  };
		  
		},
		goScroll:function(n){
		   this.stopScroll();
		   this.goto(this.c*this.related[n],this.d);
		},
		goScrollDown:function(n){
		   this.stopScroll();
		   var d=100,self=this;
		   if(this.mdTime){clearInterval(this.mdTime);this.mdTime=null}
		   this.mdTime=setInterval(function(){
							self.goto(
									  self.c*self.related[n],
									  d,
									  function(){
										if(self.DownStop){clearInterval(self.mdTime);self.DownStop=false;return false} 								
									  }
							);
					   },20)
		},
		/*�Զ����ٵع���*/
		autoScroll:function(){
		   var self=this;
		   this.stopScroll();
		   var c=-2,t=d=1;
		   this.autoTime=setInterval(function(){
										 self.goto(-self.c,self.d)
									 },
									 this.interval)
		},
		stopScroll:function(){
			if(this.autoTime){clearTimeout(this.autoTime);this.autoTime=null}
		},
		IntermittentScroll:function(){
		   if(!this.auto) return false;
		   var self=this;
		   this.stopScroll();
		   this.autoTime=setInterval(function(){
										 self.goto(-self.c,self.d)
									 },
									 this.interval)
		}
}