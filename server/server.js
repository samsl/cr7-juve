var express = require('express');
var mongoose = require('mongoose');
const config = require('./config');
const db = mongoose.connect(config.db, { useNewUrlParser: true });
require('./models/video_model.js');
require('./models/club_model.js');
require('./models/player_model.js');
require('./models/match_model.js');
require('./models/pot_model.js');
require('./models/lineup_model.js');
require('./models/ranking_model.js');
require('./models/shooter_model.js');
require('./models/user_model.js');
require('./models/season_model.js');
require('./models/trophy_model.js');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/video/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
require('./routes')(app, upload);
const port = process.env.PORT || 9000;

app.listen(port);