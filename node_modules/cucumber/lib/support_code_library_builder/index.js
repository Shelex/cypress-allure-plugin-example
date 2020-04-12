'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupportCodeLibraryBuilder = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _parameter_type_registry_builder = require('./parameter_type_registry_builder');

var _parameter_type_registry_builder2 = _interopRequireDefault(_parameter_type_registry_builder);

var _define_helpers = require('./define_helpers');

var _finalize_helpers = require('./finalize_helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SupportCodeLibraryBuilder = exports.SupportCodeLibraryBuilder = function () {
  function SupportCodeLibraryBuilder() {
    var _this = this;

    (0, _classCallCheck3.default)(this, SupportCodeLibraryBuilder);

    this.methods = {
      defineParameterType: (0, _define_helpers.defineParameterType)(this),
      After: (0, _define_helpers.defineTestCaseHook)(this, 'afterTestCaseHookDefinitions'),
      AfterAll: (0, _define_helpers.defineTestRunHook)(this, 'afterTestRunHookDefinitions'),
      Before: (0, _define_helpers.defineTestCaseHook)(this, 'beforeTestCaseHookDefinitions'),
      BeforeAll: (0, _define_helpers.defineTestRunHook)(this, 'beforeTestRunHookDefinitions'),
      defineStep: (0, _define_helpers.defineStep)(this),
      defineSupportCode: _util2.default.deprecate(function (fn) {
        fn(_this.methods);
      }, 'cucumber: defineSupportCode is deprecated. Please require/import the individual methods instead.'),
      setDefaultTimeout: function setDefaultTimeout(milliseconds) {
        _this.options.defaultTimeout = milliseconds;
      },
      setDefinitionFunctionWrapper: function setDefinitionFunctionWrapper(fn) {
        _this.options.definitionFunctionWrapper = fn;
      },
      setWorldConstructor: function setWorldConstructor(fn) {
        _this.options.World = fn;
      }
    };
    this.methods.Given = this.methods.When = this.methods.Then = this.methods.defineStep;
  }

  (0, _createClass3.default)(SupportCodeLibraryBuilder, [{
    key: 'finalize',
    value: function finalize() {
      var _this2 = this;

      (0, _finalize_helpers.wrapDefinitions)({
        cwd: this.cwd,
        definitionFunctionWrapper: this.options.definitionFunctionWrapper,
        definitions: _lodash2.default.chain(['afterTestCaseHook', 'afterTestRunHook', 'beforeTestCaseHook', 'beforeTestRunHook', 'step']).map(function (key) {
          return _this2.options[key + 'Definitions'];
        }).flatten().value()
      });
      this.options.afterTestCaseHookDefinitions.reverse();
      this.options.afterTestRunHookDefinitions.reverse();
      return this.options;
    }
  }, {
    key: 'reset',
    value: function reset(cwd) {
      this.cwd = cwd;
      this.options = _lodash2.default.cloneDeep({
        afterTestCaseHookDefinitions: [],
        afterTestRunHookDefinitions: [],
        beforeTestCaseHookDefinitions: [],
        beforeTestRunHookDefinitions: [],
        defaultTimeout: 5000,
        definitionFunctionWrapper: null,
        stepDefinitions: [],
        parameterTypeRegistry: _parameter_type_registry_builder2.default.build(),
        World: function World(_ref) {
          var attach = _ref.attach,
              parameters = _ref.parameters;

          this.attach = attach;
          this.parameters = parameters;
        }
      });
    }
  }]);
  return SupportCodeLibraryBuilder;
}();

