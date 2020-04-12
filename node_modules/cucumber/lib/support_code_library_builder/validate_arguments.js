'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = validateArguments;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionsValidation = {
  expectedType: 'object or function',
  predicate: function predicate(_ref) {
    var options = _ref.options;

    return _lodash2.default.isPlainObject(options);
  }
};

var optionsTimeoutValidation = {
  identifier: '"options.timeout"',
  expectedType: 'integer',
  predicate: function predicate(_ref2) {
    var options = _ref2.options;

    return !options.timeout || _lodash2.default.isInteger(options.timeout);
  }
};

var fnValidation = {
  expectedType: 'function',
  predicate: function predicate(_ref3) {
    var code = _ref3.code;

    return _lodash2.default.isFunction(code);
  }
};

var validations = {
  defineTestRunHook: [(0, _extends3.default)({ identifier: 'first argument' }, optionsValidation), optionsTimeoutValidation, (0, _extends3.default)({ identifier: 'second argument' }, fnValidation)],
  defineTestCaseHook: [(0, _extends3.default)({ identifier: 'first argument' }, optionsValidation), {
    identifier: '"options.tags"',
    expectedType: 'string',
    predicate: function predicate(_ref4) {
      var options = _ref4.options;

      return !options.tags || _lodash2.default.isString(options.tags);
    }
  }, optionsTimeoutValidation, (0, _extends3.default)({ identifier: 'second argument' }, fnValidation)],
  defineStep: [{
    identifier: 'first argument',
    expectedType: 'string or regular expression',
    predicate: function predicate(_ref5) {
      var pattern = _ref5.pattern;

      return _lodash2.default.isRegExp(pattern) || _lodash2.default.isString(pattern);
    }
  }, (0, _extends3.default)({ identifier: 'second argument' }, optionsValidation), optionsTimeoutValidation, (0, _extends3.default)({ identifier: 'third argument' }, fnValidation)]
};

