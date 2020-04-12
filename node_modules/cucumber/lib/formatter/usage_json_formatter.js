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

var _helpers = require('./helpers');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsageJsonFormatter = function (_Formatter) {
  (0, _inherits3.default)(UsageJsonFormatter, _Formatter);

  function UsageJsonFormatter(options) {
    (0, _classCallCheck3.default)(this, UsageJsonFormatter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UsageJsonFormatter.__proto__ || Object.getPrototypeOf(UsageJsonFormatter)).call(this, options));

    options.eventBroadcaster.on('test-run-finished', _this.logUsage.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(UsageJsonFormatter, [{
    key: 'logUsage',
    value: function logUsage() {
      var usage = (0, _helpers.getUsage)({
        stepDefinitions: this.supportCodeLibrary.stepDefinitions,
        eventDataCollector: this.eventDataCollector
      });
      this.log(JSON.stringify(usage, null, 2));
    }
  }]);
  return UsageJsonFormatter;
}(_2.default);

exports.default = UsageJsonFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvdXNhZ2VfanNvbl9mb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiVXNhZ2VKc29uRm9ybWF0dGVyIiwib3B0aW9ucyIsImV2ZW50QnJvYWRjYXN0ZXIiLCJvbiIsImxvZ1VzYWdlIiwidXNhZ2UiLCJzdGVwRGVmaW5pdGlvbnMiLCJzdXBwb3J0Q29kZUxpYnJhcnkiLCJldmVudERhdGFDb2xsZWN0b3IiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztJQUVxQkEsa0I7OztBQUNuQiw4QkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBLHNKQUNiQSxPQURhOztBQUVuQkEsWUFBUUMsZ0JBQVIsQ0FBeUJDLEVBQXpCLENBQTRCLG1CQUE1QixFQUFtRCxNQUFLQyxRQUF4RDtBQUZtQjtBQUdwQjs7OzsrQkFFVTtBQUNULFVBQU1DLFFBQVEsdUJBQVM7QUFDckJDLHlCQUFpQixLQUFLQyxrQkFBTCxDQUF3QkQsZUFEcEI7QUFFckJFLDRCQUFvQixLQUFLQTtBQUZKLE9BQVQsQ0FBZDtBQUlBLFdBQUtDLEdBQUwsQ0FBU0MsS0FBS0MsU0FBTCxDQUFlTixLQUFmLEVBQXNCLElBQXRCLEVBQTRCLENBQTVCLENBQVQ7QUFDRDs7Ozs7a0JBWmtCTCxrQiIsImZpbGUiOiJ1c2FnZV9qc29uX2Zvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFVzYWdlIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNhZ2VKc29uRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgb3B0aW9ucy5ldmVudEJyb2FkY2FzdGVyLm9uKCd0ZXN0LXJ1bi1maW5pc2hlZCcsIDo6dGhpcy5sb2dVc2FnZSlcbiAgfVxuXG4gIGxvZ1VzYWdlKCkge1xuICAgIGNvbnN0IHVzYWdlID0gZ2V0VXNhZ2Uoe1xuICAgICAgc3RlcERlZmluaXRpb25zOiB0aGlzLnN1cHBvcnRDb2RlTGlicmFyeS5zdGVwRGVmaW5pdGlvbnMsXG4gICAgICBldmVudERhdGFDb2xsZWN0b3I6IHRoaXMuZXZlbnREYXRhQ29sbGVjdG9yLFxuICAgIH0pXG4gICAgdGhpcy5sb2coSlNPTi5zdHJpbmdpZnkodXNhZ2UsIG51bGwsIDIpKVxuICB9XG59XG4iXX0=