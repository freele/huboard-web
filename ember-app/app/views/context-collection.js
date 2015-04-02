import Ember from 'ember';
var collectionView = Ember.CollectionView.extend({
  createChildView: function(viewClass, viewArgs){
    viewArgs.context = viewArgs.content;
    viewArgs.controller = viewArgs.content;
    return this._super(viewClass, viewArgs);
  }
});

export default collectionView;

