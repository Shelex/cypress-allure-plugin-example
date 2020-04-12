'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _gherkin_document_parser = require('./gherkin_document_parser');

var _pickle_parser = require('./pickle_parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventDataCollector = function () {
  function EventDataCollector(eventBroadcaster) {
    (0, _classCallCheck3.default)(this, EventDataCollector);

    eventBroadcaster.on('gherkin-document', this.storeGherkinDocument.bind(this)).on('pickle-accepted', this.storePickle.bind(this)).on('test-case-prepared', this.storeTestCase.bind(this)).on('test-step-attachment', this.storeTestStepAttachment.bind(this)).on('test-step-finished', this.storeTestStepResult.bind(this)).on('test-case-finished', this.storeTestCaseResult.bind(this));
    this.gherkinDocumentMap = {}; // uri to gherkinDocument
    this.pickleMap = {}; // uri:line to {pickle, uri}
    this.testCaseMap = {}; // uri:line to {sourceLocation, steps, result}
  }

  (0, _createClass3.default)(EventDataCollector, [{
    key: 'getTestCaseKey',
    value: function getTestCaseKey(_ref) {
      var uri = _ref.uri,
          line = _ref.line;

      return uri + ':' + line;
    }
  }, {
    key: 'getTestCaseData',
    value: function getTestCaseData(sourceLocation) {
      return {
        gherkinDocument: this.gherkinDocumentMap[sourceLocation.uri],
        pickle: this.pickleMap[this.getTestCaseKey(sourceLocation)],
        testCase: this.testCaseMap[this.getTestCaseKey(sourceLocation)]
      };
    }
  }, {
    key: 'getTestStepData',
    value: function getTestStepData(_ref2) {
      var sourceLocation = _ref2.testCase.sourceLocation,
          index = _ref2.index;

      var _getTestCaseData = this.getTestCaseData(sourceLocation),
          gherkinDocument = _getTestCaseData.gherkinDocument,
          pickle = _getTestCaseData.pickle,
          testCase = _getTestCaseData.testCase;

      var result = { testStep: testCase.steps[index] };
      if (result.testStep.sourceLocation) {
        var line = result.testStep.sourceLocation.line;

        result.gherkinKeyword = (0, _gherkin_document_parser.getStepLineToKeywordMap)(gherkinDocument)[line];
        result.pickleStep = (0, _pickle_parser.getStepLineToPickledStepMap)(pickle)[line];
      }
      return result;
    }
  }, {
    key: 'storeGherkinDocument',
    value: function storeGherkinDocument(_ref3) {
      var document = _ref3.document,
          uri = _ref3.uri;

      this.gherkinDocumentMap[uri] = document;
    }
  }, {
    key: 'storePickle',
    value: function storePickle(_ref4) {
      var pickle = _ref4.pickle,
          uri = _ref4.uri;

      this.pickleMap[uri + ':' + pickle.locations[0].line] = pickle;
    }
  }, {
    key: 'storeTestCase',
    value: function storeTestCase(_ref5) {
      var sourceLocation = _ref5.sourceLocation,
          steps = _ref5.steps;

      var key = this.getTestCaseKey(sourceLocation);
      this.testCaseMap[key] = { sourceLocation: sourceLocation, steps: steps };
    }
  }, {
    key: 'storeTestStepAttachment',
    value: function storeTestStepAttachment(_ref6) {
      var index = _ref6.index,
          testCase = _ref6.testCase,
          data = _ref6.data,
          media = _ref6.media;

      var key = this.getTestCaseKey(testCase.sourceLocation);
      var step = this.testCaseMap[key].steps[index];
      if (!step.attachments) {
        step.attachments = [];
      }
      step.attachments.push({ data: data, media: media });
    }
  }, {
    key: 'storeTestStepResult',
    value: function storeTestStepResult(_ref7) {
      var index = _ref7.index,
          testCase = _ref7.testCase,
          result = _ref7.result;

      var key = this.getTestCaseKey(testCase.sourceLocation);
      this.testCaseMap[key].steps[index].result = result;
    }
  }, {
    key: 'storeTestCaseResult',
    value: function storeTestCaseResult(_ref8) {
      var sourceLocation = _ref8.sourceLocation,
          result = _ref8.result;

      var key = this.getTestCaseKey(sourceLocation);
      this.testCaseMap[key].result = result;
    }
  }]);
  return EventDataCollector;
}();

