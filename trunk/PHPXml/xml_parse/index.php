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
//��Ч�� xml �ļ�
$xmlfile = 'test.xml';

$xmlparser = xml_parser_create();

// ���ļ�����ȡ����
$fp = fopen($xmlfile, 'r');
while ($xmldata = fread($fp, 4096)) 
  {
  // parse the data chunk
  if (!xml_parse($xmlparser,$xmldata,feof($fp))) 
    {
    die( print "ERROR: "
    . xml_get_error_code($xmlparser)
    . "<br />"
    . "Line: "
    . xml_get_current_line_number($xmlparser)
    . "<br />"
    . "Column: "
    . xml_get_current_column_number($xmlparser)
    . "<br />");
    }
  }

xml_parser_free($xmlparser);
?>
</body>
</html>