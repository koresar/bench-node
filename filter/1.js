var _filter = require('lodash/filter');
var suite = require('../util').PerfSuite();

var arr = require('../util').getArray(1000);

console.log(process.version, arr.length, 'items');


suite
  .add('NATIVE', function () {
    arr.filter(function (item) { return !!item; });

  })
  .add('LODASH', function () {
    _filter(arr, function (item) { return !!item; });

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

  })
  .run();
