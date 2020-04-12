'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _step_definition = require('./step_definition');

var _step_definition2 = _interopRequireDefault(_step_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestRunHookDefinition = function (_StepDefinition) {
  (0, _inherits3.default)(TestRunHookDefinition, _StepDefinition);

  function TestRunHookDefinition() {
    (0, _classCallCheck3.default)(this, TestRunHookDefinition);
    return (0, _possibleConstructorReturn3.default)(this, (TestRunHookDefinition.__proto__ || Object.getPrototypeOf(TestRunHookDefinition)).apply(this, arguments));
  }

  (0, _createClass3.default)(TestRunHookDefinition, [{
    key: 'getInvalidCodeLengthMessage',
    value: function getInvalidCodeLengthMessage() {
      return this.buildInvalidCodeLengthMessage('0', '1');
    }
  }, {
    key: 'getInvocationParameters',
    value: function getInvocationParameters() {
      return [];
    }
  }, {
    key: 'getValidCodeLengths',
    value: function getValidCodeLengths() {
      return [0, 1];
    }
  }]);
  return TestRunHookDefinition;
}(_step_definition2.default);

exports.default = TestRunHookDefinition;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdGVzdF9ydW5faG9va19kZWZpbml0aW9uLmpzIl0sIm5hbWVzIjpbIlRlc3RSdW5Ib29rRGVmaW5pdGlvbiIsImJ1aWxkSW52YWxpZENvZGVMZW5ndGhNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEscUI7Ozs7Ozs7Ozs7a0RBQ1c7QUFDNUIsYUFBTyxLQUFLQyw2QkFBTCxDQUFtQyxHQUFuQyxFQUF3QyxHQUF4QyxDQUFQO0FBQ0Q7Ozs4Q0FFeUI7QUFDeEIsYUFBTyxFQUFQO0FBQ0Q7OzswQ0FFcUI7QUFDcEIsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVA7QUFDRDs7Ozs7a0JBWGtCRCxxQiIsImZpbGUiOiJ0ZXN0X3J1bl9ob29rX2RlZmluaXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RlcERlZmluaXRpb24gZnJvbSAnLi9zdGVwX2RlZmluaXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RSdW5Ib29rRGVmaW5pdGlvbiBleHRlbmRzIFN0ZXBEZWZpbml0aW9uIHtcbiAgZ2V0SW52YWxpZENvZGVMZW5ndGhNZXNzYWdlKCkge1xuICAgIHJldHVybiB0aGlzLmJ1aWxkSW52YWxpZENvZGVMZW5ndGhNZXNzYWdlKCcwJywgJzEnKVxuICB9XG5cbiAgZ2V0SW52b2NhdGlvblBhcmFtZXRlcnMoKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBnZXRWYWxpZENvZGVMZW5ndGhzKCkge1xuICAgIHJldHVybiBbMCwgMV1cbiAgfVxufVxuIl19