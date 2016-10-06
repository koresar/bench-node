var _map = require('lodash/map');
var suite = require('../util').PerfSuite();

var arr = require('../util').getArray(1000);

console.log(process.version, arr.length, 'items');


suite
  .add('NATIVE', function () {
    arr.map(function (item) { return !!item; });

  })
  .add('LODASH', function () {
    _map(arr, function (item) { return !!item; });

  })
  .add('MYLOOP', function () {
    var result = [];
    var i = 0;
    var max = arr.length;
    while (i < max) {
      result.push(!!arr[i]);
      i++;
    }

  })
  .run();
