const mongoose = require('mongoose'),	
	Schema = mongoose.Schema;
const SeasonSchema = new Schema({
	name: String,
	current: Boolean
});
const User = mongoose.model('Season', SeasonSchema);
