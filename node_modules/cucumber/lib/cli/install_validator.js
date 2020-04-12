'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateInstall = undefined;

var _bluebird = require('bluebird');

var validateInstall = exports.validateInstall = function () {
  var _ref = (0, _bluebird.coroutine)(function* (cwd) {
    var projectPath = _path2.default.join(__dirname, '..', '..');
    if (projectPath === cwd) {
      return; // cucumber testing itself
    }
    var currentCucumberPath = require.resolve(projectPath);
    var localCucumberPath = yield (0, _bluebird.promisify)(_resolve2.default)('cucumber', {
      basedir: cwd
    });
    localCucumberPath = yield _fs2.default.realpath(localCucumberPath);
    if (localCucumberPath !== currentCucumberPath) {
      throw new Error('\n      You appear to be executing an install of cucumber (most likely a global install)\n      that is different from your local install (the one required in your support files).\n      For cucumber to work, you need to execute the same install that is required in your support files.\n      Please execute the locally installed version to run your tests.\n\n      Executed Path: ' + currentCucumberPath + '\n      Local Path:    ' + localCucumberPath + '\n      ');
    }
  });

  return function validateInstall(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaW5zdGFsbF92YWxpZGF0b3IuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvamVjdFBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwiY3VycmVudEN1Y3VtYmVyUGF0aCIsInJlcXVpcmUiLCJyZXNvbHZlIiwibG9jYWxDdWN1bWJlclBhdGgiLCJiYXNlZGlyIiwicmVhbHBhdGgiLCJFcnJvciIsInZhbGlkYXRlSW5zdGFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztzQ0FLTyxXQUErQkEsR0FBL0IsRUFBb0M7QUFDekMsUUFBTUMsY0FBYyxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBcEI7QUFDQSxRQUFJRixnQkFBZ0JELEdBQXBCLEVBQXlCO0FBQ3ZCLGFBRHVCLENBQ2hCO0FBQ1I7QUFDRCxRQUFNSSxzQkFBc0JDLFFBQVFDLE9BQVIsQ0FBZ0JMLFdBQWhCLENBQTVCO0FBQ0EsUUFBSU0sb0JBQW9CLE1BQU0sNENBQW1CLFVBQW5CLEVBQStCO0FBQzNEQyxlQUFTUjtBQURrRCxLQUEvQixDQUE5QjtBQUdBTyx3QkFBb0IsTUFBTSxhQUFHRSxRQUFILENBQVlGLGlCQUFaLENBQTFCO0FBQ0EsUUFBSUEsc0JBQXNCSCxtQkFBMUIsRUFBK0M7QUFDN0MsWUFBTSxJQUFJTSxLQUFKLG1ZQU9hTixtQkFQYiwrQkFRYUcsaUJBUmIsY0FBTjtBQVdEO0FBQ0YsRzs7a0JBdkJxQkksZTs7Ozs7QUFKdEI7Ozs7QUFDQTs7OztBQUNBIiwiZmlsZSI6Imluc3RhbGxfdmFsaWRhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHJlc29sdmUgZnJvbSAncmVzb2x2ZSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlSW5zdGFsbChjd2QpIHtcbiAgY29uc3QgcHJvamVjdFBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnLi4nKVxuICBpZiAocHJvamVjdFBhdGggPT09IGN3ZCkge1xuICAgIHJldHVybiAvLyBjdWN1bWJlciB0ZXN0aW5nIGl0c2VsZlxuICB9XG4gIGNvbnN0IGN1cnJlbnRDdWN1bWJlclBhdGggPSByZXF1aXJlLnJlc29sdmUocHJvamVjdFBhdGgpXG4gIGxldCBsb2NhbEN1Y3VtYmVyUGF0aCA9IGF3YWl0IHByb21pc2lmeShyZXNvbHZlKSgnY3VjdW1iZXInLCB7XG4gICAgYmFzZWRpcjogY3dkLFxuICB9KVxuICBsb2NhbEN1Y3VtYmVyUGF0aCA9IGF3YWl0IGZzLnJlYWxwYXRoKGxvY2FsQ3VjdW1iZXJQYXRoKVxuICBpZiAobG9jYWxDdWN1bWJlclBhdGggIT09IGN1cnJlbnRDdWN1bWJlclBhdGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgXG4gICAgICBZb3UgYXBwZWFyIHRvIGJlIGV4ZWN1dGluZyBhbiBpbnN0YWxsIG9mIGN1Y3VtYmVyIChtb3N0IGxpa2VseSBhIGdsb2JhbCBpbnN0YWxsKVxuICAgICAgdGhhdCBpcyBkaWZmZXJlbnQgZnJvbSB5b3VyIGxvY2FsIGluc3RhbGwgKHRoZSBvbmUgcmVxdWlyZWQgaW4geW91ciBzdXBwb3J0IGZpbGVzKS5cbiAgICAgIEZvciBjdWN1bWJlciB0byB3b3JrLCB5b3UgbmVlZCB0byBleGVjdXRlIHRoZSBzYW1lIGluc3RhbGwgdGhhdCBpcyByZXF1aXJlZCBpbiB5b3VyIHN1cHBvcnQgZmlsZXMuXG4gICAgICBQbGVhc2UgZXhlY3V0ZSB0aGUgbG9jYWxseSBpbnN0YWxsZWQgdmVyc2lvbiB0byBydW4geW91ciB0ZXN0cy5cblxuICAgICAgRXhlY3V0ZWQgUGF0aDogJHtjdXJyZW50Q3VjdW1iZXJQYXRofVxuICAgICAgTG9jYWwgUGF0aDogICAgJHtsb2NhbEN1Y3VtYmVyUGF0aH1cbiAgICAgIGBcbiAgICApXG4gIH1cbn1cbiJdfQ==