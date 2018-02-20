$(function(){
	chooseooption('#rarity')
	chooseooption('#style')
})

function chooseooption(val_id){
	var $target = $(val_id)
	var $option = $(val_id + ' option')
	var default_val = $target.data('value')
	$option.each(function(index,optobj){
		var $this = $(optobj)
		if($this.attr('value') === default_val){
			$this.attr('selected','value')
		}
	})
}