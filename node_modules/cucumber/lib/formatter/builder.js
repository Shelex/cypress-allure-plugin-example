'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _event_protocol_formatter = require('./event_protocol_formatter');

var _event_protocol_formatter2 = _interopRequireDefault(_event_protocol_formatter);

var _get_color_fns = require('./get_color_fns');

var _get_color_fns2 = _interopRequireDefault(_get_color_fns);

var _javascript_snippet_syntax = require('./step_definition_snippet_builder/javascript_snippet_syntax');

var _javascript_snippet_syntax2 = _interopRequireDefault(_javascript_snippet_syntax);

var _json_formatter = require('./json_formatter');

var _json_formatter2 = _interopRequireDefault(_json_formatter);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _progress_bar_formatter = require('./progress_bar_formatter');

var _progress_bar_formatter2 = _interopRequireDefault(_progress_bar_formatter);

var _progress_formatter = require('./progress_formatter');

var _progress_formatter2 = _interopRequireDefault(_progress_formatter);

var _rerun_formatter = require('./rerun_formatter');

var _rerun_formatter2 = _interopRequireDefault(_rerun_formatter);

var _snippets_formatter = require('./snippets_formatter');

var _snippets_formatter2 = _interopRequireDefault(_snippets_formatter);

var _step_definition_snippet_builder = require('./step_definition_snippet_builder');

var _step_definition_snippet_builder2 = _interopRequireDefault(_step_definition_snippet_builder);

var _summary_formatter = require('./summary_formatter');

var _summary_formatter2 = _interopRequireDefault(_summary_formatter);

var _usage_formatter = require('./usage_formatter');

var _usage_formatter2 = _interopRequireDefault(_usage_formatter);

var _usage_json_formatter = require('./usage_json_formatter');

