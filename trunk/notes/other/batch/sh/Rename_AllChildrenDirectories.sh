#!/bin/bash
# Rename_AllChildrenDirectories.sh
# ����������
# ĳĿ¼������Ŀ¼�г���һЩ�ԡ�;1����β���ı��ļ�������дshell�ű���
# ��ȥ�����Ŀ¼������Ŀ¼�����и����ļ����н�β���ֵġ�;1����

# COUNT���ڼ������������������£�Ĭ��Ϊ����3�γ��ԡ�
COUNT=0
while [ $COUNT -lt 3 ]
do
	echo  "������Ҫ���������ļ����ڸ�Ŀ¼��·����"
	read PATH

	if [ -d $PATH ]
	then
		cd $PATH
		# NUM������������ġ������������ļ�����
		NUM=`/usr/bin/find $PATH -type f|/bin/grep .*\;1$|/usr/bin/wc -l`
		echo "�����Ŀ¼������Ŀ¼����Ҫ���������ļ��У�$NUM ��"

		# ���NUMΪ0��˵�������������������˳���
		if [ $NUM -eq 0 ]
		then
			echo "�������������˳���"
			exit
		fi

		# �г����������ġ�Ҫ���������ļ�,������������������
		for loop in `/usr/bin/find $PATH -type f|/bin/grep .*\;1$|/usr/bin/sort`
		do
			echo $loop
			# ����������������������Ϣ�����/tmpĿ¼���Ըó�������ͷ�ġ�_error.log���ļ���
			/bin/mv $loop `echo -n $loop | /bin/sed 's/\;1//'` 2>/tmp/`/usr/bin/basename $0`_error.log
		done

		echo "��������ɣ�"
		
		TOTAL=`/usr/bin/find $PATH -type f|/usr/bin/wc -l`
		echo "�����Ŀ¼������Ŀ¼�е���ͨ�ļ��У�$TOTAL ��"
		/usr/bin/find $PATH -type f|/usr/bin/sort

		exit
	else # �����·�����Ǵ���Ŀ¼��
		if (($COUNT<2))
		then
			echo "�����·��������ȷ�Ϻ����롣"	
		else
			echo "���Դ������࣬�˳���"
		fi
	fi
	
	# ������COUNT��1��
	COUNT=$[$COUNT+1]
done