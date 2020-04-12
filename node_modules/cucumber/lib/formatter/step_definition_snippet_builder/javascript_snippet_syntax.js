'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CALLBACK_NAME = 'callback';

var JavaScriptSnippetSyntax = function () {
  function JavaScriptSnippetSyntax(snippetInterface) {
    (0, _classCallCheck3.default)(this, JavaScriptSnippetSyntax);

    this.snippetInterface = snippetInterface;
  }

  (0, _createClass3.default)(JavaScriptSnippetSyntax, [{
    key: 'build',
    value: function build(_ref) {
      var _this = this;

      var comment = _ref.comment,
          generatedExpressions = _ref.generatedExpressions,
          functionName = _ref.functionName,
          stepParameterNames = _ref.stepParameterNames;

      var functionKeyword = 'function ';
      if (this.snippetInterface === 'async-await') {
        functionKeyword = 'async ' + functionKeyword;
      } else if (this.snippetInterface === 'generator') {
        functionKeyword += '*';
      }

      var implementation = void 0;
      if (this.snippetInterface === 'callback') {
        implementation = CALLBACK_NAME + '(null, \'pending\');';
      } else {
        implementation = "return 'pending';";
      }

      var definitionChoices = generatedExpressions.map(function (generatedExpression, index) {
        var prefix = index === 0 ? '' : '// ';
        var allParameterNames = generatedExpression.parameterNames.concat(stepParameterNames);
        if (_this.snippetInterface === 'callback') {
          allParameterNames.push(CALLBACK_NAME);
        }
        return prefix + functionName + '(\'' + generatedExpression.source.replace(/'/g, "\\'") + '\', ' + functionKeyword + '(' + allParameterNames.join(', ') + ') {\n';
      });

      return definitionChoices.join('') + '  // ' + comment + '\n' + ('  ' + implementation + '\n') + '});';
    }
  }]);
  return JavaScriptSnippetSyntax;
}();

exports.default = JavaScriptSnippetSyntax;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtYXR0ZXIvc3RlcF9kZWZpbml0aW9uX3NuaXBwZXRfYnVpbGRlci9qYXZhc2NyaXB0X3NuaXBwZXRfc3ludGF4LmpzIl0sIm5hbWVzIjpbIkNBTExCQUNLX05BTUUiLCJKYXZhU2NyaXB0U25pcHBldFN5bnRheCIsInNuaXBwZXRJbnRlcmZhY2UiLCJjb21tZW50IiwiZ2VuZXJhdGVkRXhwcmVzc2lvbnMiLCJmdW5jdGlvbk5hbWUiLCJzdGVwUGFyYW1ldGVyTmFtZXMiLCJmdW5jdGlvbktleXdvcmQiLCJpbXBsZW1lbnRhdGlvbiIsImRlZmluaXRpb25DaG9pY2VzIiwibWFwIiwiZ2VuZXJhdGVkRXhwcmVzc2lvbiIsImluZGV4IiwicHJlZml4IiwiYWxsUGFyYW1ldGVyTmFtZXMiLCJwYXJhbWV0ZXJOYW1lcyIsImNvbmNhdCIsInB1c2giLCJzb3VyY2UiLCJyZXBsYWNlIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLGdCQUFnQixVQUF0Qjs7SUFFcUJDLHVCO0FBQ25CLG1DQUFZQyxnQkFBWixFQUE4QjtBQUFBOztBQUM1QixTQUFLQSxnQkFBTCxHQUF3QkEsZ0JBQXhCO0FBQ0Q7Ozs7Z0NBRTBFO0FBQUE7O0FBQUEsVUFBbkVDLE9BQW1FLFFBQW5FQSxPQUFtRTtBQUFBLFVBQTFEQyxvQkFBMEQsUUFBMURBLG9CQUEwRDtBQUFBLFVBQXBDQyxZQUFvQyxRQUFwQ0EsWUFBb0M7QUFBQSxVQUF0QkMsa0JBQXNCLFFBQXRCQSxrQkFBc0I7O0FBQ3pFLFVBQUlDLGtCQUFrQixXQUF0QjtBQUNBLFVBQUksS0FBS0wsZ0JBQUwsS0FBMEIsYUFBOUIsRUFBNkM7QUFDM0NLLDBCQUFrQixXQUFXQSxlQUE3QjtBQUNELE9BRkQsTUFFTyxJQUFJLEtBQUtMLGdCQUFMLEtBQTBCLFdBQTlCLEVBQTJDO0FBQ2hESywyQkFBbUIsR0FBbkI7QUFDRDs7QUFFRCxVQUFJQyx1QkFBSjtBQUNBLFVBQUksS0FBS04sZ0JBQUwsS0FBMEIsVUFBOUIsRUFBMEM7QUFDeENNLHlCQUFvQlIsYUFBcEI7QUFDRCxPQUZELE1BRU87QUFDTFEseUJBQWlCLG1CQUFqQjtBQUNEOztBQUVELFVBQU1DLG9CQUFvQkwscUJBQXFCTSxHQUFyQixDQUN4QixVQUFDQyxtQkFBRCxFQUFzQkMsS0FBdEIsRUFBZ0M7QUFDOUIsWUFBTUMsU0FBU0QsVUFBVSxDQUFWLEdBQWMsRUFBZCxHQUFtQixLQUFsQztBQUNBLFlBQU1FLG9CQUFvQkgsb0JBQW9CSSxjQUFwQixDQUFtQ0MsTUFBbkMsQ0FDeEJWLGtCQUR3QixDQUExQjtBQUdBLFlBQUksTUFBS0osZ0JBQUwsS0FBMEIsVUFBOUIsRUFBMEM7QUFDeENZLDRCQUFrQkcsSUFBbEIsQ0FBdUJqQixhQUF2QjtBQUNEO0FBQ0QsZUFBVWEsU0FBU1IsWUFBbkIsV0FBb0NNLG9CQUFvQk8sTUFBcEIsQ0FBMkJDLE9BQTNCLENBQ2xDLElBRGtDLEVBRWxDLEtBRmtDLENBQXBDLFlBR09aLGVBSFAsU0FHMEJPLGtCQUFrQk0sSUFBbEIsQ0FBdUIsSUFBdkIsQ0FIMUI7QUFJRCxPQWJ1QixDQUExQjs7QUFnQkEsYUFDS1gsa0JBQWtCVyxJQUFsQixDQUF1QixFQUF2QixDQUFILGFBQXFDakIsT0FBckMsa0JBQ0tLLGNBREwsZ0JBREY7QUFLRDs7Ozs7a0JBekNrQlAsdUIiLCJmaWxlIjoiamF2YXNjcmlwdF9zbmlwcGV0X3N5bnRheC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENBTExCQUNLX05BTUUgPSAnY2FsbGJhY2snXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEphdmFTY3JpcHRTbmlwcGV0U3ludGF4IHtcbiAgY29uc3RydWN0b3Ioc25pcHBldEludGVyZmFjZSkge1xuICAgIHRoaXMuc25pcHBldEludGVyZmFjZSA9IHNuaXBwZXRJbnRlcmZhY2VcbiAgfVxuXG4gIGJ1aWxkKHsgY29tbWVudCwgZ2VuZXJhdGVkRXhwcmVzc2lvbnMsIGZ1bmN0aW9uTmFtZSwgc3RlcFBhcmFtZXRlck5hbWVzIH0pIHtcbiAgICBsZXQgZnVuY3Rpb25LZXl3b3JkID0gJ2Z1bmN0aW9uICdcbiAgICBpZiAodGhpcy5zbmlwcGV0SW50ZXJmYWNlID09PSAnYXN5bmMtYXdhaXQnKSB7XG4gICAgICBmdW5jdGlvbktleXdvcmQgPSAnYXN5bmMgJyArIGZ1bmN0aW9uS2V5d29yZFxuICAgIH0gZWxzZSBpZiAodGhpcy5zbmlwcGV0SW50ZXJmYWNlID09PSAnZ2VuZXJhdG9yJykge1xuICAgICAgZnVuY3Rpb25LZXl3b3JkICs9ICcqJ1xuICAgIH1cblxuICAgIGxldCBpbXBsZW1lbnRhdGlvblxuICAgIGlmICh0aGlzLnNuaXBwZXRJbnRlcmZhY2UgPT09ICdjYWxsYmFjaycpIHtcbiAgICAgIGltcGxlbWVudGF0aW9uID0gYCR7Q0FMTEJBQ0tfTkFNRX0obnVsbCwgJ3BlbmRpbmcnKTtgXG4gICAgfSBlbHNlIHtcbiAgICAgIGltcGxlbWVudGF0aW9uID0gXCJyZXR1cm4gJ3BlbmRpbmcnO1wiXG4gICAgfVxuXG4gICAgY29uc3QgZGVmaW5pdGlvbkNob2ljZXMgPSBnZW5lcmF0ZWRFeHByZXNzaW9ucy5tYXAoXG4gICAgICAoZ2VuZXJhdGVkRXhwcmVzc2lvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gaW5kZXggPT09IDAgPyAnJyA6ICcvLyAnXG4gICAgICAgIGNvbnN0IGFsbFBhcmFtZXRlck5hbWVzID0gZ2VuZXJhdGVkRXhwcmVzc2lvbi5wYXJhbWV0ZXJOYW1lcy5jb25jYXQoXG4gICAgICAgICAgc3RlcFBhcmFtZXRlck5hbWVzXG4gICAgICAgIClcbiAgICAgICAgaWYgKHRoaXMuc25pcHBldEludGVyZmFjZSA9PT0gJ2NhbGxiYWNrJykge1xuICAgICAgICAgIGFsbFBhcmFtZXRlck5hbWVzLnB1c2goQ0FMTEJBQ0tfTkFNRSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7cHJlZml4ICsgZnVuY3Rpb25OYW1lfSgnJHtnZW5lcmF0ZWRFeHByZXNzaW9uLnNvdXJjZS5yZXBsYWNlKFxuICAgICAgICAgIC8nL2csXG4gICAgICAgICAgXCJcXFxcJ1wiXG4gICAgICAgICl9JywgJHtmdW5jdGlvbktleXdvcmR9KCR7YWxsUGFyYW1ldGVyTmFtZXMuam9pbignLCAnKX0pIHtcXG5gXG4gICAgICB9XG4gICAgKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIGAke2RlZmluaXRpb25DaG9pY2VzLmpvaW4oJycpfSAgLy8gJHtjb21tZW50fVxcbmAgK1xuICAgICAgYCAgJHtpbXBsZW1lbnRhdGlvbn1cXG5gICtcbiAgICAgIGB9KTtgXG4gICAgKVxuICB9XG59XG4iXX0=