'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _isStream = require('is-stream');

var _isStream2 = _interopRequireDefault(_isStream);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AttachmentManager = function () {
  function AttachmentManager(onAttachment) {
    (0, _classCallCheck3.default)(this, AttachmentManager);

    this.onAttachment = onAttachment;
  }

  (0, _createClass3.default)(AttachmentManager, [{
    key: 'create',
    value: function create(data, mediaType, callback) {
      if (Buffer.isBuffer(data)) {
        if (!mediaType) {
          throw Error('Buffer attachments must specify a media type');
        }
        this.createBufferAttachment(data, mediaType);
      } else if (_isStream2.default.readable(data)) {
        if (!mediaType) {
          throw Error('Stream attachments must specify a media type');
        }
        return this.createStreamAttachment(data, mediaType, callback);
      } else if (typeof data === 'string') {
        if (!mediaType) {
          mediaType = 'text/plain';
        }
        this.createStringAttachment(data, { type: mediaType });
      } else {
        throw Error('Invalid attachment data: must be a buffer, readable stream, or string');
      }
    }
  }, {
    key: 'createBufferAttachment',
    value: function createBufferAttachment(data, mediaType) {
      this.createStringAttachment(data.toString('base64'), {
        encoding: 'base64',
        type: mediaType
      });
    }
  }, {
    key: 'createStreamAttachment',
    value: function createStreamAttachment(data, mediaType, callback) {
      var _this = this;

      var promise = new _bluebird2.default(function (resolve, reject) {
        var buffers = [];
        data.on('data', function (chunk) {
          buffers.push(chunk);
        });
        data.on('end', function () {
          _this.createBufferAttachment(Buffer.concat(buffers), mediaType);
          resolve();
        });
        data.on('error', reject);
      });
      if (callback) {
        promise.then(callback, callback);
      } else {
        return promise;
      }
    }
  }, {
    key: 'createStringAttachment',
    value: function createStringAttachment(data, media) {
      this.onAttachment({ data: data, media: media });
    }
  }]);
  return AttachmentManager;
}();

