@echo off 
title ��ɫС��

echo ѡ������ѡ��Ϳ��Ըı䱳�������ֵ���ɫ��
echo.
echo.
echo.
echo      ******************************** 
echo.
echo         0 = ��ɫ       8 = ��ɫ
echo         1 = ��ɫ       9 = ����ɫ
echo         2 = ��ɫ       A = ����ɫ
echo         3 = ����ɫ     B = ��ǳ��ɫ
echo         4 = ��ɫ       C = ����ɫ
echo         5 = ��ɫ       D = ����ɫ
echo         6 = ��ɫ       E = ����ɫ
echo         7 = ��ɫ       F = ����ɫ
echo.
echo      ********************************
echo.
echo.
echo.
:start
set num=
set /p num=��������ѡ���е�����������ɫֵ: 
if %num%=="0" goto bianse
:bianse
echo.
echo    ��ʼ��ɫ��......
echo.
color %num%
echo    ��ɫ������������ѡ��
echo.
goto start