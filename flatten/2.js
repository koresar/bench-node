var _flatten = require('lodash/flatten');
var _filter = require('lodash/filter');
var noop = require('lodash/noop');
var bar = require('../util').MemoryBar();
var suite = require('../util').MemSuite(bar);

console.log(process.version, 1, 'item with undefined');

function isFunction(o) { return typeof o === 'function'; }

var flatten1 = require('./flatten1');
var flatten2 = require('./flatten3');
var flatten3 = require('./flatten3');

suite
  .add('FLATTEN 1', function () {
    flatten1(noop, undefined);
    bar.refresh();
  })
  .add('FLATTEN 2', function () {
    flatten2(noop, undefined);
    bar.refresh();
  })
  .add('FLATTEN 3', function () {
    flatten3(noop, undefined);
    bar.refresh();
  })
  .add('LODASH FF', function () {
    _filter(_flatten(noop, undefined), isFunction);
    bar.refresh();
  })
  .run();