exports.default = AttachmentManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydW50aW1lL2F0dGFjaG1lbnRfbWFuYWdlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJBdHRhY2htZW50TWFuYWdlciIsIm9uQXR0YWNobWVudCIsImRhdGEiLCJtZWRpYVR5cGUiLCJjYWxsYmFjayIsIkJ1ZmZlciIsImlzQnVmZmVyIiwiRXJyb3IiLCJjcmVhdGVCdWZmZXJBdHRhY2htZW50IiwicmVhZGFibGUiLCJjcmVhdGVTdHJlYW1BdHRhY2htZW50IiwiY3JlYXRlU3RyaW5nQXR0YWNobWVudCIsInR5cGUiLCJ0b1N0cmluZyIsImVuY29kaW5nIiwicHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJidWZmZXJzIiwib24iLCJwdXNoIiwiY2h1bmsiLCJjb25jYXQiLCJ0aGVuIiwibWVkaWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxpQjtBQUNuQiw2QkFBWUMsWUFBWixFQUEwQjtBQUFBOztBQUN4QixTQUFLQSxZQUFMLEdBQW9CQSxZQUFwQjtBQUNEOzs7OzJCQUVNQyxJLEVBQU1DLFMsRUFBV0MsUSxFQUFVO0FBQ2hDLFVBQUlDLE9BQU9DLFFBQVAsQ0FBZ0JKLElBQWhCLENBQUosRUFBMkI7QUFDekIsWUFBSSxDQUFDQyxTQUFMLEVBQWdCO0FBQ2QsZ0JBQU1JLE1BQU0sOENBQU4sQ0FBTjtBQUNEO0FBQ0QsYUFBS0Msc0JBQUwsQ0FBNEJOLElBQTVCLEVBQWtDQyxTQUFsQztBQUNELE9BTEQsTUFLTyxJQUFJLG1CQUFTTSxRQUFULENBQWtCUCxJQUFsQixDQUFKLEVBQTZCO0FBQ2xDLFlBQUksQ0FBQ0MsU0FBTCxFQUFnQjtBQUNkLGdCQUFNSSxNQUFNLDhDQUFOLENBQU47QUFDRDtBQUNELGVBQU8sS0FBS0csc0JBQUwsQ0FBNEJSLElBQTVCLEVBQWtDQyxTQUFsQyxFQUE2Q0MsUUFBN0MsQ0FBUDtBQUNELE9BTE0sTUFLQSxJQUFJLE9BQU9GLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDbkMsWUFBSSxDQUFDQyxTQUFMLEVBQWdCO0FBQ2RBLHNCQUFZLFlBQVo7QUFDRDtBQUNELGFBQUtRLHNCQUFMLENBQTRCVCxJQUE1QixFQUFrQyxFQUFFVSxNQUFNVCxTQUFSLEVBQWxDO0FBQ0QsT0FMTSxNQUtBO0FBQ0wsY0FBTUksTUFDSix1RUFESSxDQUFOO0FBR0Q7QUFDRjs7OzJDQUVzQkwsSSxFQUFNQyxTLEVBQVc7QUFDdEMsV0FBS1Esc0JBQUwsQ0FBNEJULEtBQUtXLFFBQUwsQ0FBYyxRQUFkLENBQTVCLEVBQXFEO0FBQ25EQyxrQkFBVSxRQUR5QztBQUVuREYsY0FBTVQ7QUFGNkMsT0FBckQ7QUFJRDs7OzJDQUVzQkQsSSxFQUFNQyxTLEVBQVdDLFEsRUFBVTtBQUFBOztBQUNoRCxVQUFNVyxVQUFVLHVCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUMvQyxZQUFNQyxVQUFVLEVBQWhCO0FBQ0FoQixhQUFLaUIsRUFBTCxDQUFRLE1BQVIsRUFBZ0IsaUJBQVM7QUFDdkJELGtCQUFRRSxJQUFSLENBQWFDLEtBQWI7QUFDRCxTQUZEO0FBR0FuQixhQUFLaUIsRUFBTCxDQUFRLEtBQVIsRUFBZSxZQUFNO0FBQ25CLGdCQUFLWCxzQkFBTCxDQUE0QkgsT0FBT2lCLE1BQVAsQ0FBY0osT0FBZCxDQUE1QixFQUFvRGYsU0FBcEQ7QUFDQWE7QUFDRCxTQUhEO0FBSUFkLGFBQUtpQixFQUFMLENBQVEsT0FBUixFQUFpQkYsTUFBakI7QUFDRCxPQVZlLENBQWhCO0FBV0EsVUFBSWIsUUFBSixFQUFjO0FBQ1pXLGdCQUFRUSxJQUFSLENBQWFuQixRQUFiLEVBQXVCQSxRQUF2QjtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU9XLE9BQVA7QUFDRDtBQUNGOzs7MkNBRXNCYixJLEVBQU1zQixLLEVBQU87QUFDbEMsV0FBS3ZCLFlBQUwsQ0FBa0IsRUFBRUMsVUFBRixFQUFRc0IsWUFBUixFQUFsQjtBQUNEOzs7OztrQkF4RGtCeEIsaUIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNTdHJlYW0gZnJvbSAnaXMtc3RyZWFtJ1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0dGFjaG1lbnRNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3Iob25BdHRhY2htZW50KSB7XG4gICAgdGhpcy5vbkF0dGFjaG1lbnQgPSBvbkF0dGFjaG1lbnRcbiAgfVxuXG4gIGNyZWF0ZShkYXRhLCBtZWRpYVR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgaWYgKCFtZWRpYVR5cGUpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0J1ZmZlciBhdHRhY2htZW50cyBtdXN0IHNwZWNpZnkgYSBtZWRpYSB0eXBlJylcbiAgICAgIH1cbiAgICAgIHRoaXMuY3JlYXRlQnVmZmVyQXR0YWNobWVudChkYXRhLCBtZWRpYVR5cGUpXG4gICAgfSBlbHNlIGlmIChpc1N0cmVhbS5yZWFkYWJsZShkYXRhKSkge1xuICAgICAgaWYgKCFtZWRpYVR5cGUpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1N0cmVhbSBhdHRhY2htZW50cyBtdXN0IHNwZWNpZnkgYSBtZWRpYSB0eXBlJylcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVN0cmVhbUF0dGFjaG1lbnQoZGF0YSwgbWVkaWFUeXBlLCBjYWxsYmFjaylcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKCFtZWRpYVR5cGUpIHtcbiAgICAgICAgbWVkaWFUeXBlID0gJ3RleHQvcGxhaW4nXG4gICAgICB9XG4gICAgICB0aGlzLmNyZWF0ZVN0cmluZ0F0dGFjaG1lbnQoZGF0YSwgeyB0eXBlOiBtZWRpYVR5cGUgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICdJbnZhbGlkIGF0dGFjaG1lbnQgZGF0YTogbXVzdCBiZSBhIGJ1ZmZlciwgcmVhZGFibGUgc3RyZWFtLCBvciBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQnVmZmVyQXR0YWNobWVudChkYXRhLCBtZWRpYVR5cGUpIHtcbiAgICB0aGlzLmNyZWF0ZVN0cmluZ0F0dGFjaG1lbnQoZGF0YS50b1N0cmluZygnYmFzZTY0JyksIHtcbiAgICAgIGVuY29kaW5nOiAnYmFzZTY0JyxcbiAgICAgIHR5cGU6IG1lZGlhVHlwZSxcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlU3RyZWFtQXR0YWNobWVudChkYXRhLCBtZWRpYVR5cGUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGJ1ZmZlcnMgPSBbXVxuICAgICAgZGF0YS5vbignZGF0YScsIGNodW5rID0+IHtcbiAgICAgICAgYnVmZmVycy5wdXNoKGNodW5rKVxuICAgICAgfSlcbiAgICAgIGRhdGEub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVCdWZmZXJBdHRhY2htZW50KEJ1ZmZlci5jb25jYXQoYnVmZmVycyksIG1lZGlhVHlwZSlcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9KVxuICAgICAgZGF0YS5vbignZXJyb3InLCByZWplY3QpXG4gICAgfSlcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHByb21pc2UudGhlbihjYWxsYmFjaywgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwcm9taXNlXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlU3RyaW5nQXR0YWNobWVudChkYXRhLCBtZWRpYSkge1xuICAgIHRoaXMub25BdHRhY2htZW50KHsgZGF0YSwgbWVkaWEgfSlcbiAgfVxufVxuIl19