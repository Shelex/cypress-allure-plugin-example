'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _cucumberExpressions = require('cucumber-expressions');

var _data_table = require('./data_table');

var _data_table2 = _interopRequireDefault(_data_table);

var _step_arguments = require('../step_arguments');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StepDefinition = function () {
  function StepDefinition(_ref) {
    var code = _ref.code,
        line = _ref.line,
        options = _ref.options,
        pattern = _ref.pattern,
        uri = _ref.uri;
    (0, _classCallCheck3.default)(this, StepDefinition);

    this.code = code;
    this.line = line;
    this.options = options;
    this.pattern = pattern;
    this.uri = uri;
  }

  (0, _createClass3.default)(StepDefinition, [{
    key: 'buildInvalidCodeLengthMessage',
    value: function buildInvalidCodeLengthMessage(syncOrPromiseLength, callbackLength) {
      return 'function has ' + this.code.length + ' arguments' + (', should have ' + syncOrPromiseLength + ' (if synchronous or returning a promise)') + (' or ' + callbackLength + ' (if accepting a callback)');
    }
  }, {
    key: 'getInvalidCodeLengthMessage',
    value: function getInvalidCodeLengthMessage(parameters) {
      return this.buildInvalidCodeLengthMessage(parameters.length, parameters.length + 1);
    }
  }, {
    key: 'getInvocationParameters',
    value: function getInvocationParameters(_ref2) {
      var step = _ref2.step,
          parameterTypeRegistry = _ref2.parameterTypeRegistry,
          world = _ref2.world;

      var cucumberExpression = this.getCucumberExpression(parameterTypeRegistry);
      var stepNameParameters = cucumberExpression.match(step.text).map(function (arg) {
        return arg.getValue(world);
      });
      var iterator = (0, _step_arguments.buildStepArgumentIterator)({
        dataTable: function dataTable(arg) {
          return new _data_table2.default(arg);
        },
        docString: function docString(arg) {
          return arg.content;
        }
      });
      var stepArgumentParameters = step.arguments.map(iterator);
      return stepNameParameters.concat(stepArgumentParameters);
    }
  }, {
    key: 'getCucumberExpression',
    value: function getCucumberExpression(parameterTypeRegistry) {
      if (typeof this.pattern === 'string') {
        return new _cucumberExpressions.CucumberExpression(this.pattern, parameterTypeRegistry);
      }
      return new _cucumberExpressions.RegularExpression(this.pattern, parameterTypeRegistry);
    }
  }, {
    key: 'getValidCodeLengths',
    value: function getValidCodeLengths(parameters) {
      return [parameters.length, parameters.length + 1];
    }
  }, {
    key: 'matchesStepName',
    value: function matchesStepName(_ref3) {
      var stepName = _ref3.stepName,
          parameterTypeRegistry = _ref3.parameterTypeRegistry;

      var cucumberExpression = this.getCucumberExpression(parameterTypeRegistry);
      return Boolean(cucumberExpression.match(stepName));
    }
  }]);
  return StepDefinition;
}();

