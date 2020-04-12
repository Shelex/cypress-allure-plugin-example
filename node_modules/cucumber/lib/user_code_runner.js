'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

var _uncaught_exception_manager = require('./uncaught_exception_manager');

var _uncaught_exception_manager2 = _interopRequireDefault(_uncaught_exception_manager);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserCodeRunner = function () {
  function UserCodeRunner() {
    (0, _classCallCheck3.default)(this, UserCodeRunner);
  }

  (0, _createClass3.default)(UserCodeRunner, null, [{
    key: 'run',
    value: function () {
      var _ref2 = (0, _bluebird.coroutine)(function* (_ref) {
        var argsArray = _ref.argsArray,
            thisArg = _ref.thisArg,
            fn = _ref.fn,
            timeoutInMilliseconds = _ref.timeoutInMilliseconds;

        var callbackPromise = new _bluebird2.default(function (resolve, reject) {
          argsArray.push(function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });

        var fnReturn = void 0;
        try {
          fnReturn = fn.apply(thisArg, argsArray);
        } catch (e) {
          var _error = e instanceof Error ? e : new Error(_util2.default.format(e));
          return { error: _error };
        }

        var racingPromises = [];
        var callbackInterface = fn.length === argsArray.length;
        var promiseInterface = fnReturn && typeof fnReturn.then === 'function';

        if (callbackInterface && promiseInterface) {
          return {
            error: new Error('function uses multiple asynchronous interfaces: callback and promise\n' + 'to use the callback interface: do not return a promise\n' + 'to use the promise interface: remove the last argument to the function')
          };
        } else if (callbackInterface) {
          racingPromises.push(callbackPromise);
        } else if (promiseInterface) {
          racingPromises.push(fnReturn);
        } else {
          return { result: fnReturn };
        }

        var exceptionHandler = void 0;
        var uncaughtExceptionPromise = new _bluebird2.default(function (resolve, reject) {
          exceptionHandler = reject;
          _uncaught_exception_manager2.default.registerHandler(exceptionHandler);
        });
        racingPromises.push(uncaughtExceptionPromise);

        var timeoutId = void 0;
        if (timeoutInMilliseconds >= 0) {
          var timeoutPromise = new _bluebird2.default(function (resolve, reject) {
            timeoutId = _time2.default.setTimeout(function () {
              var timeoutMessage = 'function timed out, ensure the ' + (callbackInterface ? 'callback is executed' : 'promise resolves') + (' within ' + timeoutInMilliseconds + ' milliseconds');
              reject(new Error(timeoutMessage));
            }, timeoutInMilliseconds);
          });
          racingPromises.push(timeoutPromise);
        }

        var error = void 0,
            result = void 0;
        try {
          result = yield _bluebird2.default.race(racingPromises);
        } catch (e) {
          if (e instanceof Error) {
            error = e;
          } else if (e) {
            error = new Error(_util2.default.format(e));
          } else {
            error = new Error('Promise rejected without a reason');
          }
        }

        _time2.default.clearTimeout(timeoutId);
        _uncaught_exception_manager2.default.unregisterHandler(exceptionHandler);

        return { error: error, result: result };
      });

      function run(_x) {
        return _ref2.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return UserCodeRunner;
}();

exports.default = UserCodeRunner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyX2NvZGVfcnVubmVyLmpzIl0sIm5hbWVzIjpbIlVzZXJDb2RlUnVubmVyIiwiYXJnc0FycmF5IiwidGhpc0FyZyIsImZuIiwidGltZW91dEluTWlsbGlzZWNvbmRzIiwiY2FsbGJhY2tQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInB1c2giLCJlcnJvciIsInJlc3VsdCIsImZuUmV0dXJuIiwiYXBwbHkiLCJlIiwiRXJyb3IiLCJmb3JtYXQiLCJyYWNpbmdQcm9taXNlcyIsImNhbGxiYWNrSW50ZXJmYWNlIiwibGVuZ3RoIiwicHJvbWlzZUludGVyZmFjZSIsInRoZW4iLCJleGNlcHRpb25IYW5kbGVyIiwidW5jYXVnaHRFeGNlcHRpb25Qcm9taXNlIiwicmVnaXN0ZXJIYW5kbGVyIiwidGltZW91dElkIiwidGltZW91dFByb21pc2UiLCJzZXRUaW1lb3V0IiwidGltZW91dE1lc3NhZ2UiLCJyYWNlIiwiY2xlYXJUaW1lb3V0IiwidW5yZWdpc3RlckhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs0REFDaUQ7QUFBQSxZQUFqREMsU0FBaUQsUUFBakRBLFNBQWlEO0FBQUEsWUFBdENDLE9BQXNDLFFBQXRDQSxPQUFzQztBQUFBLFlBQTdCQyxFQUE2QixRQUE3QkEsRUFBNkI7QUFBQSxZQUF6QkMscUJBQXlCLFFBQXpCQSxxQkFBeUI7O0FBQ2xFLFlBQU1DLGtCQUFrQix1QkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdkROLG9CQUFVTyxJQUFWLENBQWUsVUFBQ0MsS0FBRCxFQUFRQyxNQUFSLEVBQW1CO0FBQ2hDLGdCQUFJRCxLQUFKLEVBQVc7QUFDVEYscUJBQU9FLEtBQVA7QUFDRCxhQUZELE1BRU87QUFDTEgsc0JBQVFJLE1BQVI7QUFDRDtBQUNGLFdBTkQ7QUFPRCxTQVJ1QixDQUF4Qjs7QUFVQSxZQUFJQyxpQkFBSjtBQUNBLFlBQUk7QUFDRkEscUJBQVdSLEdBQUdTLEtBQUgsQ0FBU1YsT0FBVCxFQUFrQkQsU0FBbEIsQ0FBWDtBQUNELFNBRkQsQ0FFRSxPQUFPWSxDQUFQLEVBQVU7QUFDVixjQUFNSixTQUFRSSxhQUFhQyxLQUFiLEdBQXFCRCxDQUFyQixHQUF5QixJQUFJQyxLQUFKLENBQVUsZUFBS0MsTUFBTCxDQUFZRixDQUFaLENBQVYsQ0FBdkM7QUFDQSxpQkFBTyxFQUFFSixhQUFGLEVBQVA7QUFDRDs7QUFFRCxZQUFNTyxpQkFBaUIsRUFBdkI7QUFDQSxZQUFNQyxvQkFBb0JkLEdBQUdlLE1BQUgsS0FBY2pCLFVBQVVpQixNQUFsRDtBQUNBLFlBQU1DLG1CQUFtQlIsWUFBWSxPQUFPQSxTQUFTUyxJQUFoQixLQUF5QixVQUE5RDs7QUFFQSxZQUFJSCxxQkFBcUJFLGdCQUF6QixFQUEyQztBQUN6QyxpQkFBTztBQUNMVixtQkFBTyxJQUFJSyxLQUFKLENBQ0wsMkVBQ0UsMERBREYsR0FFRSx3RUFIRztBQURGLFdBQVA7QUFPRCxTQVJELE1BUU8sSUFBSUcsaUJBQUosRUFBdUI7QUFDNUJELHlCQUFlUixJQUFmLENBQW9CSCxlQUFwQjtBQUNELFNBRk0sTUFFQSxJQUFJYyxnQkFBSixFQUFzQjtBQUMzQkgseUJBQWVSLElBQWYsQ0FBb0JHLFFBQXBCO0FBQ0QsU0FGTSxNQUVBO0FBQ0wsaUJBQU8sRUFBRUQsUUFBUUMsUUFBVixFQUFQO0FBQ0Q7O0FBRUQsWUFBSVUseUJBQUo7QUFDQSxZQUFNQywyQkFBMkIsdUJBQVksVUFBQ2hCLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNoRWMsNkJBQW1CZCxNQUFuQjtBQUNBLCtDQUF5QmdCLGVBQXpCLENBQXlDRixnQkFBekM7QUFDRCxTQUhnQyxDQUFqQztBQUlBTCx1QkFBZVIsSUFBZixDQUFvQmMsd0JBQXBCOztBQUVBLFlBQUlFLGtCQUFKO0FBQ0EsWUFBSXBCLHlCQUF5QixDQUE3QixFQUFnQztBQUM5QixjQUFNcUIsaUJBQWlCLHVCQUFZLFVBQUNuQixPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdERpQix3QkFBWSxlQUFLRSxVQUFMLENBQWdCLFlBQU07QUFDaEMsa0JBQU1DLGlCQUNKLHFDQUNDVixvQkFBb0Isc0JBQXBCLEdBQTZDLGtCQUQ5QyxrQkFFV2IscUJBRlgsbUJBREY7QUFJQUcscUJBQU8sSUFBSU8sS0FBSixDQUFVYSxjQUFWLENBQVA7QUFDRCxhQU5XLEVBTVR2QixxQkFOUyxDQUFaO0FBT0QsV0FSc0IsQ0FBdkI7QUFTQVkseUJBQWVSLElBQWYsQ0FBb0JpQixjQUFwQjtBQUNEOztBQUVELFlBQUloQixjQUFKO0FBQUEsWUFBV0MsZUFBWDtBQUNBLFlBQUk7QUFDRkEsbUJBQVMsTUFBTSxtQkFBUWtCLElBQVIsQ0FBYVosY0FBYixDQUFmO0FBQ0QsU0FGRCxDQUVFLE9BQU9ILENBQVAsRUFBVTtBQUNWLGNBQUlBLGFBQWFDLEtBQWpCLEVBQXdCO0FBQ3RCTCxvQkFBUUksQ0FBUjtBQUNELFdBRkQsTUFFTyxJQUFJQSxDQUFKLEVBQU87QUFDWkosb0JBQVEsSUFBSUssS0FBSixDQUFVLGVBQUtDLE1BQUwsQ0FBWUYsQ0FBWixDQUFWLENBQVI7QUFDRCxXQUZNLE1BRUE7QUFDTEosb0JBQVEsSUFBSUssS0FBSixDQUFVLG1DQUFWLENBQVI7QUFDRDtBQUNGOztBQUVELHVCQUFLZSxZQUFMLENBQWtCTCxTQUFsQjtBQUNBLDZDQUF5Qk0saUJBQXpCLENBQTJDVCxnQkFBM0M7O0FBRUEsZUFBTyxFQUFFWixZQUFGLEVBQVNDLGNBQVQsRUFBUDtBQUNELE87Ozs7Ozs7Ozs7OztrQkE5RWtCVixjIiwiZmlsZSI6InVzZXJfY29kZV9ydW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCBUaW1lIGZyb20gJy4vdGltZSdcbmltcG9ydCBVbmNhdWdodEV4Y2VwdGlvbk1hbmFnZXIgZnJvbSAnLi91bmNhdWdodF9leGNlcHRpb25fbWFuYWdlcidcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDb2RlUnVubmVyIHtcbiAgc3RhdGljIGFzeW5jIHJ1bih7IGFyZ3NBcnJheSwgdGhpc0FyZywgZm4sIHRpbWVvdXRJbk1pbGxpc2Vjb25kcyB9KSB7XG4gICAgY29uc3QgY2FsbGJhY2tQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXJnc0FycmF5LnB1c2goKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBsZXQgZm5SZXR1cm5cbiAgICB0cnkge1xuICAgICAgZm5SZXR1cm4gPSBmbi5hcHBseSh0aGlzQXJnLCBhcmdzQXJyYXkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc3QgZXJyb3IgPSBlIGluc3RhbmNlb2YgRXJyb3IgPyBlIDogbmV3IEVycm9yKHV0aWwuZm9ybWF0KGUpKVxuICAgICAgcmV0dXJuIHsgZXJyb3IgfVxuICAgIH1cblxuICAgIGNvbnN0IHJhY2luZ1Byb21pc2VzID0gW11cbiAgICBjb25zdCBjYWxsYmFja0ludGVyZmFjZSA9IGZuLmxlbmd0aCA9PT0gYXJnc0FycmF5Lmxlbmd0aFxuICAgIGNvbnN0IHByb21pc2VJbnRlcmZhY2UgPSBmblJldHVybiAmJiB0eXBlb2YgZm5SZXR1cm4udGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuXG4gICAgaWYgKGNhbGxiYWNrSW50ZXJmYWNlICYmIHByb21pc2VJbnRlcmZhY2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVycm9yOiBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2Z1bmN0aW9uIHVzZXMgbXVsdGlwbGUgYXN5bmNocm9ub3VzIGludGVyZmFjZXM6IGNhbGxiYWNrIGFuZCBwcm9taXNlXFxuJyArXG4gICAgICAgICAgICAndG8gdXNlIHRoZSBjYWxsYmFjayBpbnRlcmZhY2U6IGRvIG5vdCByZXR1cm4gYSBwcm9taXNlXFxuJyArXG4gICAgICAgICAgICAndG8gdXNlIHRoZSBwcm9taXNlIGludGVyZmFjZTogcmVtb3ZlIHRoZSBsYXN0IGFyZ3VtZW50IHRvIHRoZSBmdW5jdGlvbidcbiAgICAgICAgKSxcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrSW50ZXJmYWNlKSB7XG4gICAgICByYWNpbmdQcm9taXNlcy5wdXNoKGNhbGxiYWNrUHJvbWlzZSlcbiAgICB9IGVsc2UgaWYgKHByb21pc2VJbnRlcmZhY2UpIHtcbiAgICAgIHJhY2luZ1Byb21pc2VzLnB1c2goZm5SZXR1cm4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHJlc3VsdDogZm5SZXR1cm4gfVxuICAgIH1cblxuICAgIGxldCBleGNlcHRpb25IYW5kbGVyXG4gICAgY29uc3QgdW5jYXVnaHRFeGNlcHRpb25Qcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZXhjZXB0aW9uSGFuZGxlciA9IHJlamVjdFxuICAgICAgVW5jYXVnaHRFeGNlcHRpb25NYW5hZ2VyLnJlZ2lzdGVySGFuZGxlcihleGNlcHRpb25IYW5kbGVyKVxuICAgIH0pXG4gICAgcmFjaW5nUHJvbWlzZXMucHVzaCh1bmNhdWdodEV4Y2VwdGlvblByb21pc2UpXG5cbiAgICBsZXQgdGltZW91dElkXG4gICAgaWYgKHRpbWVvdXRJbk1pbGxpc2Vjb25kcyA+PSAwKSB7XG4gICAgICBjb25zdCB0aW1lb3V0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGltZW91dElkID0gVGltZS5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCB0aW1lb3V0TWVzc2FnZSA9XG4gICAgICAgICAgICAnZnVuY3Rpb24gdGltZWQgb3V0LCBlbnN1cmUgdGhlICcgK1xuICAgICAgICAgICAgKGNhbGxiYWNrSW50ZXJmYWNlID8gJ2NhbGxiYWNrIGlzIGV4ZWN1dGVkJyA6ICdwcm9taXNlIHJlc29sdmVzJykgK1xuICAgICAgICAgICAgYCB3aXRoaW4gJHt0aW1lb3V0SW5NaWxsaXNlY29uZHN9IG1pbGxpc2Vjb25kc2BcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKHRpbWVvdXRNZXNzYWdlKSlcbiAgICAgICAgfSwgdGltZW91dEluTWlsbGlzZWNvbmRzKVxuICAgICAgfSlcbiAgICAgIHJhY2luZ1Byb21pc2VzLnB1c2godGltZW91dFByb21pc2UpXG4gICAgfVxuXG4gICAgbGV0IGVycm9yLCByZXN1bHRcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5yYWNlKHJhY2luZ1Byb21pc2VzKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgZXJyb3IgPSBlXG4gICAgICB9IGVsc2UgaWYgKGUpIHtcbiAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IodXRpbC5mb3JtYXQoZSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvciA9IG5ldyBFcnJvcignUHJvbWlzZSByZWplY3RlZCB3aXRob3V0IGEgcmVhc29uJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBUaW1lLmNsZWFyVGltZW91dCh0aW1lb3V0SWQpXG4gICAgVW5jYXVnaHRFeGNlcHRpb25NYW5hZ2VyLnVucmVnaXN0ZXJIYW5kbGVyKGV4Y2VwdGlvbkhhbmRsZXIpXG5cbiAgICByZXR1cm4geyBlcnJvciwgcmVzdWx0IH1cbiAgfVxufVxuIl19