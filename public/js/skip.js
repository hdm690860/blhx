$(function(){
	var m = 5
	var dingshi = setInterval(function(){
		$('.miao').text(m)
		m--
	},1000)
	var skip = setTimeout(function(){
		clearInterval(dingshi)
		window.location.href = '/signin'
	},6000)

})