/**
 * Created by JetBrains WebStorm.
 * User: LXJ
 * Date: 11-8-8 ����4:57
 * Mail: louxiaojian@gmail.com
 */
;(function(S) {
    function scroll(elem,s){
        /*
         *��������
         */
        var speed = s.speed || 15,//�����ļ��
            space = s.space || 1,//�����ļ��
            panel = S.$(elem),
            wrap=S.$(s.wrap),
            mode=s.mode || 'level',//vertical��ֱ��levelˮƽ
            css={'vertical':['offsetHeight','top'],'level':['offsetWidth','left']}[mode];

        function isFunction(ar){
          return Object.prototype.toString.call(ar)=="[object Function]";
		};

        function scrollBase(){
            var self = this;
            if (!(self instanceof scrollBase)) {
                return new scrollBase();
            };
            this.init();
        };
        scrollBase.prototype={
            init : function(){
                if(!wrap || !panel || (panel[css[0]] <= wrap[css[0]] && panel[css[0]]!=0)){
                    return false;
                };
                panel.innerHTML += panel.innerHTML;
                this.ss=Math.floor(panel[css[0]] / 2);
				this.d=0;
                this.event();
				this.begin();
            },
            cycle : function(){
				var self = this;
                (this.ss==0)  && (this.ss=Math.floor(panel[css[0]] / 2));//����������״̬�� ��ȡ��ֵΪ0�����¹���������bug
                var p=Math.abs(this.d)-this.ss;
                panel.style[css[1]] = ( p>=0 ? (0-p)  : (this.d=this.d-space) ) +'px';
                p>=0 && (this.d=0);
                this.cycleTime = setTimeout(function(){self.cycle()}, isFunction(speed) ? (speed.call(this,panel,space,css[1]) || speed) : speed)
            },
			stop : function(){
				  this.cycleTime && clearInterval(this.cycleTime);
			},
			begin : function(){
				  this.cycle();
			},
            event : function(){
                var self = this;
                panel.onmouseover = function(){
					self.stop();
                };
                panel.onmouseout = function(){
                    self.begin();
                };
            }
        };
        return scrollBase();
    }
    S.scroll = scroll;

    /*
     *S.scroll('J_scroll_panel',{wrap:'J_scroll_wrap',speed:20});
     *S.scroll('J_scroll_panel2',{wrap:'J_scroll_wrap2',mode:'vertical'});
     *�������ģ��ĸ�����һ�����ز�ʱ����ʱoffsetWidth��offsetHeightֵΪ0��scrollֹͣ����bug(2011-12-31);
     */
})(window.PPS || this);
