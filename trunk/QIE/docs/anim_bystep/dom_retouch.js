/*
	Copyright (c) Baidu Youa Wed QWrap
	author: ���桢JK
*/

(function() {
	var mix = QW.ObjectH.mix,
		methodize = QW.HelperH.methodize,
		rwrap = QW.HelperH.rwrap,
		NodeC = QW.NodeC,
		NodeH = QW.NodeH,
		EventTargetH = QW.EventTargetH,
		JssTargetH = QW.JssTargetH,
		DomU = QW.DomU,
		NodeW = QW.NodeW;
	/*
	 * ��NodeH��EventTargetH��JssTargetH��ArrayH��ȾNodeW
	*/

	NodeW.pluginHelper(NodeH, NodeC.wrapMethods, NodeC.gsetterMethods);
	NodeW.pluginHelper(EventTargetH, 'operator');
	NodeW.pluginHelper(JssTargetH, NodeC.wrapMethods, {
		jss: ['', 'getJss', 'setJss']
	});

	var ah = QW.ObjectH.dump(QW.ArrayH, NodeC.arrayMethods);
	ah = methodize(ah);
	ah = rwrap(ah, NodeW, NodeC.wrapMethods);
	mix(NodeW.prototype, ah); //ArrayH��ĳЩ����

	/**
	 * @class Dom ��QW.DomU��QW.NodeH�ϲ���QW.Dom��Ը��ɵĴ��뱣��һ��
	 * @singleton 
	 * @namespace QW
	 */
	var Dom = QW.Dom = {};
	mix(Dom, [DomU, NodeH, EventTargetH, JssTargetH]);
}());