import Ember from 'ember';


var Column = Ember.Object.extend(Ember.PromiseProxyMixin, {
  filteredContent: Ember.computed('content.@each.columnIndex', function(){
    var issues = this.get('content'),
       index = this.get('data.index');
    return issues.filter(function(i){
      return i.data.current_state.index === index;
    });
  })
});

export default Column;
