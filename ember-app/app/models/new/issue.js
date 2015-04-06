import Model from '../model';

var Issue = Model.extend({
  columnIndex: Ember.computed('data.current_state', 'data.current_state.index', function(){
    if(!this.get('data.current_state')){
      return 1;
    } else {
      return this.get('data.current_state.index');
    }
  }),
  reorder: function (index, column) {
    var changedColumns = !column.get('filteredContent')
    .contains(this);
    if(changedColumns){
      this.set("_data.custom_state", "");
    }
    this.set("data.current_state.index", column.get('data.index').toString());
    this.set("data.current_state", column.get('data'));
    this.set("data._data.order", index);

    var user = this.get("repo.owner.login"),
    repo = this.get("repo.repo.name"),
    full_name = user + "/" + repo;

    return Ember.$.post("/api/" + full_name + "/dragcard", {
      number : this.get("number"),
      order: index.toString(),
      column: column.get('data.index').toString(),
      moved_columns: changedColumns,
      correlationId: this.get("correlationId")
    }, function( response ){
      this.set("_data.order", response._data.order);
      this.set("body", response.body);
      this.set("body_html", response.body_html);
      return this;
    }.bind(this), "json");
  }
});

export default Issue;
