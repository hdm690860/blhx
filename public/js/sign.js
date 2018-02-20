$(function(){
	$('#currenturl').val(window.location.href)
	$.ajax({
		type:"POST",
		url:'/index/session'
	}).done(function(data){
		console.log(data)
		if(data.success === 1){
			$(".user").html('<li><a href="" >欢迎您，' + data.name + '</a></li><li>|</li><li><a id="logout" href="" >退出</a></li>') 
			$('#logout').on('click',function(e){
				e.preventDefault();
				console.log('1')
				$.ajax({
					type:'GET',
					url:'/user/logout',
				}).done(function(data){
					if(data.success === 1){
						var currenturl = window.location.href
						window.location.href = currenturl
					}
				})
			})  
		}
	})
	
})
