function $(a){return"string"==typeof a?document.getElementById(a):a}domReady=!+"\v1"?function(a){(function(){try{document.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,0);return}a()})()}:function(a){document.addEventListener("DOMContentLoaded",a,false)};function cssValue(d,b){var c;function a(e){return e.replace(/-(\w)/g,function(f,g){return g.toUpperCase()})}if(!+"\v1"){if(b.indexOf("-")!=-1){b=a(b)}c=d.currentStyle[b]}else{c=document.defaultView.getComputedStyle(d,null).getPropertyValue(b)}return c}function SliderLayer(a){this.SetOptions(a);if(!this.options.handle||!this.options.handleBx||this.options.handle.length!=this.options.handleBx.length){return false}this.handle=this.options.handle;this.handleBx=this.options.handleBx;this.y=this.interval=this.options.interval;this.delay=this.options.delay;this.Tween=this.options.Tween;this.evt=this.options.evt;this.cl=this.options.cl;this.cs=this.options.cs;this.index=this.options.index;this.key=true;this.start=this.options.start;this.end=this.options.end;this.run()}SliderLayer.prototype={$:function(a){return typeof(a)=="string"?document.getElementById(a):a},on:function(b,a,c){if(!(b=this.$(b))){return false}if(b.addEventListener){b.addEventListener(a,c,false);return true}else{if(b.attachEvent){b["e"+a+c]=c;b[a+c]=function(){b["e"+a+c](window.event)};b.attachEvent("on"+a,b[a+c]);return true}}return false},B:function(c,a){var b=Array.prototype.slice.call(arguments).slice(2);return function(){return a.apply(c,b)}},E:function(a,c){for(var b in c){a[b]=c[b]}},uncamelize:function(b,a){a=a||"-";return b.replace(/([a-z])([A-Z])/g,function(c,e,d){return e+a+d.toLowerCase()})},camelize:function(a){return a.replace(/-(\w)/g,function(b,c){return c.toUpperCase()})},setStyle:function(a,b){if(!(a=this.$(a))){return false}for(property in b){if(!b.hasOwnProperty(property)){continue}if(a.style.setProperty){a.style.setProperty(this.uncamelize(property,"-"),b[property],null)}else{a.style[this.camelize(property)]=b[property]}}return true},getEle:function(d){var c=this.$(d),a=c.offsetWidth,b=c.offsetHeight;if(a==0||b==0){this.setStyle(c,{position:"absolute",display:"block",visibility:"hidden"});a=c.offsetWidth;b=c.offsetHeight;this.setStyle(c,{position:"static",display:"none",visibility:"visible"})}return{w:a,h:b}},SetOptions:function(a){this.options={handle:[],handleBx:[],evt:"click",eKey:0,interval:40,delay:10,cl:0,cs:1,index:"",dis:["height"],Tween:function(f,e,h,g){return h*(f/=g)*f+e},start:function(){},end:function(){}};this.E(this.options,a||{})},slider:function(i,l,e){var a=0,j=this.getEle(l).h,h=this.interval,f=0;if(!l.style.overflow){l.style.overflow="hidden"}if(i.timer){clearTimeout(i.timer)}this.y=0;function g(){this.setStyle(l,{height:(i.mKey?(Math.ceil(this.Tween(f,a,j,h))+"px"):(j-Math.ceil(this.Tween(f,a,j,h))+"px"))});if(f<h){f++;i.timer=setTimeout(this.B(this,g),10)}else{this.y=f;if(!i.mKey){this.setStyle(l,{display:"none"})}this.setStyle(l,{height:"auto"});f=0;i.mKey=i.mKey?0:1;this.end();if(this.lm!=l&&this.ln!=i&&!e){this.lm=l;this.ln=i}}}g.call(this)},act:function(a){if(!this.cs&&this.ln==a){return false}if(this.y!=this.interval){return false}var c=this.index=a.nub,b=this.handleBx[c];if(this.sTime){clearTimeout(this.sTime)}this.sTime=setTimeout(this.B(this,function(){a.mKey=(cssValue(b,"display")=="none"||b.offsetHeight==0)?1:0;if(cssValue(b,"display")=="none"||cssValue(b,"visibility")=="hidden"){b.style.display="block";b.style.visibility="visible"}this.start();if(!this.key){return false}if(this.cl){if(!this.lm&&!this.ln){this.lm=b;this.ln=a}else{if(!this.ln.mKey&&this.ln!=a){this.slider(this.ln,this.lm,1)}}}this.slider(a,b)}),this.delay)},run:function(){if(this.handle.length!=this.handleBx.length){return false}for(var b=0,a=this.handle.length;b<a;b++){this.handle[b].nub=b;this.on(this.handle[b],this.evt,this.B(this,this.act,this.handle[b]));if(this.evt=="mouseover"){this.on(this.handle[b],"mouseout",this.B(this,function(){if(this.sTime){clearTimeout(this.sTime)}}))}}if(this.index>=0&&this.cl){this.act(this.handle[this.index])}}};
