import React, { Component } from 'react'

class Slots extends Component {
  state = {
    rollData: []
  }

  componentDidMount () {
    this.FIRST_SLOT = React.createRef();
    this.SECOND_SLOT = React.createRef();
    this.THIRD_SLOT = React.createRef();

    this.roll();
  }

  render() {
    return (
      <div>
        <p ref={this.FIRST_SLOT}>
          3
        </p>
        <p ref={this.SECOND_SLOT}>
          3
        </p>
        <p ref={this.THIRD_SLOT}>
          3
        </p>
      </div>
    )
  }

  animateRoll () {
    for (let i = 0; i < this.state.rollData[0].length; i++) {
      let rollData = this.state.rollData.slice();
      let animateRoll = setInterval(() => {
        if (rollData[0]) {
          clearTimeout(animateRoll)
        }
        
        this.FIRST_SLOT.current.textContent = rollData[0].shift();
        this.SECOND_SLOT.current.textContent = rollData[1].shift();
        this.THIRD_SLOT.current.textContent = rollData[2].shift();
      }, i * 1000)
    }
  }

  roll() {
    let predeterminedWinningOutcome = this.predeterminedWinningOutcomeArray();
    let rollData = [];
    
    for (let i = 0; i < predeterminedWinningOutcome.length; i++) {
      rollData[i] = [];
      let amountOfRolls = 7;
      for (let j = 0; j < amountOfRolls; j++) {
        let randomNumber = Math.floor(Math.random() * 5);
        
        rollData[i][j] = randomNumber;
      }
      rollData[i].push(predeterminedWinningOutcome[i]);
    }


    this.setState({
      rollData: rollData
    }, () => {
      this.animateRoll();
    });
  }

  predeterminedWinningOutcomeArray () {
    let arr = [];

    for (let i = 0; i < 3; i++) {
      arr[i] = Math.floor(Math.random() * 5)
    }

    return arr;
  }
}

export default Slots;
