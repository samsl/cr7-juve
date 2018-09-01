var mongoose = require('mongoose'),
	Match = mongoose.model('Match');
exports.addMatch = function(req, res){
	var match = new Match(req.body);
	match.save(err => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(match);
		}
	});
};
exports.getAllMatches = function(req, res){
	Match.find({}).populate("home away").sort('date').exec((err, matches)=>{
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(matches);
		}
	})
};