function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = function cloneDeep(src) {
  if (src === undefined) return;

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
};
