var GitHubApi = require("github");
var cacheManager = require("./cacheManager");
var _ = require("lodash");
var hooks = require("hooks");

var github = new GitHubApi({
    version: "3.0.0",
    debug: true,
    protocol: "https",
    host: "api.github.com",
    timeout: 5000
});

var gitProxy = function(){};
_.extend(gitProxy, hooks);
gitProxy.prototype._running = 0;
gitProxy.prototype._repoQueue = [];
gitProxy.prototype._commitQueue = [];

var checker = function(queueName){
    return function(next, user, callback){
        var queue = this["_"+queueName];
        var args = Array.prototype.slice.call(arguments, 1);
        if(args[0])
            queue.push(args);
        if (this._running>=3){
            console.log("waiting for the free connection slots");
        } else if(!!queue.length){
            next();
            this._running += 1;
        } else
            console.log("no commands in the queue");
    }
}

var postRunner = function(next){
    console.log("running was", this._running);
    this._running -= 1;
    console.log("running become", this._running);
    this._getGitCommits();
    this._getGitRepos();
    next();
}

gitProxy.prototype._getGitRepos = function(user, next){
        console.log(arguments);
        var command = this._repoQueue.shift();
        var user = command[0],
            callback = command[1];
        github.repos.getFromUser({
            user: user
        }, function(err, repos){
            callback(err, repos);
            next()
        });
}

gitProxy.pre("_getGitRepos", checker("repoQueue"));

gitProxy.post("_getGitRepos", postRunner);

gitProxy.prototype._getGitCommits = function(user, repo, next){
    console.log(arguments);
    var command = this._commitQueue.shift();
    var user = command[0],
        repo = command[1],
        callback = command[2];

    github.repos.getCommits({
        user: user,
        repo: repo
    }, function(err, commits){
        callback(err, commits);
        next()
    });
}

gitProxy.pre("_getGitCommits", checker("commitQueue"));

gitProxy.post("_getGitCommits", postRunner);

gitProxy.prototype.getRepos = function(user, callback){
    var self = this;
    cacheManager.exists(user, function(err, isExists){
        if (isExists){
            cacheManager.get(user,callback);
            self._getGitRepos(user, function(err, repos){
                cacheManager.store(user, repos, function(){});
            });
        }else{
            self._getGitRepos(user, function(err, repos){
                cacheManager.store(user, repos, function(){});
                callback(repos);
            });
        }
    });
}

gitProxy.prototype.getCommits = function(user, repo, callback){
    var key = user+repo;
    var self = this;
    cacheManager.exists(key, function(err, isExists){
        if (isExists)
            cacheManager.get(key,callback);
        else{
            self._getGitCommits(user,repo,function(err, commits){
                cacheManager.store(key, commits, function(){});
                callback(commits);
            });
        }
    });
}

module.exports = new gitProxy();