exports.default = StepDefinition;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc3RlcF9kZWZpbml0aW9uLmpzIl0sIm5hbWVzIjpbIlN0ZXBEZWZpbml0aW9uIiwiY29kZSIsImxpbmUiLCJvcHRpb25zIiwicGF0dGVybiIsInVyaSIsInN5bmNPclByb21pc2VMZW5ndGgiLCJjYWxsYmFja0xlbmd0aCIsImxlbmd0aCIsInBhcmFtZXRlcnMiLCJidWlsZEludmFsaWRDb2RlTGVuZ3RoTWVzc2FnZSIsInN0ZXAiLCJwYXJhbWV0ZXJUeXBlUmVnaXN0cnkiLCJ3b3JsZCIsImN1Y3VtYmVyRXhwcmVzc2lvbiIsImdldEN1Y3VtYmVyRXhwcmVzc2lvbiIsInN0ZXBOYW1lUGFyYW1ldGVycyIsIm1hdGNoIiwidGV4dCIsIm1hcCIsImFyZyIsImdldFZhbHVlIiwiaXRlcmF0b3IiLCJkYXRhVGFibGUiLCJkb2NTdHJpbmciLCJjb250ZW50Iiwic3RlcEFyZ3VtZW50UGFyYW1ldGVycyIsImFyZ3VtZW50cyIsImNvbmNhdCIsInN0ZXBOYW1lIiwiQm9vbGVhbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0lBRXFCQSxjO0FBQ25CLGdDQUFtRDtBQUFBLFFBQXJDQyxJQUFxQyxRQUFyQ0EsSUFBcUM7QUFBQSxRQUEvQkMsSUFBK0IsUUFBL0JBLElBQStCO0FBQUEsUUFBekJDLE9BQXlCLFFBQXpCQSxPQUF5QjtBQUFBLFFBQWhCQyxPQUFnQixRQUFoQkEsT0FBZ0I7QUFBQSxRQUFQQyxHQUFPLFFBQVBBLEdBQU87QUFBQTs7QUFDakQsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0Q7Ozs7a0RBRTZCQyxtQixFQUFxQkMsYyxFQUFnQjtBQUNqRSxhQUNFLGtCQUFnQixLQUFLTixJQUFMLENBQVVPLE1BQTFCLHNDQUNpQkYsbUJBRGpCLDJEQUVPQyxjQUZQLGdDQURGO0FBS0Q7OztnREFFMkJFLFUsRUFBWTtBQUN0QyxhQUFPLEtBQUtDLDZCQUFMLENBQ0xELFdBQVdELE1BRE4sRUFFTEMsV0FBV0QsTUFBWCxHQUFvQixDQUZmLENBQVA7QUFJRDs7O21EQUUrRDtBQUFBLFVBQXRDRyxJQUFzQyxTQUF0Q0EsSUFBc0M7QUFBQSxVQUFoQ0MscUJBQWdDLFNBQWhDQSxxQkFBZ0M7QUFBQSxVQUFUQyxLQUFTLFNBQVRBLEtBQVM7O0FBQzlELFVBQU1DLHFCQUFxQixLQUFLQyxxQkFBTCxDQUEyQkgscUJBQTNCLENBQTNCO0FBQ0EsVUFBTUkscUJBQXFCRixtQkFDeEJHLEtBRHdCLENBQ2xCTixLQUFLTyxJQURhLEVBRXhCQyxHQUZ3QixDQUVwQjtBQUFBLGVBQU9DLElBQUlDLFFBQUosQ0FBYVIsS0FBYixDQUFQO0FBQUEsT0FGb0IsQ0FBM0I7QUFHQSxVQUFNUyxXQUFXLCtDQUEwQjtBQUN6Q0MsbUJBQVc7QUFBQSxpQkFBTyx5QkFBY0gsR0FBZCxDQUFQO0FBQUEsU0FEOEI7QUFFekNJLG1CQUFXO0FBQUEsaUJBQU9KLElBQUlLLE9BQVg7QUFBQTtBQUY4QixPQUExQixDQUFqQjtBQUlBLFVBQU1DLHlCQUF5QmYsS0FBS2dCLFNBQUwsQ0FBZVIsR0FBZixDQUFtQkcsUUFBbkIsQ0FBL0I7QUFDQSxhQUFPTixtQkFBbUJZLE1BQW5CLENBQTBCRixzQkFBMUIsQ0FBUDtBQUNEOzs7MENBRXFCZCxxQixFQUF1QjtBQUMzQyxVQUFJLE9BQU8sS0FBS1IsT0FBWixLQUF3QixRQUE1QixFQUFzQztBQUNwQyxlQUFPLDRDQUF1QixLQUFLQSxPQUE1QixFQUFxQ1EscUJBQXJDLENBQVA7QUFDRDtBQUNELGFBQU8sMkNBQXNCLEtBQUtSLE9BQTNCLEVBQW9DUSxxQkFBcEMsQ0FBUDtBQUNEOzs7d0NBRW1CSCxVLEVBQVk7QUFDOUIsYUFBTyxDQUFDQSxXQUFXRCxNQUFaLEVBQW9CQyxXQUFXRCxNQUFYLEdBQW9CLENBQXhDLENBQVA7QUFDRDs7OzJDQUVvRDtBQUFBLFVBQW5DcUIsUUFBbUMsU0FBbkNBLFFBQW1DO0FBQUEsVUFBekJqQixxQkFBeUIsU0FBekJBLHFCQUF5Qjs7QUFDbkQsVUFBTUUscUJBQXFCLEtBQUtDLHFCQUFMLENBQTJCSCxxQkFBM0IsQ0FBM0I7QUFDQSxhQUFPa0IsUUFBUWhCLG1CQUFtQkcsS0FBbkIsQ0FBeUJZLFFBQXpCLENBQVIsQ0FBUDtBQUNEOzs7OztrQkFuRGtCN0IsYyIsImZpbGUiOiJzdGVwX2RlZmluaXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdWN1bWJlckV4cHJlc3Npb24sIFJlZ3VsYXJFeHByZXNzaW9uIH0gZnJvbSAnY3VjdW1iZXItZXhwcmVzc2lvbnMnXG5pbXBvcnQgRGF0YVRhYmxlIGZyb20gJy4vZGF0YV90YWJsZSdcbmltcG9ydCB7IGJ1aWxkU3RlcEFyZ3VtZW50SXRlcmF0b3IgfSBmcm9tICcuLi9zdGVwX2FyZ3VtZW50cydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcERlZmluaXRpb24ge1xuICBjb25zdHJ1Y3Rvcih7IGNvZGUsIGxpbmUsIG9wdGlvbnMsIHBhdHRlcm4sIHVyaSB9KSB7XG4gICAgdGhpcy5jb2RlID0gY29kZVxuICAgIHRoaXMubGluZSA9IGxpbmVcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5wYXR0ZXJuID0gcGF0dGVyblxuICAgIHRoaXMudXJpID0gdXJpXG4gIH1cblxuICBidWlsZEludmFsaWRDb2RlTGVuZ3RoTWVzc2FnZShzeW5jT3JQcm9taXNlTGVuZ3RoLCBjYWxsYmFja0xlbmd0aCkge1xuICAgIHJldHVybiAoXG4gICAgICBgZnVuY3Rpb24gaGFzICR7dGhpcy5jb2RlLmxlbmd0aH0gYXJndW1lbnRzYCArXG4gICAgICBgLCBzaG91bGQgaGF2ZSAke3N5bmNPclByb21pc2VMZW5ndGh9IChpZiBzeW5jaHJvbm91cyBvciByZXR1cm5pbmcgYSBwcm9taXNlKWAgK1xuICAgICAgYCBvciAke2NhbGxiYWNrTGVuZ3RofSAoaWYgYWNjZXB0aW5nIGEgY2FsbGJhY2spYFxuICAgIClcbiAgfVxuXG4gIGdldEludmFsaWRDb2RlTGVuZ3RoTWVzc2FnZShwYXJhbWV0ZXJzKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRJbnZhbGlkQ29kZUxlbmd0aE1lc3NhZ2UoXG4gICAgICBwYXJhbWV0ZXJzLmxlbmd0aCxcbiAgICAgIHBhcmFtZXRlcnMubGVuZ3RoICsgMVxuICAgIClcbiAgfVxuXG4gIGdldEludm9jYXRpb25QYXJhbWV0ZXJzKHsgc3RlcCwgcGFyYW1ldGVyVHlwZVJlZ2lzdHJ5LCB3b3JsZCB9KSB7XG4gICAgY29uc3QgY3VjdW1iZXJFeHByZXNzaW9uID0gdGhpcy5nZXRDdWN1bWJlckV4cHJlc3Npb24ocGFyYW1ldGVyVHlwZVJlZ2lzdHJ5KVxuICAgIGNvbnN0IHN0ZXBOYW1lUGFyYW1ldGVycyA9IGN1Y3VtYmVyRXhwcmVzc2lvblxuICAgICAgLm1hdGNoKHN0ZXAudGV4dClcbiAgICAgIC5tYXAoYXJnID0+IGFyZy5nZXRWYWx1ZSh3b3JsZCkpXG4gICAgY29uc3QgaXRlcmF0b3IgPSBidWlsZFN0ZXBBcmd1bWVudEl0ZXJhdG9yKHtcbiAgICAgIGRhdGFUYWJsZTogYXJnID0+IG5ldyBEYXRhVGFibGUoYXJnKSxcbiAgICAgIGRvY1N0cmluZzogYXJnID0+IGFyZy5jb250ZW50LFxuICAgIH0pXG4gICAgY29uc3Qgc3RlcEFyZ3VtZW50UGFyYW1ldGVycyA9IHN0ZXAuYXJndW1lbnRzLm1hcChpdGVyYXRvcilcbiAgICByZXR1cm4gc3RlcE5hbWVQYXJhbWV0ZXJzLmNvbmNhdChzdGVwQXJndW1lbnRQYXJhbWV0ZXJzKVxuICB9XG5cbiAgZ2V0Q3VjdW1iZXJFeHByZXNzaW9uKHBhcmFtZXRlclR5cGVSZWdpc3RyeSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBDdWN1bWJlckV4cHJlc3Npb24odGhpcy5wYXR0ZXJuLCBwYXJhbWV0ZXJUeXBlUmVnaXN0cnkpXG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVndWxhckV4cHJlc3Npb24odGhpcy5wYXR0ZXJuLCBwYXJhbWV0ZXJUeXBlUmVnaXN0cnkpXG4gIH1cblxuICBnZXRWYWxpZENvZGVMZW5ndGhzKHBhcmFtZXRlcnMpIHtcbiAgICByZXR1cm4gW3BhcmFtZXRlcnMubGVuZ3RoLCBwYXJhbWV0ZXJzLmxlbmd0aCArIDFdXG4gIH1cblxuICBtYXRjaGVzU3RlcE5hbWUoeyBzdGVwTmFtZSwgcGFyYW1ldGVyVHlwZVJlZ2lzdHJ5IH0pIHtcbiAgICBjb25zdCBjdWN1bWJlckV4cHJlc3Npb24gPSB0aGlzLmdldEN1Y3VtYmVyRXhwcmVzc2lvbihwYXJhbWV0ZXJUeXBlUmVnaXN0cnkpXG4gICAgcmV0dXJuIEJvb2xlYW4oY3VjdW1iZXJFeHByZXNzaW9uLm1hdGNoKHN0ZXBOYW1lKSlcbiAgfVxufVxuIl19