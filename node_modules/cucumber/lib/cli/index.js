'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _helpers = require('../formatter/helpers');

var _helpers2 = require('./helpers');

var _install_validator = require('./install_validator');

var _i18n = require('./i18n');

var I18n = _interopRequireWildcard(_i18n);

var _configuration_builder = require('./configuration_builder');

var _configuration_builder2 = _interopRequireDefault(_configuration_builder);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _builder = require('../formatter/builder');

var _builder2 = _interopRequireDefault(_builder);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pickle_filter = require('../pickle_filter');

var _pickle_filter2 = _interopRequireDefault(_pickle_filter);

var _master = require('../runtime/parallel/master');

var _master2 = _interopRequireDefault(_master);

var _runtime = require('../runtime');

var _runtime2 = _interopRequireDefault(_runtime);

var _support_code_library_builder = require('../support_code_library_builder');

var _support_code_library_builder2 = _interopRequireDefault(_support_code_library_builder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cli = function () {
  function Cli(_ref) {
    var argv = _ref.argv,
        cwd = _ref.cwd,
        stdout = _ref.stdout;
    (0, _classCallCheck3.default)(this, Cli);

    this.argv = argv;
    this.cwd = cwd;
    this.stdout = stdout;
  }

  (0, _createClass3.default)(Cli, [{
    key: 'getConfiguration',
    value: function () {
      var _ref2 = (0, _bluebird.coroutine)(function* () {
        var fullArgv = yield (0, _helpers2.getExpandedArgv)({ argv: this.argv, cwd: this.cwd });
        return _configuration_builder2.default.build({ argv: fullArgv, cwd: this.cwd });
      });

      function getConfiguration() {
        return _ref2.apply(this, arguments);
      }

      return getConfiguration;
    }()
  }, {
    key: 'initializeFormatters',
    value: function () {
      var _ref4 = (0, _bluebird.coroutine)(function* (_ref3) {
        var _this = this;

        var eventBroadcaster = _ref3.eventBroadcaster,
            formatOptions = _ref3.formatOptions,
            formats = _ref3.formats,
            supportCodeLibrary = _ref3.supportCodeLibrary;

        var streamsToClose = [];
        var eventDataCollector = new _helpers.EventDataCollector(eventBroadcaster);
        yield _bluebird2.default.map(formats, function () {
          var _ref6 = (0, _bluebird.coroutine)(function* (_ref5) {
            var _context;

            var type = _ref5.type,
                outputTo = _ref5.outputTo;

            var stream = _this.stdout;
            if (outputTo) {
              var fd = yield _fs2.default.open(_path2.default.resolve(_this.cwd, outputTo), 'w');
              stream = _fs2.default.createWriteStream(null, { fd: fd });
              streamsToClose.push(stream);
            }
            var typeOptions = (0, _extends3.default)({
              eventBroadcaster: eventBroadcaster,
              eventDataCollector: eventDataCollector,
              log: (_context = stream).write.bind(_context),
              stream: stream,
              supportCodeLibrary: supportCodeLibrary
            }, formatOptions);
            return _builder2.default.build(type, typeOptions);
          });

          return function (_x2) {
            return _ref6.apply(this, arguments);
          };
        }());
        return function () {
          return _bluebird2.default.each(streamsToClose, function (stream) {
            return _bluebird2.default.promisify(stream.end.bind(stream))();
          });
        };
      });

      function initializeFormatters(_x) {
        return _ref4.apply(this, arguments);
      }

      return initializeFormatters;
    }()
  }, {
    key: 'getSupportCodeLibrary',
    value: function getSupportCodeLibrary(_ref7) {
      var supportCodeRequiredModules = _ref7.supportCodeRequiredModules,
          supportCodePaths = _ref7.supportCodePaths;

      supportCodeRequiredModules.map(function (module) {
        return require(module);
      });
      _support_code_library_builder2.default.reset(this.cwd);
      supportCodePaths.forEach(function (codePath) {
        return require(codePath);
      });
      return _support_code_library_builder2.default.finalize();
    }
  }, {
    key: 'run',
    value: function () {
      var _ref8 = (0, _bluebird.coroutine)(function* () {
        yield (0, _install_validator.validateInstall)(this.cwd);
        var configuration = yield this.getConfiguration();
        if (configuration.listI18nLanguages) {
          this.stdout.write(I18n.getLanguages());
          return { success: true };
        }
        if (configuration.listI18nKeywordsFor) {
          this.stdout.write(I18n.getKeywords(configuration.listI18nKeywordsFor));
          return { success: true };
        }
        var supportCodeLibrary = this.getSupportCodeLibrary(configuration);
        var eventBroadcaster = new _events2.default();
        var cleanup = yield this.initializeFormatters({
          eventBroadcaster: eventBroadcaster,
          formatOptions: configuration.formatOptions,
          formats: configuration.formats,
          supportCodeLibrary: supportCodeLibrary
        });
        var testCases = yield (0, _helpers2.getTestCasesFromFilesystem)({
          cwd: this.cwd,
          eventBroadcaster: eventBroadcaster,
          featureDefaultLanguage: configuration.featureDefaultLanguage,
          featurePaths: configuration.featurePaths,
          order: configuration.order,
          pickleFilter: new _pickle_filter2.default(configuration.pickleFilterOptions)
        });
        var success = void 0;
        if (configuration.parallel) {
          var parallelRuntimeMaster = new _master2.default({
            eventBroadcaster: eventBroadcaster,
            options: configuration.runtimeOptions,
            supportCodePaths: configuration.supportCodePaths,
            supportCodeRequiredModules: configuration.supportCodeRequiredModules,
            testCases: testCases
          });
          yield new _bluebird2.default(function (resolve) {
            parallelRuntimeMaster.run(configuration.parallel, function (s) {
              success = s;
              resolve();
            });
          });
        } else {
          var runtime = new _runtime2.default({
            eventBroadcaster: eventBroadcaster,
            options: configuration.runtimeOptions,
            supportCodeLibrary: supportCodeLibrary,
            testCases: testCases
          });
          success = yield runtime.start();
        }
        yield cleanup();
        return {
          shouldExitImmediately: configuration.shouldExitImmediately,
          success: success
        };
      });

      function run() {
        return _ref8.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return Cli;
}();

exports.default = Cli;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaW5kZXguanMiXSwibmFtZXMiOlsiSTE4biIsIkNsaSIsImFyZ3YiLCJjd2QiLCJzdGRvdXQiLCJmdWxsQXJndiIsImJ1aWxkIiwiZXZlbnRCcm9hZGNhc3RlciIsImZvcm1hdE9wdGlvbnMiLCJmb3JtYXRzIiwic3VwcG9ydENvZGVMaWJyYXJ5Iiwic3RyZWFtc1RvQ2xvc2UiLCJldmVudERhdGFDb2xsZWN0b3IiLCJtYXAiLCJ0eXBlIiwib3V0cHV0VG8iLCJzdHJlYW0iLCJmZCIsIm9wZW4iLCJyZXNvbHZlIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJwdXNoIiwidHlwZU9wdGlvbnMiLCJsb2ciLCJ3cml0ZSIsImVhY2giLCJwcm9taXNpZnkiLCJlbmQiLCJzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcyIsInN1cHBvcnRDb2RlUGF0aHMiLCJyZXF1aXJlIiwibW9kdWxlIiwicmVzZXQiLCJmb3JFYWNoIiwiY29kZVBhdGgiLCJmaW5hbGl6ZSIsImNvbmZpZ3VyYXRpb24iLCJnZXRDb25maWd1cmF0aW9uIiwibGlzdEkxOG5MYW5ndWFnZXMiLCJnZXRMYW5ndWFnZXMiLCJzdWNjZXNzIiwibGlzdEkxOG5LZXl3b3Jkc0ZvciIsImdldEtleXdvcmRzIiwiZ2V0U3VwcG9ydENvZGVMaWJyYXJ5IiwiY2xlYW51cCIsImluaXRpYWxpemVGb3JtYXR0ZXJzIiwidGVzdENhc2VzIiwiZmVhdHVyZURlZmF1bHRMYW5ndWFnZSIsImZlYXR1cmVQYXRocyIsIm9yZGVyIiwicGlja2xlRmlsdGVyIiwicGlja2xlRmlsdGVyT3B0aW9ucyIsInBhcmFsbGVsIiwicGFyYWxsZWxSdW50aW1lTWFzdGVyIiwib3B0aW9ucyIsInJ1bnRpbWVPcHRpb25zIiwicnVuIiwicyIsInJ1bnRpbWUiLCJzdGFydCIsInNob3VsZEV4aXRJbW1lZGlhdGVseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNB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Y2dCLFFBQXhDLEVBQWtELGFBQUs7QUFDckRaLHdCQUFVaUIsQ0FBVjtBQUNBdEM7QUFDRCxhQUhEO0FBSUQsV0FMSyxDQUFOO0FBTUQsU0FkRCxNQWNPO0FBQ0wsY0FBTXVDLFVBQVUsc0JBQVk7QUFDMUJuRCw4Q0FEMEI7QUFFMUIrQyxxQkFBU2xCLGNBQWNtQixjQUZHO0FBRzFCN0Msa0RBSDBCO0FBSTFCb0M7QUFKMEIsV0FBWixDQUFoQjtBQU1BTixvQkFBVSxNQUFNa0IsUUFBUUMsS0FBUixFQUFoQjtBQUNEO0FBQ0QsY0FBTWYsU0FBTjtBQUNBLGVBQU87QUFDTGdCLGlDQUF1QnhCLGNBQWN3QixxQkFEaEM7QUFFTHBCO0FBRkssU0FBUDtBQUlELE87Ozs7Ozs7Ozs7OztrQkEzR2tCdkMsRyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YUNvbGxlY3RvciB9IGZyb20gJy4uL2Zvcm1hdHRlci9oZWxwZXJzJ1xuaW1wb3J0IHsgZ2V0RXhwYW5kZWRBcmd2LCBnZXRUZXN0Q2FzZXNGcm9tRmlsZXN5c3RlbSB9IGZyb20gJy4vaGVscGVycydcbmltcG9ydCB7IHZhbGlkYXRlSW5zdGFsbCB9IGZyb20gJy4vaW5zdGFsbF92YWxpZGF0b3InXG5pbXBvcnQgKiBhcyBJMThuIGZyb20gJy4vaTE4bidcbmltcG9ydCBDb25maWd1cmF0aW9uQnVpbGRlciBmcm9tICcuL2NvbmZpZ3VyYXRpb25fYnVpbGRlcidcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJ1xuaW1wb3J0IEZvcm1hdHRlckJ1aWxkZXIgZnJvbSAnLi4vZm9ybWF0dGVyL2J1aWxkZXInXG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFBpY2tsZUZpbHRlciBmcm9tICcuLi9waWNrbGVfZmlsdGVyJ1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgUGFyYWxsZWxSdW50aW1lTWFzdGVyIGZyb20gJy4uL3J1bnRpbWUvcGFyYWxsZWwvbWFzdGVyJ1xuaW1wb3J0IFJ1bnRpbWUgZnJvbSAnLi4vcnVudGltZSdcbmltcG9ydCBzdXBwb3J0Q29kZUxpYnJhcnlCdWlsZGVyIGZyb20gJy4uL3N1cHBvcnRfY29kZV9saWJyYXJ5X2J1aWxkZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaSB7XG4gIGNvbnN0cnVjdG9yKHsgYXJndiwgY3dkLCBzdGRvdXQgfSkge1xuICAgIHRoaXMuYXJndiA9IGFyZ3ZcbiAgICB0aGlzLmN3ZCA9IGN3ZFxuICAgIHRoaXMuc3Rkb3V0ID0gc3Rkb3V0XG4gIH1cblxuICBhc3luYyBnZXRDb25maWd1cmF0aW9uKCkge1xuICAgIGNvbnN0IGZ1bGxBcmd2ID0gYXdhaXQgZ2V0RXhwYW5kZWRBcmd2KHsgYXJndjogdGhpcy5hcmd2LCBjd2Q6IHRoaXMuY3dkIH0pXG4gICAgcmV0dXJuIENvbmZpZ3VyYXRpb25CdWlsZGVyLmJ1aWxkKHsgYXJndjogZnVsbEFyZ3YsIGN3ZDogdGhpcy5jd2QgfSlcbiAgfVxuXG4gIGFzeW5jIGluaXRpYWxpemVGb3JtYXR0ZXJzKHtcbiAgICBldmVudEJyb2FkY2FzdGVyLFxuICAgIGZvcm1hdE9wdGlvbnMsXG4gICAgZm9ybWF0cyxcbiAgICBzdXBwb3J0Q29kZUxpYnJhcnksXG4gIH0pIHtcbiAgICBjb25zdCBzdHJlYW1zVG9DbG9zZSA9IFtdXG4gICAgY29uc3QgZXZlbnREYXRhQ29sbGVjdG9yID0gbmV3IEV2ZW50RGF0YUNvbGxlY3RvcihldmVudEJyb2FkY2FzdGVyKVxuICAgIGF3YWl0IFByb21pc2UubWFwKGZvcm1hdHMsIGFzeW5jICh7IHR5cGUsIG91dHB1dFRvIH0pID0+IHtcbiAgICAgIGxldCBzdHJlYW0gPSB0aGlzLnN0ZG91dFxuICAgICAgaWYgKG91dHB1dFRvKSB7XG4gICAgICAgIGNvbnN0IGZkID0gYXdhaXQgZnMub3BlbihwYXRoLnJlc29sdmUodGhpcy5jd2QsIG91dHB1dFRvKSwgJ3cnKVxuICAgICAgICBzdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShudWxsLCB7IGZkIH0pXG4gICAgICAgIHN0cmVhbXNUb0Nsb3NlLnB1c2goc3RyZWFtKVxuICAgICAgfVxuICAgICAgY29uc3QgdHlwZU9wdGlvbnMgPSB7XG4gICAgICAgIGV2ZW50QnJvYWRjYXN0ZXIsXG4gICAgICAgIGV2ZW50RGF0YUNvbGxlY3RvcixcbiAgICAgICAgbG9nOiA6OnN0cmVhbS53cml0ZSxcbiAgICAgICAgc3RyZWFtLFxuICAgICAgICBzdXBwb3J0Q29kZUxpYnJhcnksXG4gICAgICAgIC4uLmZvcm1hdE9wdGlvbnMsXG4gICAgICB9XG4gICAgICByZXR1cm4gRm9ybWF0dGVyQnVpbGRlci5idWlsZCh0eXBlLCB0eXBlT3B0aW9ucylcbiAgICB9KVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmVhY2goc3RyZWFtc1RvQ2xvc2UsIHN0cmVhbSA9PlxuICAgICAgICBQcm9taXNlLnByb21pc2lmeSg6OnN0cmVhbS5lbmQpKClcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBnZXRTdXBwb3J0Q29kZUxpYnJhcnkoeyBzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcywgc3VwcG9ydENvZGVQYXRocyB9KSB7XG4gICAgc3VwcG9ydENvZGVSZXF1aXJlZE1vZHVsZXMubWFwKG1vZHVsZSA9PiByZXF1aXJlKG1vZHVsZSkpXG4gICAgc3VwcG9ydENvZGVMaWJyYXJ5QnVpbGRlci5yZXNldCh0aGlzLmN3ZClcbiAgICBzdXBwb3J0Q29kZVBhdGhzLmZvckVhY2goY29kZVBhdGggPT4gcmVxdWlyZShjb2RlUGF0aCkpXG4gICAgcmV0dXJuIHN1cHBvcnRDb2RlTGlicmFyeUJ1aWxkZXIuZmluYWxpemUoKVxuICB9XG5cbiAgYXN5bmMgcnVuKCkge1xuICAgIGF3YWl0IHZhbGlkYXRlSW5zdGFsbCh0aGlzLmN3ZClcbiAgICBjb25zdCBjb25maWd1cmF0aW9uID0gYXdhaXQgdGhpcy5nZXRDb25maWd1cmF0aW9uKClcbiAgICBpZiAoY29uZmlndXJhdGlvbi5saXN0STE4bkxhbmd1YWdlcykge1xuICAgICAgdGhpcy5zdGRvdXQud3JpdGUoSTE4bi5nZXRMYW5ndWFnZXMoKSlcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICAgIH1cbiAgICBpZiAoY29uZmlndXJhdGlvbi5saXN0STE4bktleXdvcmRzRm9yKSB7XG4gICAgICB0aGlzLnN0ZG91dC53cml0ZShJMThuLmdldEtleXdvcmRzKGNvbmZpZ3VyYXRpb24ubGlzdEkxOG5LZXl3b3Jkc0ZvcikpXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgICB9XG4gICAgY29uc3Qgc3VwcG9ydENvZGVMaWJyYXJ5ID0gdGhpcy5nZXRTdXBwb3J0Q29kZUxpYnJhcnkoY29uZmlndXJhdGlvbilcbiAgICBjb25zdCBldmVudEJyb2FkY2FzdGVyID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gICAgY29uc3QgY2xlYW51cCA9IGF3YWl0IHRoaXMuaW5pdGlhbGl6ZUZvcm1hdHRlcnMoe1xuICAgICAgZXZlbnRCcm9hZGNhc3RlcixcbiAgICAgIGZvcm1hdE9wdGlvbnM6IGNvbmZpZ3VyYXRpb24uZm9ybWF0T3B0aW9ucyxcbiAgICAgIGZvcm1hdHM6IGNvbmZpZ3VyYXRpb24uZm9ybWF0cyxcbiAgICAgIHN1cHBvcnRDb2RlTGlicmFyeSxcbiAgICB9KVxuICAgIGNvbnN0IHRlc3RDYXNlcyA9IGF3YWl0IGdldFRlc3RDYXNlc0Zyb21GaWxlc3lzdGVtKHtcbiAgICAgIGN3ZDogdGhpcy5jd2QsXG4gICAgICBldmVudEJyb2FkY2FzdGVyLFxuICAgICAgZmVhdHVyZURlZmF1bHRMYW5ndWFnZTogY29uZmlndXJhdGlvbi5mZWF0dXJlRGVmYXVsdExhbmd1YWdlLFxuICAgICAgZmVhdHVyZVBhdGhzOiBjb25maWd1cmF0aW9uLmZlYXR1cmVQYXRocyxcbiAgICAgIG9yZGVyOiBjb25maWd1cmF0aW9uLm9yZGVyLFxuICAgICAgcGlja2xlRmlsdGVyOiBuZXcgUGlja2xlRmlsdGVyKGNvbmZpZ3VyYXRpb24ucGlja2xlRmlsdGVyT3B0aW9ucyksXG4gICAgfSlcbiAgICBsZXQgc3VjY2Vzc1xuICAgIGlmIChjb25maWd1cmF0aW9uLnBhcmFsbGVsKSB7XG4gICAgICBjb25zdCBwYXJhbGxlbFJ1bnRpbWVNYXN0ZXIgPSBuZXcgUGFyYWxsZWxSdW50aW1lTWFzdGVyKHtcbiAgICAgICAgZXZlbnRCcm9hZGNhc3RlcixcbiAgICAgICAgb3B0aW9uczogY29uZmlndXJhdGlvbi5ydW50aW1lT3B0aW9ucyxcbiAgICAgICAgc3VwcG9ydENvZGVQYXRoczogY29uZmlndXJhdGlvbi5zdXBwb3J0Q29kZVBhdGhzLFxuICAgICAgICBzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlczogY29uZmlndXJhdGlvbi5zdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcyxcbiAgICAgICAgdGVzdENhc2VzLFxuICAgICAgfSlcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBwYXJhbGxlbFJ1bnRpbWVNYXN0ZXIucnVuKGNvbmZpZ3VyYXRpb24ucGFyYWxsZWwsIHMgPT4ge1xuICAgICAgICAgIHN1Y2Nlc3MgPSBzXG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBydW50aW1lID0gbmV3IFJ1bnRpbWUoe1xuICAgICAgICBldmVudEJyb2FkY2FzdGVyLFxuICAgICAgICBvcHRpb25zOiBjb25maWd1cmF0aW9uLnJ1bnRpbWVPcHRpb25zLFxuICAgICAgICBzdXBwb3J0Q29kZUxpYnJhcnksXG4gICAgICAgIHRlc3RDYXNlcyxcbiAgICAgIH0pXG4gICAgICBzdWNjZXNzID0gYXdhaXQgcnVudGltZS5zdGFydCgpXG4gICAgfVxuICAgIGF3YWl0IGNsZWFudXAoKVxuICAgIHJldHVybiB7XG4gICAgICBzaG91bGRFeGl0SW1tZWRpYXRlbHk6IGNvbmZpZ3VyYXRpb24uc2hvdWxkRXhpdEltbWVkaWF0ZWx5LFxuICAgICAgc3VjY2VzcyxcbiAgICB9XG4gIH1cbn1cbiJdfQ==