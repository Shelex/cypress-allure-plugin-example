'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusMapping = getStatusMapping;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var statuses = {
  AMBIGUOUS: 'ambiguous',
  FAILED: 'failed',
  PASSED: 'passed',
  PENDING: 'pending',
  SKIPPED: 'skipped',
  UNDEFINED: 'undefined'
};

exports.default = statuses;
function getStatusMapping(initialValue) {
  return _lodash2.default.chain(statuses).map(function (status) {
    return [status, initialValue];
  }).fromPairs().value();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGF0dXMuanMiXSwibmFtZXMiOlsiZ2V0U3RhdHVzTWFwcGluZyIsInN0YXR1c2VzIiwiQU1CSUdVT1VTIiwiRkFJTEVEIiwiUEFTU0VEIiwiUEVORElORyIsIlNLSVBQRUQiLCJVTkRFRklORUQiLCJpbml0aWFsVmFsdWUiLCJjaGFpbiIsIm1hcCIsInN0YXR1cyIsImZyb21QYWlycyIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7OztRQWFnQkEsZ0IsR0FBQUEsZ0I7O0FBYmhCOzs7Ozs7QUFFQSxJQUFNQyxXQUFXO0FBQ2ZDLGFBQVcsV0FESTtBQUVmQyxVQUFRLFFBRk87QUFHZkMsVUFBUSxRQUhPO0FBSWZDLFdBQVMsU0FKTTtBQUtmQyxXQUFTLFNBTE07QUFNZkMsYUFBVztBQU5JLENBQWpCOztrQkFTZU4sUTtBQUVSLFNBQVNELGdCQUFULENBQTBCUSxZQUExQixFQUF3QztBQUM3QyxTQUFPLGlCQUFFQyxLQUFGLENBQVFSLFFBQVIsRUFDSlMsR0FESSxDQUNBO0FBQUEsV0FBVSxDQUFDQyxNQUFELEVBQVNILFlBQVQsQ0FBVjtBQUFBLEdBREEsRUFFSkksU0FGSSxHQUdKQyxLQUhJLEVBQVA7QUFJRCIsImZpbGUiOiJzdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmNvbnN0IHN0YXR1c2VzID0ge1xuICBBTUJJR1VPVVM6ICdhbWJpZ3VvdXMnLFxuICBGQUlMRUQ6ICdmYWlsZWQnLFxuICBQQVNTRUQ6ICdwYXNzZWQnLFxuICBQRU5ESU5HOiAncGVuZGluZycsXG4gIFNLSVBQRUQ6ICdza2lwcGVkJyxcbiAgVU5ERUZJTkVEOiAndW5kZWZpbmVkJyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhdHVzZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXR1c01hcHBpbmcoaW5pdGlhbFZhbHVlKSB7XG4gIHJldHVybiBfLmNoYWluKHN0YXR1c2VzKVxuICAgIC5tYXAoc3RhdHVzID0+IFtzdGF0dXMsIGluaXRpYWxWYWx1ZV0pXG4gICAgLmZyb21QYWlycygpXG4gICAgLnZhbHVlKClcbn1cbiJdfQ==