import React, { Component } from 'react';
import './css/Content.css';

class Content extends Component {
  //////// Controller
  constructor(){
    super();

    this.handleCountClick = this.handleCountClick.bind(this);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);

    this.state = {
      count: 0,
      number1: 0,
      number2: 0,
      number3: 0,
      resultState: 0
    }
  }

  componentDidMount(){
    this.setState({
      count : 1
    });
  }

  handleCountClick(e){
    //console.log(e);
    if(e.target.id === 'add'){
      this.setState({
        count: this.state.count + 1
      })
      console.log("Added + : " + this.state.count);
    }
    if(e.target.id === 'remove' && this.state.count > 0){
      this.setState({
        count: this.state.count - 1
      })
      console.log("Removed - : " + this.state.count);
    }
    if(e.target.id === 'reset'){
      this.setState({
        count: 0
      })
      console.log("Counter reset to " + 0);
    }
  }

  handleOnInputChange(e){
    if(e.target.id === 'num1'){
      this.setState({
        number1: Number(e.target.value)
      });
    }
    if(e.target.id === 'num2'){
      this.setState({
        number2: Number(e.target.value)
      });
    }
    if(e.target.id === 'num3'){
      this.setState({
        number3: Number(e.target.value)
      });
    }
  }

  handleResultClick(e){
    console.log("Result value: " + this.state.resultState);
    this.setState({
      resultState: this.state.number1 + this.state.number2 + this.state.number3
    })
  }

  //////// Rendeting UI
  render() {
    return (
      <div className="Content">
        Wow, it's just a Content
        <h2>Counter: {this.state.count}</h2>
        <button id="add" onClick={this.handleCountClick}>[+]Add</button>
        <button id="remove" onClick={this.handleCountClick}>[-]Remove</button>
        <button id="reset" onClick={this.handleCountClick}>[//]Reset</button>
        
        <hr/>

        <input type="text" id="num1" onChange={this.handleOnInputChange} value={this.state.number1} />
        <input type="text" id="num2" onChange={this.handleOnInputChange} value={this.state.number2} />
        <input type="text" id="num3" onChange={this.handleOnInputChange} value={this.state.number3} />
        
        <button id="result" onClick={this.handleResultClick}>[=]Result</button>
        {this.state.resultState}
      </div>
    );
  }
}

export default Content;