import Ember from 'ember';
import MarkdownParsingMixin from 'app/mixins/markdown-parsing';

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('mixin:markdown-parsing', 'MarkdownParsingMixin', {
  setup: function(){
    this.subject = Ember.Object.
      createWithMixins(MarkdownParsingMixin, {});
  }
});

test('matchShortSha', function(assert){
  var string; var matches;
  //Short SHA's (7 chars)
  //
  //### Test Case 1
  string = '<p> cdc3563 f2db01c87e41d676a82cf07ca7ac5b0f1cdc3563 cdc3563" cdc3563 4d43463 cdc3563 </p>';

  matches = this.subject.matchShortSha(string);
  assert.deepEqual(matches, ['cdc3563', '4d43463']);

  //### Test Case 2
  string = '<p> http://github.com/f2db01c87e41d676a82cf07ca7ac5b0f1cdc3563 4d43463 </p>';

  matches = this.subject.matchShortSha(string);
  assert.deepEqual(matches, ['4d43463']);
  
  //### Test Case 3
  string = '<p>Hi there <a href="https://github.com/discorick/Projects/commit/f2db01c" class="commit-link"><tt>f2db01c</tt></a> I need some commits db9b4c5</p>';

  matches = this.subject.matchShortSha(string);
  assert.deepEqual(matches, ['db9b4c5']);
});

test('matchLongSha', function(assert){
  var string; var matches; var sha1; var sha2;
  sha1 = 'f2db01c87e41d676a82cf07ca7ac5b0f1cdc3563';
  sha2 = 'b26b01c87e41d676a82cf0ddd7ac540f12dc2522';

  //Short SHA's (7 chars)
  //
  //### Test Case 1
  string = '<p> cdc3563 ' + sha1 + ' cdc3563" cdc3563 4d43463 cdc3563 </p>';

  matches = this.subject.matchLongSha(string);
  assert.deepEqual(matches, [sha1]);

  //### Test Case 2
  string = '<p> http://github.com/f2db01c87e41d676a82cf07ca7ac5b0f1cdc3563 4d43463' + sha1 + '</p>';

  matches = this.subject.matchLongSha(string);
  assert.deepEqual(matches, [sha1]);
  
  //### Test Case 3
  string = '<p>Hi there <a href="https://github.com/discorick/Projects/commit/' + sha1 + '" class="commit-link"><tt>f2db01c</tt></a> I need some commits ' + sha2 + '</p>';

  matches = this.subject.matchLongSha(string);
  assert.deepEqual(matches, [sha2]);
});

test('stashUrls, For preprocessing strings', function(assert){
  var url1 = "https://github.com/discorick/commit/123456e ";
  var url2 = "http://github.com/discorick/commit/123456e ";
  var url3 = "www.github.com/discorick/commit/123456e ";
  var url4 = "github.com/discorick/commit/123456e";
  var string = url1 + url2 + url3 + url4;

  this.subject.stashUrls(string);
  var stash = Object.keys(this.subject.get("urlStash"));
  var placeholder = "X__HUBOARD__PLACEHOLDER__X";

  assert.equal(stash[0], placeholder + "1");
  assert.equal(stash[1], placeholder + "2");
  assert.equal(stash[2], placeholder + "3");
  assert.equal(stash[3], placeholder + "4");
});

test('restoreUrls, restore stash URLS to string', function(assert){
  var url1 = "https://github.com/discorick/commit/123456e ";
  var url2 = "http://github.com/discorick/commit/123456e ";
  var url3 = "www.github.com/discorick/commit/123456e ";
  var url4 = "github.com/discorick/commit/123456e";
  var string = url1 + url2 + url3 + url4;

  this.subject.stashUrls(string);
  this.subject.restoreUrls();

  assert.equal(this.subject.get("parsedBody"), string);
});
