$(document).ready(function(){
	$('#uploadpic').on('change',function(e){
		var $warningup =$('.warningup')
		$warningup.text("")
	})
	$('.ajaxup').on('click',function(e){
		e.preventDefault();
		var $uppic =$('#uploadpic')
		var $warningup =$('.warningup')
		var picname = $uppic.val();
		var types=picname.toLowerCase().split('.')
		var type = types[types.length-1]
		var file = $uppic.get(0).files[0]
		var filesize =file? file.size:null
		var mixsize = 524228 * 2
		if(type != 'jpg' && type !="gif" && type !="png" && type !="jpeg" && type != "bmp"){
			$warningup.text("文件类型错误,请上传图片类型")
		}else if(filesize && parseInt(filesize)>=parseInt(mixsize)){
			$warningup.text("上传的文件不能超过1m")
		}
		else{
			var formData = new FormData($('#savepic')[0])
			$.ajax({
				url:"/savepic",
				type:'POST',
				cache:true,
				data:formData,
				async: false,    
	            contentType: false,    
	            processData: false, 
				success:function(data){
					console.log(data)
					$('.warningup').text(data.restext)
					if(data.success === 1){
						$("#upfinishpic").attr({
							'src':data.path
						})
						$('#fullpic').val(data.path);
					}
				}
			})
			
		}
	})
})