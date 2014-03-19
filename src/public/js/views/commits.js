define([
	"backbone",
	"jquery",
	"text!../templates/commits.html",
    "moment",
    "qunit"], function(Backbone, $, templateHtml, moment, qunit) {

    var fib = function(i){
        var prev = 0;
        var current = 1;
        for(var j=1; j<i; j++){
            var temp = prev;
            prev = current
            current += temp;
        }
        return current;
    }
    return Backbone.View.extend({
    	template: _.template(templateHtml),
    	initialize : function(){
    		this.collection.bind('reset', this.renderItem, this);
    	},

    	renderItem : function(){
            var collection = this.collection.map(function(model, key){
                var dt = model.get("date");
                model.set("formatDate", moment(dt).format("YYYY-DD-MM"));
                model.set("fib", fib(key+1));
                return model.toJSON();
            })

			$(this.el).html(this.template({ model : collection}));

            test( "color test", function() {
                var lis = $("li");
                lis.each(function(){
                    var $this = $(this);
                    var content = $this.data("content");
                    if(content && !isNaN(parseInt(content.slice(-1)))){
                        equal($this.css("background-color"), "rgb(230, 241, 246)", "we expect value to be #E6F1F6");
                    }
                })
            });
            QUnit.load();
    	},

		render : function(){
			$(this.el).html(this.template({ model : [] }));
			return this;
    	}
    });

});
