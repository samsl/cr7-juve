var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var PlayerSchema = new Schema({
	name: String,
	number: Number,
	birth: Date,
	position: String,
	nationality: String,
	logo: String
});
mongoose.model("Player", PlayerSchema);