var _usage_json_formatter2 = _interopRequireDefault(_usage_json_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormatterBuilder = function () {
  function FormatterBuilder() {
    (0, _classCallCheck3.default)(this, FormatterBuilder);
  }

  (0, _createClass3.default)(FormatterBuilder, null, [{
    key: 'build',
    value: function build(type, options) {
      var Formatter = FormatterBuilder.getConstructorByType(type, options);
      var extendedOptions = (0, _extends3.default)({
        colorFns: (0, _get_color_fns2.default)(options.colorsEnabled),
        snippetBuilder: FormatterBuilder.getStepDefinitionSnippetBuilder(options)
      }, options);
      return new Formatter(extendedOptions);
    }
  }, {
    key: 'getConstructorByType',
    value: function getConstructorByType(type, options) {
      switch (type) {
        case 'event-protocol':
          return _event_protocol_formatter2.default;
        case 'json':
          return _json_formatter2.default;
        case 'progress':
          return _progress_formatter2.default;
        case 'progress-bar':
          return _progress_bar_formatter2.default;
        case 'rerun':
          return _rerun_formatter2.default;
        case 'snippets':
          return _snippets_formatter2.default;
        case 'summary':
          return _summary_formatter2.default;
        case 'usage':
          return _usage_formatter2.default;
        case 'usage-json':
          return _usage_json_formatter2.default;
        default:
          return FormatterBuilder.loadCustomFormatter(type, options);
      }
    }
  }, {
    key: 'getStepDefinitionSnippetBuilder',
    value: function getStepDefinitionSnippetBuilder(_ref) {
      var cwd = _ref.cwd,
          snippetInterface = _ref.snippetInterface,
          snippetSyntax = _ref.snippetSyntax,
          supportCodeLibrary = _ref.supportCodeLibrary;

      if (!snippetInterface) {
        snippetInterface = 'synchronous';
      }
      var Syntax = _javascript_snippet_syntax2.default;
      if (snippetSyntax) {
        var fullSyntaxPath = _path2.default.resolve(cwd, snippetSyntax);
        Syntax = require(fullSyntaxPath);
      }
      return new _step_definition_snippet_builder2.default({
        snippetSyntax: new Syntax(snippetInterface),
        parameterTypeRegistry: supportCodeLibrary.parameterTypeRegistry
      });
    }
  }, {
    key: 'loadCustomFormatter',
    value: function loadCustomFormatter(customFormatterPath, _ref2) {
      var cwd = _ref2.cwd;

      var fullCustomFormatterPath = _path2.default.resolve(cwd, customFormatterPath);
      var CustomFormatter = require(fullCustomFormatterPath);
      if (typeof CustomFormatter === 'function') {
        return CustomFormatter;
      } else if (CustomFormatter && typeof CustomFormatter.default === 'function') {
        return CustomFormatter.default;
      }
      throw new Error('Custom formatter (' + customFormatterPath + ') does not export a function');
    }
  }]);
  return FormatterBuilder;
}();

exports.default = FormatterBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvYnVpbGRlci5qcyJdLCJuYW1lcyI6WyJGb3JtYXR0ZXJCdWlsZGVyIiwidHlwZSIsIm9wdGlvbnMiLCJGb3JtYXR0ZXIiLCJnZXRDb25zdHJ1Y3RvckJ5VHlwZSIsImV4dGVuZGVkT3B0aW9ucyIsImNvbG9yRm5zIiwiY29sb3JzRW5hYmxlZCIsInNuaXBwZXRCdWlsZGVyIiwiZ2V0U3RlcERlZmluaXRpb25TbmlwcGV0QnVpbGRlciIsImxvYWRDdXN0b21Gb3JtYXR0ZXIiLCJjd2QiLCJzbmlwcGV0SW50ZXJmYWNlIiwic25pcHBldFN5bnRheCIsInN1cHBvcnRDb2RlTGlicmFyeSIsIlN5bnRheCIsImZ1bGxTeW50YXhQYXRoIiwicmVzb2x2ZSIsInJlcXVpcmUiLCJwYXJhbWV0ZXJUeXBlUmVnaXN0cnkiLCJjdXN0b21Gb3JtYXR0ZXJQYXRoIiwiZnVsbEN1c3RvbUZvcm1hdHRlclBhdGgiLCJDdXN0b21Gb3JtYXR0ZXIiLCJkZWZhdWx0IiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLGdCOzs7Ozs7OzBCQUNOQyxJLEVBQU1DLE8sRUFBUztBQUMxQixVQUFNQyxZQUFZSCxpQkFBaUJJLG9CQUFqQixDQUFzQ0gsSUFBdEMsRUFBNENDLE9BQTVDLENBQWxCO0FBQ0EsVUFBTUc7QUFDSkMsa0JBQVUsNkJBQVlKLFFBQVFLLGFBQXBCLENBRE47QUFFSkMsd0JBQWdCUixpQkFBaUJTLCtCQUFqQixDQUFpRFAsT0FBakQ7QUFGWixTQUdEQSxPQUhDLENBQU47QUFLQSxhQUFPLElBQUlDLFNBQUosQ0FBY0UsZUFBZCxDQUFQO0FBQ0Q7Ozt5Q0FFMkJKLEksRUFBTUMsTyxFQUFTO0FBQ3pDLGNBQVFELElBQVI7QUFDRSxhQUFLLGdCQUFMO0FBQ0U7QUFDRixhQUFLLE1BQUw7QUFDRTtBQUNGLGFBQUssVUFBTDtBQUNFO0FBQ0YsYUFBSyxjQUFMO0FBQ0U7QUFDRixhQUFLLE9BQUw7QUFDRTtBQUNGLGFBQUssVUFBTDtBQUNFO0FBQ0YsYUFBSyxTQUFMO0FBQ0U7QUFDRixhQUFLLE9BQUw7QUFDRTtBQUNGLGFBQUssWUFBTDtBQUNFO0FBQ0Y7QUFDRSxpQkFBT0QsaUJBQWlCVSxtQkFBakIsQ0FBcUNULElBQXJDLEVBQTJDQyxPQUEzQyxDQUFQO0FBcEJKO0FBc0JEOzs7MERBT0U7QUFBQSxVQUpEUyxHQUlDLFFBSkRBLEdBSUM7QUFBQSxVQUhEQyxnQkFHQyxRQUhEQSxnQkFHQztBQUFBLFVBRkRDLGFBRUMsUUFGREEsYUFFQztBQUFBLFVBRERDLGtCQUNDLFFBRERBLGtCQUNDOztBQUNELFVBQUksQ0FBQ0YsZ0JBQUwsRUFBdUI7QUFDckJBLDJCQUFtQixhQUFuQjtBQUNEO0FBQ0QsVUFBSUcsNENBQUo7QUFDQSxVQUFJRixhQUFKLEVBQW1CO0FBQ2pCLFlBQU1HLGlCQUFpQixlQUFLQyxPQUFMLENBQWFOLEdBQWIsRUFBa0JFLGFBQWxCLENBQXZCO0FBQ0FFLGlCQUFTRyxRQUFRRixjQUFSLENBQVQ7QUFDRDtBQUNELGFBQU8sOENBQWlDO0FBQ3RDSCx1QkFBZSxJQUFJRSxNQUFKLENBQVdILGdCQUFYLENBRHVCO0FBRXRDTywrQkFBdUJMLG1CQUFtQks7QUFGSixPQUFqQyxDQUFQO0FBSUQ7Ozt3Q0FFMEJDLG1CLFNBQThCO0FBQUEsVUFBUFQsR0FBTyxTQUFQQSxHQUFPOztBQUN2RCxVQUFNVSwwQkFBMEIsZUFBS0osT0FBTCxDQUFhTixHQUFiLEVBQWtCUyxtQkFBbEIsQ0FBaEM7QUFDQSxVQUFNRSxrQkFBa0JKLFFBQVFHLHVCQUFSLENBQXhCO0FBQ0EsVUFBSSxPQUFPQyxlQUFQLEtBQTJCLFVBQS9CLEVBQTJDO0FBQ3pDLGVBQU9BLGVBQVA7QUFDRCxPQUZELE1BRU8sSUFDTEEsbUJBQ0EsT0FBT0EsZ0JBQWdCQyxPQUF2QixLQUFtQyxVQUY5QixFQUdMO0FBQ0EsZUFBT0QsZ0JBQWdCQyxPQUF2QjtBQUNEO0FBQ0QsWUFBTSxJQUFJQyxLQUFKLHdCQUNpQkosbUJBRGpCLGtDQUFOO0FBR0Q7Ozs7O2tCQXRFa0JwQixnQiIsImZpbGUiOiJidWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50UHJvdG9jb2xGb3JtYXR0ZXIgZnJvbSAnLi9ldmVudF9wcm90b2NvbF9mb3JtYXR0ZXInXG5pbXBvcnQgZ2V0Q29sb3JGbnMgZnJvbSAnLi9nZXRfY29sb3JfZm5zJ1xuaW1wb3J0IEphdmFzY3JpcHRTbmlwcGV0U3ludGF4IGZyb20gJy4vc3RlcF9kZWZpbml0aW9uX3NuaXBwZXRfYnVpbGRlci9qYXZhc2NyaXB0X3NuaXBwZXRfc3ludGF4J1xuaW1wb3J0IEpzb25Gb3JtYXR0ZXIgZnJvbSAnLi9qc29uX2Zvcm1hdHRlcidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgUHJvZ3Jlc3NCYXJGb3JtYXR0ZXIgZnJvbSAnLi9wcm9ncmVzc19iYXJfZm9ybWF0dGVyJ1xuaW1wb3J0IFByb2dyZXNzRm9ybWF0dGVyIGZyb20gJy4vcHJvZ3Jlc3NfZm9ybWF0dGVyJ1xuaW1wb3J0IFJlcnVuRm9ybWF0dGVyIGZyb20gJy4vcmVydW5fZm9ybWF0dGVyJ1xuaW1wb3J0IFNuaXBwZXRzRm9ybWF0dGVyIGZyb20gJy4vc25pcHBldHNfZm9ybWF0dGVyJ1xuaW1wb3J0IFN0ZXBEZWZpbml0aW9uU25pcHBldEJ1aWxkZXIgZnJvbSAnLi9zdGVwX2RlZmluaXRpb25fc25pcHBldF9idWlsZGVyJ1xuaW1wb3J0IFN1bW1hcnlGb3JtYXR0ZXIgZnJvbSAnLi9zdW1tYXJ5X2Zvcm1hdHRlcidcbmltcG9ydCBVc2FnZUZvcm1hdHRlciBmcm9tICcuL3VzYWdlX2Zvcm1hdHRlcidcbmltcG9ydCBVc2FnZUpzb25Gb3JtYXR0ZXIgZnJvbSAnLi91c2FnZV9qc29uX2Zvcm1hdHRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybWF0dGVyQnVpbGRlciB7XG4gIHN0YXRpYyBidWlsZCh0eXBlLCBvcHRpb25zKSB7XG4gICAgY29uc3QgRm9ybWF0dGVyID0gRm9ybWF0dGVyQnVpbGRlci5nZXRDb25zdHJ1Y3RvckJ5VHlwZSh0eXBlLCBvcHRpb25zKVxuICAgIGNvbnN0IGV4dGVuZGVkT3B0aW9ucyA9IHtcbiAgICAgIGNvbG9yRm5zOiBnZXRDb2xvckZucyhvcHRpb25zLmNvbG9yc0VuYWJsZWQpLFxuICAgICAgc25pcHBldEJ1aWxkZXI6IEZvcm1hdHRlckJ1aWxkZXIuZ2V0U3RlcERlZmluaXRpb25TbmlwcGV0QnVpbGRlcihvcHRpb25zKSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfVxuICAgIHJldHVybiBuZXcgRm9ybWF0dGVyKGV4dGVuZGVkT3B0aW9ucylcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb25zdHJ1Y3RvckJ5VHlwZSh0eXBlLCBvcHRpb25zKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdldmVudC1wcm90b2NvbCc6XG4gICAgICAgIHJldHVybiBFdmVudFByb3RvY29sRm9ybWF0dGVyXG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgcmV0dXJuIEpzb25Gb3JtYXR0ZXJcbiAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcbiAgICAgICAgcmV0dXJuIFByb2dyZXNzRm9ybWF0dGVyXG4gICAgICBjYXNlICdwcm9ncmVzcy1iYXInOlxuICAgICAgICByZXR1cm4gUHJvZ3Jlc3NCYXJGb3JtYXR0ZXJcbiAgICAgIGNhc2UgJ3JlcnVuJzpcbiAgICAgICAgcmV0dXJuIFJlcnVuRm9ybWF0dGVyXG4gICAgICBjYXNlICdzbmlwcGV0cyc6XG4gICAgICAgIHJldHVybiBTbmlwcGV0c0Zvcm1hdHRlclxuICAgICAgY2FzZSAnc3VtbWFyeSc6XG4gICAgICAgIHJldHVybiBTdW1tYXJ5Rm9ybWF0dGVyXG4gICAgICBjYXNlICd1c2FnZSc6XG4gICAgICAgIHJldHVybiBVc2FnZUZvcm1hdHRlclxuICAgICAgY2FzZSAndXNhZ2UtanNvbic6XG4gICAgICAgIHJldHVybiBVc2FnZUpzb25Gb3JtYXR0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBGb3JtYXR0ZXJCdWlsZGVyLmxvYWRDdXN0b21Gb3JtYXR0ZXIodHlwZSwgb3B0aW9ucylcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0U3RlcERlZmluaXRpb25TbmlwcGV0QnVpbGRlcih7XG4gICAgY3dkLFxuICAgIHNuaXBwZXRJbnRlcmZhY2UsXG4gICAgc25pcHBldFN5bnRheCxcbiAgICBzdXBwb3J0Q29kZUxpYnJhcnksXG4gIH0pIHtcbiAgICBpZiAoIXNuaXBwZXRJbnRlcmZhY2UpIHtcbiAgICAgIHNuaXBwZXRJbnRlcmZhY2UgPSAnc3luY2hyb25vdXMnXG4gICAgfVxuICAgIGxldCBTeW50YXggPSBKYXZhc2NyaXB0U25pcHBldFN5bnRheFxuICAgIGlmIChzbmlwcGV0U3ludGF4KSB7XG4gICAgICBjb25zdCBmdWxsU3ludGF4UGF0aCA9IHBhdGgucmVzb2x2ZShjd2QsIHNuaXBwZXRTeW50YXgpXG4gICAgICBTeW50YXggPSByZXF1aXJlKGZ1bGxTeW50YXhQYXRoKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFN0ZXBEZWZpbml0aW9uU25pcHBldEJ1aWxkZXIoe1xuICAgICAgc25pcHBldFN5bnRheDogbmV3IFN5bnRheChzbmlwcGV0SW50ZXJmYWNlKSxcbiAgICAgIHBhcmFtZXRlclR5cGVSZWdpc3RyeTogc3VwcG9ydENvZGVMaWJyYXJ5LnBhcmFtZXRlclR5cGVSZWdpc3RyeSxcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGxvYWRDdXN0b21Gb3JtYXR0ZXIoY3VzdG9tRm9ybWF0dGVyUGF0aCwgeyBjd2QgfSkge1xuICAgIGNvbnN0IGZ1bGxDdXN0b21Gb3JtYXR0ZXJQYXRoID0gcGF0aC5yZXNvbHZlKGN3ZCwgY3VzdG9tRm9ybWF0dGVyUGF0aClcbiAgICBjb25zdCBDdXN0b21Gb3JtYXR0ZXIgPSByZXF1aXJlKGZ1bGxDdXN0b21Gb3JtYXR0ZXJQYXRoKVxuICAgIGlmICh0eXBlb2YgQ3VzdG9tRm9ybWF0dGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gQ3VzdG9tRm9ybWF0dGVyXG4gICAgfSBlbHNlIGlmIChcbiAgICAgIEN1c3RvbUZvcm1hdHRlciAmJlxuICAgICAgdHlwZW9mIEN1c3RvbUZvcm1hdHRlci5kZWZhdWx0ID09PSAnZnVuY3Rpb24nXG4gICAgKSB7XG4gICAgICByZXR1cm4gQ3VzdG9tRm9ybWF0dGVyLmRlZmF1bHRcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEN1c3RvbSBmb3JtYXR0ZXIgKCR7Y3VzdG9tRm9ybWF0dGVyUGF0aH0pIGRvZXMgbm90IGV4cG9ydCBhIGZ1bmN0aW9uYFxuICAgIClcbiAgfVxufVxuIl19