'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_NAMES = ['source', 'attachment', 'gherkin-document', 'pickle', 'pickle-accepted', 'pickle-rejected', 'test-run-started', 'test-case-prepared', 'test-case-started', 'test-step-started', 'test-step-attachment', 'test-step-finished', 'test-case-finished', 'test-run-finished'];

var EventProtocolFormatter = function (_Formatter) {
  (0, _inherits3.default)(EventProtocolFormatter, _Formatter);

  function EventProtocolFormatter(options) {
    (0, _classCallCheck3.default)(this, EventProtocolFormatter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventProtocolFormatter.__proto__ || Object.getPrototypeOf(EventProtocolFormatter)).call(this, options));

    EVENT_NAMES.forEach(function (eventName) {
      options.eventBroadcaster.on(eventName, function (data) {
        return _this.logEvent(eventName, data);
      });
    });

    var pathSepRegexp = new RegExp((0, _escapeStringRegexp2.default)(_path2.default.sep), 'g');
    var pathToRemove = _this.cwd.replace(pathSepRegexp, _path2.default.posix.sep) + _path2.default.posix.sep;
    _this.pathRegexp = new RegExp((0, _escapeStringRegexp2.default)(pathToRemove), 'g');
    return _this;
  }

  (0, _createClass3.default)(EventProtocolFormatter, [{
    key: 'logEvent',
    value: function logEvent(eventName, data) {
      var text = JSON.stringify((0, _extends3.default)({ type: eventName }, data), this.formatJsonData.bind(this));
      this.log(text + '\n');
    }
  }, {
    key: 'formatJsonData',
    value: function formatJsonData(key, value) {
      if (value instanceof Error) {
        return value.stack.replace(this.pathRegexp, '');
      }
      return value;
    }
  }]);
  return EventProtocolFormatter;
}(_2.default);

