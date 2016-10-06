var _map = require('lodash/map');
var suite = require('../util').PerfSuite();

var arr = require('../util').getArray(1000000);

console.log(process.version, arr.length, 'items');
function predicate(item) { return !!item; }

suite
  .add('NATIVE', function () {
    arr.map(predicate);

  })
  .add('LODASH', function () {
    _map(arr, predicate);

  })
  .add('MYLOOP', function () {
    var result = Array(arr.length);
    var i = 0;
    var max = arr.length;
    while (i < max) {
      result[i] = !!arr[i];
      i++;
    }

  })
  .run();
