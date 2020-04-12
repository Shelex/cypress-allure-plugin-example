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

var _stackChain = require('stack-chain');

var _stackChain2 = _interopRequireDefault(_stackChain);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StackTraceFilter = function () {
  function StackTraceFilter() {
    (0, _classCallCheck3.default)(this, StackTraceFilter);

    this.cucumberPath = _path2.default.join(__dirname, '..', '..');
  }

  (0, _createClass3.default)(StackTraceFilter, [{
    key: 'filter',
    value: function filter() {
      var _this = this;

      this.currentFilter = _stackChain2.default.filter.attach(function (_err, frames) {
        if (_this.isErrorInCucumber(frames)) {
          return frames;
        }
        var index = _lodash2.default.findIndex(frames, _this.isFrameInCucumber.bind(_this));
        if (index === -1) {
          return frames;
        }
        return frames.slice(0, index);
      });
    }
  }, {
    key: 'isErrorInCucumber',
    value: function isErrorInCucumber(frames) {
      var filteredFrames = _lodash2.default.reject(frames, this.isFrameInNode.bind(this));
      return filteredFrames.length > 0 && this.isFrameInCucumber(filteredFrames[0]);
    }
  }, {
    key: 'isFrameInCucumber',
    value: function isFrameInCucumber(frame) {
      var fileName = frame.getFileName() || '';
      return _lodash2.default.startsWith(fileName, this.cucumberPath);
    }
  }, {
    key: 'isFrameInNode',
    value: function isFrameInNode(frame) {
      var fileName = frame.getFileName() || '';
      return !_lodash2.default.includes(fileName, _path2.default.sep);
    }
  }, {
    key: 'unfilter',
    value: function unfilter() {
      _stackChain2.default.filter.deattach(this.currentFilter);
    }
  }]);
  return StackTraceFilter;
}();

