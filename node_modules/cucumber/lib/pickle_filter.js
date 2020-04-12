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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cucumberTagExpressions = require('cucumber-tag-expressions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FEATURE_LINENUM_REGEXP = /^(.*?)((?::[\d]+)+)?$/;
var tagExpressionParser = new _cucumberTagExpressions.TagExpressionParser();

var PickleFilter = function () {
  function PickleFilter(_ref) {
    var featurePaths = _ref.featurePaths,
        names = _ref.names,
        tagExpression = _ref.tagExpression;
    (0, _classCallCheck3.default)(this, PickleFilter);

    this.featureUriToLinesMapping = this.getFeatureUriToLinesMapping(featurePaths || []);
    this.names = names || [];
    if (tagExpression) {
      this.tagExpressionNode = tagExpressionParser.parse(tagExpression || '');
    }
  }

  (0, _createClass3.default)(PickleFilter, [{
    key: 'getFeatureUriToLinesMapping',
    value: function getFeatureUriToLinesMapping(featurePaths) {
      var mapping = {};
      featurePaths.forEach(function (featurePath) {
        var match = FEATURE_LINENUM_REGEXP.exec(featurePath);
        if (match) {
          var uri = _path2.default.resolve(match[1]);
          var linesExpression = match[2];
          if (linesExpression) {
            if (!mapping[uri]) {
              mapping[uri] = [];
            }
            linesExpression.slice(1).split(':').forEach(function (line) {
              mapping[uri].push(parseInt(line));
            });
          }
        }
      });
      return mapping;
    }
  }, {
    key: 'matches',
    value: function matches(_ref2) {
      var pickle = _ref2.pickle,
          uri = _ref2.uri;

      return this.matchesAnyLine({ pickle: pickle, uri: uri }) && this.matchesAnyName(pickle) && this.matchesAllTagExpressions(pickle);
    }
  }, {
    key: 'matchesAnyLine',
    value: function matchesAnyLine(_ref3) {
      var pickle = _ref3.pickle,
          uri = _ref3.uri;

      var lines = this.featureUriToLinesMapping[_path2.default.resolve(uri)];
      if (lines) {
        return _lodash2.default.size(_lodash2.default.intersection(lines, _lodash2.default.map(pickle.locations, 'line'))) > 0;
      }
      return true;
    }
  }, {
    key: 'matchesAnyName',
    value: function matchesAnyName(pickle) {
      if (this.names.length === 0) {
        return true;
      }
      return _lodash2.default.some(this.names, function (name) {
        return pickle.name.match(name);
      });
    }
  }, {
    key: 'matchesAllTagExpressions',
    value: function matchesAllTagExpressions(pickle) {
      if (!this.tagExpressionNode) {
        return true;
      }
      return this.tagExpressionNode.evaluate(_lodash2.default.map(pickle.tags, 'name'));
    }
  }]);
  return PickleFilter;
}();

exports.default = PickleFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9waWNrbGVfZmlsdGVyLmpzIl0sIm5hbWVzIjpbIkZFQVRVUkVfTElORU5VTV9SRUdFWFAiLCJ0YWdFeHByZXNzaW9uUGFyc2VyIiwiUGlja2xlRmlsdGVyIiwiZmVhdHVyZVBhdGhzIiwibmFtZXMiLCJ0YWdFeHByZXNzaW9uIiwiZmVhdHVyZVVyaVRvTGluZXNNYXBwaW5nIiwiZ2V0RmVhdHVyZVVyaVRvTGluZXNNYXBwaW5nIiwidGFnRXhwcmVzc2lvbk5vZGUiLCJwYXJzZSIsIm1hcHBpbmciLCJmb3JFYWNoIiwibWF0Y2giLCJleGVjIiwiZmVhdHVyZVBhdGgiLCJ1cmkiLCJyZXNvbHZlIiwibGluZXNFeHByZXNzaW9uIiwic2xpY2UiLCJzcGxpdCIsInB1c2giLCJwYXJzZUludCIsImxpbmUiLCJwaWNrbGUiLCJtYXRjaGVzQW55TGluZSIsIm1hdGNoZXNBbnlOYW1lIiwibWF0Y2hlc0FsbFRhZ0V4cHJlc3Npb25zIiwibGluZXMiLCJzaXplIiwiaW50ZXJzZWN0aW9uIiwibWFwIiwibG9jYXRpb25zIiwibGVuZ3RoIiwic29tZSIsIm5hbWUiLCJldmFsdWF0ZSIsInRhZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEseUJBQXlCLHVCQUEvQjtBQUNBLElBQU1DLHNCQUFzQixpREFBNUI7O0lBRXFCQyxZO0FBQ25CLDhCQUFvRDtBQUFBLFFBQXRDQyxZQUFzQyxRQUF0Q0EsWUFBc0M7QUFBQSxRQUF4QkMsS0FBd0IsUUFBeEJBLEtBQXdCO0FBQUEsUUFBakJDLGFBQWlCLFFBQWpCQSxhQUFpQjtBQUFBOztBQUNsRCxTQUFLQyx3QkFBTCxHQUFnQyxLQUFLQywyQkFBTCxDQUM5QkosZ0JBQWdCLEVBRGMsQ0FBaEM7QUFHQSxTQUFLQyxLQUFMLEdBQWFBLFNBQVMsRUFBdEI7QUFDQSxRQUFJQyxhQUFKLEVBQW1CO0FBQ2pCLFdBQUtHLGlCQUFMLEdBQXlCUCxvQkFBb0JRLEtBQXBCLENBQTBCSixpQkFBaUIsRUFBM0MsQ0FBekI7QUFDRDtBQUNGOzs7O2dEQUUyQkYsWSxFQUFjO0FBQ3hDLFVBQU1PLFVBQVUsRUFBaEI7QUFDQVAsbUJBQWFRLE9BQWIsQ0FBcUIsdUJBQWU7QUFDbEMsWUFBTUMsUUFBUVosdUJBQXVCYSxJQUF2QixDQUE0QkMsV0FBNUIsQ0FBZDtBQUNBLFlBQUlGLEtBQUosRUFBVztBQUNULGNBQU1HLE1BQU0sZUFBS0MsT0FBTCxDQUFhSixNQUFNLENBQU4sQ0FBYixDQUFaO0FBQ0EsY0FBTUssa0JBQWtCTCxNQUFNLENBQU4sQ0FBeEI7QUFDQSxjQUFJSyxlQUFKLEVBQXFCO0FBQ25CLGdCQUFJLENBQUNQLFFBQVFLLEdBQVIsQ0FBTCxFQUFtQjtBQUNqQkwsc0JBQVFLLEdBQVIsSUFBZSxFQUFmO0FBQ0Q7QUFDREUsNEJBQ0dDLEtBREgsQ0FDUyxDQURULEVBRUdDLEtBRkgsQ0FFUyxHQUZULEVBR0dSLE9BSEgsQ0FHVyxnQkFBUTtBQUNmRCxzQkFBUUssR0FBUixFQUFhSyxJQUFiLENBQWtCQyxTQUFTQyxJQUFULENBQWxCO0FBQ0QsYUFMSDtBQU1EO0FBQ0Y7QUFDRixPQWpCRDtBQWtCQSxhQUFPWixPQUFQO0FBQ0Q7OzttQ0FFd0I7QUFBQSxVQUFmYSxNQUFlLFNBQWZBLE1BQWU7QUFBQSxVQUFQUixHQUFPLFNBQVBBLEdBQU87O0FBQ3ZCLGFBQ0UsS0FBS1MsY0FBTCxDQUFvQixFQUFFRCxjQUFGLEVBQVVSLFFBQVYsRUFBcEIsS0FDQSxLQUFLVSxjQUFMLENBQW9CRixNQUFwQixDQURBLElBRUEsS0FBS0csd0JBQUwsQ0FBOEJILE1BQTlCLENBSEY7QUFLRDs7OzBDQUUrQjtBQUFBLFVBQWZBLE1BQWUsU0FBZkEsTUFBZTtBQUFBLFVBQVBSLEdBQU8sU0FBUEEsR0FBTzs7QUFDOUIsVUFBTVksUUFBUSxLQUFLckIsd0JBQUwsQ0FBOEIsZUFBS1UsT0FBTCxDQUFhRCxHQUFiLENBQTlCLENBQWQ7QUFDQSxVQUFJWSxLQUFKLEVBQVc7QUFDVCxlQUFPLGlCQUFFQyxJQUFGLENBQU8saUJBQUVDLFlBQUYsQ0FBZUYsS0FBZixFQUFzQixpQkFBRUcsR0FBRixDQUFNUCxPQUFPUSxTQUFiLEVBQXdCLE1BQXhCLENBQXRCLENBQVAsSUFBaUUsQ0FBeEU7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEOzs7bUNBRWNSLE0sRUFBUTtBQUNyQixVQUFJLEtBQUtuQixLQUFMLENBQVc0QixNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLGVBQU8sSUFBUDtBQUNEO0FBQ0QsYUFBTyxpQkFBRUMsSUFBRixDQUFPLEtBQUs3QixLQUFaLEVBQW1CO0FBQUEsZUFBUW1CLE9BQU9XLElBQVAsQ0FBWXRCLEtBQVosQ0FBa0JzQixJQUFsQixDQUFSO0FBQUEsT0FBbkIsQ0FBUDtBQUNEOzs7NkNBRXdCWCxNLEVBQVE7QUFDL0IsVUFBSSxDQUFDLEtBQUtmLGlCQUFWLEVBQTZCO0FBQzNCLGVBQU8sSUFBUDtBQUNEO0FBQ0QsYUFBTyxLQUFLQSxpQkFBTCxDQUF1QjJCLFFBQXZCLENBQWdDLGlCQUFFTCxHQUFGLENBQU1QLE9BQU9hLElBQWIsRUFBbUIsTUFBbkIsQ0FBaEMsQ0FBUDtBQUNEOzs7OztrQkE5RGtCbEMsWSIsImZpbGUiOiJwaWNrbGVfZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IFRhZ0V4cHJlc3Npb25QYXJzZXIgfSBmcm9tICdjdWN1bWJlci10YWctZXhwcmVzc2lvbnMnXG5cbmNvbnN0IEZFQVRVUkVfTElORU5VTV9SRUdFWFAgPSAvXiguKj8pKCg/OjpbXFxkXSspKyk/JC9cbmNvbnN0IHRhZ0V4cHJlc3Npb25QYXJzZXIgPSBuZXcgVGFnRXhwcmVzc2lvblBhcnNlcigpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpY2tsZUZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKHsgZmVhdHVyZVBhdGhzLCBuYW1lcywgdGFnRXhwcmVzc2lvbiB9KSB7XG4gICAgdGhpcy5mZWF0dXJlVXJpVG9MaW5lc01hcHBpbmcgPSB0aGlzLmdldEZlYXR1cmVVcmlUb0xpbmVzTWFwcGluZyhcbiAgICAgIGZlYXR1cmVQYXRocyB8fCBbXVxuICAgIClcbiAgICB0aGlzLm5hbWVzID0gbmFtZXMgfHwgW11cbiAgICBpZiAodGFnRXhwcmVzc2lvbikge1xuICAgICAgdGhpcy50YWdFeHByZXNzaW9uTm9kZSA9IHRhZ0V4cHJlc3Npb25QYXJzZXIucGFyc2UodGFnRXhwcmVzc2lvbiB8fCAnJylcbiAgICB9XG4gIH1cblxuICBnZXRGZWF0dXJlVXJpVG9MaW5lc01hcHBpbmcoZmVhdHVyZVBhdGhzKSB7XG4gICAgY29uc3QgbWFwcGluZyA9IHt9XG4gICAgZmVhdHVyZVBhdGhzLmZvckVhY2goZmVhdHVyZVBhdGggPT4ge1xuICAgICAgY29uc3QgbWF0Y2ggPSBGRUFUVVJFX0xJTkVOVU1fUkVHRVhQLmV4ZWMoZmVhdHVyZVBhdGgpXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgY29uc3QgdXJpID0gcGF0aC5yZXNvbHZlKG1hdGNoWzFdKVxuICAgICAgICBjb25zdCBsaW5lc0V4cHJlc3Npb24gPSBtYXRjaFsyXVxuICAgICAgICBpZiAobGluZXNFeHByZXNzaW9uKSB7XG4gICAgICAgICAgaWYgKCFtYXBwaW5nW3VyaV0pIHtcbiAgICAgICAgICAgIG1hcHBpbmdbdXJpXSA9IFtdXG4gICAgICAgICAgfVxuICAgICAgICAgIGxpbmVzRXhwcmVzc2lvblxuICAgICAgICAgICAgLnNsaWNlKDEpXG4gICAgICAgICAgICAuc3BsaXQoJzonKVxuICAgICAgICAgICAgLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgICAgICAgIG1hcHBpbmdbdXJpXS5wdXNoKHBhcnNlSW50KGxpbmUpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG1hcHBpbmdcbiAgfVxuXG4gIG1hdGNoZXMoeyBwaWNrbGUsIHVyaSB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubWF0Y2hlc0FueUxpbmUoeyBwaWNrbGUsIHVyaSB9KSAmJlxuICAgICAgdGhpcy5tYXRjaGVzQW55TmFtZShwaWNrbGUpICYmXG4gICAgICB0aGlzLm1hdGNoZXNBbGxUYWdFeHByZXNzaW9ucyhwaWNrbGUpXG4gICAgKVxuICB9XG5cbiAgbWF0Y2hlc0FueUxpbmUoeyBwaWNrbGUsIHVyaSB9KSB7XG4gICAgY29uc3QgbGluZXMgPSB0aGlzLmZlYXR1cmVVcmlUb0xpbmVzTWFwcGluZ1twYXRoLnJlc29sdmUodXJpKV1cbiAgICBpZiAobGluZXMpIHtcbiAgICAgIHJldHVybiBfLnNpemUoXy5pbnRlcnNlY3Rpb24obGluZXMsIF8ubWFwKHBpY2tsZS5sb2NhdGlvbnMsICdsaW5lJykpKSA+IDBcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIG1hdGNoZXNBbnlOYW1lKHBpY2tsZSkge1xuICAgIGlmICh0aGlzLm5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIF8uc29tZSh0aGlzLm5hbWVzLCBuYW1lID0+IHBpY2tsZS5uYW1lLm1hdGNoKG5hbWUpKVxuICB9XG5cbiAgbWF0Y2hlc0FsbFRhZ0V4cHJlc3Npb25zKHBpY2tsZSkge1xuICAgIGlmICghdGhpcy50YWdFeHByZXNzaW9uTm9kZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudGFnRXhwcmVzc2lvbk5vZGUuZXZhbHVhdGUoXy5tYXAocGlja2xlLnRhZ3MsICduYW1lJykpXG4gIH1cbn1cbiJdfQ==