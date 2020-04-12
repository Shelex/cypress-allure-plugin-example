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

var _helpers = require('./helpers');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Inspired by https://github.com/thekompanee/fuubar and https://github.com/martinciu/fuubar-cucumber
var ProgressBarFormatter = function (_Formatter) {
  (0, _inherits3.default)(ProgressBarFormatter, _Formatter);

  function ProgressBarFormatter(options) {
    (0, _classCallCheck3.default)(this, ProgressBarFormatter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProgressBarFormatter.__proto__ || Object.getPrototypeOf(ProgressBarFormatter)).call(this, options));

    options.eventBroadcaster.on('pickle-accepted', _this.incrementStepCount.bind(_this)).once('test-case-started', _this.initializeProgressBar.bind(_this)).on('test-step-finished', _this.logProgress.bind(_this)).on('test-case-finished', _this.logErrorIfNeeded.bind(_this)).on('test-run-finished', _this.logSummary.bind(_this));
    _this.numberOfSteps = 0;
    _this.issueCount = 0;
    return _this;
  }

  (0, _createClass3.default)(ProgressBarFormatter, [{
    key: 'incrementStepCount',
    value: function incrementStepCount(_ref) {
      var pickle = _ref.pickle;

      this.numberOfSteps += pickle.steps.length;
    }
  }, {
    key: 'initializeProgressBar',
    value: function initializeProgressBar() {
      this.progressBar = new _progress2.default(':current/:total steps [:bar] ', {
        clear: true,
        incomplete: ' ',
        stream: this.stream,
        total: this.numberOfSteps,
        width: this.stream.columns || 80
      });
    }
  }, {
    key: 'logProgress',
    value: function logProgress(_ref2) {
      var index = _ref2.index,
          sourceLocation = _ref2.testCase.sourceLocation;

      var _eventDataCollector$g = this.eventDataCollector.getTestCaseData(sourceLocation),
          testCase = _eventDataCollector$g.testCase;

      if (testCase.steps[index].sourceLocation) {
        this.progressBar.tick();
      }
    }
  }, {
    key: 'logErrorIfNeeded',
    value: function logErrorIfNeeded(_ref3) {
      var sourceLocation = _ref3.sourceLocation,
          result = _ref3.result;

      if ((0, _helpers.isIssue)(result.status)) {
        this.issueCount += 1;

        var _eventDataCollector$g2 = this.eventDataCollector.getTestCaseData(sourceLocation),
            gherkinDocument = _eventDataCollector$g2.gherkinDocument,
            pickle = _eventDataCollector$g2.pickle,
            testCase = _eventDataCollector$g2.testCase;

        this.progressBar.interrupt((0, _helpers.formatIssue)({
          colorFns: this.colorFns,
          gherkinDocument: gherkinDocument,
          number: this.issueCount,
          pickle: pickle,
          snippetBuilder: this.snippetBuilder,
          testCase: testCase
        }));
      }
    }
  }, {
    key: 'logSummary',
    value: function logSummary(testRun) {
      this.log((0, _helpers.formatSummary)({
        colorFns: this.colorFns,
        testCaseMap: this.eventDataCollector.testCaseMap,
        testRun: testRun
      }));
    }
  }]);
  return ProgressBarFormatter;
}(_2.default);

