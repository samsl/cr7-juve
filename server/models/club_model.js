var mogoose = require('mongoose'),
	Schema = mogoose.Schema;
var ClubSchema = new Schema({
	name: String, 
	competition: {
		type: String, 
		enum: ["Serie A", "La Liga", "Bundesliga", "Premier League"]
	},
	logo: String,
	active: Boolean,
	championsLeague: Boolean
});
mogoose.model("Club", ClubSchema);