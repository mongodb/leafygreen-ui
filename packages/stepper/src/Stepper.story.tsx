import React from 'react';
import { ComponentStory } from '@storybook/react';

import { StoryMeta } from '@leafygreen-ui/lib';

import Stepper, { Step, StepperProps } from '.';

export default StoryMeta({
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: ['children'],
    },
  },
  argTypes: {
    currentStep: {
      control: {
        type: 'range',
        max: 7, // numSteps' max
      },
    },
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
});

const Template: ComponentStory<typeof Stepper> = (args: StepperProps) => (
  <Stepper {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  currentStep: 1,
  maxDisplayedSteps: 5,
  completedStepsShown: 3,
  children: [
    <div key="Overview">Overview</div>,
    <Step key="Configuration">Configuration</Step>,
    <Step key="Update">Update</Step>,
    <Step key="Install">Install</Step>,
    <Step key="Billing">Billing</Step>,
    <Step key="Address">Address</Step>,
    <Step key="Confirmation">Confirmation</Step>,
  ],
};
