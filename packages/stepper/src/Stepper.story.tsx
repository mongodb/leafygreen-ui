import React from 'react';
import times from 'lodash/times';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import Stepper from '.';
import { addons } from '@storybook/addons';
import { CHANGE } from '@storybook/addon-knobs';

const channel = addons.getChannel();

storiesOf('Stepper', module)
  .add('Default', () => (
    <div style={{ width: 1000 }}>
      <Stepper
        currentStep={number('Step', 0, { min: 0, max: 6 })}
        completedStepsShown={number('Completed steps shown', 2, { min: 1 })}
        maxDisplayedSteps={5}
      >
        <div>Overview</div>
        <div>Configuration</div>
        <div>Update</div>
        <div>Install</div>
        <div>Billing</div>
        <div>Address</div>
        <div>Confirmation</div>
      </Stepper>
    </div>
  ))
  .add('Many', () => {
    let currentStep = number('Step', 1, { min: 0 });
    const numSteps = number('Number of steps', 10, { min: 1 });
    const maxDisplayedSteps = number('Max displayed', 5, { min: 1 });
    const completedStepsShown = number('Completed steps shown', 3, { min: 1 });

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
          completedStepsShown={completedStepsShown}
          maxDisplayedSteps={maxDisplayedSteps}
        >
          {times(numSteps, count => (
            <div key={count}>Step {count + 1}</div>
          ))}
        </Stepper>
      </div>
    );
  });
