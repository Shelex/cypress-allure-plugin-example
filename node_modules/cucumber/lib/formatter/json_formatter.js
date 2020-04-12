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

var _2 = require('./');

var _3 = _interopRequireDefault(_2);

var _status = require('../status');

var _status2 = _interopRequireDefault(_status);

var _helpers = require('./helpers');

var _step_arguments = require('../step_arguments');

var _assertionErrorFormatter = require('assertion-error-formatter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStepLineToKeywordMap = _helpers.GherkinDocumentParser.getStepLineToKeywordMap,
    getScenarioLineToDescriptionMap = _helpers.GherkinDocumentParser.getScenarioLineToDescriptionMap;
var getScenarioDescription = _helpers.PickleParser.getScenarioDescription,
    getStepLineToPickledStepMap = _helpers.PickleParser.getStepLineToPickledStepMap,
    getStepKeyword = _helpers.PickleParser.getStepKeyword;

var JsonFormatter = function (_Formatter) {
  (0, _inherits3.default)(JsonFormatter, _Formatter);

  function JsonFormatter(options) {
    (0, _classCallCheck3.default)(this, JsonFormatter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (JsonFormatter.__proto__ || Object.getPrototypeOf(JsonFormatter)).call(this, options));

    options.eventBroadcaster.on('test-run-finished', _this.onTestRunFinished.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(JsonFormatter, [{
    key: 'convertNameToId',
    value: function convertNameToId(obj) {
      return obj.name.replace(/ /g, '-').toLowerCase();
    }
  }, {
    key: 'formatDataTable',
    value: function formatDataTable(dataTable) {
      return {
        rows: dataTable.rows.map(function (row) {
          return { cells: _lodash2.default.map(row.cells, 'value') };
        })
      };
    }
  }, {
    key: 'formatDocString',
    value: function formatDocString(docString) {
      return {
        content: docString.content,
        line: docString.location.line
      };
    }
  }, {
    key: 'formatStepArguments',
    value: function formatStepArguments(stepArguments) {
      var iterator = (0, _step_arguments.buildStepArgumentIterator)({
        dataTable: this.formatDataTable.bind(this),
        docString: this.formatDocString.bind(this)
      });
      return _lodash2.default.map(stepArguments, iterator);
    }
  }, {
    key: 'onTestRunFinished',
    value: function onTestRunFinished() {
      var _this2 = this;

      var groupedTestCases = {};
      _lodash2.default.each(this.eventDataCollector.testCaseMap, function (testCase) {
        var uri = testCase.sourceLocation.uri;

        if (!groupedTestCases[uri]) {
          groupedTestCases[uri] = [];
        }
        groupedTestCases[uri].push(testCase);
      });
      var features = _lodash2.default.map(groupedTestCases, function (group, uri) {
        var gherkinDocument = _this2.eventDataCollector.gherkinDocumentMap[uri];
        var featureData = _this2.getFeatureData(gherkinDocument.feature, uri);
        var stepLineToKeywordMap = getStepLineToKeywordMap(gherkinDocument);
        var scenarioLineToDescriptionMap = getScenarioLineToDescriptionMap(gherkinDocument);
        featureData.elements = group.map(function (testCase) {
          var _eventDataCollector$g = _this2.eventDataCollector.getTestCaseData(testCase.sourceLocation),
              pickle = _eventDataCollector$g.pickle;

          var scenarioData = _this2.getScenarioData({
            featureId: featureData.id,
            pickle: pickle,
            scenarioLineToDescriptionMap: scenarioLineToDescriptionMap
          });
          var stepLineToPickledStepMap = getStepLineToPickledStepMap(pickle);
          var isBeforeHook = true;
          scenarioData.steps = testCase.steps.map(function (testStep) {
            isBeforeHook = isBeforeHook && !testStep.sourceLocation;
            return _this2.getStepData({
              isBeforeHook: isBeforeHook,
              stepLineToKeywordMap: stepLineToKeywordMap,
              stepLineToPickledStepMap: stepLineToPickledStepMap,
              testStep: testStep
            });
          });
          return scenarioData;
        });
        return featureData;
      });
      this.log(JSON.stringify(features, null, 2));
    }
  }, {
    key: 'getFeatureData',
    value: function getFeatureData(feature, uri) {
      return {
        description: feature.description,
        keyword: feature.keyword,
        name: feature.name,
        line: feature.location.line,
        id: this.convertNameToId(feature),
        tags: this.getTags(feature),
        uri: uri
      };
    }
  }, {
    key: 'getScenarioData',
    value: function getScenarioData(_ref) {
      var featureId = _ref.featureId,
          pickle = _ref.pickle,
          scenarioLineToDescriptionMap = _ref.scenarioLineToDescriptionMap;

      var description = getScenarioDescription({
        pickle: pickle,
        scenarioLineToDescriptionMap: scenarioLineToDescriptionMap
      });
      return {
        description: description,
        id: featureId + ';' + this.convertNameToId(pickle),
        keyword: 'Scenario',
        line: pickle.locations[0].line,
        name: pickle.name,
        tags: this.getTags(pickle),
        type: 'scenario'
      };
    }
  }, {
    key: 'getStepData',
    value: function getStepData(_ref2) {
      var isBeforeHook = _ref2.isBeforeHook,
          stepLineToKeywordMap = _ref2.stepLineToKeywordMap,
          stepLineToPickledStepMap = _ref2.stepLineToPickledStepMap,
          testStep = _ref2.testStep;

      var data = {};
      if (testStep.sourceLocation) {
        var line = testStep.sourceLocation.line;

        var pickleStep = stepLineToPickledStepMap[line];
        data.arguments = this.formatStepArguments(pickleStep.arguments);
        data.keyword = getStepKeyword({ pickleStep: pickleStep, stepLineToKeywordMap: stepLineToKeywordMap });
        data.line = line;
        data.name = pickleStep.text;
      } else {
        data.keyword = isBeforeHook ? 'Before' : 'After';
        data.hidden = true;
      }
      if (testStep.actionLocation) {
        data.match = { location: (0, _helpers.formatLocation)(testStep.actionLocation) };
      }
      if (testStep.result) {
        var _testStep$result = testStep.result,
            exception = _testStep$result.exception,
            status = _testStep$result.status;

        data.result = { status: status };
        if (testStep.result.duration) {
          data.result.duration = testStep.result.duration * 1000000;
        }
        if (status === _status2.default.FAILED && exception) {
          data.result.error_message = (0, _assertionErrorFormatter.format)(exception);
        }
      }
      if (_lodash2.default.size(testStep.attachments) > 0) {
        data.embeddings = testStep.attachments.map(function (attachment) {
          return {
            data: attachment.data,
            mime_type: attachment.media.type
          };
        });
      }
      return data;
    }
  }, {
    key: 'getTags',
    value: function getTags(obj) {
      return _lodash2.default.map(obj.tags, function (tagData) {
        return {
          name: tagData.name,
          line: tagData.location.line
        };
      });
    }
  }]);
  return JsonFormatter;
}(_3.default);

exports.default = JsonFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvanNvbl9mb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiZ2V0U3RlcExpbmVUb0tleXdvcmRNYXAiLCJnZXRTY2VuYXJpb0xpbmVUb0Rlc2NyaXB0aW9uTWFwIiwiZ2V0U2NlbmFyaW9EZXNjcmlwdGlvbiIsImdldFN0ZXBMaW5lVG9QaWNrbGVkU3RlcE1hcCIsImdldFN0ZXBLZXl3b3JkIiwiSnNvbkZvcm1hdHRlciIsIm9wdGlvbnMiLCJldmVudEJyb2FkY2FzdGVyIiwib24iLCJvblRlc3RSdW5GaW5pc2hlZCIsIm9iaiIsIm5hbWUiLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCJkYXRhVGFibGUiLCJyb3dzIiwibWFwIiwiY2VsbHMiLCJyb3ciLCJkb2NTdHJpbmciLCJjb250ZW50IiwibGluZSIsImxvY2F0aW9uIiwic3RlcEFyZ3VtZW50cyIsIml0ZXJhdG9yIiwiZm9ybWF0RGF0YVRhYmxlIiwiYmluZCIsImZvcm1hdERvY1N0cmluZyIsImdyb3VwZWRUZXN0Q2FzZXMiLCJlYWNoIiwiZXZlbnREYXRhQ29sbGVjdG9yIiwidGVzdENhc2VNYXAiLCJ1cmkiLCJ0ZXN0Q2FzZSIsInNvdXJjZUxvY2F0aW9uIiwicHVzaCIsImZlYXR1cmVzIiwiZ3JvdXAiLCJnaGVya2luRG9jdW1lbnQiLCJnaGVya2luRG9jdW1lbnRNYXAiLCJmZWF0dXJlRGF0YSIsImdldEZlYXR1cmVEYXRhIiwiZmVhdHVyZSIsInN0ZXBMaW5lVG9LZXl3b3JkTWFwIiwic2NlbmFyaW9MaW5lVG9EZXNjcmlwdGlvbk1hcCIsImVsZW1lbnRzIiwiZ2V0VGVzdENhc2VEYXRhIiwicGlja2xlIiwic2NlbmFyaW9EYXRhIiwiZ2V0U2NlbmFyaW9EYXRhIiwiZmVhdHVyZUlkIiwiaWQiLCJzdGVwTGluZVRvUGlja2xlZFN0ZXBNYXAiLCJpc0JlZm9yZUhvb2siLCJzdGVwcyIsInRlc3RTdGVwIiwiZ2V0U3RlcERhdGEiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiZGVzY3JpcHRpb24iLCJrZXl3b3JkIiwiY29udmVydE5hbWVUb0lkIiwidGFncyIsImdldFRhZ3MiLCJsb2NhdGlvbnMiLCJ0eXBlIiwiZGF0YSIsInBpY2tsZVN0ZXAiLCJhcmd1bWVudHMiLCJmb3JtYXRTdGVwQXJndW1lbnRzIiwidGV4dCIsImhpZGRlbiIsImFjdGlvbkxvY2F0aW9uIiwibWF0Y2giLCJyZXN1bHQiLCJleGNlcHRpb24iLCJzdGF0dXMiLCJkdXJhdGlvbiIsIkZBSUxFRCIsImVycm9yX21lc3NhZ2UiLCJzaXplIiwiYXR0YWNobWVudHMiLCJlbWJlZGRpbmdzIiwiYXR0YWNobWVudCIsIm1pbWVfdHlwZSIsIm1lZGlhIiwidGFnRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0lBR0VBLHVCLGtDQUFBQSx1QjtJQUNBQywrQixrQ0FBQUEsK0I7SUFJQUMsc0IseUJBQUFBLHNCO0lBQ0FDLDJCLHlCQUFBQSwyQjtJQUNBQyxjLHlCQUFBQSxjOztJQUdtQkMsYTs7O0FBQ25CLHlCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQUEsNElBQ2JBLE9BRGE7O0FBRW5CQSxZQUFRQyxnQkFBUixDQUF5QkMsRUFBekIsQ0FBNEIsbUJBQTVCLEVBQW1ELE1BQUtDLGlCQUF4RDtBQUZtQjtBQUdwQjs7OztvQ0FFZUMsRyxFQUFLO0FBQ25CLGFBQU9BLElBQUlDLElBQUosQ0FBU0MsT0FBVCxDQUFpQixJQUFqQixFQUF1QixHQUF2QixFQUE0QkMsV0FBNUIsRUFBUDtBQUNEOzs7b0NBRWVDLFMsRUFBVztBQUN6QixhQUFPO0FBQ0xDLGNBQU1ELFVBQVVDLElBQVYsQ0FBZUMsR0FBZixDQUFtQjtBQUFBLGlCQUFRLEVBQUVDLE9BQU8saUJBQUVELEdBQUYsQ0FBTUUsSUFBSUQsS0FBVixFQUFpQixPQUFqQixDQUFULEVBQVI7QUFBQSxTQUFuQjtBQURELE9BQVA7QUFHRDs7O29DQUVlRSxTLEVBQVc7QUFDekIsYUFBTztBQUNMQyxpQkFBU0QsVUFBVUMsT0FEZDtBQUVMQyxjQUFNRixVQUFVRyxRQUFWLENBQW1CRDtBQUZwQixPQUFQO0FBSUQ7Ozt3Q0FFbUJFLGEsRUFBZTtBQUNqQyxVQUFNQyxXQUFXLCtDQUEwQjtBQUN6Q1YsbUJBQVcsS0FBS1csZUFBTCxDQUFxQkMsSUFBckIsQ0FBMEIsSUFBMUIsQ0FEOEI7QUFFekNQLG1CQUFXLEtBQUtRLGVBQUwsQ0FBcUJELElBQXJCLENBQTBCLElBQTFCO0FBRjhCLE9BQTFCLENBQWpCO0FBSUEsYUFBTyxpQkFBRVYsR0FBRixDQUFNTyxhQUFOLEVBQXFCQyxRQUFyQixDQUFQO0FBQ0Q7Ozt3Q0FFbUI7QUFBQTs7QUFDbEIsVUFBTUksbUJBQW1CLEVBQXpCO0FBQ0EsdUJBQUVDLElBQUYsQ0FBTyxLQUFLQyxrQkFBTCxDQUF3QkMsV0FBL0IsRUFBNEMsb0JBQVk7QUFBQSxZQUM1QkMsR0FENEIsR0FDbEJDLFFBRGtCLENBQzlDQyxjQUQ4QyxDQUM1QkYsR0FENEI7O0FBRXRELFlBQUksQ0FBQ0osaUJBQWlCSSxHQUFqQixDQUFMLEVBQTRCO0FBQzFCSiwyQkFBaUJJLEdBQWpCLElBQXdCLEVBQXhCO0FBQ0Q7QUFDREoseUJBQWlCSSxHQUFqQixFQUFzQkcsSUFBdEIsQ0FBMkJGLFFBQTNCO0FBQ0QsT0FORDtBQU9BLFVBQU1HLFdBQVcsaUJBQUVwQixHQUFGLENBQU1ZLGdCQUFOLEVBQXdCLFVBQUNTLEtBQUQsRUFBUUwsR0FBUixFQUFnQjtBQUN2RCxZQUFNTSxrQkFBa0IsT0FBS1Isa0JBQUwsQ0FBd0JTLGtCQUF4QixDQUEyQ1AsR0FBM0MsQ0FBeEI7QUFDQSxZQUFNUSxjQUFjLE9BQUtDLGNBQUwsQ0FBb0JILGdCQUFnQkksT0FBcEMsRUFBNkNWLEdBQTdDLENBQXBCO0FBQ0EsWUFBTVcsdUJBQXVCM0Msd0JBQXdCc0MsZUFBeEIsQ0FBN0I7QUFDQSxZQUFNTSwrQkFBK0IzQyxnQ0FDbkNxQyxlQURtQyxDQUFyQztBQUdBRSxvQkFBWUssUUFBWixHQUF1QlIsTUFBTXJCLEdBQU4sQ0FBVSxvQkFBWTtBQUFBLHNDQUN4QixPQUFLYyxrQkFBTCxDQUF3QmdCLGVBQXhCLENBQ2pCYixTQUFTQyxjQURRLENBRHdCO0FBQUEsY0FDbkNhLE1BRG1DLHlCQUNuQ0EsTUFEbUM7O0FBSTNDLGNBQU1DLGVBQWUsT0FBS0MsZUFBTCxDQUFxQjtBQUN4Q0MsdUJBQVdWLFlBQVlXLEVBRGlCO0FBRXhDSiwwQkFGd0M7QUFHeENIO0FBSHdDLFdBQXJCLENBQXJCO0FBS0EsY0FBTVEsMkJBQTJCakQsNEJBQTRCNEMsTUFBNUIsQ0FBakM7QUFDQSxjQUFJTSxlQUFlLElBQW5CO0FBQ0FMLHVCQUFhTSxLQUFiLEdBQXFCckIsU0FBU3FCLEtBQVQsQ0FBZXRDLEdBQWYsQ0FBbUIsb0JBQVk7QUFDbERxQywyQkFBZUEsZ0JBQWdCLENBQUNFLFNBQVNyQixjQUF6QztBQUNBLG1CQUFPLE9BQUtzQixXQUFMLENBQWlCO0FBQ3RCSCx3Q0FEc0I7QUFFdEJWLHdEQUZzQjtBQUd0QlMsZ0VBSHNCO0FBSXRCRztBQUpzQixhQUFqQixDQUFQO0FBTUQsV0FSb0IsQ0FBckI7QUFTQSxpQkFBT1AsWUFBUDtBQUNELFNBckJzQixDQUF2QjtBQXNCQSxlQUFPUixXQUFQO0FBQ0QsT0E5QmdCLENBQWpCO0FBK0JBLFdBQUtpQixHQUFMLENBQVNDLEtBQUtDLFNBQUwsQ0FBZXZCLFFBQWYsRUFBeUIsSUFBekIsRUFBK0IsQ0FBL0IsQ0FBVDtBQUNEOzs7bUNBRWNNLE8sRUFBU1YsRyxFQUFLO0FBQzNCLGFBQU87QUFDTDRCLHFCQUFhbEIsUUFBUWtCLFdBRGhCO0FBRUxDLGlCQUFTbkIsUUFBUW1CLE9BRlo7QUFHTGxELGNBQU0rQixRQUFRL0IsSUFIVDtBQUlMVSxjQUFNcUIsUUFBUXBCLFFBQVIsQ0FBaUJELElBSmxCO0FBS0w4QixZQUFJLEtBQUtXLGVBQUwsQ0FBcUJwQixPQUFyQixDQUxDO0FBTUxxQixjQUFNLEtBQUtDLE9BQUwsQ0FBYXRCLE9BQWIsQ0FORDtBQU9MVjtBQVBLLE9BQVA7QUFTRDs7OzBDQUVvRTtBQUFBLFVBQW5Ea0IsU0FBbUQsUUFBbkRBLFNBQW1EO0FBQUEsVUFBeENILE1BQXdDLFFBQXhDQSxNQUF3QztBQUFBLFVBQWhDSCw0QkFBZ0MsUUFBaENBLDRCQUFnQzs7QUFDbkUsVUFBTWdCLGNBQWMxRCx1QkFBdUI7QUFDekM2QyxzQkFEeUM7QUFFekNIO0FBRnlDLE9BQXZCLENBQXBCO0FBSUEsYUFBTztBQUNMZ0IsZ0NBREs7QUFFTFQsWUFBT0QsU0FBUCxTQUFvQixLQUFLWSxlQUFMLENBQXFCZixNQUFyQixDQUZmO0FBR0xjLGlCQUFTLFVBSEo7QUFJTHhDLGNBQU0wQixPQUFPa0IsU0FBUCxDQUFpQixDQUFqQixFQUFvQjVDLElBSnJCO0FBS0xWLGNBQU1vQyxPQUFPcEMsSUFMUjtBQU1Mb0QsY0FBTSxLQUFLQyxPQUFMLENBQWFqQixNQUFiLENBTkQ7QUFPTG1CLGNBQU07QUFQRCxPQUFQO0FBU0Q7Ozt1Q0FPRTtBQUFBLFVBSkRiLFlBSUMsU0FKREEsWUFJQztBQUFBLFVBSERWLG9CQUdDLFNBSERBLG9CQUdDO0FBQUEsVUFGRFMsd0JBRUMsU0FGREEsd0JBRUM7QUFBQSxVQURERyxRQUNDLFNBRERBLFFBQ0M7O0FBQ0QsVUFBTVksT0FBTyxFQUFiO0FBQ0EsVUFBSVosU0FBU3JCLGNBQWIsRUFBNkI7QUFBQSxZQUNuQmIsSUFEbUIsR0FDVmtDLFNBQVNyQixjQURDLENBQ25CYixJQURtQjs7QUFFM0IsWUFBTStDLGFBQWFoQix5QkFBeUIvQixJQUF6QixDQUFuQjtBQUNBOEMsYUFBS0UsU0FBTCxHQUFpQixLQUFLQyxtQkFBTCxDQUF5QkYsV0FBV0MsU0FBcEMsQ0FBakI7QUFDQUYsYUFBS04sT0FBTCxHQUFlekQsZUFBZSxFQUFFZ0Usc0JBQUYsRUFBY3pCLDBDQUFkLEVBQWYsQ0FBZjtBQUNBd0IsYUFBSzlDLElBQUwsR0FBWUEsSUFBWjtBQUNBOEMsYUFBS3hELElBQUwsR0FBWXlELFdBQVdHLElBQXZCO0FBQ0QsT0FQRCxNQU9PO0FBQ0xKLGFBQUtOLE9BQUwsR0FBZVIsZUFBZSxRQUFmLEdBQTBCLE9BQXpDO0FBQ0FjLGFBQUtLLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFDRCxVQUFJakIsU0FBU2tCLGNBQWIsRUFBNkI7QUFDM0JOLGFBQUtPLEtBQUwsR0FBYSxFQUFFcEQsVUFBVSw2QkFBZWlDLFNBQVNrQixjQUF4QixDQUFaLEVBQWI7QUFDRDtBQUNELFVBQUlsQixTQUFTb0IsTUFBYixFQUFxQjtBQUFBLCtCQUN1QnBCLFFBRHZCLENBQ1hvQixNQURXO0FBQUEsWUFDREMsU0FEQyxvQkFDREEsU0FEQztBQUFBLFlBQ1VDLE1BRFYsb0JBQ1VBLE1BRFY7O0FBRW5CVixhQUFLUSxNQUFMLEdBQWMsRUFBRUUsY0FBRixFQUFkO0FBQ0EsWUFBSXRCLFNBQVNvQixNQUFULENBQWdCRyxRQUFwQixFQUE4QjtBQUM1QlgsZUFBS1EsTUFBTCxDQUFZRyxRQUFaLEdBQXVCdkIsU0FBU29CLE1BQVQsQ0FBZ0JHLFFBQWhCLEdBQTJCLE9BQWxEO0FBQ0Q7QUFDRCxZQUFJRCxXQUFXLGlCQUFPRSxNQUFsQixJQUE0QkgsU0FBaEMsRUFBMkM7QUFDekNULGVBQUtRLE1BQUwsQ0FBWUssYUFBWixHQUE0QixxQ0FBT0osU0FBUCxDQUE1QjtBQUNEO0FBQ0Y7QUFDRCxVQUFJLGlCQUFFSyxJQUFGLENBQU8xQixTQUFTMkIsV0FBaEIsSUFBK0IsQ0FBbkMsRUFBc0M7QUFDcENmLGFBQUtnQixVQUFMLEdBQWtCNUIsU0FBUzJCLFdBQVQsQ0FBcUJsRSxHQUFyQixDQUF5QjtBQUFBLGlCQUFlO0FBQ3hEbUQsa0JBQU1pQixXQUFXakIsSUFEdUM7QUFFeERrQix1QkFBV0QsV0FBV0UsS0FBWCxDQUFpQnBCO0FBRjRCLFdBQWY7QUFBQSxTQUF6QixDQUFsQjtBQUlEO0FBQ0QsYUFBT0MsSUFBUDtBQUNEOzs7NEJBRU96RCxHLEVBQUs7QUFDWCxhQUFPLGlCQUFFTSxHQUFGLENBQU1OLElBQUlxRCxJQUFWLEVBQWdCO0FBQUEsZUFBWTtBQUNqQ3BELGdCQUFNNEUsUUFBUTVFLElBRG1CO0FBRWpDVSxnQkFBTWtFLFFBQVFqRSxRQUFSLENBQWlCRDtBQUZVLFNBQVo7QUFBQSxPQUFoQixDQUFQO0FBSUQ7Ozs7O2tCQW5Ka0JoQixhIiwiZmlsZSI6Impzb25fZm9ybWF0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLydcbmltcG9ydCBTdGF0dXMgZnJvbSAnLi4vc3RhdHVzJ1xuaW1wb3J0IHsgZm9ybWF0TG9jYXRpb24sIEdoZXJraW5Eb2N1bWVudFBhcnNlciwgUGlja2xlUGFyc2VyIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHsgYnVpbGRTdGVwQXJndW1lbnRJdGVyYXRvciB9IGZyb20gJy4uL3N0ZXBfYXJndW1lbnRzJ1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnYXNzZXJ0aW9uLWVycm9yLWZvcm1hdHRlcidcblxuY29uc3Qge1xuICBnZXRTdGVwTGluZVRvS2V5d29yZE1hcCxcbiAgZ2V0U2NlbmFyaW9MaW5lVG9EZXNjcmlwdGlvbk1hcCxcbn0gPSBHaGVya2luRG9jdW1lbnRQYXJzZXJcblxuY29uc3Qge1xuICBnZXRTY2VuYXJpb0Rlc2NyaXB0aW9uLFxuICBnZXRTdGVwTGluZVRvUGlja2xlZFN0ZXBNYXAsXG4gIGdldFN0ZXBLZXl3b3JkLFxufSA9IFBpY2tsZVBhcnNlclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKc29uRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgb3B0aW9ucy5ldmVudEJyb2FkY2FzdGVyLm9uKCd0ZXN0LXJ1bi1maW5pc2hlZCcsIDo6dGhpcy5vblRlc3RSdW5GaW5pc2hlZClcbiAgfVxuXG4gIGNvbnZlcnROYW1lVG9JZChvYmopIHtcbiAgICByZXR1cm4gb2JqLm5hbWUucmVwbGFjZSgvIC9nLCAnLScpLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZvcm1hdERhdGFUYWJsZShkYXRhVGFibGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcm93czogZGF0YVRhYmxlLnJvd3MubWFwKHJvdyA9PiAoeyBjZWxsczogXy5tYXAocm93LmNlbGxzLCAndmFsdWUnKSB9KSksXG4gICAgfVxuICB9XG5cbiAgZm9ybWF0RG9jU3RyaW5nKGRvY1N0cmluZykge1xuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50OiBkb2NTdHJpbmcuY29udGVudCxcbiAgICAgIGxpbmU6IGRvY1N0cmluZy5sb2NhdGlvbi5saW5lLFxuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFN0ZXBBcmd1bWVudHMoc3RlcEFyZ3VtZW50cykge1xuICAgIGNvbnN0IGl0ZXJhdG9yID0gYnVpbGRTdGVwQXJndW1lbnRJdGVyYXRvcih7XG4gICAgICBkYXRhVGFibGU6IHRoaXMuZm9ybWF0RGF0YVRhYmxlLmJpbmQodGhpcyksXG4gICAgICBkb2NTdHJpbmc6IHRoaXMuZm9ybWF0RG9jU3RyaW5nLmJpbmQodGhpcyksXG4gICAgfSlcbiAgICByZXR1cm4gXy5tYXAoc3RlcEFyZ3VtZW50cywgaXRlcmF0b3IpXG4gIH1cblxuICBvblRlc3RSdW5GaW5pc2hlZCgpIHtcbiAgICBjb25zdCBncm91cGVkVGVzdENhc2VzID0ge31cbiAgICBfLmVhY2godGhpcy5ldmVudERhdGFDb2xsZWN0b3IudGVzdENhc2VNYXAsIHRlc3RDYXNlID0+IHtcbiAgICAgIGNvbnN0IHsgc291cmNlTG9jYXRpb246IHsgdXJpIH0gfSA9IHRlc3RDYXNlXG4gICAgICBpZiAoIWdyb3VwZWRUZXN0Q2FzZXNbdXJpXSkge1xuICAgICAgICBncm91cGVkVGVzdENhc2VzW3VyaV0gPSBbXVxuICAgICAgfVxuICAgICAgZ3JvdXBlZFRlc3RDYXNlc1t1cmldLnB1c2godGVzdENhc2UpXG4gICAgfSlcbiAgICBjb25zdCBmZWF0dXJlcyA9IF8ubWFwKGdyb3VwZWRUZXN0Q2FzZXMsIChncm91cCwgdXJpKSA9PiB7XG4gICAgICBjb25zdCBnaGVya2luRG9jdW1lbnQgPSB0aGlzLmV2ZW50RGF0YUNvbGxlY3Rvci5naGVya2luRG9jdW1lbnRNYXBbdXJpXVxuICAgICAgY29uc3QgZmVhdHVyZURhdGEgPSB0aGlzLmdldEZlYXR1cmVEYXRhKGdoZXJraW5Eb2N1bWVudC5mZWF0dXJlLCB1cmkpXG4gICAgICBjb25zdCBzdGVwTGluZVRvS2V5d29yZE1hcCA9IGdldFN0ZXBMaW5lVG9LZXl3b3JkTWFwKGdoZXJraW5Eb2N1bWVudClcbiAgICAgIGNvbnN0IHNjZW5hcmlvTGluZVRvRGVzY3JpcHRpb25NYXAgPSBnZXRTY2VuYXJpb0xpbmVUb0Rlc2NyaXB0aW9uTWFwKFxuICAgICAgICBnaGVya2luRG9jdW1lbnRcbiAgICAgIClcbiAgICAgIGZlYXR1cmVEYXRhLmVsZW1lbnRzID0gZ3JvdXAubWFwKHRlc3RDYXNlID0+IHtcbiAgICAgICAgY29uc3QgeyBwaWNrbGUgfSA9IHRoaXMuZXZlbnREYXRhQ29sbGVjdG9yLmdldFRlc3RDYXNlRGF0YShcbiAgICAgICAgICB0ZXN0Q2FzZS5zb3VyY2VMb2NhdGlvblxuICAgICAgICApXG4gICAgICAgIGNvbnN0IHNjZW5hcmlvRGF0YSA9IHRoaXMuZ2V0U2NlbmFyaW9EYXRhKHtcbiAgICAgICAgICBmZWF0dXJlSWQ6IGZlYXR1cmVEYXRhLmlkLFxuICAgICAgICAgIHBpY2tsZSxcbiAgICAgICAgICBzY2VuYXJpb0xpbmVUb0Rlc2NyaXB0aW9uTWFwLFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBzdGVwTGluZVRvUGlja2xlZFN0ZXBNYXAgPSBnZXRTdGVwTGluZVRvUGlja2xlZFN0ZXBNYXAocGlja2xlKVxuICAgICAgICBsZXQgaXNCZWZvcmVIb29rID0gdHJ1ZVxuICAgICAgICBzY2VuYXJpb0RhdGEuc3RlcHMgPSB0ZXN0Q2FzZS5zdGVwcy5tYXAodGVzdFN0ZXAgPT4ge1xuICAgICAgICAgIGlzQmVmb3JlSG9vayA9IGlzQmVmb3JlSG9vayAmJiAhdGVzdFN0ZXAuc291cmNlTG9jYXRpb25cbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGVwRGF0YSh7XG4gICAgICAgICAgICBpc0JlZm9yZUhvb2ssXG4gICAgICAgICAgICBzdGVwTGluZVRvS2V5d29yZE1hcCxcbiAgICAgICAgICAgIHN0ZXBMaW5lVG9QaWNrbGVkU3RlcE1hcCxcbiAgICAgICAgICAgIHRlc3RTdGVwLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBzY2VuYXJpb0RhdGFcbiAgICAgIH0pXG4gICAgICByZXR1cm4gZmVhdHVyZURhdGFcbiAgICB9KVxuICAgIHRoaXMubG9nKEpTT04uc3RyaW5naWZ5KGZlYXR1cmVzLCBudWxsLCAyKSlcbiAgfVxuXG4gIGdldEZlYXR1cmVEYXRhKGZlYXR1cmUsIHVyaSkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNjcmlwdGlvbjogZmVhdHVyZS5kZXNjcmlwdGlvbixcbiAgICAgIGtleXdvcmQ6IGZlYXR1cmUua2V5d29yZCxcbiAgICAgIG5hbWU6IGZlYXR1cmUubmFtZSxcbiAgICAgIGxpbmU6IGZlYXR1cmUubG9jYXRpb24ubGluZSxcbiAgICAgIGlkOiB0aGlzLmNvbnZlcnROYW1lVG9JZChmZWF0dXJlKSxcbiAgICAgIHRhZ3M6IHRoaXMuZ2V0VGFncyhmZWF0dXJlKSxcbiAgICAgIHVyaSxcbiAgICB9XG4gIH1cblxuICBnZXRTY2VuYXJpb0RhdGEoeyBmZWF0dXJlSWQsIHBpY2tsZSwgc2NlbmFyaW9MaW5lVG9EZXNjcmlwdGlvbk1hcCB9KSB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBnZXRTY2VuYXJpb0Rlc2NyaXB0aW9uKHtcbiAgICAgIHBpY2tsZSxcbiAgICAgIHNjZW5hcmlvTGluZVRvRGVzY3JpcHRpb25NYXAsXG4gICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBpZDogYCR7ZmVhdHVyZUlkfTske3RoaXMuY29udmVydE5hbWVUb0lkKHBpY2tsZSl9YCxcbiAgICAgIGtleXdvcmQ6ICdTY2VuYXJpbycsXG4gICAgICBsaW5lOiBwaWNrbGUubG9jYXRpb25zWzBdLmxpbmUsXG4gICAgICBuYW1lOiBwaWNrbGUubmFtZSxcbiAgICAgIHRhZ3M6IHRoaXMuZ2V0VGFncyhwaWNrbGUpLFxuICAgICAgdHlwZTogJ3NjZW5hcmlvJyxcbiAgICB9XG4gIH1cblxuICBnZXRTdGVwRGF0YSh7XG4gICAgaXNCZWZvcmVIb29rLFxuICAgIHN0ZXBMaW5lVG9LZXl3b3JkTWFwLFxuICAgIHN0ZXBMaW5lVG9QaWNrbGVkU3RlcE1hcCxcbiAgICB0ZXN0U3RlcCxcbiAgfSkge1xuICAgIGNvbnN0IGRhdGEgPSB7fVxuICAgIGlmICh0ZXN0U3RlcC5zb3VyY2VMb2NhdGlvbikge1xuICAgICAgY29uc3QgeyBsaW5lIH0gPSB0ZXN0U3RlcC5zb3VyY2VMb2NhdGlvblxuICAgICAgY29uc3QgcGlja2xlU3RlcCA9IHN0ZXBMaW5lVG9QaWNrbGVkU3RlcE1hcFtsaW5lXVxuICAgICAgZGF0YS5hcmd1bWVudHMgPSB0aGlzLmZvcm1hdFN0ZXBBcmd1bWVudHMocGlja2xlU3RlcC5hcmd1bWVudHMpXG4gICAgICBkYXRhLmtleXdvcmQgPSBnZXRTdGVwS2V5d29yZCh7IHBpY2tsZVN0ZXAsIHN0ZXBMaW5lVG9LZXl3b3JkTWFwIH0pXG4gICAgICBkYXRhLmxpbmUgPSBsaW5lXG4gICAgICBkYXRhLm5hbWUgPSBwaWNrbGVTdGVwLnRleHRcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5rZXl3b3JkID0gaXNCZWZvcmVIb29rID8gJ0JlZm9yZScgOiAnQWZ0ZXInXG4gICAgICBkYXRhLmhpZGRlbiA9IHRydWVcbiAgICB9XG4gICAgaWYgKHRlc3RTdGVwLmFjdGlvbkxvY2F0aW9uKSB7XG4gICAgICBkYXRhLm1hdGNoID0geyBsb2NhdGlvbjogZm9ybWF0TG9jYXRpb24odGVzdFN0ZXAuYWN0aW9uTG9jYXRpb24pIH1cbiAgICB9XG4gICAgaWYgKHRlc3RTdGVwLnJlc3VsdCkge1xuICAgICAgY29uc3QgeyByZXN1bHQ6IHsgZXhjZXB0aW9uLCBzdGF0dXMgfSB9ID0gdGVzdFN0ZXBcbiAgICAgIGRhdGEucmVzdWx0ID0geyBzdGF0dXMgfVxuICAgICAgaWYgKHRlc3RTdGVwLnJlc3VsdC5kdXJhdGlvbikge1xuICAgICAgICBkYXRhLnJlc3VsdC5kdXJhdGlvbiA9IHRlc3RTdGVwLnJlc3VsdC5kdXJhdGlvbiAqIDEwMDAwMDBcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0dXMgPT09IFN0YXR1cy5GQUlMRUQgJiYgZXhjZXB0aW9uKSB7XG4gICAgICAgIGRhdGEucmVzdWx0LmVycm9yX21lc3NhZ2UgPSBmb3JtYXQoZXhjZXB0aW9uKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoXy5zaXplKHRlc3RTdGVwLmF0dGFjaG1lbnRzKSA+IDApIHtcbiAgICAgIGRhdGEuZW1iZWRkaW5ncyA9IHRlc3RTdGVwLmF0dGFjaG1lbnRzLm1hcChhdHRhY2htZW50ID0+ICh7XG4gICAgICAgIGRhdGE6IGF0dGFjaG1lbnQuZGF0YSxcbiAgICAgICAgbWltZV90eXBlOiBhdHRhY2htZW50Lm1lZGlhLnR5cGUsXG4gICAgICB9KSlcbiAgICB9XG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIGdldFRhZ3Mob2JqKSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iai50YWdzLCB0YWdEYXRhID0+ICh7XG4gICAgICBuYW1lOiB0YWdEYXRhLm5hbWUsXG4gICAgICBsaW5lOiB0YWdEYXRhLmxvY2F0aW9uLmxpbmUsXG4gICAgfSkpXG4gIH1cbn1cbiJdfQ==