<?php
if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'],'iPad')) {
	echo "�㵱ǰʹ��ipad�����ҳ";
	exit();
}
?>