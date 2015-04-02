import Model from '../model';

var Issue = Model.extend({
  columnIndex: Ember.computed('data.current_state', 'data.current_state.index', function(){
    if(!this.get('data.current_state')){
      return 1;
    } else {
      return this.get('data.current_state.index');
    }
  })
});

export default Issue;
