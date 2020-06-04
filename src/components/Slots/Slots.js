import React, { Component } from 'react';

import classes from './Slots.module.css';

class Slots extends Component {
  state = {
    rollData: [],
    reelElements: [],
  }

  componentDidMount () {
    this.SLOT_CAMERA = React.createRef();

    this.roll();
  }

  render() {
    return (
      <div>
        <div className={classes['slot-machine']}>
          <div 
            ref={this.SLOT_CAMERA}
            className={classes['camera']}>
            <div className={classes['slot']}>
              <p
                className={classes['slot__reel']}>
                3
              </p>
              <p
                className={classes['slot__reel']}>
                3
            </p>
              <p
                className={classes['slot__reel']}>
                3
              </p>
            </div>
          
            {this.state.reelElements ? this.state.reelElements : (null)}
          </div>
        </div>
        <button onClick={this.rollSlotMachine}>
          roll
        </button>
      </div>
    )
  }

  rollSlotMachine = () => {
    const rollData = this.state.rollData.slice();

    if (rollData.length == 0) {
      this.roll();
    }

    let allReels = [];

    // the roll data is stored 
    // into 3 different array
    // loop through first one and get the index to get the 
    // data of the other two
    if (rollData[0]) {
      allReels = rollData[0].map(function (data, index) {
        return (
          <div
            key={index} 
            className={classes['slot']}>
            <p className={classes['slot__reel']}>
              {data}
            </p>
            <p className={classes['slot__reel']}>
              {rollData[1][index]}
            </p>
            <p className={classes['slot__reel']}>
              {rollData[2][index]}
            </p>
          </div>
        )
      });
    }

    this.setState({
      reelElements: allReels
    }, () => {
      this.animateReel();
    });
  }

  // translateY the div that wraps all the reels upwards

  animateReel () {
    let sumOfPixelsMove = 0;
    let sumOfPixelsMoveMax = 490;
    let animateReel = setInterval(() => {
      if (sumOfPixelsMove == sumOfPixelsMoveMax) {
        clearInterval(animateReel);
        // change the reels
        return this.roll();
      }
     sumOfPixelsMove += 1;
     this.SLOT_CAMERA.current.style.transform = `translateY(-${sumOfPixelsMove}px)`;
    }, 5)
  }

  // creates an array with the slots numbers divided into an array with 3 arrays
  // first array is for the first reel
  // second array is for the second reel
  // third array is the third reel
  // The predetermine winning numbers are inserted at the end of the array
  roll() {
    let predeterminedWinningOutcome = this.predeterminedWinningOutcomeArray();
    let rollData = [];
    
    for (let i = 0; i < predeterminedWinningOutcome.length; i++) {
      rollData[i] = [];
      let amountOfRolls = 6;
      for (let j = 0; j < amountOfRolls; j++) {
        let randomNumber = Math.floor(Math.random() * 5);
        
        rollData[i][j] = randomNumber;
      }
      rollData[i].push(predeterminedWinningOutcome[i]);
    }

    this.setState({
      rollData: rollData
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
