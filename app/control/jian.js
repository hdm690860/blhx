var fs = require('fs')
var path = require('path')
var Jian = require('../models/jian.js')
var _ = require('underscore')
var Utility = require('../utility/utility.js')
var Comment = require('../models/comment.js')

//渲染wiki页面
exports.wiki = function(req,res){
  Jian.fetch(function(err,jians){
    if(err){
      console.log(err)
      //404页面待设计
      res.redirect('/404')
    }
    res.render('wiki',{
      title:"wiki",
      jians:jians
    })
  })
}
//录入页面渲染
exports.entering= function(req,res){
  res.render('entering',{
    title:'录入页面'
  })
}
//详情渲染页面
exports.detail = function(req,res){
  var id = req.params.id
  var q = req.query.q || 0
  var page = parseInt(q,10) || 0
  var pagecomment = 8
  var index = page * pagecomment
  var totalcomment 
  var totalpage
  
  
  if(id){
    Comment.find({jian:id},function(err,_comment){
      if(err){
        console.log(err)
        res.redirect('/404')
      }
       totalcomment = _comment.length
         totalpage =  Math.ceil(totalcomment / 5)
    }) 
    Jian.findById(id,function(err,jian){
      if(err){
        console.log(err)
        res.redirect('/404')
      }
      Comment.find({jian:id})
             .sort({'meta.updateAt':-1})
             .populate({
              path:'user',
              select:'name',
             })
             .limit(pagecomment)
             .skip(index)
             .exec(function(err,comments){
                res.render('detail',{
                  title:"detail",
                  jian:jian,
                  comments:comments,
                  currentPage:(page + 1),
                  totalpage:totalpage,
                  query:jian._id
                })
             })
    })

  }
  else{
    //404页面待设计
    res.redirect('/404')
  }
}
//图片异步上传
exports.savepic =function(req,res){
  var picData = req.files.uploadpic
  var picPath = picData.path
  var picoriginalFilename = picData.originalFilename
  if(picoriginalFilename){
    fs.readFile(picPath,function(err,data){
      if(err){console.log(err)}
      var timesmap = Date.now();
      var types=picData.name.split('.')
      var type=types[types.length-1]
      var picfile = types[0] + '_' + timesmap +'.' +type
      var newPath = path.join(__dirname,'../../public/images/uploadpic/full/'+picfile)
      fs.writeFile(newPath,data,function(err){
        if(err){console.log(err)}
        res.json({
          success:1,
          restext:"上传成功",
          path:'../public/images/uploadpic/full/'+picfile
        })
      })

    })
  }
  else{
    res.json({
      success:2,
      restext:"上传失败"
    })
  }
}
//录入页面
exports.jianupload = function(req,res){
  var jianObj = req.body.jian
  if(req.touxiang){
    jianObj.touxiang = req.touxiang
  }
  else {
    jianObj.touxiang = undefined
  }
  //jianObj.touxiang = jianObj.touxiang.length>0?jianObj.touxiang:null;
  jianObj.fullpic = jianObj.fullpic?jianObj.fullpic:undefined ;
  var skill = Utility.skill(jianObj)
    var _jian = new Jian({
      number:jianObj.number,
      name:jianObj.name,
      rarity:jianObj.rarity,
      style:jianObj.style,
      CV:jianObj.CV,
      painter:jianObj.painter,
      durable:jianObj.durable,
      armor:jianObj.armor,
      prime:jianObj.prime,
      shell:jianObj.shell,
      lighnting:jianObj.lighnting,
      motorized:jianObj.motorized,
      antiaircraft:jianObj.antiaircraft,
      airline:jianObj.airline,
      consume:jianObj.consume,
      build:jianObj.build,
      drop:jianObj.drop,
      skill:skill,
      fullpic:jianObj.fullpic,
      touxiang:jianObj.touxiang
    })
    _jian.save(function(err,jian){
      if(err){console.log(err)}
      console.log("新增jian：")
      console.log(jian)
      res.redirect('/detail/' + jian._id)
    })
}

//处理小图上千
exports.uptouxiang = function(req,res,next){
  var picData = req.files.touxiangup
  if (!picData.size === 0){
    console.log('跳过小图处理')
    next()
  }
  var picPath = picData.path
  var picoriginalFilename = picData.originalFilename
  if(picoriginalFilename){
    fs.readFile(picPath,function(err,data){
      if(err){
        console.log(err)
        res.redirect('/404')
      }
      var timesmap = Date.now();
      var types=picData.name.split('.')
      var type=types[types.length-1]
      var picfile = types[0] + '_' + timesmap +'.' +type
      var newPath = path.join(__dirname,'../../public/images/uploadpic/touxiang/'+picfile)
      fs.writeFile(newPath,data,function(err){
        if(err){
          console.log(err)
          res.redirect('/404')
        }
        req.touxiang = '../public/images/uploadpic/touxiang/'+picfile
        next()
      })

    })
  }
  else{
    next()
  }
}

//舰娘更新页面
exports.updata = function(req,res){
  var id = req.params.id
  //console.log(id)
  if (id){
    Jian.findById(id,function(err,jian){
      if(err){
        console.log(err)
      }
      for(var i=0;i<4;i++){
        if( !jian.skill[i]){
          jian.skill.push({
            name:'',
            main:''
          })
        }
      }
      //console.log(jian.skill)
      res.render('updataing',{
        title:'更新页面',
        jian:jian
      })
    })
  }
}
//舰娘更新页面处理
exports.updataing=function(req,res){
  var jiannew = req.body.jian
  console.log(jiannew)
  if(req.touxiang){
    jiannew.touxiang = req.touxiang
  }
  var id = jiannew.id
  var skill = Utility.skill(jiannew)
  Jian.findById(id,function(err,jian){
    if(err){console.log(err)}
      _jian = _.extendOwn(jian,jiannew)
      _jian.skill = skill
      _jian.save(function(err,jian){
        if(err){console.log(err)}
        res.redirect('/detail/' + jian._id)
      })
  })
}
//列表页面
exports.jianlist = function(req,res){
  Jian.fetch(function(err,jians){
    if(err){
      console.log(err)
      //404页面待设计
      res.redirect('/404')
    }
    res.render('jianlist',{
      title:'列表页面',
      jians:jians
    })
  })
}
exports.jiandelete = function(req,res){
  var id = req.query.id
  if(id){
    Jian.remove({_id:id},function(err,Jian){
      if(err){
        console.log(err)
        res.redirect('/404')
      }
      else{
        res.json({
          success:1
        })
      }
    })
  }
}