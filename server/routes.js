const express = require('express');
module.exports = function(app, upload) {
    app.use('/static', express.static('./static')).use('/lib', express.static('../lib')).use('/views', express.static('./views'));
    const videos = require('./controllers/videos_controller');
    const clubs = require('./controllers/clubs_controller');
    const players = require('./controllers/players_controller');
    const matches = require('./controllers/matches_controller');
    const pots = require('./controllers/pot_controller');
    const lineups = require('./controllers/lineups_controller');
    const rankings = require('./controllers/rankings_controller');
    const shooters = require('./controllers/shooters_controller');
    app.post('/api/videos', videos.addVideo);
    app.get('/api/videos', videos.getVideos);
    app.post('/api/files',upload.single('file'), videos.upload);
    app.get('/api/clubs', clubs.getAllClubs);
    app.get('/api/mates', players.getAllMates);
    app.get('/api/matches', matches.getAllMatches);
    app.get('/api/pots', pots.allPots);
    app.post('/api/matches', matches.addMatch);
    app.get('/api/lineups', lineups.allLineups);
    app.post('/api/lineups', lineups.addLineup);
    app.put('/api/lineups/:id', lineups.updateLineup);
    app.get('/api/rankings', rankings.getRankings);
    app.get('/api/shooters', shooters.getShooters);
    app.get('*', function(req, res){
    	res.sendFile(decodeURI(req.url), {root: __dirname+"/../"});
    });

}