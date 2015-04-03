import Ember from 'ember';
import Issue from 'app/models/issue';

var ColumnController = Ember.ObjectController.extend({
  needs: ["index", "application"],
  style: Ember.computed.alias("controllers.index.column_style"),
  isLastColumn: Ember.computed.alias('model.isLast'), 
  isFirstColumn: Ember.computed.alias('model.isFirst'), 
  isCreateVisible: Ember.computed.alias("isFirstColumn"),
  isCollapsed: function(key, value) {
    if(arguments.length > 1) {
      this.set("settings.taskColumn" + this.get("model.index") + "Collapsed", value);
      return value;
    } else {
      return this.get("settings.taskColumn" + this.get("model.index") + "Collapsed");
    }
  }.property(),
  isHovering: false,
  issues: Ember.computed('model.filteredContent', function(){
    return Ember.ArrayController
    .extend({
      container: this.container,
      itemController: 'card'
    })
    .create({
      parentController: this,
      content: this.get('model.filteredContent'),
      sortProperties: ["number"]
    });
  }),
  dragging: false,
  cardMoved : function (cardController, index){
    cardController.send("moved", index, this.get("model"));
  },
  topOrderNumber: function(){
    var issues = this.get("issues");
    if(issues.length){
      return { order: issues.get("firstObject.model.data._data.order") / 2 };
    } else {
      return {};
    }
  }.property("issues.@each", "controllers.index.forceRedraw"),
  newIssue: function(){
    return Issue.createNew();
  }.property()
});

export default ColumnController;
