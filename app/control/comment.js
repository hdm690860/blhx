var Comment = require('../models/comment.js')
var User = require('../models/user.js')


//发表评论
exports.publish = function(req,res){
	var _comment = req.body.comment
	var commentnew
	if (_comment && _comment.content.length>0){
		commentnew = new Comment({
			jian:_comment.jian,
			user:_comment.user,
			content:_comment.content
		})
		commentnew.save(function(err,comment){
			if(err){console.log(err)}
			console.log(comment)
			User.findById(comment.user,function(err,user){
				if(err){
					console.log(err)
					res.redirect('/404')
				}
				res.json({
					success:1,
					comment:comment,
					name:user.name
			})
			})
		})
	}
}