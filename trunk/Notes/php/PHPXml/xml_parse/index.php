<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>PHPXml</title>
</head>

<body>
��ʾ��ע��
��ʾ��Ҫ���� XML ����������ʹ�� xml_parser_create() ������
<?php
//��Ч xml �ļ�
$xmlfile = 'test.xml';
$xmlparser = xml_parser_create();

// ���ļ�����ȡ����
$fp = fopen($xmlfile, 'r');
$xmldata = fread($fp, 4096);

xml_parse_into_struct($xmlparser,$xmldata,$values);

xml_parser_free($xmlparser);
echo "<pre>";
print_r($values);
echo "</pre>";
?>
</body>
</html>