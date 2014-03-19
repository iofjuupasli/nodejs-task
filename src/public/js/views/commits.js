define([
	"backbone",
	"jquery",
	"text!../templates/commits.html",
    "moment"], function(Backbone, $, templateHtml, moment) {

    var fib = function(i){
        return (i <= 1)?i:fib(i-1)+fib(i-2);
    }
    return Backbone.View.extend({
    	template: _.template(templateHtml),
    	initialize : function(){
    		this.collection.bind('reset', this.renderItem, this);
    	},

    	renderItem : function(){
            var collection = this.collection.map(function(model, key){
                var dt = model.get("commit.author.date");
                model.set("formatDate", moment(dt).format("YYYY-DD-MM"));
                model.set("fib", fib(key+1));
                return model.toJSON();
            })
			$(this.el).html(this.template({ model : collection}));
    	},

		render : function(){
			$(this.el).html(this.template({ model : this.collection.toJSON() }));
			return this;
    	}
    });

});