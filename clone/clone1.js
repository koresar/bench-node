function isObject(value) {
  return value !== null && typeof value === 'object';
}

var isArray = Array.isArray;
var Okeys = Object.keys;

module.exports = function cloneDeep(src) {
  if (src === undefined) return;

  var returnValue;
  if (isArray(src)) returnValue = [];
  else if (isObject(src)) returnValue = {};
  else return src;

  var keys = Okeys(src);
  var i = 0;
  var length = keys.length;
  while (i < length) {
    var key = keys[i];
    returnValue[key] = cloneDeep(src[key]);
    i++;
  }

  return returnValue;
};
