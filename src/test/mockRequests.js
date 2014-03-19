var nock = require("nock"),
    cacheManager = require("../cacheManager"),
    commitList = require('./testCommitList'),
    repoList = require('./testRepoList');

module.exports = function () {
    cacheManager.exists = function(key, cb){cb(null, false)}
    return githubRepos = nock('https://api.github.com:443')
        .persist()
        .get('/users/joyent/repos?per_page=100')
        .delay(2000)
        .reply(200, repoList, {"server": "GitHub.com", "date": "Wed, 19 Mar 2014 17:21:57 GMT", "content-type": "application/json; charset=utf-8", "status": "200 OK", "x-ratelimit-limit": "60", "x-ratelimit-remaining": "29", "x-ratelimit-reset": "1395252537", "cache-control": "public, max-age=60, s-maxage=60", "etag": "\"e617c11c48531205ca6aa5acfe6fc5fa\"", "vary": "Accept", "x-github-media-type": "github.beta; format=json", "link": "<https://api.github.com/user/10161/repos?page=2>; rel=\"next\", <https://api.github.com/user/10161/repos?page=4>; rel=\"last\"", "x-content-type-options": "nosniff", "content-length": "135872", "access-control-allow-credentials": "true", "access-control-expose-headers": "ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval", "access-control-allow-origin": "*", "x-github-request-id": "511922DA:797C:1C36414:5329D235", "x-served-by": "6d7de9e645814cac34ea2a8d72ba3141"})
        .get('/repos/joyent/node/commits?per_page=100')
        .delay(2000)
        .reply(200, commitList, {"server":"GitHub.com","date":"Wed, 19 Mar 2014 17:25:47 GMT","content-type":"application/json; charset=utf-8","status":"200 OK","x-ratelimit-limit":"60","x-ratelimit-remaining":"26","x-ratelimit-reset":"1395252537","cache-control":"public, max-age=60, s-maxage=60","last-modified":"Mon, 17 Mar 2014 21:39:37 GMT","etag":"\"2d16d502135549cbc43a7304e3966231\"","vary":"Accept","x-github-media-type":"github.beta; format=json","link":"<https://api.github.com/repositories/211666/commits?per_page=100&top=master&last_sha=abbde2fafab5d722e156aa6fadd343e671446ace>; rel=\"next\", <https://api.github.com/repositories/211666/commits?per_page=100&sha=master>; rel=\"first\"","x-content-type-options":"nosniff","content-length":"318032","access-control-allow-credentials":"true","access-control-expose-headers":"ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval","access-control-allow-origin":"*","x-github-request-id":"511922DA:40A9:90871F:5329D31A","x-served-by":"c436b2b44345c72ff906059f604991e7"});
}