exports.default = new SupportCodeLibraryBuilder();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdXBwb3J0X2NvZGVfbGlicmFyeV9idWlsZGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbIlN1cHBvcnRDb2RlTGlicmFyeUJ1aWxkZXIiLCJtZXRob2RzIiwiZGVmaW5lUGFyYW1ldGVyVHlwZSIsIkFmdGVyIiwiQWZ0ZXJBbGwiLCJCZWZvcmUiLCJCZWZvcmVBbGwiLCJkZWZpbmVTdGVwIiwiZGVmaW5lU3VwcG9ydENvZGUiLCJkZXByZWNhdGUiLCJmbiIsInNldERlZmF1bHRUaW1lb3V0Iiwib3B0aW9ucyIsImRlZmF1bHRUaW1lb3V0IiwibWlsbGlzZWNvbmRzIiwic2V0RGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlciIsImRlZmluaXRpb25GdW5jdGlvbldyYXBwZXIiLCJzZXRXb3JsZENvbnN0cnVjdG9yIiwiV29ybGQiLCJHaXZlbiIsIldoZW4iLCJUaGVuIiwiY3dkIiwiZGVmaW5pdGlvbnMiLCJjaGFpbiIsIm1hcCIsImtleSIsImZsYXR0ZW4iLCJ2YWx1ZSIsImFmdGVyVGVzdENhc2VIb29rRGVmaW5pdGlvbnMiLCJyZXZlcnNlIiwiYWZ0ZXJUZXN0UnVuSG9va0RlZmluaXRpb25zIiwiY2xvbmVEZWVwIiwiYmVmb3JlVGVzdENhc2VIb29rRGVmaW5pdGlvbnMiLCJiZWZvcmVUZXN0UnVuSG9va0RlZmluaXRpb25zIiwic3RlcERlZmluaXRpb25zIiwicGFyYW1ldGVyVHlwZVJlZ2lzdHJ5IiwiYnVpbGQiLCJhdHRhY2giLCJwYXJhbWV0ZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFNQTs7OztJQUVhQSx5QixXQUFBQSx5QjtBQUNYLHVDQUFjO0FBQUE7O0FBQUE7O0FBQ1osU0FBS0MsT0FBTCxHQUFlO0FBQ2JDLDJCQUFxQix5Q0FBb0IsSUFBcEIsQ0FEUjtBQUViQyxhQUFPLHdDQUFtQixJQUFuQixFQUF5Qiw4QkFBekIsQ0FGTTtBQUdiQyxnQkFBVSx1Q0FBa0IsSUFBbEIsRUFBd0IsNkJBQXhCLENBSEc7QUFJYkMsY0FBUSx3Q0FBbUIsSUFBbkIsRUFBeUIsK0JBQXpCLENBSks7QUFLYkMsaUJBQVcsdUNBQWtCLElBQWxCLEVBQXdCLDhCQUF4QixDQUxFO0FBTWJDLGtCQUFZLGdDQUFXLElBQVgsQ0FOQztBQU9iQyx5QkFBbUIsZUFBS0MsU0FBTCxDQUFlLGNBQU07QUFDdENDLFdBQUcsTUFBS1QsT0FBUjtBQUNELE9BRmtCLEVBRWhCLGtHQUZnQixDQVBOO0FBVWJVLHlCQUFtQix5Q0FBZ0I7QUFDakMsY0FBS0MsT0FBTCxDQUFhQyxjQUFiLEdBQThCQyxZQUE5QjtBQUNELE9BWlk7QUFhYkMsb0NBQThCLDBDQUFNO0FBQ2xDLGNBQUtILE9BQUwsQ0FBYUkseUJBQWIsR0FBeUNOLEVBQXpDO0FBQ0QsT0FmWTtBQWdCYk8sMkJBQXFCLGlDQUFNO0FBQ3pCLGNBQUtMLE9BQUwsQ0FBYU0sS0FBYixHQUFxQlIsRUFBckI7QUFDRDtBQWxCWSxLQUFmO0FBb0JBLFNBQUtULE9BQUwsQ0FBYWtCLEtBQWIsR0FBcUIsS0FBS2xCLE9BQUwsQ0FBYW1CLElBQWIsR0FBb0IsS0FBS25CLE9BQUwsQ0FBYW9CLElBQWIsR0FBb0IsS0FBS3BCLE9BQUwsQ0FBYU0sVUFBMUU7QUFDRDs7OzsrQkFFVTtBQUFBOztBQUNULDZDQUFnQjtBQUNkZSxhQUFLLEtBQUtBLEdBREk7QUFFZE4sbUNBQTJCLEtBQUtKLE9BQUwsQ0FBYUkseUJBRjFCO0FBR2RPLHFCQUFhLGlCQUFFQyxLQUFGLENBQVEsQ0FDbkIsbUJBRG1CLEVBRW5CLGtCQUZtQixFQUduQixvQkFIbUIsRUFJbkIsbUJBSm1CLEVBS25CLE1BTG1CLENBQVIsRUFPVkMsR0FQVSxDQU9OO0FBQUEsaUJBQU8sT0FBS2IsT0FBTCxDQUFnQmMsR0FBaEIsaUJBQVA7QUFBQSxTQVBNLEVBUVZDLE9BUlUsR0FTVkMsS0FUVTtBQUhDLE9BQWhCO0FBY0EsV0FBS2hCLE9BQUwsQ0FBYWlCLDRCQUFiLENBQTBDQyxPQUExQztBQUNBLFdBQUtsQixPQUFMLENBQWFtQiwyQkFBYixDQUF5Q0QsT0FBekM7QUFDQSxhQUFPLEtBQUtsQixPQUFaO0FBQ0Q7OzswQkFFS1UsRyxFQUFLO0FBQ1QsV0FBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsV0FBS1YsT0FBTCxHQUFlLGlCQUFFb0IsU0FBRixDQUFZO0FBQ3pCSCxzQ0FBOEIsRUFETDtBQUV6QkUscUNBQTZCLEVBRko7QUFHekJFLHVDQUErQixFQUhOO0FBSXpCQyxzQ0FBOEIsRUFKTDtBQUt6QnJCLHdCQUFnQixJQUxTO0FBTXpCRyxtQ0FBMkIsSUFORjtBQU96Qm1CLHlCQUFpQixFQVBRO0FBUXpCQywrQkFBdUIsMENBQXVCQyxLQUF2QixFQVJFO0FBU3pCbkIsYUFUeUIsdUJBU0s7QUFBQSxjQUF0Qm9CLE1BQXNCLFFBQXRCQSxNQUFzQjtBQUFBLGNBQWRDLFVBQWMsUUFBZEEsVUFBYzs7QUFDNUIsZUFBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsZUFBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDRDtBQVp3QixPQUFaLENBQWY7QUFjRDs7Ozs7a0JBR1ksSUFBSXZDLHlCQUFKLEUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgdXRpbCBmcm9tICd1dGlsJ1xuaW1wb3J0IFRyYW5zZm9ybUxvb2t1cEJ1aWxkZXIgZnJvbSAnLi9wYXJhbWV0ZXJfdHlwZV9yZWdpc3RyeV9idWlsZGVyJ1xuaW1wb3J0IHtcbiAgZGVmaW5lVGVzdFJ1bkhvb2ssXG4gIGRlZmluZVBhcmFtZXRlclR5cGUsXG4gIGRlZmluZVRlc3RDYXNlSG9vayxcbiAgZGVmaW5lU3RlcCxcbn0gZnJvbSAnLi9kZWZpbmVfaGVscGVycydcbmltcG9ydCB7IHdyYXBEZWZpbml0aW9ucyB9IGZyb20gJy4vZmluYWxpemVfaGVscGVycydcblxuZXhwb3J0IGNsYXNzIFN1cHBvcnRDb2RlTGlicmFyeUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1ldGhvZHMgPSB7XG4gICAgICBkZWZpbmVQYXJhbWV0ZXJUeXBlOiBkZWZpbmVQYXJhbWV0ZXJUeXBlKHRoaXMpLFxuICAgICAgQWZ0ZXI6IGRlZmluZVRlc3RDYXNlSG9vayh0aGlzLCAnYWZ0ZXJUZXN0Q2FzZUhvb2tEZWZpbml0aW9ucycpLFxuICAgICAgQWZ0ZXJBbGw6IGRlZmluZVRlc3RSdW5Ib29rKHRoaXMsICdhZnRlclRlc3RSdW5Ib29rRGVmaW5pdGlvbnMnKSxcbiAgICAgIEJlZm9yZTogZGVmaW5lVGVzdENhc2VIb29rKHRoaXMsICdiZWZvcmVUZXN0Q2FzZUhvb2tEZWZpbml0aW9ucycpLFxuICAgICAgQmVmb3JlQWxsOiBkZWZpbmVUZXN0UnVuSG9vayh0aGlzLCAnYmVmb3JlVGVzdFJ1bkhvb2tEZWZpbml0aW9ucycpLFxuICAgICAgZGVmaW5lU3RlcDogZGVmaW5lU3RlcCh0aGlzKSxcbiAgICAgIGRlZmluZVN1cHBvcnRDb2RlOiB1dGlsLmRlcHJlY2F0ZShmbiA9PiB7XG4gICAgICAgIGZuKHRoaXMubWV0aG9kcylcbiAgICAgIH0sICdjdWN1bWJlcjogZGVmaW5lU3VwcG9ydENvZGUgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHJlcXVpcmUvaW1wb3J0IHRoZSBpbmRpdmlkdWFsIG1ldGhvZHMgaW5zdGVhZC4nKSxcbiAgICAgIHNldERlZmF1bHRUaW1lb3V0OiBtaWxsaXNlY29uZHMgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZGVmYXVsdFRpbWVvdXQgPSBtaWxsaXNlY29uZHNcbiAgICAgIH0sXG4gICAgICBzZXREZWZpbml0aW9uRnVuY3Rpb25XcmFwcGVyOiBmbiA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kZWZpbml0aW9uRnVuY3Rpb25XcmFwcGVyID0gZm5cbiAgICAgIH0sXG4gICAgICBzZXRXb3JsZENvbnN0cnVjdG9yOiBmbiA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5Xb3JsZCA9IGZuXG4gICAgICB9LFxuICAgIH1cbiAgICB0aGlzLm1ldGhvZHMuR2l2ZW4gPSB0aGlzLm1ldGhvZHMuV2hlbiA9IHRoaXMubWV0aG9kcy5UaGVuID0gdGhpcy5tZXRob2RzLmRlZmluZVN0ZXBcbiAgfVxuXG4gIGZpbmFsaXplKCkge1xuICAgIHdyYXBEZWZpbml0aW9ucyh7XG4gICAgICBjd2Q6IHRoaXMuY3dkLFxuICAgICAgZGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlcjogdGhpcy5vcHRpb25zLmRlZmluaXRpb25GdW5jdGlvbldyYXBwZXIsXG4gICAgICBkZWZpbml0aW9uczogXy5jaGFpbihbXG4gICAgICAgICdhZnRlclRlc3RDYXNlSG9vaycsXG4gICAgICAgICdhZnRlclRlc3RSdW5Ib29rJyxcbiAgICAgICAgJ2JlZm9yZVRlc3RDYXNlSG9vaycsXG4gICAgICAgICdiZWZvcmVUZXN0UnVuSG9vaycsXG4gICAgICAgICdzdGVwJyxcbiAgICAgIF0pXG4gICAgICAgIC5tYXAoa2V5ID0+IHRoaXMub3B0aW9uc1tgJHtrZXl9RGVmaW5pdGlvbnNgXSlcbiAgICAgICAgLmZsYXR0ZW4oKVxuICAgICAgICAudmFsdWUoKSxcbiAgICB9KVxuICAgIHRoaXMub3B0aW9ucy5hZnRlclRlc3RDYXNlSG9va0RlZmluaXRpb25zLnJldmVyc2UoKVxuICAgIHRoaXMub3B0aW9ucy5hZnRlclRlc3RSdW5Ib29rRGVmaW5pdGlvbnMucmV2ZXJzZSgpXG4gICAgcmV0dXJuIHRoaXMub3B0aW9uc1xuICB9XG5cbiAgcmVzZXQoY3dkKSB7XG4gICAgdGhpcy5jd2QgPSBjd2RcbiAgICB0aGlzLm9wdGlvbnMgPSBfLmNsb25lRGVlcCh7XG4gICAgICBhZnRlclRlc3RDYXNlSG9va0RlZmluaXRpb25zOiBbXSxcbiAgICAgIGFmdGVyVGVzdFJ1bkhvb2tEZWZpbml0aW9uczogW10sXG4gICAgICBiZWZvcmVUZXN0Q2FzZUhvb2tEZWZpbml0aW9uczogW10sXG4gICAgICBiZWZvcmVUZXN0UnVuSG9va0RlZmluaXRpb25zOiBbXSxcbiAgICAgIGRlZmF1bHRUaW1lb3V0OiA1MDAwLFxuICAgICAgZGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlcjogbnVsbCxcbiAgICAgIHN0ZXBEZWZpbml0aW9uczogW10sXG4gICAgICBwYXJhbWV0ZXJUeXBlUmVnaXN0cnk6IFRyYW5zZm9ybUxvb2t1cEJ1aWxkZXIuYnVpbGQoKSxcbiAgICAgIFdvcmxkKHsgYXR0YWNoLCBwYXJhbWV0ZXJzIH0pIHtcbiAgICAgICAgdGhpcy5hdHRhY2ggPSBhdHRhY2hcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1ldGVyc1xuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTdXBwb3J0Q29kZUxpYnJhcnlCdWlsZGVyKClcbiJdfQ==