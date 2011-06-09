/*
	Copyright (c) Baidu Youa Wed QWrap
	version: $version$ $release$ released
	author: JK
*/


(function() {
	var mix = QW.ObjectH.mix,
		indexOf = QW.ArrayH.indexOf;

	//----------QW.CustEvent----------
	/**
	 * @class CustEvent �Զ����¼�
	 * @namespace QW
	 * @param {object} target �¼��������󣬼������ĸ�������¼���
	 * @param {string} type �¼����͡����á�
	 * @param {object} eventArgs (Optional) �Զ����¼�����
	 * @returns {CustEvent} �Զ����¼�
	 */
	var CustEvent = function(target, type, eventArgs) {
		this.target = target;
		this.type = type;
		mix(this, eventArgs || {});
	};

	mix(CustEvent.prototype, {
		/**
		 * @property {Object} target CustEvent��target
		 */
		target: null,
		/**
		 * @property {Object} currentTarget CustEvent��currentTarget�����¼��ɷ���
		 */
		currentTarget: null,
		/**
		 * @property {String} type CustEvent������
		 */
		type: null,
		/**
		 * @property {boolean} returnValue fire����ִ�к���������(�������:����onbeforexxxx�¼������returnValue===false����ִ�и��¼�)��
		 */
		returnValue: undefined,
		/**
		 * ����event�ķ���ֵΪfalse��
		 * @method preventDefault
		 * @returns {void} �޷���ֵ
		 */
		preventDefault: function() {
			this.returnValue = false;
		}
	});
	/**
	 * Ϊһ���������һϵ���¼��������on/un/fire�����������μ���QW.CustEventTarget.createEvents
	 * @static
	 * @method createEvents
	 * @param {Object} obj �¼��������󣬼������ĸ�������¼���
	 * @param {String|Array} types �¼����ơ�
	 * @returns {void} �޷���ֵ
	 */


	/**
	 * @class CustEventTargetH  CustEventTarget��Helper
	 * @singleton 
	 * @namespace QW
	 */

	var CustEventTargetH = {
		/**
		 * ��Ӽ��
		 * @method on 
		 * @param {string} sEvent �¼����ơ�
		 * @param {Function} fn ��غ�������CustEvent fireʱ��this����ָ��oScope������һ��������������һ��CustEvent����
		 * @return {boolean} �Ƿ�ɹ���Ӽ�ء����磺�ظ���Ӽ�أ��ᵼ�·���false.
		 * @throw {Error} ���û�ж��¼����г�ʼ��������״�
		 */
		on: function(target, sEvent, fn) {
			var cbs = (target.__custListeners && target.__custListeners[sEvent]) || QW.error("unknown event type", TypeError);
			if (indexOf(cbs, fn) > -1) {
				return false;
			}
			cbs.push(fn);
			return true;
		},
		/**
		 * ȡ�����
		 * @method un
		 * @param {string} sEvent �¼����ơ�
		 * @param {Function} fn ��غ���
		 * @return {boolean} �Ƿ���Чִ��un.
		 * @throw {Error} ���û�ж��¼����г�ʼ��������״�
		 */
		un: function(target, sEvent, fn) {
			var cbs = (target.__custListeners && target.__custListeners[sEvent]) || QW.error("unknown event type", TypeError);
			if (fn) {
				var idx = indexOf(cbs, fn);
				if (idx < 0) {
					return false;
				}
				cbs.splice(idx, 1);
			} else {
				cbs.length = 0;
			}
			return true;

		},
		/**
		 * �¼������������¼�ʱ���ڼ�غ����this����ָ��oScope������һ��������������һ��CustEvent������Dom3��listener�Ĳ������ơ�<br/>
		 ���this.target['on'+this.type],��Ҳ��ִ�и÷���,��HTMLElement�Ķ�ռģʽ���¼�(��el.onclick=function(){alert(1)})����.<br/>
		 ���createEvents���¼������а���"*"���������¼�����Ҳ���䵽on("*").
		 * @method fire 
		 * @param {string | sEvent} sEvent �Զ����¼������¼����ơ� ������¼����ƣ��൱�ڴ�new CustEvent(this,sEvent,eventArgs).
		 * @param {object} eventArgs (Optional) �Զ����¼�����
		 * @return {boolean} ���������������false����������·���true.
		 1. ����callback(������ռģʽ��onxxx)ִ�����custEvent.returnValue===false
		 2. ����callback(������ռģʽ��onxxx)ִ�����custEvent.returnValue===undefined�����Ҷ�ռģʽ��onxxx()�ķ���ֵΪfalse.
		 */
		fire: function(target, sEvent, eventArgs) {
			if (sEvent instanceof CustEvent) {
				var custEvent = mix(sEvent, eventArgs);
				sEvent = sEvent.type;
			} else {
				custEvent = new CustEvent(target, sEvent, eventArgs);
			}

			var cbs = (target.__custListeners && target.__custListeners[sEvent]) || QW.error("unknown event type", TypeError);
			if (sEvent != "*") {
				cbs = cbs.concat(target.__custListeners["*"] || []);
			}

			custEvent.returnValue = undefined; //ȥ�����䣬�ᵼ�¾�̬CustEvent��returnValue�����Ⱦ
			custEvent.currentTarget = target;
			var obj = custEvent.currentTarget;
			if (obj && obj['on' + custEvent.type]) {
				var retDef = obj['on' + custEvent.type].call(obj, custEvent); //���ڶ�ռģʽ�ķ���ֵ������Ӱ��event.returnValue
			}

			for (var i = 0; i < cbs.length; i++) {
				cbs[i].call(obj, custEvent);
			}
			return custEvent.returnValue !== false || (retDef === false && custEvent.returnValue === undefined);
		},
		/**
		 * Ϊһ���������һϵ���¼��������on/un/fire��������<br/>
		 * ��ӵ��¼����Զ�����һ��������¼�����"*"������¼�����û�ж�ռģʽ�������¼������䵽on("*")�¼���Ӧ�Ĵ�������
		 * @static
		 * @method createEvents
		 * @param {Object} obj �¼��������󣬼������ĸ�������¼���
		 * @param {String|Array} types �¼����ơ�
		 * @returns {any} target
		 */
		createEvents: function(target, types) {
			types = types || [];
			if (typeof types == "string") {
				types = types.split(",");
			}
			var listeners = target.__custListeners;
			if (!listeners) {
				listeners = target.__custListeners = {};
			}
			for (var i = 0; i < types.length; i++) {
				listeners[types[i]] = listeners[types[i]] || []; //�����ظ�create������Ӱ��֮ǰ��listerners.
			}
			listeners['*'] = listeners["*"] || [];
			return target;
		}
	};

	/**
	 * @class CustEventTarget  �Զ����¼�Target�����������з�����createEvents��on��un��fire���μ�CustEventTargetH
	 * @namespace QW
	 */

	var CustEventTarget = function() {
		this.__custListeners = {};
	};
	var methodized = QW.HelperH.methodize(CustEventTargetH); 
	mix(CustEventTarget.prototype, methodized);

	CustEvent.createEvents = function(target, types) {
		CustEventTargetH.createEvents(target, types); 
		return mix(target, methodized);//���ض������on��
	};

	/*
	 * �����QW
	 */
	QW.CustEvent = CustEvent;
	QW.CustEventTargetH = CustEventTargetH;
	QW.CustEventTarget = CustEventTarget;

}());