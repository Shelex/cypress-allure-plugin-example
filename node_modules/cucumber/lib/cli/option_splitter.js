'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OptionSplitter = function () {
  function OptionSplitter() {
    (0, _classCallCheck3.default)(this, OptionSplitter);
  }

  (0, _createClass3.default)(OptionSplitter, null, [{
    key: 'split',
    value: function split(option) {
      var parts = option.split(/([^A-Z]):(?!\\)/);

      return parts.reduce(function (memo, part, i) {
        if (partNeedsRecombined(i)) {
          memo.push(parts.slice(i, i + 2).join(''));
        }

        return memo;
      }, []);
    }
  }]);
  return OptionSplitter;
}();

exports.default = OptionSplitter;


function partNeedsRecombined(i) {
  return i % 2 === 0;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvb3B0aW9uX3NwbGl0dGVyLmpzIl0sIm5hbWVzIjpbIk9wdGlvblNwbGl0dGVyIiwib3B0aW9uIiwicGFydHMiLCJzcGxpdCIsInJlZHVjZSIsIm1lbW8iLCJwYXJ0IiwiaSIsInBhcnROZWVkc1JlY29tYmluZWQiLCJwdXNoIiwic2xpY2UiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxjOzs7Ozs7OzBCQUNOQyxNLEVBQVE7QUFDbkIsVUFBTUMsUUFBUUQsT0FBT0UsS0FBUCxDQUFhLGlCQUFiLENBQWQ7O0FBRUEsYUFBT0QsTUFBTUUsTUFBTixDQUFhLFVBQUNDLElBQUQsRUFBT0MsSUFBUCxFQUFhQyxDQUFiLEVBQW1CO0FBQ3JDLFlBQUlDLG9CQUFvQkQsQ0FBcEIsQ0FBSixFQUE0QjtBQUMxQkYsZUFBS0ksSUFBTCxDQUFVUCxNQUFNUSxLQUFOLENBQVlILENBQVosRUFBZUEsSUFBSSxDQUFuQixFQUFzQkksSUFBdEIsQ0FBMkIsRUFBM0IsQ0FBVjtBQUNEOztBQUVELGVBQU9OLElBQVA7QUFDRCxPQU5NLEVBTUosRUFOSSxDQUFQO0FBT0Q7Ozs7O2tCQVhrQkwsYzs7O0FBY3JCLFNBQVNRLG1CQUFULENBQTZCRCxDQUE3QixFQUFnQztBQUM5QixTQUFPQSxJQUFJLENBQUosS0FBVSxDQUFqQjtBQUNEIiwiZmlsZSI6Im9wdGlvbl9zcGxpdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvblNwbGl0dGVyIHtcbiAgc3RhdGljIHNwbGl0KG9wdGlvbikge1xuICAgIGNvbnN0IHBhcnRzID0gb3B0aW9uLnNwbGl0KC8oW15BLVpdKTooPyFcXFxcKS8pXG5cbiAgICByZXR1cm4gcGFydHMucmVkdWNlKChtZW1vLCBwYXJ0LCBpKSA9PiB7XG4gICAgICBpZiAocGFydE5lZWRzUmVjb21iaW5lZChpKSkge1xuICAgICAgICBtZW1vLnB1c2gocGFydHMuc2xpY2UoaSwgaSArIDIpLmpvaW4oJycpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVtb1xuICAgIH0sIFtdKVxuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnROZWVkc1JlY29tYmluZWQoaSkge1xuICByZXR1cm4gaSAlIDIgPT09IDBcbn1cbiJdfQ==