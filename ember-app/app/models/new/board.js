import Ember from 'ember';
import Model from '../model';

var Board = Model.extend({
  promise: Ember.computed(function(){
    return this.get('ajax')(this.get('repo.baseUrl') + "/board");
  })
});

export default Board;

