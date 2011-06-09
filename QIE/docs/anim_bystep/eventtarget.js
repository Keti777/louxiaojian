/*
	Copyright (c) Baidu Youa Wed QWrap
	version: $version$ $release$ released
	author: WC(����)��JK(�ӿ�)
*/

/** 
 * @class EventTargetH EventTarget Helper��������¼�����Ŀ���йصļ�������
 * @singleton
 * @helper
 * @namespace QW
 */

(function() {

	var g = QW.NodeH.g,
		mix = QW.ObjectH.mix;


	/*
	 *Cache�ĸ�ʽ��
		{
			"el.__QWETH_id":{
				'eventType+handler.__QWETH_id': realHandler,
				'eventType+handler.__QWETH_id+selector': realHandler
			}
		}
	 */
	var Cache = function() {
		var cacheSeq = 1,
			seqProp = '__QWETH_id';
		return {
			get: function(el, eventName, handler, selector) {
				var data = el[seqProp] && this[el[seqProp]];
				if (data && handler[seqProp]) {
					return data[eventName + handler[seqProp] + (selector || '')];
				}
			},
			add: function(realHandler, el, eventName, handler, selector) {
				if (!el[seqProp]) el[seqProp] = cacheSeq++;
				if (!handler[seqProp]) handler[seqProp] = cacheSeq++;
				var data = this[el[seqProp]] || (this[el[seqProp]] = {});
				data[eventName + handler[seqProp] + (selector || '')] = realHandler;
			},
			remove: function(el, eventName, handler, selector) {
				var data = el[seqProp] && this[el[seqProp]];
				if (data && handler[seqProp]) {
					delete data[eventName + handler[seqProp] + (selector || '')];
				}
			},
			removeEvents: function(el, eventName) {
				var data = el[seqProp] && this[el[seqProp]];
				if (data) {
					var reg = new RegExp('[a-zA-Z.]*' + (eventName || '') + '\\d+$');
					for (var i in data) {
						if (reg.test(i)) {
							EventTargetH.removeEventListener(el, i.split(/[^a-zA-Z]/)[0], data[i]);
							delete data[i];
						}
					}
				}
			},
			removeDelegates: function(el, eventName, selector) {
				var data = el[seqProp] && this[el[seqProp]];
				if (data) {
					var reg = new RegExp('([a-zA-Z]+\\.)?' + (eventName || '') + '\\d+.+');
					for (var i in data) {
						if (reg.test(i) && (!selector || i.substr(i.length - selector.length) == selector)) {
							EventTargetH.removeEventListener(el, i.split(/[^a-zA-Z]/)[0], data[i], true);
							delete data[i];
						}
					}
				}
			}
		};
	}();


	/* 
	 * ��������
	 * @method	listener
	 * @private
	 * @param	{Element}	el		Ԫ��
	 * @param	{string}	sEvent	�¼�����
	 * @param	{function}	handler	ί�к���
	 * @param	{string}	userEventName	ԭ�¼����ƣ���hook���¼���
	 * @return	{object}	ί�з���ִ�н��
	 */

	function listener(el, sEvent, handler, userEventName) {
		return Cache.get(el, sEvent + (userEventName ? '.' + userEventName : ''), handler) || function(e) {
			if (!userEventName || userEventName && EventTargetH._EventHooks[userEventName][sEvent](el, e)) {
				return fireHandler(el, e, handler, sEvent);
			}
		};
	}

	/* 
	 * delegate��������
	 * @method	delegateListener
	 * @private
	 * @param	{Element}	el		����Ŀ��
	 * @param	{string}	selector	ѡ����
	 * @param	{string}	sEvent		�¼�����
	 * @param	{function}	handler		ί�к���
	 * @param	{string}	userEventName	ԭ�¼����ƣ���hook���¼���
	 * @return	{object}	ί�з���ִ�н��
	 */

	function delegateListener(el, selector, sEvent, handler, userEventName) {
		return Cache.get(el, sEvent + (userEventName ? '.' + userEventName : ''), handler, selector) || function(e) {
			var elements = [],
				node = e.srcElement || e.target;
			if (!node) {
				return;
			}
			if (node.nodeType == 3) {
				node = node.parentNode;
			}
			while (node && node != el) {
				elements.push(node);
				node = node.parentNode;
			}
			elements = QW.Selector.filter(elements, selector, el);
			for (var i = 0, l = elements.length; i < l; ++i) {
				if (!userEventName || userEventName && EventTargetH._DelegateHooks[userEventName][sEvent](elements[i], e || window.event)) {
					return fireHandler(elements[i], e, handler, sEvent);
				}
				if (elements[i].parentNode && elements[i].parentNode.nodeType == 11) { //fix remove elements[i] bubble bug
					if (e.stopPropagation) {
						e.stopPropagation();
					} else {
						e.cancelBubble = true;
					}
					break;
				}
			}
		};
	}

	/* 
	 * �¼�ִ�����
	 * @method	fireHandler
	 * @private
	 * @param	{Element}	el			�����¼�����
	 * @param	{event}		event		�¼�����
	 * @param	{function}	handler		�¼�ί��
	 * @param	{string}	sEvent		����ǰ�¼�����
	 * @return	{object}	�¼�ί��ִ�н��
	 */

	function fireHandler(el, e, handler, sEvent) {
		return EventTargetH.fireHandler.apply(null, arguments);
	}


	var EventTargetH = {
		_EventHooks: {},
		_DelegateHooks: {},

		/** 
		 * �¼�ִ�����
		 * @method	fireHandler
		 * @private
		 * @param	{Element}	el			�����¼�����
		 * @param	{event}		event		�¼�����
		 * @param	{function}	handler		�¼�ί��
		 * @param	{string}	sEvent		����ǰ�¼�����
		 * @return	{object}	�¼�ί��ִ�н��
		 */
		fireHandler: function(el, e, handler, sEvent) {
			var ew = new QW.EventW(e);
			return handler.call(el, ew);
		},

		/**
		 * ����¼�����
		 * @method	addEventListener
		 * @param	{Element}	el	����Ŀ��
		 * @param	{string}	sEvent	�¼�����
		 * @param	{function}	handler	�¼��������
		 * @param	{bool}		capture	(Optional)�Ƿ񲶻��ie����Ч
		 * @return	{void}
		 */
		addEventListener: (function() {
			if (document.addEventListener) {
				return function(el, sEvent, handler, capture) {
					el.addEventListener(sEvent, handler, capture || false);
				};
			} else {
				return function(el, sEvent, handler) {
					el.attachEvent('on' + sEvent, handler);
				};
			}
		}()),

		/**
		 * �Ƴ��¼�����
		 * @method	removeEventListener
		 * @private
		 * @param	{Element}	el	����Ŀ��
		 * @param	{string}	sEvent	�¼�����
		 * @param	{function}	handler	�¼��������
		 * @param	{bool}		capture	(Optional)�Ƿ񲶻��ie����Ч
		 * @return	{void}
		 */
		removeEventListener: (function() {
			if (document.removeEventListener) {
				return function(el, sEvent, handler, capture) {
					el.removeEventListener(sEvent, handler, capture || false);
				};
			} else {
				return function(el, sEvent, handler) {
					el.detachEvent('on' + sEvent, handler);
				};
			}
		}()),

		/** 
		 * ��Ӷ�ָ���¼��ļ���
		 * @method	on
		 * @param	{Element}	el	����Ŀ��
		 * @param	{string}	sEvent	�¼�����
		 * @param	{function}	handler	�¼��������
		 * @return	{boolean}	�¼��Ƿ�����ɹ�
		 */
		on: function(el, sEvent, handler) {
			el = g(el);
			var hooks = EventTargetH._EventHooks[sEvent];
			if (hooks) {
				for (var i in hooks) {
					var _listener = listener(el, i, handler, sEvent);
					EventTargetH.addEventListener(el, i, _listener);
					Cache.add(_listener, el, i+'.'+sEvent, handler);
				}
			} else {
				_listener = listener(el, sEvent, handler);
				EventTargetH.addEventListener(el, sEvent, _listener);
				Cache.add(_listener, el, sEvent, handler);
			}
		},

		/** 
		 * �Ƴ���ָ���¼��ļ���
		 * @method	un
		 * @param	{Element}	el	�Ƴ�Ŀ��
		 * @param	{string}	sEvent	(Optional)�¼�����
		 * @param	{function}	handler	(Optional)�¼��������
		 * @return	{boolean}	�¼������Ƿ��Ƴ��ɹ�
		 */
		un: function(el, sEvent, handler) {
			el = g(el);
			if (!handler) { //�Ƴ�����ٿ�
				return Cache.removeEvents(el, sEvent);
			}
			var hooks = EventTargetH._EventHooks[sEvent];
			if (hooks) {
				for (var i in hooks) {
					var _listener = listener(el, i, handler, sEvent);
					EventTargetH.removeEventListener(el, i, _listener);
					Cache.remove(el, i+'.'+sEvent, handler);
				}
			} else {
				_listener = listener(el, sEvent, handler);
				EventTargetH.removeEventListener(el, sEvent, _listener);
				Cache.remove(el, sEvent, handler);
			}
		},

		/** 
		 * ����¼�ί��
		 * @method	delegate
		 * @param	{Element}	el		��ί�е�Ŀ��
		 * @param	{string}	selector	ί�е�Ŀ��
		 * @param	{string}	sEvent		�¼�����
		 * @param	{function}	handler		�¼��������
		 * @return	{boolean}	�¼������Ƿ��Ƴ��ɹ�
		 */
		delegate: function(el, selector, sEvent, handler) {
			el = g(el);
			var hooks = EventTargetH._DelegateHooks[sEvent];
			if (hooks) {
				for (var i in hooks) {
					var _listener = delegateListener(el, selector, i, handler, sEvent);
					EventTargetH.addEventListener(el, i, _listener, true);
					Cache.add(_listener, el, i+'.'+sEvent, handler, selector);
				}
			} else {
				_listener = delegateListener(el, selector, sEvent, handler);
				EventTargetH.addEventListener(el, sEvent, _listener, true);
				Cache.add(_listener, el, sEvent, handler, selector);
			}
		},

		/** 
		 * �Ƴ��¼�ί��
		 * @method	undelegate
		 * @param	{Element}	el		��ί�е�Ŀ��
		 * @param	{string}	selector	(Optional)ί�е�Ŀ��
		 * @param	{string}	sEvent		(Optional)�¼�����
		 * @param	{function}	handler		(Optional)�¼��������
		 * @return	{boolean}	�¼������Ƿ��Ƴ��ɹ�
		 */
		undelegate: function(el, selector, sEvent, handler) {
			el = g(el);
			if (!handler) { //�Ƴ�����ٿ�
				return Cache.removeDelegates(el, sEvent, selector);
			}
			var hooks = EventTargetH._DelegateHooks[sEvent];
			if (hooks) {
				for (var i in hooks) {
					var _listener = delegateListener(el, selector, i, handler, sEvent);
					EventTargetH.removeEventListener(el, i, _listener, true);
					Cache.remove(el, i+'.'+sEvent, handler, selector);
				}
			} else {
				_listener = delegateListener(el, selector, sEvent, handler);
				EventTargetH.removeEventListener(el, sEvent, _listener, true);
				Cache.remove(el, sEvent, handler, selector);
			}
		},

		/** 
		 * ���������ָ���¼�
		 * @method	fire
		 * @param	{Element}	el	Ҫ�����¼��Ķ���
		 * @param	{string}	sEvent	�¼�����
		 * @return	{void}
		 */
		fire: (function() {
			if (document.dispatchEvent) {
				return function(el, sEvent) {
					var evt = null,
						doc = el.ownerDocument || el;
					if (/mouse|click/i.test(sEvent)) {
						evt = doc.createEvent('MouseEvents');
						evt.initMouseEvent(sEvent, true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
					} else {
						evt = doc.createEvent('Events');
						evt.initEvent(sEvent, true, true, doc.defaultView);
					}
					return el.dispatchEvent(evt);
				};
			} else {
				return function(el, sEvent) {
					return el.fireEvent('on' + sEvent);
				};
			}
		}())
	};

	EventTargetH._defaultExtend = function() {
		var extend = function(types) {
			function extendType(type) {
				EventTargetH[type] = function(el, handler) {
					if (handler) {
						EventTargetH.on(el, type, handler);
					} else {
						(el[type] && el[type]()) || EventTargetH.fire(el, type);
					}
				};
			}
			for (var i = 0, l = types.length; i < l; ++i) {
				extendType(types[i]);
			}
		};

		/** 
		 * �󶨶����click�¼�����ִ��click����
		 * @method	click
		 * @param	{Element}	el	Ҫ�����¼��Ķ���
		 * @param	{function}	handler	(Optional)�¼�ί��
		 * @return	{void}
		 */


		/** 
		 * �󶨶����submit�¼�����ִ��submit����
		 * @method	submit
		 * @param	{Element}	el	Ҫ�����¼��Ķ���
		 * @param	{function}	handler	(Optional)�¼�ί��
		 * @return	{void}
		 */

		/** 
		 * �󶨶����focus�¼�����ִ��focus����
		 * @method	focus
		 * @param	{Element}	el	Ҫ�����¼��Ķ���
		 * @param	{function}	handler	(Optional)�¼�ί��
		 * @return	{void}
		 */

		/** 
		 * �󶨶����blur�¼�����ִ��blur����
		 * @method	blur
		 * @param	{Element}	el	Ҫ�����¼��Ķ���
		 * @param	{function}	handler	(Optional)�¼�ί��
		 * @return	{void}
		 */

		extend('submit,reset,click,focus,blur,change'.split(','));
		EventTargetH.hover = function(el, enter, leave) {
			el = g(el);
			EventTargetH.on(el, 'mouseenter', enter);
			EventTargetH.on(el, 'mouseleave', leave || enter);
		};


		var UA = navigator.userAgent;
		if (/firefox/i.test(UA)) {
			EventTargetH._EventHooks.mousewheel = EventTargetH._DelegateHooks.mousewheel = {
				'DOMMouseScroll': function(e) {
					return true;
				}
			};
		}
		mix(EventTargetH._EventHooks, {
			'mouseenter': {
				'mouseover': function(el, e) {
					var relatedTarget = e.relatedTarget || e.fromElement;
					if (!relatedTarget || !(el.contains ? el.contains(relatedTarget) : (el.compareDocumentPosition(relatedTarget) & 17))) {
						//relatedTargetΪ�ջ򲻱��Լ�����
						return true;
					}
				}
			},
			'mouseleave': {
				'mouseout': function(el, e) {
					var relatedTarget = e.relatedTarget || e.toElement;
					if (!relatedTarget || !(el.contains ? el.contains(relatedTarget) : (el.compareDocumentPosition(relatedTarget) & 17))) {
						//relatedTargetΪ�ջ򲻱��Լ�����
						return true;
					}
				}
			}
		});
		mix(EventTargetH._DelegateHooks, EventTargetH._EventHooks);
		if (!document.addEventListener) {
			function getElementVal(el) {
				switch (el.type) {
				case 'checkbox':
				case 'radio':
					return el.checked;
				case "select-multiple":
					var vals = [],
						opts = el.options;
					for (var j = 0; j < opts.length; ++j) {
						if (opts[j].selected) {vals.push(opts[j].value); }
					}
					return vals.join(',');
				default:
					return el.value;
				}
			}
			function specialChange(el, e) {
				var target = e.target || e.srcElement;
				//if(target.tagName == 'OPTION') target = target.parentNode;
				if (' INPUT TEXTAREA SELECT BUTTON'.indexOf(target.tagName)) {
					if (getElementVal(target) != target.__QWETH_pre_val) {
						return true;
					}
				}
			}
			mix(EventTargetH._DelegateHooks, {
				'change': {
					'focusin': function(el, e) {
						var target = e.target || e.srcElement;
						//if(target.tagName == 'OPTION') target = target.parentNode;
						if (' INPUT TEXTAREA SELECT BUTTON'.indexOf(target.tagName)) {
							target.__QWETH_pre_val = getElementVal(target);
						}
					},
					'deactivate': specialChange,
					'focusout': specialChange,
					'click': specialChange
				},
				'focus': {
					'focusin': function(el, e) {
						var target = e.target || e.srcElement;
						if (' INPUT TEXTAREA SELECT BUTTON'.indexOf(target.tagName)) {
							return true;
						}
					}
				},
				'blur': {
					'focusout': function(el, e) {
						var target = e.target || e.srcElement;
						if (' INPUT TEXTAREA SELECT BUTTON'.indexOf(target.tagName)) {
							return true;
						}
					}
				}
			});
		}
	};

	EventTargetH._defaultExtend(); //JK: ִ��Ĭ�ϵ���Ⱦ����soloʱ�����������̫�࣬����ȥ�����н��ж���solo
	QW.EventTargetH = EventTargetH;

}());