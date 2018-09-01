const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;
const PotSchema = new Schema({
	pot: Number,
	clubs: [{
		type: Schema.Types.ObjectId,
		ref: 'Club'
	}]
});
mongoose.model("Pot", PotSchema);