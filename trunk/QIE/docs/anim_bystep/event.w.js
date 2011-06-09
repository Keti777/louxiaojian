/*
	Copyright (c) Baidu Youa Wed QWrap
	author: ����
*/
/** 
 * @class EventW Event Wrap��event�����װ��
 * @namespace QW
 */
(function() {
	var mix = QW.ObjectH.mix,
		methodize = QW.HelperH.methodize;

	QW.EventW = function() {
		this.chromeHack; //chrome bug hack

		/** 
		 * @property core ԭ��Eventʵ��
		 * @type {Event}
		 */
		this.core = QW.EventH.getEvent.apply(null, arguments);

		/** 
		 * @property target �¼�������Ԫ��
		 * @type {HTMLElement}
		 */
		this.target = this.getTarget();

		/** 
		 * @property relatedTarget mouseover/mouseout �¼�ʱ��Ч overʱΪ��ԴԪ��,outʱΪ�ƶ�����Ԫ��.
		 * @type {HTMLElement}
		 */
		this.relatedTarget = this.getRelatedTarget();

		/** 
		 * @property pageX ���λ������ҳ���X����
		 * @type {int}
		 */
		this.pageX = this.getPageX();

		/** 
		 * @property pageX ���λ������ҳ���Y����
		 * @type {int}
		 */
		this.pageY = this.getPageY();
		//this.layerX = this.layerX();
		//this.layerY = this.layerY();

		/** 
		 * @property detail �����ַ��� ����0����,С��0����.
		 * @type {int}
		 */
		this.detail = this.getDetail();

		/** 
		 * @property keyCode �¼������İ�����Ӧ��ascii��
		 * @type {int}
		 */
		this.keyCode = this.getKeyCode();

		/** 
		 * @property ctrlKey �¼�����ʱ�Ƿ������סctrl��
		 * @type {boolean}
		 */
		this.ctrlKey = this.getCtrlKey();

		/** 
		 * @property shiftKey �¼�����ʱ�Ƿ������סshift��
		 * @type {boolean}
		 */
		this.shiftKey = this.getShiftKey();

		/** 
		 * @property altKey �¼�����ʱ�Ƿ������סalt��
		 * @type {boolean}
		 */
		this.altKey = this.getAltKey();

		/** 
		 * @property button �¼�����������λ(������) ����ie��������������Ժܲ���ͬ������û�������ݴ������ﷵ�ص���ԭ�����
		 * @type {boolean}
		 */
		this.button = this.core.button;

		this.clientX = this.core.clientX;
		this.clientY = this.core.clientY;
		this.type = this.core.type;
	};

	mix(QW.EventW.prototype, methodize(QW.EventH, 'core'));
}());