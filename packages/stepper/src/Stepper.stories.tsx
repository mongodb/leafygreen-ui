import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Stepper, { Step, StepperProps } from '.';

const meta: StoryMetaType<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        currentStep: [1, 4, 7],
        maxDisplayedSteps: [3, 7],
        completedStepsShown: [3, 5],
      },
    },
  },
  args: {
    children: [
      <div key="Overview">Overview</div>,
      <Step key="Configuration">Configuration</Step>,
      <Step key="Update">Update</Step>,
      <Step key="Install">Install</Step>,
      <Step key="Billing">Billing</Step>,
      <Step key="Address">Address</Step>,
      <Step key="Confirmation">Confirmation</Step>,
    ],
    currentStep: 1,
    maxDisplayedSteps: 5,
    completedStepsShown: 3,
  },
  argTypes: {
    currentStep: {
      control: {
        type: 'range',
        min: 0,
        max: 7, // numSteps' max
      },
    },
    darkMode: storybookArgTypes.darkMode,
    maxDisplayedSteps: {
      control: {
        type: 'range',
        min: 3,
        max: 6, // numSteps' max - 1
      },
      description:
        'Note: Min and max values for ranges are not defined in the component. The range values are only defined specifically for the Storybook instance so it renders correctly with all values. Value checking within the component will be added at a later date.',
    },
    completedStepsShown: {
      control: {
        type: 'range',
        max: 5, // numSteps' max - 2
      },
    },
  },
  decorators: [
    StoryFn => (
      <div style={{ minWidth: '600px' }}>
        <StoryFn />
      </div>
    ),
  ],
};
export default meta;

export const LiveExample: StoryFn<StepperProps> = (args: StepperProps) => (
  <Stepper {...args} />
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
LiveExample.args = {
  currentStep: 1,
  maxDisplayedSteps: 5,
  completedStepsShown: 3,
};

export const Generated = () => {};
