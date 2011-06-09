/*
	Copyright (c) Baidu Youa Wed QWrap
	version: $version$ $release$ released
	author: ��Ӱ��JK
*/


/**
 * @class ObjectH ���Ķ���Object�ľ�̬��չ
 * @singleton
 * @namespace QW
 * @helper
 */

(function() {
	var encode4Js = QW.StringH.encode4Js;
	function getConstructorName(o) {
		return o != null && Object.prototype.toString.call(o).slice(8, -1);
	}
	var ObjectH = {

		/** 
		 * �ж�һ�������Ƿ���stringֵ��String����
		 * @method isString
		 * @static
		 * @param {any} obj Ŀ�����
		 * @returns {boolean} 
		 */
		isString: function(obj) {
			return getConstructorName(obj) == 'String';
		},

		/** 
		 * �ж�һ�������Ƿ���function����
		 * @method isFunction
		 * @static
		 * @param {any} obj Ŀ�����
		 * @returns {boolean} 
		 */
		isFunction: function(obj) {
			return getConstructorName(obj) == 'Function';
		},

		/** 
		 * �ж�һ�������Ƿ���Array����
		 * @method isArray
		 * @static
		 * @param {any} obj Ŀ�����
		 * @returns {boolean} 
		 */
		isArray: function(obj) {
			return getConstructorName(obj) == 'Array';
		},

		/** 
		 * �ж�һ�������Ƿ���typeof 'object'
		 * @method isObject
		 * @static
		 * @param {any} obj Ŀ�����
		 * @returns {boolean} 
		 */
		isObject: function(obj) {
			return obj !== null && typeof obj == 'object';
		},

		/** 
		 * �ж�һ�������Ƿ���Array���ͣ���:��length���Բ��Ҹ���������ֵ�Ķ���
		 * @method isArrayLike
		 * @static
		 * @param {any} obj Ŀ�����
		 * @returns {boolean} 
		 */
		isArrayLike: function(obj) {
			return !!obj && typeof obj == 'object' && obj.nodeType != 1 && typeof obj.length == 'number';
		},

		/** 
		 * �ж�һ��������constructor�Ƿ���Object��---ͨ���������ж�һ�������Ƿ���{}����new Object()�����Ķ���
		 * @method isPlainObject
		 * @static
		 * @param {any} obj Ŀ�����
		 * @returns {boolean} 
		 */
		isPlainObject: function(obj) {
			return !!obj && obj.constructor === Object;
		},

		/** 
		 * �ж�һ�������Ƿ���Wrap����
		 * @method isWrap
		 * @static
		 * @param {any} obj Ŀ�����
		 * @param {string} coreName (Optional) core����������Ĭ��Ϊ'core'
		 * @returns {boolean} 
		 */
		isWrap: function(obj, coreName) {
			return !!(obj && obj[coreName || 'core']);
		},

		/** 
		 * �ж�һ�������Ƿ���Html��ElementԪ��
		 * @method isElement
		 * @static
		 * @param {any} obj Ŀ�����
		 * @returns {boolean} 
		 */
		isElement: function(obj) {
			return !!obj && obj.nodeType == 1;
		},

		/** 
		 * Ϊһ�������������ԣ�֧���������ֵ��÷�ʽ:
		 set(obj, prop, value)
		 set(obj, propJson)
		 set(obj, props, values)
		 ---�ر�˵��propName����ĵ㣬�ᱻ�������ԵĲ��
		 * @method set
		 * @static
		 * @param {Object} obj Ŀ�����
		 * @param {string|Json|Array|setter} prop �����string,��������(�������������������ַ���,��"style.display")�������function����setter�����������Json����prop/value�ԣ���������飬��prop���飬�ڶ���������Ӧ��Ҳ��value����
		 * @param {any | Array} value ����ֵ
		 * @returns {Object} obj 
		 * @example 
		 var el={style:{},firstChild:{}};
		 set(el,"id","aaaa");
		 set(el,{className:"cn1", 
		 "style.display":"block",
		 "style.width":"8px"
		 });
		 */
		set: function(obj, prop, value) {
			if (ObjectH.isArray(prop)) {
				//set(obj, props, values)
				for (var i = 0; i < prop.length; i++) {
					ObjectH.set(obj, prop[i], value[i]);
				}
			} else if (typeof prop == 'object') {
				//set(obj, propJson)
				for (i in prop) {
					ObjectH.set(obj, i, prop[i]);
				}
			} else if (typeof prop == 'function') { //getter
				var args = [].slice.call(arguments, 1);
				args[0] = obj;
				prop.apply(null, args);
			} else {
				//set(obj, prop, value);
				var keys = prop.split(".");
				i = 0;
				for (var obj2 = obj, len = keys.length - 1; i < len; i++) {
					obj2 = obj2[keys[i]];
				}
				obj2[keys[i]] = value;
			}
			return obj;
		},

		/** 
		 * �õ�һ�������������ԣ�֧���������ֵ��÷�ʽ:
		 get(obj, prop) -> obj[prop]
		 get(obj, props) -> propValues
		 get(obj, propJson) -> propJson
		 * @method get
		 * @static
		 * @param {Object} obj Ŀ�����
		 * @param {string|Array|getter} prop �����string,��������(�������������������ַ���,��"style.display")�������function����getter�����������array���򵱻�ȡ�����������У�
		 �����Array����props����
		 * @param {boolean} nullSensitive �Ƿ���������쳣���С���������������м�Ϊ�գ��Ƿ��׳��쳣
		 * @returns {any|Array} ��������ֵ
		 * @example 
		 get(obj,"style"); //����obj["style"];
		 get(obj,"style.color"); //���� obj.style.color;
		 get(obj,"styleee.color"); //���� undefined;
		 get(obj,"styleee.color",true); //�׿�ָ���쳣����Ϊobj.styleee.color�����е�obj.styleeeΪ��;
		 get(obj,["id","style.color"]); //���� [obj.id, obj.style.color];
		 */
		get: function(obj, prop, nullSensitive) {
			if (ObjectH.isArray(prop)) { //get(obj, props)
				var ret = [],
					i;
				for (i = 0; i < prop.length; i++) {
					ret[i] = ObjectH.get(obj, prop[i], nullSensitive);
				}
			} else if (typeof prop == 'function') { //getter
				var args = [].slice.call(arguments, 1);
				args[0] = obj;
				return prop.apply(null, args);
			} else { //get(obj, prop)
				var keys = prop.split(".");
				ret = obj;
				for (i = 0; i < keys.length; i++) {
					if (!nullSensitive && ret == null) {return; }
					ret = ret[keys[i]];
				}
			}
			return ret;
		},

		/** 
		 * ��Դ��������Բ��뵽Ŀ�����
		 * @method mix
		 * @static
		 * @param {Object} des Ŀ�����
		 * @param {Object|Array} src Դ������������飬�����β���
		 * @param {boolean} override (Optional) �Ƿ񸲸���������
		 * @returns {Object} des
		 */
		mix: function(des, src, override) {
			if (ObjectH.isArray(src)) {
				for (var i = 0, len = src.length; i < len; i++) {
					ObjectH.mix(des, src[i], override);
				}
				return des;
			}
			for (i in src) {
				if (override || !(des[i] || (i in des))) {
					des[i] = src[i];
				}
			}
			return des;
		},

		/**
		 * <p>���һ���������������</p>
		 * <p><strong>������Ա�"."�ָ�����ȡ�����ε�����</strong>������:</p>
		 * <p>ObjectH.dump(o, "aa"); //�õ� {"aa": o.aa}</p>
		 * @method dump
		 * @static
		 * @param {Object} obj �������Ķ���
		 * @param {Array} props ����Ҫ�����Ƶ��������Ƶ�����
		 * @return {Object} ������dump�������ԵĶ��� 
		 */
		dump: function(obj, props) {
			var ret = {};
			for (var i = 0, len = props.length; i < len; i++) {
				if (i in props) {
					var key = props[i];
					ret[key] = obj[key];
				}
			}
			return ret;
		},
		/**
		 * �ڶ����е�ÿ��������������һ��������������������ֵ��Ϊ���Ե�ֵ��
		 * @method map
		 * @static
		 * @param {Object} obj �������Ķ���
		 * @param {function} fn ��������ÿ�����Ե����ӣ������ӵ���������������value-����ֵ��key-��������obj����ǰ����
		 * @param {Object} thisObj (Optional)��������ʱ��this
		 * @return {Object} ���ذ�������������������Լ������Ķ���
		 */
		map: function(obj, fn, thisObj) {
			var ret = {};
			for (var key in obj) {
				ret[key] = fn.call(thisObj, obj[key], key, obj);
			}
			return ret;
		},
		/**
		 * �õ�һ�����������п��Ա�ö�ٳ������Ե��б�
		 * @method keys
		 * @static
		 * @param {Object} obj �������Ķ���
		 * @return {Array} ���ذ�������������������Ե�����
		 */
		keys: function(obj) {
			var ret = [];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					ret.push(key);
				}
			}
			return ret;
		},

		/**
		 * ��keys/values����ķ�ʽ������Ե�һ������<br/>
		 * <strong>���values�ĳ��ȴ���keys�ĳ��ȣ������Ԫ�ؽ�������</strong>
		 * @method fromArray
		 * @static
		 * @param {Object} obj �������Ķ���
		 * @param {Array} keys ���key������
		 * @param {Array} values ���value������
		 * @return {Object} ������������ԵĶ���
		 */
		fromArray: function(obj, keys, values) {
			values = values || [];
			for (var i = 0, len = keys.length; i < len; i++) {
				obj[keys[i]] = values[i];
			}
			return obj;
		},

		/**
		 * �õ�һ�����������п��Ա�ö�ٳ�������ֵ���б�
		 * @method values
		 * @static
		 * @param {Object} obj �������Ķ���
		 * @return {Array} ���ذ��������������������ֵ������
		 */
		values: function(obj) {
			var ret = [];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					ret.push(obj[key]);
				}
			}
			return ret;
		},
		/**
		 * ��ĳ����Ϊԭ�ʹ���һ���µĶ��� ��by Ben Newman��
		 * @method create
		 * @static 
		 * @param {Object} proto ��Ϊԭ�͵Ķ���
		 * @param {Object} props (Optional) ��������
		 */
		create: function(proto, props) {
			var ctor = function(ps) {
				if (ps) {
					ObjectH.mix(this, ps, true);
				}
			};
			ctor.prototype = proto;
			return new ctor(props);
		},
		/** 
		 * ���л�һ������(ֻ���л�String,Number,Boolean,Date,Array,Json�������toJSON�����Ķ���,�����Ķ��󶼻ᱻ���л���null)
		 * @method stringify
		 * @static
		 * @param {Object} obj ��Ҫ���л���Json��Array�������������
		 * @returns {String} : �������л����
		 * @example 
		 var card={cardNo:"bbbb1234",history:[{date:"2008-09-16",count:120.0,isOut:true},1]};
		 alert(stringify(card));
		 */
		stringify: function(obj) {
			if (obj == null) {return null; }
			if (obj.toJSON) {
				obj = obj.toJSON();
			}
			var type = typeof obj;
			switch (type) {
			case 'string':
				return '"' + encode4Js(obj) + '"';
			case 'number':
			case 'boolean':
				return obj.toString();
			case 'object':
				if (obj instanceof Date) {return 'new Date(' + obj.getTime() + ')'; }
				if (obj instanceof Array) {
					var ar = [];
					for (var i = 0; i < obj.length; i++) {ar[i] = ObjectH.stringify(obj[i]); }
					return '[' + ar.join(',') + ']';
				}
				if (ObjectH.isPlainObject(obj)) {
					ar = [];
					for (i in obj) {
						ar.push('"' + encode4Js(i) + '":' + ObjectH.stringify(obj[i]));
					}
					return '{' + ar.join(',') + '}';
				}
			}
			return null; //�޷����л��ģ�����null;
		},

		/** 
		 * encodeURIһ��Json����
		 * @method encodeURIJson
		 * @static
		 * @param {Json} json  Json���ݣ�ֻ��һ��json��ÿһ����Ӧ��ֵ�������ַ������ַ�������
		 * @returns {string} : ���ر�encodeURI�����
		 */
		encodeURIJson: function(json){
			var s = [];
			for( var p in json ){
				if(json[p]==null) continue;
				if(json[p] instanceof Array)
				{
					for (var i=0;i<json[p].length;i++) s.push( encodeURIComponent(p) + '=' + encodeURIComponent(json[p][i]));
				}
				else
					s.push( encodeURIComponent(p) + '=' + encodeURIComponent(json[p]));
			}
			return s.join('&');
		}

	};

	QW.ObjectH = ObjectH;
}());