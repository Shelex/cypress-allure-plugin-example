'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMock = createMock;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMock(input) {
  if (_lodash2.default.isArray(input)) {
    input = _lodash2.default.zipObject(input);
  }
  return _lodash2.default.mapValues(input, function (value) {
    return _sinon2.default.stub().returns(value);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXIvdGVzdF9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImNyZWF0ZU1vY2siLCJpbnB1dCIsImlzQXJyYXkiLCJ6aXBPYmplY3QiLCJtYXBWYWx1ZXMiLCJzdHViIiwicmV0dXJucyIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7OztRQUdnQkEsVSxHQUFBQSxVOztBQUhoQjs7OztBQUNBOzs7Ozs7QUFFTyxTQUFTQSxVQUFULENBQW9CQyxLQUFwQixFQUEyQjtBQUNoQyxNQUFJLGlCQUFFQyxPQUFGLENBQVVELEtBQVYsQ0FBSixFQUFzQjtBQUNwQkEsWUFBUSxpQkFBRUUsU0FBRixDQUFZRixLQUFaLENBQVI7QUFDRDtBQUNELFNBQU8saUJBQUVHLFNBQUYsQ0FBWUgsS0FBWixFQUFtQjtBQUFBLFdBQVMsZ0JBQU1JLElBQU4sR0FBYUMsT0FBYixDQUFxQkMsS0FBckIsQ0FBVDtBQUFBLEdBQW5CLENBQVA7QUFDRCIsImZpbGUiOiJ0ZXN0X2hlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNb2NrKGlucHV0KSB7XG4gIGlmIChfLmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgaW5wdXQgPSBfLnppcE9iamVjdChpbnB1dClcbiAgfVxuICByZXR1cm4gXy5tYXBWYWx1ZXMoaW5wdXQsIHZhbHVlID0+IHNpbm9uLnN0dWIoKS5yZXR1cm5zKHZhbHVlKSlcbn1cbiJdfQ==