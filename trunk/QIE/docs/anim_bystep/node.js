(function() {
	var queryer = 'queryer',
		operator = 'operator',
		getter_all = 'getter_all',
		getter_first = 'getter_first',
		getter_first_all = 'getter_first_all';

	QW.NodeC = {
		getterType: getter_first,
		arrayMethods: 'map,forEach,toArray'.split(','),
		//����Array�ķ���Ҳ�Ἧ�ɵ�NodeW��
		wrapMethods: {
			//queryer ������ֵ���İ�װ���
			//operator ����Ǿ�̬���������ص�һ�������İ�װ�������ԭ�ͷ��������ر���
			//getter_all �����array����ÿһ��ִ�У�������
			//getter_first �����array���򷵻ص�һ��ִ�еķ���ֵ
			//getter_first_all ͬgetter����������������һ����getterFirst��һ����getterAll
			//NodeHϵ��
			g: queryer,
			one: queryer,
			query: queryer,
			getElementsByClass: queryer,
			outerHTML: getter_first,
			hasClass: getter_first,
			addClass: operator,
			removeClass: operator,
			replaceClass: operator,
			toggleClass: operator,
			show: operator,
			hide: operator,
			toggle: operator,
			isVisible: getter_first,
			getXY: getter_first_all,
			setXY: operator,
			setSize: operator,
			setInnerSize: operator,
			setRect: operator,
			setInnerRect: operator,
			getSize: getter_first_all,
			getRect: getter_first_all,
			nextSibling: queryer,
			previousSibling: queryer,
			ancestorNode: queryer,
			parentNode: queryer,
			firstChild: queryer,
			lastChild: queryer,
			contains: getter_first,
			insertAdjacentHTML: operator,
			insertAdjacentElement: operator,
			insert: operator,
			insertTo: operator,
			appendChild: operator,
			insertSiblingBefore: operator,
			insertSiblingAfter: operator,
			insertBefore: operator,
			insertAfter: operator,
			replaceNode: operator,
			replaceChild: operator,
			removeNode: operator,
			empty: operator,
			removeChild: operator,
			get: getter_first_all,
			set: operator,
			getAttr: getter_first_all,
			setAttr: operator,
			removeAttr: operator,
			getValue: getter_first_all,
			setValue: operator,
			getHtml: getter_first_all,
			setHtml: operator,
			encodeURIForm: getter_first,
			isFormChanged: getter_first,
			cloneNode: queryer,
			getStyle: getter_first_all,
			getCurrentStyle: getter_first_all,
			setStyle: operator,
			removeStyle: operator,
			borderWidth: getter_first,
			paddingWidth: getter_first,
			marginWidth: getter_first,

			//TargetHϵ��
			//����
			//JssTargetHϵ��
			getOwnJss: getter_first_all,
			getJss: getter_first_all,
			setJss: operator,
			removeJss: operator,

			//ArrayHϵ��
			forEach: operator
		},
		gsetterMethods: { //�ڴ�json��ķ���������һ��getter��setter�Ļ����
			val: ['getValue', 'setValue'],
			html: ['getHtml', 'setHtml'],
			attr: ['', 'getAttr', 'setAttr'],
			css: ['', 'getCurrentStyle', 'setStyle'],
			size: ['getSize', 'setInnerSize'],
			xy: ['getXY', 'setXY']
		}
	};

}());