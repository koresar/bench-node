var _filter = require('lodash/filter');
var suite = require('../util').PerfSuite();

var arr = require('../util').getArray(1000000);

console.log(process.version, arr.length, 'items');
function predicate(item) { return !!item; }

suite
  .add('NATIVE', function () {
    arr.filter(predicate);

  })
  .add('LODASH', function () {
    _filter(predicate);

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
