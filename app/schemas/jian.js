var mongoose = require('mongoose')
var Schema = mongoose.Schema

var JianSchema = new Schema({
	number:{
		type:Number,
		default:0
	},
	name:String,
	rarity:String,
	style:String,
	CV:{
		type:String,
		default:'-'
	},
	painter:{
		type:String,
		default:'-'
	},
	durable:{
		type:String,
		default:'0'
	},
	armor:String,
	prime:String,
	shell:String,
	lighnting:String,
	motorized:String,
	antiaircraft:String,
	airline:String,
	consume:String,
	build:String,
	drop:String,
	skill:[{
		name:String,
		main:String
	}],
	fullpic:{
		type:String,
		default:'../public/images/detail/default.jpg'
	},
	touxiang:{
		type:String,
		default:'../public/images/wiki/touxiang_default.jpg'
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

JianSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}
	next();
})

JianSchema.statics ={
	fetch:function(cb){
		return this
				.find({})
				.sort('meta.updateAt')
				.exec(cb)
	},
	findById:function(id,cb){
		return this
				.findOne({_id:id})
				.exec(cb)
	}
}

module.exports = JianSchema