'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _CHARACTERS, _IS_ISSUE;

exports.isIssue = isIssue;
exports.formatIssue = formatIssue;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _location_helpers = require('./location_helpers');

var _step_result_helpers = require('./step_result_helpers');

var _indentString = require('indent-string');

var _indentString2 = _interopRequireDefault(_indentString);

var _status = require('../../status');

var _status2 = _interopRequireDefault(_status);

var _figures = require('figures');

var _figures2 = _interopRequireDefault(_figures);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _keyword_type = require('./keyword_type');

var _keyword_type2 = _interopRequireDefault(_keyword_type);

var _step_arguments = require('../../step_arguments');

var _gherkin_document_parser = require('./gherkin_document_parser');

var _pickle_parser = require('./pickle_parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHARACTERS = (_CHARACTERS = {}, (0, _defineProperty3.default)(_CHARACTERS, _status2.default.AMBIGUOUS, _figures2.default.cross), (0, _defineProperty3.default)(_CHARACTERS, _status2.default.FAILED, _figures2.default.cross), (0, _defineProperty3.default)(_CHARACTERS, _status2.default.PASSED, _figures2.default.tick), (0, _defineProperty3.default)(_CHARACTERS, _status2.default.PENDING, '?'), (0, _defineProperty3.default)(_CHARACTERS, _status2.default.SKIPPED, '-'), (0, _defineProperty3.default)(_CHARACTERS, _status2.default.UNDEFINED, '?'), _CHARACTERS);

var IS_ISSUE = (_IS_ISSUE = {}, (0, _defineProperty3.default)(_IS_ISSUE, _status2.default.AMBIGUOUS, true), (0, _defineProperty3.default)(_IS_ISSUE, _status2.default.FAILED, true), (0, _defineProperty3.default)(_IS_ISSUE, _status2.default.PASSED, false), (0, _defineProperty3.default)(_IS_ISSUE, _status2.default.PENDING, true), (0, _defineProperty3.default)(_IS_ISSUE, _status2.default.SKIPPED, false), (0, _defineProperty3.default)(_IS_ISSUE, _status2.default.UNDEFINED, true), _IS_ISSUE);

function formatDataTable(arg) {
  var rows = arg.rows.map(function (row) {
    return row.cells.map(function (cell) {
      return cell.value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n');
    });
  });
  var table = new _cliTable2.default({
    chars: {
      bottom: '',
      'bottom-left': '',
      'bottom-mid': '',
      'bottom-right': '',
      left: '|',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      middle: '|',
      right: '|',
      'right-mid': '',
      top: '',
      'top-left': '',
      'top-mid': '',
      'top-right': ''
    },
    style: {
      border: [],
      'padding-left': 1,
      'padding-right': 1
    }
  });
  table.push.apply(table, (0, _toConsumableArray3.default)(rows));
  return table.toString();
}

function formatDocString(arg) {
  return '"""\n' + arg.content + '\n"""';
}

function formatStep(_ref) {
  var colorFns = _ref.colorFns,
      isBeforeHook = _ref.isBeforeHook,
      keyword = _ref.keyword,
      keywordType = _ref.keywordType,
      pickleStep = _ref.pickleStep,
      snippetBuilder = _ref.snippetBuilder,
      testStep = _ref.testStep;
  var status = testStep.result.status;

  var colorFn = colorFns[status];

  var identifier = void 0;
  if (testStep.sourceLocation) {
    identifier = keyword + (pickleStep.text || '');
  } else {
    identifier = isBeforeHook ? 'Before' : 'After';
  }

  var text = colorFn(CHARACTERS[status] + ' ' + identifier);

  var actionLocation = testStep.actionLocation;

  if (actionLocation) {
    text += ' # ' + colorFns.location((0, _location_helpers.formatLocation)(actionLocation));
  }
  text += '\n';

  if (pickleStep) {
    var str = void 0;
    var iterator = (0, _step_arguments.buildStepArgumentIterator)({
      dataTable: function dataTable(arg) {
        return str = formatDataTable(arg);
      },
      docString: function docString(arg) {
        return str = formatDocString(arg);
      }
    });
    _lodash2.default.each(pickleStep.arguments, iterator);
    if (str) {
      text += (0, _indentString2.default)(colorFn(str) + '\n', 4);
    }
  }

  if (testStep.attachments) {
    testStep.attachments.forEach(function (_ref2) {
      var media = _ref2.media,
          data = _ref2.data;

      var message = media.type === 'text/plain' ? ': ' + data : '';
      text += (0, _indentString2.default)('Attachment (' + media.type + ')' + message + '\n', 4);
    });
  }

  var message = (0, _step_result_helpers.getStepMessage)({
    colorFns: colorFns,
    keywordType: keywordType,
    pickleStep: pickleStep,
    snippetBuilder: snippetBuilder,
    testStep: testStep
  });
  if (message) {
    text += (0, _indentString2.default)(message, 4) + '\n';
  }
  return text;
}

function isIssue(status) {
  return IS_ISSUE[status];
}

function formatIssue(_ref3) {
  var colorFns = _ref3.colorFns,
      gherkinDocument = _ref3.gherkinDocument,
      number = _ref3.number,
      pickle = _ref3.pickle,
      snippetBuilder = _ref3.snippetBuilder,
      testCase = _ref3.testCase;

  var prefix = number + ') ';
  var text = prefix;
  var scenarioLocation = (0, _location_helpers.formatLocation)(testCase.sourceLocation);
  text += 'Scenario: ' + pickle.name + ' # ' + colorFns.location(scenarioLocation) + '\n';
  var stepLineToKeywordMap = (0, _gherkin_document_parser.getStepLineToKeywordMap)(gherkinDocument);
  var stepLineToPickledStepMap = (0, _pickle_parser.getStepLineToPickledStepMap)(pickle);
  var isBeforeHook = true;
  var previousKeywordType = _keyword_type2.default.PRECONDITION;
  _lodash2.default.each(testCase.steps, function (testStep) {
    isBeforeHook = isBeforeHook && !testStep.sourceLocation;
    var keyword = void 0,
        keywordType = void 0,
        pickleStep = void 0;
    if (testStep.sourceLocation) {
      pickleStep = stepLineToPickledStepMap[testStep.sourceLocation.line];
      keyword = (0, _pickle_parser.getStepKeyword)({ pickleStep: pickleStep, stepLineToKeywordMap: stepLineToKeywordMap });
      keywordType = (0, _keyword_type.getStepKeywordType)({
        keyword: keyword,
        language: gherkinDocument.feature.language,
        previousKeywordType: previousKeywordType
      });
    }
    var formattedStep = formatStep({
      colorFns: colorFns,
      isBeforeHook: isBeforeHook,
      keyword: keyword,
      keywordType: keywordType,
      pickleStep: pickleStep,
      snippetBuilder: snippetBuilder,
      testStep: testStep
    });
    text += (0, _indentString2.default)(formattedStep, prefix.length);
    previousKeywordType = keywordType;
  });
  return text + '\n';
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtYXR0ZXIvaGVscGVycy9pc3N1ZV9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImlzSXNzdWUiLCJmb3JtYXRJc3N1ZSIsIkNIQVJBQ1RFUlMiLCJBTUJJR1VPVVMiLCJjcm9zcyIsIkZBSUxFRCIsIlBBU1NFRCIsInRpY2siLCJQRU5ESU5HIiwiU0tJUFBFRCIsIlVOREVGSU5FRCIsIklTX0lTU1VFIiwiZm9ybWF0RGF0YVRhYmxlIiwiYXJnIiwicm93cyIsIm1hcCIsInJvdyIsImNlbGxzIiwiY2VsbCIsInZhbHVlIiwicmVwbGFjZSIsInRhYmxlIiwiY2hhcnMiLCJib3R0b20iLCJsZWZ0IiwibWlkIiwibWlkZGxlIiwicmlnaHQiLCJ0b3AiLCJzdHlsZSIsImJvcmRlciIsInB1c2giLCJ0b1N0cmluZyIsImZvcm1hdERvY1N0cmluZyIsImNvbnRlbnQiLCJmb3JtYXRTdGVwIiwiY29sb3JGbnMiLCJpc0JlZm9yZUhvb2siLCJrZXl3b3JkIiwia2V5d29yZFR5cGUiLCJwaWNrbGVTdGVwIiwic25pcHBldEJ1aWxkZXIiLCJ0ZXN0U3RlcCIsInN0YXR1cyIsInJlc3VsdCIsImNvbG9yRm4iLCJpZGVudGlmaWVyIiwic291cmNlTG9jYXRpb24iLCJ0ZXh0IiwiYWN0aW9uTG9jYXRpb24iLCJsb2NhdGlvbiIsInN0ciIsIml0ZXJhdG9yIiwiZGF0YVRhYmxlIiwiZG9jU3RyaW5nIiwiZWFjaCIsImFyZ3VtZW50cyIsImF0dGFjaG1lbnRzIiwiZm9yRWFjaCIsIm1lZGlhIiwiZGF0YSIsIm1lc3NhZ2UiLCJ0eXBlIiwiZ2hlcmtpbkRvY3VtZW50IiwibnVtYmVyIiwicGlja2xlIiwidGVzdENhc2UiLCJwcmVmaXgiLCJzY2VuYXJpb0xvY2F0aW9uIiwibmFtZSIsInN0ZXBMaW5lVG9LZXl3b3JkTWFwIiwic3RlcExpbmVUb1BpY2tsZWRTdGVwTWFwIiwicHJldmlvdXNLZXl3b3JkVHlwZSIsIlBSRUNPTkRJVElPTiIsInN0ZXBzIiwi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ZixDQUFWO0FBQ0EvQixvQkFBYyxzQ0FBbUI7QUFDL0JELHdCQUQrQjtBQUUvQnNDLGtCQUFVYixnQkFBZ0JjLE9BQWhCLENBQXdCRCxRQUZIO0FBRy9CSjtBQUgrQixPQUFuQixDQUFkO0FBS0Q7QUFDRCxRQUFNTSxnQkFBZ0IzQyxXQUFXO0FBQy9CQyx3QkFEK0I7QUFFL0JDLGdDQUYrQjtBQUcvQkMsc0JBSCtCO0FBSS9CQyw4QkFKK0I7QUFLL0JDLDRCQUwrQjtBQU0vQkMsb0NBTitCO0FBTy9CQztBQVArQixLQUFYLENBQXRCO0FBU0FNLFlBQVEsNEJBQWE4QixhQUFiLEVBQTRCWCxPQUFPWSxNQUFuQyxDQUFSO0FBQ0FQLDBCQUFzQmpDLFdBQXRCO0FBQ0QsR0F2QkQ7QUF3QkEsU0FBVVMsSUFBVjtBQUNEIiwiZmlsZSI6Imlzc3VlX2hlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBmb3JtYXRMb2NhdGlvbiB9IGZyb20gJy4vbG9jYXRpb25faGVscGVycydcbmltcG9ydCB7IGdldFN0ZXBNZXNzYWdlIH0gZnJvbSAnLi9zdGVwX3Jlc3VsdF9oZWxwZXJzJ1xuaW1wb3J0IGluZGVudFN0cmluZyBmcm9tICdpbmRlbnQtc3RyaW5nJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuLi8uLi9zdGF0dXMnXG5pbXBvcnQgZmlndXJlcyBmcm9tICdmaWd1cmVzJ1xuaW1wb3J0IFRhYmxlIGZyb20gJ2NsaS10YWJsZSdcbmltcG9ydCBLZXl3b3JkVHlwZSwgeyBnZXRTdGVwS2V5d29yZFR5cGUgfSBmcm9tICcuL2tleXdvcmRfdHlwZSdcbmltcG9ydCB7IGJ1aWxkU3RlcEFyZ3VtZW50SXRlcmF0b3IgfSBmcm9tICcuLi8uLi9zdGVwX2FyZ3VtZW50cydcbmltcG9ydCB7IGdldFN0ZXBMaW5lVG9LZXl3b3JkTWFwIH0gZnJvbSAnLi9naGVya2luX2RvY3VtZW50X3BhcnNlcidcbmltcG9ydCB7IGdldFN0ZXBMaW5lVG9QaWNrbGVkU3RlcE1hcCwgZ2V0U3RlcEtleXdvcmQgfSBmcm9tICcuL3BpY2tsZV9wYXJzZXInXG5cbmNvbnN0IENIQVJBQ1RFUlMgPSB7XG4gIFtTdGF0dXMuQU1CSUdVT1VTXTogZmlndXJlcy5jcm9zcyxcbiAgW1N0YXR1cy5GQUlMRURdOiBmaWd1cmVzLmNyb3NzLFxuICBbU3RhdHVzLlBBU1NFRF06IGZpZ3VyZXMudGljayxcbiAgW1N0YXR1cy5QRU5ESU5HXTogJz8nLFxuICBbU3RhdHVzLlNLSVBQRURdOiAnLScsXG4gIFtTdGF0dXMuVU5ERUZJTkVEXTogJz8nLFxufVxuXG5jb25zdCBJU19JU1NVRSA9IHtcbiAgW1N0YXR1cy5BTUJJR1VPVVNdOiB0cnVlLFxuICBbU3RhdHVzLkZBSUxFRF06IHRydWUsXG4gIFtTdGF0dXMuUEFTU0VEXTogZmFsc2UsXG4gIFtTdGF0dXMuUEVORElOR106IHRydWUsXG4gIFtTdGF0dXMuU0tJUFBFRF06IGZhbHNlLFxuICBbU3RhdHVzLlVOREVGSU5FRF06IHRydWUsXG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGFUYWJsZShhcmcpIHtcbiAgY29uc3Qgcm93cyA9IGFyZy5yb3dzLm1hcChyb3cgPT5cbiAgICByb3cuY2VsbHMubWFwKGNlbGwgPT5cbiAgICAgIGNlbGwudmFsdWUucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJylcbiAgICApXG4gIClcbiAgY29uc3QgdGFibGUgPSBuZXcgVGFibGUoe1xuICAgIGNoYXJzOiB7XG4gICAgICBib3R0b206ICcnLFxuICAgICAgJ2JvdHRvbS1sZWZ0JzogJycsXG4gICAgICAnYm90dG9tLW1pZCc6ICcnLFxuICAgICAgJ2JvdHRvbS1yaWdodCc6ICcnLFxuICAgICAgbGVmdDogJ3wnLFxuICAgICAgJ2xlZnQtbWlkJzogJycsXG4gICAgICBtaWQ6ICcnLFxuICAgICAgJ21pZC1taWQnOiAnJyxcbiAgICAgIG1pZGRsZTogJ3wnLFxuICAgICAgcmlnaHQ6ICd8JyxcbiAgICAgICdyaWdodC1taWQnOiAnJyxcbiAgICAgIHRvcDogJycsXG4gICAgICAndG9wLWxlZnQnOiAnJyxcbiAgICAgICd0b3AtbWlkJzogJycsXG4gICAgICAndG9wLXJpZ2h0JzogJycsXG4gICAgfSxcbiAgICBzdHlsZToge1xuICAgICAgYm9yZGVyOiBbXSxcbiAgICAgICdwYWRkaW5nLWxlZnQnOiAxLFxuICAgICAgJ3BhZGRpbmctcmlnaHQnOiAxLFxuICAgIH0sXG4gIH0pXG4gIHRhYmxlLnB1c2goLi4ucm93cylcbiAgcmV0dXJuIHRhYmxlLnRvU3RyaW5nKClcbn1cblxuZnVuY3Rpb24gZm9ybWF0RG9jU3RyaW5nKGFyZykge1xuICByZXR1cm4gYFwiXCJcIlxcbiR7YXJnLmNvbnRlbnR9XFxuXCJcIlwiYFxufVxuXG5mdW5jdGlvbiBmb3JtYXRTdGVwKHtcbiAgY29sb3JGbnMsXG4gIGlzQmVmb3JlSG9vayxcbiAga2V5d29yZCxcbiAga2V5d29yZFR5cGUsXG4gIHBpY2tsZVN0ZXAsXG4gIHNuaXBwZXRCdWlsZGVyLFxuICB0ZXN0U3RlcCxcbn0pIHtcbiAgY29uc3QgeyBzdGF0dXMgfSA9IHRlc3RTdGVwLnJlc3VsdFxuICBjb25zdCBjb2xvckZuID0gY29sb3JGbnNbc3RhdHVzXVxuXG4gIGxldCBpZGVudGlmaWVyXG4gIGlmICh0ZXN0U3RlcC5zb3VyY2VMb2NhdGlvbikge1xuICAgIGlkZW50aWZpZXIgPSBrZXl3b3JkICsgKHBpY2tsZVN0ZXAudGV4dCB8fCAnJylcbiAgfSBlbHNlIHtcbiAgICBpZGVudGlmaWVyID0gaXNCZWZvcmVIb29rID8gJ0JlZm9yZScgOiAnQWZ0ZXInXG4gIH1cblxuICBsZXQgdGV4dCA9IGNvbG9yRm4oYCR7Q0hBUkFDVEVSU1tzdGF0dXNdfSAke2lkZW50aWZpZXJ9YClcblxuICBjb25zdCB7IGFjdGlvbkxvY2F0aW9uIH0gPSB0ZXN0U3RlcFxuICBpZiAoYWN0aW9uTG9jYXRpb24pIHtcbiAgICB0ZXh0ICs9IGAgIyAke2NvbG9yRm5zLmxvY2F0aW9uKGZvcm1hdExvY2F0aW9uKGFjdGlvbkxvY2F0aW9uKSl9YFxuICB9XG4gIHRleHQgKz0gJ1xcbidcblxuICBpZiAocGlja2xlU3RlcCkge1xuICAgIGxldCBzdHJcbiAgICBjb25zdCBpdGVyYXRvciA9IGJ1aWxkU3RlcEFyZ3VtZW50SXRlcmF0b3Ioe1xuICAgICAgZGF0YVRhYmxlOiBhcmcgPT4gKHN0ciA9IGZvcm1hdERhdGFUYWJsZShhcmcpKSxcbiAgICAgIGRvY1N0cmluZzogYXJnID0+IChzdHIgPSBmb3JtYXREb2NTdHJpbmcoYXJnKSksXG4gICAgfSlcbiAgICBfLmVhY2gocGlja2xlU3RlcC5hcmd1bWVudHMsIGl0ZXJhdG9yKVxuICAgIGlmIChzdHIpIHtcbiAgICAgIHRleHQgKz0gaW5kZW50U3RyaW5nKGAke2NvbG9yRm4oc3RyKX1cXG5gLCA0KVxuICAgIH1cbiAgfVxuXG4gIGlmICh0ZXN0U3RlcC5hdHRhY2htZW50cykge1xuICAgIHRlc3RTdGVwLmF0dGFjaG1lbnRzLmZvckVhY2goKHsgbWVkaWEsIGRhdGEgfSkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IG1lZGlhLnR5cGUgPT09ICd0ZXh0L3BsYWluJyA/IGA6ICR7ZGF0YX1gIDogJydcbiAgICAgIHRleHQgKz0gaW5kZW50U3RyaW5nKGBBdHRhY2htZW50ICgke21lZGlhLnR5cGV9KSR7bWVzc2FnZX1cXG5gLCA0KVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBtZXNzYWdlID0gZ2V0U3RlcE1lc3NhZ2Uoe1xuICAgIGNvbG9yRm5zLFxuICAgIGtleXdvcmRUeXBlLFxuICAgIHBpY2tsZVN0ZXAsXG4gICAgc25pcHBldEJ1aWxkZXIsXG4gICAgdGVzdFN0ZXAsXG4gIH0pXG4gIGlmIChtZXNzYWdlKSB7XG4gICAgdGV4dCArPSBgJHtpbmRlbnRTdHJpbmcobWVzc2FnZSwgNCl9XFxuYFxuICB9XG4gIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0lzc3VlKHN0YXR1cykge1xuICByZXR1cm4gSVNfSVNTVUVbc3RhdHVzXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0SXNzdWUoe1xuICBjb2xvckZucyxcbiAgZ2hlcmtpbkRvY3VtZW50LFxuICBudW1iZXIsXG4gIHBpY2tsZSxcbiAgc25pcHBldEJ1aWxkZXIsXG4gIHRlc3RDYXNlLFxufSkge1xuICBjb25zdCBwcmVmaXggPSBgJHtudW1iZXJ9KSBgXG4gIGxldCB0ZXh0ID0gcHJlZml4XG4gIGNvbnN0IHNjZW5hcmlvTG9jYXRpb24gPSBmb3JtYXRMb2NhdGlvbih0ZXN0Q2FzZS5zb3VyY2VMb2NhdGlvbilcbiAgdGV4dCArPSBgU2NlbmFyaW86ICR7cGlja2xlLm5hbWV9ICMgJHtjb2xvckZucy5sb2NhdGlvbihzY2VuYXJpb0xvY2F0aW9uKX1cXG5gXG4gIGNvbnN0IHN0ZXBMaW5lVG9LZXl3b3JkTWFwID0gZ2V0U3RlcExpbmVUb0tleXdvcmRNYXAoZ2hlcmtpbkRvY3VtZW50KVxuICBjb25zdCBzdGVwTGluZVRvUGlja2xlZFN0ZXBNYXAgPSBnZXRTdGVwTGluZVRvUGlja2xlZFN0ZXBNYXAocGlja2xlKVxuICBsZXQgaXNCZWZvcmVIb29rID0gdHJ1ZVxuICBsZXQgcHJldmlvdXNLZXl3b3JkVHlwZSA9IEtleXdvcmRUeXBlLlBSRUNPTkRJVElPTlxuICBfLmVhY2godGVzdENhc2Uuc3RlcHMsIHRlc3RTdGVwID0+IHtcbiAgICBpc0JlZm9yZUhvb2sgPSBpc0JlZm9yZUhvb2sgJiYgIXRlc3RTdGVwLnNvdXJjZUxvY2F0aW9uXG4gICAgbGV0IGtleXdvcmQsIGtleXdvcmRUeXBlLCBwaWNrbGVTdGVwXG4gICAgaWYgKHRlc3RTdGVwLnNvdXJjZUxvY2F0aW9uKSB7XG4gICAgICBwaWNrbGVTdGVwID0gc3RlcExpbmVUb1BpY2tsZWRTdGVwTWFwW3Rlc3RTdGVwLnNvdXJjZUxvY2F0aW9uLmxpbmVdXG4gICAgICBrZXl3b3JkID0gZ2V0U3RlcEtleXdvcmQoeyBwaWNrbGVTdGVwLCBzdGVwTGluZVRvS2V5d29yZE1hcCB9KVxuICAgICAga2V5d29yZFR5cGUgPSBnZXRTdGVwS2V5d29yZFR5cGUoe1xuICAgICAgICBrZXl3b3JkLFxuICAgICAgICBsYW5ndWFnZTogZ2hlcmtpbkRvY3VtZW50LmZlYXR1cmUubGFuZ3VhZ2UsXG4gICAgICAgIHByZXZpb3VzS2V5d29yZFR5cGUsXG4gICAgICB9KVxuICAgIH1cbiAgICBjb25zdCBmb3JtYXR0ZWRTdGVwID0gZm9ybWF0U3RlcCh7XG4gICAgICBjb2xvckZucyxcbiAgICAgIGlzQmVmb3JlSG9vayxcbiAgICAgIGtleXdvcmQsXG4gICAgICBrZXl3b3JkVHlwZSxcbiAgICAgIHBpY2tsZVN0ZXAsXG4gICAgICBzbmlwcGV0QnVpbGRlcixcbiAgICAgIHRlc3RTdGVwLFxuICAgIH0pXG4gICAgdGV4dCArPSBpbmRlbnRTdHJpbmcoZm9ybWF0dGVkU3RlcCwgcHJlZml4Lmxlbmd0aClcbiAgICBwcmV2aW91c0tleXdvcmRUeXBlID0ga2V5d29yZFR5cGVcbiAgfSlcbiAgcmV0dXJuIGAke3RleHR9XFxuYFxufVxuIl19