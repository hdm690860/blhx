var mongoose = require('mongoose')
var JianSchema = require('../schemas/jian.js')
var Jian = mongoose.model('Jian',JianSchema)

module.exports = Jian