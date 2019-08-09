var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
	Match = mongoose.model('Trophy');

exports.getAllThrophies = function(req, res){	
	Match.find({}).exec((err, throphies)=>{
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(throphies);
		}
	})
};
