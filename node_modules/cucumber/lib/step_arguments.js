'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStepArgumentIterator = buildStepArgumentIterator;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildStepArgumentIterator(mapping) {
  return function (arg) {
    if (arg.hasOwnProperty('rows')) {
      return mapping.dataTable(arg);
    } else if (arg.hasOwnProperty('content')) {
      return mapping.docString(arg);
    }
    throw new Error('Unknown argument type:' + _util2.default.inspect(arg));
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGVwX2FyZ3VtZW50cy5qcyJdLCJuYW1lcyI6WyJidWlsZFN0ZXBBcmd1bWVudEl0ZXJhdG9yIiwibWFwcGluZyIsImFyZyIsImhhc093blByb3BlcnR5IiwiZGF0YVRhYmxlIiwiZG9jU3RyaW5nIiwiRXJyb3IiLCJpbnNwZWN0Il0sIm1hcHBpbmdzIjoiOzs7OztRQUVnQkEseUIsR0FBQUEseUI7O0FBRmhCOzs7Ozs7QUFFTyxTQUFTQSx5QkFBVCxDQUFtQ0MsT0FBbkMsRUFBNEM7QUFDakQsU0FBTyxVQUFTQyxHQUFULEVBQWM7QUFDbkIsUUFBSUEsSUFBSUMsY0FBSixDQUFtQixNQUFuQixDQUFKLEVBQWdDO0FBQzlCLGFBQU9GLFFBQVFHLFNBQVIsQ0FBa0JGLEdBQWxCLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSUEsSUFBSUMsY0FBSixDQUFtQixTQUFuQixDQUFKLEVBQW1DO0FBQ3hDLGFBQU9GLFFBQVFJLFNBQVIsQ0FBa0JILEdBQWxCLENBQVA7QUFDRDtBQUNELFVBQU0sSUFBSUksS0FBSiw0QkFBbUMsZUFBS0MsT0FBTCxDQUFhTCxHQUFiLENBQW5DLENBQU47QUFDRCxHQVBEO0FBUUQiLCJmaWxlIjoic3RlcF9hcmd1bWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbCBmcm9tICd1dGlsJ1xuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTdGVwQXJndW1lbnRJdGVyYXRvcihtYXBwaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAoYXJnLmhhc093blByb3BlcnR5KCdyb3dzJykpIHtcbiAgICAgIHJldHVybiBtYXBwaW5nLmRhdGFUYWJsZShhcmcpXG4gICAgfSBlbHNlIGlmIChhcmcuaGFzT3duUHJvcGVydHkoJ2NvbnRlbnQnKSkge1xuICAgICAgcmV0dXJuIG1hcHBpbmcuZG9jU3RyaW5nKGFyZylcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGFyZ3VtZW50IHR5cGU6JHt1dGlsLmluc3BlY3QoYXJnKX1gKVxuICB9XG59XG4iXX0=