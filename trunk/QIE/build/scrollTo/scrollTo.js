/**
 * Created by JetBrains WebStorm.
 * User: LXJ
 * Date: 12-2-14 ����11:12
 * Mail: louxiaojian@gmail.com
 */
function scrollTo(be,to,time,s){
    /**
     * s.type���� ��֡��ʱģʽ.
     * s.type������ ��ʱ��֡ģʽ.
     * s.callback ������ɺ�Ļص�����.
     */
    var b=be,
        c=to-be,
        d=time || 300,
        s=s || {},
        t=0,
        dd,
        webkit=/applewebkit/.test(window.navigator.userAgent.toLowerCase()),//webkit�ں������
        Tween=function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        };
    if(document.body.scrollHeight<=document.documentElement.clientHeight) return false;
    dd=document.compatMode=="CSS1Compat" && !webkit ? document.documentElement : document.body;
    var betime=new Date().getTime();
    s.type && (d=d/10);
    (function(){
        /**
         * t=t+1 ��֡��ʱ.
         * t=new Date().getTime()-betime ��ʱ��֡
         */
        t=s.type ? t+1:(new Date().getTime()-betime);
        if(t<d){
            dd.scrollTop =Math.ceil(Tween(t,b,c,d))
            setTimeout(arguments.callee,10)
        }else{
            dd.scrollTop=to;
            s.callback && s.callback();
        }
    })();
};