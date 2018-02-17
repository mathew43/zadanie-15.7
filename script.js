var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());


function pad0(value){
  let result = value.toString();
  if (result.lenght < 2){
    result = '0' + result;
  }
  return result;
}

class Stopwatch extends React.Component {
  constructor(){
    super()

  this.running = false;
  this.display = {
    display: ''
  };
  this.reset();
  this.print(this.times);
}

reset() {
          this.times = {
              minutes: 0,
              seconds: 0,
              miliseconds: 0
          };
      }


  render() {
    return
    <div className="container">
      <nav className="controls">
        <button className="button start" onClick={this.start}><i className="fa fa-play" aria-hidden="true"></i> Start</button>
        <button className="button stop" onClick={this.stop}><i className="fa fa-pause" aria-hidden="true" ></i> Pause</button>
      </nav>
      <div className="stopwatch">
       {this.state.display}
      </div>
  }


start(){
  if (!this.running){
    this.running = true;
    this.watch = setInterval(() => this.step(), 10);
  }
}

step(){
  if (!this.running) return;
  this.calculate();
  this.print();
}

calculate() {
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

stop() {
    this.running = false;
    clearInterval(this.watch);
}

print(){
  this.display.innerText = this.format(this.times);
}

format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
}


}

const stopwatch = new Stopwatch(
  document.querySelector('.stopwatch')
);


var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

class App extends React.Component {
    render() {
        return (
          <div>
            <Stopwatch />
          </div>
        )
    }
};

const app = <App />;
ReactDOM.render(app, document.getElementById('app'));
