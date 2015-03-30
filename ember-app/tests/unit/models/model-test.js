import Model from 'app/models/model';
import request from 'ic-ajax';
import { defineFixture as fixture } from 'ic-ajax';
import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('model:model');

test('it exists', function(assert) {

  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
  assert.ok(fixture);
  assert.ok(sinon);
});

test('it should delegate to the promise proxy', function(assert){
  fixture('/api/foo', {
    statusText: 'success',
    response: {data: {id:1, type:'foo'}}
  });

  var model = this.subject({
    promise: request('/api/foo')
  });

  model.then(function(foo) {
    assert.ok(foo, 'no foo');
    assert.ok(model.get('isFulfilled'), 'promise is fulfilled');
    assert.equal(model.get('data.id'), 1);

  });

});
