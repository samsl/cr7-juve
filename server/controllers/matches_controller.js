var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
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
	const season = req.query.season;
	Match.find({"season": new ObjectId(season)}).populate("home away").sort('date').exec((err, matches)=>{
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(matches);
		}
	})
};
exports.updateMatch = function(req, res){
	const query = {'_id': req.params.id};
	Match.findOneAndUpdate(query, req.body, {new:true}, function(err,match){
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(match);
		}
	})
}