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

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _command_types = require('./command_types');

var _command_types2 = _interopRequireDefault(_command_types);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _status = require('../../status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slaveCommand = _path2.default.resolve(__dirname, '..', '..', '..', 'bin', 'run_slave');

var Master = function () {
  // options - {dryRun, failFast, filterStacktraces, strict}
  function Master(_ref) {
    var eventBroadcaster = _ref.eventBroadcaster,
        options = _ref.options,
        supportCodePaths = _ref.supportCodePaths,
        supportCodeRequiredModules = _ref.supportCodeRequiredModules,
        testCases = _ref.testCases;
    (0, _classCallCheck3.default)(this, Master);

    this.eventBroadcaster = eventBroadcaster;
    this.options = options || {};
    this.supportCodePaths = supportCodePaths;
    this.supportCodeRequiredModules = supportCodeRequiredModules;
    this.testCases = testCases || [];
    this.nextTestCaseIndex = 0;
    this.testCasesCompleted = 0;
    this.result = {
      duration: 0,
      success: true
    };
    this.slaves = {};
  }

  (0, _createClass3.default)(Master, [{
    key: 'parseSlaveLine',
    value: function parseSlaveLine(slave, line) {
      var input = JSON.parse(line);
      switch (input.command) {
        case _command_types2.default.READY:
          this.giveSlaveWork(slave);
          break;
        case _command_types2.default.EVENT:
          this.eventBroadcaster.emit(input.name, input.data);
          if (input.name === 'test-case-finished') {
            this.parseTestCaseResult(input.data.result);
          }
          break;
        default:
          throw new Error('Unexpected message from slave: ' + line);
      }
    }
  }, {
    key: 'startSlave',
    value: function startSlave(id, total) {
      var _this = this;

      var slaveProcess = _child_process2.default.spawn(slaveCommand, [], {
        env: _lodash2.default.assign({}, process.env, {
          CUCUMBER_PARALLEL: 'true',
          CUCUMBER_TOTAL_SLAVES: total,
          CUCUMBER_SLAVE_ID: id
        }),
        stdio: ['pipe', 'pipe', process.stderr]
      });
      var rl = _readline2.default.createInterface({ input: slaveProcess.stdout });
      var slave = { process: slaveProcess };
      this.slaves[id] = slave;
      rl.on('line', function (line) {
        _this.parseSlaveLine(slave, line);
      });
      rl.on('close', function () {
        slave.closed = true;
        _this.onSlaveClose();
      });
      slave.process.stdin.write(JSON.stringify({
        command: _command_types2.default.INITIALIZE,
        filterStacktraces: this.options.filterStacktraces,
        supportCodePaths: this.supportCodePaths,
        supportCodeRequiredModules: this.supportCodeRequiredModules,
        worldParameters: this.options.worldParameters
      }) + '\n');
    }
  }, {
    key: 'onSlaveClose',
    value: function onSlaveClose() {
      if (_lodash2.default.every(this.slaves, 'closed')) {
        this.eventBroadcaster.emit('test-run-finished', { result: this.result });
        this.onFinish(this.result.success);
      }
    }
  }, {
    key: 'parseTestCaseResult',
    value: function parseTestCaseResult(testCaseResult) {
      this.testCasesCompleted += 1;
      if (testCaseResult.duration) {
        this.result.duration += testCaseResult.duration;
      }
      if (this.shouldCauseFailure(testCaseResult.status)) {
        this.result.success = false;
      }
    }
  }, {
    key: 'run',
    value: function run(numberOfSlaves, done) {
      var _this2 = this;

      this.eventBroadcaster.emit('test-run-started');
      _lodash2.default.times(numberOfSlaves, function (id) {
        return _this2.startSlave(id, numberOfSlaves);
      });
      this.onFinish = done;
    }
  }, {
    key: 'giveSlaveWork',
    value: function giveSlaveWork(slave) {
      if (this.nextTestCaseIndex === this.testCases.length) {
        slave.process.stdin.write(JSON.stringify({ command: _command_types2.default.FINALIZE }) + '\n');
        return;
      }
      var testCase = this.testCases[this.nextTestCaseIndex];
      this.nextTestCaseIndex += 1;
      var skip = this.options.dryRun || this.options.failFast && !this.result.success;
      slave.process.stdin.write(JSON.stringify({ command: _command_types2.default.RUN, skip: skip, testCase: testCase }) + '\n');
    }
  }, {
    key: 'shouldCauseFailure',
    value: function shouldCauseFailure(status) {
      return _lodash2.default.includes([_status2.default.AMBIGUOUS, _status2.default.FAILED, _status2.default.UNDEFINED], status) || status === _status2.default.PENDING && this.options.strict;
    }
  }]);
  return Master;
}();

exports.default = Master;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ydW50aW1lL3BhcmFsbGVsL21hc3Rlci5qcyJdLCJuYW1lcyI6WyJzbGF2ZUNvbW1hbmQiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiTWFzdGVyIiwiZXZlbnRCcm9hZGNhc3RlciIsIm9wdGlvbnMiLCJzdXBwb3J0Q29kZVBhdGhzIiwic3VwcG9ydENvZGVSZXF1aXJlZE1vZHVsZXMiLCJ0ZXN0Q2FzZXMiLCJuZXh0VGVzdENhc2VJbmRleCIsInRlc3RDYXNlc0NvbXBsZXRlZCIsInJlc3VsdCIsImR1cmF0aW9uIiwic3VjY2VzcyIsInNsYXZlcyIsInNsYXZlIiwibGluZSIsImlucHV0IiwiSlNPTiIsInBhcnNlIiwiY29tbWFuZCIsIlJFQURZIiwiZ2l2ZVNsYXZlV29yayIsIkVWRU5UIiwiZW1pdCIsIm5hbWUiLCJkYXRhIiwicGFyc2VUZXN0Q2FzZVJlc3VsdCIsIkVycm9yIiwiaWQiLCJ0b3RhbCIsInNsYXZlUHJvY2VzcyIsInNwYXduIiwiZW52IiwiYXNzaWduIiwicHJvY2VzcyIsIkNVQ1VNQkVSX1BBUkFMTEVMIiwiQ1VDVU1CRVJfVE9UQUxfU0xBVkVTIiwiQ1VDVU1CRVJfU0xBVkVfSUQiLCJzdGRpbyIsInN0ZGVyciIsInJsIiwiY3JlYXRlSW50ZXJmYWNlIiwic3Rkb3V0Iiwib24iLCJwYXJzZVNsYXZlTGluZSIsImNsb3NlZCIsIm9uU2xhdmVDbG9zZSIsInN0ZGluIiwid3JpdGUiLCJzdHJpbmdpZnkiLCJJTklUSUFMSVpFIiwiZmlsdGVyU3RhY2t0cmFjZXMiLCJ3b3JsZFBhcmFtZXRlcnMiLCJldmVyeSIsIm9uRmluaXNoIiwidGVzdENhc2VSZXN1bHQiLCJzaG91bGRDYXVzZUZhaWx1cmUiLCJzdGF0dXMiLCJudW1iZXJPZlNsYXZlcyIsImRvbmUiLCJ0aW1lcyIsInN0YXJ0U2xhdmUiLCJsZW5ndGgiLCJGSU5BTElaRSIsInRlc3RDYXNlIiwic2tpcCIsImRyeVJ1biIsImZhaWxGYXN0IiwiUlVOIiwiaW5j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LFNBQUwsQ0FBZXVELE1BQTlDLEVBQXNEO0FBQ3BEaEQsY0FBTW9CLE9BQU4sQ0FBY2EsS0FBZCxDQUFvQkMsS0FBcEIsQ0FDRS9CLEtBQUtnQyxTQUFMLENBQWUsRUFBRTlCLFNBQVMsd0JBQWE0QyxRQUF4QixFQUFmLElBQXFELElBRHZEO0FBR0E7QUFDRDtBQUNELFVBQU1DLFdBQVcsS0FBS3pELFNBQUwsQ0FBZSxLQUFLQyxpQkFBcEIsQ0FBakI7QUFDQSxXQUFLQSxpQkFBTCxJQUEwQixDQUExQjtBQUNBLFVBQU15RCxPQUNKLEtBQUs3RCxPQUFMLENBQWE4RCxNQUFiLElBQXdCLEtBQUs5RCxPQUFMLENBQWErRCxRQUFiLElBQXlCLENBQUMsS0FBS3pELE1BQUwsQ0FBWUUsT0FEaEU7QUFFQUUsWUFBTW9CLE9BQU4sQ0FBY2EsS0FBZCxDQUFvQkMsS0FBcEIsQ0FDRS9CLEtBQUtnQyxTQUFMLENBQWUsRUFBRTlCLFNBQVMsd0JBQWFpRCxHQUF4QixFQUE2QkgsVUFBN0IsRUFBbUNELGtCQUFuQyxFQUFmLElBQWdFLElBRGxFO0FBR0Q7Ozt1Q0FFa0JQLE0sRUFBUTtBQUN6QixhQUNFLGlCQUFFWSxRQUFGLENBQVcsQ0FBQyxpQkFBT0MsU0FBUixFQUFtQixpQkFBT0MsTUFBMUIsRUFBa0MsaUJBQU9DLFNBQXpDLENBQVgsRUFBZ0VmLE1BQWhFLEtBQ0NBLFdBQVcsaUJBQU9nQixPQUFsQixJQUE2QixLQUFLckUsT0FBTCxDQUFhc0UsTUFGN0M7QUFJRDs7Ozs7a0JBbEhrQnhFLE0iLCJmaWxlIjoibWFzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IGNvbW1hbmRUeXBlcyBmcm9tICcuL2NvbW1hbmRfdHlwZXMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHJlYWRsaW5lIGZyb20gJ3JlYWRsaW5lJ1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuLi8uLi9zdGF0dXMnXG5cbmNvbnN0IHNsYXZlQ29tbWFuZCA9IHBhdGgucmVzb2x2ZShcbiAgX19kaXJuYW1lLFxuICAnLi4nLFxuICAnLi4nLFxuICAnLi4nLFxuICAnYmluJyxcbiAgJ3J1bl9zbGF2ZSdcbilcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFzdGVyIHtcbiAgLy8gb3B0aW9ucyAtIHtkcnlSdW4sIGZhaWxGYXN0LCBmaWx0ZXJTdGFja3RyYWNlcywgc3RyaWN0fVxuICBjb25zdHJ1Y3Rvcih7XG4gICAgZXZlbnRCcm9hZGNhc3RlcixcbiAgICBvcHRpb25zLFxuICAgIHN1cHBvcnRDb2RlUGF0aHMsXG4gICAgc3VwcG9ydENvZGVSZXF1aXJlZE1vZHVsZXMsXG4gICAgdGVzdENhc2VzLFxuICB9KSB7XG4gICAgdGhpcy5ldmVudEJyb2FkY2FzdGVyID0gZXZlbnRCcm9hZGNhc3RlclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICB0aGlzLnN1cHBvcnRDb2RlUGF0aHMgPSBzdXBwb3J0Q29kZVBhdGhzXG4gICAgdGhpcy5zdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcyA9IHN1cHBvcnRDb2RlUmVxdWlyZWRNb2R1bGVzXG4gICAgdGhpcy50ZXN0Q2FzZXMgPSB0ZXN0Q2FzZXMgfHwgW11cbiAgICB0aGlzLm5leHRUZXN0Q2FzZUluZGV4ID0gMFxuICAgIHRoaXMudGVzdENhc2VzQ29tcGxldGVkID0gMFxuICAgIHRoaXMucmVzdWx0ID0ge1xuICAgICAgZHVyYXRpb246IDAsXG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgIH1cbiAgICB0aGlzLnNsYXZlcyA9IHt9XG4gIH1cblxuICBwYXJzZVNsYXZlTGluZShzbGF2ZSwgbGluZSkge1xuICAgIGNvbnN0IGlucHV0ID0gSlNPTi5wYXJzZShsaW5lKVxuICAgIHN3aXRjaCAoaW5wdXQuY29tbWFuZCkge1xuICAgICAgY2FzZSBjb21tYW5kVHlwZXMuUkVBRFk6XG4gICAgICAgIHRoaXMuZ2l2ZVNsYXZlV29yayhzbGF2ZSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgY29tbWFuZFR5cGVzLkVWRU5UOlxuICAgICAgICB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIuZW1pdChpbnB1dC5uYW1lLCBpbnB1dC5kYXRhKVxuICAgICAgICBpZiAoaW5wdXQubmFtZSA9PT0gJ3Rlc3QtY2FzZS1maW5pc2hlZCcpIHtcbiAgICAgICAgICB0aGlzLnBhcnNlVGVzdENhc2VSZXN1bHQoaW5wdXQuZGF0YS5yZXN1bHQpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBtZXNzYWdlIGZyb20gc2xhdmU6ICR7bGluZX1gKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0U2xhdmUoaWQsIHRvdGFsKSB7XG4gICAgY29uc3Qgc2xhdmVQcm9jZXNzID0gY2hpbGRQcm9jZXNzLnNwYXduKHNsYXZlQ29tbWFuZCwgW10sIHtcbiAgICAgIGVudjogXy5hc3NpZ24oe30sIHByb2Nlc3MuZW52LCB7XG4gICAgICAgIENVQ1VNQkVSX1BBUkFMTEVMOiAndHJ1ZScsXG4gICAgICAgIENVQ1VNQkVSX1RPVEFMX1NMQVZFUzogdG90YWwsXG4gICAgICAgIENVQ1VNQkVSX1NMQVZFX0lEOiBpZCxcbiAgICAgIH0pLFxuICAgICAgc3RkaW86IFsncGlwZScsICdwaXBlJywgcHJvY2Vzcy5zdGRlcnJdLFxuICAgIH0pXG4gICAgY29uc3QgcmwgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2UoeyBpbnB1dDogc2xhdmVQcm9jZXNzLnN0ZG91dCB9KVxuICAgIGNvbnN0IHNsYXZlID0geyBwcm9jZXNzOiBzbGF2ZVByb2Nlc3MgfVxuICAgIHRoaXMuc2xhdmVzW2lkXSA9IHNsYXZlXG4gICAgcmwub24oJ2xpbmUnLCBsaW5lID0+IHtcbiAgICAgIHRoaXMucGFyc2VTbGF2ZUxpbmUoc2xhdmUsIGxpbmUpXG4gICAgfSlcbiAgICBybC5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICBzbGF2ZS5jbG9zZWQgPSB0cnVlXG4gICAgICB0aGlzLm9uU2xhdmVDbG9zZSgpXG4gICAgfSlcbiAgICBzbGF2ZS5wcm9jZXNzLnN0ZGluLndyaXRlKFxuICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb21tYW5kOiBjb21tYW5kVHlwZXMuSU5JVElBTElaRSxcbiAgICAgICAgZmlsdGVyU3RhY2t0cmFjZXM6IHRoaXMub3B0aW9ucy5maWx0ZXJTdGFja3RyYWNlcyxcbiAgICAgICAgc3VwcG9ydENvZGVQYXRoczogdGhpcy5zdXBwb3J0Q29kZVBhdGhzLFxuICAgICAgICBzdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlczogdGhpcy5zdXBwb3J0Q29kZVJlcXVpcmVkTW9kdWxlcyxcbiAgICAgICAgd29ybGRQYXJhbWV0ZXJzOiB0aGlzLm9wdGlvbnMud29ybGRQYXJhbWV0ZXJzLFxuICAgICAgfSkgKyAnXFxuJ1xuICAgIClcbiAgfVxuXG4gIG9uU2xhdmVDbG9zZSgpIHtcbiAgICBpZiAoXy5ldmVyeSh0aGlzLnNsYXZlcywgJ2Nsb3NlZCcpKSB7XG4gICAgICB0aGlzLmV2ZW50QnJvYWRjYXN0ZXIuZW1pdCgndGVzdC1ydW4tZmluaXNoZWQnLCB7IHJlc3VsdDogdGhpcy5yZXN1bHQgfSlcbiAgICAgIHRoaXMub25GaW5pc2godGhpcy5yZXN1bHQuc3VjY2VzcylcbiAgICB9XG4gIH1cblxuICBwYXJzZVRlc3RDYXNlUmVzdWx0KHRlc3RDYXNlUmVzdWx0KSB7XG4gICAgdGhpcy50ZXN0Q2FzZXNDb21wbGV0ZWQgKz0gMVxuICAgIGlmICh0ZXN0Q2FzZVJlc3VsdC5kdXJhdGlvbikge1xuICAgICAgdGhpcy5yZXN1bHQuZHVyYXRpb24gKz0gdGVzdENhc2VSZXN1bHQuZHVyYXRpb25cbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvdWxkQ2F1c2VGYWlsdXJlKHRlc3RDYXNlUmVzdWx0LnN0YXR1cykpIHtcbiAgICAgIHRoaXMucmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJ1bihudW1iZXJPZlNsYXZlcywgZG9uZSkge1xuICAgIHRoaXMuZXZlbnRCcm9hZGNhc3Rlci5lbWl0KCd0ZXN0LXJ1bi1zdGFydGVkJylcbiAgICBfLnRpbWVzKG51bWJlck9mU2xhdmVzLCBpZCA9PiB0aGlzLnN0YXJ0U2xhdmUoaWQsIG51bWJlck9mU2xhdmVzKSlcbiAgICB0aGlzLm9uRmluaXNoID0gZG9uZVxuICB9XG5cbiAgZ2l2ZVNsYXZlV29yayhzbGF2ZSkge1xuICAgIGlmICh0aGlzLm5leHRUZXN0Q2FzZUluZGV4ID09PSB0aGlzLnRlc3RDYXNlcy5sZW5ndGgpIHtcbiAgICAgIHNsYXZlLnByb2Nlc3Muc3RkaW4ud3JpdGUoXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgY29tbWFuZDogY29tbWFuZFR5cGVzLkZJTkFMSVpFIH0pICsgJ1xcbidcbiAgICAgIClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB0ZXN0Q2FzZSA9IHRoaXMudGVzdENhc2VzW3RoaXMubmV4dFRlc3RDYXNlSW5kZXhdXG4gICAgdGhpcy5uZXh0VGVzdENhc2VJbmRleCArPSAxXG4gICAgY29uc3Qgc2tpcCA9XG4gICAgICB0aGlzLm9wdGlvbnMuZHJ5UnVuIHx8ICh0aGlzLm9wdGlvbnMuZmFpbEZhc3QgJiYgIXRoaXMucmVzdWx0LnN1Y2Nlc3MpXG4gICAgc2xhdmUucHJvY2Vzcy5zdGRpbi53cml0ZShcbiAgICAgIEpTT04uc3RyaW5naWZ5KHsgY29tbWFuZDogY29tbWFuZFR5cGVzLlJVTiwgc2tpcCwgdGVzdENhc2UgfSkgKyAnXFxuJ1xuICAgIClcbiAgfVxuXG4gIHNob3VsZENhdXNlRmFpbHVyZShzdGF0dXMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgXy5pbmNsdWRlcyhbU3RhdHVzLkFNQklHVU9VUywgU3RhdHVzLkZBSUxFRCwgU3RhdHVzLlVOREVGSU5FRF0sIHN0YXR1cykgfHxcbiAgICAgIChzdGF0dXMgPT09IFN0YXR1cy5QRU5ESU5HICYmIHRoaXMub3B0aW9ucy5zdHJpY3QpXG4gICAgKVxuICB9XG59XG4iXX0=