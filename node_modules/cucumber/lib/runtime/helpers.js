'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getAmbiguousStepException = getAmbiguousStepException;

var _location_helpers = require('../formatter/helpers/location_helpers');

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _indentString = require('indent-string');

var _indentString2 = _interopRequireDefault(_indentString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAmbiguousStepException(stepDefinitions) {
  var table = new _cliTable2.default({
    chars: {
      bottom: '',
      'bottom-left': '',
      'bottom-mid': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      middle: ' - ',
      right: '',
      'right-mid': '',
      top: '',
      'top-left': '',
      'top-mid': '',
      'top-right': ''
    },
    style: {
      border: [],
      'padding-left': 0,
      'padding-right': 0
    }
  });
  table.push.apply(table, (0, _toConsumableArray3.default)(stepDefinitions.map(function (stepDefinition) {
    var pattern = stepDefinition.pattern.toString();
    return [pattern, (0, _location_helpers.formatLocation)(stepDefinition)];
  })));
  return '' + ('Multiple step definitions match:' + '\n') + (0, _indentString2.default)(table.toString(), 2);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydW50aW1lL2hlbHBlcnMuanMiXSwibmFtZXMiOlsiZ2V0QW1iaWd1b3VzU3RlcEV4Y2VwdGlvbiIsInN0ZXBEZWZpbml0aW9ucyIsInRhYmxlIiwiY2hhcnMiLCJib3R0b20iLCJsZWZ0IiwibWlkIiwibWlkZGxlIiwicmlnaHQiLCJ0b3AiLCJzdHlsZSIsImJvcmRlciIsInB1c2giLCJtYXAiLCJwYXR0ZXJuIiwic3RlcERlZmluaXRpb24iLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztRQUlnQkEseUIsR0FBQUEseUI7O0FBSmhCOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLFNBQVNBLHlCQUFULENBQW1DQyxlQUFuQyxFQUFvRDtBQUN6RCxNQUFNQyxRQUFRLHVCQUFVO0FBQ3RCQyxXQUFPO0FBQ0xDLGNBQVEsRUFESDtBQUVMLHFCQUFlLEVBRlY7QUFHTCxvQkFBYyxFQUhUO0FBSUwsc0JBQWdCLEVBSlg7QUFLTEMsWUFBTSxFQUxEO0FBTUwsa0JBQVksRUFOUDtBQU9MQyxXQUFLLEVBUEE7QUFRTCxpQkFBVyxFQVJOO0FBU0xDLGNBQVEsS0FUSDtBQVVMQyxhQUFPLEVBVkY7QUFXTCxtQkFBYSxFQVhSO0FBWUxDLFdBQUssRUFaQTtBQWFMLGtCQUFZLEVBYlA7QUFjTCxpQkFBVyxFQWROO0FBZUwsbUJBQWE7QUFmUixLQURlO0FBa0J0QkMsV0FBTztBQUNMQyxjQUFRLEVBREg7QUFFTCxzQkFBZ0IsQ0FGWDtBQUdMLHVCQUFpQjtBQUhaO0FBbEJlLEdBQVYsQ0FBZDtBQXdCQVQsUUFBTVUsSUFBTiwrQ0FDS1gsZ0JBQWdCWSxHQUFoQixDQUFvQiwwQkFBa0I7QUFDdkMsUUFBTUMsVUFBVUMsZUFBZUQsT0FBZixDQUF1QkUsUUFBdkIsRUFBaEI7QUFDQSxXQUFPLENBQUNGLE9BQUQsRUFBVSxzQ0FBZUMsY0FBZixDQUFWLENBQVA7QUFDRCxHQUhFLENBREw7QUFNQSxlQUFVLHFDQUFxQyxJQUEvQyxJQUFzRCw0QkFDcERiLE1BQU1jLFFBQU4sRUFEb0QsRUFFcEQsQ0FGb0QsQ0FBdEQ7QUFJRCIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9ybWF0TG9jYXRpb24gfSBmcm9tICcuLi9mb3JtYXR0ZXIvaGVscGVycy9sb2NhdGlvbl9oZWxwZXJzJ1xuaW1wb3J0IFRhYmxlIGZyb20gJ2NsaS10YWJsZSdcbmltcG9ydCBpbmRlbnRTdHJpbmcgZnJvbSAnaW5kZW50LXN0cmluZydcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFtYmlndW91c1N0ZXBFeGNlcHRpb24oc3RlcERlZmluaXRpb25zKSB7XG4gIGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlKHtcbiAgICBjaGFyczoge1xuICAgICAgYm90dG9tOiAnJyxcbiAgICAgICdib3R0b20tbGVmdCc6ICcnLFxuICAgICAgJ2JvdHRvbS1taWQnOiAnJyxcbiAgICAgICdib3R0b20tcmlnaHQnOiAnJyxcbiAgICAgIGxlZnQ6ICcnLFxuICAgICAgJ2xlZnQtbWlkJzogJycsXG4gICAgICBtaWQ6ICcnLFxuICAgICAgJ21pZC1taWQnOiAnJyxcbiAgICAgIG1pZGRsZTogJyAtICcsXG4gICAgICByaWdodDogJycsXG4gICAgICAncmlnaHQtbWlkJzogJycsXG4gICAgICB0b3A6ICcnLFxuICAgICAgJ3RvcC1sZWZ0JzogJycsXG4gICAgICAndG9wLW1pZCc6ICcnLFxuICAgICAgJ3RvcC1yaWdodCc6ICcnLFxuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGJvcmRlcjogW10sXG4gICAgICAncGFkZGluZy1sZWZ0JzogMCxcbiAgICAgICdwYWRkaW5nLXJpZ2h0JzogMCxcbiAgICB9LFxuICB9KVxuICB0YWJsZS5wdXNoKFxuICAgIC4uLnN0ZXBEZWZpbml0aW9ucy5tYXAoc3RlcERlZmluaXRpb24gPT4ge1xuICAgICAgY29uc3QgcGF0dGVybiA9IHN0ZXBEZWZpbml0aW9uLnBhdHRlcm4udG9TdHJpbmcoKVxuICAgICAgcmV0dXJuIFtwYXR0ZXJuLCBmb3JtYXRMb2NhdGlvbihzdGVwRGVmaW5pdGlvbildXG4gICAgfSlcbiAgKVxuICByZXR1cm4gYCR7J011bHRpcGxlIHN0ZXAgZGVmaW5pdGlvbnMgbWF0Y2g6JyArICdcXG4nfSR7aW5kZW50U3RyaW5nKFxuICAgIHRhYmxlLnRvU3RyaW5nKCksXG4gICAgMlxuICApfWBcbn1cbiJdfQ==