      function add(name, fn, config) {
            var self = this, mods = self.Env.mods, mod, o;

            // S.add(name, config) => S.add( { name: config } )
            if (S.isString(name) && !config && S.isPlainObject(fn)) {
                o = { };
                o[name] = fn;
                name = o;
            }

            // S.add( { name: config } )
            if (S.isPlainObject(name)) {
                S.each(name, function(v, k) {
                    v.name = k;
                    if (mods[k]) mix(v, mods[k], false); // ����֮ǰ��ӵ�����
                });
                mix(mods, name);
            }
            // S.add(name[, fn[, config]])
            else {
                config = config || { };

                mod = mods[name] || { };
                name = config.host || mod.host || name;
                mod = mods[name] || { };

                // ע�⣺ͨ�� S.add(name[, fn[, config]]) ע��Ĵ��룬������ҳ���еĴ��룬��
                //      �� js �ļ���Ĵ��룬add ִ��ʱ������ζ�Ÿ�ģ���Ѿ� LOADED
                mix(mod, { name: name, status: LOADED });
                if (!mod.fns) mod.fns = [];
                fn && mod.fns.push(fn);
                mix((mods[name] = mod), config);

                // ���� requires ���� attached ��ģ�飬���� core �е�ģ�飬ֱ�� attach
                if ((mod['attach'] !== false) && self.__isAttached(mod.requires)) {
                    self.__attachMod(mod);
                }
            }

            return self;
    };

    mix(S, {

        /**
         * The version of the library.
         * @type {String}
         */
        version: '1.1.5',

        /**
         * Initializes KISSY object.
         */
        __init: function() {
            // ������Ϣ
            this.Env = {
                mods: { }, // ����ģ���б�
                _loadQueue: { } // ���ص�ģ����Ϣ
            };

            // �ӵ�ǰ�����ļ�·������ȡ base
            var scripts = doc.getElementsByTagName('script'),
                currentScript = scripts[scripts.length - 1],
                base = currentScript.src.replace(/^(.*)(seed|kissy).*$/i, '$1');
            
            // ������Ϣ
            this.Config = {
                debug: '@DEBUG@', // build ʱ���Ὣ @DEBUG@ �滻Ϊ��
                base: base,
                timeout: 10   // getScript ��Ĭ�� timeout ʱ��
            };
        }
	 }
	 
   )
