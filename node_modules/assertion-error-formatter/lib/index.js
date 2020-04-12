'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.










format = format;var _inline_diff = require('./helpers/inline_diff');var _inline_diff2 = _interopRequireDefault(_inline_diff);var _stringify = require('./helpers/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _type = require('./helpers/type');var _type2 = _interopRequireDefault(_type);var _unified_diff = require('./helpers/unified_diff');var _unified_diff2 = _interopRequireDefault(_unified_diff);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function identity(x) {return x;}function format(err, options) {
  if (!options) {
    options = {};
  }
  if (!options.colorFns) {
    options.colorFns = {};
  }
  ['diffAdded', 'diffRemoved', 'errorMessage', 'errorStack'].forEach(function (key) {
    if (!options.colorFns[key]) {
      options.colorFns[key] = identity;
    }
  });

  var message = void 0;
  if (err.message && typeof err.message.toString === 'function') {
    message = err.message + '';
  } else if (typeof err.inspect === 'function') {
    message = err.inspect() + '';
  } else if (typeof err === 'string') {
    message = err;
  } else {
    message = JSON.stringify(err);
  }

  var stack = err.stack || message;
  var startOfMessageIndex = stack.indexOf(message);
  if (startOfMessageIndex === -1) {
    stack = '\n' + stack;
  } else {
    var endOfMessageIndex = startOfMessageIndex + message.length;
    message = stack.slice(0, endOfMessageIndex);
    stack = stack.slice(endOfMessageIndex); // remove message from stack
  }

  if (err.uncaught) {
    message = 'Uncaught ' + message;
  }

  var actual = err.actual;
  var expected = err.expected;

  if (err.showDiff !== false && (0, _type2.default)(actual) === (0, _type2.default)(expected) && expected !== undefined) {
    if (!((0, _type2.default)(actual) === 'string' && (0, _type2.default)(expected) === 'string')) {
      actual = (0, _stringify2.default)(actual);
      expected = (0, _stringify2.default)(expected);
    }

    var match = message.match(/^([^:]+): expected/);
    message = options.colorFns.errorMessage(match ? match[1] : message);

    if (options.inlineDiff) {
      message += (0, _inline_diff2.default)(actual, expected, options.colorFns);
    } else {
      message += (0, _unified_diff2.default)(actual, expected, options.colorFns);
    }
  } else {
    message = options.colorFns.errorMessage(message);
  }

  if (stack) {
    stack = options.colorFns.errorStack(stack);
  }

  return message + stack;
}