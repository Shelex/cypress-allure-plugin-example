'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _argv_parser = require('./argv_parser');

var _argv_parser2 = _interopRequireDefault(_argv_parser);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _option_splitter = require('./option_splitter');

var _option_splitter2 = _interopRequireDefault(_option_splitter);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globP = (0, _bluebird.promisify)(_glob2.default);

var ConfigurationBuilder = function () {
  (0, _createClass3.default)(ConfigurationBuilder, null, [{
    key: 'build',
    value: function () {
      var _ref = (0, _bluebird.coroutine)(function* (options) {
        var builder = new ConfigurationBuilder(options);
        return builder.build();
      });

      function build(_x) {
        return _ref.apply(this, arguments);
      }

      return build;
    }()
  }]);

  function ConfigurationBuilder(_ref2) {
    var argv = _ref2.argv,
        cwd = _ref2.cwd;
    (0, _classCallCheck3.default)(this, ConfigurationBuilder);

    this.cwd = cwd;

    var parsedArgv = _argv_parser2.default.parse(argv);
    this.args = parsedArgv.args;
    this.options = parsedArgv.options;
  }

  (0, _createClass3.default)(ConfigurationBuilder, [{
    key: 'build',
    value: function () {
      var _ref3 = (0, _bluebird.coroutine)(function* () {
        var listI18nKeywordsFor = this.options.i18nKeywords;
        var listI18nLanguages = !!this.options.i18nLanguages;
        var unexpandedFeaturePaths = yield this.getUnexpandedFeaturePaths();
        var featurePaths = [];
        var supportCodePaths = [];
        if (!listI18nKeywordsFor && !listI18nLanguages) {
          featurePaths = yield this.expandFeaturePaths(unexpandedFeaturePaths);
          var unexpandedSupportCodePaths = this.options.require;
          if (unexpandedSupportCodePaths.length === 0) {
            unexpandedSupportCodePaths = this.getFeatureDirectoryPaths(featurePaths);
          }
          supportCodePaths = yield this.expandPaths(unexpandedSupportCodePaths, '.js');
        }
        return {
          featureDefaultLanguage: this.options.language,
          featurePaths: featurePaths,
          formats: this.getFormats(),
          formatOptions: this.getFormatOptions(),
          listI18nKeywordsFor: listI18nKeywordsFor,
          listI18nLanguages: listI18nLanguages,
          order: this.options.order,
          parallel: this.options.parallel,
          profiles: this.options.profile,
          pickleFilterOptions: {
            featurePaths: unexpandedFeaturePaths,
            names: this.options.name,
            tagExpression: this.options.tags
          },
          runtimeOptions: {
            dryRun: !!this.options.dryRun,
            failFast: !!this.options.failFast,
            filterStacktraces: !this.options.backtrace,
            strict: !!this.options.strict,
            worldParameters: this.options.worldParameters
          },
          shouldExitImmediately: !!this.options.exit,
          supportCodePaths: supportCodePaths,
          supportCodeRequiredModules: this.options.requireModule
        };
      });

      function build() {
        return _ref3.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: 'expandPaths',
    value: function () {
      var _ref4 = (0, _bluebird.coroutine)(function* (unexpandedPaths, defaultExtension) {
        var _this = this;

        var expandedPaths = yield _bluebird2.default.map(unexpandedPaths, function () {
          var _ref5 = (0, _bluebird.coroutine)(function* (unexpandedPath) {
            var matches = yield globP(unexpandedPath, {
              absolute: true,
              cwd: _this.cwd
            });
            return _bluebird2.default.map(matches, function () {
              var _ref6 = (0, _bluebird.coroutine)(function* (match) {
                if (_path2.default.extname(match) === '') {
                  return globP(match + '/**/*' + defaultExtension);
                }
                return match;
              });

              return function (_x5) {
                return _ref6.apply(this, arguments);
              };
            }());
          });

          return function (_x4) {
            return _ref5.apply(this, arguments);
          };
        }());
        return _lodash2.default.flattenDepth(expandedPaths, 2).map(function (x) {
          return _path2.default.normalize(x);
        });
      });

      function expandPaths(_x2, _x3) {
        return _ref4.apply(this, arguments);
      }

      return expandPaths;
    }()
  }, {
    key: 'expandFeaturePaths',
    value: function () {
      var _ref7 = (0, _bluebird.coroutine)(function* (featurePaths) {
        featurePaths = featurePaths.map(function (p) {
          return p.replace(/(:\d+)*$/g, '');
        }); // Strip line numbers
        return this.expandPaths(featurePaths, '.feature');
      });

      function expandFeaturePaths(_x6) {
        return _ref7.apply(this, arguments);
      }

      return expandFeaturePaths;
    }()
  }, {
    key: 'getFeatureDirectoryPaths',
    value: function getFeatureDirectoryPaths(featurePaths) {
      var _this2 = this;

      var featureDirs = featurePaths.map(function (featurePath) {
        var featureDir = _path2.default.dirname(featurePath);
        var childDir = void 0;
        var parentDir = featureDir;
        while (childDir !== parentDir) {
          childDir = parentDir;
          parentDir = _path2.default.dirname(childDir);
          if (_path2.default.basename(parentDir) === 'features') {
            featureDir = parentDir;
            break;
          }
        }
        return _path2.default.relative(_this2.cwd, featureDir);
      });
      return _lodash2.default.uniq(featureDirs);
    }
  }, {
    key: 'getFormatOptions',
    value: function getFormatOptions() {
      var formatOptions = _lodash2.default.clone(this.options.formatOptions);
      formatOptions.cwd = this.cwd;
      _lodash2.default.defaults(formatOptions, { colorsEnabled: true });
      return formatOptions;
    }
  }, {
    key: 'getFormats',
    value: function getFormats() {
      var mapping = { '': 'progress' };
      this.options.format.forEach(function (format) {
        var _OptionSplitter$split = _option_splitter2.default.split(format),
            _OptionSplitter$split2 = (0, _slicedToArray3.default)(_OptionSplitter$split, 2),
            type = _OptionSplitter$split2[0],
            outputTo = _OptionSplitter$split2[1];

        mapping[outputTo || ''] = type;
      });
      return _lodash2.default.map(mapping, function (type, outputTo) {
        return { outputTo: outputTo, type: type };
      });
    }
  }, {
    key: 'getUnexpandedFeaturePaths',
    value: function () {
      var _ref8 = (0, _bluebird.coroutine)(function* () {
        var _this3 = this;

        if (this.args.length > 0) {
          var nestedFeaturePaths = yield _bluebird2.default.map(this.args, function () {
            var _ref9 = (0, _bluebird.coroutine)(function* (arg) {
              var filename = _path2.default.basename(arg);
              if (filename[0] === '@') {
                var filePath = _path2.default.join(_this3.cwd, arg);
                var content = yield _fs2.default.readFile(filePath, 'utf8');
                return _lodash2.default.chain(content).split('\n').map(_lodash2.default.trim).compact().value();
              }
              return arg;
            });

            return function (_x7) {
              return _ref9.apply(this, arguments);
            };
          }());
          var featurePaths = _lodash2.default.flatten(nestedFeaturePaths);
          if (featurePaths.length > 0) {
            return featurePaths;
          }
        }
        return ['features/**/*.feature'];
      });

      function getUnexpandedFeaturePaths() {
        return _ref8.apply(this, arguments);
      }

      return getUnexpandedFeaturePaths;
    }()
  }]);
  return ConfigurationBuilder;
}();

exports.default = ConfigurationBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY29uZmlndXJhdGlvbl9idWlsZGVyLmpzIl0sIm5hbWVzIjpbImdsb2JQIiwiQ29uZmlndXJhdGlvbkJ1aWxkZXIiLCJvcHRpb25zIiwiYnVpbGRlciIsImJ1aWxkIiwiYXJndiIsImN3ZCIsInBhcnNlZEFyZ3YiLCJwYXJzZSIsImFyZ3MiLCJsaXN0STE4bktleXdvcmRzRm9yIiwiaTE4bktleXdvcmRzIiwibGlzdEkxOG5MYW5ndWFnZXMiLCJpMThuTGFuZ3VhZ2VzIiwidW5leHBhbmRlZEZlYXR1cmVQYXRocyIsImdldFVuZXhwYW5kZWRGZWF0dXJlUGF0aHMiLCJmZWF0dXJlUGF0aHMiLCJzdXBwb3J0Q29kZVBhdGhzIiwiZXhwYW5kRmVhdHVyZVBhdGhzIiwidW5leHBhbmRlZFN1cHBvcnRDb2RlUGF0aHMiLCJyZXF1aXJlIiwibGVuZ3RoIiwiZ2V0RmVhdHVyZURpcmVjdG9yeVBhdGhzIiwiZXhwYW5kUGF0aHMiLCJmZWF0dXJlRGVmYXVsdExhbmd1YWdlIiwibGFuZ3VhZ2UiLCJmb3JtYXRzIiwiZ2V0Rm9ybWF0cyIsImZvcm1hdE9wdGlvbnMiLCJnZXRGb3JtYXRPcHRpb25zIiwib3JkZXIiLCJwYXJhbGxlbCIsInByb2ZpbGVzIiwicHJvZmlsZSIsInBpY2tsZUZpbHRlck9wdGlvbnMiLCJuYW1lcyIsIm5hbWUiLCJ0YWdFeHByZXNzaW9uIiwidGFncyIsInJ1bnRpbWVPcHRpb25zIiwiZHJ5UnVuIiwiZmFpbEZhc3QiLCJmaWx0ZXJTdGFja3RyYWNlcyIsImJhY2t0cmFjZSIsInN0cmljdCIsIndvcmxkUGFyYW1ldGVycyIsInNob3VsZEV4aXRJbW1lZGlhdGVseSIsImV4aXQiLCJzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcyIsInJlcXVpcmVNb2R1bGUiLCJ1bmV4cGFuZGVkUGF0aHMiLCJkZWZhdWx0RXh0ZW5zaW9uIiwiZXhwYW5kZWRQYXRocyIsIm1hcCIsInVuZXhwYW5kZWRQYXRoIiwibWF0Y2hlcyIsImFic29sdXRlIiwibWF0Y2giLCJleHRuYW1lIiwiZmxhdHRlbkRlcHRoIiwibm9ybWFsaXplIiwieCIsInAiLCJyZXBsYWNlIiwiZmVhdHVyZURpcnMiLCJmZWF0dXJlRGlyIiwiZGlybmFtZSIsImZlYXR1cmVQYXRoIiwiY2hpbGREaXIiLCJwYXJlbnREaXIiLCJiYXNlbmFtZSIsInJlbGF0aXZlIiwidW5pcSIsImNsb25lIiwiZGVmYXVsdHMiLCJjb2xvcnNFbmFibGVkIiwibWFwcGluZyIsImZvcm1hdCIsImZvckVhY2giLCJzcGxpdCIsInR5cGUiLCJvdXRwdXRUbyIsIm5lc3RlZEZlYXR1cmVQYXRocyIsImFyZyIsImZpbGVuYW1lIiwiZmlsZVBhdGgiLCJqb2luIiwiY29udGVudCIsInJlYWRGaWxlIiwiY2hhaW4iLCJ0cmltIiwiY29tcGFjdCIsInZhbHVlIiwiZmxhdHRlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsUUFBUSx3Q0FBZDs7SUFFcUJDLG9COzs7O3FEQUNBQyxPLEVBQVM7QUFDMUIsWUFBTUMsVUFBVSxJQUFJRixvQkFBSixDQUF5QkMsT0FBekIsQ0FBaEI7QUFDQSxlQUFPQyxRQUFRQyxLQUFSLEVBQVA7QUFDRCxPOzs7Ozs7Ozs7O0FBRUQsdUNBQTJCO0FBQUEsUUFBYkMsSUFBYSxTQUFiQSxJQUFhO0FBQUEsUUFBUEMsR0FBTyxTQUFQQSxHQUFPO0FBQUE7O0FBQ3pCLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDs7QUFFQSxRQUFNQyxhQUFhLHNCQUFXQyxLQUFYLENBQWlCSCxJQUFqQixDQUFuQjtBQUNBLFNBQUtJLElBQUwsR0FBWUYsV0FBV0UsSUFBdkI7QUFDQSxTQUFLUCxPQUFMLEdBQWVLLFdBQVdMLE9BQTFCO0FBQ0Q7Ozs7O3dEQUVhO0FBQ1osWUFBTVEsc0JBQXNCLEtBQUtSLE9BQUwsQ0FBYVMsWUFBekM7QUFDQSxZQUFNQyxvQkFBb0Is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ZUFBTyxDQUFDLHVCQUFELENBQVA7QUFDRCxPOzs7Ozs7Ozs7Ozs7a0JBMUlrQmYsb0IiLCJmaWxlIjoiY29uZmlndXJhdGlvbl9idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IEFyZ3ZQYXJzZXIgZnJvbSAnLi9hcmd2X3BhcnNlcidcbmltcG9ydCBmcyBmcm9tICdtei9mcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgT3B0aW9uU3BsaXR0ZXIgZnJvbSAnLi9vcHRpb25fc3BsaXR0ZXInXG5pbXBvcnQgUHJvbWlzZSwgeyBwcm9taXNpZnkgfSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXG5cbmNvbnN0IGdsb2JQID0gcHJvbWlzaWZ5KGdsb2IpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpZ3VyYXRpb25CdWlsZGVyIHtcbiAgc3RhdGljIGFzeW5jIGJ1aWxkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBidWlsZGVyID0gbmV3IENvbmZpZ3VyYXRpb25CdWlsZGVyKG9wdGlvbnMpXG4gICAgcmV0dXJuIGJ1aWxkZXIuYnVpbGQoKVxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBhcmd2LCBjd2QgfSkge1xuICAgIHRoaXMuY3dkID0gY3dkXG5cbiAgICBjb25zdCBwYXJzZWRBcmd2ID0gQXJndlBhcnNlci5wYXJzZShhcmd2KVxuICAgIHRoaXMuYXJncyA9IHBhcnNlZEFyZ3YuYXJnc1xuICAgIHRoaXMub3B0aW9ucyA9IHBhcnNlZEFyZ3Yub3B0aW9uc1xuICB9XG5cbiAgYXN5bmMgYnVpbGQoKSB7XG4gICAgY29uc3QgbGlzdEkxOG5LZXl3b3Jkc0ZvciA9IHRoaXMub3B0aW9ucy5pMThuS2V5d29yZHNcbiAgICBjb25zdCBsaXN0STE4bkxhbmd1YWdlcyA9ICEhdGhpcy5vcHRpb25zLmkxOG5MYW5ndWFnZXNcbiAgICBjb25zdCB1bmV4cGFuZGVkRmVhdHVyZVBhdGhzID0gYXdhaXQgdGhpcy5nZXRVbmV4cGFuZGVkRmVhdHVyZVBhdGhzKClcbiAgICBsZXQgZmVhdHVyZVBhdGhzID0gW11cbiAgICBsZXQgc3VwcG9ydENvZGVQYXRocyA9IFtdXG4gICAgaWYgKCFsaXN0STE4bktleXdvcmRzRm9yICYmICFsaXN0STE4bkxhbmd1YWdlcykge1xuICAgICAgZmVhdHVyZVBhdGhzID0gYXdhaXQgdGhpcy5leHBhbmRGZWF0dXJlUGF0aHModW5leHBhbmRlZEZlYXR1cmVQYXRocylcbiAgICAgIGxldCB1bmV4cGFuZGVkU3VwcG9ydENvZGVQYXRocyA9IHRoaXMub3B0aW9ucy5yZXF1aXJlXG4gICAgICBpZiAodW5leHBhbmRlZFN1cHBvcnRDb2RlUGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHVuZXhwYW5kZWRTdXBwb3J0Q29kZVBhdGhzID0gdGhpcy5nZXRGZWF0dXJlRGlyZWN0b3J5UGF0aHMoZmVhdHVyZVBhdGhzKVxuICAgICAgfVxuICAgICAgc3VwcG9ydENvZGVQYXRocyA9IGF3YWl0IHRoaXMuZXhwYW5kUGF0aHMoXG4gICAgICAgIHVuZXhwYW5kZWRTdXBwb3J0Q29kZVBhdGhzLFxuICAgICAgICAnLmpzJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZmVhdHVyZURlZmF1bHRMYW5ndWFnZTogdGhpcy5vcHRpb25zLmxhbmd1YWdlLFxuICAgICAgZmVhdHVyZVBhdGhzLFxuICAgICAgZm9ybWF0czogdGhpcy5nZXRGb3JtYXRzKCksXG4gICAgICBmb3JtYXRPcHRpb25zOiB0aGlzLmdldEZvcm1hdE9wdGlvbnMoKSxcbiAgICAgIGxpc3RJMThuS2V5d29yZHNGb3IsXG4gICAgICBsaXN0STE4bkxhbmd1YWdlcyxcbiAgICAgIG9yZGVyOiB0aGlzLm9wdGlvbnMub3JkZXIsXG4gICAgICBwYXJhbGxlbDogdGhpcy5vcHRpb25zLnBhcmFsbGVsLFxuICAgICAgcHJvZmlsZXM6IHRoaXMub3B0aW9ucy5wcm9maWxlLFxuICAgICAgcGlja2xlRmlsdGVyT3B0aW9uczoge1xuICAgICAgICBmZWF0dXJlUGF0aHM6IHVuZXhwYW5kZWRGZWF0dXJlUGF0aHMsXG4gICAgICAgIG5hbWVzOiB0aGlzLm9wdGlvbnMubmFtZSxcbiAgICAgICAgdGFnRXhwcmVzc2lvbjogdGhpcy5vcHRpb25zLnRhZ3MsXG4gICAgICB9LFxuICAgICAgcnVudGltZU9wdGlvbnM6IHtcbiAgICAgICAgZHJ5UnVuOiAhIXRoaXMub3B0aW9ucy5kcnlSdW4sXG4gICAgICAgIGZhaWxGYXN0OiAhIXRoaXMub3B0aW9ucy5mYWlsRmFzdCxcbiAgICAgICAgZmlsdGVyU3RhY2t0cmFjZXM6ICF0aGlzLm9wdGlvbnMuYmFja3RyYWNlLFxuICAgICAgICBzdHJpY3Q6ICEhdGhpcy5vcHRpb25zLnN0cmljdCxcbiAgICAgICAgd29ybGRQYXJhbWV0ZXJzOiB0aGlzLm9wdGlvbnMud29ybGRQYXJhbWV0ZXJzLFxuICAgICAgfSxcbiAgICAgIHNob3VsZEV4aXRJbW1lZGlhdGVseTogISF0aGlzLm9wdGlvbnMuZXhpdCxcbiAgICAgIHN1cHBvcnRDb2RlUGF0aHMsXG4gICAgICBzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlczogdGhpcy5vcHRpb25zLnJlcXVpcmVNb2R1bGUsXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZXhwYW5kUGF0aHModW5leHBhbmRlZFBhdGhzLCBkZWZhdWx0RXh0ZW5zaW9uKSB7XG4gICAgY29uc3QgZXhwYW5kZWRQYXRocyA9IGF3YWl0IFByb21pc2UubWFwKFxuICAgICAgdW5leHBhbmRlZFBhdGhzLFxuICAgICAgYXN5bmMgdW5leHBhbmRlZFBhdGggPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gYXdhaXQgZ2xvYlAodW5leHBhbmRlZFBhdGgsIHtcbiAgICAgICAgICBhYnNvbHV0ZTogdHJ1ZSxcbiAgICAgICAgICBjd2Q6IHRoaXMuY3dkLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5tYXAobWF0Y2hlcywgYXN5bmMgbWF0Y2ggPT4ge1xuICAgICAgICAgIGlmIChwYXRoLmV4dG5hbWUobWF0Y2gpID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JQKGAke21hdGNofS8qKi8qJHtkZWZhdWx0RXh0ZW5zaW9ufWApXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXRjaFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIClcbiAgICByZXR1cm4gXy5mbGF0dGVuRGVwdGgoZXhwYW5kZWRQYXRocywgMikubWFwKHggPT4gcGF0aC5ub3JtYWxpemUoeCkpXG4gIH1cblxuICBhc3luYyBleHBhbmRGZWF0dXJlUGF0aHMoZmVhdHVyZVBhdGhzKSB7XG4gICAgZmVhdHVyZVBhdGhzID0gZmVhdHVyZVBhdGhzLm1hcChwID0+IHAucmVwbGFjZSgvKDpcXGQrKSokL2csICcnKSkgLy8gU3RyaXAgbGluZSBudW1iZXJzXG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kUGF0aHMoZmVhdHVyZVBhdGhzLCAnLmZlYXR1cmUnKVxuICB9XG5cbiAgZ2V0RmVhdHVyZURpcmVjdG9yeVBhdGhzKGZlYXR1cmVQYXRocykge1xuICAgIGNvbnN0IGZlYXR1cmVEaXJzID0gZmVhdHVyZVBhdGhzLm1hcChmZWF0dXJlUGF0aCA9PiB7XG4gICAgICBsZXQgZmVhdHVyZURpciA9IHBhdGguZGlybmFtZShmZWF0dXJlUGF0aClcbiAgICAgIGxldCBjaGlsZERpclxuICAgICAgbGV0IHBhcmVudERpciA9IGZlYXR1cmVEaXJcbiAgICAgIHdoaWxlIChjaGlsZERpciAhPT0gcGFyZW50RGlyKSB7XG4gICAgICAgIGNoaWxkRGlyID0gcGFyZW50RGlyXG4gICAgICAgIHBhcmVudERpciA9IHBhdGguZGlybmFtZShjaGlsZERpcilcbiAgICAgICAgaWYgKHBhdGguYmFzZW5hbWUocGFyZW50RGlyKSA9PT0gJ2ZlYXR1cmVzJykge1xuICAgICAgICAgIGZlYXR1cmVEaXIgPSBwYXJlbnREaXJcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aC5yZWxhdGl2ZSh0aGlzLmN3ZCwgZmVhdHVyZURpcilcbiAgICB9KVxuICAgIHJldHVybiBfLnVuaXEoZmVhdHVyZURpcnMpXG4gIH1cblxuICBnZXRGb3JtYXRPcHRpb25zKCkge1xuICAgIGNvbnN0IGZvcm1hdE9wdGlvbnMgPSBfLmNsb25lKHRoaXMub3B0aW9ucy5mb3JtYXRPcHRpb25zKVxuICAgIGZvcm1hdE9wdGlvbnMuY3dkID0gdGhpcy5jd2RcbiAgICBfLmRlZmF1bHRzKGZvcm1hdE9wdGlvbnMsIHsgY29sb3JzRW5hYmxlZDogdHJ1ZSB9KVxuICAgIHJldHVybiBmb3JtYXRPcHRpb25zXG4gIH1cblxuICBnZXRGb3JtYXRzKCkge1xuICAgIGNvbnN0IG1hcHBpbmcgPSB7ICcnOiAncHJvZ3Jlc3MnIH1cbiAgICB0aGlzLm9wdGlvbnMuZm9ybWF0LmZvckVhY2goZm9ybWF0ID0+IHtcbiAgICAgIGNvbnN0IFt0eXBlLCBvdXRwdXRUb10gPSBPcHRpb25TcGxpdHRlci5zcGxpdChmb3JtYXQpXG4gICAgICBtYXBwaW5nW291dHB1dFRvIHx8ICcnXSA9IHR5cGVcbiAgICB9KVxuICAgIHJldHVybiBfLm1hcChtYXBwaW5nLCAodHlwZSwgb3V0cHV0VG8pID0+ICh7IG91dHB1dFRvLCB0eXBlIH0pKVxuICB9XG5cbiAgYXN5bmMgZ2V0VW5leHBhbmRlZEZlYXR1cmVQYXRocygpIHtcbiAgICBpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5lc3RlZEZlYXR1cmVQYXRocyA9IGF3YWl0IFByb21pc2UubWFwKHRoaXMuYXJncywgYXN5bmMgYXJnID0+IHtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGFyZylcbiAgICAgICAgaWYgKGZpbGVuYW1lWzBdID09PSAnQCcpIHtcbiAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbih0aGlzLmN3ZCwgYXJnKVxuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmcy5yZWFkRmlsZShmaWxlUGF0aCwgJ3V0ZjgnKVxuICAgICAgICAgIHJldHVybiBfLmNoYWluKGNvbnRlbnQpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAubWFwKF8udHJpbSlcbiAgICAgICAgICAgIC5jb21wYWN0KClcbiAgICAgICAgICAgIC52YWx1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyZ1xuICAgICAgfSlcbiAgICAgIGNvbnN0IGZlYXR1cmVQYXRocyA9IF8uZmxhdHRlbihuZXN0ZWRGZWF0dXJlUGF0aHMpXG4gICAgICBpZiAoZmVhdHVyZVBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVQYXRoc1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWydmZWF0dXJlcy8qKi8qLmZlYXR1cmUnXVxuICB9XG59XG4iXX0=