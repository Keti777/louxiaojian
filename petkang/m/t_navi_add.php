<?php


/* Eclipse */
//
// +----------------------------------------------------------------------+
// | PHP Version 4                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 2005-2006    All rights reserved.                      |
// +----------------------------------------------------------------------+
// | This source file is not free     GBK Encoding!                       |
// +----------------------------------------------------------------------+
// | Authors: xltxlm <xltxlm@163.com>                                     |
// +----------------------------------------------------------------------+
//
// Created by Administrator at 2006-10-28 ����04:15:02
// $Id: t_navi_add.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $
include_once "t.class.php";
/**
 * Created on 2006-11-21 by Administrator
 *
 */
class t_navi extends t
{
	var $deepth= 0;

	/**
	 * Created on 2006-10-30 ����08:28:04 by Administrator
	 *
	 */
	function _subStart($noteInfo)
	{
		echo "\t<ul id='sub{$noteInfo['r_id']}' >\n";
	}
	/**
	 * Created on 2006-10-30 ����08:23:49 by Administrator
	 *
	 */
	function _noteStart($noteInfo)
	{
		$pad= $this->deepth * 15;
		echo "<li  style='padding-left: {$pad}px;'  >";
	}

	/**
	 * Created on 2006-10-30 ����08:23:49 by Administrator
	 *
	 */
	function _noteEnd($noteInfo)
	{
		echo "</li>\n";
	}

	/**
	 * Created on 2006-10-30 ����08:23:57 by Administrator
	 *
	 */
	function _note($noteInfo)
	{
		echo "<span>{$noteInfo['r_name']} <font color='green'>{$noteInfo['r_url']}</font><a href='javascript:edit_resource({$noteInfo['r_id']})'>�༭</a> ".
		"<a href='m.php?act=resource_move&r_id={$noteInfo['r_id']}'>�ƶ�</a> ".
		"<a href='javascript:get_resource({$noteInfo['r_id']})'>����¼��˵�</a> ".
		"<a href='m.php?act=resource_delete_do&r_id={$noteInfo['r_id']}' onclick=\"if(!confirm('ȷ��ɾ��?�������ɾ���¼����нڵ�,���Ҳ��ɳ���'))return false; \" >ɾ��</a></span>\n";
	}
};