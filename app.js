var express = require('express')
var port = process.env.PORT || 4000
var app = express()
var serveStatic = require('serve-static')
var path = require('path')
var multiparty = require('connect-multiparty')
var fs = require('fs')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var _ = require('underscore')
var Jian = require('./app/models/jian.js')
var Utility = require('./app/utility/utility.js')
var Jians = require('./app/control/jian.js')
var User = require('./app/control/user.js')
var Comment = require('./app/control/comment.js')
var Search = require('./app/control/search.js')
var Other= require('./app/control/other.js')
var logger = require('morgan')

var session = require('express-session')
var mongoStore = require('connect-mongo')(session)

var dbUrl = 'mongodb://localhost:27017/blhx'
mongoose.connect(dbUrl)

app.listen(port)
app.set('views','./view/pages')
app.set('view engine','jade')
app.use(bodyParser.urlencoded({extended:true}))
app.use(multiparty())
app.use(serveStatic(__dirname))
app.locals.moment = require('moment')
app.use(session({
	secret:'bilan',
	resave:false,
	saveUninitialized:true,
	store:new mongoStore({
		url:dbUrl,
		collection:'session'
	})
}))
app.use(function(req,res,next){
	var _user = req.session.user
	//console.log(req.session)
	app.locals.user = _user
	next()
})

if('development' === app.get('env')){
	app.set('showStackError',true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug',true)
}

console.log('success')

//首页
app.get('',function(req,res){
	res.sendFile( __dirname + "/" + "index.html")
})
//wiki页渲染
app.get('/wiki',Jians.wiki)
//录入页面
app.get('/wiki/entering',User.userrequire,User.adminrequire,Jians.entering)
//异步全身图上传
app.post('/savepic',Jians.savepic)
//舰娘录入
app.post('/wiki/upload',User.userrequire,User.adminrequire,Jians.uptouxiang,Jians.jianupload)
//舰娘更新页面
app.get('/updata/:id',Jians.updata)
//舰娘更新页面处理
app.post('/wiki/updata',User.userrequire,User.adminrequire,Jians.uptouxiang,Jians.updataing)
//详情渲染页面
app.get('/detail/:id',Jians.detail)
//舰娘列表页面
app.get('/wiki/list',User.userrequire,User.adminrequire,Jians.jianlist)
//异步删除j舰娘列表
app.delete('/list/delete',Jians.jiandelete)


//用户列表
app.get('/wiki/userlist',User.userrequire,User.adminrequire,User.userlist)
//用户注册
app.post('/user/signup',User.signup)
//用户登录
app.post('/user/signin',User.signin)
//退出登录
app.get('/user/logout',User.logout)
//首页登录处理
app.post('/index/session',User.indexsession)
//登录页面渲染
app.get('/signin',User.signinpage)
//注册页面渲染
app.get('/signup',User.signuppage)
//修改权限页面
app.get('/user/:id',User.chanagerole)
//修改权限处理
app.post('/user/chanage',User.userrequire,User.adminrequire,User.chanagenew)
//删除用户
app.delete('/userlist/delete',User.userdelete)
//需要登录页面跳转
app.get('/neetsignin/:content',User.neetsignin)


//发表评论
app.post('/comment',Comment.publish)
//搜索功能
app.get('/search',Search.result)

//404页面
app.get('/404',Other.nofound)