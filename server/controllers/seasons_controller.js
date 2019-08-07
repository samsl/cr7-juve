var mongoose = require('mongoose');
var Season = mongoose.model("Season");
exports.getAllSeasons = function(req, res){	
	Season.find({}, function(err, seasons){
		if (err) {
			console.log(err);
			res.status(500).send("Couldn't get seasons");
		} else {			
			res.json(seasons);
		}
	})
}