define([
	"backbone"
	, './views/commits'
	, './views/repos'	

	, './models/commits'
	, './models/repos'

], function(Backbone, CommitsView, ReposView, CommitList, RepoList){
	var $contaier = $('.contaier');

	var show = function(view){
		$contaier.empty().append(view.render().$el);		
	}

	var reposModel = new RepoList();
	var reposView = new ReposView({ collection : reposModel });

	var commitsModel = new CommitList();
	var commitsView = new CommitsView({ collection : commitsModel });


	var AppRouter = Backbone.Router.extend({
		routes : {
			'': 'home',
			'joyent' : 'all',
			'joyent/:repo' : 'one'
		},
		home : function(){
			this.navigate('joyent', { trigger:true });
		},
		all : function(){
			show(reposView);
			reposModel.fetch({ reset: true });
		},
		one : function(repo){
			show(commitsView);
			commitsModel.showCommitsFor(repo);
		}
	});


    var App = Backbone.View.extend({
        initialize: function(){
        	var appRouter = new AppRouter();
        	Backbone.history.start({ root : 'joyent' });
        }
    });
    return App;
});