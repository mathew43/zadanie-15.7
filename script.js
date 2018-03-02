var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());


function pad0(value){
  let result = value.toString();
  if (result.lenght < 2){
    result = '0' + result;
  }
  return result;
}

class Stopwatch {
  constructor(display){
    this.running = false;
    this.display = display;
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




/*React Version*/
class Counter extends React.Component{
  
  constructor(){
    super();

    this.state = {
      running: false,
      watch: null, 
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    }
  }


  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }



  counterStart(){
    console.log('star');


    if(!this.state.running){
      this.setState({
        running: true,
        watch: setInterval(()=>this.step(), 10)
      })
    }
  }

  step(){
    if(!this.state.running) return;

    let miliseconds = this.state.times.miliseconds;
    let seconds = this.state.times.seconds;
    let minutes = this.state.times.minutes;

    miliseconds++;
    if(miliseconds >= 100){
      seconds += 1;
      miliseconds = 0;
    }

    if(seconds >= 60){
      minutes += 1;
      seconds = 0;
    }

    this.setState({
      times: {
        miliseconds,
        seconds,
        minutes
      }
    })
  }

  counterReset(){
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    })

    // this.counterStop();
  }


  counterStop(){
    clearInterval(this.state.watch);
    this.setState({
      running: false,
      watch: null
    })
  }
  // a = [1,2,3] 
  // b = [...a, 5] => [1,2,3,5]
  counterAddResult(){
    // if(this.state.running){}
    this.setState({
      results: [...this.state.results, this.format(this.state.times)]
    });

    console.log(this.state.results);
  }


  counterClear(){
    this.setState({
      results: []
    })
  }

  render(){
    return (
      <div className="">
        <button onClick={this.counterStart.bind(this)}>Start</button>
        <button onClick={this.counterStop.bind(this)}>Stop</button>
        <button onClick={this.counterReset.bind(this)}>Reset</button>
        <button onClick={this.counterAddResult.bind(this)}>Add Result</button>
        <button onClick={this.counterClear.bind(this)}>Clear</button>

        <div className="coutner-element">{this.format(this.state.times)}</div>
        <ul className="results">
          {this.state.results.map(result => <li>{result}</li>)}
        </ul>
      </div>

    )
  }
}



ReactDOM.render(<Counter />, document.getElementById('app'));












