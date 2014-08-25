var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  id: Integer,
  titie: String,
  preview: String,
  body: String,
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);
