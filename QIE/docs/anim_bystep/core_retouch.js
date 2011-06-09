(function() {
	var methodize = QW.HelperH.methodize,
		mix = QW.ObjectH.mix;
	/**
	 * @class Object ��չObject����ObjectH������Object���ر�˵����δ��Object.prototype����Ⱦ���Ա�֤Object.prototype�Ĵ�����
	 * @usehelper QW.ObjectH
	 */
	mix(Object, QW.ObjectH);

	/**
	 * @class Array ��չArray����ArrayH/HashsetH������Array
	 * @usehelper QW.ArrayH,QW.HashsetH
	 */
	mix(QW.ArrayH, QW.HashsetH);
	mix(Array, QW.ArrayH);
	mix(Array.prototype, methodize(QW.ArrayH));

	/**
	 * @class Function ��չFunction����FunctionH/ClassH������Function
	 * @usehelper QW.FunctionH
	 */
	mix(QW.FunctionH, QW.ClassH);
	mix(Function, QW.FunctionH);
	//	mix(Function.prototype, methodize(QW.FunctionH));

	/**
	 * @class Date ��չDate����DateH������Date
	 * @usehelper QW.DateH
	 */
	mix(Date, QW.DateH);
	mix(Date.prototype, methodize(QW.DateH));


	/**
	 * @class String ��չString����StringH������String
	 * @usehelper QW.StringH
	 */
	mix(String, QW.StringH);
	mix(String.prototype, methodize(QW.StringH));
}());