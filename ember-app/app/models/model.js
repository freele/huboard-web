import Ember from 'ember';
import ajax from 'ic-ajax';

var HuBoardModel = Ember.Object.extend(Ember._ProxyMixin,{
  _onInit: function(){
    this.set('content', this.get('data'));
  }.on('init'),
  ajax: ajax
});

export default HuBoardModel;
