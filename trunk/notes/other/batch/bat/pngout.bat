
@echo off 
::����YUI Compressor����Ŀ¼ 
SET YUIFOLDER=D:\yuicompressor

::�������JS��CSS��Ŀ¼���ű����Զ�������β��Һ�ѹ�����е�JS��CSS 
SET INFOLDER=E:\WebCode\googlecode\louxiaojian\trunk\notes\other\batch\bat\png 

echo ���ڲ��� JavaScript, CSS ... 
chdir /d %INFOLDER% 


for /r . %%c in (*.png) do ( 
@echo ���ڲ��� png...

cd E:\WebCode\googlecode\louxiaojian\trunk\notes\other\batch\bat

pngout.exe %%~fc /c3 /f0 /d8
 
) 

@echo pngѹ�����! 

pause & exit 