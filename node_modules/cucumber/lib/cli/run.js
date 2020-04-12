'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _verror = require('verror');

var _verror2 = _interopRequireDefault(_verror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exitWithError(error) {
  console.error(_verror2.default.fullStack(error)); // eslint-disable-line no-console
  process.exit(1);
}

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(function* () {
    var cwd = process.cwd();
    var cli = new _2.default({
      argv: process.argv,
      cwd: cwd,
      stdout: process.stdout
    });

    var result = void 0;
    try {
      result = yield cli.run();
    } catch (error) {
      exitWithError(error);
    }

    var exitCode = result.success ? 0 : 1;
    if (result.shouldExitImmediately) {
      process.exit(exitCode);
    } else {
      process.exitCode = exitCode;
    }
  });

  function run() {
    return _ref.apply(this, arguments);
  }

  return run;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvcnVuLmpzIl0sIm5hbWVzIjpbImV4aXRXaXRoRXJyb3IiLCJlcnJvciIsImNvbnNvbGUiLCJmdWxsU3RhY2siLCJwcm9jZXNzIiwiZXhpdCIsImN3ZCIsImNsaSIsImFyZ3YiLCJzdGRvdXQiLCJyZXN1bHQiLCJydW4iLCJleGl0Q29kZSIsInN1Y2Nlc3MiLCJzaG91bGRFeGl0SW1tZWRpYXRlbHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEI7QUFDNUJDLFVBQVFELEtBQVIsQ0FBYyxpQkFBT0UsU0FBUCxDQUFpQkYsS0FBakIsQ0FBZCxFQUQ0QixDQUNXO0FBQ3ZDRyxVQUFRQyxJQUFSLENBQWEsQ0FBYjtBQUNEOzs7c0NBRWMsYUFBcUI7QUFDbEMsUUFBTUMsTUFBTUYsUUFBUUUsR0FBUixFQUFaO0FBQ0EsUUFBTUMsTUFBTSxlQUFRO0FBQ2xCQyxZQUFNSixRQUFRSSxJQURJO0FBRWxCRixjQUZrQjtBQUdsQkcsY0FBUUwsUUFBUUs7QUFIRSxLQUFSLENBQVo7O0FBTUEsUUFBSUMsZUFBSjtBQUNBLFFBQUk7QUFDRkEsZUFBUyxNQUFNSCxJQUFJSSxHQUFKLEVBQWY7QUFDRCxLQUZELENBRUUsT0FBT1YsS0FBUCxFQUFjO0FBQ2RELG9CQUFjQyxLQUFkO0FBQ0Q7O0FBRUQsUUFBTVcsV0FBV0YsT0FBT0csT0FBUCxHQUFpQixDQUFqQixHQUFxQixDQUF0QztBQUNBLFFBQUlILE9BQU9JLHFCQUFYLEVBQWtDO0FBQ2hDVixjQUFRQyxJQUFSLENBQWFPLFFBQWI7QUFDRCxLQUZELE1BRU87QUFDTFIsY0FBUVEsUUFBUixHQUFtQkEsUUFBbkI7QUFDRDtBQUNGLEc7O1dBckI2QkQsRzs7OztTQUFBQSxHIiwiZmlsZSI6InJ1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDbGkgZnJvbSAnLi8nXG5pbXBvcnQgVkVycm9yIGZyb20gJ3ZlcnJvcidcblxuZnVuY3Rpb24gZXhpdFdpdGhFcnJvcihlcnJvcikge1xuICBjb25zb2xlLmVycm9yKFZFcnJvci5mdWxsU3RhY2soZXJyb3IpKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgcHJvY2Vzcy5leGl0KDEpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHJ1bigpIHtcbiAgY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKVxuICBjb25zdCBjbGkgPSBuZXcgQ2xpKHtcbiAgICBhcmd2OiBwcm9jZXNzLmFyZ3YsXG4gICAgY3dkLFxuICAgIHN0ZG91dDogcHJvY2Vzcy5zdGRvdXQsXG4gIH0pXG5cbiAgbGV0IHJlc3VsdFxuICB0cnkge1xuICAgIHJlc3VsdCA9IGF3YWl0IGNsaS5ydW4oKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGV4aXRXaXRoRXJyb3IoZXJyb3IpXG4gIH1cblxuICBjb25zdCBleGl0Q29kZSA9IHJlc3VsdC5zdWNjZXNzID8gMCA6IDFcbiAgaWYgKHJlc3VsdC5zaG91bGRFeGl0SW1tZWRpYXRlbHkpIHtcbiAgICBwcm9jZXNzLmV4aXQoZXhpdENvZGUpXG4gIH0gZWxzZSB7XG4gICAgcHJvY2Vzcy5leGl0Q29kZSA9IGV4aXRDb2RlXG4gIH1cbn1cbiJdfQ==