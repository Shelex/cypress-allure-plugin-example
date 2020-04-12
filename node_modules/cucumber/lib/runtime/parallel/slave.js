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

var _helpers = require('../../formatter/helpers');

var _command_types = require('./command_types');

var _command_types2 = _interopRequireDefault(_command_types);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _serializeError = require('serialize-error');

var _serializeError2 = _interopRequireDefault(_serializeError);

var _stack_trace_filter = require('../stack_trace_filter');

var _stack_trace_filter2 = _interopRequireDefault(_stack_trace_filter);

var _support_code_library_builder = require('../../support_code_library_builder');

var _support_code_library_builder2 = _interopRequireDefault(_support_code_library_builder);

var _test_case_runner = require('../test_case_runner');

var _test_case_runner2 = _interopRequireDefault(_test_case_runner);

var _user_code_runner = require('../../user_code_runner');

var _user_code_runner2 = _interopRequireDefault(_user_code_runner);

var _verror = require('verror');

var _verror2 = _interopRequireDefault(_verror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENTS = ['test-case-prepared', 'test-case-started', 'test-step-started', 'test-step-attachment', 'test-step-finished', 'test-case-finished'];

function replacerSerializeErrors(key, value) {
  if (_lodash2.default.isError(value)) {
    return (0, _serializeError2.default)(value);
  }
  return value;
}

var Slave = function () {
  function Slave(_ref) {
    var _this = this;

    var cwd = _ref.cwd,
        stdin = _ref.stdin,
        stdout = _ref.stdout;
    (0, _classCallCheck3.default)(this, Slave);

    this.initialized = false;
    this.stdin = stdin;
    this.stdout = stdout;
    this.cwd = cwd;
    this.eventBroadcaster = new _events2.default();
    this.stackTraceFilter = new _stack_trace_filter2.default();
    EVENTS.forEach(function (name) {
      _this.eventBroadcaster.on(name, function (data) {
        return _this.stdout.write(JSON.stringify({ command: _command_types2.default.EVENT, name: name, data: data }, replacerSerializeErrors) + '\n');
      });
    });
  }

  (0, _createClass3.default)(Slave, [{
    key: 'initialize',
    value: function () {
      var _ref3 = (0, _bluebird.coroutine)(function* (_ref2) {
        var filterStacktraces = _ref2.filterStacktraces,
            supportCodeRequiredModules = _ref2.supportCodeRequiredModules,
            supportCodePaths = _ref2.supportCodePaths,
            worldParameters = _ref2.worldParameters;

        supportCodeRequiredModules.map(function (module) {
          return require(module);
        });
        _support_code_library_builder2.default.reset(this.cwd);
        supportCodePaths.forEach(function (codePath) {
          return require(codePath);
        });
        this.supportCodeLibrary = _support_code_library_builder2.default.finalize();
        this.worldParameters = worldParameters;
        this.filterStacktraces = filterStacktraces;
        if (this.filterStacktraces) {
          this.stackTraceFilter.filter();
        }
        yield this.runTestRunHooks('beforeTestRunHookDefinitions', 'a BeforeAll');
        this.stdout.write(JSON.stringify({ command: _command_types2.default.READY }) + '\n');
      });

      function initialize(_x) {
        return _ref3.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: 'finalize',
    value: function () {
      var _ref4 = (0, _bluebird.coroutine)(function* () {
        yield this.runTestRunHooks('afterTestRunHookDefinitions', 'an AfterAll');
        if (this.filterStacktraces) {
          this.stackTraceFilter.unfilter();
        }
        process.exit();
      });

      function finalize() {
        return _ref4.apply(this, arguments);
      }

      return finalize;
    }()
  }, {
    key: 'parseMasterLine',
    value: function parseMasterLine(line) {
      var input = JSON.parse(line);
      if (input.command === 'initialize') {
        this.initialize(input);
      } else if (input.command === 'finalize') {
        this.finalize();
      } else if (input.command === 'run') {
        this.runTestCase(input);
      }
    }
  }, {
    key: 'run',
    value: function () {
      var _ref5 = (0, _bluebird.coroutine)(function* () {
        var _this2 = this;

        this.rl = _readline2.default.createInterface({ input: this.stdin });
        this.rl.on('line', function (line) {
          _this2.parseMasterLine(line);
        });
      });

      function run() {
        return _ref5.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'runTestCase',
    value: function () {
      var _ref7 = (0, _bluebird.coroutine)(function* (_ref6) {
        var testCase = _ref6.testCase,
            skip = _ref6.skip;

        var testCaseRunner = new _test_case_runner2.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: skip,
          supportCodeLibrary: this.supportCodeLibrary,
          testCase: testCase,
          worldParameters: this.worldParameters
        });
        yield testCaseRunner.run();
        this.stdout.write(JSON.stringify({ command: _command_types2.default.READY }) + '\n');
      });

      function runTestCase(_x2) {
        return _ref7.apply(this, arguments);
      }

      return runTestCase;
    }()
  }, {
    key: 'runTestRunHooks',
    value: function () {
      var _ref8 = (0, _bluebird.coroutine)(function* (key, name) {
        var _this3 = this;

        yield _bluebird2.default.each(this.supportCodeLibrary[key], function () {
          var _ref9 = (0, _bluebird.coroutine)(function* (hookDefinition) {
            var _ref10 = yield _user_code_runner2.default.run({
              argsArray: [],
              fn: hookDefinition.code,
              thisArg: null,
              timeoutInMilliseconds: hookDefinition.options.timeout || _this3.supportCodeLibrary.defaultTimeout
            }),
                error = _ref10.error;

            if (error) {
              var location = (0, _helpers.formatLocation)(hookDefinition);
              throw new _verror2.default(error, name + ' hook errored, process exiting: ' + location);
            }
          });

          return function (_x5) {
            return _ref9.apply(this, arguments);
          };
        }());
      });

      function runTestRunHooks(_x3, _x4) {
        return _ref8.apply(this, arguments);
      }

      return runTestRunHooks;
    }()
  }]);
  return Slave;
}();

exports.default = Slave;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydW50aW1lL3BhcmFsbGVsL3NsYXZlLmpzIl0sIm5hbWVzIjpbIkVWRU5UUyIsInJlcGxhY2VyU2VyaWFsaXplRXJyb3JzIiwia2V5IiwidmFsdWUiLCJpc0Vycm9yIiwiU2xhdmUiLCJjd2QiLCJzdGRpbiIsInN0ZG91dCIsImluaXRpYWxpemVkIiwiZXZlbnRCcm9hZGNhc3RlciIsInN0YWNrVHJhY2VGaWx0ZXIiLCJmb3JFYWNoIiwib24iLCJuYW1lIiwid3JpdGUiLCJKU09OIiwic3RyaW5naWZ5IiwiY29tbWFuZCIsIkVWRU5UIiwiZGF0YSIsImZpbHRlclN0YWNrdHJhY2VzIiwic3VwcG9ydENvZGVSZXF1aXJlZE1vZHVsZXMiLCJzdXBwb3J0Q29kZVBhdGhzIiwid29ybGRQYXJhbWV0ZXJzIiwibWFwIiwicmVxdWlyZSIsIm1vZHVsZSIsInJlc2V0IiwiY29kZVBhdGgiLCJzdXBwb3J0Q29kZUxpYnJhcnkiLCJmaW5hbGl6ZSIsImZpbHRlciIsInJ1blRlc3RSdW5Ib29rcyIsIlJFQURZIiwidW5maWx0ZXIiLCJwcm9jZXNzIiwiZXhpdCIsImxpbmUiLCJpbnB1dCIsInBhcnNlIiwiaW5pdGlhbGl6ZSIsInJ1blRlc3RDYXNlIiwicmwiLCJjcmVhdGVJbnRlcmZhY2UiLCJwYXJzZU1hc3RlckxpbmUiLCJ0ZXN0Q2FzZSIsInNraXAiLCJ0ZXN0Q2FzZVJ1bm5lciIsInJ1biIsImVhY2giLCJob29rRGVmaW5pdGlvbiIsImFyZ3NBcnJheSIsImZuIiwiY29kZSIsInRoaXNBcmciLCJ0aW1lb3V0SW5NaWxsaXNlY29uZHMiLCJvcHRpb25zIiwidGltZW91dCIsImRlZmF1bHRUaW1lb3V0IiwiZXJyb3IiLCJsb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7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QUQrQztBQUFBLGdCQUMvREMsS0FEK0QsVUFDL0RBLEtBRCtEOztBQVN2RSxnQkFBSUEsS0FBSixFQUFXO0FBQ1Qsa0JBQU1DLFdBQVcsNkJBQWVWLGNBQWYsQ0FBakI7QUFDQSxvQkFBTSxxQkFDSlMsS0FESSxFQUVEOUMsSUFGQyx3Q0FFc0MrQyxRQUZ0QyxDQUFOO0FBSUQ7QUFDRixXQWhCSzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUFOO0FBaUJELE87Ozs7Ozs7Ozs7OztrQkEvRmtCeEQsSyIsImZpbGUiOiJzbGF2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCB7IGZvcm1hdExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vZm9ybWF0dGVyL2hlbHBlcnMnXG5pbXBvcnQgY29tbWFuZFR5cGVzIGZyb20gJy4vY29tbWFuZF90eXBlcydcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJ1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnXG5pbXBvcnQgc2VyaWFsaXplRXJyb3IgZnJvbSAnc2VyaWFsaXplLWVycm9yJ1xuaW1wb3J0IFN0YWNrVHJhY2VGaWx0ZXIgZnJvbSAnLi4vc3RhY2tfdHJhY2VfZmlsdGVyJ1xuaW1wb3J0IHN1cHBvcnRDb2RlTGlicmFyeUJ1aWxkZXIgZnJvbSAnLi4vLi4vc3VwcG9ydF9jb2RlX2xpYnJhcnlfYnVpbGRlcidcbmltcG9ydCBUZXN0Q2FzZVJ1bm5lciBmcm9tICcuLi90ZXN0X2Nhc2VfcnVubmVyJ1xuaW1wb3J0IFVzZXJDb2RlUnVubmVyIGZyb20gJy4uLy4uL3VzZXJfY29kZV9ydW5uZXInXG5pbXBvcnQgVkVycm9yIGZyb20gJ3ZlcnJvcidcblxuY29uc3QgRVZFTlRTID0gW1xuICAndGVzdC1jYXNlLXByZXBhcmVkJyxcbiAgJ3Rlc3QtY2FzZS1zdGFydGVkJyxcbiAgJ3Rlc3Qtc3RlcC1zdGFydGVkJyxcbiAgJ3Rlc3Qtc3RlcC1hdHRhY2htZW50JyxcbiAgJ3Rlc3Qtc3RlcC1maW5pc2hlZCcsXG4gICd0ZXN0LWNhc2UtZmluaXNoZWQnLFxuXVxuXG5mdW5jdGlvbiByZXBsYWNlclNlcmlhbGl6ZUVycm9ycyhrZXksIHZhbHVlKSB7XG4gIGlmIChfLmlzRXJyb3IodmFsdWUpKSB7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZUVycm9yKHZhbHVlKVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGF2ZSB7XG4gIGNvbnN0cnVjdG9yKHsgY3dkLCBzdGRpbiwgc3Rkb3V0IH0pIHtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2VcbiAgICB0aGlzLnN0ZGluID0gc3RkaW5cbiAgICB0aGlzLnN0ZG91dCA9IHN0ZG91dFxuICAgIHRoaXMuY3dkID0gY3dkXG4gICAgdGhpcy5ldmVudEJyb2FkY2FzdGVyID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gICAgdGhpcy5zdGFja1RyYWNlRmlsdGVyID0gbmV3IFN0YWNrVHJhY2VGaWx0ZXIoKVxuICAgIEVWRU5UUy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgdGhpcy5ldmVudEJyb2FkY2FzdGVyLm9uKG5hbWUsIGRhdGEgPT5cbiAgICAgICAgdGhpcy5zdGRvdXQud3JpdGUoXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICB7IGNvbW1hbmQ6IGNvbW1hbmRUeXBlcy5FVkVOVCwgbmFtZSwgZGF0YSB9LFxuICAgICAgICAgICAgcmVwbGFjZXJTZXJpYWxpemVFcnJvcnNcbiAgICAgICAgICApICsgJ1xcbidcbiAgICAgICAgKVxuICAgICAgKVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBpbml0aWFsaXplKHtcbiAgICBmaWx0ZXJTdGFja3RyYWNlcyxcbiAgICBzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcyxcbiAgICBzdXBwb3J0Q29kZVBhdGhzLFxuICAgIHdvcmxkUGFyYW1ldGVycyxcbiAgfSkge1xuICAgIHN1cHBvcnRDb2RlUmVxdWlyZWRNb2R1bGVzLm1hcChtb2R1bGUgPT4gcmVxdWlyZShtb2R1bGUpKVxuICAgIHN1cHBvcnRDb2RlTGlicmFyeUJ1aWxkZXIucmVzZXQodGhpcy5jd2QpXG4gICAgc3VwcG9ydENvZGVQYXRocy5mb3JFYWNoKGNvZGVQYXRoID0+IHJlcXVpcmUoY29kZVBhdGgpKVxuICAgIHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5ID0gc3VwcG9ydENvZGVMaWJyYXJ5QnVpbGRlci5maW5hbGl6ZSgpXG4gICAgdGhpcy53b3JsZFBhcmFtZXRlcnMgPSB3b3JsZFBhcmFtZXRlcnNcbiAgICB0aGlzLmZpbHRlclN0YWNrdHJhY2VzID0gZmlsdGVyU3RhY2t0cmFjZXNcbiAgICBpZiAodGhpcy5maWx0ZXJTdGFja3RyYWNlcykge1xuICAgICAgdGhpcy5zdGFja1RyYWNlRmlsdGVyLmZpbHRlcigpXG4gICAgfVxuICAgIGF3YWl0IHRoaXMucnVuVGVzdFJ1bkhvb2tzKCdiZWZvcmVUZXN0UnVuSG9va0RlZmluaXRpb25zJywgJ2EgQmVmb3JlQWxsJylcbiAgICB0aGlzLnN0ZG91dC53cml0ZShKU09OLnN0cmluZ2lmeSh7IGNvbW1hbmQ6IGNvbW1hbmRUeXBlcy5SRUFEWSB9KSArICdcXG4nKVxuICB9XG5cbiAgYXN5bmMgZmluYWxpemUoKSB7XG4gICAgYXdhaXQgdGhpcy5ydW5UZXN0UnVuSG9va3MoJ2FmdGVyVGVzdFJ1bkhvb2tEZWZpbml0aW9ucycsICdhbiBBZnRlckFsbCcpXG4gICAgaWYgKHRoaXMuZmlsdGVyU3RhY2t0cmFjZXMpIHtcbiAgICAgIHRoaXMuc3RhY2tUcmFjZUZpbHRlci51bmZpbHRlcigpXG4gICAgfVxuICAgIHByb2Nlc3MuZXhpdCgpXG4gIH1cblxuICBwYXJzZU1hc3RlckxpbmUobGluZSkge1xuICAgIGNvbnN0IGlucHV0ID0gSlNPTi5wYXJzZShsaW5lKVxuICAgIGlmIChpbnB1dC5jb21tYW5kID09PSAnaW5pdGlhbGl6ZScpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZShpbnB1dClcbiAgICB9IGVsc2UgaWYgKGlucHV0LmNvbW1hbmQgPT09ICdmaW5hbGl6ZScpIHtcbiAgICAgIHRoaXMuZmluYWxpemUoKVxuICAgIH0gZWxzZSBpZiAoaW5wdXQuY29tbWFuZCA9PT0gJ3J1bicpIHtcbiAgICAgIHRoaXMucnVuVGVzdENhc2UoaW5wdXQpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcnVuKCkge1xuICAgIHRoaXMucmwgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2UoeyBpbnB1dDogdGhpcy5zdGRpbiB9KVxuICAgIHRoaXMucmwub24oJ2xpbmUnLCBsaW5lID0+IHtcbiAgICAgIHRoaXMucGFyc2VNYXN0ZXJMaW5lKGxpbmUpXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIHJ1blRlc3RDYXNlKHsgdGVzdENhc2UsIHNraXAgfSkge1xuICAgIGNvbnN0IHRlc3RDYXNlUnVubmVyID0gbmV3IFRlc3RDYXNlUnVubmVyKHtcbiAgICAgIGV2ZW50QnJvYWRjYXN0ZXI6IHRoaXMuZXZlbnRCcm9hZGNhc3RlcixcbiAgICAgIHNraXAsXG4gICAgICBzdXBwb3J0Q29kZUxpYnJhcnk6IHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5LFxuICAgICAgdGVzdENhc2UsXG4gICAgICB3b3JsZFBhcmFtZXRlcnM6IHRoaXMud29ybGRQYXJhbWV0ZXJzLFxuICAgIH0pXG4gICAgYXdhaXQgdGVzdENhc2VSdW5uZXIucnVuKClcbiAgICB0aGlzLnN0ZG91dC53cml0ZShKU09OLnN0cmluZ2lmeSh7IGNvbW1hbmQ6IGNvbW1hbmRUeXBlcy5SRUFEWSB9KSArICdcXG4nKVxuICB9XG5cbiAgYXN5bmMgcnVuVGVzdFJ1bkhvb2tzKGtleSwgbmFtZSkge1xuICAgIGF3YWl0IFByb21pc2UuZWFjaCh0aGlzLnN1cHBvcnRDb2RlTGlicmFyeVtrZXldLCBhc3luYyBob29rRGVmaW5pdGlvbiA9PiB7XG4gICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBVc2VyQ29kZVJ1bm5lci5ydW4oe1xuICAgICAgICBhcmdzQXJyYXk6IFtdLFxuICAgICAgICBmbjogaG9va0RlZmluaXRpb24uY29kZSxcbiAgICAgICAgdGhpc0FyZzogbnVsbCxcbiAgICAgICAgdGltZW91dEluTWlsbGlzZWNvbmRzOlxuICAgICAgICAgIGhvb2tEZWZpbml0aW9uLm9wdGlvbnMudGltZW91dCB8fFxuICAgICAgICAgIHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5LmRlZmF1bHRUaW1lb3V0LFxuICAgICAgfSlcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGZvcm1hdExvY2F0aW9uKGhvb2tEZWZpbml0aW9uKVxuICAgICAgICB0aHJvdyBuZXcgVkVycm9yKFxuICAgICAgICAgIGVycm9yLFxuICAgICAgICAgIGAke25hbWV9IGhvb2sgZXJyb3JlZCwgcHJvY2VzcyBleGl0aW5nOiAke2xvY2F0aW9ufWBcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==