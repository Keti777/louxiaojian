//ȫ�ֱ���
Entry.gvar = {};
//��΢��ctrl+enter
App.ctrlenterSubmit($('#new_entry'),function(){$('#submit_btn').click();});
//ת��ctrl+enter
App.ctrlenterSubmit($('#re_post'),function(){$('#pps_dialog a.but').click();});
//�Ƽ�ctrl+enter
App.ctrlenterSubmit($('#tj_entry'),function(){$('#tj_submit_btn').click();});



Entry.getCookie = function(n){
	return $.cookie(n)!=null?$.cookie(n):'';
};
Entry.setCookie = function(n,s){
	$.cookie(n,s,{path: '/',expires:1,domain: 'pps.tv'});
};






jQuery(function($){
	var new_entry = $('#new_entry');


	
	new_entry.live('keydown keyup click',function(e){
		Entry.fansTip(e,$(this));
	}).live('blur',function(){
		Entry.setCookie('cash_input',$(this).val().trim());
	}).keyup();




});