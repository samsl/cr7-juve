const mongoose = require('mongoose'),
  Ranking = mongoose.model('Ranking');
exports.getRankings = function(req, res) {
  Ranking.find({}).populate('team').exec((err, rankings) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const datas = [];
      rankings.forEach(r => {
        let p = w = d = l = gd = pts = 0;
        r.scores.forEach(s => {
          p++;
          goals = s.split(":");
          gd += goals[0] - goals[1];
          if (goals[0] > goals[1]) {
            w++;
            pts += 3;
          } else if (goals[0] == goals[1]) {
            d++;
            pts += 1;
          } else {
            l++;
          }
        });
        datas.push({
          team: r.team,
          p: p,
          w: w,
          d: d,
          l: l,
          gd: gd,
          pts: pts

        });
      });
      datas.sort((a, b) =>{
      	if (a.pts > b.pts) return -1;
      	else if (a.pts < b.pts) return 1;
      	else {
      		if (a.gd > b.gd) return -1;
      		else if (a.gd < b.gd) return 1;
      		else return 0;
      	}
      });
      res.json(datas);
    }
  })
};
exports.addResult = function(req, res){
  const query = {'team': req.params.id};
  console.log(req.body.score);
  Ranking.findOneAndUpdate(query, {$push:{scores: req.body.score}}, {new:true}, function(err, ranking){
    if(err){
      res.status(500).send(err);
    } else {
      res.json(ranking);
    }
  })
}
