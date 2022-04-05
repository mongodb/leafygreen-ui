import React from 'react';
import times from 'lodash/times';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { Step, Stepper } from '.';
import { addons } from '@storybook/addons';
import { CHANGE } from '@storybook/addon-knobs';

const channel = addons.getChannel();

storiesOf('Packages/Stepper', module)
  .add('Default', () => (
    <div style={{ width: 1000 }}>
      <Stepper
        currentStep={number('Step', 0, { min: 0, max: 6 })}
        maxDisplayedSteps={5}
      >
        <Step>Overview</Step>
        <Step>Configuration</Step>
        <Step>Update</Step>
        <Step>Install</Step>
        <Step>Billing</Step>
        <Step>Address</Step>
        <Step>Confirmation</Step>
      </Stepper>
    </div>
  ))
  .add('Many', () => {
    let currentStep = number('Step', 0, { min: 0 });
    const numSteps = number('Number of steps', 7, { min: 1 });

    // Can't dynamically change the max, so we manually enforce it
    if (currentStep + 1 > numSteps) {
      channel.emit(CHANGE, {
        name: 'Step',
        value: numSteps - 1,
      });
      currentStep = numSteps - 1;
    }

    return (
      <div style={{ width: 1000 }}>
        <Stepper
          currentStep={currentStep}
          maxDisplayedSteps={number('Max displayed', 5, { min: 1 })}
        >
          {times(numSteps, count => (
            <Step key={count}>Step {count + 1}</Step>
          ))}
        </Stepper>
      </div>
    );
  });
