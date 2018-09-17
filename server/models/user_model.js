const mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	Schema = mongoose.Schema;
const UserSchema = new Schema({
	username: String,
	password: String
});
UserSchema.pre('save', function(next) {
	const user = this;
	console.log(this);
	bcrypt.hash(user.password, 10, (err, hash)=>{
		if (err){
		return next(err);
		}
		user.password = hash;
		next();
	})	
});
const User = mongoose.model('User', UserSchema);
