const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;
const RankingsSchema = new Schema({
	team: {
		type: Schema.Types.ObjectId,
		ref: 'Club'
	},
	season: Schema.Types.ObjectId,
	scores: [String]
});
mongoose.model('Ranking', RankingsSchema);	  