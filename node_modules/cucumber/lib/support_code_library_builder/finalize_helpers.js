'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapDefinitions = wrapDefinitions;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilArity = require('util-arity');

var _utilArity2 = _interopRequireDefault(_utilArity);

var _isGenerator = require('is-generator');

var _isGenerator2 = _interopRequireDefault(_isGenerator);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapDefinitions(_ref) {
  var cwd = _ref.cwd,
      definitionFunctionWrapper = _ref.definitionFunctionWrapper,
      definitions = _ref.definitions;

  if (definitionFunctionWrapper) {
    definitions.forEach(function (definition) {
      var codeLength = definition.code.length;
      var wrappedFn = definitionFunctionWrapper(definition.code, definition.options.wrapperOptions);
      if (wrappedFn !== definition.code) {
        definition.code = (0, _utilArity2.default)(codeLength, wrappedFn);
      }
    });
  } else {
    var generatorDefinitions = _lodash2.default.filter(definitions, function (definition) {
      return _isGenerator2.default.fn(definition.code);
    });
    if (generatorDefinitions.length > 0) {
      var references = generatorDefinitions.map(function (definition) {
        return _path2.default.relative(cwd, definition.uri) + ':' + definition.line;
      }).join('\n  ');
      var message = '\n        The following hook/step definitions use generator functions:\n\n          ' + references + '\n\n        Use \'this.setDefinitionFunctionWrapper(fn)\' to wrap then in a function that returns a promise.\n        ';
      throw new Error(message);
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdXBwb3J0X2NvZGVfbGlicmFyeV9idWlsZGVyL2ZpbmFsaXplX2hlbHBlcnMuanMiXSwibmFtZXMiOlsid3JhcERlZmluaXRpb25zIiwiY3dkIiwiZGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlciIsImRlZmluaXRpb25zIiwiZm9yRWFjaCIsImNvZGVMZW5ndGgiLCJkZWZpbml0aW9uIiwiY29kZSIsImxlbmd0aCIsIndyYXBwZWRGbiIsIm9wdGlvbnMiLCJ3cmFwcGVyT3B0aW9ucyIsImdlbmVyYXRvckRlZmluaXRpb25zIiwiZmlsdGVyIiwiZm4iLCJyZWZlcmVuY2VzIiwibWFwIiwicmVsYXRpdmUiLCJ1cmkiLCJsaW5lIiwiam9pbiIsIm1lc3NhZ2UiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFLZ0JBLGUsR0FBQUEsZTs7QUFMaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLFNBQVNBLGVBQVQsT0FJSjtBQUFBLE1BSERDLEdBR0MsUUFIREEsR0FHQztBQUFBLE1BRkRDLHlCQUVDLFFBRkRBLHlCQUVDO0FBQUEsTUFEREMsV0FDQyxRQUREQSxXQUNDOztBQUNELE1BQUlELHlCQUFKLEVBQStCO0FBQzdCQyxnQkFBWUMsT0FBWixDQUFvQixzQkFBYztBQUNoQyxVQUFNQyxhQUFhQyxXQUFXQyxJQUFYLENBQWdCQyxNQUFuQztBQUNBLFVBQU1DLFlBQVlQLDBCQUNoQkksV0FBV0MsSUFESyxFQUVoQkQsV0FBV0ksT0FBWCxDQUFtQkMsY0FGSCxDQUFsQjtBQUlBLFVBQUlGLGNBQWNILFdBQVdDLElBQTdCLEVBQW1DO0FBQ2pDRCxtQkFBV0MsSUFBWCxHQUFrQix5QkFBTUYsVUFBTixFQUFrQkksU0FBbEIsQ0FBbEI7QUFDRDtBQUNGLEtBVEQ7QUFVRCxHQVhELE1BV087QUFDTCxRQUFNRyx1QkFBdUIsaUJBQUVDLE1BQUYsQ0FBU1YsV0FBVCxFQUFzQjtBQUFBLGFBQ2pELHNCQUFZVyxFQUFaLENBQWVSLFdBQVdDLElBQTFCLENBRGlEO0FBQUEsS0FBdEIsQ0FBN0I7QUFHQSxRQUFJSyxxQkFBcUJKLE1BQXJCLEdBQThCLENBQWxDLEVBQXFDO0FBQ25DLFVBQU1PLGFBQWFILHFCQUNoQkksR0FEZ0IsQ0FFZjtBQUFBLGVBQ0ssZUFBS0MsUUFBTCxDQUFjaEIsR0FBZCxFQUFtQkssV0FBV1ksR0FBOUIsQ0FETCxTQUMyQ1osV0FBV2EsSUFEdEQ7QUFBQSxPQUZlLEVBS2hCQyxJQUxnQixDQUtYLE1BTFcsQ0FBbkI7QUFNQSxVQUFNQyxtR0FHQU4sVUFIQSwySEFBTjtBQU9BLFlBQU0sSUFBSU8sS0FBSixDQUFVRCxPQUFWLENBQU47QUFDRDtBQUNGO0FBQ0YiLCJmaWxlIjoiZmluYWxpemVfaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCBhcml0eSBmcm9tICd1dGlsLWFyaXR5J1xuaW1wb3J0IGlzR2VuZXJhdG9yIGZyb20gJ2lzLWdlbmVyYXRvcidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwRGVmaW5pdGlvbnMoe1xuICBjd2QsXG4gIGRlZmluaXRpb25GdW5jdGlvbldyYXBwZXIsXG4gIGRlZmluaXRpb25zLFxufSkge1xuICBpZiAoZGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlcikge1xuICAgIGRlZmluaXRpb25zLmZvckVhY2goZGVmaW5pdGlvbiA9PiB7XG4gICAgICBjb25zdCBjb2RlTGVuZ3RoID0gZGVmaW5pdGlvbi5jb2RlLmxlbmd0aFxuICAgICAgY29uc3Qgd3JhcHBlZEZuID0gZGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlcihcbiAgICAgICAgZGVmaW5pdGlvbi5jb2RlLFxuICAgICAgICBkZWZpbml0aW9uLm9wdGlvbnMud3JhcHBlck9wdGlvbnNcbiAgICAgIClcbiAgICAgIGlmICh3cmFwcGVkRm4gIT09IGRlZmluaXRpb24uY29kZSkge1xuICAgICAgICBkZWZpbml0aW9uLmNvZGUgPSBhcml0eShjb2RlTGVuZ3RoLCB3cmFwcGVkRm4pXG4gICAgICB9XG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBnZW5lcmF0b3JEZWZpbml0aW9ucyA9IF8uZmlsdGVyKGRlZmluaXRpb25zLCBkZWZpbml0aW9uID0+XG4gICAgICBpc0dlbmVyYXRvci5mbihkZWZpbml0aW9uLmNvZGUpXG4gICAgKVxuICAgIGlmIChnZW5lcmF0b3JEZWZpbml0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gZ2VuZXJhdG9yRGVmaW5pdGlvbnNcbiAgICAgICAgLm1hcChcbiAgICAgICAgICBkZWZpbml0aW9uID0+XG4gICAgICAgICAgICBgJHtwYXRoLnJlbGF0aXZlKGN3ZCwgZGVmaW5pdGlvbi51cmkpfToke2RlZmluaXRpb24ubGluZX1gXG4gICAgICAgIClcbiAgICAgICAgLmpvaW4oJ1xcbiAgJylcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgXG4gICAgICAgIFRoZSBmb2xsb3dpbmcgaG9vay9zdGVwIGRlZmluaXRpb25zIHVzZSBnZW5lcmF0b3IgZnVuY3Rpb25zOlxuXG4gICAgICAgICAgJHtyZWZlcmVuY2VzfVxuXG4gICAgICAgIFVzZSAndGhpcy5zZXREZWZpbml0aW9uRnVuY3Rpb25XcmFwcGVyKGZuKScgdG8gd3JhcCB0aGVuIGluIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvbWlzZS5cbiAgICAgICAgYFxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gICAgfVxuICB9XG59XG4iXX0=