var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var MatchSchema = new Schema({
	date: Date,
	home: {		
		type: Schema.Types.ObjectId,
		ref: "Club"
	},
	away: {		
		type: Schema.Types.ObjectId,
		ref: "Club"
	},
	season: {
		type: Schema.Types.ObjectId
	},
	matchType: {
		type: String, 
		enum: ["Serie A", "Champions League", "Coppa Italia", "Supercoppa"]
	},
	result: [Number]
});
mongoose.model("Match", MatchSchema);