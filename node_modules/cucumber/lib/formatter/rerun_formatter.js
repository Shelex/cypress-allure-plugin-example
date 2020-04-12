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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_SEPARATOR = '\n';

var RerunFormatter = function (_Formatter) {
  (0, _inherits3.default)(RerunFormatter, _Formatter);

  function RerunFormatter(options) {
    (0, _classCallCheck3.default)(this, RerunFormatter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RerunFormatter.__proto__ || Object.getPrototypeOf(RerunFormatter)).call(this, options));

    options.eventBroadcaster.on('test-case-finished', _this.storeFailedTestCases.bind(_this)).on('test-run-finished', _this.logFailedTestCases.bind(_this));
    _this.mapping = {};
    _this.separator = _lodash2.default.get(options, 'rerun.separator', DEFAULT_SEPARATOR);
    return _this;
  }

  (0, _createClass3.default)(RerunFormatter, [{
    key: 'storeFailedTestCases',
    value: function storeFailedTestCases(_ref) {
      var _ref$sourceLocation = _ref.sourceLocation,
          line = _ref$sourceLocation.line,
          uri = _ref$sourceLocation.uri,
          status = _ref.result.status;

      if (status !== _status2.default.PASSED) {
        if (!this.mapping[uri]) {
          this.mapping[uri] = [];
        }
        this.mapping[uri].push(line);
      }
    }
  }, {
    key: 'logFailedTestCases',
    value: function logFailedTestCases() {
      var text = _lodash2.default.chain(this.mapping).map(function (lines, uri) {
        return uri + ':' + lines.join(':');
      }).join(this.separator).value();
      this.log(text);
    }
  }]);
  return RerunFormatter;
}(_3.default);

exports.default = RerunFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvcmVydW5fZm9ybWF0dGVyLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfU0VQQVJBVE9SIiwiUmVydW5Gb3JtYXR0ZXIiLCJvcHRpb25zIiwiZXZlbnRCcm9hZGNhc3RlciIsIm9uIiwic3RvcmVGYWlsZWRUZXN0Q2FzZXMiLCJsb2dGYWlsZWRUZXN0Q2FzZXMiLCJtYXBwaW5nIiwic2VwYXJhdG9yIiwiZ2V0Iiwic291cmNlTG9jYXRpb24iLCJsaW5lIiwidXJpIiwic3RhdHVzIiwicmVzdWx0IiwiUEFTU0VEIiwicHVzaCIsInRleHQiLCJjaGFpbiIsIm1hcCIsImxpbmVzIiwiam9pbiIsInZhbHVlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxvQkFBb0IsSUFBMUI7O0lBRXFCQyxjOzs7QUFDbkIsMEJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFBQSw4SUFDYkEsT0FEYTs7QUFFbkJBLFlBQVFDLGdCQUFSLENBQ0dDLEVBREgsQ0FDTSxvQkFETixFQUM4QixNQUFLQyxvQkFEbkMsY0FFR0QsRUFGSCxDQUVNLG1CQUZOLEVBRTZCLE1BQUtFLGtCQUZsQztBQUdBLFVBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixpQkFBRUMsR0FBRixDQUFNUCxPQUFOLEVBQWUsaUJBQWYsRUFBa0NGLGlCQUFsQyxDQUFqQjtBQU5tQjtBQU9wQjs7OzsrQ0FFMkU7QUFBQSxxQ0FBckRVLGNBQXFEO0FBQUEsVUFBbkNDLElBQW1DLHVCQUFuQ0EsSUFBbUM7QUFBQSxVQUE3QkMsR0FBNkIsdUJBQTdCQSxHQUE2QjtBQUFBLFVBQVpDLE1BQVksUUFBdEJDLE1BQXNCLENBQVpELE1BQVk7O0FBQzFFLFVBQUlBLFdBQVcsaUJBQU9FLE1BQXRCLEVBQThCO0FBQzVCLFlBQUksQ0FBQyxLQUFLUixPQUFMLENBQWFLLEdBQWIsQ0FBTCxFQUF3QjtBQUN0QixlQUFLTCxPQUFMLENBQWFLLEdBQWIsSUFBb0IsRUFBcEI7QUFDRDtBQUNELGFBQUtMLE9BQUwsQ0FBYUssR0FBYixFQUFrQkksSUFBbEIsQ0FBdUJMLElBQXZCO0FBQ0Q7QUFDRjs7O3lDQUVvQjtBQUNuQixVQUFNTSxPQUFPLGlCQUFFQyxLQUFGLENBQVEsS0FBS1gsT0FBYixFQUNWWSxHQURVLENBQ04sVUFBQ0MsS0FBRCxFQUFRUixHQUFSO0FBQUEsZUFBbUJBLEdBQW5CLFNBQTBCUSxNQUFNQyxJQUFOLENBQVcsR0FBWCxDQUExQjtBQUFBLE9BRE0sRUFFVkEsSUFGVSxDQUVMLEtBQUtiLFNBRkEsRUFHVmMsS0FIVSxFQUFiO0FBSUEsV0FBS0MsR0FBTCxDQUFTTixJQUFUO0FBQ0Q7Ozs7O2tCQXpCa0JoQixjIiwiZmlsZSI6InJlcnVuX2Zvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi8nXG5pbXBvcnQgU3RhdHVzIGZyb20gJy4uL3N0YXR1cydcblxuY29uc3QgREVGQVVMVF9TRVBBUkFUT1IgPSAnXFxuJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXJ1bkZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIG9wdGlvbnMuZXZlbnRCcm9hZGNhc3RlclxuICAgICAgLm9uKCd0ZXN0LWNhc2UtZmluaXNoZWQnLCA6OnRoaXMuc3RvcmVGYWlsZWRUZXN0Q2FzZXMpXG4gICAgICAub24oJ3Rlc3QtcnVuLWZpbmlzaGVkJywgOjp0aGlzLmxvZ0ZhaWxlZFRlc3RDYXNlcylcbiAgICB0aGlzLm1hcHBpbmcgPSB7fVxuICAgIHRoaXMuc2VwYXJhdG9yID0gXy5nZXQob3B0aW9ucywgJ3JlcnVuLnNlcGFyYXRvcicsIERFRkFVTFRfU0VQQVJBVE9SKVxuICB9XG5cbiAgc3RvcmVGYWlsZWRUZXN0Q2FzZXMoeyBzb3VyY2VMb2NhdGlvbjogeyBsaW5lLCB1cmkgfSwgcmVzdWx0OiB7IHN0YXR1cyB9IH0pIHtcbiAgICBpZiAoc3RhdHVzICE9PSBTdGF0dXMuUEFTU0VEKSB7XG4gICAgICBpZiAoIXRoaXMubWFwcGluZ1t1cmldKSB7XG4gICAgICAgIHRoaXMubWFwcGluZ1t1cmldID0gW11cbiAgICAgIH1cbiAgICAgIHRoaXMubWFwcGluZ1t1cmldLnB1c2gobGluZSlcbiAgICB9XG4gIH1cblxuICBsb2dGYWlsZWRUZXN0Q2FzZXMoKSB7XG4gICAgY29uc3QgdGV4dCA9IF8uY2hhaW4odGhpcy5tYXBwaW5nKVxuICAgICAgLm1hcCgobGluZXMsIHVyaSkgPT4gYCR7dXJpfToke2xpbmVzLmpvaW4oJzonKX1gKVxuICAgICAgLmpvaW4odGhpcy5zZXBhcmF0b3IpXG4gICAgICAudmFsdWUoKVxuICAgIHRoaXMubG9nKHRleHQpXG4gIH1cbn1cbiJdfQ==