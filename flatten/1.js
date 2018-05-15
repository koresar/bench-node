var _flatten = require('lodash/flatten');
var _filter = require('lodash/filter');
var bar = require('../util').MemoryBar();
var suite = require('../util').MemSuite(bar);

var arr = require('../util').getArray(10);

console.log(process.version, arr.length, 'items');

function isFunction(o) { return typeof o === 'function'; }

var flatten1 = require('./flatten1');
var flatten2 = require('./flatten3');
var flatten3 = require('./flatten3');

suite
  .add('FLATTEN 1', function () {
    flatten1(arr, arr, [arr]);
    // bar.refresh();
  })
  .add('FLATTEN 2', function () {
    flatten2(arr, arr, [arr]);
    // bar.refresh();
  })
  .add('FLATTEN 3', function () {
    flatten3(arr, arr, [arr]);
    // bar.refresh();
  })
  .add('LODASH FF', function () {
    _filter(_flatten(arr, arr, [arr]), isFunction);
    // bar.refresh();
  })
  .run();
