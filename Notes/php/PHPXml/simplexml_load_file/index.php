<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>PHPXml</title>
</head>

<body>
<br />���Ǵ��������� XML �ļ����Ԫ�ص����ƺ����ݡ�

<br />������Ҫ�������飺

<br />���� XML �ļ� 
<br />ȡ�õ�һ��Ԫ�ص����� 
<br />ʹ�� children() ����������ÿ���ӽڵ��ϴ�����ѭ�� 
<br />���ÿ���ӽڵ��Ԫ�����ƺ����� 

<?php
$xml = simplexml_load_file("test.xml");

echo $xml->getName() . "<br />";

foreach($xml->children() as $child)
  {
  echo $child->getName() . ": " . $child . "<br />";
  }
?>
</body>
</html>