var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var VideoSchema = new Schema({
	title: String,
	date: Date,
	importance: {
		type: String,
		enum: ["LEAD", "EQUALIZER", "WINNING", "GOAL"]
	},
	shotType: {
		type: String,
		enum: ["KICK", "FREE-KICK", "PENALTY", "HEADER", "VOLLEY", "BACKHEEL"]
	},
	assist: {
		type: Schema.Types.ObjectId,
		ref: 'Player'
	},
	matchType: {
		type: String,
		enum: ["Serie A", "Champions League", "Others"]
	},
	opponent: {
		type: Schema.Types.ObjectId,
		ref: 'Club'
	},
	time: Number
});
mongoose.model("Video", VideoSchema);