exports.default = EventProtocolFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvZXZlbnRfcHJvdG9jb2xfZm9ybWF0dGVyLmpzIl0sIm5hbWVzIjpbIkVWRU5UX05BTUVTIiwiRXZlbnRQcm90b2NvbEZvcm1hdHRlciIsIm9wdGlvbnMiLCJmb3JFYWNoIiwiZXZlbnRCcm9hZGNhc3RlciIsIm9uIiwiZXZlbnROYW1lIiwibG9nRXZlbnQiLCJkYXRhIiwicGF0aFNlcFJlZ2V4cCIsIlJlZ0V4cCIsInNlcCIsInBhdGhUb1JlbW92ZSIsImN3ZCIsInJlcGxhY2UiLCJwb3NpeCIsInBhdGhSZWdleHAiLCJ0ZXh0IiwiSlNPTiIsInN0cmluZ2lmeSIsInR5cGUiLCJmb3JtYXRKc29uRGF0YSIsImxvZyIsImtleSIsInZhbHVlIiwiRXJyb3IiLCJzdGFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGNBQWMsQ0FDbEIsUUFEa0IsRUFFbEIsWUFGa0IsRUFHbEIsa0JBSGtCLEVBSWxCLFFBSmtCLEVBS2xCLGlCQUxrQixFQU1sQixpQkFOa0IsRUFPbEIsa0JBUGtCLEVBUWxCLG9CQVJrQixFQVNsQixtQkFUa0IsRUFVbEIsbUJBVmtCLEVBV2xCLHNCQVhrQixFQVlsQixvQkFaa0IsRUFhbEIsb0JBYmtCLEVBY2xCLG1CQWRrQixDQUFwQjs7SUFpQnFCQyxzQjs7O0FBQ25CLGtDQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQUEsOEpBQ2JBLE9BRGE7O0FBRW5CRixnQkFBWUcsT0FBWixDQUFvQixxQkFBYTtBQUMvQkQsY0FBUUUsZ0JBQVIsQ0FBeUJDLEVBQXpCLENBQTRCQyxTQUE1QixFQUF1QztBQUFBLGVBQ3JDLE1BQUtDLFFBQUwsQ0FBY0QsU0FBZCxFQUF5QkUsSUFBekIsQ0FEcUM7QUFBQSxPQUF2QztBQUdELEtBSkQ7O0FBTUEsUUFBTUMsZ0JBQWdCLElBQUlDLE1BQUosQ0FBVyxrQ0FBbUIsZUFBS0MsR0FBeEIsQ0FBWCxFQUF5QyxHQUF6QyxDQUF0QjtBQUNBLFFBQU1DLGVBQ0osTUFBS0MsR0FBTCxDQUFTQyxPQUFULENBQWlCTCxhQUFqQixFQUFnQyxlQUFLTSxLQUFMLENBQVdKLEdBQTNDLElBQWtELGVBQUtJLEtBQUwsQ0FBV0osR0FEL0Q7QUFFQSxVQUFLSyxVQUFMLEdBQWtCLElBQUlOLE1BQUosQ0FBVyxrQ0FBbUJFLFlBQW5CLENBQVgsRUFBNkMsR0FBN0MsQ0FBbEI7QUFYbUI7QUFZcEI7Ozs7NkJBRVFOLFMsRUFBV0UsSSxFQUFNO0FBQ3hCLFVBQU1TLE9BQU9DLEtBQUtDLFNBQUwsMEJBQ1RDLE1BQU1kLFNBREcsSUFDV0UsSUFEWCxHQUVULEtBQUthLGNBRkksTUFFVCxJQUZTLEVBQWI7QUFJQSxXQUFLQyxHQUFMLENBQVlMLElBQVo7QUFDRDs7O21DQUVjTSxHLEVBQUtDLEssRUFBTztBQUN6QixVQUFJQSxpQkFBaUJDLEtBQXJCLEVBQTRCO0FBQzFCLGVBQU9ELE1BQU1FLEtBQU4sQ0FBWVosT0FBWixDQUFvQixLQUFLRSxVQUF6QixFQUFxQyxFQUFyQyxDQUFQO0FBQ0Q7QUFDRCxhQUFPUSxLQUFQO0FBQ0Q7Ozs7O2tCQTVCa0J2QixzQiIsImZpbGUiOiJldmVudF9wcm90b2NvbF9mb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNjYXBlU3RyaW5nUmVnZXhwIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJ1xuaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmNvbnN0IEVWRU5UX05BTUVTID0gW1xuICAnc291cmNlJyxcbiAgJ2F0dGFjaG1lbnQnLFxuICAnZ2hlcmtpbi1kb2N1bWVudCcsXG4gICdwaWNrbGUnLFxuICAncGlja2xlLWFjY2VwdGVkJyxcbiAgJ3BpY2tsZS1yZWplY3RlZCcsXG4gICd0ZXN0LXJ1bi1zdGFydGVkJyxcbiAgJ3Rlc3QtY2FzZS1wcmVwYXJlZCcsXG4gICd0ZXN0LWNhc2Utc3RhcnRlZCcsXG4gICd0ZXN0LXN0ZXAtc3RhcnRlZCcsXG4gICd0ZXN0LXN0ZXAtYXR0YWNobWVudCcsXG4gICd0ZXN0LXN0ZXAtZmluaXNoZWQnLFxuICAndGVzdC1jYXNlLWZpbmlzaGVkJyxcbiAgJ3Rlc3QtcnVuLWZpbmlzaGVkJyxcbl1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRQcm90b2NvbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIEVWRU5UX05BTUVTLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgIG9wdGlvbnMuZXZlbnRCcm9hZGNhc3Rlci5vbihldmVudE5hbWUsIGRhdGEgPT5cbiAgICAgICAgdGhpcy5sb2dFdmVudChldmVudE5hbWUsIGRhdGEpXG4gICAgICApXG4gICAgfSlcblxuICAgIGNvbnN0IHBhdGhTZXBSZWdleHAgPSBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZ1JlZ2V4cChwYXRoLnNlcCksICdnJylcbiAgICBjb25zdCBwYXRoVG9SZW1vdmUgPVxuICAgICAgdGhpcy5jd2QucmVwbGFjZShwYXRoU2VwUmVnZXhwLCBwYXRoLnBvc2l4LnNlcCkgKyBwYXRoLnBvc2l4LnNlcFxuICAgIHRoaXMucGF0aFJlZ2V4cCA9IG5ldyBSZWdFeHAoZXNjYXBlU3RyaW5nUmVnZXhwKHBhdGhUb1JlbW92ZSksICdnJylcbiAgfVxuXG4gIGxvZ0V2ZW50KGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIGNvbnN0IHRleHQgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgIHsgdHlwZTogZXZlbnROYW1lLCAuLi5kYXRhIH0sXG4gICAgICA6OnRoaXMuZm9ybWF0SnNvbkRhdGFcbiAgICApXG4gICAgdGhpcy5sb2coYCR7dGV4dH1cXG5gKVxuICB9XG5cbiAgZm9ybWF0SnNvbkRhdGEoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gdmFsdWUuc3RhY2sucmVwbGFjZSh0aGlzLnBhdGhSZWdleHAsICcnKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxufVxuIl19