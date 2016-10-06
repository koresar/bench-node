var Benchmark = require('benchmark');
var chalk = require('chalk');
var toHumanSize = require('../util').toHumanSize;
var bar = require('../util').MemoryBar();
var round2 = require('../util').round2;

var suite = new Benchmark.Suite();

var json = require('./3MB.json');
var clone1 = require('./clone1');
var clone2 = require('./clone2');
var clone3 = require('./clone3');

console.log(process.version, toHumanSize(JSON.stringify(json).length), 'JSON');

suite
  .add('MIN MALLOC ', function () {
    clone1(json);
    bar.refresh();
  })
  .add('1 SCOPED FN', function () {
    clone2(json);
    bar.refresh();
  })
  .add('2 SCOPED FN', function () {
    clone3(json);
    bar.refresh();
  })
  .on('cycle', function (test) {
    bar.finish(test.target.name + ' ' + chalk.yellow(round2(test.target.hz)));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    console.log();
  })
  .run();
