var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comment.js')
var Comment = mongoose.model('comment',CommentSchema)

module.exports = Comment