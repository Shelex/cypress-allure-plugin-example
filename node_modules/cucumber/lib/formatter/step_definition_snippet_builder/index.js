'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _cucumberExpressions = require('cucumber-expressions');

var _helpers = require('../helpers');

var _step_arguments = require('../../step_arguments');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StepDefinitionSnippetBuilder = function () {
  function StepDefinitionSnippetBuilder(_ref) {
    var snippetSyntax = _ref.snippetSyntax,
        parameterTypeRegistry = _ref.parameterTypeRegistry;
    (0, _classCallCheck3.default)(this, StepDefinitionSnippetBuilder);

    this.snippetSyntax = snippetSyntax;
    this.cucumberExpressionGenerator = new _cucumberExpressions.CucumberExpressionGenerator(parameterTypeRegistry);
  }

  (0, _createClass3.default)(StepDefinitionSnippetBuilder, [{
    key: 'build',
    value: function build(_ref2) {
      var keywordType = _ref2.keywordType,
          pickleStep = _ref2.pickleStep;

      var comment = 'Write code here that turns the phrase above into concrete actions';
      var functionName = this.getFunctionName(keywordType);
      var generatedExpressions = this.cucumberExpressionGenerator.generateExpressions(pickleStep.text, true);
      var stepParameterNames = this.getStepParameterNames(pickleStep);
      return this.snippetSyntax.build({
        comment: comment,
        functionName: functionName,
        generatedExpressions: generatedExpressions,
        stepParameterNames: stepParameterNames
      });
    }
  }, {
    key: 'getFunctionName',
    value: function getFunctionName(keywordType) {
      switch (keywordType) {
        case _helpers.KeywordType.EVENT:
          return 'When';
        case _helpers.KeywordType.OUTCOME:
          return 'Then';
        case _helpers.KeywordType.PRECONDITION:
          return 'Given';
      }
    }
  }, {
    key: 'getStepParameterNames',
    value: function getStepParameterNames(step) {
      var iterator = (0, _step_arguments.buildStepArgumentIterator)({
        dataTable: function dataTable() {
          return 'dataTable';
        },
        docString: function docString() {
          return 'docString';
        }
      });
      return step.arguments.map(iterator);
    }
  }]);
  return StepDefinitionSnippetBuilder;
}();

exports.default = StepDefinitionSnippetBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtYXR0ZXIvc3RlcF9kZWZpbml0aW9uX3NuaXBwZXRfYnVpbGRlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdGVwRGVmaW5pdGlvblNuaXBwZXRCdWlsZGVyIiwic25pcHBldFN5bnRheCIsInBhcmFtZXRlclR5cGVSZWdpc3RyeSIsImN1Y3VtYmVyRXhwcmVzc2lvbkdlbmVyYXRvciIsImtleXdvcmRUeXBlIiwicGlja2xlU3RlcCIsImNvbW1lbnQiLCJmdW5jdGlvbk5hbWUiLCJnZXRGdW5jdGlvbk5hbWUiLCJnZW5lcmF0ZWRFeHByZXNzaW9ucyIsImdlbmVyYXRlRXhwcmVzc2lvbnMiLCJ0ZXh0Iiwic3RlcFBhcmFtZXRlck5hbWVzIiwiZ2V0U3RlcFBhcmFtZXRlck5hbWVzIiwiYnVpbGQiLCJFVkVOVCIsIk9VVENPTUUiLCJQUkVDT05ESVRJT04iLCJzdGVwIiwiaXRlcmF0b3IiLCJkYXRhVGFibGUiLCJkb2NTdHJpbmciLCJhcmd1bWVudHMiLCJtYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7SUFFcUJBLDRCO0FBQ25CLDhDQUFzRDtBQUFBLFFBQXhDQyxhQUF3QyxRQUF4Q0EsYUFBd0M7QUFBQSxRQUF6QkMscUJBQXlCLFFBQXpCQSxxQkFBeUI7QUFBQTs7QUFDcEQsU0FBS0QsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLRSwyQkFBTCxHQUFtQyxxREFDakNELHFCQURpQyxDQUFuQztBQUdEOzs7O2lDQUVrQztBQUFBLFVBQTNCRSxXQUEyQixTQUEzQkEsV0FBMkI7QUFBQSxVQUFkQyxVQUFjLFNBQWRBLFVBQWM7O0FBQ2pDLFVBQU1DLFVBQ0osbUVBREY7QUFFQSxVQUFNQyxlQUFlLEtBQUtDLGVBQUwsQ0FBcUJKLFdBQXJCLENBQXJCO0FBQ0EsVUFBTUssdUJBQXVCLEtBQUtOLDJCQUFMLENBQWlDTyxtQkFBakMsQ0FDM0JMLFdBQVdNLElBRGdCLEVBRTNCLElBRjJCLENBQTdCO0FBSUEsVUFBTUMscUJBQXFCLEtBQUtDLHFCQUFMLENBQTJCUixVQUEzQixDQUEzQjtBQUNBLGFBQU8sS0FBS0osYUFBTCxDQUFtQmEsS0FBbkIsQ0FBeUI7QUFDOUJSLHdCQUQ4QjtBQUU5QkMsa0NBRjhCO0FBRzlCRSxrREFIOEI7QUFJOUJHO0FBSjhCLE9BQXpCLENBQVA7QUFNRDs7O29DQUVlUixXLEVBQWE7QUFDM0IsY0FBUUEsV0FBUjtBQUNFLGFBQUsscUJBQVlXLEtBQWpCO0FBQ0UsaUJBQU8sTUFBUDtBQUNGLGFBQUsscUJBQVlDLE9BQWpCO0FBQ0UsaUJBQU8sTUFBUDtBQUNGLGFBQUsscUJBQVlDLFlBQWpCO0FBQ0UsaUJBQU8sT0FBUDtBQU5KO0FBUUQ7OzswQ0FFcUJDLEksRUFBTTtBQUMxQixVQUFNQyxXQUFXLCtDQUEwQjtBQUN6Q0MsbUJBQVc7QUFBQSxpQkFBTSxXQUFOO0FBQUEsU0FEOEI7QUFFekNDLG1CQUFXO0FBQUEsaUJBQU0sV0FBTjtBQUFBO0FBRjhCLE9BQTFCLENBQWpCO0FBSUEsYUFBT0gsS0FBS0ksU0FBTCxDQUFlQyxHQUFmLENBQW1CSixRQUFuQixDQUFQO0FBQ0Q7Ozs7O2tCQTFDa0JuQiw0QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEN1Y3VtYmVyRXhwcmVzc2lvbkdlbmVyYXRvciB9IGZyb20gJ2N1Y3VtYmVyLWV4cHJlc3Npb25zJ1xuaW1wb3J0IHsgS2V5d29yZFR5cGUgfSBmcm9tICcuLi9oZWxwZXJzJ1xuaW1wb3J0IHsgYnVpbGRTdGVwQXJndW1lbnRJdGVyYXRvciB9IGZyb20gJy4uLy4uL3N0ZXBfYXJndW1lbnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwRGVmaW5pdGlvblNuaXBwZXRCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoeyBzbmlwcGV0U3ludGF4LCBwYXJhbWV0ZXJUeXBlUmVnaXN0cnkgfSkge1xuICAgIHRoaXMuc25pcHBldFN5bnRheCA9IHNuaXBwZXRTeW50YXhcbiAgICB0aGlzLmN1Y3VtYmVyRXhwcmVzc2lvbkdlbmVyYXRvciA9IG5ldyBDdWN1bWJlckV4cHJlc3Npb25HZW5lcmF0b3IoXG4gICAgICBwYXJhbWV0ZXJUeXBlUmVnaXN0cnlcbiAgICApXG4gIH1cblxuICBidWlsZCh7IGtleXdvcmRUeXBlLCBwaWNrbGVTdGVwIH0pIHtcbiAgICBjb25zdCBjb21tZW50ID1cbiAgICAgICdXcml0ZSBjb2RlIGhlcmUgdGhhdCB0dXJucyB0aGUgcGhyYXNlIGFib3ZlIGludG8gY29uY3JldGUgYWN0aW9ucydcbiAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSB0aGlzLmdldEZ1bmN0aW9uTmFtZShrZXl3b3JkVHlwZSlcbiAgICBjb25zdCBnZW5lcmF0ZWRFeHByZXNzaW9ucyA9IHRoaXMuY3VjdW1iZXJFeHByZXNzaW9uR2VuZXJhdG9yLmdlbmVyYXRlRXhwcmVzc2lvbnMoXG4gICAgICBwaWNrbGVTdGVwLnRleHQsXG4gICAgICB0cnVlXG4gICAgKVxuICAgIGNvbnN0IHN0ZXBQYXJhbWV0ZXJOYW1lcyA9IHRoaXMuZ2V0U3RlcFBhcmFtZXRlck5hbWVzKHBpY2tsZVN0ZXApXG4gICAgcmV0dXJuIHRoaXMuc25pcHBldFN5bnRheC5idWlsZCh7XG4gICAgICBjb21tZW50LFxuICAgICAgZnVuY3Rpb25OYW1lLFxuICAgICAgZ2VuZXJhdGVkRXhwcmVzc2lvbnMsXG4gICAgICBzdGVwUGFyYW1ldGVyTmFtZXMsXG4gICAgfSlcbiAgfVxuXG4gIGdldEZ1bmN0aW9uTmFtZShrZXl3b3JkVHlwZSkge1xuICAgIHN3aXRjaCAoa2V5d29yZFR5cGUpIHtcbiAgICAgIGNhc2UgS2V5d29yZFR5cGUuRVZFTlQ6XG4gICAgICAgIHJldHVybiAnV2hlbidcbiAgICAgIGNhc2UgS2V5d29yZFR5cGUuT1VUQ09NRTpcbiAgICAgICAgcmV0dXJuICdUaGVuJ1xuICAgICAgY2FzZSBLZXl3b3JkVHlwZS5QUkVDT05ESVRJT046XG4gICAgICAgIHJldHVybiAnR2l2ZW4nXG4gICAgfVxuICB9XG5cbiAgZ2V0U3RlcFBhcmFtZXRlck5hbWVzKHN0ZXApIHtcbiAgICBjb25zdCBpdGVyYXRvciA9IGJ1aWxkU3RlcEFyZ3VtZW50SXRlcmF0b3Ioe1xuICAgICAgZGF0YVRhYmxlOiAoKSA9PiAnZGF0YVRhYmxlJyxcbiAgICAgIGRvY1N0cmluZzogKCkgPT4gJ2RvY1N0cmluZycsXG4gICAgfSlcbiAgICByZXR1cm4gc3RlcC5hcmd1bWVudHMubWFwKGl0ZXJhdG9yKVxuICB9XG59XG4iXX0=