'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('../formatter/helpers');

var _stack_trace_filter = require('./stack_trace_filter');

var _stack_trace_filter2 = _interopRequireDefault(_stack_trace_filter);

var _status = require('../status');

var _status2 = _interopRequireDefault(_status);

var _test_case_runner = require('./test_case_runner');

var _test_case_runner2 = _interopRequireDefault(_test_case_runner);

var _user_code_runner = require('../user_code_runner');

var _user_code_runner2 = _interopRequireDefault(_user_code_runner);

var _verror = require('verror');

var _verror2 = _interopRequireDefault(_verror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Runtime = function () {
  // options - {dryRun, failFast, filterStacktraces, strict}
  function Runtime(_ref) {
    var eventBroadcaster = _ref.eventBroadcaster,
        options = _ref.options,
        supportCodeLibrary = _ref.supportCodeLibrary,
        testCases = _ref.testCases;
    (0, _classCallCheck3.default)(this, Runtime);

    this.eventBroadcaster = eventBroadcaster;
    this.options = options || {};
    this.stackTraceFilter = new _stack_trace_filter2.default();
    this.supportCodeLibrary = supportCodeLibrary;
    this.testCases = testCases || [];
    this.result = {
      duration: 0,
      success: true
    };
  }

  (0, _createClass3.default)(Runtime, [{
    key: 'runTestRunHooks',
    value: function () {
      var _ref2 = (0, _bluebird.coroutine)(function* (key, name) {
        var _this = this;

        yield _bluebird2.default.each(this.supportCodeLibrary[key], function () {
          var _ref3 = (0, _bluebird.coroutine)(function* (hookDefinition) {
            var _ref4 = yield _user_code_runner2.default.run({
              argsArray: [],
              fn: hookDefinition.code,
              thisArg: null,
              timeoutInMilliseconds: hookDefinition.options.timeout || _this.supportCodeLibrary.defaultTimeout
            }),
                error = _ref4.error;

            if (error) {
              var location = (0, _helpers.formatLocation)(hookDefinition);
              throw new _verror2.default(error, name + ' hook errored, process exiting: ' + location);
            }
          });

          return function (_x3) {
            return _ref3.apply(this, arguments);
          };
        }());
      });

      function runTestRunHooks(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return runTestRunHooks;
    }()
  }, {
    key: 'runTestCase',
    value: function () {
      var _ref5 = (0, _bluebird.coroutine)(function* (testCase) {
        var skip = this.options.dryRun || this.options.failFast && !this.result.success;
        var testCaseRunner = new _test_case_runner2.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: skip,
          supportCodeLibrary: this.supportCodeLibrary,
          testCase: testCase,
          worldParameters: this.options.worldParameters
        });
        var testCaseResult = yield testCaseRunner.run();
        if (testCaseResult.duration) {
          this.result.duration += testCaseResult.duration;
        }
        if (this.shouldCauseFailure(testCaseResult.status)) {
          this.result.success = false;
        }
      });

      function runTestCase(_x4) {
        return _ref5.apply(this, arguments);
      }

      return runTestCase;
    }()
  }, {
    key: 'start',
    value: function () {
      var _ref6 = (0, _bluebird.coroutine)(function* () {
        if (this.options.filterStacktraces) {
          this.stackTraceFilter.filter();
        }
        this.eventBroadcaster.emit('test-run-started');
        yield this.runTestRunHooks('beforeTestRunHookDefinitions', 'a BeforeAll');
        yield _bluebird2.default.each(this.testCases, this.runTestCase.bind(this));
        yield this.runTestRunHooks('afterTestRunHookDefinitions', 'an AfterAll');
        this.eventBroadcaster.emit('test-run-finished', { result: this.result });
        if (this.options.filterStacktraces) {
          this.stackTraceFilter.unfilter();
        }
        return this.result.success;
      });

      function start() {
        return _ref6.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'shouldCauseFailure',
    value: function shouldCauseFailure(status) {
      return _lodash2.default.includes([_status2.default.AMBIGUOUS, _status2.default.FAILED, _status2.default.UNDEFINED], status) || status === _status2.default.PENDING && this.options.strict;
    }
  }]);
  return Runtime;
}();

exports.default = Runtime;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydW50aW1lL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJ1bnRpbWUiLCJldmVudEJyb2FkY2FzdGVyIiwib3B0aW9ucyIsInN1cHBvcnRDb2RlTGlicmFyeSIsInRlc3RDYXNlcyIsInN0YWNrVHJhY2VGaWx0ZXIiLCJyZXN1bHQiLCJkdXJhdGlvbiIsInN1Y2Nlc3MiLCJrZXkiLCJuYW1lIiwiZWFjaCIsImhvb2tEZWZpbml0aW9uIiwicnVuIiwiYXJnc0FycmF5IiwiZm4iLCJjb2RlIiwidGhpc0FyZyIsInRpbWVvdXRJbk1pbGxpc2Vjb25kcyIsInRpbWVvdXQiLCJkZWZhdWx0VGltZW91dCIsImVycm9yIiwibG9jYXRpb24iLCJ0ZXN0Q2FzZSIsInNraXAiLCJkcnlSdW4iLCJmYWlsRmFzdCIsInRlc3RDYXNlUnVubmVyIiwid29ybGRQYXJhbWV0ZXJzIiwidGVzdENhc2VSZXN1bHQiLCJzaG91bGRDYXVzZUZhaWx1cmUiLCJzdGF0dXMiLCJmaWx0ZXJTdGFja3RyYWNlcyIsImZpbHRlciIsImVtaXQiLCJydW5UZXN0UnVuSG9va3MiLCJydW5UZXN0Q2FzZSIsInVuZmlsdGVyIiwiaW5jbHVkZXMiLCJBTUJJR1VPVVMiLCJGQUlMRUQiLCJVTkRFRklORUQiLCJQRU5ESU5HIiwic3RyaWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsTztBQUNuQjtBQUNBLHlCQUEwRTtBQUFBLFFBQTVEQyxnQkFBNEQsUUFBNURBLGdCQUE0RDtBQUFBLFFBQTFDQyxPQUEwQyxRQUExQ0EsT0FBMEM7QUFBQSxRQUFqQ0Msa0JBQWlDLFFBQWpDQSxrQkFBaUM7QUFBQSxRQUFiQyxTQUFhLFFBQWJBLFNBQWE7QUFBQTs7QUFDeEUsU0FBS0gsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsV0FBVyxFQUEx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U0FBekMsQ0FBWCxFQUFnRVYsTUFBaEUsS0FDQ0EsV0FBVyxpQkFBT1csT0FBbEIsSUFBNkIsS0FBS3hDLE9BQUwsQ0FBYXlDLE1BRjdDO0FBSUQ7Ozs7O2tCQXpFa0IzQyxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgZm9ybWF0TG9jYXRpb24gfSBmcm9tICcuLi9mb3JtYXR0ZXIvaGVscGVycydcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IFN0YWNrVHJhY2VGaWx0ZXIgZnJvbSAnLi9zdGFja190cmFjZV9maWx0ZXInXG5pbXBvcnQgU3RhdHVzIGZyb20gJy4uL3N0YXR1cydcbmltcG9ydCBUZXN0Q2FzZVJ1bm5lciBmcm9tICcuL3Rlc3RfY2FzZV9ydW5uZXInXG5pbXBvcnQgVXNlckNvZGVSdW5uZXIgZnJvbSAnLi4vdXNlcl9jb2RlX3J1bm5lcidcbmltcG9ydCBWRXJyb3IgZnJvbSAndmVycm9yJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW50aW1lIHtcbiAgLy8gb3B0aW9ucyAtIHtkcnlSdW4sIGZhaWxGYXN0LCBmaWx0ZXJTdGFja3RyYWNlcywgc3RyaWN0fVxuICBjb25zdHJ1Y3Rvcih7IGV2ZW50QnJvYWRjYXN0ZXIsIG9wdGlvbnMsIHN1cHBvcnRDb2RlTGlicmFyeSwgdGVzdENhc2VzIH0pIHtcbiAgICB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIgPSBldmVudEJyb2FkY2FzdGVyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuc3RhY2tUcmFjZUZpbHRlciA9IG5ldyBTdGFja1RyYWNlRmlsdGVyKClcbiAgICB0aGlzLnN1cHBvcnRDb2RlTGlicmFyeSA9IHN1cHBvcnRDb2RlTGlicmFyeVxuICAgIHRoaXMudGVzdENhc2VzID0gdGVzdENhc2VzIHx8IFtdXG4gICAgdGhpcy5yZXN1bHQgPSB7XG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcnVuVGVzdFJ1bkhvb2tzKGtleSwgbmFtZSkge1xuICAgIGF3YWl0IFByb21pc2UuZWFjaCh0aGlzLnN1cHBvcnRDb2RlTGlicmFyeVtrZXldLCBhc3luYyBob29rRGVmaW5pdGlvbiA9PiB7XG4gICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBVc2VyQ29kZVJ1bm5lci5ydW4oe1xuICAgICAgICBhcmdzQXJyYXk6IFtdLFxuICAgICAgICBmbjogaG9va0RlZmluaXRpb24uY29kZSxcbiAgICAgICAgdGhpc0FyZzogbnVsbCxcbiAgICAgICAgdGltZW91dEluTWlsbGlzZWNvbmRzOlxuICAgICAgICAgIGhvb2tEZWZpbml0aW9uLm9wdGlvbnMudGltZW91dCB8fFxuICAgICAgICAgIHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5LmRlZmF1bHRUaW1lb3V0LFxuICAgICAgfSlcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGZvcm1hdExvY2F0aW9uKGhvb2tEZWZpbml0aW9uKVxuICAgICAgICB0aHJvdyBuZXcgVkVycm9yKFxuICAgICAgICAgIGVycm9yLFxuICAgICAgICAgIGAke25hbWV9IGhvb2sgZXJyb3JlZCwgcHJvY2VzcyBleGl0aW5nOiAke2xvY2F0aW9ufWBcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBydW5UZXN0Q2FzZSh0ZXN0Q2FzZSkge1xuICAgIGNvbnN0IHNraXAgPVxuICAgICAgdGhpcy5vcHRpb25zLmRyeVJ1biB8fCAodGhpcy5vcHRpb25zLmZhaWxGYXN0ICYmICF0aGlzLnJlc3VsdC5zdWNjZXNzKVxuICAgIGNvbnN0IHRlc3RDYXNlUnVubmVyID0gbmV3IFRlc3RDYXNlUnVubmVyKHtcbiAgICAgIGV2ZW50QnJvYWRjYXN0ZXI6IHRoaXMuZXZlbnRCcm9hZGNhc3RlcixcbiAgICAgIHNraXAsXG4gICAgICBzdXBwb3J0Q29kZUxpYnJhcnk6IHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5LFxuICAgICAgdGVzdENhc2UsXG4gICAgICB3b3JsZFBhcmFtZXRlcnM6IHRoaXMub3B0aW9ucy53b3JsZFBhcmFtZXRlcnMsXG4gICAgfSlcbiAgICBjb25zdCB0ZXN0Q2FzZVJlc3VsdCA9IGF3YWl0IHRlc3RDYXNlUnVubmVyLnJ1bigpXG4gICAgaWYgKHRlc3RDYXNlUmVzdWx0LmR1cmF0aW9uKSB7XG4gICAgICB0aGlzLnJlc3VsdC5kdXJhdGlvbiArPSB0ZXN0Q2FzZVJlc3VsdC5kdXJhdGlvblxuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRDYXVzZUZhaWx1cmUodGVzdENhc2VSZXN1bHQuc3RhdHVzKSkge1xuICAgICAgdGhpcy5yZXN1bHQuc3VjY2VzcyA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXJTdGFja3RyYWNlcykge1xuICAgICAgdGhpcy5zdGFja1RyYWNlRmlsdGVyLmZpbHRlcigpXG4gICAgfVxuICAgIHRoaXMuZXZlbnRCcm9hZGNhc3Rlci5lbWl0KCd0ZXN0LXJ1bi1zdGFydGVkJylcbiAgICBhd2FpdCB0aGlzLnJ1blRlc3RSdW5Ib29rcygnYmVmb3JlVGVzdFJ1bkhvb2tEZWZpbml0aW9ucycsICdhIEJlZm9yZUFsbCcpXG4gICAgYXdhaXQgUHJvbWlzZS5lYWNoKHRoaXMudGVzdENhc2VzLCA6OnRoaXMucnVuVGVzdENhc2UpXG4gICAgYXdhaXQgdGhpcy5ydW5UZXN0UnVuSG9va3MoJ2FmdGVyVGVzdFJ1bkhvb2tEZWZpbml0aW9ucycsICdhbiBBZnRlckFsbCcpXG4gICAgdGhpcy5ldmVudEJyb2FkY2FzdGVyLmVtaXQoJ3Rlc3QtcnVuLWZpbmlzaGVkJywgeyByZXN1bHQ6IHRoaXMucmVzdWx0IH0pXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXJTdGFja3RyYWNlcykge1xuICAgICAgdGhpcy5zdGFja1RyYWNlRmlsdGVyLnVuZmlsdGVyKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0LnN1Y2Nlc3NcbiAgfVxuXG4gIHNob3VsZENhdXNlRmFpbHVyZShzdGF0dXMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgXy5pbmNsdWRlcyhbU3RhdHVzLkFNQklHVU9VUywgU3RhdHVzLkZBSUxFRCwgU3RhdHVzLlVOREVGSU5FRF0sIHN0YXR1cykgfHxcbiAgICAgIChzdGF0dXMgPT09IFN0YXR1cy5QRU5ESU5HICYmIHRoaXMub3B0aW9ucy5zdHJpY3QpXG4gICAgKVxuICB9XG59XG4iXX0=