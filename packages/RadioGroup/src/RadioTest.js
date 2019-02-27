import React, { Component } from 'react';
import RadioButton from '../../RadioButton/src/RadioButton';
import RadioGroup from './index';

export default class RadioTest extends Component {
  state = {
    children: [
      <RadioButton key="1" value="1">
        Button 1
      </RadioButton>,
      <RadioButton key="2" value="2">
        Button 2
      </RadioButton>,
    ],
  };

  render() {
    const { children } = this.state;
    return (
      <div>
        <p>HEY</p>
        <button>TEST</button>
        <button
          onClick={() =>
            this.setState({
              children: children.reduce((acc, val) => [val, ...acc], []),
            })
          }
        >
          click me
        </button>
        <RadioGroup>{children}</RadioGroup>
      </div>
    );
  }
}
