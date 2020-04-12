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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('./helpers');

var _2 = require('./');

var _3 = _interopRequireDefault(_2);

var _status = require('../status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SummaryFormatter = function (_Formatter) {
  (0, _inherits3.default)(SummaryFormatter, _Formatter);

  function SummaryFormatter(options) {
    (0, _classCallCheck3.default)(this, SummaryFormatter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SummaryFormatter.__proto__ || Object.getPrototypeOf(SummaryFormatter)).call(this, options));

    options.eventBroadcaster.on('test-run-finished', _this.logSummary.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(SummaryFormatter, [{
    key: 'isTestCaseFailure',
    value: function isTestCaseFailure(testCase) {
      return _lodash2.default.includes([_status2.default.AMBIGUOUS, _status2.default.FAILED], testCase.result.status);
    }
  }, {
    key: 'isTestCaseWarning',
    value: function isTestCaseWarning(testCase) {
      return _lodash2.default.includes([_status2.default.PENDING, _status2.default.UNDEFINED], testCase.result.status);
    }
  }, {
    key: 'logSummary',
    value: function logSummary(testRun) {
      var _this2 = this;

      var failures = [];
      var warnings = [];
      _lodash2.default.each(this.eventDataCollector.testCaseMap, function (testCase) {
        if (_this2.isTestCaseFailure(testCase)) {
          failures.push(testCase);
        } else if (_this2.isTestCaseWarning(testCase)) {
          warnings.push(testCase);
        }
      });
      if (failures.length > 0) {
        this.logIssues({ issues: failures, title: 'Failures' });
      }
      if (warnings.length > 0) {
        this.logIssues({ issues: warnings, title: 'Warnings' });
      }
      this.log((0, _helpers.formatSummary)({
        colorFns: this.colorFns,
        testCaseMap: this.eventDataCollector.testCaseMap,
        testRun: testRun
      }));
    }
  }, {
    key: 'logIssues',
    value: function logIssues(_ref) {
      var _this3 = this;

      var issues = _ref.issues,
          title = _ref.title;

      this.log(title + ':\n\n');
      issues.forEach(function (testCase, index) {
        var _eventDataCollector$g = _this3.eventDataCollector.getTestCaseData(testCase.sourceLocation),
            gherkinDocument = _eventDataCollector$g.gherkinDocument,
            pickle = _eventDataCollector$g.pickle;

        _this3.log((0, _helpers.formatIssue)({
          colorFns: _this3.colorFns,
          gherkinDocument: gherkinDocument,
          number: index + 1,
          pickle: pickle,
          snippetBuilder: _this3.snippetBuilder,
          testCase: testCase
        }));
      });
    }
  }]);
  return SummaryFormatter;
}(_3.default);

exports.default = SummaryFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvc3VtbWFyeV9mb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiU3VtbWFyeUZvcm1hdHRlciIsIm9wdGlvbnMiLCJldmVudEJyb2FkY2FzdGVyIiwib24iLCJsb2dTdW1tYXJ5IiwidGVzdENhc2UiLCJpbmNsdWRlcyIsIkFNQklHVU9VUyIsIkZBSUxFRCIsInJlc3VsdCIsInN0YXR1cyIsIlBFTkRJTkciLCJVTkRFRklORUQiLCJ0ZXN0UnVuIiwiZmFpbHVyZXMiLCJ3YXJuaW5ncyIsImVhY2giLCJldmVudERhdGFDb2xsZWN0b3IiLCJ0ZXN0Q2FzZU1hcCIsImlzVGVzdENhc2VGYWlsdXJlIiwicHVzaCIsImlzVGVzdENhc2VXYXJuaW5nIiwibGVuZ3RoIiwibG9nSXNzdWVzIiwiaXNzdWVzIiwidGl0bGUiLCJsb2ciLCJjb2xvckZucyIsImZvckVhY2giLCJpbmRleCIsImdldFRlc3RDYXNlRGF0YSIsInNvdXJjZUxvY2F0aW9uIiwiZ2hlcmtpbkRvY3VtZW50IiwicGlja2xlIiwibnVtYmVyIiwic25pcHBldEJ1aWxkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsZ0I7OztBQUNuQiw0QkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBLGtKQUNiQSxPQURhOztBQUVuQkEsWUFBUUMsZ0JBQVIsQ0FBeUJDLEVBQXpCLENBQTRCLG1CQUE1QixFQUFtRCxNQUFLQyxVQUF4RDtBQUZtQjtBQUdwQjs7OztzQ0FFaUJDLFEsRUFBVTtBQUMxQixhQUFPLGlCQUFFQyxRQUFGLENBQVcsQ0FBQyxpQkFBT0MsU0FBUixFQUFtQixpQkFBT0MsTUFBMUIsQ0FBWCxFQUE4Q0gsU0FBU0ksTUFBVCxDQUFnQkMsTUFBOUQsQ0FBUDtBQUNEOzs7c0NBRWlCTCxRLEVBQVU7QUFDMUIsYUFBTyxpQkFBRUMsUUFBRixDQUNMLENBQUMsaUJBQU9LLE9BQVIsRUFBaUIsaUJBQU9DLFNBQXhCLENBREssRUFFTFAsU0FBU0ksTUFBVCxDQUFnQkMsTUFGWCxDQUFQO0FBSUQ7OzsrQkFFVUcsTyxFQUFTO0FBQUE7O0FBQ2xCLFVBQU1DLFdBQVcsRUFBakI7QUFDQSxVQUFNQyxXQUFXLEVBQWpCO0FBQ0EsdUJBQUVDLElBQUYsQ0FBTyxLQUFLQyxrQkFBTCxDQUF3QkMsV0FBL0IsRUFBNEMsb0JBQVk7QUFDdEQsWUFBSSxPQUFLQyxpQkFBTCxDQUF1QmQsUUFBdkIsQ0FBSixFQUFzQztBQUNwQ1MsbUJBQVNNLElBQVQsQ0FBY2YsUUFBZDtBQUNELFNBRkQsTUFFTyxJQUFJLE9BQUtnQixpQkFBTCxDQUF1QmhCLFFBQXZCLENBQUosRUFBc0M7QUFDM0NVLG1CQUFTSyxJQUFULENBQWNmLFFBQWQ7QUFDRDtBQUNGLE9BTkQ7QUFPQSxVQUFJUyxTQUFTUSxNQUFULEdBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLGFBQUtDLFNBQUwsQ0FBZSxFQUFFQyxRQUFRVixRQUFWLEVBQW9CVyxPQUFPLFVBQTNCLEVBQWY7QUFDRDtBQUNELFVBQUlWLFNBQVNPLE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsYUFBS0MsU0FBTCxDQUFlLEVBQUVDLFFBQVFULFFBQVYsRUFBb0JVLE9BQU8sVUFBM0IsRUFBZjtBQUNEO0FBQ0QsV0FBS0MsR0FBTCxDQUNFLDRCQUFjO0FBQ1pDLGtCQUFVLEtBQUtBLFFBREg7QUFFWlQscUJBQWEsS0FBS0Qsa0JBQUwsQ0FBd0JDLFdBRnpCO0FBR1pMO0FBSFksT0FBZCxDQURGO0FBT0Q7OztvQ0FFNEI7QUFBQTs7QUFBQSxVQUFqQlcsTUFBaUIsUUFBakJBLE1BQWlCO0FBQUEsVUFBVEMsS0FBUyxRQUFUQSxLQUFTOztBQUMzQixXQUFLQyxHQUFMLENBQVlELEtBQVo7QUFDQUQsYUFBT0ksT0FBUCxDQUFlLFVBQUN2QixRQUFELEVBQVd3QixLQUFYLEVBQXFCO0FBQUEsb0NBSTlCLE9BQUtaLGtCQUFMLENBQXdCYSxlQUF4QixDQUF3Q3pCLFNBQVMwQixjQUFqRCxDQUo4QjtBQUFBLFlBRWhDQyxlQUZnQyx5QkFFaENBLGVBRmdDO0FBQUEsWUFHaENDLE1BSGdDLHlCQUdoQ0EsTUFIZ0M7O0FBS2xDLGVBQUtQLEdBQUwsQ0FDRSwwQkFBWTtBQUNWQyxvQkFBVSxPQUFLQSxRQURMO0FBRVZLLDBDQUZVO0FBR1ZFLGtCQUFRTCxRQUFRLENBSE47QUFJVkksd0JBSlU7QUFLVkUsMEJBQWdCLE9BQUtBLGNBTFg7QUFNVjlCO0FBTlUsU0FBWixDQURGO0FBVUQsT0FmRDtBQWdCRDs7Ozs7a0JBNURrQkwsZ0IiLCJmaWxlIjoic3VtbWFyeV9mb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBmb3JtYXRJc3N1ZSwgZm9ybWF0U3VtbWFyeSB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi8nXG5pbXBvcnQgU3RhdHVzIGZyb20gJy4uL3N0YXR1cydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VtbWFyeUZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIG9wdGlvbnMuZXZlbnRCcm9hZGNhc3Rlci5vbigndGVzdC1ydW4tZmluaXNoZWQnLCA6OnRoaXMubG9nU3VtbWFyeSlcbiAgfVxuXG4gIGlzVGVzdENhc2VGYWlsdXJlKHRlc3RDYXNlKSB7XG4gICAgcmV0dXJuIF8uaW5jbHVkZXMoW1N0YXR1cy5BTUJJR1VPVVMsIFN0YXR1cy5GQUlMRURdLCB0ZXN0Q2FzZS5yZXN1bHQuc3RhdHVzKVxuICB9XG5cbiAgaXNUZXN0Q2FzZVdhcm5pbmcodGVzdENhc2UpIHtcbiAgICByZXR1cm4gXy5pbmNsdWRlcyhcbiAgICAgIFtTdGF0dXMuUEVORElORywgU3RhdHVzLlVOREVGSU5FRF0sXG4gICAgICB0ZXN0Q2FzZS5yZXN1bHQuc3RhdHVzXG4gICAgKVxuICB9XG5cbiAgbG9nU3VtbWFyeSh0ZXN0UnVuKSB7XG4gICAgY29uc3QgZmFpbHVyZXMgPSBbXVxuICAgIGNvbnN0IHdhcm5pbmdzID0gW11cbiAgICBfLmVhY2godGhpcy5ldmVudERhdGFDb2xsZWN0b3IudGVzdENhc2VNYXAsIHRlc3RDYXNlID0+IHtcbiAgICAgIGlmICh0aGlzLmlzVGVzdENhc2VGYWlsdXJlKHRlc3RDYXNlKSkge1xuICAgICAgICBmYWlsdXJlcy5wdXNoKHRlc3RDYXNlKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVGVzdENhc2VXYXJuaW5nKHRlc3RDYXNlKSkge1xuICAgICAgICB3YXJuaW5ncy5wdXNoKHRlc3RDYXNlKVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKGZhaWx1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubG9nSXNzdWVzKHsgaXNzdWVzOiBmYWlsdXJlcywgdGl0bGU6ICdGYWlsdXJlcycgfSlcbiAgICB9XG4gICAgaWYgKHdhcm5pbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubG9nSXNzdWVzKHsgaXNzdWVzOiB3YXJuaW5ncywgdGl0bGU6ICdXYXJuaW5ncycgfSlcbiAgICB9XG4gICAgdGhpcy5sb2coXG4gICAgICBmb3JtYXRTdW1tYXJ5KHtcbiAgICAgICAgY29sb3JGbnM6IHRoaXMuY29sb3JGbnMsXG4gICAgICAgIHRlc3RDYXNlTWFwOiB0aGlzLmV2ZW50RGF0YUNvbGxlY3Rvci50ZXN0Q2FzZU1hcCxcbiAgICAgICAgdGVzdFJ1bixcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgbG9nSXNzdWVzKHsgaXNzdWVzLCB0aXRsZSB9KSB7XG4gICAgdGhpcy5sb2coYCR7dGl0bGV9OlxcblxcbmApXG4gICAgaXNzdWVzLmZvckVhY2goKHRlc3RDYXNlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBnaGVya2luRG9jdW1lbnQsXG4gICAgICAgIHBpY2tsZSxcbiAgICAgIH0gPSB0aGlzLmV2ZW50RGF0YUNvbGxlY3Rvci5nZXRUZXN0Q2FzZURhdGEodGVzdENhc2Uuc291cmNlTG9jYXRpb24pXG4gICAgICB0aGlzLmxvZyhcbiAgICAgICAgZm9ybWF0SXNzdWUoe1xuICAgICAgICAgIGNvbG9yRm5zOiB0aGlzLmNvbG9yRm5zLFxuICAgICAgICAgIGdoZXJraW5Eb2N1bWVudCxcbiAgICAgICAgICBudW1iZXI6IGluZGV4ICsgMSxcbiAgICAgICAgICBwaWNrbGUsXG4gICAgICAgICAgc25pcHBldEJ1aWxkZXI6IHRoaXMuc25pcHBldEJ1aWxkZXIsXG4gICAgICAgICAgdGVzdENhc2UsXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfSlcbiAgfVxufVxuIl19