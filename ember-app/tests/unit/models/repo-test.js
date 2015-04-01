import Repo from 'app/models/new/repo';
import Ember from 'ember'; 
import repo from '../../fixtures/repo';

import request from 'ic-ajax';
import { defineFixture as fixture } from 'ic-ajax';
import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('model:repo');

test('it exists', function(assert) {

  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
  assert.ok(fixture);
  assert.ok(sinon);
});

test('user url is the owner name', function(assert){
  var model = Repo.create(repo);

  assert.equal(model.get('userUrl'), "/rauhryan");
});

test('can fetch issues', function(assert) {
  var model = Repo.create(repo);

  fixture('/api/v2/rauhryan/skipping_stones_repo/issues', {
    response: {data:[{id: 1, type: 'issue'}]},
    jqXHR: {},
    textStatus: 'success'
  });

  model.get('issues').then(function(issues){
    assert.ok(issues);
  });

});

test('accessing links should fire off links request', (assert) => {

  var model = Repo.create(repo);

  fixture('/api/v2/rauhryan/furry-tribble', {
    response: repo,
    jqXHR: {},
    textStatus: 'success'
  });

  fixture('/api/v2/rauhryan/beyond_amd', {
    response: repo,
    jqXHR: {},
    textStatus: 'success'
  });

  assert.equal(model.get('links').length, 2);

});
