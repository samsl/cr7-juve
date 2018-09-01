const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;
const PositionSchema = new Schema({
	player: {
		type: Schema.Types.ObjectId,
		ref: 'Player'
	},
	top: String,
	left: String
});
const LineupSchema = new Schema({
	name: String,
	lineups:[PositionSchema]
})
mongoose.model("Position", PositionSchema);
mongoose.model("Lineup", LineupSchema);