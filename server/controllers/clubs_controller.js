var mongoose = require('mongoose');
var Club = mongoose.model("Club");
exports.getAllClubs = function(req, res){
	const competition = req.query.competition;
	let query = {};
	if (competition === 'Champions League') {
		query = {'championsLeague': true};
	} else {
		query = {'league': 'Serie A', 'active': true};
	} 
	Club.find(query, function(err, clubs){
		if (err) {
			console.log(err);
			res.status(500).send("Couldn't get clubs");
		} else {			
			res.json(clubs);
		}
	})
}