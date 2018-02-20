$(function(){
	$('#reply').on('click',function(e){
		e.preventDefault();
		var formdata =  new FormData($('#comment')[0])
		$.ajax({
			type:'POST',
			url:'/comment',
			data:formdata,
			contentType: false,    
	        processData: false,
		}).done(function(data){
			if(data.success === 1){
				console.log(data)
				$('.commenttext').val('')
				var time = data.comment.meta.updateAt.split('T')[0]
				comments(data.name,data.comment.content,time)
			}
		})
	})
})

var comments = function(name,content,time){
	var li = $('<li>')
	  li.prependTo($('#comment-list'))
	  $('<h3>',{
	    class:'username',
	    text:name
	  }).appendTo(li)
	  $('<p>',{
	    class:'text-muted commentcontent',
	    text:content
	  }).appendTo(li)
	  $('<em>',{
	    class:'time',
	    text:'时间：' + time
	  }).appendTo(li)
}