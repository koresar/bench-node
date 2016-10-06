var _filter = require('lodash/filter');
var bar = require('../util').MemoryBar();
var suite = require('../util').MemSuite(bar);

var arr = require('../util').getArray(1000000);

console.log(process.version, arr.length, 'items');
function predicate(item) { return !!item; }

suite
  .add('NATIVE', function () {
    arr.filter(predicate);
    bar.refresh();
  })
  .add('LODASH', function () {
    _filter(arr, predicate);
    bar.refresh();
  })
  .add('MYLOOP', function () {
    var result = [];
    var i = 0;
    var max = arr.length;
    while (i < max) {
      var item = arr[i];
      if (!!item) result.push(item);
      i++;
    }
    bar.refresh();
  })
  .run();
