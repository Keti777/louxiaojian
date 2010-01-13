<?php


/* Eclipse: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
//
// +----------------------------------------------------------------------+
// | PHP Version 4                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 2005-2006    All rights reserved.                      |
// +----------------------------------------------------------------------+
// | This source file is not free   GBK   Encoding!                       |
// +----------------------------------------------------------------------+
// | Authors: xltxlm <xltxlm@163.com>                                     |
// +----------------------------------------------------------------------+
//
// Created by Administrator 2009-6-15
// $Id: md5_sign.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $

/**
 * MD5ǩ����֤,���ڱ�,��ȫ��֤
 * $max_delay��ʾ,�����֤ID�ܴ������ʱ��.Ĭ����һ��Сʱ
 * @since version - 2009-6-14
 */
function md5_sign($md5 = false, $max_delay = 3600)
{
	//�漴���Һ����ʱ��
	$time = 130456712;
	$_SERVER['md5_sign'] = base64_encode(md5($_SERVER['REMOTE_ADDR'] . "EXPO.PPS@TV") . (time() + $time));
	//������֤��,����Ҫ�κβ���
	if (!$md5)
		return $_SERVER['md5_sign'];
	//�в�����,��ʾ�ύ֮��,ʱ�������֤,���ܳ��� $max_delay��
	if ($md5)
		if ((time() - substr(base64_decode($md5), 32) + $time) > $max_delay)
			return false;
		else
			return substr($_SERVER['md5_sign'], 0, 32) == substr($md5, 0, 32);
}

/**
 * cookie��֤����
 * @since version - 2009-6-30
 */
function md5_cookie($Authentication = false, $max_delay = 3600)
{
	if (!$_COOKIE['user_name'])
		return NULL;
	//�漴���Һ����ʱ��
	$time = 130456762;
	//��֤��������,�ʻ�,����,IP,ʱ��
	$md5_cookie = base64_encode(md5($_SERVER['REMOTE_ADDR'] . $_COOKIE['user_name'] . "EXPO.PPS@TV") . (time() + $time));
	//��֤�ʻ��Ƿ��Ѿ���½��,���ǵ�½ʱ�������Ƶ� 
	if ($Authentication)
	{
		$time_Distance = (time() - substr(base64_decode($_COOKIE['COOKIE_Authentication']), 32) + $time);
		return ($time_Distance >= 0 && $time_Distance < $max_delay) && substr($_COOKIE['COOKIE_Authentication'], 0, 32) == substr($md5_cookie, 0, 32);
	}
	if ($_COOKIE['user_name'])
		return $md5_cookie;
};