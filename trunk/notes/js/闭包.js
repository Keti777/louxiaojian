for(var i=1; i < 4; i++){
                var id = document.getElementById("a" + i);
				  /*
				   ����������һ��������������ֵ������ id_i;
				  */
                id.onclick = function(){
				  /*
				  ���i��Դ�ھֲ��������޷���window.i����obj.i����ʽ�ں������ã�
				  ֻ����ָ����߱�����ַ��ʽ������������������У�
				  ����Ǵ�˵�ıհ�����������������������ɵ��¼������ʹ������
				  �ķ�ʽ���־����������Ҳ������Щ������������һ������i;
				  */
                          alert(i);
                };
        };
        /*
        �����ʽ:
        1. �ֲ���ȫ��

        for(var i=1; i < 4; i++){
                var id = document.getElementById("a" + i);
                id.i=i;//���i���˸�
                id.onclick=function(){
                        alert(this.i)
                };
         };

        for(var i=1; i < 4; i++){
                var id = document.getElementById("a" + i);
                window[id.id]=i;//���i���˸�
                id.onclick=function(){
                        alert(window[this.id]);
                };
        }

         2. ����һ��һ�ĸ���հ�

        for(var i=1; i < 4; i++){
           var id = document.getElementById("a" + i);
           id.onclick=(function(i){
                return function(){
                                alert(i);//���i��ʵ�εıհ�
                        }
           })(i);
         };

        for(var i=1; i < 4; i++){
           var id = document.getElementById("a" + i);
           id.onclick=new function(){
               var i2=i;//���i�Ǳհ��ıհ�
                return function(){
                                alert(i2);
                        }
           };
        };

        */