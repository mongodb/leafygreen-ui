import React from 'react';
import times from 'lodash/times';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import Stepper, { Step } from '.';
import { addons } from '@storybook/addons';
import { CHANGE } from '@storybook/addon-knobs';
import { palette } from '@leafygreen-ui/palette';

const channel = addons.getChannel();

storiesOf('Packages/Stepper', module)
  .add('Default', () => (
    <div style={{ width: 1000 }}>
      <Stepper currentStep={number('Step', 0, { min: 0, max: 6 })}>
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
    let currentStep = number('Step', 1, { min: 0 });
    const numSteps = number('Number of steps', 10, { min: 1 });
    const maxDisplayedSteps = number('Max displayed', 5, { min: 1 });
    let completedStepsShown = number('Completed steps shown', 3, { min: 1 });
    const darkMode = boolean('Dark mode', false);

    // Can't dynamically change the max, so we manually enforce it
    if (currentStep >= numSteps) {
      channel.emit(CHANGE, {
        name: 'Step',
        value: numSteps - 1,
      });
      currentStep = numSteps - 1;
    }

    // Can't dynamically change the max, so we manually enforce it
    if (completedStepsShown >= maxDisplayedSteps - 2) {
      channel.emit(CHANGE, {
        name: 'Completed steps shown',
        value: maxDisplayedSteps - 2,
      });
      completedStepsShown = maxDisplayedSteps - 2;
    }

    return (
      <div
        style={{
          width: 1000,
          background: darkMode ? palette.black : palette.white,
        }}
      >
        <Stepper
          currentStep={currentStep}
          completedStepsShown={completedStepsShown}
          maxDisplayedSteps={maxDisplayedSteps}
          darkMode={darkMode}
        >
          {times(numSteps, (count: number) => (
            <div key={count}>Step {count + 1}</div>
          ))}
        </Stepper>
      </div>
    );
  });
