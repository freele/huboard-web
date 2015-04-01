import Ember from 'ember';
import Model from '../model';
import ajax from 'ic-ajax';

var PromiseObject = Ember.Object.extend(Ember.PromiseProxyMixin);

var Board = Model.extend({
  repo: null,
  linkedIssues:  Ember.computed(function(){
    var self = this;
    return PromiseObject.create({
      promise: new Ember.RSVP.Promise(function(resolve, reject){
        var repos = [self.get('repo')].concat(self.get('repo.links'));

        var promises = repos.map(function(repo){
          return Ember.get(repo,'issues'); 
        });

        Ember.RSVP.all(promises).then(function(issues) {
          var combined = issues.reduce((l, r) => l.concat(r)); 
          resolve(combined);
        },reject);
      })
    });
  })
});

Board.reopenClass({
  fetch: function(repo){
    return PromiseObject.create({
      promise: new Ember.RSVP.Promise(function(resolve, reject) {
        ajax(repo.get('baseUrl') + "/board").then(function(json){
          // could fetch issues here?
          var board = Board.create(json);
          board.set('repo', repo);
          resolve(board);
        },reject);
      })
    });
  }
});

export default Board;

