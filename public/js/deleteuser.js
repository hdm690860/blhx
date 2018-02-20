$(function(){
	$('.del').on('click',function(e){
		var target =$(e.target) 
		var id  = target.data('id')
		var tr = $('.item-id-'+ id)
		console.log(id)
		$.ajax({
			type:'delete',
			url:'/userlist/delete?id=' + id
		}).done(function(data){
			if(data.success===1){
				if(tr.length>0){
					tr.remove();
				}
			}
		})
	})
})