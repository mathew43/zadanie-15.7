'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
  return stopwatch.start();
});

function pad0(value) {
  var result = value.toString();
  if (result.lenght < 2) {
    result = '0' + result;
  }
  return result;
}

var Stopwatch = function () {
  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      this.times.miliseconds += 1;
      if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
      }
      if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: 'print',
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: 'format',
    value: function format(times) {
      return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
    }
  }]);

  return Stopwatch;
}();

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
  return stopwatch.stop();
});

/*React Version*/

var Counter = function (_React$Component) {
  _inherits(Counter, _React$Component);

  function Counter() {
    _classCallCheck(this, Counter);

    var _this2 = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this));

    _this2.state = {
      running: false,
      watch: null,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
    return _this2;
  }

  _createClass(Counter, [{
    key: 'format',
    value: function format(times) {
      return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: 'counterStart',
    value: function counterStart() {
      var _this3 = this;

      console.log('star');

      if (!this.state.running) {
        this.setState({
          running: true,
          watch: setInterval(function () {
            return _this3.step();
          }, 10)
        });
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.state.running) return;

      var miliseconds = this.state.times.miliseconds;
      var seconds = this.state.times.seconds;
      var minutes = this.state.times.minutes;

      miliseconds++;
      if (miliseconds >= 100) {
        seconds += 1;
        miliseconds = 0;
      }

      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }

      this.setState({
        times: {
          miliseconds: miliseconds,
          seconds: seconds,
          minutes: minutes
        }
      });
    }
  }, {
    key: 'counterReset',
    value: function counterReset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });

      // this.counterStop();
    }
  }, {
    key: 'counterStop',
    value: function counterStop() {
      clearInterval(this.state.watch);
      this.setState({
        running: false,
        watch: null
      });
    }
    // a = [1,2,3] 
    // b = [...a, 5] => [1,2,3,5]

  }, {
    key: 'counterAddResult',
    value: function counterAddResult() {
      // if(this.state.running){}
      this.setState({
        results: [].concat(_toConsumableArray(this.state.results), [this.format(this.state.times)])
      });

      console.log(this.state.results);
    }
  }, {
    key: 'counterClear',
    value: function counterClear() {
      this.setState({
        results: []
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: '' },
        React.createElement(
          'button',
          { onClick: this.counterStart.bind(this) },
          'Start'
        ),
        React.createElement(
          'button',
          { onClick: this.counterStop.bind(this) },
          'Stop'
        ),
        React.createElement(
          'button',
          { onClick: this.counterReset.bind(this) },
          'Reset'
        ),
        React.createElement(
          'button',
          { onClick: this.counterAddResult.bind(this) },
          'Add Result'
        ),
        React.createElement(
          'button',
          { onClick: this.counterClear.bind(this) },
          'Clear'
        ),
        React.createElement(
          'div',
          { className: 'coutner-element' },
          this.format(this.state.times)
        ),
        React.createElement(
          'ul',
          { className: 'results' },
          this.state.results.map(function (result) {
            return React.createElement(
              'li',
              null,
              result
            );
          })
        )
      );
    }
  }]);

  return Counter;
}(React.Component);

ReactDOM.render(React.createElement(Counter, null), document.getElementById('app'));