exports.default = StackTraceFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydW50aW1lL3N0YWNrX3RyYWNlX2ZpbHRlci5qcyJdLCJuYW1lcyI6WyJTdGFja1RyYWNlRmlsdGVyIiwiY3VjdW1iZXJQYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImN1cnJlbnRGaWx0ZXIiLCJmaWx0ZXIiLCJhdHRhY2giLCJfZXJyIiwiZnJhbWVzIiwiaXNFcnJvckluQ3VjdW1iZXIiLCJpbmRleCIsImZpbmRJbmRleCIsImlzRnJhbWVJbkN1Y3VtYmVyIiwic2xpY2UiLCJmaWx0ZXJlZEZyYW1lcyIsInJlamVjdCIsImlzRnJhbWVJbk5vZGUiLCJsZW5ndGgiLCJmcmFtZSIsImZpbGVOYW1lIiwiZ2V0RmlsZU5hbWUiLCJzdGFydHNXaXRoIiwiaW5jbHVkZXMiLCJzZXAiLCJkZWF0dGFjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsZ0I7QUFDbkIsOEJBQWM7QUFBQTs7QUFDWixTQUFLQyxZQUFMLEdBQW9CLGVBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixJQUFyQixFQUEyQixJQUEzQixDQUFwQjtBQUNEOzs7OzZCQUVRO0FBQUE7O0FBQ1AsV0FBS0MsYUFBTCxHQUFxQixxQkFBV0MsTUFBWCxDQUFrQkMsTUFBbEIsQ0FBeUIsVUFBQ0MsSUFBRCxFQUFPQyxNQUFQLEVBQWtCO0FBQzlELFlBQUksTUFBS0MsaUJBQUwsQ0FBdUJELE1BQXZCLENBQUosRUFBb0M7QUFDbEMsaUJBQU9BLE1BQVA7QUFDRDtBQUNELFlBQU1FLFFBQVEsaUJBQUVDLFNBQUYsQ0FBWUgsTUFBWixFQUFzQixNQUFLSSxpQkFBM0IsYUFBZDtBQUNBLFlBQUlGLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2hCLGlCQUFPRixNQUFQO0FBQ0Q7QUFDRCxlQUFPQSxPQUFPSyxLQUFQLENBQWEsQ0FBYixFQUFnQkgsS0FBaEIsQ0FBUDtBQUNELE9BVG9CLENBQXJCO0FBVUQ7OztzQ0FFaUJGLE0sRUFBUTtBQUN4QixVQUFNTSxpQkFBaUIsaUJBQUVDLE1BQUYsQ0FBU1AsTUFBVCxFQUFtQixLQUFLUSxhQUF4QixNQUFtQixJQUFuQixFQUF2QjtBQUNBLGFBQ0VGLGVBQWVHLE1BQWYsR0FBd0IsQ0FBeEIsSUFBNkIsS0FBS0wsaUJBQUwsQ0FBdUJFLGVBQWUsQ0FBZixDQUF2QixDQUQvQjtBQUdEOzs7c0NBRWlCSSxLLEVBQU87QUFDdkIsVUFBTUMsV0FBV0QsTUFBTUUsV0FBTixNQUF1QixFQUF4QztBQUNBLGFBQU8saUJBQUVDLFVBQUYsQ0FBYUYsUUFBYixFQUF1QixLQUFLbEIsWUFBNUIsQ0FBUDtBQUNEOzs7a0NBRWFpQixLLEVBQU87QUFDbkIsVUFBTUMsV0FBV0QsTUFBTUUsV0FBTixNQUF1QixFQUF4QztBQUNBLGFBQU8sQ0FBQyxpQkFBRUUsUUFBRixDQUFXSCxRQUFYLEVBQXFCLGVBQUtJLEdBQTFCLENBQVI7QUFDRDs7OytCQUVVO0FBQ1QsMkJBQVdsQixNQUFYLENBQWtCbUIsUUFBbEIsQ0FBMkIsS0FBS3BCLGFBQWhDO0FBQ0Q7Ozs7O2tCQXJDa0JKLGdCIiwiZmlsZSI6InN0YWNrX3RyYWNlX2ZpbHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBzdGFja0NoYWluIGZyb20gJ3N0YWNrLWNoYWluJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhY2tUcmFjZUZpbHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VjdW1iZXJQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJylcbiAgfVxuXG4gIGZpbHRlcigpIHtcbiAgICB0aGlzLmN1cnJlbnRGaWx0ZXIgPSBzdGFja0NoYWluLmZpbHRlci5hdHRhY2goKF9lcnIsIGZyYW1lcykgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNFcnJvckluQ3VjdW1iZXIoZnJhbWVzKSkge1xuICAgICAgICByZXR1cm4gZnJhbWVzXG4gICAgICB9XG4gICAgICBjb25zdCBpbmRleCA9IF8uZmluZEluZGV4KGZyYW1lcywgOjp0aGlzLmlzRnJhbWVJbkN1Y3VtYmVyKVxuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZnJhbWVzXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJhbWVzLnNsaWNlKDAsIGluZGV4KVxuICAgIH0pXG4gIH1cblxuICBpc0Vycm9ySW5DdWN1bWJlcihmcmFtZXMpIHtcbiAgICBjb25zdCBmaWx0ZXJlZEZyYW1lcyA9IF8ucmVqZWN0KGZyYW1lcywgOjp0aGlzLmlzRnJhbWVJbk5vZGUpXG4gICAgcmV0dXJuIChcbiAgICAgIGZpbHRlcmVkRnJhbWVzLmxlbmd0aCA+IDAgJiYgdGhpcy5pc0ZyYW1lSW5DdWN1bWJlcihmaWx0ZXJlZEZyYW1lc1swXSlcbiAgICApXG4gIH1cblxuICBpc0ZyYW1lSW5DdWN1bWJlcihmcmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lID0gZnJhbWUuZ2V0RmlsZU5hbWUoKSB8fCAnJ1xuICAgIHJldHVybiBfLnN0YXJ0c1dpdGgoZmlsZU5hbWUsIHRoaXMuY3VjdW1iZXJQYXRoKVxuICB9XG5cbiAgaXNGcmFtZUluTm9kZShmcmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lID0gZnJhbWUuZ2V0RmlsZU5hbWUoKSB8fCAnJ1xuICAgIHJldHVybiAhXy5pbmNsdWRlcyhmaWxlTmFtZSwgcGF0aC5zZXApXG4gIH1cblxuICB1bmZpbHRlcigpIHtcbiAgICBzdGFja0NoYWluLmZpbHRlci5kZWF0dGFjaCh0aGlzLmN1cnJlbnRGaWx0ZXIpXG4gIH1cbn1cbiJdfQ==