function html(elem, html, loadScripts, callback){
// JavaScript Document
    var doc = document,docElem = doc.documentElement,
	    toString = Object.prototype.toString,
        //DOM = S.DOM, UA = S.UA, ie = UA.ie,

        //nodeTypeIs = DOM._nodeTypeIs,
        //isElementNode = DOM._isElementNode,
        //isKSNode = DOM._isKSNode,
        DIV = 'div',
        PARENT_NODE = 'parentNode',
        DEFAULT_DIV = doc.createElement(DIV),
		EMPTY = '',
        // #id or id
        RE_IDSTR = /^#?([\w-]+)$/,

        RE_TAG = /<(\w+)/,
        // Ref: http://jmrware.com/articles/2010/jqueryregex/jQueryRegexes.html#note_05
        RE_SCRIPT = /<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/ig,
        RE_SIMPLE_TAG = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        RE_SCRIPT_SRC = /\ssrc=(['"])(.*?)\1/i,
        RE_SCRIPT_CHARSET = /\scharset=(['"])(.*?)\1/i;

       function isString(o) {
            return toString.call(o) === '[object String]';
        };
		
       function isArray(o) {
            return toString.call(o) === '[object Array]';
       };
	   
       function isFunction(o) {
            //return typeof o === 'function';
            // Safari �£�typeof NodeList Ҳ���� function
            return toString.call(o) === '[object Function]';
        };

		// �� LiveNodeList �� array-like ����ת��Ϊ��ͨ����
		function slice2Arr(arr) {
			return Array.prototype.slice.call(arr);
		}
		// ie ��֧���� slice ת�� LiveNodeList, ��������ͨ����
		try {
			slice2Arr(docElem.childNodes);
		}
		catch(e) {
			slice2Arr = function(arr) {
				for (var ret = [], i = arr.length - 1; i >= 0; i--) {
					ret[i] = arr[i];
				}
				return ret;
			}
		}

       function makeArray(o) {
            if (o === null || o === undefined) return [];
            if (isArray(o)) return o;

            // The strings and functions also have 'length'
            if (typeof o.length !== 'number' || isString(o) || isFunction(o)) {
                return [o];
            }

            return slice2Arr(o);
        };
		
       function later(fn, when, periodic, o, data) {
            when = when || 0;
            o = o || { };
            var m = fn, d = makeArray(data), f, r;

            if (isString(fn)) {
                m = o[fn];
            }

            if (!m) {
                S.error('method undefined');
            }

            f = function() {
                m.apply(o, d);
            };

            r = (periodic) ? setInterval(f, when) : setTimeout(f, when);

            return {
                id: r,
                interval: periodic,
                cancel: function() {
                    if (this.interval) {
                        clearInterval(r);
                    } else {
                        clearTimeout(r);
                    }
                }
            };
        };

	 var POLL_INTERVAL = 40,POLL_RETRYS = 500;

     function available(id, fn) {
            id = (id + EMPTY).match(RE_IDSTR)[1];
            //if (!id || !S.isFunction(fn)) return;

            var retryCount = 1,

                timer = later(function() {
                    if (doc.getElementById(id) && (fn() || 1) || ++retryCount > POLL_RETRYS) {
                        timer.cancel();
                    }

                }, POLL_INTERVAL, true);
        };
       function guid(pre) {
            var id = guid++ + EMPTY;
            return pre ? pre + id : id;
        }

       function globalEval(data) {
		    var REG_NOT_WHITE = /\S/;
            if (data && REG_NOT_WHITE.test(data)) {
                // Inspired by code by Andrea Giammarchi
                // http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
                var head = doc.getElementsByTagName('head')[0] || docElem,
                    script = doc.createElement('script');

                // It works! All browsers support!
                script.text = data;
				

                // Use insertBefore instead of appendChild to circumvent an IE6 bug.
                // This arises when a base node is used.
                head.insertBefore(script, head.firstChild);
                head.removeChild(script);
            }
        };


    // ֱ��ͨ�� innerHTML ���� html
    function setHTMLSimple(elem, html) {
        html = (html + '').replace(RE_SCRIPT, ''); // ���˵����� script
        try {
            //if(UA.ie) {
            elem.innerHTML = html;
            //} else {
            // Ref:
            //  - http://blog.stevenlevithan.com/archives/faster-than-innerhtml
            //  - http://fins.javaeye.com/blog/183373
            //var tEl = elem.cloneNode(false);
            //tEl.innerHTML = html;
            //elem.parentNode.replaceChild(elem, tEl);
            // ע������ķ�ʽ�ᶪʧ�� elem ��ע����¼���������ﲻ�׵�
            //}
        }
            // table.innerHTML = html will throw error in ie.
        catch(ex) {
            // remove any remaining nodes
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
            }
            // html == '' ʱ�������� appendChild
            if (html) elem.appendChild(DOM.create(html));
        }
    }
	// ֱ��ͨ�� innerHTML ���� html

    function setHTML(elem, html, loadScripts, callback) {
        if (!loadScripts) {
            setHTMLSimple(elem, html);
            //S.isFunction(callback) && callback();
            return;
        }

        var id = guid('ks-tmp-'),
            re_script = new RegExp(RE_SCRIPT); // ��ֹ

        html += '<span id="' + id + '"></span>';

        // ȷ���ű�ִ��ʱ��������� DOM Ԫ���Ѿ�׼����
        available(id, function() {
            var hd=doc.getElementsByTagName('head')[0],
                match, attrs, srcMatch, charsetMatch,
                t, s, text;
                   //hd = S.get('head'),
            re_script.lastIndex = 0;
            while ((match = re_script.exec(html))) {
                attrs = match[1];
                srcMatch = attrs ? attrs.match(RE_SCRIPT_SRC) : false;
                // script via src
                if (srcMatch && srcMatch[2]) {
                    s = doc.createElement('script');
                    s.src = srcMatch[2];
                    // set charset
                    if ((charsetMatch = attrs.match(RE_SCRIPT_CHARSET)) && charsetMatch[2]) {
                        s.charset = charsetMatch[2];
                    }
                    s.async = true; // make sure async in gecko
                    hd.appendChild(s);
                }
                // inline script
                else if ((text = match[2]) && text.length > 0) {
                    globalEval(text);
                }
            }

            // ɾ��̽��ڵ�
            (t = doc.getElementById(id)) && t.parentNode.removeChild(t);

            // �ص�
            isFunction(callback) && callback();
        });

        setHTMLSimple(elem, html);
    }

	
	setHTML(elem, html, loadScripts, callback);
	
}