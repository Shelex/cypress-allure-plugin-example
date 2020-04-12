'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _bluebird = require('bluebird');

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _stringArgv = require('string-argv');

var _stringArgv2 = _interopRequireDefault(_stringArgv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileLoader = function () {
  function ProfileLoader(directory) {
    (0, _classCallCheck3.default)(this, ProfileLoader);

    this.directory = directory;
  }

  (0, _createClass3.default)(ProfileLoader, [{
    key: 'getDefinitions',
    value: function () {
      var _ref = (0, _bluebird.coroutine)(function* () {
        var definitionsFilePath = _path2.default.join(this.directory, 'cucumber.js');
        var exists = yield _fs2.default.exists(definitionsFilePath);
        if (!exists) {
          return {};
        }
        var definitions = require(definitionsFilePath);
        if ((typeof definitions === 'undefined' ? 'undefined' : (0, _typeof3.default)(definitions)) !== 'object') {
          throw new Error(definitionsFilePath + ' does not export an object');
        }
        return definitions;
      });

      function getDefinitions() {
        return _ref.apply(this, arguments);
      }

      return getDefinitions;
    }()
  }, {
    key: 'getArgv',
    value: function () {
      var _ref2 = (0, _bluebird.coroutine)(function* (profiles) {
        var definitions = yield this.getDefinitions();
        if (profiles.length === 0 && definitions.default) {
          profiles = ['default'];
        }
        var argvs = profiles.map(function (profile) {
          if (!definitions[profile]) {
            throw new Error('Undefined profile: ' + profile);
          }
          return (0, _stringArgv2.default)(definitions[profile]);
        });
        return _lodash2.default.flatten(argvs);
      });

      function getArgv(_x) {
        return _ref2.apply(this, arguments);
      }

      return getArgv;
    }()
  }]);
  return ProfileLoader;
}();

exports.default = ProfileLoader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvcHJvZmlsZV9sb2FkZXIuanMiXSwibmFtZXMiOlsiUHJvZmlsZUxvYWRlciIsImRpcmVjdG9yeSIsImRlZmluaXRpb25zRmlsZVBhdGgiLCJqb2luIiwiZXhpc3RzIiwiZGVmaW5pdGlvbnMiLCJyZXF1aXJlIiwiRXJyb3IiLCJwcm9maWxlcyIsImdldERlZmluaXRpb25zIiwibGVuZ3RoIiwiZGVmYXVsdCIsImFyZ3ZzIiwibWFwIiwicHJvZmlsZSIsImZsYXR0ZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsYTtBQUNuQix5QkFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOzs7Ozt1REFFc0I7QUFDckIsWUFBTUMsc0JBQXNCLGVBQUtDLElBQUwsQ0FBVSxLQUFLRixTQUFmLEVBQTBCLGFBQTFCLENBQTVCO0FBQ0EsWUFBTUcsU0FBUyxNQUFNLGFBQUdBLE1BQUgsQ0FBVUYsbUJBQVYsQ0FBckI7QUFDQSxZQUFJLENBQUNFLE1BQUwsRUFBYTtBQUNYLGlCQUFPLEVBQVA7QUFDRDtBQUNELFlBQU1DLGNBQWNDLFFBQVFKLG1CQUFSLENBQXBCO0FBQ0EsWUFBSSxRQUFPRyxXQUFQLHVEQUFPQSxXQUFQLE9BQXVCLFFBQTNCLEVBQXFDO0FBQ25DLGdCQUFNLElBQUlFLEtBQUosQ0FBYUwsbUJBQWIsZ0NBQU47QUFDRDtBQUNELGVBQU9HLFdBQVA7QUFDRCxPOzs7Ozs7Ozs7OztzREFFYUcsUSxFQUFVO0FBQ3RCLFlBQU1ILGNBQWMsTUFBTSxLQUFLSSxjQUFMLEVBQTFCO0FBQ0EsWUFBSUQsU0FBU0UsTUFBVCxLQUFvQixDQUFwQixJQUF5QkwsWUFBWU0sT0FBekMsRUFBa0Q7QUFDaERILHFCQUFXLENBQUMsU0FBRCxDQUFYO0FBQ0Q7QUFDRCxZQUFNSSxRQUFRSixTQUFTSyxHQUFULENBQWEsbUJBQVc7QUFDcEMsY0FBSSxDQUFDUixZQUFZUyxPQUFaLENBQUwsRUFBMkI7QUFDekIsa0JBQU0sSUFBSVAsS0FBSix5QkFBZ0NPLE9BQWhDLENBQU47QUFDRDtBQUNELGlCQUFPLDBCQUFXVCxZQUFZUyxPQUFaLENBQVgsQ0FBUDtBQUNELFNBTGEsQ0FBZDtBQU1BLGVBQU8saUJBQUVDLE9BQUYsQ0FBVUgsS0FBVixDQUFQO0FBQ0QsTzs7Ozs7Ozs7Ozs7O2tCQTlCa0JaLGEiLCJmaWxlIjoicHJvZmlsZV9sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgZnMgZnJvbSAnbXovZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHN0cmluZ0FyZ3YgZnJvbSAnc3RyaW5nLWFyZ3YnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2ZpbGVMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihkaXJlY3RvcnkpIHtcbiAgICB0aGlzLmRpcmVjdG9yeSA9IGRpcmVjdG9yeVxuICB9XG5cbiAgYXN5bmMgZ2V0RGVmaW5pdGlvbnMoKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbnNGaWxlUGF0aCA9IHBhdGguam9pbih0aGlzLmRpcmVjdG9yeSwgJ2N1Y3VtYmVyLmpzJylcbiAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBmcy5leGlzdHMoZGVmaW5pdGlvbnNGaWxlUGF0aClcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuICAgIGNvbnN0IGRlZmluaXRpb25zID0gcmVxdWlyZShkZWZpbml0aW9uc0ZpbGVQYXRoKVxuICAgIGlmICh0eXBlb2YgZGVmaW5pdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZGVmaW5pdGlvbnNGaWxlUGF0aH0gZG9lcyBub3QgZXhwb3J0IGFuIG9iamVjdGApXG4gICAgfVxuICAgIHJldHVybiBkZWZpbml0aW9uc1xuICB9XG5cbiAgYXN5bmMgZ2V0QXJndihwcm9maWxlcykge1xuICAgIGNvbnN0IGRlZmluaXRpb25zID0gYXdhaXQgdGhpcy5nZXREZWZpbml0aW9ucygpXG4gICAgaWYgKHByb2ZpbGVzLmxlbmd0aCA9PT0gMCAmJiBkZWZpbml0aW9ucy5kZWZhdWx0KSB7XG4gICAgICBwcm9maWxlcyA9IFsnZGVmYXVsdCddXG4gICAgfVxuICAgIGNvbnN0IGFyZ3ZzID0gcHJvZmlsZXMubWFwKHByb2ZpbGUgPT4ge1xuICAgICAgaWYgKCFkZWZpbml0aW9uc1twcm9maWxlXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZGVmaW5lZCBwcm9maWxlOiAke3Byb2ZpbGV9YClcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJpbmdBcmd2KGRlZmluaXRpb25zW3Byb2ZpbGVdKVxuICAgIH0pXG4gICAgcmV0dXJuIF8uZmxhdHRlbihhcmd2cylcbiAgfVxufVxuIl19