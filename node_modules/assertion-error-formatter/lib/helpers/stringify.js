'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =



stringify;var _canonicalize = require('./canonicalize');var _canonicalize2 = _interopRequireDefault(_canonicalize);var _json_stringify = require('./json_stringify');var _json_stringify2 = _interopRequireDefault(_json_stringify);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function stringify(value) {
  return (0, _json_stringify2.default)((0, _canonicalize2.default)(value)).replace(/,(\n|$)/g, '$1');
}