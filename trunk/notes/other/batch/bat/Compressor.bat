
@echo off 
::����YUI Compressor����Ŀ¼ 
SET YUIFOLDER=D:\yuicompressor

::�������JS��CSS��Ŀ¼���ű����Զ�������β��Һ�ѹ�����е�JS��CSS 
SET INFOLDER=F:\batch\bat\t 
SET OUTFOLDER=F:\batch\bat\src
echo ���ڲ��� JavaScript, CSS ... 
chdir /d %INFOLDER% 

for /r . %%a in (*.source.css *.source.js) do ( 
copy %%a "%OUTFOLDER%\" && echo ����%%~fa�ɹ� || echo ����%%~faʧ��,�����ļ��Ƿ����! 
@echo ����ѹ�� %%~a ... 
@java -jar %YUIFOLDER%\yuicompressor.jar --charset GB2312 %%~fa -o %%~fa 
) 
@echo CSS JSѹ�����! 

for /r . %%b in (*.gif) do ( 
@echo ���ڲ��� gif... 
@pngout %%~fb /kp 
del /q/f %%~fb 
) 

@echo gifת�����! 

for /r . %%c in (*.png) do ( 
@echo ���ڲ��� png... 
@pngout %%~fc 
) 

@echo pngѹ�����! 

pause & exit 