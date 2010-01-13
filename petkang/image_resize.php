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
// Created by Administrator 2009-7-26
// $Id: image_resize.php,v 1.1 2009/08/18 03:22:43 xltxlm Exp $

/**
 * ��һ��ͼƬѹ����ָ���Ŀ�ȴ�С
 *	Created on 2009-7-26 by Administrator
 *
 */
ini_set("display_errors",0);
include "code/_cookie_auth.php";
$width= (int) $_GET['width'];
$height_d= (int) $_GET['height'];
if(!$_GET['src'] || !$width)
	die;
if(!$_GET['dec'])
	$_GET['dec']= $_GET['src'];
//�ж��ļ�������
$type= array_pop(explode(".", strtolower($_GET['src'])));
//ֻ�����ͼƬ����
if(!in_array($type, explode("|", "jpg|gif|png")))
	die;

//�ж��ǲ���ͼƬ
if(!getimagesize($_GET['src']))
	die;
//��ʼ���д���
if($type == 'jpg')
	$id= imagecreatefromjpeg($_GET['src']);
if($type == 'gif')
	$id= imagecreatefromgif($_GET['src']);
if($type == 'png')
	$id= imagecreatefrompng($_GET['src']);
if(!is_resource($id))
	die;
$x= imagesx($id);
$y= imagesy($id);

//���ݰٷֱ�������ͼƬ��С����
$height= $y * $width / $x;
//Ԥ��һ���µ�ͼƬ���������µ�����С
$newimg= imagecreatetruecolor($width, $height);
if(!is_resource($newimg))
	die;
//�������ɰ�ɫ
$background_color= imagecolorallocate($newimg, 255, 255, 255);
imagefilledrectangle($newimg, 0, 0, $width, $height, $background_color);
//��ȡԭ��ͼƬ�����ҿ�ʼ������С
imagecopyresampled($newimg, $id, 0, 0, 0, 0, $width, $height, $x, $y);
imagedestroy($id);
//����ļ�

//����Ҫǿ��ѹ���±����߶�
if($height_d && $height_d < $height)
{
	$newimg2= imagecreatetruecolor($width, $height_d);
	//�������ɰ�ɫ
	$background_color= imagecolorallocate($newimg2, 255, 255, 255);
	imagefilledrectangle($newimg2, 0, 0, $width, $height_d, $background_color);
	//��ȡԭ��ͼƬ�����ҿ�ʼ������С
	imagecopyresampled($newimg2, $newimg, 0, 0, 0,($height - $height_d) / 2, $width, $height, $width, $height);
	imagedestroy($newimg);
	$bool= imagejpeg($newimg2, $_GET['dec']);
}
else
	$bool= imagejpeg($newimg, $_GET['dec']);
if($bool)
	echo "OK";
;