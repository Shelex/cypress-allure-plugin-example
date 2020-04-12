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

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _status = require('../status');

var _status2 = _interopRequireDefault(_status);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SnippetsFormatter = function (_Formatter) {
  (0, _inherits3.default)(SnippetsFormatter, _Formatter);

  function SnippetsFormatter(options) {
    (0, _classCallCheck3.default)(this, SnippetsFormatter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SnippetsFormatter.__proto__ || Object.getPrototypeOf(SnippetsFormatter)).call(this, options));

    options.eventBroadcaster.on('test-step-finished', _this.logUndefinedTestStepSnippet.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(SnippetsFormatter, [{
    key: 'logUndefinedTestStepSnippet',
    value: function logUndefinedTestStepSnippet(_ref) {
      var sourceLocation = _ref.testCase.sourceLocation,
          index = _ref.index,
          result = _ref.result;

      if (result.status === _status2.default.UNDEFINED) {
        var _eventDataCollector$g = this.eventDataCollector.getTestCaseData(sourceLocation),
            gherkinDocument = _eventDataCollector$g.gherkinDocument,
            testCase = _eventDataCollector$g.testCase;

        var _eventDataCollector$g2 = this.eventDataCollector.getTestStepData({ testCase: testCase, index: index }),
            pickleStep = _eventDataCollector$g2.pickleStep,
            gherkinKeyword = _eventDataCollector$g2.gherkinKeyword;

        var previousKeywordType = this.getPreviousKeywordType({
          gherkinDocument: gherkinDocument,
          testCase: testCase,
          index: index
        });
        var keywordType = (0, _helpers.getStepKeywordType)({
          keyword: gherkinKeyword,
          language: gherkinDocument.feature.language,
          previousKeywordType: previousKeywordType
        });
        var snippet = this.snippetBuilder.build({ keywordType: keywordType, pickleStep: pickleStep });
        this.log(snippet + '\n\n');
      }
    }
  }, {
    key: 'getPreviousKeywordType',
    value: function getPreviousKeywordType(_ref2) {
      var gherkinDocument = _ref2.gherkinDocument,
          testCase = _ref2.testCase,
          index = _ref2.index;

      var previousKeywordType = _helpers.KeywordType.PRECONDITION;
      for (var i = 0; i < index; i += 1) {
        var _eventDataCollector$g3 = this.eventDataCollector.getTestStepData({
          testCase: testCase,
          index: i
        }),
            gherkinKeyword = _eventDataCollector$g3.gherkinKeyword;

        previousKeywordType = (0, _helpers.getStepKeywordType)({
          keyword: gherkinKeyword,
          language: gherkinDocument.feature.language,
          previousKeywordType: previousKeywordType
        });
      }
      return previousKeywordType;
    }
  }]);
  return SnippetsFormatter;
}(_2.default);

exports.default = SnippetsFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvc25pcHBldHNfZm9ybWF0dGVyLmpzIl0sIm5hbWVzIjpbIlNuaXBwZXRzRm9ybWF0dGVyIiwib3B0aW9ucyIsImV2ZW50QnJvYWRjYXN0ZXIiLCJvbiIsImxvZ1VuZGVmaW5lZFRlc3RTdGVwU25pcHBldCIsInNvdXJjZUxvY2F0aW9uIiwidGVzdENhc2UiLCJpbmRleCIsInJlc3VsdCIsInN0YXR1cyIsIlVOREVGSU5FRCIsImV2ZW50RGF0YUNvbGxlY3RvciIsImdldFRlc3RDYXNlRGF0YSIsImdoZXJraW5Eb2N1bWVudCIsImdldFRlc3RTdGVwRGF0YSIsInBpY2tsZVN0ZXAiLCJnaGVya2luS2V5d29yZCIsInByZXZpb3VzS2V5d29yZFR5cGUiLCJnZXRQcmV2aW91c0tleXdvcmRUeXBlIiwia2V5d29yZFR5cGUiLCJrZXl3b3JkIiwibGFuZ3VhZ2UiLCJmZWF0dXJlIiwic25pcHBldCIsInNuaXBwZXRCdWlsZGVyIiwiYnVpbGQiLCJsb2ciLCJQUkVDT05ESVRJT04iLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRXFCQSxpQjs7O0FBQ25CLDZCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQUEsb0pBQ2JBLE9BRGE7O0FBRW5CQSxZQUFRQyxnQkFBUixDQUF5QkMsRUFBekIsQ0FDRSxvQkFERixFQUVJLE1BQUtDLDJCQUZUO0FBRm1CO0FBTXBCOzs7O3NEQUU0RTtBQUFBLFVBQW5DQyxjQUFtQyxRQUEvQ0MsUUFBK0MsQ0FBbkNELGNBQW1DO0FBQUEsVUFBakJFLEtBQWlCLFFBQWpCQSxLQUFpQjtBQUFBLFVBQVZDLE1BQVUsUUFBVkEsTUFBVTs7QUFDM0UsVUFBSUEsT0FBT0MsTUFBUCxLQUFrQixpQkFBT0MsU0FBN0IsRUFBd0M7QUFBQSxvQ0FJbEMsS0FBS0Msa0JBQUwsQ0FBd0JDLGVBQXhCLENBQXdDUCxjQUF4QyxDQUprQztBQUFBLFlBRXBDUSxlQUZvQyx5QkFFcENBLGVBRm9DO0FBQUEsWUFHcENQLFFBSG9DLHlCQUdwQ0EsUUFIb0M7O0FBQUEscUNBUWxDLEtBQUtLLGtCQUFMLENBQXdCRyxlQUF4QixDQUF3QyxFQUFFUixrQkFBRixFQUFZQyxZQUFaLEVBQXhDLENBUmtDO0FBQUEsWUFNcENRLFVBTm9DLDBCQU1wQ0EsVUFOb0M7QUFBQSxZQU9wQ0MsY0FQb0MsMEJBT3BDQSxjQVBvQzs7QUFTdEMsWUFBTUMsc0JBQXNCLEtBQUtDLHNCQUFMLENBQTRCO0FBQ3RETCwwQ0FEc0Q7QUFFdERQLDRCQUZzRDtBQUd0REM7QUFIc0QsU0FBNUIsQ0FBNUI7QUFLQSxZQUFNWSxjQUFjLGlDQUFtQjtBQUNyQ0MsbUJBQVNKLGNBRDRCO0FBRXJDSyxvQkFBVVIsZ0JBQWdCUyxPQUFoQixDQUF3QkQsUUFGRztBQUdyQ0o7QUFIcUMsU0FBbkIsQ0FBcEI7QUFLQSxZQUFNTSxVQUFVLEtBQUtDLGNBQUwsQ0FBb0JDLEtBQXBCLENBQTBCLEVBQUVOLHdCQUFGLEVBQWVKLHNCQUFmLEVBQTFCLENBQWhCO0FBQ0EsYUFBS1csR0FBTCxDQUFZSCxPQUFaO0FBQ0Q7QUFDRjs7O2tEQUU0RDtBQUFBLFVBQXBDVixlQUFvQyxTQUFwQ0EsZUFBb0M7QUFBQSxVQUFuQlAsUUFBbUIsU0FBbkJBLFFBQW1CO0FBQUEsVUFBVEMsS0FBUyxTQUFUQSxLQUFTOztBQUMzRCxVQUFJVSxzQkFBc0IscUJBQVlVLFlBQXRDO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlyQixLQUFwQixFQUEyQnFCLEtBQUssQ0FBaEMsRUFBbUM7QUFBQSxxQ0FDTixLQUFLakIsa0JBQUwsQ0FBd0JHLGVBQXhCLENBQXdDO0FBQ2pFUiw0QkFEaUU7QUFFakVDLGlCQUFPcUI7QUFGMEQsU0FBeEMsQ0FETTtBQUFBLFlBQ3pCWixjQUR5QiwwQkFDekJBLGNBRHlCOztBQUtqQ0MsOEJBQXNCLGlDQUFtQjtBQUN2Q0csbUJBQVNKLGNBRDhCO0FBRXZDSyxvQkFBVVIsZ0JBQWdCUyxPQUFoQixDQUF3QkQsUUFGSztBQUd2Q0o7QUFIdUMsU0FBbkIsQ0FBdEI7QUFLRDtBQUNELGFBQU9BLG1CQUFQO0FBQ0Q7Ozs7O2tCQWhEa0JqQixpQiIsImZpbGUiOiJzbmlwcGV0c19mb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4vJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuLi9zdGF0dXMnXG5pbXBvcnQgeyBLZXl3b3JkVHlwZSwgZ2V0U3RlcEtleXdvcmRUeXBlIH0gZnJvbSAnLi9oZWxwZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmlwcGV0c0Zvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIG9wdGlvbnMuZXZlbnRCcm9hZGNhc3Rlci5vbihcbiAgICAgICd0ZXN0LXN0ZXAtZmluaXNoZWQnLFxuICAgICAgOjp0aGlzLmxvZ1VuZGVmaW5lZFRlc3RTdGVwU25pcHBldFxuICAgIClcbiAgfVxuXG4gIGxvZ1VuZGVmaW5lZFRlc3RTdGVwU25pcHBldCh7IHRlc3RDYXNlOiB7IHNvdXJjZUxvY2F0aW9uIH0sIGluZGV4LCByZXN1bHQgfSkge1xuICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSBTdGF0dXMuVU5ERUZJTkVEKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGdoZXJraW5Eb2N1bWVudCxcbiAgICAgICAgdGVzdENhc2UsXG4gICAgICB9ID0gdGhpcy5ldmVudERhdGFDb2xsZWN0b3IuZ2V0VGVzdENhc2VEYXRhKHNvdXJjZUxvY2F0aW9uKVxuICAgICAgY29uc3Qge1xuICAgICAgICBwaWNrbGVTdGVwLFxuICAgICAgICBnaGVya2luS2V5d29yZCxcbiAgICAgIH0gPSB0aGlzLmV2ZW50RGF0YUNvbGxlY3Rvci5nZXRUZXN0U3RlcERhdGEoeyB0ZXN0Q2FzZSwgaW5kZXggfSlcbiAgICAgIGNvbnN0IHByZXZpb3VzS2V5d29yZFR5cGUgPSB0aGlzLmdldFByZXZpb3VzS2V5d29yZFR5cGUoe1xuICAgICAgICBnaGVya2luRG9jdW1lbnQsXG4gICAgICAgIHRlc3RDYXNlLFxuICAgICAgICBpbmRleCxcbiAgICAgIH0pXG4gICAgICBjb25zdCBrZXl3b3JkVHlwZSA9IGdldFN0ZXBLZXl3b3JkVHlwZSh7XG4gICAgICAgIGtleXdvcmQ6IGdoZXJraW5LZXl3b3JkLFxuICAgICAgICBsYW5ndWFnZTogZ2hlcmtpbkRvY3VtZW50LmZlYXR1cmUubGFuZ3VhZ2UsXG4gICAgICAgIHByZXZpb3VzS2V5d29yZFR5cGUsXG4gICAgICB9KVxuICAgICAgY29uc3Qgc25pcHBldCA9IHRoaXMuc25pcHBldEJ1aWxkZXIuYnVpbGQoeyBrZXl3b3JkVHlwZSwgcGlja2xlU3RlcCB9KVxuICAgICAgdGhpcy5sb2coYCR7c25pcHBldH1cXG5cXG5gKVxuICAgIH1cbiAgfVxuXG4gIGdldFByZXZpb3VzS2V5d29yZFR5cGUoeyBnaGVya2luRG9jdW1lbnQsIHRlc3RDYXNlLCBpbmRleCB9KSB7XG4gICAgbGV0IHByZXZpb3VzS2V5d29yZFR5cGUgPSBLZXl3b3JkVHlwZS5QUkVDT05ESVRJT05cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4OyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHsgZ2hlcmtpbktleXdvcmQgfSA9IHRoaXMuZXZlbnREYXRhQ29sbGVjdG9yLmdldFRlc3RTdGVwRGF0YSh7XG4gICAgICAgIHRlc3RDYXNlLFxuICAgICAgICBpbmRleDogaSxcbiAgICAgIH0pXG4gICAgICBwcmV2aW91c0tleXdvcmRUeXBlID0gZ2V0U3RlcEtleXdvcmRUeXBlKHtcbiAgICAgICAga2V5d29yZDogZ2hlcmtpbktleXdvcmQsXG4gICAgICAgIGxhbmd1YWdlOiBnaGVya2luRG9jdW1lbnQuZmVhdHVyZS5sYW5ndWFnZSxcbiAgICAgICAgcHJldmlvdXNLZXl3b3JkVHlwZSxcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBwcmV2aW91c0tleXdvcmRUeXBlXG4gIH1cbn1cbiJdfQ==