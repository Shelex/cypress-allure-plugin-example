'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = getColorFns;

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _status = require('../status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getColorFns(enabled) {
  var _colors$setTheme;

  _safe2.default.enabled = enabled;
  _safe2.default.setTheme((_colors$setTheme = {}, (0, _defineProperty3.default)(_colors$setTheme, _status2.default.AMBIGUOUS, 'red'), (0, _defineProperty3.default)(_colors$setTheme, _status2.default.FAILED, 'red'), (0, _defineProperty3.default)(_colors$setTheme, _status2.default.PASSED, 'green'), (0, _defineProperty3.default)(_colors$setTheme, _status2.default.PENDING, 'yellow'), (0, _defineProperty3.default)(_colors$setTheme, _status2.default.SKIPPED, 'cyan'), (0, _defineProperty3.default)(_colors$setTheme, _status2.default.UNDEFINED, 'yellow'), (0, _defineProperty3.default)(_colors$setTheme, 'location', 'grey'), (0, _defineProperty3.default)(_colors$setTheme, 'tag', 'cyan'), _colors$setTheme));
  return _safe2.default;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvZ2V0X2NvbG9yX2Zucy5qcyJdLCJuYW1lcyI6WyJnZXRDb2xvckZucyIsImVuYWJsZWQiLCJzZXRUaGVtZSIsIkFNQklHVU9VUyIsIkZBSUxFRCIsIlBBU1NFRCIsIlBFTkRJTkciLCJTS0lQUEVEIiwiVU5ERUZJTkVEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQUd3QkEsVzs7QUFIeEI7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBU0EsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEI7QUFBQTs7QUFDM0MsaUJBQU9BLE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0EsaUJBQU9DLFFBQVAseUVBQ0csaUJBQU9DLFNBRFYsRUFDc0IsS0FEdEIsbURBRUcsaUJBQU9DLE1BRlYsRUFFbUIsS0FGbkIsbURBR0csaUJBQU9DLE1BSFYsRUFHbUIsT0FIbkIsbURBSUcsaUJBQU9DLE9BSlYsRUFJb0IsUUFKcEIsbURBS0csaUJBQU9DLE9BTFYsRUFLb0IsTUFMcEIsbURBTUcsaUJBQU9DLFNBTlYsRUFNc0IsUUFOdEIsK0RBT1ksTUFQWiwwREFRTyxNQVJQO0FBVUE7QUFDRCIsImZpbGUiOiJnZXRfY29sb3JfZm5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbG9ycyBmcm9tICdjb2xvcnMvc2FmZSdcbmltcG9ydCBTdGF0dXMgZnJvbSAnLi4vc3RhdHVzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb2xvckZucyhlbmFibGVkKSB7XG4gIGNvbG9ycy5lbmFibGVkID0gZW5hYmxlZFxuICBjb2xvcnMuc2V0VGhlbWUoe1xuICAgIFtTdGF0dXMuQU1CSUdVT1VTXTogJ3JlZCcsXG4gICAgW1N0YXR1cy5GQUlMRURdOiAncmVkJyxcbiAgICBbU3RhdHVzLlBBU1NFRF06ICdncmVlbicsXG4gICAgW1N0YXR1cy5QRU5ESU5HXTogJ3llbGxvdycsXG4gICAgW1N0YXR1cy5TS0lQUEVEXTogJ2N5YW4nLFxuICAgIFtTdGF0dXMuVU5ERUZJTkVEXTogJ3llbGxvdycsXG4gICAgbG9jYXRpb246ICdncmV5JyxcbiAgICB0YWc6ICdjeWFuJyxcbiAgfSlcbiAgcmV0dXJuIGNvbG9yc1xufVxuIl19