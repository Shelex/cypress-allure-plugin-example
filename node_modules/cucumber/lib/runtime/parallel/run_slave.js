'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _slave = require('./slave');

var _slave2 = _interopRequireDefault(_slave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(function* () {
    var slave = new _slave2.default({
      stdin: process.stdin,
      stdout: process.stdout,
      cwd: process.cwd()
    });
    yield slave.run();
  });

  function run() {
    return _ref.apply(this, arguments);
  }

  return run;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydW50aW1lL3BhcmFsbGVsL3J1bl9zbGF2ZS5qcyJdLCJuYW1lcyI6WyJzbGF2ZSIsInN0ZGluIiwicHJvY2VzcyIsInN0ZG91dCIsImN3ZCIsInJ1biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7OztzQ0FFZSxhQUFxQjtBQUNsQyxRQUFNQSxRQUFRLG9CQUFVO0FBQ3RCQyxhQUFPQyxRQUFRRCxLQURPO0FBRXRCRSxjQUFRRCxRQUFRQyxNQUZNO0FBR3RCQyxXQUFLRixRQUFRRSxHQUFSO0FBSGlCLEtBQVYsQ0FBZDtBQUtBLFVBQU1KLE1BQU1LLEdBQU4sRUFBTjtBQUNELEc7O1dBUDZCQSxHOzs7O1NBQUFBLEciLCJmaWxlIjoicnVuX3NsYXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNsYXZlIGZyb20gJy4vc2xhdmUnXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcbiAgY29uc3Qgc2xhdmUgPSBuZXcgU2xhdmUoe1xuICAgIHN0ZGluOiBwcm9jZXNzLnN0ZGluLFxuICAgIHN0ZG91dDogcHJvY2Vzcy5zdGRvdXQsXG4gICAgY3dkOiBwcm9jZXNzLmN3ZCgpLFxuICB9KVxuICBhd2FpdCBzbGF2ZS5ydW4oKVxufVxuIl19