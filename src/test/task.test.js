var assert = require("assert"),
    mockRequests = require('./mockRequests'),
    _ = require("lodash"),
    gitProxy = require("../proxy"),
    commitList = require('./testCommitList'),
    repoList = require('./testRepoList');

var mock = mockRequests();
describe('joyent', function (){
    it("get right count of repos", function(next){
        gitProxy.getRepos("joyent", function(repos){
            assert.equal(repos.length, repoList.length);
            next();
        });
    })
    it("get right count of commits", function(next){
        gitProxy.getCommits("joyent", "node", function(commits){
            assert.equal(commits.length, commitList.length);
            next();
        });
    })
    it("no more than 3 requests in parallel", function(next){
        var completed = 0;
        var functionPool = [
            function(){
                gitProxy.getCommits("joyent", "node", function(commits){
                    assert.ok(mock.pendingMocks().length<4)
                    completed++;
                    if(completed==100) next();
                });
            },
            function(){
                gitProxy.getRepos("joyent", function(repos){
                    assert.ok(mock.pendingMocks().length<4)
                    completed++;
                    if(completed==100) next();
                });
            }
        ]

        for(var i=0; i<100; i++){
            assert.ok(mock.pendingMocks().length<4)
            var rand = Math.round(Math.random());
            functionPool[rand]();
        }
    })
});
