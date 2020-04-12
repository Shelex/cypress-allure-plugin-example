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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataTable = function () {
  function DataTable(gherkinData) {
    (0, _classCallCheck3.default)(this, DataTable);

    this.rawTable = gherkinData.rows.map(function (row) {
      return row.cells.map(function (cell) {
        return cell.value;
      });
    });
  }

  (0, _createClass3.default)(DataTable, [{
    key: 'hashes',
    value: function hashes() {
      var copy = this.raw();
      var keys = copy[0];
      var valuesArray = copy.slice(1);
      return valuesArray.map(function (values) {
        return _lodash2.default.zipObject(keys, values);
      });
    }
  }, {
    key: 'raw',
    value: function raw() {
      return this.rawTable.slice(0);
    }
  }, {
    key: 'rows',
    value: function rows() {
      var copy = this.raw();
      copy.shift();
      return copy;
    }
  }, {
    key: 'rowsHash',
    value: function rowsHash() {
      var rows = this.raw();
      var everyRowHasTwoColumns = _lodash2.default.every(rows, function (row) {
        return row.length === 2;
      });
      if (!everyRowHasTwoColumns) {
        throw new Error('rowsHash can only be called on a data table where all rows have exactly two columns');
      }
      return _lodash2.default.fromPairs(rows);
    }
  }]);
  return DataTable;
}();

exports.default = DataTable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvZGF0YV90YWJsZS5qcyJdLCJuYW1lcyI6WyJEYXRhVGFibGUiLCJnaGVya2luRGF0YSIsInJhd1RhYmxlIiwicm93cyIsIm1hcCIsInJvdyIsImNlbGxzIiwiY2VsbCIsInZhbHVlIiwiY29weSIsInJhdyIsImtleXMiLCJ2YWx1ZXNBcnJheSIsInNsaWNlIiwiemlwT2JqZWN0IiwidmFsdWVzIiwic2hpZnQiLCJldmVyeVJvd0hhc1R3b0NvbHVtbnMiLCJldmVyeSIsImxlbmd0aCIsIkVycm9yIiwiZnJvbVBhaXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLFM7QUFDbkIscUJBQVlDLFdBQVosRUFBeUI7QUFBQTs7QUFDdkIsU0FBS0MsUUFBTCxHQUFnQkQsWUFBWUUsSUFBWixDQUFpQkMsR0FBakIsQ0FBcUI7QUFBQSxhQUNuQ0MsSUFBSUMsS0FBSixDQUFVRixHQUFWLENBQWM7QUFBQSxlQUFRRyxLQUFLQyxLQUFiO0FBQUEsT0FBZCxDQURtQztBQUFBLEtBQXJCLENBQWhCO0FBR0Q7Ozs7NkJBRVE7QUFDUCxVQUFNQyxPQUFPLEtBQUtDLEdBQUwsRUFBYjtBQUNBLFVBQU1DLE9BQU9GLEtBQUssQ0FBTCxDQUFiO0FBQ0EsVUFBTUcsY0FBY0gsS0FBS0ksS0FBTCxDQUFXLENBQVgsQ0FBcEI7QUFDQSxhQUFPRCxZQUFZUixHQUFaLENBQWdCO0FBQUEsZUFBVSxpQkFBRVUsU0FBRixDQUFZSCxJQUFaLEVBQWtCSSxNQUFsQixDQUFWO0FBQUEsT0FBaEIsQ0FBUDtBQUNEOzs7MEJBRUs7QUFDSixhQUFPLEtBQUtiLFFBQUwsQ0FBY1csS0FBZCxDQUFvQixDQUFwQixDQUFQO0FBQ0Q7OzsyQkFFTTtBQUNMLFVBQU1KLE9BQU8sS0FBS0MsR0FBTCxFQUFiO0FBQ0FELFdBQUtPLEtBQUw7QUFDQSxhQUFPUCxJQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQU1OLE9BQU8sS0FBS08sR0FBTCxFQUFiO0FBQ0EsVUFBTU8sd0JBQXdCLGlCQUFFQyxLQUFGLENBQVFmLElBQVIsRUFBYztBQUFBLGVBQU9FLElBQUljLE1BQUosS0FBZSxDQUF0QjtBQUFBLE9BQWQsQ0FBOUI7QUFDQSxVQUFJLENBQUNGLHFCQUFMLEVBQTRCO0FBQzFCLGNBQU0sSUFBSUcsS0FBSixDQUNKLHFGQURJLENBQU47QUFHRDtBQUNELGFBQU8saUJBQUVDLFNBQUYsQ0FBWWxCLElBQVosQ0FBUDtBQUNEOzs7OztrQkFqQ2tCSCxTIiwiZmlsZSI6ImRhdGFfdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFUYWJsZSB7XG4gIGNvbnN0cnVjdG9yKGdoZXJraW5EYXRhKSB7XG4gICAgdGhpcy5yYXdUYWJsZSA9IGdoZXJraW5EYXRhLnJvd3MubWFwKHJvdyA9PlxuICAgICAgcm93LmNlbGxzLm1hcChjZWxsID0+IGNlbGwudmFsdWUpXG4gICAgKVxuICB9XG5cbiAgaGFzaGVzKCkge1xuICAgIGNvbnN0IGNvcHkgPSB0aGlzLnJhdygpXG4gICAgY29uc3Qga2V5cyA9IGNvcHlbMF1cbiAgICBjb25zdCB2YWx1ZXNBcnJheSA9IGNvcHkuc2xpY2UoMSlcbiAgICByZXR1cm4gdmFsdWVzQXJyYXkubWFwKHZhbHVlcyA9PiBfLnppcE9iamVjdChrZXlzLCB2YWx1ZXMpKVxuICB9XG5cbiAgcmF3KCkge1xuICAgIHJldHVybiB0aGlzLnJhd1RhYmxlLnNsaWNlKDApXG4gIH1cblxuICByb3dzKCkge1xuICAgIGNvbnN0IGNvcHkgPSB0aGlzLnJhdygpXG4gICAgY29weS5zaGlmdCgpXG4gICAgcmV0dXJuIGNvcHlcbiAgfVxuXG4gIHJvd3NIYXNoKCkge1xuICAgIGNvbnN0IHJvd3MgPSB0aGlzLnJhdygpXG4gICAgY29uc3QgZXZlcnlSb3dIYXNUd29Db2x1bW5zID0gXy5ldmVyeShyb3dzLCByb3cgPT4gcm93Lmxlbmd0aCA9PT0gMilcbiAgICBpZiAoIWV2ZXJ5Um93SGFzVHdvQ29sdW1ucykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAncm93c0hhc2ggY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgZGF0YSB0YWJsZSB3aGVyZSBhbGwgcm93cyBoYXZlIGV4YWN0bHkgdHdvIGNvbHVtbnMnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBfLmZyb21QYWlycyhyb3dzKVxuICB9XG59XG4iXX0=