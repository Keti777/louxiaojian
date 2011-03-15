@echo off
setlocal EnableDelayedExpansion

color B
title CSS,JS�ļ�ͳһѹ������
SET CurrentDirectory="%~dp0"
::����YUI Compressor����Ŀ¼
SET YUIFOLDER="D:\TBCompressor"

REM ��ȡ���·��
set layers=0
set "cur_dir=%cd%\"
:get_cd_layers
set "cur_dir=%cur_dir:*\=%"
if not "%cur_dir%"=="" set /a layers+=1&goto get_cd_layers
REM ��ȡ���·������

::�������JS��CSS��Ŀ¼���ű����Զ�������β��Һ�ѹ�����е�JS��CSS
SET FOLDER=%CurrentDirectory%src
echo ��ʼѹ�� JavaScript, CSS ...
chdir /d %FOLDER%

for /r . %%a in (*.source.css *.source.js) do (

REM ��ȡѹ������ļ���������Ϊ��
REM 1. �ļ�����.sourceʱ: filename.source.js -> filename.js
REM 2. ���������filename.js -> filename-min.js

set RESULT_FILE=%%~na-min%%~xa
dir /b "%%~a" | find ".source." > nul
if %ERRORLEVEL% == 0 (
    for %%w in ("%%~na") do (
        REM echo %%~nw%%~xa
        set RESULT_FILE=%%~nw%%~xa
    )
)

@java -jar %YUIFOLDER%\yuicompressor.jar --charset GB2312 "%%~fa" -o "%%~da%%~pa!RESULT_FILE!"
REM @echo compressed %%~xa file done %%~fa ѹ��Ϊ!RESULT_FILE!

set /a filenub=filenub+1

REM ��ȡ���·��(���ﴫ������������)
call :intercept "%%~dpnxa"  "%%~xa"  "to !RESULT_FILE!"
REM ��ȡ���·������

)

echo ѹ�������%filenub%���ļ�
pause & exit

REM ��ȡ���·��
:intercept
set num=0
set sub_path=%1
set sub_path=%sub_path:~1,-1%

REM ����call�����ĵڶ�������(ɾ�����ź��)
set type=%~2%
REM ����call�����ĵ���������(ɾ�����ź��)
REM %~3%�м��~��ʾȥ�������е�����
set ll=%~3%

:loop
set sub_path=%sub_path:*\=%
if not %num% equ %layers% set /a num+=1&goto loop
echo compressed %type% file: %sub_path% %ll%
goto :eof
REM ��ȡ���·������

