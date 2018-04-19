var cors = require('cors');
var mongoose = require('mongoose');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index'); // home page
var tasks = require('./routes/tasks'); // api for mongodb conection
Grid = require('mongodb').Grid
var Grid = require('gridfs-stream');

var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '424094',
    key: '8da7bb601e3e1a0400e1',
    secret: 'bf1db406367b5c2eb029',
    cluster: 'us2',
    encrypted: true
});

var searchElement = "";
var collection = "";

searchElement = "battle";

var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;
var user = encodeURIComponent('ogkranthi');
var password = encodeURIComponent('kranthi1');
var url = format('mongodb://%s:%s@ds243345.mlab.com:43345/got', user, password);
MongoClient.connect(url, function(err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
        app.get('/character/:name', (req, res) => {
            var name = req.params.name;
            db.collection('character').find({ name: new RegExp(name, 'i') }).toArray(function(err, record) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(record);
                }
            });
        });

        app.get('/battle/:bat', (req, res) => {
            // const details = { 'name': name };
            var par = req.params.bat;
            console.log(par);
            db.collection('battle').find({ name: new RegExp(par, 'i') }).toArray(function(err, record) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(record);
                }
            });
        });

        //For commenting
        app.post('/comment', function(req, res) {
            console.log("Commented");
            console.log(req.body);
            var newComment = {
                name: req.body.name,
                email: req.body.email,
                comment: req.body.comment,
                battle: req.body.battle
            }
            pusher.trigger('flash-comments', 'new_comment', newComment);
            res.json({ created: true });
            console.log("battle name " + req.body.battle);
            db.collection('battle').update({ name: req.body.battle }, // query
                { $push: { comments: { name: req.body.name, email: req.body.email, comment: req.body.comment } } }, // replacement, replaces only the field "hi"
                { upsert: true }, // options
                function(err, object) {
                    if (err) {
                        console.warn(err.message); // returns error if no matching object found
                    } else {
                        console.dir(object);
                    }
                });

        });
    }

});



var port = 3000;
const HOST = '0.0.0.0';

function searchBattle(bat) {

    console.log("Battle You searched for:" + bat);
}

var app = express();
app.use(cors({ origin: 'http://129.156.117.66:9000' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use(cors());
app.use('/api', tasks);

app.listen(port, HOST);
console.log(`Running on http://${HOST}:${port}`);