var Benchmark = require('benchmark');
var _ = require('lodash');
var chalk = require('chalk');
var round = require('../util').round;
var bar = require('../util').MemoryBar();
var suite = new Benchmark.Suite();

var arr = require('../util').getArray(1000000);

console.log(process.version, arr.length, 'items');
function predicate(item) { return !!item; }

suite
  .add('NATIVE', function () {
    arr.map(predicate);
    bar.refresh();
  })
  .add('LODASH', function () {
    _.map(arr, predicate);
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
  .on('cycle', function (test) {
    bar.finish(test.target.name + ' ' + chalk.yellow(round(test.target.hz)));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    console.log();
  })
  .run();
