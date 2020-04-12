'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UncaughtExceptionManager = function () {
  function UncaughtExceptionManager() {
    (0, _classCallCheck3.default)(this, UncaughtExceptionManager);
  }

  (0, _createClass3.default)(UncaughtExceptionManager, null, [{
    key: 'registerHandler',
    value: function registerHandler(handler) {
      if (typeof window === 'undefined') {
        process.addListener('uncaughtException', handler);
      } else {
        window.onerror = handler;
      }
    }
  }, {
    key: 'unregisterHandler',
    value: function unregisterHandler(handler) {
      if (typeof window === 'undefined') {
        process.removeListener('uncaughtException', handler);
      } else {
        window.onerror = void 0;
      }
    }
  }]);
  return UncaughtExceptionManager;
}();

exports.default = UncaughtExceptionManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91bmNhdWdodF9leGNlcHRpb25fbWFuYWdlci5qcyJdLCJuYW1lcyI6WyJVbmNhdWdodEV4Y2VwdGlvbk1hbmFnZXIiLCJoYW5kbGVyIiwid2luZG93IiwicHJvY2VzcyIsImFkZExpc3RlbmVyIiwib25lcnJvciIsInJlbW92ZUxpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSx3Qjs7Ozs7OztvQ0FDSUMsTyxFQUFTO0FBQzlCLFVBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUNqQ0MsZ0JBQVFDLFdBQVIsQ0FBb0IsbUJBQXBCLEVBQXlDSCxPQUF6QztBQUNELE9BRkQsTUFFTztBQUNMQyxlQUFPRyxPQUFQLEdBQWlCSixPQUFqQjtBQUNEO0FBQ0Y7OztzQ0FFd0JBLE8sRUFBUztBQUNoQyxVQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakNDLGdCQUFRRyxjQUFSLENBQXVCLG1CQUF2QixFQUE0Q0wsT0FBNUM7QUFDRCxPQUZELE1BRU87QUFDTEMsZUFBT0csT0FBUCxHQUFpQixLQUFLLENBQXRCO0FBQ0Q7QUFDRjs7Ozs7a0JBZmtCTCx3QiIsImZpbGUiOiJ1bmNhdWdodF9leGNlcHRpb25fbWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuY2F1Z2h0RXhjZXB0aW9uTWFuYWdlciB7XG4gIHN0YXRpYyByZWdpc3RlckhhbmRsZXIoaGFuZGxlcikge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcHJvY2Vzcy5hZGRMaXN0ZW5lcigndW5jYXVnaHRFeGNlcHRpb24nLCBoYW5kbGVyKVxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub25lcnJvciA9IGhhbmRsZXJcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdW5yZWdpc3RlckhhbmRsZXIoaGFuZGxlcikge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcigndW5jYXVnaHRFeGNlcHRpb24nLCBoYW5kbGVyKVxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub25lcnJvciA9IHZvaWQgMFxuICAgIH1cbiAgfVxufVxuIl19