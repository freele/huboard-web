import Ember from 'ember';


var Column = Ember.Object.extend(Ember.PromiseProxyMixin, {
  isFirst: false,
  isLast: false,
  filteredContent: Ember.computed.filter('content.@each.columnIndex', function(item){
    return item.get('columnIndex') === this.get('data.index');
  }),

  _filteredContent: Ember.computed('content.@each.columnIndex', function(){
    var issues = this.get('content'),
       index = this.get('data.index');
    return issues.filter(function(i){
      return i.data.current_state.index === index;
    });
  })
});

export default Column;
