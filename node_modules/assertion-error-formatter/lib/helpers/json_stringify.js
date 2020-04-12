'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =



jsonStringify;var _repeatString = require('repeat-string');var _repeatString2 = _interopRequireDefault(_repeatString);var _type = require('./type');var _type2 = _interopRequireDefault(_type);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function jsonStringify(object, depth) {
  depth = depth || 1;

  switch ((0, _type2.default)(object)) {
    case 'boolean':
    case 'regexp':
    case 'symbol':
      return object.toString();
    case 'null':
    case 'undefined':
      return '[' + object + ']';
    case 'array':
    case 'object':
      return jsonStringifyProperties(object, depth);
    case 'number':
      if (object === 0 && 1 / object === -Infinity) {
        return '-0';
      } else {
        return object.toString();
      }
    case 'date':
      return jsonStringifyDate(object);
    case 'buffer':
      return jsonStringifyBuffer(object, depth);
    default:
      if (object === '[Function]' || object === '[Circular]') {
        return object;
      } else {
        return JSON.stringify(object); // string
      }}

}


function jsonStringifyBuffer(object, depth) {var _object$toJSON =
  object.toJSON(),data = _object$toJSON.data;
  return '[Buffer: ' + jsonStringify(data, depth) + ']';
}


function jsonStringifyDate(object) {
  var str = void 0;
  if (isNaN(object.getTime())) {
    str = object.toString();
  } else {
    str = object.toISOString();
  }
  return '[Date: ' + str + ']';
}


function jsonStringifyProperties(object, depth) {
  var space = 2 * depth;
  var start = (0, _type2.default)(object) === 'array' ? '[' : '{';
  var end = (0, _type2.default)(object) === 'array' ? ']' : '}';
  var length = typeof object.length === 'number' ? object.length : Object.keys(object).length;
  var addedProperties = 0;
  var str = start;

  for (var prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      addedProperties += 1;
      str += '\n' + (0, _repeatString2.default)(' ', space) + (
      (0, _type2.default)(object) === 'array' ? '' : '"' + prop + '": ') +
      jsonStringify(object[prop], depth + 1) + (
      addedProperties === length ? '' : ',');
    }
  }

  if (str.length !== 1) {
    str += '\n' + (0, _repeatString2.default)(' ', space - 2);
  }

  return str + end;
}