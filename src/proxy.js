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

var gitProxy = function () {
};
_.extend(gitProxy, hooks);
gitProxy.prototype.running = 0;
gitProxy.prototype._repoQueue = [];
gitProxy.prototype._commitQueue = [];

var checker = function (queueName) {
    return function (next, user, callback) {
        var queue = this["_" + queueName];
        var args = Array.prototype.slice.call(arguments, 1);
        if (args[0])
            queue.push(args);
        if (this.running >= 3) {
            console.log("waiting for the free connection slots");
        } else if (!!queue.length) {
            var command = queue.shift();
            this.running += 1;
            next.apply(this, command);
            console.log("new thread started, number:", this._running);
        } else{
            console.log("no commands in the queue");
        }
    }
}

var postRunner = function (next, result) {
    this.running -= 1;
    this._getGitCommits();
    this._getGitRepos();
    console.log("run next");
    next(null, result);
}

gitProxy.prototype._getGitRepos = function (user, next) {
    github.repos.getFromUser({
        user: user,
        per_page: 100
    }, function (err, repos) {
        next(err, repos);
    });
}

gitProxy.prototype._getGitCommits = function (user, repo, next) {
    github.repos.getCommits({
        user: user,
        repo: repo,
        per_page: 100
    }, function (err, commits) {
        //callback(err, commits);
        next(err, commits);
    });
}

gitProxy.pre("_getGitRepos", checker("repoQueue"));

gitProxy.pre("_getGitCommits", checker("commitQueue"));

gitProxy.post("_getGitCommits", postRunner);

gitProxy.post("_getGitRepos", postRunner);

gitProxy.prototype.getRepos = function (user, callback) {
    var self = this;
    cacheManager.exists(user, function (err, isExists) {
        if (isExists) {
            cacheManager.get(user, callback);
            self._getGitRepos(user, function (err, repos) {
                cacheManager.store(user, repos, function () {
                });
            });
        } else {
            self._getGitRepos(user, function (err, repos) {
                cacheManager.store(user, repos, function () {
                });
                callback(repos);
            });
        }
    });
}

gitProxy.prototype.getCommits = function (user, repo, callback) {
    var key = user + repo;
    var self = this;
    cacheManager.exists(key, function (err, isExists) {
        if (isExists){
            cacheManager.get(key, callback);
            self._getGitCommits(user, repo, function (err, commits) {
                cacheManager.store(key, commits, function () {
                });
            });
        } else {
            self._getGitCommits(user, repo, function (err, commits) {
                cacheManager.store(key, commits, function () {
                });
                callback(commits);
            });
        }
    });
}

module.exports = new gitProxy();
