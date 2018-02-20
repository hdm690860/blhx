//图片预加载
(function($){

	function Perload(imgs,options){
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.options = $.extend({},Perload.DEFAULTS,options);
		this._unoredered();
	}
	Perload.DEFAULTS = {
		each:null, //加载一张图片进行什么动作
		all:null  //加载全部图片运行什么
	}
	Perload.prototype._unoredered = function(){
		var imgs = this.imgs;
		var count = 0
		var opts = this.options

		$.each(imgs,function(i,src){
			if(typeof src != "string") return
			imgobj = new Image();
			$(imgobj).on('load error',function(){
				opts.each && opts.each(count);
				if(count>= imgs.length-1){
					opts.all && opts.all()
				}
				count++
			})
			imgobj.src = src
		})
	}
	$.extend({
		preload : function(imgs,options){
			new Perload(imgs,options)
		}
	})
})(jQuery)