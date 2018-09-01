var mongoose = require('mongoose'),
	Player = mongoose.model("Player");
exports.getAllMates = function(req, res) {
	
	Player.find({}).sort("number").exec((err, players)=>{
		if (err) {
			res.status(500).send("Couldn't get players");
		} else {
			res.json(players);
		}
	})
}