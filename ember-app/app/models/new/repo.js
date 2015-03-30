import Ember from 'ember';
import Model from '../model';
import Board from './board';

var PromiseObject = Ember.Object.extend(Ember.PromiseProxyMixin);
var Repo = Model.extend({
  baseUrl: Ember.computed('data.full_name', function () {
    return `/api/${this.get('data.repo.full_name')}`;
  }),
  userUrl :function () {
    return "/" + this.get("data.owner.login");
  }.property("owner.login"),
  links: Ember.computed('data.links', function(){
    var self = this,
      links = this.get('data.links');
    return PromiseObject.extend({
      promise: Ember.computed(function(){
        return new Ember.RSVP.Promise(function(resolve, reject){
          var promises = links.map(function(link){
            var url = `/api/${link.user}/${link.repo}`;
            return self.get('ajax')(url);
          });

          Ember.RSVP.all(promises).then(function(responses){
            var response = Ember.A();
            responses.forEach(function(link){
              response.pushObject(Repo.create(link));
            });
            resolve(response);
          }, reject);
        });
      })
    }).create();
  }),
  board: Ember.computed(function(){
    return Board.create({ repo: this });
  })
});

export default Repo;
