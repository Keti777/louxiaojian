<?php
if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone')) {
	echo "�㵱ǰʹ��iPhone�����ҳ";
	exit();
}

if(strstr($_SERVER['HTTP_USER_AGENT'],'iPad')) {
	echo "�㵱ǰʹ��ipad�����ҳ";
	exit();
}

if(strstr($_SERVER['HTTP_USER_AGENT'],'Android')) {
	echo "�㵱ǰʹ��Android�����ҳ";
	exit();
}
?>
