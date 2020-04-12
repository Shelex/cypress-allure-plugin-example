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

var _pickle_filter = require('../pickle_filter');

var _pickle_filter2 = _interopRequireDefault(_pickle_filter);

var _step_definition = require('./step_definition');

var _step_definition2 = _interopRequireDefault(_step_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestCaseHookDefinition = function (_StepDefinition) {
  (0, _inherits3.default)(TestCaseHookDefinition, _StepDefinition);

  function TestCaseHookDefinition(data) {
    (0, _classCallCheck3.default)(this, TestCaseHookDefinition);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TestCaseHookDefinition.__proto__ || Object.getPrototypeOf(TestCaseHookDefinition)).call(this, data));

    _this.pickleFilter = new _pickle_filter2.default({
      tagExpression: _this.options.tags
    });
    return _this;
  }

  (0, _createClass3.default)(TestCaseHookDefinition, [{
    key: 'appliesToTestCase',
    value: function appliesToTestCase(_ref) {
      var pickle = _ref.pickle,
          uri = _ref.uri;

      return this.pickleFilter.matches({ pickle: pickle, uri: uri });
    }
  }, {
    key: 'getInvalidCodeLengthMessage',
    value: function getInvalidCodeLengthMessage() {
      return this.buildInvalidCodeLengthMessage('0 or 1', '2');
    }
  }, {
    key: 'getInvocationParameters',
    value: function getInvocationParameters(_ref2) {
      var hookParameter = _ref2.hookParameter;

      return [hookParameter];
    }
  }, {
    key: 'getValidCodeLengths',
    value: function getValidCodeLengths() {
      return [0, 1, 2];
    }
  }]);
  return TestCaseHookDefinition;
}(_step_definition2.default);

exports.default = TestCaseHookDefinition;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdGVzdF9jYXNlX2hvb2tfZGVmaW5pdGlvbi5qcyJdLCJuYW1lcyI6WyJUZXN0Q2FzZUhvb2tEZWZpbml0aW9uIiwiZGF0YSIsInBpY2tsZUZpbHRlciIsInRhZ0V4cHJlc3Npb24iLCJvcHRpb25zIiwidGFncyIsInBpY2tsZSIsInVyaSIsIm1hdGNoZXMiLCJidWlsZEludmFsaWRDb2RlTGVuZ3RoTWVzc2FnZSIsImhvb2tQYXJhbWV0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLHNCOzs7QUFDbkIsa0NBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFBQSw4SkFDVkEsSUFEVTs7QUFFaEIsVUFBS0MsWUFBTCxHQUFvQiw0QkFBaUI7QUFDbkNDLHFCQUFlLE1BQUtDLE9BQUwsQ0FBYUM7QUFETyxLQUFqQixDQUFwQjtBQUZnQjtBQUtqQjs7Ozs0Q0FFa0M7QUFBQSxVQUFmQyxNQUFlLFFBQWZBLE1BQWU7QUFBQSxVQUFQQyxHQUFPLFFBQVBBLEdBQU87O0FBQ2pDLGFBQU8sS0FBS0wsWUFBTCxDQUFrQk0sT0FBbEIsQ0FBMEIsRUFBRUYsY0FBRixFQUFVQyxRQUFWLEVBQTFCLENBQVA7QUFDRDs7O2tEQUU2QjtBQUM1QixhQUFPLEtBQUtFLDZCQUFMLENBQW1DLFFBQW5DLEVBQTZDLEdBQTdDLENBQVA7QUFDRDs7O21EQUUwQztBQUFBLFVBQWpCQyxhQUFpQixTQUFqQkEsYUFBaUI7O0FBQ3pDLGFBQU8sQ0FBQ0EsYUFBRCxDQUFQO0FBQ0Q7OzswQ0FFcUI7QUFDcEIsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUFQO0FBQ0Q7Ozs7O2tCQXRCa0JWLHNCIiwiZmlsZSI6InRlc3RfY2FzZV9ob29rX2RlZmluaXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGlja2xlRmlsdGVyIGZyb20gJy4uL3BpY2tsZV9maWx0ZXInXG5pbXBvcnQgU3RlcERlZmluaXRpb24gZnJvbSAnLi9zdGVwX2RlZmluaXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RDYXNlSG9va0RlZmluaXRpb24gZXh0ZW5kcyBTdGVwRGVmaW5pdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihkYXRhKVxuICAgIHRoaXMucGlja2xlRmlsdGVyID0gbmV3IFBpY2tsZUZpbHRlcih7XG4gICAgICB0YWdFeHByZXNzaW9uOiB0aGlzLm9wdGlvbnMudGFncyxcbiAgICB9KVxuICB9XG5cbiAgYXBwbGllc1RvVGVzdENhc2UoeyBwaWNrbGUsIHVyaSB9KSB7XG4gICAgcmV0dXJuIHRoaXMucGlja2xlRmlsdGVyLm1hdGNoZXMoeyBwaWNrbGUsIHVyaSB9KVxuICB9XG5cbiAgZ2V0SW52YWxpZENvZGVMZW5ndGhNZXNzYWdlKCkge1xuICAgIHJldHVybiB0aGlzLmJ1aWxkSW52YWxpZENvZGVMZW5ndGhNZXNzYWdlKCcwIG9yIDEnLCAnMicpXG4gIH1cblxuICBnZXRJbnZvY2F0aW9uUGFyYW1ldGVycyh7IGhvb2tQYXJhbWV0ZXIgfSkge1xuICAgIHJldHVybiBbaG9va1BhcmFtZXRlcl1cbiAgfVxuXG4gIGdldFZhbGlkQ29kZUxlbmd0aHMoKSB7XG4gICAgcmV0dXJuIFswLCAxLCAyXVxuICB9XG59XG4iXX0=