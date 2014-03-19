/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var gitProxy = require('./proxy');
var app = express();
var _ = require("lodash");


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express['static'](path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, text) {
        res.send(text);
    });
});
app.get('/api/:user', function(req, res){
    var user = req.params.user;
    gitProxy.getRepos(user, function(repos) {
        repos = _.map(repos, function(model){
            return {
                name: model.name,
                full_name: model.full_name
            }
        })
        res.json(repos);
    });
});

app.get('/api/:user/:repo', function(req, res){
    var user = req.params.user;
    var repo = req.params.repo;
    gitProxy.getCommits(user, repo, function(commits) {
        commits = _.map(commits, function(model){
            return {
                message: model.commit.message,
                gravatar_id: (model.author) ? model.author.gravatar_id: "",
                name: model.commit.author.name,
                date: model.commit.author.date
            }
        })
        res.json(commits);
    });
});
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});