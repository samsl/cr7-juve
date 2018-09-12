const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;
const RankingsSchema = new Schema({
	team: {
		type: Schema.Types.ObjectId,
		ref: 'Club'
	},
	scores: [String]
});
mongoose.model('Ranking', RankingsSchema);	  