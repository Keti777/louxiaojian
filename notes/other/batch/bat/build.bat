@echo off
setlocal EnableDelayedExpansion
REM һ��Ҫ����������䣬�����echo !RESULT_FILE!����Ч

color B
::����YUI Compressor����Ŀ¼
title CSS,JS�ļ�ͳһѹ������
SET YUIFOLDER=D:\yuicompressor
::�������JS��CSS��Ŀ¼���ű����Զ�������β��Һ�ѹ�����е�JS��CSS
SET FOLDER=F:\batch\bat\src
echo ���ڲ��� JavaScript, CSS ...
chdir /d %FOLDER%

for /r . %%a in (*.source.css *.source.js) do (

REM ��ȡѹ������ļ���������Ϊ��
REM 1. �ļ�����.sourceʱ: filename.source.js -> filename.js
REM 2. ���������filename.js -> filename-min.js
set RESULT_FILE=%%~na-min%%~xa
dir /b "%%~fa" | find ".source." > nul
if %ERRORLEVEL% == 0 (
    for %%w in ("%%~na") do (
        REM echo %%~nw%%~xa
        set RESULT_FILE=%%~nw%%~xa
    )
)
REM echo !RESULT_FILE!


REM echo �̷���%%~da
REM echo %%~pa
REM echo �ļ������֣�%%~na
REM echo �ļ��ĺ�׺����%%~xa
REM echo �ļ��Ĵ�С��%%~za

@java -jar %YUIFOLDER%\yuicompressor.jar --charset GB2312 "%%~fa" -o "%%~da%%~pa!RESULT_FILE!"
@echo compressed %%~xa file done %%~a ...ѹ��Ϊ!RESULT_FILE!

set /a filenub=filenub+1
REM ren "%%~fa123" "waitan-!a!%%~xa"
REM echo �ϳɵ�·��Ϊ��%%~da%%~pa%%~na

)
REM echo %RESULT_FILE%
echo ѹ�������%filenub%���ļ�
pause & exit