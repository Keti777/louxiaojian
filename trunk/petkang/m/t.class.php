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
// Created by xltxlm at 2006-12-13 ����06:58:41

/**
 * Created on 2006-12-13 by ����Ա
 *
 */
class t
{
	var $unUseArray= array ();
	//
	var $_un= array ();
	//��׮�ṹ������
	var $originArray= array ();
	//����׮���汻�õ�������
	var $useArray= array ();
	//
	var $config= array ();
	//
	var $treeDeepth= 0;
	//
	var $specialArray= array ();
	//
	var $deepth= 0;
	//
	var $disabled= array ();
	//
	var $maxDeepth= 0;

	/**
	 * @since version - 2006-12-13
	 */
	function t($dataArray= array (), $config= array (), $specialArray= array ())
	{
		$this->config= $config + array (
			'start' => 0,
			'id' => 'r_id',
			'pid' => 'r_parent_id',
			'order' => 'r_order',
			'deepth' => 50
		);
		settype($specialArray, 'array');
		$this->specialArray= $specialArray;
		settype($dataArray, 'array');

		if ($dataArray)
		{
			if ($this->config['un'] && $this->config['start'])
			{
				//�ѹ�ϵ������
				$tmp= $this->config['id'];
				$this->config['id']= $this->config['pid'];
				$this->config['pid']= $tmp;
				$this->unUseArray= $dataArray;
				usort($this->unUseArray, array (
					& $this,
					'_sortParent'
				));
				$this->_unmk((int) $this->config['start']);
				$this->unUseArray= $this->_un;
				//��ԭ��ϵ
				$this->config['start']= 0;
				$tmp= $this->config['id'];
				$this->config['id']= $this->config['pid'];
				$this->config['pid']= $tmp;
			}
			if (!$this->config['un'])
				$this->unUseArray= $dataArray;
			usort($this->unUseArray, array (
				& $this,
				'_sortParent'
			));
			$id= intval($this->config['start']);
			$this->_mk($id, $this->originArray);
		}
	}

	/**
	 * @since version - 2006-10-27
	 */
	function _mk(& $id, & $cateTree)
	{

		if ($this->treeDeepth >= $this->config['deepth'])
			return 0;
		$this->treeDeepth++;
		$cateTree= $this->_child($id);
		foreach ($cateTree as $k => $v)
			$cateTree[$k]['count']= $this->_mk($v[$this->config['id']], $cateTree[$k]['child']);
		$this->treeDeepth--;
		return count($cateTree);
	}

	/**
	 * @since version - 2006-10-27
	 */
	function _unmk($id)
	{
		foreach ($this->_child($id) as $k => $v)
		{
			$this->_un[]= $v;
			if ($v[$this->config['id']])
				$this->_unmk($v[$this->config['id']]);
		}
	}

	/**
	* Created on 2006-10-31 ����12:38:01 by Administrator
	*
	*/
	function _child($id)
	{
		reset($this->unUseArray);
		$tmp= array ();
		foreach ($this->unUseArray as $key => $var)
		{
			//�Ѿ������������
			if ($var[$this->config['pid']] > $id)
				break;
			if ($var[$this->config['pid']] == $id)
				//��֤�����ظ��¼�ID
				if (!in_array($var, $tmp))
				{
					//�ۼӼ��㱻�õ�������
					$this->useArray[]= $tmp[]= $var;
					//�õ����ݾ�ȡ��,��֤������ѭ��
					unset ($this->unUseArray[$key]);
				}
		}
		//��Ҫ���������
		if ($this->config['order'])
		{
			usort($tmp, array (
				& $this,
				'_sort'
			));
		}
		return $tmp;
	}

	/**
	 * @since version - 2006-12-29
	 */
	function _sortParent($a, $b)
	{
		if ($a[$this->config['pid']] == $b[$this->config['pid']])
			return 0;
		return ($a[$this->config['pid']] < $b[$this->config['pid']]) ? -1 : 1;
	}
	/**
	 * @since version - 2006-10-26
	 */
	function _sort($a, $b)
	{
		if ($a[$this->config['pid']] == $b[$this->config['pid']] && $a[$this->config['order']] >= $b[$this->config['order']])
			return 1;
		elseif ($a[$this->config['pid']] == $b[$this->config['pid']]) return 0;
		if ($a[$this->config['pid']] < $b[$this->config['pid']])
			return 1;
		return -1;
	}

	/**
	 * array
	 * @since version - 2006-10-26
	 */
	function show()
	{
		ob_start();
		echo '<ul>';
		$this->_callBack($this->originArray);
		echo '</ul>';
		unset ($this->originArray, $this->_un);
		return ob_get_clean();
	}
	/**
	 * @since version - 2006-11-9
	 */
	function info($id)
	{
		$val= array ();
		foreach ($this->originArray as $key => $val)
			if ($val[$this->config['id']] == $id)
				return $val;
		return $val;
	}

	/**
	 * @since version - 2006-10-27
	 */
	function _callBack(& $cateTree)
	{
		foreach ($cateTree as $k => $v)
		{
			static $i= 0;
			$this->_noteStart($v);
			$this->_note($v);
			//�����¼�ʱ�����ʾ
			if ($v['child'])
			{
				if (in_array($v[$this->config['id']], $this->disabled))
					continue;
				$this->_subStart($v);
				$this->deepth++;
				$this->_callBack($v['child']);
				$this->deepth--;
				echo "</ul>\n";
			}
			$this->_noteEnd($v);
		}
	}
};