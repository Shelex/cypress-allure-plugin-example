'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTestCases = exports.getTestCasesFromFilesystem = exports.getExpandedArgv = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var getExpandedArgv = exports.getExpandedArgv = function () {
  var _ref2 = (0, _bluebird.coroutine)(function* (_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd;

    var _ArgvParser$parse = _argv_parser2.default.parse(argv),
        options = _ArgvParser$parse.options;

    var fullArgv = argv;
    var profileArgv = yield new _profile_loader2.default(cwd).getArgv(options.profile);
    if (profileArgv.length > 0) {
      fullArgv = _lodash2.default.concat(argv.slice(0, 2), profileArgv, argv.slice(2));
    }
    return fullArgv;
  });

  return function getExpandedArgv(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getTestCasesFromFilesystem = exports.getTestCasesFromFilesystem = function () {
  var _ref4 = (0, _bluebird.coroutine)(function* (_ref3) {
    var cwd = _ref3.cwd,
        eventBroadcaster = _ref3.eventBroadcaster,
        featureDefaultLanguage = _ref3.featureDefaultLanguage,
        featurePaths = _ref3.featurePaths,
        order = _ref3.order,
        pickleFilter = _ref3.pickleFilter;

    var result = [];
    yield _bluebird2.default.each(featurePaths, function () {
      var _ref5 = (0, _bluebird.coroutine)(function* (featurePath) {
        var source = yield _fs2.default.readFile(featurePath, 'utf8');
        result = result.concat((yield getTestCases({
          eventBroadcaster: eventBroadcaster,
          language: featureDefaultLanguage,
          source: source,
          pickleFilter: pickleFilter,
          uri: _path2.default.relative(cwd, featurePath)
        })));
      });

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());
    orderTestCases(result, order);
    return result;
  });

  return function getTestCasesFromFilesystem(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var getTestCases = exports.getTestCases = function () {
  var _ref7 = (0, _bluebird.coroutine)(function* (_ref6) {
    var eventBroadcaster = _ref6.eventBroadcaster,
        language = _ref6.language,
        pickleFilter = _ref6.pickleFilter,
        source = _ref6.source,
        uri = _ref6.uri;

    var result = [];
    var events = _gherkin2.default.generateEvents(source, uri, {}, language);
    events.forEach(function (event) {
      eventBroadcaster.emit(event.type, _lodash2.default.omit(event, 'type'));
      if (event.type === 'pickle') {
        var pickle = event.pickle;

        if (pickleFilter.matches({ pickle: pickle, uri: uri })) {
          eventBroadcaster.emit('pickle-accepted', { pickle: pickle, uri: uri });
          result.push({ pickle: pickle, uri: uri });
        } else {
          eventBroadcaster.emit('pickle-rejected', { pickle: pickle, uri: uri });
        }
      }
      if (event.type === 'attachment') {
        throw new Error('Parse error in \'' + uri + '\': ' + event.data);
      }
    });
    return result;
  });

  return function getTestCases(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

// Orders the testCases in place - morphs input


exports.orderTestCases = orderTestCases;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _argv_parser = require('./argv_parser');

var _argv_parser2 = _interopRequireDefault(_argv_parser);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _gherkin = require('gherkin');

var _gherkin2 = _interopRequireDefault(_gherkin);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _profile_loader = require('./profile_loader');

var _profile_loader2 = _interopRequireDefault(_profile_loader);

var _knuthShuffleSeeded = require('knuth-shuffle-seeded');

var _knuthShuffleSeeded2 = _interopRequireDefault(_knuthShuffleSeeded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function orderTestCases(testCases, order) {
  var _order$split = order.split(':'),
      _order$split2 = (0, _slicedToArray3.default)(_order$split, 2),
      type = _order$split2[0],
      seed = _order$split2[1];

  switch (type) {
    case 'defined':
      break;
    case 'random':
      if (!seed) {
        seed = Math.floor(Math.random() * 1000 * 1000).toString();
        console.warn('Random order using seed: ' + seed);
      }
      (0, _knuthShuffleSeeded2.default)(testCases, seed);
      break;
    default:
      throw new Error('Unrecgonized order type. Should be `defined` or `random`');
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaGVscGVycy5qcyJdLCJuYW1lcyI6WyJhcmd2IiwiY3dkIiwicGFyc2UiLCJvcHRpb25zIiwiZnVsbEFyZ3YiLCJwcm9maWxlQXJndiIsImdldEFyZ3YiLCJwcm9maWxlIiwibGVuZ3RoIiwiY29uY2F0Iiwic2xpY2UiLCJnZXRFeHBhbmRlZEFyZ3YiLCJldmVudEJyb2FkY2FzdGVyIiwiZmVhdHVyZURlZmF1bHRMYW5ndWFnZSIsImZlYXR1cmVQYXRocyIsIm9yZGVyIiwicGlja2xlRmlsdGVyIiwicmVzdWx0IiwiZWFjaCIsImZlYXR1cmVQYXRoIiwic291cmNlIiwicmVhZEZpbGUiLCJnZXRUZXN0Q2FzZXMiLCJsYW5ndWFnZSIsInVyaSIsInJlbGF0aXZlIiwib3JkZXJUZXN0Q2FzZXMiLCJnZXRUZXN0Q2FzZXNGcm9tRmlsZXN5c3RlbSIsImV2ZW50cyIsImdlbmVyYXRlRXZlbnRzIiwiZm9yRWFjaCIsImVtaXQiLCJldmVudCIsInR5cGUiLCJvbWl0IiwicGlja2xlIiwibWF0Y2hlcyIsInB1c2giLCJFcnJvciIsImRhdGEiLCJ0ZXN0Q2FzZXMiLCJzcGxpdCIsInNlZWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsImNvbnNvbGUiLCJ3YXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3VDQVNPLGlCQUE4QztBQUFBLFFBQWJBLElBQWEsUUFBYkEsSUFBYTtBQUFBLFFBQVBDLEdBQU8sUUFBUEEsR0FBTzs7QUFBQSw0QkFDL0Isc0JBQVdDLEtBQVgsQ0FBaUJGLElBQWpCLENBRCtCO0FBQUEsUUFDM0NHLE9BRDJDLHFCQUMzQ0EsT0FEMkM7O0FBRW5ELFFBQUlDLFdBQVdKLElBQWY7QUFDQSxRQUFNSyxjQUFjLE1BQU0sNkJBQWtCSixHQUFsQixFQUF1QkssT0FBdkIsQ0FBK0JILFFBQVFJLE9BQXZDLENBQTFCO0FBQ0EsUUFBSUYsWUFBWUcsTUFBWixHQUFxQixDQUF6QixFQUE0QjtBQUMx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QSxNQUFNMEIsS0FBTixDQUFZLEdBQVosQ0FENEI7QUFBQTtBQUFBLE1BQzFDUixJQUQwQztBQUFBLE1BQ3BDUyxJQURvQzs7QUFFL0MsVUFBUVQsSUFBUjtBQUNFLFNBQUssU0FBTDtBQUNFO0FBQ0YsU0FBSyxRQUFMO0FBQ0UsVUFBSSxDQUFDUyxJQUFMLEVBQVc7QUFDVEEsZUFBT0MsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCLElBQWhCLEdBQXVCLElBQWxDLEVBQXdDQyxRQUF4QyxFQUFQO0FBQ0FDLGdCQUFRQyxJQUFSLCtCQUF5Q04sSUFBekM7QUFDRDtBQUNELHdDQUFRRixTQUFSLEVBQW1CRSxJQUFuQjtBQUNBO0FBQ0Y7QUFDRSxZQUFNLElBQUlKLEtBQUosQ0FDSiwwREFESSxDQUFOO0FBWEo7QUFlRCIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IEFyZ3ZQYXJzZXIgZnJvbSAnLi9hcmd2X3BhcnNlcidcbmltcG9ydCBmcyBmcm9tICdtei9mcydcbmltcG9ydCBHaGVya2luIGZyb20gJ2doZXJraW4nXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFByb2ZpbGVMb2FkZXIgZnJvbSAnLi9wcm9maWxlX2xvYWRlcidcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IHNodWZmbGUgZnJvbSAna251dGgtc2h1ZmZsZS1zZWVkZWQnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRFeHBhbmRlZEFyZ3YoeyBhcmd2LCBjd2QgfSkge1xuICBjb25zdCB7IG9wdGlvbnMgfSA9IEFyZ3ZQYXJzZXIucGFyc2UoYXJndilcbiAgbGV0IGZ1bGxBcmd2ID0gYXJndlxuICBjb25zdCBwcm9maWxlQXJndiA9IGF3YWl0IG5ldyBQcm9maWxlTG9hZGVyKGN3ZCkuZ2V0QXJndihvcHRpb25zLnByb2ZpbGUpXG4gIGlmIChwcm9maWxlQXJndi5sZW5ndGggPiAwKSB7XG4gICAgZnVsbEFyZ3YgPSBfLmNvbmNhdChhcmd2LnNsaWNlKDAsIDIpLCBwcm9maWxlQXJndiwgYXJndi5zbGljZSgyKSlcbiAgfVxuICByZXR1cm4gZnVsbEFyZ3Zcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlc3RDYXNlc0Zyb21GaWxlc3lzdGVtKHtcbiAgY3dkLFxuICBldmVudEJyb2FkY2FzdGVyLFxuICBmZWF0dXJlRGVmYXVsdExhbmd1YWdlLFxuICBmZWF0dXJlUGF0aHMsXG4gIG9yZGVyLFxuICBwaWNrbGVGaWx0ZXIsXG59KSB7XG4gIGxldCByZXN1bHQgPSBbXVxuICBhd2FpdCBQcm9taXNlLmVhY2goZmVhdHVyZVBhdGhzLCBhc3luYyBmZWF0dXJlUGF0aCA9PiB7XG4gICAgY29uc3Qgc291cmNlID0gYXdhaXQgZnMucmVhZEZpbGUoZmVhdHVyZVBhdGgsICd1dGY4JylcbiAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KFxuICAgICAgYXdhaXQgZ2V0VGVzdENhc2VzKHtcbiAgICAgICAgZXZlbnRCcm9hZGNhc3RlcixcbiAgICAgICAgbGFuZ3VhZ2U6IGZlYXR1cmVEZWZhdWx0TGFuZ3VhZ2UsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgcGlja2xlRmlsdGVyLFxuICAgICAgICB1cmk6IHBhdGgucmVsYXRpdmUoY3dkLCBmZWF0dXJlUGF0aCksXG4gICAgICB9KVxuICAgIClcbiAgfSlcbiAgb3JkZXJUZXN0Q2FzZXMocmVzdWx0LCBvcmRlcilcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VGVzdENhc2VzKHtcbiAgZXZlbnRCcm9hZGNhc3RlcixcbiAgbGFuZ3VhZ2UsXG4gIHBpY2tsZUZpbHRlcixcbiAgc291cmNlLFxuICB1cmksXG59KSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IGV2ZW50cyA9IEdoZXJraW4uZ2VuZXJhdGVFdmVudHMoc291cmNlLCB1cmksIHt9LCBsYW5ndWFnZSlcbiAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgIGV2ZW50QnJvYWRjYXN0ZXIuZW1pdChldmVudC50eXBlLCBfLm9taXQoZXZlbnQsICd0eXBlJykpXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdwaWNrbGUnKSB7XG4gICAgICBjb25zdCB7IHBpY2tsZSB9ID0gZXZlbnRcbiAgICAgIGlmIChwaWNrbGVGaWx0ZXIubWF0Y2hlcyh7IHBpY2tsZSwgdXJpIH0pKSB7XG4gICAgICAgIGV2ZW50QnJvYWRjYXN0ZXIuZW1pdCgncGlja2xlLWFjY2VwdGVkJywgeyBwaWNrbGUsIHVyaSB9KVxuICAgICAgICByZXN1bHQucHVzaCh7IHBpY2tsZSwgdXJpIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudEJyb2FkY2FzdGVyLmVtaXQoJ3BpY2tsZS1yZWplY3RlZCcsIHsgcGlja2xlLCB1cmkgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdhdHRhY2htZW50Jykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJzZSBlcnJvciBpbiAnJHt1cml9JzogJHtldmVudC5kYXRhfWApXG4gICAgfVxuICB9KVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIE9yZGVycyB0aGUgdGVzdENhc2VzIGluIHBsYWNlIC0gbW9ycGhzIGlucHV0XG5leHBvcnQgZnVuY3Rpb24gb3JkZXJUZXN0Q2FzZXModGVzdENhc2VzLCBvcmRlcikge1xuICBsZXQgW3R5cGUsIHNlZWRdID0gb3JkZXIuc3BsaXQoJzonKVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdkZWZpbmVkJzpcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncmFuZG9tJzpcbiAgICAgIGlmICghc2VlZCkge1xuICAgICAgICBzZWVkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCAqIDEwMDApLnRvU3RyaW5nKClcbiAgICAgICAgY29uc29sZS53YXJuKGBSYW5kb20gb3JkZXIgdXNpbmcgc2VlZDogJHtzZWVkfWApXG4gICAgICB9XG4gICAgICBzaHVmZmxlKHRlc3RDYXNlcywgc2VlZClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1VucmVjZ29uaXplZCBvcmRlciB0eXBlLiBTaG91bGQgYmUgYGRlZmluZWRgIG9yIGByYW5kb21gJ1xuICAgICAgKVxuICB9XG59XG4iXX0=