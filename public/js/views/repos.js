define([
	"backbone",
	"jquery",
	"text!../templates/repos.html"], function(Backbone, $, templateHtml) {

    return Backbone.View.extend({
    	template: _.template(templateHtml),
    	initialize : function(){
    		this.collection.bind('reset', this.renderItem, this);
    	},

    	renderItem : function(){
			$(this.el).html(this.template({ model : this.collection.toJSON() }));
    	},

		render : function(){
			$(this.el).html(this.template({ model : this.collection.toJSON() }));
			return this;
    	}
    });

});
