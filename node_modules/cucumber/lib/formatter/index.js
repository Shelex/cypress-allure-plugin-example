'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Formatter = function Formatter(options) {
  (0, _classCallCheck3.default)(this, Formatter);

  _lodash2.default.assign(this, _lodash2.default.pick(options, ['colorFns', 'cwd', 'eventDataCollector', 'log', 'snippetBuilder', 'stream', 'supportCodeLibrary']));
};

exports.default = Formatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvaW5kZXguanMiXSwibmFtZXMiOlsiRm9ybWF0dGVyIiwib3B0aW9ucyIsImFzc2lnbiIsInBpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxTLEdBQ25CLG1CQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLG1CQUFFQyxNQUFGLENBQ0UsSUFERixFQUVFLGlCQUFFQyxJQUFGLENBQU9GLE9BQVAsRUFBZ0IsQ0FDZCxVQURjLEVBRWQsS0FGYyxFQUdkLG9CQUhjLEVBSWQsS0FKYyxFQUtkLGdCQUxjLEVBTWQsUUFOYyxFQU9kLG9CQVBjLENBQWhCLENBRkY7QUFZRCxDOztrQkFka0JELFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdHRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBfLmFzc2lnbihcbiAgICAgIHRoaXMsXG4gICAgICBfLnBpY2sob3B0aW9ucywgW1xuICAgICAgICAnY29sb3JGbnMnLFxuICAgICAgICAnY3dkJyxcbiAgICAgICAgJ2V2ZW50RGF0YUNvbGxlY3RvcicsXG4gICAgICAgICdsb2cnLFxuICAgICAgICAnc25pcHBldEJ1aWxkZXInLFxuICAgICAgICAnc3RyZWFtJyxcbiAgICAgICAgJ3N1cHBvcnRDb2RlTGlicmFyeScsXG4gICAgICBdKVxuICAgIClcbiAgfVxufVxuIl19