exports.default = EventDataCollector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtYXR0ZXIvaGVscGVycy9ldmVudF9kYXRhX2NvbGxlY3Rvci5qcyJdLCJuYW1lcyI6WyJFdmVudERhdGFDb2xsZWN0b3IiLCJldmVudEJyb2FkY2FzdGVyIiwib24iLCJzdG9yZUdoZXJraW5Eb2N1bWVudCIsInN0b3JlUGlja2xlIiwic3RvcmVUZXN0Q2FzZSIsInN0b3JlVGVzdFN0ZXBBdHRhY2htZW50Iiwic3RvcmVUZXN0U3RlcFJlc3VsdCIsInN0b3JlVGVzdENhc2VSZXN1bHQiLCJnaGVya2luRG9jdW1lbnRNYXAiLCJwaWNrbGVNYXAiLCJ0ZXN0Q2FzZU1hcCIsInVyaSIsImxpbmUiLCJzb3VyY2VMb2NhdGlvbiIsImdoZXJraW5Eb2N1bWVudCIsInBpY2tsZSIsImdldFRlc3RDYXNlS2V5IiwidGVzdENhc2UiLCJpbmRleCIsImdldFRlc3RDYXNlRGF0YSIsInJlc3VsdCIsInRlc3RTdGVwIiwic3RlcHMiLCJnaGVya2luS2V5d29yZCIsInBpY2tsZVN0ZXAiLCJkb2N1bWVudCIsImxvY2F0aW9ucyIsImtleSIsImRhdGEiLCJtZWRpYSIsInN0ZXAiLCJhdHRhY2htZW50cyIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7SUFFcUJBLGtCO0FBQ25CLDhCQUFZQyxnQkFBWixFQUE4QjtBQUFBOztBQUM1QkEscUJBQ0dDLEVBREgsQ0FDTSxrQkFETixFQUM0QixLQUFLQyxvQkFEakMsTUFDNEIsSUFENUIsR0FFR0QsRUFGSCxDQUVNLGlCQUZOLEVBRTJCLEtBQUtFLFdBRmhDLE1BRTJCLElBRjNCLEdBR0dGLEVBSEgsQ0FHTSxvQkFITixFQUc4QixLQUFLRyxhQUhuQyxNQUc4QixJQUg5QixHQUlHSCxFQUpILENBSU0sc0JBSk4sRUFJZ0MsS0FBS0ksdUJBSnJDLE1BSWdDLElBSmhDLEdBS0dKLEVBTEgsQ0FLTSxvQkFMTixFQUs4QixLQUFLSyxtQkFMbkMsTUFLOEIsSUFMOUIs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S0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsRUFBRUosVUFBRixFQUFRQyxZQUFSLEVBQXRCO0FBQ0Q7OzsrQ0FFZ0Q7QUFBQSxVQUEzQlgsS0FBMkIsU0FBM0JBLEtBQTJCO0FBQUEsVUFBcEJELFFBQW9CLFNBQXBCQSxRQUFvQjtBQUFBLFVBQVZHLE1BQVUsU0FBVkEsTUFBVTs7QUFDL0MsVUFBTU8sTUFBTSxLQUFLWCxjQUFMLENBQW9CQyxTQUFTSixjQUE3QixDQUFaO0FBQ0EsV0FBS0gsV0FBTCxDQUFpQmlCLEdBQWpCLEVBQXNCTCxLQUF0QixDQUE0QkosS0FBNUIsRUFBbUNFLE1BQW5DLEdBQTRDQSxNQUE1QztBQUNEOzs7K0NBRStDO0FBQUEsVUFBMUJQLGNBQTBCLFNBQTFCQSxjQUEwQjtBQUFBLFVBQVZPLE1BQVUsU0FBVkEsTUFBVTs7QUFDOUMsVUFBTU8sTUFBTSxLQUFLWCxjQUFMLENBQW9CSCxjQUFwQixDQUFaO0FBQ0EsV0FBS0gsV0FBTCxDQUFpQmlCLEdBQWpCLEVBQXNCUCxNQUF0QixHQUErQkEsTUFBL0I7QUFDRDs7Ozs7a0JBckVrQnJCLGtCIiwiZmlsZSI6ImV2ZW50X2RhdGFfY29sbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U3RlcExpbmVUb0tleXdvcmRNYXAgfSBmcm9tICcuL2doZXJraW5fZG9jdW1lbnRfcGFyc2VyJ1xuaW1wb3J0IHsgZ2V0U3RlcExpbmVUb1BpY2tsZWRTdGVwTWFwIH0gZnJvbSAnLi9waWNrbGVfcGFyc2VyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERhdGFDb2xsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihldmVudEJyb2FkY2FzdGVyKSB7XG4gICAgZXZlbnRCcm9hZGNhc3RlclxuICAgICAgLm9uKCdnaGVya2luLWRvY3VtZW50JywgOjp0aGlzLnN0b3JlR2hlcmtpbkRvY3VtZW50KVxuICAgICAgLm9uKCdwaWNrbGUtYWNjZXB0ZWQnLCA6OnRoaXMuc3RvcmVQaWNrbGUpXG4gICAgICAub24oJ3Rlc3QtY2FzZS1wcmVwYXJlZCcsIDo6dGhpcy5zdG9yZVRlc3RDYXNlKVxuICAgICAgLm9uKCd0ZXN0LXN0ZXAtYXR0YWNobWVudCcsIDo6dGhpcy5zdG9yZVRlc3RTdGVwQXR0YWNobWVudClcbiAgICAgIC5vbigndGVzdC1zdGVwLWZpbmlzaGVkJywgOjp0aGlzLnN0b3JlVGVzdFN0ZXBSZXN1bHQpXG4gICAgICAub24oJ3Rlc3QtY2FzZS1maW5pc2hlZCcsIDo6dGhpcy5zdG9yZVRlc3RDYXNlUmVzdWx0KVxuICAgIHRoaXMuZ2hlcmtpbkRvY3VtZW50TWFwID0ge30gLy8gdXJpIHRvIGdoZXJraW5Eb2N1bWVudFxuICAgIHRoaXMucGlja2xlTWFwID0ge30gLy8gdXJpOmxpbmUgdG8ge3BpY2tsZSwgdXJpfVxuICAgIHRoaXMudGVzdENhc2VNYXAgPSB7fSAvLyB1cmk6bGluZSB0byB7c291cmNlTG9jYXRpb24sIHN0ZXBzLCByZXN1bHR9XG4gIH1cblxuICBnZXRUZXN0Q2FzZUtleSh7IHVyaSwgbGluZSB9KSB7XG4gICAgcmV0dXJuIGAke3VyaX06JHtsaW5lfWBcbiAgfVxuXG4gIGdldFRlc3RDYXNlRGF0YShzb3VyY2VMb2NhdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICBnaGVya2luRG9jdW1lbnQ6IHRoaXMuZ2hlcmtpbkRvY3VtZW50TWFwW3NvdXJjZUxvY2F0aW9uLnVyaV0sXG4gICAgICBwaWNrbGU6IHRoaXMucGlja2xlTWFwW3RoaXMuZ2V0VGVzdENhc2VLZXkoc291cmNlTG9jYXRpb24pXSxcbiAgICAgIHRlc3RDYXNlOiB0aGlzLnRlc3RDYXNlTWFwW3RoaXMuZ2V0VGVzdENhc2VLZXkoc291cmNlTG9jYXRpb24pXSxcbiAgICB9XG4gIH1cblxuICBnZXRUZXN0U3RlcERhdGEoeyB0ZXN0Q2FzZTogeyBzb3VyY2VMb2NhdGlvbiB9LCBpbmRleCB9KSB7XG4gICAgY29uc3QgeyBnaGVya2luRG9jdW1lbnQsIHBpY2tsZSwgdGVzdENhc2UgfSA9IHRoaXMuZ2V0VGVzdENhc2VEYXRhKFxuICAgICAgc291cmNlTG9jYXRpb25cbiAgICApXG4gICAgY29uc3QgcmVzdWx0ID0geyB0ZXN0U3RlcDogdGVzdENhc2Uuc3RlcHNbaW5kZXhdIH1cbiAgICBpZiAocmVzdWx0LnRlc3RTdGVwLnNvdXJjZUxvY2F0aW9uKSB7XG4gICAgICBjb25zdCB7IGxpbmUgfSA9IHJlc3VsdC50ZXN0U3RlcC5zb3VyY2VMb2NhdGlvblxuICAgICAgcmVzdWx0LmdoZXJraW5LZXl3b3JkID0gZ2V0U3RlcExpbmVUb0tleXdvcmRNYXAoZ2hlcmtpbkRvY3VtZW50KVtsaW5lXVxuICAgICAgcmVzdWx0LnBpY2tsZVN0ZXAgPSBnZXRTdGVwTGluZVRvUGlja2xlZFN0ZXBNYXAocGlja2xlKVtsaW5lXVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBzdG9yZUdoZXJraW5Eb2N1bWVudCh7IGRvY3VtZW50LCB1cmkgfSkge1xuICAgIHRoaXMuZ2hlcmtpbkRvY3VtZW50TWFwW3VyaV0gPSBkb2N1bWVudFxuICB9XG5cbiAgc3RvcmVQaWNrbGUoeyBwaWNrbGUsIHVyaSB9KSB7XG4gICAgdGhpcy5waWNrbGVNYXBbYCR7dXJpfToke3BpY2tsZS5sb2NhdGlvbnNbMF0ubGluZX1gXSA9IHBpY2tsZVxuICB9XG5cbiAgc3RvcmVUZXN0Q2FzZSh7IHNvdXJjZUxvY2F0aW9uLCBzdGVwcyB9KSB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5nZXRUZXN0Q2FzZUtleShzb3VyY2VMb2NhdGlvbilcbiAgICB0aGlzLnRlc3RDYXNlTWFwW2tleV0gPSB7IHNvdXJjZUxvY2F0aW9uLCBzdGVwcyB9XG4gIH1cblxuICBzdG9yZVRlc3RTdGVwQXR0YWNobWVudCh7IGluZGV4LCB0ZXN0Q2FzZSwgZGF0YSwgbWVkaWEgfSkge1xuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0VGVzdENhc2VLZXkodGVzdENhc2Uuc291cmNlTG9jYXRpb24pXG4gICAgY29uc3Qgc3RlcCA9IHRoaXMudGVzdENhc2VNYXBba2V5XS5zdGVwc1tpbmRleF1cbiAgICBpZiAoIXN0ZXAuYXR0YWNobWVudHMpIHtcbiAgICAgIHN0ZXAuYXR0YWNobWVudHMgPSBbXVxuICAgIH1cbiAgICBzdGVwLmF0dGFjaG1lbnRzLnB1c2goeyBkYXRhLCBtZWRpYSB9KVxuICB9XG5cbiAgc3RvcmVUZXN0U3RlcFJlc3VsdCh7IGluZGV4LCB0ZXN0Q2FzZSwgcmVzdWx0IH0pIHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLmdldFRlc3RDYXNlS2V5KHRlc3RDYXNlLnNvdXJjZUxvY2F0aW9uKVxuICAgIHRoaXMudGVzdENhc2VNYXBba2V5XS5zdGVwc1tpbmRleF0ucmVzdWx0ID0gcmVzdWx0XG4gIH1cblxuICBzdG9yZVRlc3RDYXNlUmVzdWx0KHsgc291cmNlTG9jYXRpb24sIHJlc3VsdCB9KSB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5nZXRUZXN0Q2FzZUtleShzb3VyY2VMb2NhdGlvbilcbiAgICB0aGlzLnRlc3RDYXNlTWFwW2tleV0ucmVzdWx0ID0gcmVzdWx0XG4gIH1cbn1cbiJdfQ==