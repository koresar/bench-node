function noop() {}
module.exports = function (...args) {
  return noop(...args);
}
