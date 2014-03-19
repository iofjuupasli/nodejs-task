define([
	"backbone",
	"jquery"], function(Backbone, $) {

    var Repo = Backbone.Model.extend({});
    return Backbone.Collection.extend({
        url : '/api/joyent',
        model : Repo
    });
});