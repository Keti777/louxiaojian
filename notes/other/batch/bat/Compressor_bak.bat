
@echo off 
::����YUI Compressor����Ŀ¼ 
SET YUIFOLDER=D:\yuicompressor-2.4.2\build\ 

::�������JS��CSS��Ŀ¼���ű����Զ�������β��Һ�ѹ�����е�JS��CSS 
SET INFOLDER=D:\jscss\src 
SET OUTFOLDER=D:\jscss\build 
echo ���ڲ��� JavaScript, CSS ... 
chdir /d %INFOLDER% 

for /r . %%a in (*.js *.css) do ( 
copy %%a "%OUTFOLDER%\" && echo ����%%~fa�ɹ� || echo ����%%~faʧ��,�����ļ��Ƿ����! 
@echo ����ѹ�� %%~a ... 
@java -jar %YUIFOLDER%\yuicompressor-2.4.2.jar --charset UTF-8 %%~fa -o %%~fa 
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