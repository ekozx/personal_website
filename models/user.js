var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

accountSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
