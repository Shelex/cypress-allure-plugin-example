'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _commander = require('commander');

var _package = require('../../package.json');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gherkin = require('gherkin');

var _gherkin2 = _interopRequireDefault(_gherkin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArgvParser = function () {
  function ArgvParser() {
    (0, _classCallCheck3.default)(this, ArgvParser);
  }

  (0, _createClass3.default)(ArgvParser, null, [{
    key: 'collect',
    value: function collect(val, memo) {
      memo.push(val);
      return memo;
    }
  }, {
    key: 'mergeJson',
    value: function mergeJson(option) {
      return function (str, memo) {
        var val = void 0;
        try {
          val = JSON.parse(str);
        } catch (error) {
          throw new Error(option + ' passed invalid JSON: ' + error.message + ': ' + str);
        }
        if (!_lodash2.default.isPlainObject(val)) {
          throw new Error(option + ' must be passed JSON of an object: ' + str);
        }
        return _lodash2.default.merge(memo, val);
      };
    }
  }, {
    key: 'mergeTags',
    value: function mergeTags(val, memo) {
      return memo === '' ? '(' + val + ')' : memo + ' and (' + val + ')';
    }
  }, {
    key: 'validateLanguage',
    value: function validateLanguage(val) {
      if (!_lodash2.default.includes(_lodash2.default.keys(_gherkin2.default.DIALECTS), val)) {
        throw new Error('Unsupported ISO 639-1: ' + val);
      }
      return val;
    }
  }, {
    key: 'parse',
    value: function parse(argv) {
      var program = new _commander.Command(_path2.default.basename(argv[1]));

      program.usage('[options] [<GLOB|DIR|FILE[:LINE]>...]').version(_package.version, '-v, --version').option('-b, --backtrace', 'show full backtrace for errors').option('-d, --dry-run', 'invoke formatters without executing steps').option('--exit', 'force shutdown of the event loop when the test run has finished: cucumber will call process.exit').option('--fail-fast', 'abort the run on first failure').option('-f, --format <TYPE[:PATH]>', 'specify the output format, optionally supply PATH to redirect formatter output (repeatable)', ArgvParser.collect, []).option('--format-options <JSON>', 'provide options for formatters (repeatable)', ArgvParser.mergeJson('--format-options'), {}).option('--i18n-keywords <ISO 639-1>', 'list language keywords', ArgvParser.validateLanguage, '').option('--i18n-languages', 'list languages').option('--language <ISO 639-1>', 'provide the default language for feature files', '').option('--name <REGEXP>', 'only execute the scenarios with name matching the expression (repeatable)', ArgvParser.collect, []).option('--no-strict', 'succeed even if there are pending steps').option('--order <TYPE[:SEED]>', 'run scenarios in the specified order. Type should be `defined` or `random`', 'defined').option('-p, --profile <NAME>', 'specify the profile to use (repeatable)', ArgvParser.collect, []).option('--parallel <NUMBER_OF_SLAVES>', 'run in parallel with the given number of slaves', parseInt, 0).option('-r, --require <GLOB|DIR|FILE>', 'require files before executing features (repeatable)', ArgvParser.collect, []).option('--require-module <NODE_MODULE>', 'require node modules before requiring files (repeatable)', ArgvParser.collect, []).option('-t, --tags <EXPRESSION>', 'only execute the features or scenarios with tags matching the expression (repeatable)', ArgvParser.mergeTags, '').option('--world-parameters <JSON>', 'provide parameters that will be passed to the world constructor (repeatable)', ArgvParser.mergeJson('--world-parameters'), {});

      program.on('--help', function () {
        /* eslint-disable no-console */
        console.log('  For more details please visit https://github.com/cucumber/cucumber-js#cli\n');
        /* eslint-enable no-console */
      });

      program.parse(argv);

      return {
        options: program.opts(),
        args: program.args
      };
    }
  }]);
  return ArgvParser;
}();

exports.default = ArgvParser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvYXJndl9wYXJzZXIuanMiXSwibmFtZXMiOlsiQXJndlBhcnNlciIsInZhbCIsIm1lbW8iLCJwdXNoIiwib3B0aW9uIiwic3RyIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJFcnJvciIsIm1lc3NhZ2UiLCJpc1BsYWluT2JqZWN0IiwibWVyZ2UiLCJpbmNsdWRlcyIsImtleXMiLCJESUFMRUNUUyIsImFyZ3YiLCJwcm9ncmFtIiwiYmFzZW5hbWUiLCJ1c2FnZSIsInZlcnNpb24iLCJjb2xsZWN0IiwibWVyZ2VKc29uIiwidmFsaWRhdGVMYW5ndWFnZSIsInBhcnNlSW50IiwibWVyZ2VUYWdzIiwib24iLCJjb25zb2xlIiwibG9nIiwib3B0aW9ucyIsIm9wdHMiLCJhcmdzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxVOzs7Ozs7OzRCQUNKQyxHLEVBQUtDLEksRUFBTTtBQUN4QkEsV0FBS0MsSUFBTCxDQUFVRixHQUFWO0FBQ0EsYUFBT0MsSUFBUDtBQUNEOzs7OEJBRWdCRSxNLEVBQVE7QUFDdkIsYUFBTyxVQUFTQyxHQUFULEVBQWNILElBQWQsRUFBb0I7QUFDekIsWUFBSUQsWUFBSjtBQUNBLFlBQUk7QUFDRkEsZ0JBQU1LLEtBQUtDLEtBQUwsQ0FBV0YsR0FBWCxDQUFOO0FBQ0QsU0FGRCxDQUVFLE9BQU9HLEtBQVAsRUFBYztBQUNkLGdCQUFNLElBQUlDLEtBQUosQ0FDREwsTUFEQyw4QkFDOEJJLE1BQU1FLE9BRHBDLFVBQ2dETCxHQURoRCxDQUFOO0FBR0Q7QUFDRCxZQUFJLENBQUMsaUJBQUVNLGFBQUYsQ0FBZ0JWLEdBQWhCLENBQUwsRUFBMkI7QUFDekIsZ0JBQU0sSUFBSVEsS0FBSixDQUFhTCxNQUFiLDJDQUF5REMsR0FBekQsQ0FBTjtBQUNEO0FBQ0QsZUFBTyxpQkFBRU8sS0FBRixDQUFRVixJQUFSLEVBQWNELEdBQWQsQ0FBUDtBQUNELE9BYkQ7QUFjRDs7OzhCQUVnQkEsRyxFQUFLQyxJLEVBQU07QUFDMUIsYUFBT0EsU0FBUyxFQUFULFNBQWtCRCxHQUFsQixTQUE4QkMsSUFBOUIsY0FBMkNELEdBQTNDLE1BQVA7QUFDRDs7O3FDQUV1QkEsRyxFQUFLO0FBQzNCLFVBQUksQ0FBQyxpQkFBRVksUUFBRixDQUFXLGlCQUFFQyxJQUFGLENBQU8sa0JBQVFDLFFBQWYsQ0FBWCxFQUFxQ2QsR0FBckMsQ0FBTCxFQUFnRDtBQUM5QyxjQUFNLElBQUlRLEtBQUosNkJBQW9DUixHQUFwQyxDQUFOO0FBQ0Q7QUFDRCxhQUFPQSxHQUFQO0FBQ0Q7OzswQkFFWWUsSSxFQUFNO0FBQ2pCLFVBQU1DLFVBQVUsdUJBQVksZUFBS0MsUUFBTCxDQUFjRixLQUFLLENBQUwsQ0FBZCxDQUFaLENBQWhCOztBQUVBQyxjQUNHRSxLQURILENBQ1MsdUNBRFQsRUFFR0MsT0FGSCxtQkFFb0IsZUFGcEIsRUFHR2hCLE1BSEgsQ0FHVSxpQkFIVixFQUc2QixnQ0FIN0IsRUFJR0EsTUFKSCxDQUlVLGVBSlYsRUFJMkIsMkNBSjNCLEVBS0dBLE1BTEgsQ0FNSSxRQU5KLEVBT0ksa0dBUEosRUFTR0EsTUFUSCxDQVNVLGFBVFYsRUFTeUIsZ0NBVHpCLEVBVUdBLE1BVkgsQ0FXSSw0QkFYSixFQVlJLDZGQVpKLEVBYUlKLFdBQVdxQixPQWJmLEVBY0ksRUFkSixFQWdCR2pCLE1BaEJILENBaUJJLHlCQWpCSixFQWtCSSw2Q0FsQkosRUFtQklKLFdBQVdzQixTQUFYLENBQXFCLGtCQUFyQixDQW5CSixFQW9CSSxFQXBCSixFQXNCR2xCLE1BdEJILENBdUJJLDZCQXZCSixFQXdCSSx3QkF4QkosRUF5QklKLFdBQVd1QixnQkF6QmYsRUEwQkksRUExQkosRUE0QkduQixNQTVCSCxDQTRCVSxrQkE1QlYsRUE0QjhCLGdCQTVCOUIsRUE2QkdBLE1BN0JILENBOEJJLHdCQTlCSixFQStCSSxnREEvQkosRUFnQ0ksRUFoQ0osRUFrQ0dBLE1BbENILENBbUNJLGlCQW5DSixFQW9DSSwyRUFwQ0osRUFxQ0lKLFdBQVdxQixPQXJDZixFQXNDSSxFQXRDSixFQXdDR2pCLE1BeENILENBd0NVLGFBeENWLEVBd0N5Qix5Q0F4Q3pCLEVBeUNHQSxNQXpDSCxDQTBDSSx1QkExQ0osRUEyQ0ksNEVBM0NKLEVBNENJLFNBNUNKLEVBOENHQSxNQTlDSCxDQStDSSxzQkEvQ0osRUFnREkseUNBaERKLEVBaURJSixXQUFXcUIsT0FqRGYsRUFrREksRUFsREosRUFvREdqQixNQXBESCxDQXFESSwrQkFyREosRUFzREksaURBdERKLEVBdURJb0IsUUF2REosRUF3REksQ0F4REosRUEwREdwQixNQTFESCxDQTJESSwrQkEzREosRUE0REksc0RBNURKLEVBNkRJSixXQUFXcUIsT0E3RGYsRUE4REksRUE5REosRUFnRUdqQixNQWhFSCxDQWlFSSxnQ0FqRUosRUFrRUksMERBbEVKLEVBbUVJSixXQUFXcUIsT0FuRWYsRUFvRUksRUFwRUosRUFzRUdqQixNQXRFSCxDQXVFSSx5QkF2RUosRUF3RUksdUZBeEVKLEVBeUVJSixXQUFXeUIsU0F6RWYsRUEwRUksRUExRUosRUE0RUdyQixNQTVFSCxDQTZFSSwyQkE3RUosRUE4RUksOEVBOUVKLEVBK0VJSixXQUFXc0IsU0FBWCxDQUFxQixvQkFBckIsQ0EvRUosRUFnRkksRUFoRko7O0FBbUZBTCxjQUFRUyxFQUFSLENBQVcsUUFBWCxFQUFxQixZQUFNO0FBQ3pCO0FBQ0FDLGdCQUFRQyxHQUFSLENBQ0UsK0VBREY7QUFHQTtBQUNELE9BTkQ7O0FBUUFYLGNBQVFWLEtBQVIsQ0FBY1MsSUFBZDs7QUFFQSxhQUFPO0FBQ0xhLGlCQUFTWixRQUFRYSxJQUFSLEVBREo7QUFFTEMsY0FBTWQsUUFBUWM7QUFGVCxPQUFQO0FBSUQ7Ozs7O2tCQXRJa0IvQixVIiwiZmlsZSI6ImFyZ3ZfcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ2NvbW1hbmRlcidcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IEdoZXJraW4gZnJvbSAnZ2hlcmtpbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJndlBhcnNlciB7XG4gIHN0YXRpYyBjb2xsZWN0KHZhbCwgbWVtbykge1xuICAgIG1lbW8ucHVzaCh2YWwpXG4gICAgcmV0dXJuIG1lbW9cbiAgfVxuXG4gIHN0YXRpYyBtZXJnZUpzb24ob3B0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0ciwgbWVtbykge1xuICAgICAgbGV0IHZhbFxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsID0gSlNPTi5wYXJzZShzdHIpXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7b3B0aW9ufSBwYXNzZWQgaW52YWxpZCBKU09OOiAke2Vycm9yLm1lc3NhZ2V9OiAke3N0cn1gXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmICghXy5pc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke29wdGlvbn0gbXVzdCBiZSBwYXNzZWQgSlNPTiBvZiBhbiBvYmplY3Q6ICR7c3RyfWApXG4gICAgICB9XG4gICAgICByZXR1cm4gXy5tZXJnZShtZW1vLCB2YWwpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG1lcmdlVGFncyh2YWwsIG1lbW8pIHtcbiAgICByZXR1cm4gbWVtbyA9PT0gJycgPyBgKCR7dmFsfSlgIDogYCR7bWVtb30gYW5kICgke3ZhbH0pYFxuICB9XG5cbiAgc3RhdGljIHZhbGlkYXRlTGFuZ3VhZ2UodmFsKSB7XG4gICAgaWYgKCFfLmluY2x1ZGVzKF8ua2V5cyhHaGVya2luLkRJQUxFQ1RTKSwgdmFsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBJU08gNjM5LTE6ICR7dmFsfWApXG4gICAgfVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZShhcmd2KSB7XG4gICAgY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKHBhdGguYmFzZW5hbWUoYXJndlsxXSkpXG5cbiAgICBwcm9ncmFtXG4gICAgICAudXNhZ2UoJ1tvcHRpb25zXSBbPEdMT0J8RElSfEZJTEVbOkxJTkVdPi4uLl0nKVxuICAgICAgLnZlcnNpb24odmVyc2lvbiwgJy12LCAtLXZlcnNpb24nKVxuICAgICAgLm9wdGlvbignLWIsIC0tYmFja3RyYWNlJywgJ3Nob3cgZnVsbCBiYWNrdHJhY2UgZm9yIGVycm9ycycpXG4gICAgICAub3B0aW9uKCctZCwgLS1kcnktcnVuJywgJ2ludm9rZSBmb3JtYXR0ZXJzIHdpdGhvdXQgZXhlY3V0aW5nIHN0ZXBzJylcbiAgICAgIC5vcHRpb24oXG4gICAgICAgICctLWV4aXQnLFxuICAgICAgICAnZm9yY2Ugc2h1dGRvd24gb2YgdGhlIGV2ZW50IGxvb3Agd2hlbiB0aGUgdGVzdCBydW4gaGFzIGZpbmlzaGVkOiBjdWN1bWJlciB3aWxsIGNhbGwgcHJvY2Vzcy5leGl0J1xuICAgICAgKVxuICAgICAgLm9wdGlvbignLS1mYWlsLWZhc3QnLCAnYWJvcnQgdGhlIHJ1biBvbiBmaXJzdCBmYWlsdXJlJylcbiAgICAgIC5vcHRpb24oXG4gICAgICAgICctZiwgLS1mb3JtYXQgPFRZUEVbOlBBVEhdPicsXG4gICAgICAgICdzcGVjaWZ5IHRoZSBvdXRwdXQgZm9ybWF0LCBvcHRpb25hbGx5IHN1cHBseSBQQVRIIHRvIHJlZGlyZWN0IGZvcm1hdHRlciBvdXRwdXQgKHJlcGVhdGFibGUpJyxcbiAgICAgICAgQXJndlBhcnNlci5jb2xsZWN0LFxuICAgICAgICBbXVxuICAgICAgKVxuICAgICAgLm9wdGlvbihcbiAgICAgICAgJy0tZm9ybWF0LW9wdGlvbnMgPEpTT04+JyxcbiAgICAgICAgJ3Byb3ZpZGUgb3B0aW9ucyBmb3IgZm9ybWF0dGVycyAocmVwZWF0YWJsZSknLFxuICAgICAgICBBcmd2UGFyc2VyLm1lcmdlSnNvbignLS1mb3JtYXQtb3B0aW9ucycpLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgICAgLm9wdGlvbihcbiAgICAgICAgJy0taTE4bi1rZXl3b3JkcyA8SVNPIDYzOS0xPicsXG4gICAgICAgICdsaXN0IGxhbmd1YWdlIGtleXdvcmRzJyxcbiAgICAgICAgQXJndlBhcnNlci52YWxpZGF0ZUxhbmd1YWdlLFxuICAgICAgICAnJ1xuICAgICAgKVxuICAgICAgLm9wdGlvbignLS1pMThuLWxhbmd1YWdlcycsICdsaXN0IGxhbmd1YWdlcycpXG4gICAgICAub3B0aW9uKFxuICAgICAgICAnLS1sYW5ndWFnZSA8SVNPIDYzOS0xPicsXG4gICAgICAgICdwcm92aWRlIHRoZSBkZWZhdWx0IGxhbmd1YWdlIGZvciBmZWF0dXJlIGZpbGVzJyxcbiAgICAgICAgJydcbiAgICAgIClcbiAgICAgIC5vcHRpb24oXG4gICAgICAgICctLW5hbWUgPFJFR0VYUD4nLFxuICAgICAgICAnb25seSBleGVjdXRlIHRoZSBzY2VuYXJpb3Mgd2l0aCBuYW1lIG1hdGNoaW5nIHRoZSBleHByZXNzaW9uIChyZXBlYXRhYmxlKScsXG4gICAgICAgIEFyZ3ZQYXJzZXIuY29sbGVjdCxcbiAgICAgICAgW11cbiAgICAgIClcbiAgICAgIC5vcHRpb24oJy0tbm8tc3RyaWN0JywgJ3N1Y2NlZWQgZXZlbiBpZiB0aGVyZSBhcmUgcGVuZGluZyBzdGVwcycpXG4gICAgICAub3B0aW9uKFxuICAgICAgICAnLS1vcmRlciA8VFlQRVs6U0VFRF0+JyxcbiAgICAgICAgJ3J1biBzY2VuYXJpb3MgaW4gdGhlIHNwZWNpZmllZCBvcmRlci4gVHlwZSBzaG91bGQgYmUgYGRlZmluZWRgIG9yIGByYW5kb21gJyxcbiAgICAgICAgJ2RlZmluZWQnXG4gICAgICApXG4gICAgICAub3B0aW9uKFxuICAgICAgICAnLXAsIC0tcHJvZmlsZSA8TkFNRT4nLFxuICAgICAgICAnc3BlY2lmeSB0aGUgcHJvZmlsZSB0byB1c2UgKHJlcGVhdGFibGUpJyxcbiAgICAgICAgQXJndlBhcnNlci5jb2xsZWN0LFxuICAgICAgICBbXVxuICAgICAgKVxuICAgICAgLm9wdGlvbihcbiAgICAgICAgJy0tcGFyYWxsZWwgPE5VTUJFUl9PRl9TTEFWRVM+JyxcbiAgICAgICAgJ3J1biBpbiBwYXJhbGxlbCB3aXRoIHRoZSBnaXZlbiBudW1iZXIgb2Ygc2xhdmVzJyxcbiAgICAgICAgcGFyc2VJbnQsXG4gICAgICAgIDBcbiAgICAgIClcbiAgICAgIC5vcHRpb24oXG4gICAgICAgICctciwgLS1yZXF1aXJlIDxHTE9CfERJUnxGSUxFPicsXG4gICAgICAgICdyZXF1aXJlIGZpbGVzIGJlZm9yZSBleGVjdXRpbmcgZmVhdHVyZXMgKHJlcGVhdGFibGUpJyxcbiAgICAgICAgQXJndlBhcnNlci5jb2xsZWN0LFxuICAgICAgICBbXVxuICAgICAgKVxuICAgICAgLm9wdGlvbihcbiAgICAgICAgJy0tcmVxdWlyZS1tb2R1bGUgPE5PREVfTU9EVUxFPicsXG4gICAgICAgICdyZXF1aXJlIG5vZGUgbW9kdWxlcyBiZWZvcmUgcmVxdWlyaW5nIGZpbGVzIChyZXBlYXRhYmxlKScsXG4gICAgICAgIEFyZ3ZQYXJzZXIuY29sbGVjdCxcbiAgICAgICAgW11cbiAgICAgIClcbiAgICAgIC5vcHRpb24oXG4gICAgICAgICctdCwgLS10YWdzIDxFWFBSRVNTSU9OPicsXG4gICAgICAgICdvbmx5IGV4ZWN1dGUgdGhlIGZlYXR1cmVzIG9yIHNjZW5hcmlvcyB3aXRoIHRhZ3MgbWF0Y2hpbmcgdGhlIGV4cHJlc3Npb24gKHJlcGVhdGFibGUpJyxcbiAgICAgICAgQXJndlBhcnNlci5tZXJnZVRhZ3MsXG4gICAgICAgICcnXG4gICAgICApXG4gICAgICAub3B0aW9uKFxuICAgICAgICAnLS13b3JsZC1wYXJhbWV0ZXJzIDxKU09OPicsXG4gICAgICAgICdwcm92aWRlIHBhcmFtZXRlcnMgdGhhdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgd29ybGQgY29uc3RydWN0b3IgKHJlcGVhdGFibGUpJyxcbiAgICAgICAgQXJndlBhcnNlci5tZXJnZUpzb24oJy0td29ybGQtcGFyYW1ldGVycycpLFxuICAgICAgICB7fVxuICAgICAgKVxuXG4gICAgcHJvZ3JhbS5vbignLS1oZWxwJywgKCkgPT4ge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICcgIEZvciBtb3JlIGRldGFpbHMgcGxlYXNlIHZpc2l0IGh0dHBzOi8vZ2l0aHViLmNvbS9jdWN1bWJlci9jdWN1bWJlci1qcyNjbGlcXG4nXG4gICAgICApXG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgICB9KVxuXG4gICAgcHJvZ3JhbS5wYXJzZShhcmd2KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG9wdGlvbnM6IHByb2dyYW0ub3B0cygpLFxuICAgICAgYXJnczogcHJvZ3JhbS5hcmdzLFxuICAgIH1cbiAgfVxufVxuIl19