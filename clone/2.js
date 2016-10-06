var Benchmark = require('benchmark');
var _cloneDeep = require('lodash/cloneDeep');
var chalk = require('chalk');
var toHumanSize = require('../util').toHumanSize;
var bar = require('../util').MemoryBar();
var round2 = require('../util').round2;

var suite = new Benchmark.Suite();

var json = require('./3MB.json');
var clone1 = require('./clone1');

console.log(process.version, toHumanSize(JSON.stringify(json).length), 'JSON');

suite
  .add('->STR->JSON', function () {
    JSON.parse(JSON.stringify(json));
    bar.refresh();
  })
  .add('_.CLONEDEEP', function () {
    _cloneDeep(json);
    bar.refresh();
  })
  .add('MIN MALLOC ', function () {
    clone1(json);
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
