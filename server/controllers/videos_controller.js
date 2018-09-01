var mongoose = require('mongoose');
var Video = mongoose.model('Video');
exports.getVideos = function(req, res) {
	Video.find({}).populate('opponent assist').exec(function(err, videos){
		res.json(videos);
	});

};
exports.addVideo = function(req, res) {
	var video = new Video(req.body);
	video.save(function(err) {
		if (err) {
			return res.status(500).send(err);
		}
		return res.status(200).send(video);
	});
};
exports.upload = function(req, res) {
	res.send({ret_code: '0'});
};