import Repo from 'app/models/new/repo';
import Board from 'app/models/new/board';
import Ember from 'ember'; 
import repo from '../../fixtures/repo';

import request from 'ic-ajax';
import { defineFixture as fixture } from 'ic-ajax';
import {
  module,
  test
} from 'qunit';
import qunit from 'qunit';

module('model:board');


test('properly combines issues', function(assert) {
  var theRepo = Repo.create(repo);

  fixture('/api/v2/rauhryan/skipping_stones_repo/issues', {
    response: {data:[{id: 1, type: 'issue'}]},
    jqXHR: {},
    textStatus: 'success'
  });

  fixture('/api/v2/rauhryan/skipping_stones_repo/board', {
    response: {data:[{id: 1, type: 'issue'}]},
    jqXHR: {},
    textStatus: 'success'
  });

  fixture('/api/v2/rauhryan/furry-tribble', {
    response: repo,
    jqXHR: {},
    textStatus: 'success'
  });

  fixture('/api/v2/rauhryan/furry-tribble/issues', {
    response: {data:[{id: 1, type: 'issue'}]},
    jqXHR: {},
    textStatus: 'success'
  });

  fixture('/api/v2/rauhryan/beyond_amd', {
    response: repo,
    jqXHR: {},
    textStatus: 'success'
  });

  fixture('/api/v2/rauhryan/beyond_amd/issues', {
    response: {data:[{id: 1, type: 'issue'}]},
    jqXHR: {},
    textStatus: 'success'
  });

  var model = Board.fetch(theRepo);

  Ember.run(() =>{
    model.then(function(board){
      board.get('linkedIssues').then(function(issues){
        qunit.start();
        assert.equal(issues.length, 3);
      });
    });
    qunit.stop();
  });


});

