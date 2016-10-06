var _map = require('lodash/map');
var bar = require('../util').MemoryBar();
var suite = require('../util').MemSuite(bar);

var arr = require('../util').getArray(1000);

console.log(process.version, arr.length, 'items');
function predicate(item) { return !!item; }

suite
  .add('NATIVE', function () {
    arr.map(predicate);
    bar.refresh();
  })
  .add('LODASH', function () {
    _map(arr, predicate);
    bar.refresh();
  })
  .add('MYLOOP', function () {
    var result = [];
    var i = 0;
    var max = arr.length;
    while (i < max) {
      result.push(!!arr[i]);
      i++;
    }
    bar.refresh();
  })
  .run();
