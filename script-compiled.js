'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch() {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

    _this.running = false;
    _this.display = {
      display: ''
    };
    _this.reset();
    _this.print(_this.times);
    return _this;
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
    key: 'render',
    value: function render() {
      return;
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'nav',
          { className: 'controls' },
          React.createElement(
            'button',
            { className: 'button start', onClick: this.start },
            React.createElement('i', { className: 'fa fa-play', 'aria-hidden': 'true' }),
            ' Start'
          ),
          React.createElement(
            'button',
            { className: 'button stop', onClick: this.stop },
            React.createElement('i', { className: 'fa fa-pause', 'aria-hidden': 'true' }),
            ' Pause'
          )
        ),
        React.createElement(
          'div',
          { className: 'stopwatch' },
          this.state.display
        )
      );
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this2.step();
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
}(React.Component);

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
  return stopwatch.stop();
});

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Stopwatch, null)
      );
    }
  }]);

  return App;
}(React.Component);

;

var app = React.createElement(App, null);

ReactDOM.render(app, document.getElementById('app'));
