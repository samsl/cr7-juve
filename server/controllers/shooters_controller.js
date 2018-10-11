const mongoose = require('mongoose'),
	  Shooter = mongoose.model('Shooter');
exports.getShooters = function(req, res){
	Shooter.find({}).populate('club').exec((err, shooters)=>{
		if (err){
			res.status(500).send(err);
		} else {
			const datas = [];
			shooters.forEach(s=>{
				let leagueAppearances = leagueGoals = 0;
				s.leagueScores.forEach(score=>{
					leagueAppearances++;
					leagueGoals += score;
				});
				let eclAppearances = eclGoals = 0;
				s.eclScores.forEach(score=>{
					eclAppearances++;
					eclGoals += score;
				});
				datas.push({
					name: s.name,
					club: s.club,
					league: s.league,
					appearances: [leagueAppearances, eclAppearances],
					goals: [leagueGoals, eclGoals]				

				})
			});
			
			res.json(datas);
		}
	})
};
exports.goal = function(req, res){
	name = req.params.name;
	goals = req.body.score;
	type = req.body.type;
	update = {}
	if (type === 'l') {
		update = {$push: {leagueScores: goals}};
	}
	else if (type === 'c') {
		update = {$push: {eclScores: goals}};
	} else {
		res.status(500).send("Unsupported Type");
		return
	}
	query = {'name': name}
	Shooter.findOneAndUpdate(query, update, {new: true}, function(err, shooter){
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(shooter);
		}
	})
}