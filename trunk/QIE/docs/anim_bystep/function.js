/*
	Copyright (c) Baidu Youa Wed QWrap
	version: $version$ $release$ released
	author: ��Ӱ��JK
*/

/**
 * @class FunctionH ���Ķ���Function����չ
 * @singleton 
 * @namespace QW
 * @helper
 */
(function() {

	var FunctionH = {
		/**
		 * ������װ�� methodize���Ժ�������methodize����ʹ��ĵ�һ������Ϊthis����this[attr]��
		 * @method methodize
		 * @static
		 * @param {function} funcҪ�������ĺ���
		 * @param {string} attr (Optional) ����
		 * @return {function} �ѷ������ĺ���
		 */
		methodize: function(func, attr) {
			if (attr) {
				return function() {
					return func.apply(null, [this[attr]].concat([].slice.call(arguments)));
				};
			}
			return function() {
				return func.apply(null, [this].concat([].slice.call(arguments)));
			};
		},
		/** �Ժ������м�����ʹ���һ����������������
		 * @method mul
		 * @static
		 * @param {function} func
		 * @param {bite} opt ���������ȱʡ��ʾĬ�ϣ�
		 1 ��ʾgetFirst��ֻ������һ��Ԫ�أ�
		 2 ��ʾjoinLists�������һ�����������飬�������Ľ����ƽ������
		 * @return {Object} �Ѽ����ĺ���
		 */
		mul: function(func, opt) {
			var getFirst = opt == 1,
				joinLists = opt == 2;

			if (getFirst) {
				return function() {
					var list = arguments[0];
					if (!(list instanceof Array)) {
						return func.apply(this, arguments);
					}
					if (list.length) {
						var args = [].slice.call(arguments, 0);
						args[0] = list[0];
						return func.apply(this, args);
					}
				};
			}

			return function() {
				var list = arguments[0];
				if (list instanceof Array) {
					var moreArgs = [].slice.call(arguments, 0),
						ret = [],
						i = 0,
						len = list.length,
						r;
					for (; i < len; i++) {
						moreArgs[0] = list[i];
						r = func.apply(this, moreArgs);
						if (joinLists) {
							if (r != null) {
								ret = ret.concat(r);
							}
						} else {
							ret.push(r);
						}
					}
					return ret;
				} else {
					return func.apply(this, arguments);
				}
			};
		},
		/**
		 * ������װ�任
		 * @method rwrap
		 * @static
		 * @param {func} 
		 * @return {Function}
		 */
		rwrap: function(func, wrapper, idx) {
			idx |= 0;
			return function() {
				var ret = func.apply(this, arguments);
				if (idx >= 0) {
					ret = arguments[idx];
				}
				return wrapper ? new wrapper(ret) : ret;
			};
		},
		/**
		 * ��
		 * @method bind
		 * @via https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
		 * @compatibile ECMA-262, 5th (JavaScript 1.8.5)
		 * @static
		 * @param {func} Ҫ�󶨵ĺ���
		 * @obj {object} this_obj
		 * @param {any} arg1 (Optional) Ԥ��ȷ���Ĳ���
		 * @param {any} arg2 (Optional) Ԥ��ȷ���Ĳ���
		 * @return {Function}
		 */
		bind: function(func, obj) {
			var slice = [].slice,
				args = slice.call(arguments, 2),
				nop = function() {},
				bound = function() {
					return func.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
				};

			nop.prototype = func.prototype;

			bound.prototype = new nop();

			return bound;
		},
		/**
		 * ����ִ��ĳ������һֱ�����ò�ִ�е�ʱ���ִ�С�
		 * @method lazyApply
		 * @static
		 * @param {Function} fun  ���ú���
		 * @param {Object} thisObj  �൱��apply������thisObj����
		 * @param {Array} argArray  �൱��apply������argArray����
		 * @param {int} ims  interval����������window.setInterval�ĵڶ�������.
		 * @param {Function} checker  �������е��жϺ�����<br/>
			���ڲ�ͬ�ķ���ֵ���õ���ͬ�Ľ����<br/>
				����true��1����ʾ��Ҫ����ִ��<br/>
				����-1����ʾ�ɹ�͵����������ִ��<br/>
				��������ֵ����ʾ��ʱ��ִ��<br/>
		 * @return {int}  ����interval��timerId
		 */
		lazyApply: function(fun, thisObj, argArray, ims, checker) {
			checker = checker || function() {return true; };
			var timer = function() {
					var verdict = checker();
					if (verdict == 1) {
						fun.apply(thisObj, argArray || []);
					}
					if (verdict == 1 || verdict == -1) {
						clearInterval(timerId);
					}
				},
				timerId = setInterval(timer, ims);
			return timerId;
		}
	};


	QW.FunctionH = FunctionH;

}());