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
}