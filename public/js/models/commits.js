define([
	"backbone",
	"jquery"], function(Backbone, $) {

    var Commit = Backbone.Model.extend({});
    return Backbone.Collection.extend({
        url : function(){return '/api/joyent/'+this.repo},
        model : Commit,
        showCommitsFor : function(repo){
            this.repo=repo;
            this.fetch({ reset: true});
        }
    });

});