'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepKeywordType = getStepKeywordType;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gherkin = require('gherkin');

var _gherkin2 = _interopRequireDefault(_gherkin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = {
  EVENT: 'event',
  OUTCOME: 'outcome',
  PRECONDITION: 'precondition'
};

exports.default = types;
function getStepKeywordType(_ref) {
  var keyword = _ref.keyword,
      language = _ref.language,
      previousKeywordType = _ref.previousKeywordType;

  var dialect = _gherkin2.default.DIALECTS[language];
  var type = _lodash2.default.find(['given', 'when', 'then', 'and', 'but'], function (key) {
    return _lodash2.default.includes(dialect[key], keyword);
  });
  switch (type) {
    case 'when':
      return types.EVENT;
    case 'then':
      return types.OUTCOME;
    case 'and':
    case 'but':
      if (previousKeywordType) {
        return previousKeywordType;
      }
    // fallthrough
    default:
      return types.PRECONDITION;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtYXR0ZXIvaGVscGVycy9rZXl3b3JkX3R5cGUuanMiXSwibmFtZXMiOlsiZ2V0U3RlcEtleXdvcmRUeXBlIiwidHlwZXMiLCJFVkVOVCIsIk9VVENPTUUiLCJQUkVDT05ESVRJT04iLCJrZXl3b3JkIiwibGFuZ3VhZ2UiLCJwcmV2aW91c0tleXdvcmRUeXBlIiwiZGlhbGVjdCIsIkRJQUxFQ1RTIiwidHlwZSIsImZpbmQiLCJpbmNsdWRlcyIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFXZ0JBLGtCLEdBQUFBLGtCOztBQVhoQjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxRQUFRO0FBQ1pDLFNBQU8sT0FESztBQUVaQyxXQUFTLFNBRkc7QUFHWkMsZ0JBQWM7QUFIRixDQUFkOztrQkFNZUgsSztBQUVSLFNBQVNELGtCQUFULE9BQXdFO0FBQUEsTUFBMUNLLE9BQTBDLFFBQTFDQSxPQUEwQztBQUFBLE1BQWpDQyxRQUFpQyxRQUFqQ0EsUUFBaUM7QUFBQSxNQUF2QkMsbUJBQXVCLFFBQXZCQSxtQkFBdUI7O0FBQzdFLE1BQU1DLFVBQVUsa0JBQVFDLFFBQVIsQ0FBaUJILFFBQWpCLENBQWhCO0FBQ0EsTUFBTUksT0FBTyxpQkFBRUMsSUFBRixDQUFPLENBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsTUFBbEIsRUFBMEIsS0FBMUIsRUFBaUMsS0FBakMsQ0FBUCxFQUFnRDtBQUFBLFdBQzNELGlCQUFFQyxRQUFGLENBQVdKLFFBQVFLLEdBQVIsQ0FBWCxFQUF5QlIsT0FBekIsQ0FEMkQ7QUFBQSxHQUFoRCxDQUFiO0FBR0EsVUFBUUssSUFBUjtBQUNFLFNBQUssTUFBTDtBQUNFLGFBQU9ULE1BQU1DLEtBQWI7QUFDRixTQUFLLE1BQUw7QUFDRSxhQUFPRCxNQUFNRSxPQUFiO0FBQ0YsU0FBSyxLQUFMO0FBQ0EsU0FBSyxLQUFMO0FBQ0UsVUFBSUksbUJBQUosRUFBeUI7QUFDdkIsZUFBT0EsbUJBQVA7QUFDRDtBQUNIO0FBQ0E7QUFDRSxhQUFPTixNQUFNRyxZQUFiO0FBWko7QUFjRCIsImZpbGUiOiJrZXl3b3JkX3R5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgR2hlcmtpbiBmcm9tICdnaGVya2luJ1xuXG5jb25zdCB0eXBlcyA9IHtcbiAgRVZFTlQ6ICdldmVudCcsXG4gIE9VVENPTUU6ICdvdXRjb21lJyxcbiAgUFJFQ09ORElUSU9OOiAncHJlY29uZGl0aW9uJyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHlwZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0ZXBLZXl3b3JkVHlwZSh7IGtleXdvcmQsIGxhbmd1YWdlLCBwcmV2aW91c0tleXdvcmRUeXBlIH0pIHtcbiAgY29uc3QgZGlhbGVjdCA9IEdoZXJraW4uRElBTEVDVFNbbGFuZ3VhZ2VdXG4gIGNvbnN0IHR5cGUgPSBfLmZpbmQoWydnaXZlbicsICd3aGVuJywgJ3RoZW4nLCAnYW5kJywgJ2J1dCddLCBrZXkgPT5cbiAgICBfLmluY2x1ZGVzKGRpYWxlY3Rba2V5XSwga2V5d29yZClcbiAgKVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd3aGVuJzpcbiAgICAgIHJldHVybiB0eXBlcy5FVkVOVFxuICAgIGNhc2UgJ3RoZW4nOlxuICAgICAgcmV0dXJuIHR5cGVzLk9VVENPTUVcbiAgICBjYXNlICdhbmQnOlxuICAgIGNhc2UgJ2J1dCc6XG4gICAgICBpZiAocHJldmlvdXNLZXl3b3JkVHlwZSkge1xuICAgICAgICByZXR1cm4gcHJldmlvdXNLZXl3b3JkVHlwZVxuICAgICAgfVxuICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0eXBlcy5QUkVDT05ESVRJT05cbiAgfVxufVxuIl19