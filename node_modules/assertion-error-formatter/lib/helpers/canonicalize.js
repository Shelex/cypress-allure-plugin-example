'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =


canonicalize;var _has_property = require('./has_property');var _has_property2 = _interopRequireDefault(_has_property);var _type = require('./type');var _type2 = _interopRequireDefault(_type);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function canonicalize(value, stack) {
  stack = stack || [];

  function withStack(fn) {
    stack.push(value);
    var result = fn();
    stack.pop();
    return result;
  }

  if (stack.indexOf(value) !== -1) {
    return '[Circular]';
  }

  switch ((0, _type2.default)(value)) {
    case 'array':
      return withStack(function () {
        return value.map(function (item) {
          return canonicalize(item, stack);
        });
      });
    case 'function':
      if (!(0, _has_property2.default)(value)) {
        return '[Function]';
      }
    /* falls through */
    case 'object':
      return withStack(function () {
        var canonicalizedObj = {};
        Object.keys(value).sort().map(function (key) {
          canonicalizedObj[key] = canonicalize(value[key], stack);
        });
        return canonicalizedObj;
      });
    case 'boolean':
    case 'buffer':
    case 'date':
    case 'null':
    case 'number':
    case 'regexp':
    case 'symbol':
    case 'undefined':
      return value;
    default:
      return value.toString();}

}