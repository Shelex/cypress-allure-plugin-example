'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('./helpers');

var _attachment_manager = require('./attachment_manager');

var _attachment_manager2 = _interopRequireDefault(_attachment_manager);

var _status = require('../status');

var _status2 = _interopRequireDefault(_status);

var _step_runner = require('./step_runner');

var _step_runner2 = _interopRequireDefault(_step_runner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestCaseRunner = function () {
  function TestCaseRunner(_ref) {
    var _this = this;

    var eventBroadcaster = _ref.eventBroadcaster,
        skip = _ref.skip,
        testCase = _ref.testCase,
        supportCodeLibrary = _ref.supportCodeLibrary,
        worldParameters = _ref.worldParameters;
    (0, _classCallCheck3.default)(this, TestCaseRunner);

    var attachmentManager = new _attachment_manager2.default(function (_ref2) {
      var data = _ref2.data,
          media = _ref2.media;

      _this.emit('test-step-attachment', {
        index: _this.testStepIndex,
        data: data,
        media: media
      });
    });
    this.eventBroadcaster = eventBroadcaster;
    this.skip = skip;
    this.testCase = testCase;
    this.supportCodeLibrary = supportCodeLibrary;
    this.world = new supportCodeLibrary.World({
      attach: attachmentManager.create.bind(attachmentManager),
      parameters: worldParameters
    });
    this.beforeHookDefinitions = this.getBeforeHookDefinitions();
    this.afterHookDefinitions = this.getAfterHookDefinitions();
    this.testStepIndex = 0;
    this.result = {
      duration: 0,
      status: this.skip ? _status2.default.SKIPPED : _status2.default.PASSED
    };
    this.testCaseSourceLocation = {
      uri: this.testCase.uri,
      line: this.testCase.pickle.locations[0].line
    };
  }

  (0, _createClass3.default)(TestCaseRunner, [{
    key: 'emit',
    value: function emit(name, data) {
      var eventData = (0, _extends3.default)({}, data);
      if (_lodash2.default.startsWith(name, 'test-case')) {
        eventData.sourceLocation = this.testCaseSourceLocation;
      } else {
        eventData.testCase = { sourceLocation: this.testCaseSourceLocation };
      }
      this.eventBroadcaster.emit(name, eventData);
    }
  }, {
    key: 'emitPrepared',
    value: function emitPrepared() {
      var _this2 = this;

      var steps = [];
      this.beforeHookDefinitions.forEach(function (definition) {
        var actionLocation = { uri: definition.uri, line: definition.line };
        steps.push({ actionLocation: actionLocation });
      });
      this.testCase.pickle.steps.forEach(function (step) {
        var actionLocations = _this2.getStepDefinitions(step).map(function (definition) {
          return {
            uri: definition.uri,
            line: definition.line
          };
        });
        var sourceLocation = {
          uri: _this2.testCase.uri,
          line: _lodash2.default.last(step.locations).line
        };
        var data = { sourceLocation: sourceLocation };
        if (actionLocations.length === 1) {
          data.actionLocation = actionLocations[0];
        }
        steps.push(data);
      });
      this.afterHookDefinitions.forEach(function (definition) {
        var actionLocation = { uri: definition.uri, line: definition.line };
        steps.push({ actionLocation: actionLocation });
      });
      this.emit('test-case-prepared', { steps: steps });
    }
  }, {
    key: 'getAfterHookDefinitions',
    value: function getAfterHookDefinitions() {
      var _this3 = this;

      return this.supportCodeLibrary.afterTestCaseHookDefinitions.filter(function (hookDefinition) {
        return hookDefinition.appliesToTestCase(_this3.testCase);
      });
    }
  }, {
    key: 'getBeforeHookDefinitions',
    value: function getBeforeHookDefinitions() {
      var _this4 = this;

      return this.supportCodeLibrary.beforeTestCaseHookDefinitions.filter(function (hookDefinition) {
        return hookDefinition.appliesToTestCase(_this4.testCase);
      });
    }
  }, {
    key: 'getStepDefinitions',
    value: function getStepDefinitions(step) {
      var _this5 = this;

      return this.supportCodeLibrary.stepDefinitions.filter(function (stepDefinition) {
        return stepDefinition.matchesStepName({
          stepName: step.text,
          parameterTypeRegistry: _this5.supportCodeLibrary.parameterTypeRegistry
        });
      });
    }
  }, {
    key: 'invokeStep',
    value: function invokeStep(step, stepDefinition, hookParameter) {
      return _step_runner2.default.run({
        defaultTimeout: this.supportCodeLibrary.defaultTimeout,
        hookParameter: hookParameter,
        parameterTypeRegistry: this.supportCodeLibrary.parameterTypeRegistry,
        step: step,
        stepDefinition: stepDefinition,
        world: this.world
      });
    }
  }, {
    key: 'isSkippingSteps',
    value: function isSkippingSteps() {
      return this.result.status !== _status2.default.PASSED;
    }
  }, {
    key: 'shouldUpdateStatus',
    value: function shouldUpdateStatus(testStepResult) {
      switch (testStepResult.status) {
        case _status2.default.FAILED:
        case _status2.default.AMBIGUOUS:
          return this.result.status !== _status2.default.FAILED || this.result.status !== _status2.default.AMBIGUOUS;
        default:
          return this.result.status === _status2.default.PASSED || this.result.status === _status2.default.SKIPPED;
      }
    }
  }, {
    key: 'aroundTestStep',
    value: function () {
      var _ref3 = (0, _bluebird.coroutine)(function* (runStepFn) {
        this.emit('test-step-started', { index: this.testStepIndex });
        var testStepResult = yield runStepFn();
        if (testStepResult.duration) {
          this.result.duration += testStepResult.duration;
        }
        if (this.shouldUpdateStatus(testStepResult)) {
          this.result.status = testStepResult.status;
        }
        if (testStepResult.exception) {
          this.result.exception = testStepResult.exception;
        }
        this.emit('test-step-finished', {
          index: this.testStepIndex,
          result: testStepResult
        });
        this.testStepIndex += 1;
      });

      function aroundTestStep(_x) {
        return _ref3.apply(this, arguments);
      }

      return aroundTestStep;
    }()
  }, {
    key: 'run',
    value: function () {
      var _ref4 = (0, _bluebird.coroutine)(function* () {
        this.emitPrepared();
        this.emit('test-case-started', {});
        yield this.runHooks(this.beforeHookDefinitions, {
          sourceLocation: this.testCaseSourceLocation,
          pickle: this.testCase.pickle
        });
        yield this.runSteps();
        yield this.runHooks(this.afterHookDefinitions, {
          sourceLocation: this.testCaseSourceLocation,
          pickle: this.testCase.pickle,
          result: this.result
        });
        this.emit('test-case-finished', { result: this.result });
        return this.result;
      });

      function run() {
        return _ref4.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'runHook',
    value: function () {
      var _ref5 = (0, _bluebird.coroutine)(function* (hookDefinition, hookParameter) {
        if (this.skip) {
          return { status: _status2.default.SKIPPED };
        }
        return this.invokeStep(null, hookDefinition, hookParameter);
      });

      function runHook(_x2, _x3) {
        return _ref5.apply(this, arguments);
      }

      return runHook;
    }()
  }, {
    key: 'runHooks',
    value: function () {
      var _ref6 = (0, _bluebird.coroutine)(function* (hookDefinitions, hookParameter) {
        var _this6 = this;

        yield _bluebird2.default.each(hookDefinitions, function () {
          var _ref7 = (0, _bluebird.coroutine)(function* (hookDefinition) {
            yield _this6.aroundTestStep(function () {
              return _this6.runHook(hookDefinition, hookParameter);
            });
          });

          return function (_x6) {
            return _ref7.apply(this, arguments);
          };
        }());
      });

      function runHooks(_x4, _x5) {
        return _ref6.apply(this, arguments);
      }

      return runHooks;
    }()
  }, {
    key: 'runStep',
    value: function () {
      var _ref8 = (0, _bluebird.coroutine)(function* (step) {
        var stepDefinitions = this.getStepDefinitions(step);
        if (stepDefinitions.length === 0) {
          return { status: _status2.default.UNDEFINED };
        } else if (stepDefinitions.length > 1) {
          return {
            exception: (0, _helpers.getAmbiguousStepException)(stepDefinitions),
            status: _status2.default.AMBIGUOUS
          };
        } else if (this.isSkippingSteps()) {
          return { status: _status2.default.SKIPPED };
        }
        return this.invokeStep(step, stepDefinitions[0]);
      });

      function runStep(_x7) {
        return _ref8.apply(this, arguments);
      }

      return runStep;
    }()
  }, {
    key: 'runSteps',
    value: function () {
      var _ref9 = (0, _bluebird.coroutine)(function* () {
        var _this7 = this;

        yield _bluebird2.default.each(this.testCase.pickle.steps, function () {
          var _ref10 = (0, _bluebird.coroutine)(function* (step) {
            yield _this7.aroundTestStep(function () {
              return _this7.runStep(step);
            });
          });

          return function (_x8) {
            return _ref10.apply(this, arguments);
          };
        }());
      });

      function runSteps() {
        return _ref9.apply(this, arguments);
      }

      return runSteps;
    }()
  }]);
  return TestCaseRunner;
}();

exports.default = TestCaseRunner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydW50aW1lL3Rlc3RfY2FzZV9ydW5uZXIuanMiXSwibmFtZXMiOlsiVGVzdENhc2VSdW5uZXIiLCJldmVudEJyb2FkY2FzdGVyIiwic2tpcCIsInRlc3RDYXNlIiwic3VwcG9ydENvZGVMaWJyYXJ5Iiwid29ybGRQYXJhbWV0ZXJzIiwiYXR0YWNobWVudE1hbmFnZXIiLCJkYXRhIiwibWVkaWEiLCJlbWl0IiwiaW5kZXgiLCJ0ZXN0U3RlcEluZGV4Iiwid29ybGQiLCJXb3JsZCIsImF0dGFjaCIsImNyZWF0ZSIsInBhcmFtZXRlcnMiLCJiZWZvcmVIb29rRGVmaW5pdGlvbnMiLCJnZXRCZWZvcmVIb29rRGVmaW5pdGlvbnMiLCJhZnRlckhvb2tEZWZpbml0aW9ucyIsImdldEFmdGVySG9va0RlZmluaXRpb25zIiwicmVzdWx0IiwiZHVyYXRpb24iLCJzdGF0dXMiLCJTS0lQUEVEIiwiUEFTU0VEIiwidGVzdENhc2VTb3VyY2VMb2NhdGlvbiIsInVyaSIsImxpbmUiLCJwaWNrbGUiLCJsb2NhdGlvbnMiLCJuYW1lIiwiZXZlbnREYXRhIiwic3RhcnRzV2l0aCIsInNvdXJjZUxvY2F0aW9uIiwic3RlcHMiLCJmb3JFYWNoIiwiYWN0aW9uTG9jYXRpb24iLCJkZWZpbml0aW9uIiwicHVzaCIsImFjdGlvbkxvY2F0aW9ucyIsImdldFN0ZXBEZWZpbml0aW9ucyIsInN0ZXAiLCJtYXAiLCJsYXN0IiwibGVuZ3RoIiwiYWZ0ZXJUZXN0Q2FzZUhvb2tEZWZpbml0aW9ucyIsImZpbHRlciIsImhvb2tEZWZpbml0aW9uIiwiYXBwbGllc1RvVGVzdENhc2UiLCJiZWZvcmVUZXN0Q2FzZUhvb2tEZWZpbml0aW9ucyIsInN0ZXBEZWZpbml0aW9ucyIsInN0ZXBEZWZpbml0aW9uIiwibWF0Y2hlc1N0ZXBOYW1lIiwic3RlcE5hbWUiLCJ0ZXh0IiwicGFyYW1ldGVyVHlwZVJlZ2lzdHJ5IiwiaG9va1BhcmFtZXRlciIsInJ1biIsImRlZmF1bHRUaW1lb3V0IiwidGVzdFN0ZXBSZXN1bHQiLCJGQUlMRUQiLCJBTUJJR1VPVVMiLCJydW5TdGVwRm4iLCJzaG91bGRVcGRhdGVTdGF0dXMiLCJleGNlcHRpb24iLCJlbWl0UHJlcGFyZWQiLCJydW5Ib29rcyIsInJ1blN0ZXBzIiwiaW52b2tlU3RlcCIsImhvb2tEZWZpbml0aW9ucyIsImVhY2giLCJhcm91bmRUZXN0U3RlcCIsInJ1bkhvb2siLCJVTkRFRklORUQiLCJpc1NraXBwaW5nU3RlcHMiLCJydW5TdGVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsYztBQUNuQixnQ0FNRztBQUFBOztBQUFBLFFBTERDLGdCQUtDLFFBTERBLGdCQUtDO0FBQUEsUUFKREMsSUFJQyxRQUpEQSxJQUlDO0FBQUEsUUFIREMsUUFHQyxRQUhEQSxRQUdDO0FBQUEsUUFGREMsa0JBRUMsUUFGREEsa0JBRUM7QUFBQSxRQUREQyxlQUNDLFFBRERBLGVBQ0M7QUFBQTs7QUFDRCxRQUFNQyxvQkFBb0IsaUNBQXNCLGlCQUFxQjtBQUFBLFVBQWxCQyxJQUFrQixTQUFsQkEsSUFBa0I7QUFBQSxVQUFaQyxLQUFZLFNBQVpBLEtBQVk7O0FBQ25FLFlBQUtDLElBQUwsQ0FBVSxzQkFBVixFQUFrQztBQUNoQ0MsZUFBTyxNQUFLQyxhQURvQjtBQUVoQ0osa0JBRmdDO0FBR2hDQztBQUhnQyxPQUFsQztBQUtELEtBTnlCLENBQTFCO0FBT0EsU0FBS1AsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEJBLGtCQUExQjtBQUNBLFNBQUtRLEtBQUwsR0FBYSxJQUFJUixtQkFBbUJTLEtBQXZCLENBQTZCO0FBQ3hDQyxjQUFVUixrQkFBa0JTLE1BQTVCLE1BQVVULGlCQUFWLENBRHdDO0FBRXhDVSxrQkFBWVg7QUFG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LENBQXRCLENBQVA7QUFDRCxPOzs7Ozs7Ozs7Ozt3REFFZ0I7QUFBQTs7QUFDZixjQUFNLG1CQUFRb0IsSUFBUixDQUFhLEtBQUtwRSxRQUFMLENBQWMwQixNQUFkLENBQXFCTSxLQUFsQztBQUFBLGdEQUF5QyxXQUFNTyxJQUFOLEVBQWM7QUFDM0Qsa0JBQU0sT0FBSzhCLGNBQUwsQ0FBb0I7QUFBQSxxQkFBTSxPQUFLSSxPQUFMLENBQWFsQyxJQUFiLENBQU47QUFBQSxhQUFwQixDQUFOO0FBQ0QsV0FGSzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUFOO0FBR0QsTzs7Ozs7Ozs7Ozs7O2tCQXBNa0IxQyxjIiwiZmlsZSI6InRlc3RfY2FzZV9ydW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBnZXRBbWJpZ3VvdXNTdGVwRXhjZXB0aW9uIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IEF0dGFjaG1lbnRNYW5hZ2VyIGZyb20gJy4vYXR0YWNobWVudF9tYW5hZ2VyJ1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgU3RhdHVzIGZyb20gJy4uL3N0YXR1cydcbmltcG9ydCBTdGVwUnVubmVyIGZyb20gJy4vc3RlcF9ydW5uZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RDYXNlUnVubmVyIHtcbiAgY29uc3RydWN0b3Ioe1xuICAgIGV2ZW50QnJvYWRjYXN0ZXIsXG4gICAgc2tpcCxcbiAgICB0ZXN0Q2FzZSxcbiAgICBzdXBwb3J0Q29kZUxpYnJhcnksXG4gICAgd29ybGRQYXJhbWV0ZXJzLFxuICB9KSB7XG4gICAgY29uc3QgYXR0YWNobWVudE1hbmFnZXIgPSBuZXcgQXR0YWNobWVudE1hbmFnZXIoKHsgZGF0YSwgbWVkaWEgfSkgPT4ge1xuICAgICAgdGhpcy5lbWl0KCd0ZXN0LXN0ZXAtYXR0YWNobWVudCcsIHtcbiAgICAgICAgaW5kZXg6IHRoaXMudGVzdFN0ZXBJbmRleCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgbWVkaWEsXG4gICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy5ldmVudEJyb2FkY2FzdGVyID0gZXZlbnRCcm9hZGNhc3RlclxuICAgIHRoaXMuc2tpcCA9IHNraXBcbiAgICB0aGlzLnRlc3RDYXNlID0gdGVzdENhc2VcbiAgICB0aGlzLnN1cHBvcnRDb2RlTGlicmFyeSA9IHN1cHBvcnRDb2RlTGlicmFyeVxuICAgIHRoaXMud29ybGQgPSBuZXcgc3VwcG9ydENvZGVMaWJyYXJ5LldvcmxkKHtcbiAgICAgIGF0dGFjaDogOjphdHRhY2htZW50TWFuYWdlci5jcmVhdGUsXG4gICAgICBwYXJhbWV0ZXJzOiB3b3JsZFBhcmFtZXRlcnMsXG4gICAgfSlcbiAgICB0aGlzLmJlZm9yZUhvb2tEZWZpbml0aW9ucyA9IHRoaXMuZ2V0QmVmb3JlSG9va0RlZmluaXRpb25zKClcbiAgICB0aGlzLmFmdGVySG9va0RlZmluaXRpb25zID0gdGhpcy5nZXRBZnRlckhvb2tEZWZpbml0aW9ucygpXG4gICAgdGhpcy50ZXN0U3RlcEluZGV4ID0gMFxuICAgIHRoaXMucmVzdWx0ID0ge1xuICAgICAgZHVyYXRpb246IDAsXG4gICAgICBzdGF0dXM6IHRoaXMuc2tpcCA/IFN0YXR1cy5TS0lQUEVEIDogU3RhdHVzLlBBU1NFRCxcbiAgICB9XG4gICAgdGhpcy50ZXN0Q2FzZVNvdXJjZUxvY2F0aW9uID0ge1xuICAgICAgdXJpOiB0aGlzLnRlc3RDYXNlLnVyaSxcbiAgICAgIGxpbmU6IHRoaXMudGVzdENhc2UucGlja2xlLmxvY2F0aW9uc1swXS5saW5lLFxuICAgIH1cbiAgfVxuXG4gIGVtaXQobmFtZSwgZGF0YSkge1xuICAgIGNvbnN0IGV2ZW50RGF0YSA9IHsgLi4uZGF0YSB9XG4gICAgaWYgKF8uc3RhcnRzV2l0aChuYW1lLCAndGVzdC1jYXNlJykpIHtcbiAgICAgIGV2ZW50RGF0YS5zb3VyY2VMb2NhdGlvbiA9IHRoaXMudGVzdENhc2VTb3VyY2VMb2NhdGlvblxuICAgIH0gZWxzZSB7XG4gICAgICBldmVudERhdGEudGVzdENhc2UgPSB7IHNvdXJjZUxvY2F0aW9uOiB0aGlzLnRlc3RDYXNlU291cmNlTG9jYXRpb24gfVxuICAgIH1cbiAgICB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIuZW1pdChuYW1lLCBldmVudERhdGEpXG4gIH1cblxuICBlbWl0UHJlcGFyZWQoKSB7XG4gICAgY29uc3Qgc3RlcHMgPSBbXVxuICAgIHRoaXMuYmVmb3JlSG9va0RlZmluaXRpb25zLmZvckVhY2goZGVmaW5pdGlvbiA9PiB7XG4gICAgICBjb25zdCBhY3Rpb25Mb2NhdGlvbiA9IHsgdXJpOiBkZWZpbml0aW9uLnVyaSwgbGluZTogZGVmaW5pdGlvbi5saW5lIH1cbiAgICAgIHN0ZXBzLnB1c2goeyBhY3Rpb25Mb2NhdGlvbiB9KVxuICAgIH0pXG4gICAgdGhpcy50ZXN0Q2FzZS5waWNrbGUuc3RlcHMuZm9yRWFjaChzdGVwID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbkxvY2F0aW9ucyA9IHRoaXMuZ2V0U3RlcERlZmluaXRpb25zKHN0ZXApLm1hcChkZWZpbml0aW9uID0+ICh7XG4gICAgICAgIHVyaTogZGVmaW5pdGlvbi51cmksXG4gICAgICAgIGxpbmU6IGRlZmluaXRpb24ubGluZSxcbiAgICAgIH0pKVxuICAgICAgY29uc3Qgc291cmNlTG9jYXRpb24gPSB7XG4gICAgICAgIHVyaTogdGhpcy50ZXN0Q2FzZS51cmksXG4gICAgICAgIGxpbmU6IF8ubGFzdChzdGVwLmxvY2F0aW9ucykubGluZSxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGEgPSB7IHNvdXJjZUxvY2F0aW9uIH1cbiAgICAgIGlmIChhY3Rpb25Mb2NhdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGRhdGEuYWN0aW9uTG9jYXRpb24gPSBhY3Rpb25Mb2NhdGlvbnNbMF1cbiAgICAgIH1cbiAgICAgIHN0ZXBzLnB1c2goZGF0YSlcbiAgICB9KVxuICAgIHRoaXMuYWZ0ZXJIb29rRGVmaW5pdGlvbnMuZm9yRWFjaChkZWZpbml0aW9uID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbkxvY2F0aW9uID0geyB1cmk6IGRlZmluaXRpb24udXJpLCBsaW5lOiBkZWZpbml0aW9uLmxpbmUgfVxuICAgICAgc3RlcHMucHVzaCh7IGFjdGlvbkxvY2F0aW9uIH0pXG4gICAgfSlcbiAgICB0aGlzLmVtaXQoJ3Rlc3QtY2FzZS1wcmVwYXJlZCcsIHsgc3RlcHMgfSlcbiAgfVxuXG4gIGdldEFmdGVySG9va0RlZmluaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnN1cHBvcnRDb2RlTGlicmFyeS5hZnRlclRlc3RDYXNlSG9va0RlZmluaXRpb25zLmZpbHRlcihcbiAgICAgIGhvb2tEZWZpbml0aW9uID0+IGhvb2tEZWZpbml0aW9uLmFwcGxpZXNUb1Rlc3RDYXNlKHRoaXMudGVzdENhc2UpXG4gICAgKVxuICB9XG5cbiAgZ2V0QmVmb3JlSG9va0RlZmluaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnN1cHBvcnRDb2RlTGlicmFyeS5iZWZvcmVUZXN0Q2FzZUhvb2tEZWZpbml0aW9ucy5maWx0ZXIoXG4gICAgICBob29rRGVmaW5pdGlvbiA9PiBob29rRGVmaW5pdGlvbi5hcHBsaWVzVG9UZXN0Q2FzZSh0aGlzLnRlc3RDYXNlKVxuICAgIClcbiAgfVxuXG4gIGdldFN0ZXBEZWZpbml0aW9ucyhzdGVwKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5LnN0ZXBEZWZpbml0aW9ucy5maWx0ZXIoc3RlcERlZmluaXRpb24gPT5cbiAgICAgIHN0ZXBEZWZpbml0aW9uLm1hdGNoZXNTdGVwTmFtZSh7XG4gICAgICAgIHN0ZXBOYW1lOiBzdGVwLnRleHQsXG4gICAgICAgIHBhcmFtZXRlclR5cGVSZWdpc3RyeTogdGhpcy5zdXBwb3J0Q29kZUxpYnJhcnkucGFyYW1ldGVyVHlwZVJlZ2lzdHJ5LFxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBpbnZva2VTdGVwKHN0ZXAsIHN0ZXBEZWZpbml0aW9uLCBob29rUGFyYW1ldGVyKSB7XG4gICAgcmV0dXJuIFN0ZXBSdW5uZXIucnVuKHtcbiAgICAgIGRlZmF1bHRUaW1lb3V0OiB0aGlzLnN1cHBvcnRDb2RlTGlicmFyeS5kZWZhdWx0VGltZW91dCxcbiAgICAgIGhvb2tQYXJhbWV0ZXIsXG4gICAgICBwYXJhbWV0ZXJUeXBlUmVnaXN0cnk6IHRoaXMuc3VwcG9ydENvZGVMaWJyYXJ5LnBhcmFtZXRlclR5cGVSZWdpc3RyeSxcbiAgICAgIHN0ZXAsXG4gICAgICBzdGVwRGVmaW5pdGlvbixcbiAgICAgIHdvcmxkOiB0aGlzLndvcmxkLFxuICAgIH0pXG4gIH1cblxuICBpc1NraXBwaW5nU3RlcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0LnN0YXR1cyAhPT0gU3RhdHVzLlBBU1NFRFxuICB9XG5cbiAgc2hvdWxkVXBkYXRlU3RhdHVzKHRlc3RTdGVwUmVzdWx0KSB7XG4gICAgc3dpdGNoICh0ZXN0U3RlcFJlc3VsdC5zdGF0dXMpIHtcbiAgICAgIGNhc2UgU3RhdHVzLkZBSUxFRDpcbiAgICAgIGNhc2UgU3RhdHVzLkFNQklHVU9VUzpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgIT09IFN0YXR1cy5GQUlMRUQgfHxcbiAgICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgIT09IFN0YXR1cy5BTUJJR1VPVVNcbiAgICAgICAgKVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPT09IFN0YXR1cy5QQVNTRUQgfHxcbiAgICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPT09IFN0YXR1cy5TS0lQUEVEXG4gICAgICAgIClcbiAgICB9XG4gIH1cblxuICBhc3luYyBhcm91bmRUZXN0U3RlcChydW5TdGVwRm4pIHtcbiAgICB0aGlzLmVtaXQoJ3Rlc3Qtc3RlcC1zdGFydGVkJywgeyBpbmRleDogdGhpcy50ZXN0U3RlcEluZGV4IH0pXG4gICAgY29uc3QgdGVzdFN0ZXBSZXN1bHQgPSBhd2FpdCBydW5TdGVwRm4oKVxuICAgIGlmICh0ZXN0U3RlcFJlc3VsdC5kdXJhdGlvbikge1xuICAgICAgdGhpcy5yZXN1bHQuZHVyYXRpb24gKz0gdGVzdFN0ZXBSZXN1bHQuZHVyYXRpb25cbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvdWxkVXBkYXRlU3RhdHVzKHRlc3RTdGVwUmVzdWx0KSkge1xuICAgICAgdGhpcy5yZXN1bHQuc3RhdHVzID0gdGVzdFN0ZXBSZXN1bHQuc3RhdHVzXG4gICAgfVxuICAgIGlmICh0ZXN0U3RlcFJlc3VsdC5leGNlcHRpb24pIHtcbiAgICAgIHRoaXMucmVzdWx0LmV4Y2VwdGlvbiA9IHRlc3RTdGVwUmVzdWx0LmV4Y2VwdGlvblxuICAgIH1cbiAgICB0aGlzLmVtaXQoJ3Rlc3Qtc3RlcC1maW5pc2hlZCcsIHtcbiAgICAgIGluZGV4OiB0aGlzLnRlc3RTdGVwSW5kZXgsXG4gICAgICByZXN1bHQ6IHRlc3RTdGVwUmVzdWx0LFxuICAgIH0pXG4gICAgdGhpcy50ZXN0U3RlcEluZGV4ICs9IDFcbiAgfVxuXG4gIGFzeW5jIHJ1bigpIHtcbiAgICB0aGlzLmVtaXRQcmVwYXJlZCgpXG4gICAgdGhpcy5lbWl0KCd0ZXN0LWNhc2Utc3RhcnRlZCcsIHt9KVxuICAgIGF3YWl0IHRoaXMucnVuSG9va3ModGhpcy5iZWZvcmVIb29rRGVmaW5pdGlvbnMsIHtcbiAgICAgIHNvdXJjZUxvY2F0aW9uOiB0aGlzLnRlc3RDYXNlU291cmNlTG9jYXRpb24sXG4gICAgICBwaWNrbGU6IHRoaXMudGVzdENhc2UucGlja2xlLFxuICAgIH0pXG4gICAgYXdhaXQgdGhpcy5ydW5TdGVwcygpXG4gICAgYXdhaXQgdGhpcy5ydW5Ib29rcyh0aGlzLmFmdGVySG9va0RlZmluaXRpb25zLCB7XG4gICAgICBzb3VyY2VMb2NhdGlvbjogdGhpcy50ZXN0Q2FzZVNvdXJjZUxvY2F0aW9uLFxuICAgICAgcGlja2xlOiB0aGlzLnRlc3RDYXNlLnBpY2tsZSxcbiAgICAgIHJlc3VsdDogdGhpcy5yZXN1bHQsXG4gICAgfSlcbiAgICB0aGlzLmVtaXQoJ3Rlc3QtY2FzZS1maW5pc2hlZCcsIHsgcmVzdWx0OiB0aGlzLnJlc3VsdCB9KVxuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG5cbiAgYXN5bmMgcnVuSG9vayhob29rRGVmaW5pdGlvbiwgaG9va1BhcmFtZXRlcikge1xuICAgIGlmICh0aGlzLnNraXApIHtcbiAgICAgIHJldHVybiB7IHN0YXR1czogU3RhdHVzLlNLSVBQRUQgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbnZva2VTdGVwKG51bGwsIGhvb2tEZWZpbml0aW9uLCBob29rUGFyYW1ldGVyKVxuICB9XG5cbiAgYXN5bmMgcnVuSG9va3MoaG9va0RlZmluaXRpb25zLCBob29rUGFyYW1ldGVyKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5lYWNoKGhvb2tEZWZpbml0aW9ucywgYXN5bmMgaG9va0RlZmluaXRpb24gPT4ge1xuICAgICAgYXdhaXQgdGhpcy5hcm91bmRUZXN0U3RlcCgoKSA9PlxuICAgICAgICB0aGlzLnJ1bkhvb2soaG9va0RlZmluaXRpb24sIGhvb2tQYXJhbWV0ZXIpXG4gICAgICApXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIHJ1blN0ZXAoc3RlcCkge1xuICAgIGNvbnN0IHN0ZXBEZWZpbml0aW9ucyA9IHRoaXMuZ2V0U3RlcERlZmluaXRpb25zKHN0ZXApXG4gICAgaWYgKHN0ZXBEZWZpbml0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB7IHN0YXR1czogU3RhdHVzLlVOREVGSU5FRCB9XG4gICAgfSBlbHNlIGlmIChzdGVwRGVmaW5pdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZXhjZXB0aW9uOiBnZXRBbWJpZ3VvdXNTdGVwRXhjZXB0aW9uKHN0ZXBEZWZpbml0aW9ucyksXG4gICAgICAgIHN0YXR1czogU3RhdHVzLkFNQklHVU9VUyxcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNTa2lwcGluZ1N0ZXBzKCkpIHtcbiAgICAgIHJldHVybiB7IHN0YXR1czogU3RhdHVzLlNLSVBQRUQgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbnZva2VTdGVwKHN0ZXAsIHN0ZXBEZWZpbml0aW9uc1swXSlcbiAgfVxuXG4gIGFzeW5jIHJ1blN0ZXBzKCkge1xuICAgIGF3YWl0IFByb21pc2UuZWFjaCh0aGlzLnRlc3RDYXNlLnBpY2tsZS5zdGVwcywgYXN5bmMgc3RlcCA9PiB7XG4gICAgICBhd2FpdCB0aGlzLmFyb3VuZFRlc3RTdGVwKCgpID0+IHRoaXMucnVuU3RlcChzdGVwKSlcbiAgICB9KVxuICB9XG59XG4iXX0=