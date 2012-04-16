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
            d=0,
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
            init:function(){
                if(!wrap || !panel || (panel[css[0]] <= wrap[css[0]] && panel[css[0]]!=0)){
                    return false;
                };
                panel.innerHTML += panel.innerHTML;
                this.ss=Math.floor(panel[css[0]] / 2);
                this.event();
            },
            cycle:function(){
                (this.ss==0)  && (this.ss=Math.floor(panel[css[0]] / 2));//����������״̬�� ��ȡ��ֵΪ0�����¹���������bug
                var p=Math.abs(d)-this.ss;
                panel.style[css[1]] = ( p>=0 ? (0-p)  : (d=d-space) ) +'px';
                p>=0 && (d=0);
            },
            event:function(){
                var self = this,cycleTime = setInterval(function(){self.cycle()}, speed)
                panel.onmouseover = function(){
                    clearInterval(cycleTime);
                };
                panel.onmouseout = function(){
                    cycleTime = setInterval(function(){self.cycle()}, speed);
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
