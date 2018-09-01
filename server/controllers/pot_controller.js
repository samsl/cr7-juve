const mongoose = require('mongoose'),
	  Pot = mongoose.model("Pot");
exports.allPots = function(req, res){
	Pot.find({}).populate("clubs").sort("pot").exec((err, pots) =>{
		if (err) {
			return res.status(500).send(err);
		} 
		return res.json(pots);
		
	});
}