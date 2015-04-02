import Ember from 'ember';

import {
  module,
  test
} from 'qunit';

module('ember:view assumptions');

test('itemViewClass context should be the item controller of an array controller', function(assert){
  var array = Ember.A([{ name: "Ryan Rauh" }]);

  var controller = Ember.ArrayController.create({
    content: array
  });

    var collectionView = Ember.CollectionView.extend({
      tagName: 'ul',
      content: controller,
      itemViewClass: Ember.View.extend({
        template:  Ember.Handlebars.compile('{{name}}')
      }),
      arrayDidChange: function(content, start, removed, added) {
        var addedViews = [];
        var view, item, idx, len, itemViewClass, emptyView, itemViewProps;

        len = content ? Ember.get(content, 'length') : 0;

        if (len) {
          itemViewProps = this._itemViewProps || {};
          itemViewClass = Ember.get(this, 'itemViewClass');

          itemViewClass = Ember.__loader
          .require('ember-views/streams/utils')
          .readViewFactory(itemViewClass, this.container);

          for (idx = start; idx < start+added; idx++) {
            item = content.objectAt(idx);
            itemViewProps._context = this.keyword ? this.get('context') : item;
            itemViewProps.content = item;
            itemViewProps.contentIndex = idx;

            view = this.createChildView(itemViewClass, itemViewProps);

            if (Ember.FEATURES.isEnabled('ember-htmlbars-each-with-index')) {
              if (this.blockParams > 1) {
                view._blockArguments = [item, view.getStream('_view.contentIndex')];
              } else if (this.blockParams === 1) {
                view._blockArguments = [item];
              }
            } else {
              if (this.blockParams > 0) {
                view._blockArguments = [item];
              }
            }

            addedViews.push(view);
          }

          this.replace(start, 0, addedViews);

          if (Ember.FEATURES.isEnabled('ember-htmlbars-each-with-index')) {
            if (this.blockParams > 1) {
              var childViews = this._childViews;
              for (idx = start+added; idx < len; idx++) {
                view = childViews[idx];
                Ember.set(view, 'contentIndex', idx);
              }
            }
          }
        } else {
          emptyView = Ember.get(this, 'emptyView');

          if (!emptyView) { return; }

          if ('string' === typeof emptyView && Ember.__loader.require("ember-metal/binding").isGlobalPath(emptyView)) {
            emptyView = Ember.get(emptyView) || emptyView;
          }

          emptyView = this.createChildView(emptyView);

          addedViews.push(emptyView);
          Ember.set(this, 'emptyView', emptyView);

          if (Ember.CoreView.detect(emptyView)) {
            this._createdEmptyView = emptyView;
          }

          this.replace(start, 0, addedViews);
        }
      }
    });
    var container = collectionView.create();

    Ember.run(function() {
      container.appendTo('#qunit-fixture');
    });

    assert.equal(container.$('li').length, 1, '1 list element should be in the DOM');
    assert.equal(container.$('li').text(), 'Ryan Rauh', 'text of item view class\' template should be "Other Katz"');

    Ember.run(function() {
      container.destroy();
    });
});
