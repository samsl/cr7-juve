const mongoose = require('mongoose'),
  Lineup = mongoose.model('Lineup'),
  Position = mongoose.model('Position');
exports.allLineups = function(req, res) {
  Lineup.find({}).populate({
    path: "lineups.player"
   
  }).exec((err, lineups) => {

    if (err) {
      res.status(500).send("err");
    } else {
      res.json(lineups);
    }
  })
}
exports.addLineup = function(req, res) {
  const positions = []
  req.body.lineups.forEach(l => {
    positions.push(new Position(l));
  });
  const lineup = new Lineup({
    name: req.body.name,
    lineups: positions
  })
  lineup.save(err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(lineup);
    }
  });
}
exports.updateLineup = function(req, res){
  const query = {'_id': req.params.id};
  const positions = []
  req.body.lineups.forEach(l => {
    positions.push(new Position(l));
  });
  Lineup.findOneAndUpdate(query, {name: req.body.name, lineups: positions}, {new: true}, function(err, lineup){
    res.json(lineup);
  })  
}
