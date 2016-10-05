function getArray(num) {
  var arr = [0, 1, null, {}, undefined, 'defined', NaN, +Infinity, -Infinity];
  for (var i = 0; i < 17; i++) arr = arr.concat(arr).concat(i);
  return arr.slice(0, num || 1000);
}

function toHumanSize(size) {
  const e = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
}

function sleep(time) {
  var stop = Date.now() + time;
  while (Date.now() < stop);
}

function MemoryBar() {
  var ProgressBar = require('progress');
  var maxMem = 1024 * 1024 * 1024 / 4; // 256MB
  var bar = new ProgressBar(':caption |:bar ' + toHumanSize(maxMem), {
    total: maxMem, width: 80, renderThrottle: 40, complete: '#'
  });
  bar.maxMem = maxMem;
  bar.maxUsed = 0;
  bar.lastMem = 0;
  bar.jumpCalc = 0;
  bar.gcCalls = 0;

  bar.refresh = function () {
    var currentHeap = process.memoryUsage().heapTotal;
    if (this.lastMem < currentHeap) {
      this.lastMem = currentHeap;
    } else if (this.lastMem > currentHeap) {
      this.jumpCalc += this.lastMem - currentHeap;
      this.lastMem = currentHeap;
      this.gcCalls++;
    } else {
      return;
    }
    this.maxUsed = currentHeap > this.maxUsed ? currentHeap : this.maxUsed;
    this.update(currentHeap / this.maxMem);
  };

  bar.finish = function (text) {
    sleep(40);
    this.update(this.maxUsed / this.maxMem, {
      caption: text + '\tmax: ' + toHumanSize(this.maxUsed) +
      ',\tmalloc: ' + toHumanSize(this.jumpCalc) +
      ',\tGC calls: >= ' + this.gcCalls +
      '\t'
    });
    this.maxUsed = 0;
    this.lastMem = 0;
    this.jumpCalc = 0;
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

module.exports = {
  getArray: getArray,
  toHumanSize: toHumanSize,
  sleep: sleep,
  MemoryBar: MemoryBar,
  round2: round2,
  round: round
};
