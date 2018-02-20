var _ = require('underscore')
var Jian = require('../models/jian.js')
var Utility = require('../utility/utility.js')

//搜索功能
exports.result = function(req,res){
	var search = req.query.search
	var searchisnum = Utility.isNum_search(search)
	if(searchisnum){
		var searchNum = parseInt(search,10)
		Jian.find({number:searchNum},function(err,jian){
			if(err){
				console.log(err)
				res.redirect('/404')
			}
			return res.render('search',{
					title:'搜索结果页面',
					jians:jian,
					search:search
					})
		})
	}
	var leixing = _.contains(['驱逐','轻巡','重巡','战列','战巡','航母','轻母'],search)
	if(leixing){
		Jian.find({style:search},function(err,jian){
			if(err){console.log(err)}
			return res.render('search',{
					title:'搜索结果页面',
					jians:jian,
					search:search
					})
		})
	}
	var raritybox=['白色','蓝色','紫色','金色']
	var rarityread=['bai','lan','zi','jin']
	var rarity = _.contains(raritybox,search)
	if(rarity){
		var index =_.indexOf(raritybox,search)
		var searchrarity = rarityread[index]
		Jian.find({rarity:searchrarity},function(err,jian){
			if(err){
				console.log(err)
				res.redirect('/404')
			}
			return res.render('search',{
					title:'搜索结果页面',
					jians:jian,
					search:search
					})
		})
	}
	if(!rarity && !leixing && !searchisnum){
	Jian.find({name:new RegExp(search + ".*",'i')},function(err,jian){
		if(err){
			console.log(err)
			res.redirect('/404')
		}
			return res.render('search',{
					title:'搜索结果页面',
					jians:jian,
					search:search
					})
	})
	}

}