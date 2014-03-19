var redis = require("redis");
client = redis.createClient();
CACHE_EXPIRE = 60*60 //1 hour

var store = function(key, data, cb){
    client.setex(key, CACHE_EXPIRE, JSON.stringify(data), cb);
}

var exists = function(key, cb){
    client.exists(key, cb);
}

var getCache = function(key, cb){
    exists(key, function(err, isExists){
        if(isExists){
            client.get(key, function(err, data){
                cb(JSON.parse(data));
            });
        } else{
            cb(false);
        }
    });
}

module.exports = {
    store: store,
    exists: exists,
    get: getCache
}
