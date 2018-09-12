const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const ShooterSchema = new Schema({
  name: String,
  club: {
    type: Schema.Types.ObjectId,
    ref: 'Club'
  },
  leagueScores: [Number],
  eclScores:[Number],
  league: {
    type: String,
    enum: ["Serie A", "LaLiga", "Bundesliga", "Premier League"]
  }
});
mongoose.model("Shooter", ShooterSchema);
