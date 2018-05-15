var Benchmark = require('benchmark');
var chalk = require('chalk');
var padEnd = require('lodash/padEnd');

function noop(){}
function getArray(num) {
  var arr = [0, 1, null, {}, undefined, 'defined', NaN, +Infinity, -Infinity, noop];
  for (var i = 0; i < 17; i++) arr = arr.concat(arr).concat(i);
  return arr.slice(0, num || 1000);
}

function toHumanSize(size, pad) {
  if (!pad) pad = 6;
  if (size < 1024 * 1024) return chalk.yellow(padEnd('~ 0', pad + 3));
  var e = Math.floor(Math.log(size) / Math.log(1024));
  return chalk.yellow(
    padEnd((size / Math.pow(1024, e)).toFixed(2) + '', pad) +
    ' ' + ' KMGTP'.charAt(e) + 'B'
  );
}

function sleep(time) {
  var now = Date.now();
  var stop = now + time;
  var a = [];
  while (now < stop) {
    a.push(stop);
    now = Date.now();
  }
  return a;
}

function PerfSuite() {
  var suite = new Benchmark.Suite();
  return suite
    .on('start', function () {
      process.stdout.write('warming');
    })
    .add('WARMUP', function () {
      sleep(1000);
    })
    .on('cycle', function (test) {
      if (test.target.name === 'WARMUP') {
        process.stdout.write('\033[0G');
        return;
      }
      console.log(test.target.name + ' ' + chalk.yellow(round(test.target.hz)));
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
      console.log();
    });
}

function MemSuite(bar) {
  var suite = new Benchmark.Suite();
  return suite
    .on('start', function () {
      process.stdout.write('warming up...');
    })
    .add('WARMUP', function () {
      sleep(1000);
    })
    .on('cycle', function (test) {
      bar.finish(test.target);
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
      console.log();
    });
}

function MemoryBar(maxDisplayMemBytes) {
  var ProgressBar = require('progress');
  var maxDisplayMem = maxDisplayMemBytes || 512 * 1024 * 1024; // 512MB
  var bar = new ProgressBar(':X :bar', {
    total: maxDisplayMem, width: 100, renderThrottle: 40, complete: '#'
  });
  bar.maxDisplayMem = maxDisplayMem;
  bar.lastMem = 0;
  bar.mallocCalc = 0;
  bar.gcCalls = 0;

  bar.refresh = function () {
    var currentHeap = process.memoryUsage().heapTotal;
    if (this.lastMem === 0) {
      this.lastMem = currentHeap;
    } else {
      if (currentHeap < this.lastMem) {
        this.gcCalls++;
      }
      if (currentHeap > this.lastMem) {
        this.mallocCalc += currentHeap - this.lastMem;
      }
      this.lastMem = currentHeap;
    }
    if (currentHeap > this.maxDisplayMem) {
      this.update(0.999)
    } else {
      this.update(currentHeap / this.maxDisplayMem);
    }
  };

  bar.finish = function (target) {
    if (target.name === 'WARMUP') return;

    sleep(40);

    var oldWidth = this.width;
    this.width = 0;
    this.update(0, {
      X: padEnd(target.name, 12) + ' ' + chalk.yellow(padEnd(round2(target.hz), 9)) +
      ' | malloc: >= ' + toHumanSize(this.mallocCalc) +
      ' | GC calls: >= ' + chalk.yellow(padEnd(this.gcCalls, 3)) +
      ' | Mem/cycle: >= ' + (target.hz < 1.0 ? '¯\\_(ツ)_/¯' : toHumanSize(this.mallocCalc / target.hz))
    });
    this.width = oldWidth;

    this.lastMem = 0;
    this.mallocCalc = 0;
    this.gcCalls = 0;
    this.terminate();
    if (typeof gc !== "undefined") gc();
  };

  return bar;
}

function round(num) {
  return Math.round(num);
}

function round2(num) {
  return Math.round(num * 100) / 100;
}

function getObject() {
  return {
    asdf: 1243,
    qwer: {
      asdf: [1234, "afasdf", {}, null]
    },
    asdf2: 1243,
    qwer2: {
      asdf: [1234, "afasdf", {}, null]
    },
    asdf3: 1243,
    qwer3: {
      asdf: [1234, "afasdf", {}, null]
    },
    asdf4: 1243,
    qwer4: {
      asdf: [1234, "afasdf", {}, null]
    },
    asdf5: 1243,
    qwer5: {
      asdf: [1234, "afasdf", {}, null]
    },
    asdf6: 1243,
    qwer6: {
      asdf: [1234, "afasdf", {}, null]
    }
  }
}

module.exports = {
  getObject: getObject,
  getArray: getArray,
  toHumanSize: toHumanSize,
  sleep: sleep,
  MemoryBar: MemoryBar,
  PerfSuite: PerfSuite,
  MemSuite: MemSuite,
  round2: round2,
  round: round
};
