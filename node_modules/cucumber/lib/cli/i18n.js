'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getLanguages = getLanguages;
exports.getKeywords = getKeywords;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gherkin = require('gherkin');

var _gherkin2 = _interopRequireDefault(_gherkin);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _titleCase = require('title-case');

var _titleCase2 = _interopRequireDefault(_titleCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keywords = ['feature', 'background', 'scenario', 'scenarioOutline', 'examples', 'given', 'when', 'then', 'and', 'but'];

function getAsTable(header, rows) {
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
      middle: ' | ',
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
  table.push(header);
  table.push.apply(table, (0, _toConsumableArray3.default)(rows));
  return table.toString();
}

function getLanguages() {
  var rows = _lodash2.default.map(_gherkin2.default.DIALECTS, function (data, isoCode) {
    return [isoCode, data.name, data.native];
  });
  return getAsTable(['ISO 639-1', 'ENGLISH NAME', 'NATIVE NAME'], rows);
}

function getKeywords(isoCode) {
  var language = _gherkin2.default.DIALECTS[isoCode];
  var rows = _lodash2.default.map(keywords, function (keyword) {
    var words = _lodash2.default.map(language[keyword], function (s) {
      return '"' + s + '"';
    }).join(', ');
    return [(0, _titleCase2.default)(keyword), words];
  });
  return getAsTable(['ENGLISH KEYWORD', 'NATIVE KEYWORDS'], rows);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaTE4bi5qcyJdLCJuYW1lcyI6WyJnZXRMYW5ndWFnZXMiLCJnZXRLZXl3b3JkcyIsImtleXdvcmRzIiwiZ2V0QXNUYWJsZSIsImhlYWRlciIsInJvd3MiLCJ0YWJsZSIsImNoYXJzIiwiYm90dG9tIiwibGVmdCIsIm1pZCIsIm1pZGRsZSIsInJpZ2h0IiwidG9wIiwic3R5bGUiLCJib3JkZXIiLCJwdXNoIiwidG9TdHJpbmciLCJtYXAiLCJESUFMRUNUUyIsImRhdGEiLCJpc29Db2RlIiwibmFtZSIsIm5hdGl2ZSIsImxhbmd1YWdlIiwid29yZHMiLCJrZXl3b3JkIiwicyIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7UUFnRGdCQSxZLEdBQUFBLFk7UUFTQUMsVyxHQUFBQSxXOztBQXpEaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1DLFdBQVcsQ0FDZixTQURlLEVBRWYsWUFGZSxFQUdmLFVBSGUsRUFJZixpQkFKZSxFQUtmLFVBTGUsRUFNZixPQU5lLEVBT2YsTUFQZSxFQVFmLE1BUmUsRUFTZixLQVRlLEVBVWYsS0FWZSxDQUFqQjs7QUFhQSxTQUFTQyxVQUFULENBQW9CQyxNQUFwQixFQUE0QkMsSUFBNUIsRUFBa0M7QUFDaEMsTUFBTUMsUUFBUSx1QkFBVTtBQUN0QkMsV0FBTztBQUNMQyxjQUFRLEVBREg7QUFFTCxxQkFBZSxFQUZWO0FBR0wsb0JBQWMsRUFIVDtBQUlMLHNCQUFnQixFQUpYO0FBS0xDLFlBQU0sRUFMRDtBQU1MLGtCQUFZLEVBTlA7QUFPTEMsV0FBSyxFQVBBO0FBUUwsaUJBQVcsRUFSTjtBQVNMQyxjQUFRLEtBVEg7QUFVTEMsYUFBTyxFQVZGO0FBV0wsbUJBQWEsRUFYUjtBQVlMQyxXQUFLLEVBWkE7QUFhTCxrQkFBWSxFQWJQO0FBY0wsaUJBQVcsRUFkTjtBQWVMLG1CQUFhO0FBZlIsS0FEZTtBQWtCdEJDLFdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUwsc0JBQWdCLENBRlg7QUFHTCx1QkFBaUI7QUFIWjtBQWxCZSxHQUFWLENBQWQ7QUF3QkFULFFBQU1VLElBQU4sQ0FBV1osTUFBWDtBQUNBRSxRQUFNVSxJQUFOLCtDQUFjWCxJQUFkO0FBQ0EsU0FBT0MsTUFBTVcsUUFBTixFQUFQO0FBQ0Q7O0FBRU0sU0FBU2pCLFlBQVQsR0FBd0I7QUFDN0IsTUFBTUssT0FBTyxpQkFBRWEsR0FBRixDQUFNLGtCQUFRQyxRQUFkLEVBQXdCLFVBQUNDLElBQUQsRUFBT0MsT0FBUDtBQUFBLFdBQW1CLENBQ3REQSxPQURzRCxFQUV0REQsS0FBS0UsSUFGaUQsRUFHdERGLEtBQUtHLE1BSGlELENBQW5CO0FBQUEsR0FBeEIsQ0FBYjtBQUtBLFNBQU9wQixXQUFXLENBQUMsV0FBRCxFQUFjLGNBQWQsRUFBOEIsYUFBOUIsQ0FBWCxFQUF5REUsSUFBekQsQ0FBUDtBQUNEOztBQUVNLFNBQVNKLFdBQVQsQ0FBcUJvQixPQUFyQixFQUE4QjtBQUNuQyxNQUFNRyxXQUFXLGtCQUFRTCxRQUFSLENBQWlCRSxPQUFqQixDQUFqQjtBQUNBLE1BQU1oQixPQUFPLGlCQUFFYSxHQUFGLENBQU1oQixRQUFOLEVBQWdCLG1CQUFXO0FBQ3RDLFFBQU11QixRQUFRLGlCQUFFUCxHQUFGLENBQU1NLFNBQVNFLE9BQVQsQ0FBTixFQUF5QjtBQUFBLG1CQUFTQyxDQUFUO0FBQUEsS0FBekIsRUFBd0NDLElBQXhDLENBQTZDLElBQTdDLENBQWQ7QUFDQSxXQUFPLENBQUMseUJBQVVGLE9BQVYsQ0FBRCxFQUFxQkQsS0FBckIsQ0FBUDtBQUNELEdBSFksQ0FBYjtBQUlBLFNBQU90QixXQUFXLENBQUMsaUJBQUQsRUFBb0IsaUJBQXBCLENBQVgsRUFBbURFLElBQW5ELENBQVA7QUFDRCIsImZpbGUiOiJpMThuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IEdoZXJraW4gZnJvbSAnZ2hlcmtpbidcbmltcG9ydCBUYWJsZSBmcm9tICdjbGktdGFibGUnXG5pbXBvcnQgdGl0bGVDYXNlIGZyb20gJ3RpdGxlLWNhc2UnXG5cbmNvbnN0IGtleXdvcmRzID0gW1xuICAnZmVhdHVyZScsXG4gICdiYWNrZ3JvdW5kJyxcbiAgJ3NjZW5hcmlvJyxcbiAgJ3NjZW5hcmlvT3V0bGluZScsXG4gICdleGFtcGxlcycsXG4gICdnaXZlbicsXG4gICd3aGVuJyxcbiAgJ3RoZW4nLFxuICAnYW5kJyxcbiAgJ2J1dCcsXG5dXG5cbmZ1bmN0aW9uIGdldEFzVGFibGUoaGVhZGVyLCByb3dzKSB7XG4gIGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlKHtcbiAgICBjaGFyczoge1xuICAgICAgYm90dG9tOiAnJyxcbiAgICAgICdib3R0b20tbGVmdCc6ICcnLFxuICAgICAgJ2JvdHRvbS1taWQnOiAnJyxcbiAgICAgICdib3R0b20tcmlnaHQnOiAnJyxcbiAgICAgIGxlZnQ6ICcnLFxuICAgICAgJ2xlZnQtbWlkJzogJycsXG4gICAgICBtaWQ6ICcnLFxuICAgICAgJ21pZC1taWQnOiAnJyxcbiAgICAgIG1pZGRsZTogJyB8ICcsXG4gICAgICByaWdodDogJycsXG4gICAgICAncmlnaHQtbWlkJzogJycsXG4gICAgICB0b3A6ICcnLFxuICAgICAgJ3RvcC1sZWZ0JzogJycsXG4gICAgICAndG9wLW1pZCc6ICcnLFxuICAgICAgJ3RvcC1yaWdodCc6ICcnLFxuICAgIH0sXG4gICAgc3R5bGU6IHtcbiAgICAgIGJvcmRlcjogW10sXG4gICAgICAncGFkZGluZy1sZWZ0JzogMCxcbiAgICAgICdwYWRkaW5nLXJpZ2h0JzogMCxcbiAgICB9LFxuICB9KVxuICB0YWJsZS5wdXNoKGhlYWRlcilcbiAgdGFibGUucHVzaCguLi5yb3dzKVxuICByZXR1cm4gdGFibGUudG9TdHJpbmcoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VzKCkge1xuICBjb25zdCByb3dzID0gXy5tYXAoR2hlcmtpbi5ESUFMRUNUUywgKGRhdGEsIGlzb0NvZGUpID0+IFtcbiAgICBpc29Db2RlLFxuICAgIGRhdGEubmFtZSxcbiAgICBkYXRhLm5hdGl2ZSxcbiAgXSlcbiAgcmV0dXJuIGdldEFzVGFibGUoWydJU08gNjM5LTEnLCAnRU5HTElTSCBOQU1FJywgJ05BVElWRSBOQU1FJ10sIHJvd3MpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRLZXl3b3Jkcyhpc29Db2RlKSB7XG4gIGNvbnN0IGxhbmd1YWdlID0gR2hlcmtpbi5ESUFMRUNUU1tpc29Db2RlXVxuICBjb25zdCByb3dzID0gXy5tYXAoa2V5d29yZHMsIGtleXdvcmQgPT4ge1xuICAgIGNvbnN0IHdvcmRzID0gXy5tYXAobGFuZ3VhZ2Vba2V5d29yZF0sIHMgPT4gYFwiJHtzfVwiYCkuam9pbignLCAnKVxuICAgIHJldHVybiBbdGl0bGVDYXNlKGtleXdvcmQpLCB3b3Jkc11cbiAgfSlcbiAgcmV0dXJuIGdldEFzVGFibGUoWydFTkdMSVNIIEtFWVdPUkQnLCAnTkFUSVZFIEtFWVdPUkRTJ10sIHJvd3MpXG59XG4iXX0=