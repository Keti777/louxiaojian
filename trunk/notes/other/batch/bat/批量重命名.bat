@echo off 
rem ����"�ӻ�������������" 
setlocal EnableDelayedExpansion 
set a=1 
rem ѭ����ǰĿ¼������ͼƬ���ļ�����֧�ִ��ո������ 
for /f "delims=" %%i in ('dir /b *.jpg') do ( 
rem ���û����ͬ���ļ���������� 
if not "%%~ni"=="%~n0" ( 
if !a! LSS 10 (ren "%%i" "A_100!a!.jpg") else ren "%%i" "A_!a!.jpg" 
echo ���%%i������
rem ������ֵ�ͱ���a=a+1 
set /a a+=1 
) 
) 
echo ������������ɣ� 
pause