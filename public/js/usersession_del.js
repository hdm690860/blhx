$(function(){
	$('#currenturl').val(window.location.href)
	$('#logout').on('click',function(e){
		e.preventDefault();
		$.ajax({
			type:'GET',
			url:'/user/logout',
		}).done(function(data){
			if(data.success === 1){
				var currenturl = window.location.href.split('?')[0]
				window.location.href = currenturl
			}
		})
	})
	//判断是否有滚动条
	var bodyh = $(document.body).height()
	var bodyscroll = $(document).scrollTop(); 
	var windowh = $(window).height(); 
	console.log(bodyh,bodyscroll,windowh)
	if(bodyh<windowh){
		$('.wikifooter').css({
			position:'absolute',
			bottom:0
		})
	}
})