<?php


/* Eclipse: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
//
// +----------------------------------------------------------------------+
// | PHP Version 4-5                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 2005-2009    All rights reserved.                      |
// +----------------------------------------------------------------------+
// | This source file is not free   GBK   Encoding!                       |
// +----------------------------------------------------------------------+
// | Authors: xltxlm <xltxlm@qq.com>                                     |
// +----------------------------------------------------------------------+
//
// Created by Administrator 2009-8-8
// $Id: petkang.php,v 1.98 2009/12/02 11:05:18 xltxlm Exp $
include "header.php";
if (in_array($_GET['act'], explode("|", 'user_info')))
	include_once "_user_cookie_auth.php";
$petkang= new petkang();
$_GET['act']= $_GET['act'] ? $_GET['act'] : "index";
$petkang-> $_GET['act'] ();
class petkang
{
	function index()
	{
		define("__NAVI__", "��ҳ");
		include "db_locahost_mysql.php";
		$stmt= mysql_query("select * from yiliao_shenfen where home='Y' order by orderby limit 9");
		$this->city_list= array ();
		while ($row= mysql_fetch_assoc($stmt))
		{
			//�������Ļ�������
			$this->city_list[]= $row['name'];
		}
		$tmp= array ();
		foreach ($this->city_list as $v)
			$tmp[]= "'{$v}'";
		$stmt= mysql_query("select * from  yiliao_jigou  where j_shenfen IN (" . join(",", $tmp) . ") order by j_star  desc");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data["ʡ�ݻ���"][$row['j_shenfen']][]= $row;
		//where j_shenfen='��ϸ����'
		$stmt= mysql_query("select * from wenzhang_jigou   order by j_time desc limit 10 ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data['ҽ������'][]= $row;
		//�ɿ�����
		$stmt= mysql_query("select * from wenzhang_news  order by j_time desc limit 10 ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data['�ɿ�����'][]= $row;
		//�ֶ����õ����Ż�������
		$stmt= mysql_query("select * from yiliao_jigou where home_page>0  order by home_page   limit 10 ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data['���ż������'][]= $row;
		//PET/CT��̬
		$stmt= mysql_query("select *  from  yiliao_active  limit 20 ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data['��̬'][]= $row;
		//��������
		$stmt= mysql_query("select *  from  link  order  by orderby  limit 50 ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data['��������'][]= $row;
		//�������
		$stmt= mysql_query("select *  from  yiliao_guangao   order  by rand()  limit 20 ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data['ҽ�ƹ��'][]= $row;
		include "petkang/index.shtml";
	}

	//pet,ct��̬��Ϣ�б�
	function active()
	{
		define("__NAVI__", "��̬");
		include "db_locahost_mysql.php";
		//��ȡ�����б�
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from yiliao_active  "));
		$this->pageObj= new page($page['c'], 30);
		$stmt= mysql_query("select * from yiliao_active order by id desc limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		$this->all_data= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		//���������б�
		$stmt= mysql_query("select * from yiliao_active order by id desc limit 6  ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_hot[]= $row;
		include "petkang/active.html";
	}
	/**
	 * ���ֶһ�����
	 *	Created on 2009-9-2 by Administrator
	 *
	 */
	function jianli()
	{
		include "db_locahost_mysql.php";
		//
		$page= mysql_fetch_assoc(mysql_query("select count(*)  c from  lipi_jigou  "));
		$this->pageObj= new page($page['c'], 20);
		$stmt= mysql_query("select * from lipi_jigou order by  j_time desc  limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		$this->all_lipin= array ();
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_lipin[]= $row;
		include "petkang/jianli.html";
	}
	/**
	 * �����б�
	 *	Created on 2009-9-2 by Administrator
	 *
	 */
	function news()
	{
		define("__NAVI__", "����");
		include "db_locahost_mysql.php";
		//��ȡ�����б�
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  wenzhang_news  "));
		$this->pageObj= new page($page['c'], 20);
		$stmt= mysql_query("select * from wenzhang_news order by j_id desc limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;
		//���������б�
		$stmt= mysql_query("select * from wenzhang_news order by click desc limit 6  ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_hot[]= $row;
		include "petkang/news.html";
	}
	//PET/CT֪ʶ�б�
	function intro()
	{
		define("__NAVI__", "֪ʶ");
		include "db_locahost_mysql.php";
		$this->all_class= array (
			"��ϸ����",
			"���ָ��",
			"�ٴ�Ӧ��",
			"��������"
		);
		foreach ($this->all_class as $k => $v)
		{
			$stmt= mysql_query("select * from wenzhang_jigou where j_shenfen='{$v}'  order by j_id desc limit 28 ");
			while ($row= mysql_fetch_assoc($stmt))
				$this->all_data[$v][]= $row;
		}

		//���������б�
		$stmt= mysql_query("select * from wenzhang_jigou order by click desc limit 10  ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_hot[]= $row;
		include "petkang/intro.html";
	}
	//PET/CT֪ʶ�б�(�������)
	function intro_class()
	{
		define("__NAVI__", "֪ʶ");
		include "db_locahost_mysql.php";
		//��ȡ�����б�
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from  wenzhang_jigou   where j_shenfen='{$_GET['j_shenfen']}' "));
		$this->pageObj= new page($page['c'], 40);

		$stmt= mysql_query("select * from wenzhang_jigou where j_shenfen='{$_GET['j_shenfen']}'  order by j_id desc limit {$this->pageObj->limit_1},{$this->pageObj->limit_2} ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_data[]= $row;

		//���������б�
		$stmt= mysql_query("select * from wenzhang_jigou order by click desc limit 10  ");
		while ($row= mysql_fetch_assoc($stmt))
			$this->all_hot[]= $row;
		include "petkang/intro_class.html";
	}

	//
	function user_info()
	{
		define("__NAVI__", "��ҳ");
		include "petkang/user_info.html";
	}
	function user_pass()
	{
		include "petkang/user_pass.html";
	}
	//�޸��ʻ�������
	function user_pass_do()
	{
		include "db_locahost_mysql.php";
		$_COOKIE['user_name']= mysql_real_escape_string($_COOKIE['user_name']);
		$old_pass= md5($_POST['old_pass']);
		$check= mysql_fetch_assoc(mysql_query("select * from yiliao_user  where user_name='{$_COOKIE['user_name']}' and user_pass='{$old_pass}'  "));
		if (!$check)
		{
			$this->error_message= "�������";
			return $this->user_pass();
		}
		$user_pass= md5($_POST['new_pass']);
		mysql_query("update yiliao_user set user_pass='{$user_pass}' where user_name='{$_COOKIE['user_name']}' ");
		echo "<script>alert('�޸�����ɹ�!');window.location.href='{$_SERVER['HTTP_REFERER']}'</script>";
	}
	//�ʻ��Ļ��ּ�¼
	function user_jifen()
	{
		include "db_locahost_mysql.php";
		$_COOKIE['user_name']= mysql_real_escape_string($_COOKIE['user_name']);
		$this->all_data= array ();
		$page= mysql_fetch_assoc(mysql_query("select count(*) c from yiliao_user_jifen  where user_name='{$_COOKIE['user_name']}'"));
		$this->pageObj= new page($page['c'], 10);
		$stmt= mysql_query("select * from yiliao_user_jifen  where user_name='{$_COOKIE['user_name']}' limit {$this->pageObj->limit_1}, {$this->pageObj->limit_2} ");
		while ($row= mysql_fetch_assoc($stmt))
		{
			$this->all_data[]= $row;
		}
		$this->all= mysql_fetch_assoc(mysql_query("select sum(jifen) jifen  from yiliao_user_jifen where  user_name='{$_COOKIE['user_name']}' "));
		include "petkang/user_jifen.html";
	}
	//��Ʒ�һ���¼
	function user_duihuan()
	{
		include "petkang/user_duihuan.html";
	}
	//��ʾ�ʻ��Ļ�����Ϣ
	function user_baseinfo()
	{
		include "db_locahost_mysql.php";
		$_COOKIE['user_name']= mysql_real_escape_string($_COOKIE['user_name']);
		$this->row= mysql_fetch_assoc(mysql_query("select * from  yiliao_user where user_name='{$_COOKIE['user_name']}' limit 1 "));
		include "petkang/user_baseinfo.html";
	}
	//�༭��������
	function user_baseinfo_do()
	{
		include "db_locahost_mysql.php";
		$_COOKIE['user_name']= mysql_real_escape_string($_COOKIE['user_name']);
		$_POST['user_realname']= mysql_real_escape_string($_POST['user_realname']);
		$_POST['user_sex']= mysql_real_escape_string($_POST['user_sex']);
		$_POST['user_tel']= mysql_real_escape_string($_POST['user_tel']);
		$_POST['user_email']= mysql_real_escape_string($_POST['user_email']);
		$_POST['user_address']= mysql_real_escape_string($_POST['user_address']);

		mysql_query("update  yiliao_user   set user_realname='{$_POST['user_realname']}'," .
		"user_sex='{$_POST['user_sex']}',user_tel='{$_POST['user_tel']}',user_email='{$_POST['user_email']}'," .
		"user_address='{$_POST['user_address']}'  where user_name='{$_COOKIE['user_name']}' limit 1 ");
		echo "<script>alert('�޸Ļ������ϳɹ�!');window.location.href='{$_SERVER['HTTP_REFERER']}'</script>";
	}
	function user_jianli()
	{
		include "petkang/user_jianli.html";
	}
	function user_jiankan_danan()
	{
		include "petkang/user_jiankan_danan.html";
	}

	function dayly()
	{
		include "petkang/dayly.html";
	}

	//�����ɿ�������
	function aboutus()
	{
		include "petkang/aboutus.html";
	}
	//��ϵ����
	function contact()
	{
		include "petkang/contact.html";
	}
};