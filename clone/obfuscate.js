function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var arr = 'abcdefghijklmnopqrstuvwxyz';
function aaa(s) {
  var s2 = '';
  for (var i = 0; i < s.length; i++) {
    s2 = s2 + arr[i % 26];
  }
  // console.log(s2);
  return s2;
}

function cloneDeep(src) {
  if (src === undefined) return;
  if (typeof src === 'string') return aaa(src);

  var returnValue;
  if (isObject(src)) returnValue = {};
  else if (Array.isArray(src)) returnValue = [];
  else return src;

  var keys = Object.keys(src);
  var i = 0;
  var length = keys.length;
  while (i < length) {
    var key = keys[i];
    var srcValue = src[key];
    if (srcValue !== undefined) {
      returnValue[key] = cloneDeep(srcValue);
    }
    i++;
  }

  return returnValue;
}

var json = require('./../3MB_formatted.json');
console.log(JSON.stringify(cloneDeep(json), null, 2));