function validateArguments(_ref6) {
  var args = _ref6.args,
      fnName = _ref6.fnName,
      location = _ref6.location;

  validations[fnName].forEach(function (_ref7) {
    var identifier = _ref7.identifier,
        expectedType = _ref7.expectedType,
        predicate = _ref7.predicate;

    if (!predicate(args)) {
      throw new Error(location + ': Invalid ' + identifier + ': should be a ' + expectedType);
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdXBwb3J0X2NvZGVfbGlicmFyeV9idWlsZGVyL3ZhbGlkYXRlX2FyZ3VtZW50cy5qcyJdLCJuYW1lcyI6WyJ2YWxpZGF0ZUFyZ3VtZW50cyIsIm9wdGlvbnNWYWxpZGF0aW9uIiwiZXhwZWN0ZWRUeXBlIiwicHJlZGljYXRlIiwib3B0aW9ucyIsImlzUGxhaW5PYmplY3QiLCJvcHRpb25zVGltZW91dFZhbGlkYXRpb24iLCJpZGVudGlmaWVyIiwidGltZW91dCIsImlzSW50ZWdlciIsImZuVmFsaWRhdGlvbiIsImNvZGUiLCJpc0Z1bmN0aW9uIiwidmFsaWRhdGlvbnMiLCJkZWZpbmVUZXN0UnVuSG9vayIsImRlZmluZVRlc3RDYXNlSG9vayIsInRhZ3MiLCJpc1N0cmluZyIsImRlZmluZVN0ZXAiLCJwYXR0ZXJuIiwiaXNSZWdFeHAiLCJhcmdzIiwiZm5OYW1lIiwibG9jYXRpb24iLCJmb3JFYWNoIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBd0R3QkEsaUI7O0FBeER4Qjs7Ozs7O0FBRUEsSUFBTUMsb0JBQW9CO0FBQ3hCQyxnQkFBYyxvQkFEVTtBQUV4QkMsV0FGd0IsMkJBRUQ7QUFBQSxRQUFYQyxPQUFXLFFBQVhBLE9BQVc7O0FBQ3JCLFdBQU8saUJBQUVDLGFBQUYsQ0FBZ0JELE9BQWhCLENBQVA7QUFDRDtBQUp1QixDQUExQjs7QUFPQSxJQUFNRSwyQkFBMkI7QUFDL0JDLGNBQVksbUJBRG1CO0FBRS9CTCxnQkFBYyxTQUZpQjtBQUcvQkMsV0FIK0IsNEJBR1I7QUFBQSxRQUFYQyxPQUFXLFNBQVhBLE9BQVc7O0FBQ3JCLFdBQU8sQ0FBQ0EsUUFBUUksT0FBVCxJQUFvQixpQkFBRUMsU0FBRixDQUFZTCxRQUFRSSxPQUFwQixDQUEzQjtBQUNEO0FBTDhCLENBQWpDOztBQVFBLElBQU1FLGVBQWU7QUFDbkJSLGdCQUFjLFVBREs7QUFFbkJDLFdBRm1CLDRCQUVDO0FBQUEsUUFBUlEsSUFBUSxTQUFSQSxJQUFROztBQUNsQixXQUFPLGlCQUFFQyxVQUFGLENBQWFELElBQWIsQ0FBUDtBQUNEO0FBSmtCLENBQXJCOztBQU9BLElBQU1FLGNBQWM7QUFDbEJDLHFCQUFtQiwwQkFDZlAsWUFBWSxnQkFERyxJQUNrQk4saUJBRGxCLEdBRWpCSyx3QkFGaUIsMkJBR2ZDLFlBQVksaUJBSEcsSUFHbUJHLFlBSG5CLEVBREQ7QUFNbEJLLHNCQUFvQiwwQkFDaEJSLFlBQVksZ0JBREksSUFDaUJOLGlCQURqQixHQUVsQjtBQUNFTSxnQkFBWSxnQkFEZDtBQUVFTCxrQkFBYyxRQUZoQjtBQUdFQyxhQUhGLDRCQUd5QjtBQUFBLFVBQVhDLE9BQVcsU0FBWEEsT0FBVzs7QUFDckIsYUFBTyxDQUFDQSxRQUFRWSxJQUFULElBQWlCLGlCQUFFQyxRQUFGLENBQVdiLFFBQVFZLElBQW5CLENBQXhCO0FBQ0Q7QUFMSCxHQUZrQixFQVNsQlYsd0JBVGtCLDJCQVVoQkMsWUFBWSxpQkFWSSxJQVVrQkcsWUFWbEIsRUFORjtBQWtCbEJRLGNBQVksQ0FDVjtBQUNFWCxnQkFBWSxnQkFEZDtBQUVFTCxrQkFBYyw4QkFGaEI7QUFHRUMsYUFIRiw0QkFHeUI7QUFBQSxVQUFYZ0IsT0FBVyxTQUFYQSxPQUFXOztBQUNyQixhQUFPLGlCQUFFQyxRQUFGLENBQVdELE9BQVgsS0FBdUIsaUJBQUVGLFFBQUYsQ0FBV0UsT0FBWCxDQUE5QjtBQUNEO0FBTEgsR0FEVSwyQkFRUlosWUFBWSxpQkFSSixJQVEwQk4saUJBUjFCLEdBU1ZLLHdCQVRVLDJCQVVSQyxZQUFZLGdCQVZKLElBVXlCRyxZQVZ6QjtBQWxCTSxDQUFwQjs7QUFnQ2UsU0FBU1YsaUJBQVQsUUFBdUQ7QUFBQSxNQUExQnFCLElBQTBCLFNBQTFCQSxJQUEwQjtBQUFBLE1BQXBCQyxNQUFvQixTQUFwQkEsTUFBb0I7QUFBQSxNQUFaQyxRQUFZLFNBQVpBLFFBQVk7O0FBQ3BFVixjQUFZUyxNQUFaLEVBQW9CRSxPQUFwQixDQUE0QixpQkFBNkM7QUFBQSxRQUExQ2pCLFVBQTBDLFNBQTFDQSxVQUEwQztBQUFBLFFBQTlCTCxZQUE4QixTQUE5QkEsWUFBOEI7QUFBQSxRQUFoQkMsU0FBZ0IsU0FBaEJBLFNBQWdCOztBQUN2RSxRQUFJLENBQUNBLFVBQVVrQixJQUFWLENBQUwsRUFBc0I7QUFDcEIsWUFBTSxJQUFJSSxLQUFKLENBQ0RGLFFBREMsa0JBQ29CaEIsVUFEcEIsc0JBQytDTCxZQUQvQyxDQUFOO0FBR0Q7QUFDRixHQU5EO0FBT0QiLCJmaWxlIjoidmFsaWRhdGVfYXJndW1lbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuXG5jb25zdCBvcHRpb25zVmFsaWRhdGlvbiA9IHtcbiAgZXhwZWN0ZWRUeXBlOiAnb2JqZWN0IG9yIGZ1bmN0aW9uJyxcbiAgcHJlZGljYXRlKHsgb3B0aW9ucyB9KSB7XG4gICAgcmV0dXJuIF8uaXNQbGFpbk9iamVjdChvcHRpb25zKVxuICB9LFxufVxuXG5jb25zdCBvcHRpb25zVGltZW91dFZhbGlkYXRpb24gPSB7XG4gIGlkZW50aWZpZXI6ICdcIm9wdGlvbnMudGltZW91dFwiJyxcbiAgZXhwZWN0ZWRUeXBlOiAnaW50ZWdlcicsXG4gIHByZWRpY2F0ZSh7IG9wdGlvbnMgfSkge1xuICAgIHJldHVybiAhb3B0aW9ucy50aW1lb3V0IHx8IF8uaXNJbnRlZ2VyKG9wdGlvbnMudGltZW91dClcbiAgfSxcbn1cblxuY29uc3QgZm5WYWxpZGF0aW9uID0ge1xuICBleHBlY3RlZFR5cGU6ICdmdW5jdGlvbicsXG4gIHByZWRpY2F0ZSh7IGNvZGUgfSkge1xuICAgIHJldHVybiBfLmlzRnVuY3Rpb24oY29kZSlcbiAgfSxcbn1cblxuY29uc3QgdmFsaWRhdGlvbnMgPSB7XG4gIGRlZmluZVRlc3RSdW5Ib29rOiBbXG4gICAgeyBpZGVudGlmaWVyOiAnZmlyc3QgYXJndW1lbnQnLCAuLi5vcHRpb25zVmFsaWRhdGlvbiB9LFxuICAgIG9wdGlvbnNUaW1lb3V0VmFsaWRhdGlvbixcbiAgICB7IGlkZW50aWZpZXI6ICdzZWNvbmQgYXJndW1lbnQnLCAuLi5mblZhbGlkYXRpb24gfSxcbiAgXSxcbiAgZGVmaW5lVGVzdENhc2VIb29rOiBbXG4gICAgeyBpZGVudGlmaWVyOiAnZmlyc3QgYXJndW1lbnQnLCAuLi5vcHRpb25zVmFsaWRhdGlvbiB9LFxuICAgIHtcbiAgICAgIGlkZW50aWZpZXI6ICdcIm9wdGlvbnMudGFnc1wiJyxcbiAgICAgIGV4cGVjdGVkVHlwZTogJ3N0cmluZycsXG4gICAgICBwcmVkaWNhdGUoeyBvcHRpb25zIH0pIHtcbiAgICAgICAgcmV0dXJuICFvcHRpb25zLnRhZ3MgfHwgXy5pc1N0cmluZyhvcHRpb25zLnRhZ3MpXG4gICAgICB9LFxuICAgIH0sXG4gICAgb3B0aW9uc1RpbWVvdXRWYWxpZGF0aW9uLFxuICAgIHsgaWRlbnRpZmllcjogJ3NlY29uZCBhcmd1bWVudCcsIC4uLmZuVmFsaWRhdGlvbiB9LFxuICBdLFxuICBkZWZpbmVTdGVwOiBbXG4gICAge1xuICAgICAgaWRlbnRpZmllcjogJ2ZpcnN0IGFyZ3VtZW50JyxcbiAgICAgIGV4cGVjdGVkVHlwZTogJ3N0cmluZyBvciByZWd1bGFyIGV4cHJlc3Npb24nLFxuICAgICAgcHJlZGljYXRlKHsgcGF0dGVybiB9KSB7XG4gICAgICAgIHJldHVybiBfLmlzUmVnRXhwKHBhdHRlcm4pIHx8IF8uaXNTdHJpbmcocGF0dGVybilcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7IGlkZW50aWZpZXI6ICdzZWNvbmQgYXJndW1lbnQnLCAuLi5vcHRpb25zVmFsaWRhdGlvbiB9LFxuICAgIG9wdGlvbnNUaW1lb3V0VmFsaWRhdGlvbixcbiAgICB7IGlkZW50aWZpZXI6ICd0aGlyZCBhcmd1bWVudCcsIC4uLmZuVmFsaWRhdGlvbiB9LFxuICBdLFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZUFyZ3VtZW50cyh7IGFyZ3MsIGZuTmFtZSwgbG9jYXRpb24gfSkge1xuICB2YWxpZGF0aW9uc1tmbk5hbWVdLmZvckVhY2goKHsgaWRlbnRpZmllciwgZXhwZWN0ZWRUeXBlLCBwcmVkaWNhdGUgfSkgPT4ge1xuICAgIGlmICghcHJlZGljYXRlKGFyZ3MpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGAke2xvY2F0aW9ufTogSW52YWxpZCAke2lkZW50aWZpZXJ9OiBzaG91bGQgYmUgYSAke2V4cGVjdGVkVHlwZX1gXG4gICAgICApXG4gICAgfVxuICB9KVxufVxuIl19