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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATUS_CHARACTER_MAP;

var _status = require('../status');

var _status2 = _interopRequireDefault(_status);

var _summary_formatter = require('./summary_formatter');

var _summary_formatter2 = _interopRequireDefault(_summary_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATUS_CHARACTER_MAPPING = (_STATUS_CHARACTER_MAP = {}, (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, _status2.default.AMBIGUOUS, 'A'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, _status2.default.FAILED, 'F'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, _status2.default.PASSED, '.'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, _status2.default.PENDING, 'P'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, _status2.default.SKIPPED, '-'), (0, _defineProperty3.default)(_STATUS_CHARACTER_MAP, _status2.default.UNDEFINED, 'U'), _STATUS_CHARACTER_MAP);

var ProgressFormatter = function (_SummaryFormatter) {
  (0, _inherits3.default)(ProgressFormatter, _SummaryFormatter);

  function ProgressFormatter(options) {
    (0, _classCallCheck3.default)(this, ProgressFormatter);

    options.eventBroadcaster.on('test-run-finished', function () {
      _this.log('\n\n');
    });

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProgressFormatter.__proto__ || Object.getPrototypeOf(ProgressFormatter)).call(this, options));

    options.eventBroadcaster.on('test-step-finished', _this.logProgress.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(ProgressFormatter, [{
    key: 'logProgress',
    value: function logProgress(_ref) {
      var result = _ref.result;
      var status = result.status;

      var character = this.colorFns[status](STATUS_CHARACTER_MAPPING[status]);
      this.log(character);
    }
  }]);
  return ProgressFormatter;
}(_summary_formatter2.default);

exports.default = ProgressFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvcHJvZ3Jlc3NfZm9ybWF0dGVyLmpzIl0sIm5hbWVzIjpbIlNUQVRVU19DSEFSQUNURVJfTUFQUElORyIsIkFNQklHVU9VUyIsIkZBSUxFRCIsIlBBU1NFRCIsIlBFTkRJTkciLCJTS0lQUEVEIiwiVU5ERUZJTkVEIiwiUHJvZ3Jlc3NGb3JtYXR0ZXIiLCJvcHRpb25zIiwiZXZlbnRCcm9hZGNhc3RlciIsIm9uIiwibG9nIiwibG9nUHJvZ3Jlc3MiLCJyZXN1bHQiLCJzdGF0dXMiLCJjaGFyYWN0ZXIiLCJjb2xvckZucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLDZHQUNILGlCQUFPQyxTQURKLEVBQ2dCLEdBRGhCLHdEQUVILGlCQUFPQyxNQUZKLEVBRWEsR0FGYix3REFHSCxpQkFBT0MsTUFISixFQUdhLEdBSGIsd0RBSUgsaUJBQU9DLE9BSkosRUFJYyxHQUpkLHdEQUtILGlCQUFPQyxPQUxKLEVBS2MsR0FMZCx3REFNSCxpQkFBT0MsU0FOSixFQU1nQixHQU5oQix5QkFBTjs7SUFTcUJDLGlCOzs7QUFDbkIsNkJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkJBLFlBQVFDLGdCQUFSLENBQXlCQyxFQUF6QixDQUE0QixtQkFBNUIsRUFBaUQsWUFBTTtBQUNyRCxZQUFLQyxHQUFMLENBQVMsTUFBVDtBQUNELEtBRkQ7O0FBRG1CLG9KQUliSCxPQUphOztBQUtuQkEsWUFBUUMsZ0JBQVIsQ0FBeUJDLEVBQXpCLENBQTRCLG9CQUE1QixFQUFvRCxNQUFLRSxXQUF6RDtBQUxtQjtBQU1wQjs7OztzQ0FFdUI7QUFBQSxVQUFWQyxNQUFVLFFBQVZBLE1BQVU7QUFBQSxVQUNkQyxNQURjLEdBQ0hELE1BREcsQ0FDZEMsTUFEYzs7QUFFdEIsVUFBTUMsWUFBWSxLQUFLQyxRQUFMLENBQWNGLE1BQWQsRUFBc0JkLHlCQUF5QmMsTUFBekIsQ0FBdEIsQ0FBbEI7QUFDQSxXQUFLSCxHQUFMLENBQVNJLFNBQVQ7QUFDRDs7Ozs7a0JBYmtCUixpQiIsImZpbGUiOiJwcm9ncmVzc19mb3JtYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RhdHVzIGZyb20gJy4uL3N0YXR1cydcbmltcG9ydCBTdW1tYXJ5Rm9ybWF0dGVyIGZyb20gJy4vc3VtbWFyeV9mb3JtYXR0ZXInXG5cbmNvbnN0IFNUQVRVU19DSEFSQUNURVJfTUFQUElORyA9IHtcbiAgW1N0YXR1cy5BTUJJR1VPVVNdOiAnQScsXG4gIFtTdGF0dXMuRkFJTEVEXTogJ0YnLFxuICBbU3RhdHVzLlBBU1NFRF06ICcuJyxcbiAgW1N0YXR1cy5QRU5ESU5HXTogJ1AnLFxuICBbU3RhdHVzLlNLSVBQRURdOiAnLScsXG4gIFtTdGF0dXMuVU5ERUZJTkVEXTogJ1UnLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmVzc0Zvcm1hdHRlciBleHRlbmRzIFN1bW1hcnlGb3JtYXR0ZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgb3B0aW9ucy5ldmVudEJyb2FkY2FzdGVyLm9uKCd0ZXN0LXJ1bi1maW5pc2hlZCcsICgpID0+IHtcbiAgICAgIHRoaXMubG9nKCdcXG5cXG4nKVxuICAgIH0pXG4gICAgc3VwZXIob3B0aW9ucylcbiAgICBvcHRpb25zLmV2ZW50QnJvYWRjYXN0ZXIub24oJ3Rlc3Qtc3RlcC1maW5pc2hlZCcsIDo6dGhpcy5sb2dQcm9ncmVzcylcbiAgfVxuXG4gIGxvZ1Byb2dyZXNzKHsgcmVzdWx0IH0pIHtcbiAgICBjb25zdCB7IHN0YXR1cyB9ID0gcmVzdWx0XG4gICAgY29uc3QgY2hhcmFjdGVyID0gdGhpcy5jb2xvckZuc1tzdGF0dXNdKFNUQVRVU19DSEFSQUNURVJfTUFQUElOR1tzdGF0dXNdKVxuICAgIHRoaXMubG9nKGNoYXJhY3RlcilcbiAgfVxufVxuIl19