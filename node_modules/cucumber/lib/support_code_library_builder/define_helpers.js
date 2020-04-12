'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineTestCaseHook = defineTestCaseHook;
exports.defineTestRunHook = defineTestRunHook;
exports.defineStep = defineStep;
exports.defineParameterType = defineParameterType;

var _util = require('util');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('../formatter/helpers');

var _cucumberExpressions = require('cucumber-expressions');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _stacktraceJs = require('stacktrace-js');

var _stacktraceJs2 = _interopRequireDefault(_stacktraceJs);

var _step_definition = require('../models/step_definition');

var _step_definition2 = _interopRequireDefault(_step_definition);

var _test_case_hook_definition = require('../models/test_case_hook_definition');

var _test_case_hook_definition2 = _interopRequireDefault(_test_case_hook_definition);

var _test_run_hook_definition = require('../models/test_run_hook_definition');

var _test_run_hook_definition2 = _interopRequireDefault(_test_run_hook_definition);

var _validate_arguments = require('./validate_arguments');

var _validate_arguments2 = _interopRequireDefault(_validate_arguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineTestCaseHook(builder, collectionName) {
  return function (options, code) {
    if (typeof options === 'string') {
      options = { tags: options };
    } else if (typeof options === 'function') {
      code = options;
      options = {};
    }

    var _getDefinitionLineAnd = getDefinitionLineAndUri(builder.cwd),
        line = _getDefinitionLineAnd.line,
        uri = _getDefinitionLineAnd.uri;

    (0, _validate_arguments2.default)({
      args: { code: code, options: options },
      fnName: 'defineTestCaseHook',
      location: (0, _helpers.formatLocation)({ line: line, uri: uri })
    });
    var hookDefinition = new _test_case_hook_definition2.default({
      code: code,
      line: line,
      options: options,
      uri: uri
    });
    builder.options[collectionName].push(hookDefinition);
  };
}

function defineTestRunHook(builder, collectionName) {
  return function (options, code) {
    if (typeof options === 'string') {
      options = { tags: options };
    } else if (typeof options === 'function') {
      code = options;
      options = {};
    }

    var _getDefinitionLineAnd2 = getDefinitionLineAndUri(builder.cwd),
        line = _getDefinitionLineAnd2.line,
        uri = _getDefinitionLineAnd2.uri;

    (0, _validate_arguments2.default)({
      args: { code: code, options: options },
      fnName: 'defineTestRunHook',
      location: (0, _helpers.formatLocation)({ line: line, uri: uri })
    });
    var hookDefinition = new _test_run_hook_definition2.default({
      code: code,
      line: line,
      options: options,
      uri: uri
    });
    builder.options[collectionName].push(hookDefinition);
  };
}

function defineStep(builder) {
  return function (pattern, options, code) {
    if (typeof options === 'function') {
      code = options;
      options = {};
    }

    var _getDefinitionLineAnd3 = getDefinitionLineAndUri(builder.cwd),
        line = _getDefinitionLineAnd3.line,
        uri = _getDefinitionLineAnd3.uri;

    (0, _validate_arguments2.default)({
      args: { code: code, pattern: pattern, options: options },
      fnName: 'defineStep',
      location: (0, _helpers.formatLocation)({ line: line, uri: uri })
    });
    var stepDefinition = new _step_definition2.default({
      code: code,
      line: line,
      options: options,
      pattern: pattern,
      uri: uri
    });
    builder.options.stepDefinitions.push(stepDefinition);
  };
}

var projectPath = _path2.default.join(__dirname, '..', '..');
var projectSrcPath = _path2.default.join(projectPath, 'src');
var projectLibPath = _path2.default.join(projectPath, 'lib');

function getDefinitionLineAndUri(cwd) {
  var line = 'unknown';
  var uri = 'unknown';
  var stackframes = _stacktraceJs2.default.getSync();
  var stackframe = _lodash2.default.find(stackframes, function (frame) {
    var filename = frame.getFileName();
    return !_lodash2.default.includes(filename, projectSrcPath) && !_lodash2.default.includes(filename, projectLibPath);
  });
  if (stackframe) {
    line = stackframe.getLineNumber();
    uri = stackframe.getFileName();
    if (uri) {
      uri = _path2.default.relative(cwd, uri);
    }
  }
  return { line: line, uri: uri };
}

function defineParameterType(builder) {
  return function (_ref) {
    var name = _ref.name,
        typeName = _ref.typeName,
        regexp = _ref.regexp,
        transformer = _ref.transformer,
        useForSnippets = _ref.useForSnippets,
        preferForRegexpMatch = _ref.preferForRegexpMatch;

    var getTypeName = (0, _util.deprecate)(function () {
      return typeName;
    }, 'Cucumber defineParameterType: Use name instead of typeName');
    var _name = name || getTypeName();
    if (typeof useForSnippets !== 'boolean') useForSnippets = true;
    if (typeof preferForRegexpMatch !== 'boolean') preferForRegexpMatch = false;
    var parameterType = new _cucumberExpressions.ParameterType(_name, regexp, null, transformer, useForSnippets, preferForRegexpMatch);
    builder.options.parameterTypeRegistry.defineParameterType(parameterType);
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdXBwb3J0X2NvZGVfbGlicmFyeV9idWlsZGVyL2RlZmluZV9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImRlZmluZVRlc3RDYXNlSG9vayIsImRlZmluZVRlc3RSdW5Ib29rIiwiZGVmaW5lU3RlcCIsImRlZmluZVBhcmFtZXRlclR5cGUiLCJidWlsZGVyIiwiY29sbGVjdGlvbk5hbWUiLCJvcHRpb25zIiwiY29kZSIsInRhZ3MiLCJnZXREZWZpbml0aW9uTGluZUFuZFVyaSIsImN3ZCIsImxpbmUiLCJ1cmkiLCJhcmdzIiwiZm5OYW1lIiwibG9jYXRpb24iLCJob29rRGVmaW5pdGlvbiIsInB1c2giLCJwYXR0ZXJuIiwic3RlcERlZmluaXRpb24iLCJzdGVwRGVmaW5pdGlvbnMiLCJwcm9qZWN0UGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJwcm9qZWN0U3JjUGF0aCIsInByb2plY3RMaWJQYXRoIiwic3RhY2tmcmFtZXMiLCJnZXRTeW5jIiwic3RhY2tmcmFtZSIsImZpbmQiLCJmaWxlbmFtZSIsImZyYW1lIiwiZ2V0RmlsZU5hbWUiLCJpbmNsdWRlcyIsImdldExpbmVOdW1iZXIiLCJyZWxhdGl2ZSIsIm5hbWUiLCJ0eXBlTmFtZSIsInJlZ2V4cCIsInRyYW5zZm9ybWVyIiwidXNlRm9yU25pcHBldHMiLCJwcmVmZXJGb3JSZWdleHBNYXRjaCIsImdldFR5cGVOYW1lIiwiX25hbWUiLCJwYXJhbWV0ZXJUeXBlIiwicGFyYW1ldGVyVHlwZVJlZ2lzdHJ5Il0sIm1hcHBpbmdzIjoiOzs7OztRQVdnQkEsa0IsR0FBQUEsa0I7UUF3QkFDLGlCLEdBQUFBLGlCO1FBd0JBQyxVLEdBQUFBLFU7UUFnREFDLG1CLEdBQUFBLG1COztBQTNHaEI7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLFNBQVNILGtCQUFULENBQTRCSSxPQUE1QixFQUFxQ0MsY0FBckMs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QUhKQyxXQUdJLFFBSEpBLFdBR0k7QUFBQSxRQUZKQyxjQUVJLFFBRkpBLGNBRUk7QUFBQSxRQURKQyxvQkFDSSxRQURKQSxvQkFDSTs7QUFDSixRQUFNQyxjQUFjLHFCQUNsQjtBQUFBLGFBQU1MLFFBQU47QUFBQSxLQURrQixFQUVsQiw0REFGa0IsQ0FBcEI7QUFJQSxRQUFNTSxRQUFRUCxRQUFRTSxhQUF0QjtBQUNBLFFBQUksT0FBT0YsY0FBUCxLQUEwQixTQUE5QixFQUF5Q0EsaUJBQWlCLElBQWpCO0FBQ3pDLFFBQUksT0FBT0Msb0JBQVAsS0FBZ0MsU0FBcEMsRUFBK0NBLHVCQUF1QixLQUF2QjtBQUMvQyxRQUFNRyxnQkFBZ0IsdUNBQ3BCRCxLQURvQixFQUVwQkwsTUFGb0IsRUFHcEIsSUFIb0IsRUFJcEJDLFdBSm9CLEVBS3BCQyxjQUxvQixFQU1wQkMsb0JBTm9CLENBQXRCO0FBUUFyQyxZQUFRRSxPQUFSLENBQWdCdUMscUJBQWhCLENBQXNDMUMsbUJBQXRDLENBQTBEeUMsYUFBMUQ7QUFDRCxHQXhCRDtBQXlCRCIsImZpbGUiOiJkZWZpbmVfaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJ3V0aWwnXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBmb3JtYXRMb2NhdGlvbiB9IGZyb20gJy4uL2Zvcm1hdHRlci9oZWxwZXJzJ1xuaW1wb3J0IHsgUGFyYW1ldGVyVHlwZSB9IGZyb20gJ2N1Y3VtYmVyLWV4cHJlc3Npb25zJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBTdGFja1RyYWNlIGZyb20gJ3N0YWNrdHJhY2UtanMnXG5pbXBvcnQgU3RlcERlZmluaXRpb24gZnJvbSAnLi4vbW9kZWxzL3N0ZXBfZGVmaW5pdGlvbidcbmltcG9ydCBUZXN0Q2FzZUhvb2tEZWZpbml0aW9uIGZyb20gJy4uL21vZGVscy90ZXN0X2Nhc2VfaG9va19kZWZpbml0aW9uJ1xuaW1wb3J0IFRlc3RSdW5Ib29rRGVmaW5pdGlvbiBmcm9tICcuLi9tb2RlbHMvdGVzdF9ydW5faG9va19kZWZpbml0aW9uJ1xuaW1wb3J0IHZhbGlkYXRlQXJndW1lbnRzIGZyb20gJy4vdmFsaWRhdGVfYXJndW1lbnRzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVGVzdENhc2VIb29rKGJ1aWxkZXIsIGNvbGxlY3Rpb25OYW1lKSB7XG4gIHJldHVybiAob3B0aW9ucywgY29kZSkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdGlvbnMgPSB7IHRhZ3M6IG9wdGlvbnMgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvZGUgPSBvcHRpb25zXG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG4gICAgY29uc3QgeyBsaW5lLCB1cmkgfSA9IGdldERlZmluaXRpb25MaW5lQW5kVXJpKGJ1aWxkZXIuY3dkKVxuICAgIHZhbGlkYXRlQXJndW1lbnRzKHtcbiAgICAgIGFyZ3M6IHsgY29kZSwgb3B0aW9ucyB9LFxuICAgICAgZm5OYW1lOiAnZGVmaW5lVGVzdENhc2VIb29rJyxcbiAgICAgIGxvY2F0aW9uOiBmb3JtYXRMb2NhdGlvbih7IGxpbmUsIHVyaSB9KSxcbiAgICB9KVxuICAgIGNvbnN0IGhvb2tEZWZpbml0aW9uID0gbmV3IFRlc3RDYXNlSG9va0RlZmluaXRpb24oe1xuICAgICAgY29kZSxcbiAgICAgIGxpbmUsXG4gICAgICBvcHRpb25zLFxuICAgICAgdXJpLFxuICAgIH0pXG4gICAgYnVpbGRlci5vcHRpb25zW2NvbGxlY3Rpb25OYW1lXS5wdXNoKGhvb2tEZWZpbml0aW9uKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVUZXN0UnVuSG9vayhidWlsZGVyLCBjb2xsZWN0aW9uTmFtZSkge1xuICByZXR1cm4gKG9wdGlvbnMsIGNvZGUpID0+IHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRpb25zID0geyB0YWdzOiBvcHRpb25zIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb2RlID0gb3B0aW9uc1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuICAgIGNvbnN0IHsgbGluZSwgdXJpIH0gPSBnZXREZWZpbml0aW9uTGluZUFuZFVyaShidWlsZGVyLmN3ZClcbiAgICB2YWxpZGF0ZUFyZ3VtZW50cyh7XG4gICAgICBhcmdzOiB7IGNvZGUsIG9wdGlvbnMgfSxcbiAgICAgIGZuTmFtZTogJ2RlZmluZVRlc3RSdW5Ib29rJyxcbiAgICAgIGxvY2F0aW9uOiBmb3JtYXRMb2NhdGlvbih7IGxpbmUsIHVyaSB9KSxcbiAgICB9KVxuICAgIGNvbnN0IGhvb2tEZWZpbml0aW9uID0gbmV3IFRlc3RSdW5Ib29rRGVmaW5pdGlvbih7XG4gICAgICBjb2RlLFxuICAgICAgbGluZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICB1cmksXG4gICAgfSlcbiAgICBidWlsZGVyLm9wdGlvbnNbY29sbGVjdGlvbk5hbWVdLnB1c2goaG9va0RlZmluaXRpb24pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVN0ZXAoYnVpbGRlcikge1xuICByZXR1cm4gKHBhdHRlcm4sIG9wdGlvbnMsIGNvZGUpID0+IHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvZGUgPSBvcHRpb25zXG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG4gICAgY29uc3QgeyBsaW5lLCB1cmkgfSA9IGdldERlZmluaXRpb25MaW5lQW5kVXJpKGJ1aWxkZXIuY3dkKVxuICAgIHZhbGlkYXRlQXJndW1lbnRzKHtcbiAgICAgIGFyZ3M6IHsgY29kZSwgcGF0dGVybiwgb3B0aW9ucyB9LFxuICAgICAgZm5OYW1lOiAnZGVmaW5lU3RlcCcsXG4gICAgICBsb2NhdGlvbjogZm9ybWF0TG9jYXRpb24oeyBsaW5lLCB1cmkgfSksXG4gICAgfSlcbiAgICBjb25zdCBzdGVwRGVmaW5pdGlvbiA9IG5ldyBTdGVwRGVmaW5pdGlvbih7XG4gICAgICBjb2RlLFxuICAgICAgbGluZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBwYXR0ZXJuLFxuICAgICAgdXJpLFxuICAgIH0pXG4gICAgYnVpbGRlci5vcHRpb25zLnN0ZXBEZWZpbml0aW9ucy5wdXNoKHN0ZXBEZWZpbml0aW9uKVxuICB9XG59XG5cbmNvbnN0IHByb2plY3RQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJylcbmNvbnN0IHByb2plY3RTcmNQYXRoID0gcGF0aC5qb2luKHByb2plY3RQYXRoLCAnc3JjJylcbmNvbnN0IHByb2plY3RMaWJQYXRoID0gcGF0aC5qb2luKHByb2plY3RQYXRoLCAnbGliJylcblxuZnVuY3Rpb24gZ2V0RGVmaW5pdGlvbkxpbmVBbmRVcmkoY3dkKSB7XG4gIGxldCBsaW5lID0gJ3Vua25vd24nXG4gIGxldCB1cmkgPSAndW5rbm93bidcbiAgY29uc3Qgc3RhY2tmcmFtZXMgPSBTdGFja1RyYWNlLmdldFN5bmMoKVxuICBjb25zdCBzdGFja2ZyYW1lID0gXy5maW5kKHN0YWNrZnJhbWVzLCBmcmFtZSA9PiB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBmcmFtZS5nZXRGaWxlTmFtZSgpXG4gICAgcmV0dXJuIChcbiAgICAgICFfLmluY2x1ZGVzKGZpbGVuYW1lLCBwcm9qZWN0U3JjUGF0aCkgJiZcbiAgICAgICFfLmluY2x1ZGVzKGZpbGVuYW1lLCBwcm9qZWN0TGliUGF0aClcbiAgICApXG4gIH0pXG4gIGlmIChzdGFja2ZyYW1lKSB7XG4gICAgbGluZSA9IHN0YWNrZnJhbWUuZ2V0TGluZU51bWJlcigpXG4gICAgdXJpID0gc3RhY2tmcmFtZS5nZXRGaWxlTmFtZSgpXG4gICAgaWYgKHVyaSkge1xuICAgICAgdXJpID0gcGF0aC5yZWxhdGl2ZShjd2QsIHVyaSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgbGluZSwgdXJpIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVBhcmFtZXRlclR5cGUoYnVpbGRlcikge1xuICByZXR1cm4gKHtcbiAgICBuYW1lLFxuICAgIHR5cGVOYW1lLFxuICAgIHJlZ2V4cCxcbiAgICB0cmFuc2Zvcm1lcixcbiAgICB1c2VGb3JTbmlwcGV0cyxcbiAgICBwcmVmZXJGb3JSZWdleHBNYXRjaCxcbiAgfSkgPT4ge1xuICAgIGNvbnN0IGdldFR5cGVOYW1lID0gZGVwcmVjYXRlKFxuICAgICAgKCkgPT4gdHlwZU5hbWUsXG4gICAgICAnQ3VjdW1iZXIgZGVmaW5lUGFyYW1ldGVyVHlwZTogVXNlIG5hbWUgaW5zdGVhZCBvZiB0eXBlTmFtZSdcbiAgICApXG4gICAgY29uc3QgX25hbWUgPSBuYW1lIHx8IGdldFR5cGVOYW1lKClcbiAgICBpZiAodHlwZW9mIHVzZUZvclNuaXBwZXRzICE9PSAnYm9vbGVhbicpIHVzZUZvclNuaXBwZXRzID0gdHJ1ZVxuICAgIGlmICh0eXBlb2YgcHJlZmVyRm9yUmVnZXhwTWF0Y2ggIT09ICdib29sZWFuJykgcHJlZmVyRm9yUmVnZXhwTWF0Y2ggPSBmYWxzZVxuICAgIGNvbnN0IHBhcmFtZXRlclR5cGUgPSBuZXcgUGFyYW1ldGVyVHlwZShcbiAgICAgIF9uYW1lLFxuICAgICAgcmVnZXhwLFxuICAgICAgbnVsbCxcbiAgICAgIHRyYW5zZm9ybWVyLFxuICAgICAgdXNlRm9yU25pcHBldHMsXG4gICAgICBwcmVmZXJGb3JSZWdleHBNYXRjaFxuICAgIClcbiAgICBidWlsZGVyLm9wdGlvbnMucGFyYW1ldGVyVHlwZVJlZ2lzdHJ5LmRlZmluZVBhcmFtZXRlclR5cGUocGFyYW1ldGVyVHlwZSlcbiAgfVxufVxuIl19