/*
 * ���ظ����
*/
(function() {
	var F = function(el, e) {
		var ban = (el.getAttribute && el.getAttribute('data--ban')) | 0;
		if (ban) {
			if (!el.__BAN_preTime || (new Date() - el.__BAN_preTime) > ban) {
				el.__BAN_preTime = new Date() * 1;
				return true;
			}
			return;
		}
		return true;
	};
	QW.EventTargetH._DelegateHooks.click = QW.EventTargetH._EventHooks.click = {
		'click': F
	};
	QW.EventTargetH._EventHooks.submit = {
		'submit': F
	};
}());

/*
 * ���ӱ���
*/
QW.g = QW.NodeH.g;
QW.W = QW.NodeW;

/*
 * ��ֱ����QW�ķ����������ռ�����һ�㵽window
*/
QW.ObjectH.mix(window, QW);

/*
 * ����provide�Ĳ���
*/
QW.ModuleH.provideDomains.push(window);