exports.default = ProgressBarFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvcHJvZ3Jlc3NfYmFyX2Zvcm1hdHRlci5qcyJdLCJuYW1lcyI6WyJQcm9ncmVzc0JhckZvcm1hdHRlciIsIm9wdGlvbnMiLCJldmVudEJyb2FkY2FzdGVyIiwib24iLCJpbmNyZW1lbnRTdGVwQ291bnQiLCJvbmNlIiwiaW5pdGlhbGl6ZVByb2dyZXNzQmFyIiwibG9nUHJvZ3Jlc3MiLCJsb2dFcnJvcklmTmVlZGVkIiwibG9nU3VtbWFyeSIsIm51bWJlck9mU3RlcHMiLCJpc3N1ZUNvdW50IiwicGlja2xlIiwic3RlcHMiLCJsZW5ndGgiLCJwcm9ncmVzc0JhciIsImNsZWFyIiwiaW5jb21wbGV0ZSIsInN0cmVhbSIsInRvdGFsIiwid2lkdGgiLCJjb2x1bW5zIiwiaW5kZXgiLCJzb3VyY2VMb2NhdGlvbiIsInRlc3RDYXNlIiwiZXZlbnREYXRhQ29sbGVjdG9yIiwiZ2V0VGVzdENhc2VEYXRhIiwidGljayIsInJlc3VsdCIsInN0YXR1cyIsImdoZXJraW5Eb2N1bWVudCIsImludGVycnVwdCIsImNvbG9yRm5zIiwibnVtYmVyIiwic25pcHBldEJ1aWxkZXIiLCJ0ZXN0UnVuIiwibG9nIiwidGVzdENhc2VNYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtJQUNxQkEsb0I7OztBQUNuQixnQ0FBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBLDBKQUNiQSxPQURhOztBQUVuQkEsWUFBUUMsZ0JBQVIsQ0FDR0MsRUFESCxDQUNNLGlCQUROLEVBQzJCLE1BQUtDLGtCQURoQyxjQUVHQyxJQUZILENBRVEsbUJBRlIsRUFFK0IsTUFBS0MscUJBRnBDLGNBR0dILEVBSEgsQ0FHTSxvQkFITixFQUc4QixNQUFLSSxXQUhuQyxjQUlHSixFQUpILENBSU0sb0JBSk4sRUFJOEIsTUFBS0ssZ0JBSm5DLGNBS0dMLEVBTEgsQ0FLTSxtQkFMTixFQUs2QixNQUFLTSxVQUxsQztBQU1BLFVBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBVG1CO0FBVXBCOzs7OzZDQUU4QjtBQUFBLFVBQVZDLE1BQVUsUUFBVkEsTUFBVTs7QUFDN0IsV0FBS0YsYUFBTCxJQUFzQkUsT0FBT0MsS0FBUCxDQUFhQyxNQUFuQztBQUNEOzs7NENBRXVCO0FBQ3RCLFdBQUtDLFdBQUwsR0FBbUIsdUJBQWdCLCtCQUFoQixFQUFpRDtBQUNsRUMsZUFBTyxJQUQyRDtBQUVsRUMsb0JBQVksR0FGc0Q7QUFHbEVDLGdCQUFRLEtBQUtBLE1BSHFEO0FBSWxFQyxlQUFPLEtBQUtULGFBSnNEO0FBS2xFVSxlQUFPLEtBQUtGLE1BQUwsQ0FBWUcsT0FBWixJQUF1QjtBQUxvQyxPQUFqRCxDQUFuQjtBQU9EOzs7dUNBRW9EO0FBQUEsVUFBdkNDLEtBQXVDLFNBQXZDQSxLQUF1QztBQUFBLFVBQXBCQyxjQUFvQixTQUFoQ0MsUUFBZ0MsQ0FBcEJELGNBQW9COztBQUFBLGtDQUM5QixLQUFLRSxrQkFBTCxDQUF3QkMsZUFBeEIsQ0FBd0NILGNBQXhDLENBRDhCO0FBQUEsVUFDM0NDLFFBRDJDLHlCQUMzQ0EsUUFEMkM7O0FBRW5ELFVBQUlBLFNBQVNYLEtBQVQsQ0FBZVMsS0FBZixFQUFzQkMsY0FBMUIsRUFBMEM7QUFDeEMsYUFBS1IsV0FBTCxDQUFpQlksSUFBakI7QUFDRDtBQUNGOzs7NENBRTRDO0FBQUEsVUFBMUJKLGNBQTBCLFNBQTFCQSxjQUEwQjtBQUFBLFVBQVZLLE1BQVUsU0FBVkEsTUFBVTs7QUFDM0MsVUFBSSxzQkFBUUEsT0FBT0MsTUFBZixDQUFKLEVBQTRCO0FBQzFCLGFBQUtsQixVQUFMLElBQW1CLENBQW5COztBQUQwQixxQ0FNdEIsS0FBS2Msa0JBQUwsQ0FBd0JDLGVBQXhCLENBQXdDSCxjQUF4QyxDQU5zQjtBQUFBLFlBR3hCTyxlQUh3QiwwQkFHeEJBLGVBSHdCO0FBQUEsWUFJeEJsQixNQUp3QiwwQkFJeEJBLE1BSndCO0FBQUEsWUFLeEJZLFFBTHdCLDBCQUt4QkEsUUFMd0I7O0FBTzFCLGFBQUtULFdBQUwsQ0FBaUJnQixTQUFqQixDQUNFLDBCQUFZO0FBQ1ZDLG9CQUFVLEtBQUtBLFFBREw7QUFFVkYsMENBRlU7QUFHVkcsa0JBQVEsS0FBS3RCLFVBSEg7QUFJVkMsd0JBSlU7QUFLVnNCLDBCQUFnQixLQUFLQSxjQUxYO0FBTVZWO0FBTlUsU0FBWixDQURGO0FBVUQ7QUFDRjs7OytCQUVVVyxPLEVBQVM7QUFDbEIsV0FBS0MsR0FBTCxDQUNFLDRCQUFjO0FBQ1pKLGtCQUFVLEtBQUtBLFFBREg7QUFFWksscUJBQWEsS0FBS1osa0JBQUwsQ0FBd0JZLFdBRnpCO0FBR1pGO0FBSFksT0FBZCxDQURGO0FBT0Q7Ozs7O2tCQS9Ea0JuQyxvQiIsImZpbGUiOiJwcm9ncmVzc19iYXJfZm9ybWF0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9ybWF0SXNzdWUsIGZvcm1hdFN1bW1hcnksIGlzSXNzdWUgfSBmcm9tICcuL2hlbHBlcnMnXG5pbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4vJ1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ3Byb2dyZXNzJ1xuXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vdGhla29tcGFuZWUvZnV1YmFyIGFuZCBodHRwczovL2dpdGh1Yi5jb20vbWFydGluY2l1L2Z1dWJhci1jdWN1bWJlclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3Jlc3NCYXJGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICBvcHRpb25zLmV2ZW50QnJvYWRjYXN0ZXJcbiAgICAgIC5vbigncGlja2xlLWFjY2VwdGVkJywgOjp0aGlzLmluY3JlbWVudFN0ZXBDb3VudClcbiAgICAgIC5vbmNlKCd0ZXN0LWNhc2Utc3RhcnRlZCcsIDo6dGhpcy5pbml0aWFsaXplUHJvZ3Jlc3NCYXIpXG4gICAgICAub24oJ3Rlc3Qtc3RlcC1maW5pc2hlZCcsIDo6dGhpcy5sb2dQcm9ncmVzcylcbiAgICAgIC5vbigndGVzdC1jYXNlLWZpbmlzaGVkJywgOjp0aGlzLmxvZ0Vycm9ySWZOZWVkZWQpXG4gICAgICAub24oJ3Rlc3QtcnVuLWZpbmlzaGVkJywgOjp0aGlzLmxvZ1N1bW1hcnkpXG4gICAgdGhpcy5udW1iZXJPZlN0ZXBzID0gMFxuICAgIHRoaXMuaXNzdWVDb3VudCA9IDBcbiAgfVxuXG4gIGluY3JlbWVudFN0ZXBDb3VudCh7IHBpY2tsZSB9KSB7XG4gICAgdGhpcy5udW1iZXJPZlN0ZXBzICs9IHBpY2tsZS5zdGVwcy5sZW5ndGhcbiAgfVxuXG4gIGluaXRpYWxpemVQcm9ncmVzc0JhcigpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyKCc6Y3VycmVudC86dG90YWwgc3RlcHMgWzpiYXJdICcsIHtcbiAgICAgIGNsZWFyOiB0cnVlLFxuICAgICAgaW5jb21wbGV0ZTogJyAnLFxuICAgICAgc3RyZWFtOiB0aGlzLnN0cmVhbSxcbiAgICAgIHRvdGFsOiB0aGlzLm51bWJlck9mU3RlcHMsXG4gICAgICB3aWR0aDogdGhpcy5zdHJlYW0uY29sdW1ucyB8fCA4MCxcbiAgICB9KVxuICB9XG5cbiAgbG9nUHJvZ3Jlc3MoeyBpbmRleCwgdGVzdENhc2U6IHsgc291cmNlTG9jYXRpb24gfSB9KSB7XG4gICAgY29uc3QgeyB0ZXN0Q2FzZSB9ID0gdGhpcy5ldmVudERhdGFDb2xsZWN0b3IuZ2V0VGVzdENhc2VEYXRhKHNvdXJjZUxvY2F0aW9uKVxuICAgIGlmICh0ZXN0Q2FzZS5zdGVwc1tpbmRleF0uc291cmNlTG9jYXRpb24pIHtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXIudGljaygpXG4gICAgfVxuICB9XG5cbiAgbG9nRXJyb3JJZk5lZWRlZCh7IHNvdXJjZUxvY2F0aW9uLCByZXN1bHQgfSkge1xuICAgIGlmIChpc0lzc3VlKHJlc3VsdC5zdGF0dXMpKSB7XG4gICAgICB0aGlzLmlzc3VlQ291bnQgKz0gMVxuICAgICAgY29uc3Qge1xuICAgICAgICBnaGVya2luRG9jdW1lbnQsXG4gICAgICAgIHBpY2tsZSxcbiAgICAgICAgdGVzdENhc2UsXG4gICAgICB9ID0gdGhpcy5ldmVudERhdGFDb2xsZWN0b3IuZ2V0VGVzdENhc2VEYXRhKHNvdXJjZUxvY2F0aW9uKVxuICAgICAgdGhpcy5wcm9ncmVzc0Jhci5pbnRlcnJ1cHQoXG4gICAgICAgIGZvcm1hdElzc3VlKHtcbiAgICAgICAgICBjb2xvckZuczogdGhpcy5jb2xvckZucyxcbiAgICAgICAgICBnaGVya2luRG9jdW1lbnQsXG4gICAgICAgICAgbnVtYmVyOiB0aGlzLmlzc3VlQ291bnQsXG4gICAgICAgICAgcGlja2xlLFxuICAgICAgICAgIHNuaXBwZXRCdWlsZGVyOiB0aGlzLnNuaXBwZXRCdWlsZGVyLFxuICAgICAgICAgIHRlc3RDYXNlLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGxvZ1N1bW1hcnkodGVzdFJ1bikge1xuICAgIHRoaXMubG9nKFxuICAgICAgZm9ybWF0U3VtbWFyeSh7XG4gICAgICAgIGNvbG9yRm5zOiB0aGlzLmNvbG9yRm5zLFxuICAgICAgICB0ZXN0Q2FzZU1hcDogdGhpcy5ldmVudERhdGFDb2xsZWN0b3IudGVzdENhc2VNYXAsXG4gICAgICAgIHRlc3RSdW4sXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuIl19