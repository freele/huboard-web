import Ember from 'ember';
import ajax from 'ic-ajax';

var HuBoardModel = Ember.Object.extend(Ember._ProxyMixin, Ember.PromiseProxyMixin,{
  //content: Ember.computed.alias('data')
  ajax: ajax
});

export default HuBoardModel;
