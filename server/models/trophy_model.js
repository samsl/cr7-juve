const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const TrophySchema = new Schema({
  type: {
    type: String, 
    enum: ["Serie A", "Champions League", "Coppa Italia", "Supercoppa"]
},
  season: {
    type: Schema.Types.ObjectId    
  }
  
});
mongoose.model("Trophy", TrophySchema);
