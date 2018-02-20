var User = require('../models/User.js')
var _ = require('underscore')


//用户列表
exports.userlist =function(req,res){
	User.fetch(function(err,users){
		if(err){console.log(err)}
			res.render('userlist',{
				title:'用户列表',
				users:users
			})
	})
}
//用户注册
exports.signup = function(req,res){
	var user = req.body.user
	var name = user.name
	var password = user.password
	var _user
	User.findOne({name:name},function(err,user){
		if(err){console.log(err)}
			console.log(user)
			if(user){
				console.log('用户已经存在')
				return res.redirect('/neetsignin/' + '用户已经存在')
			}
			else{
				_user = new User({
					name:name,
					password:password,
					role:0
				})
				_user.save(function(err,user){
					res.redirect('/signin')
				})
			}
	})
}
//用户登录
exports.signin = function(req,res){
	if(!req.session.user){
		var _user = req.body.user
		var currenturl = _user.currenturl || '/'
		console.log(req.path)
		var password = _user.password
		User.findOne({name:_user.name},function(err,user){
			if(err){console.log(err)}
			if(!user){
				console.log('用户不存在')
				return res.redirect('/neetsignin/' + '用户不存在')
			}
			
			user.comparepassword(password,function(err,isMatch){
				console.log(_user.password)
				console.log(isMatch)
				if(err){console.log(err)}
				if(isMatch){
					console.log('密码正确')
					req.session.user = user
					res.redirect(currenturl)
				}
				else{
					console.log('密码不正确')
					return res.redirect('/neetsignin/' + '密码不正确')
				}
			})
			
		})
	}else{
		console.log('您已经登录了，请不要重复登录')
		return res.redirect('/neetsignin/' + '您已经登录了，请不要重复登录')
	}
}
//退出登录
exports.logout = function(req,res){
	delete req.session.user
	//res.redirect('/wiki/userlist')
	if(!req.session.user){
		res.json({
			success:1
		})
	}
}
//首页登录处理
exports.indexsession = function(req,res){
	if(req.session.user){
		res.json({
			success:1,
			name:req.session.user.name
		})
	}
	else{
		res.json({
			success:2
		})
	}
}
//登录页面渲染
exports.signinpage = function(req,res){
	res.render('signinpage',{
		title:'登录页面'
	})
}
//注册页面渲染
exports.signuppage = function(req,res){
	res.render('signuppage',{
		title:'注册页面'
	})
}
//修改权限页面
exports.chanagerole = function(req,res){
	var id = req.params.id
	if (id){
		User.findById(id,function(err,user){
			if(err){
				console.log(err)
				res.redirect('/404')
			}
			res.render('chanagerole',{
				title:'权限修改',
				user:user
			})
		})
	}
}
//修改权限处理
exports.chanagenew = function(req,res){
	var _user = req.body.user
	var usernew
	console.log(_user)
	User.update({_id:_user.id},{role:_user.role},function(err,ress){
		if(err){console.log(err)}
		if(ress){console.log(ress)}
		res.redirect('..' + '/wiki/userlist')
	})
}
//登录需求
exports.userrequire = function(req,res,next){
	if (req.session.user){
		return next()
	}
	else{
		console.log('需要登录')
		res.redirect('/neetsignin/' + '需要登录')
	}
}
//管理员用户需要
exports.adminrequire = function(req,res,next){
	var user = req.session.user
	if (user.role >= 10){
		return next()
	}
	else{
		console.log('你所在的用户权限不能访问当前页面')
		res.redirect('/neetsignin/' + '你所在的用户权限不能访问当前页面')
	}
}
//删除用户
exports.userdelete = function(req,res){
  var id = req.query.id
  if(id){
    User.remove({_id:id},function(err,user){
      if(err){
        console.log(err)
      }
      else{
        res.json({
          success:1
        })
      }
    })
  }
}
//需要登录页面跳转
exports.neetsignin = function(req,res){
	var content = req.params.content
	res.render('neetsignin',{
		title:"",
		content:content
	})
}