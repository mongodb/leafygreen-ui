import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import Stepper, { Step, StepperProps } from '.';

export default {
  title: 'Packages/Stepper',
  component: Stepper,
  args: {},
  argTypes: {
    className: {
      type: 'string',
    },
    children: {
      control: false,
    },
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
    },
    completedStepsShown: {
      control: {
        type: 'range',
        max: 5, // numSteps' max - 2
      },
    },
    darkMode: {
      control: 'boolean',
    },
  },
} as Meta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (args: StepperProps) => (
  <>
    <p>
      Note: Min and max values for ranges are not defined in the component. The
      range values are only defined specifically for the Storybook instance so
      it renders correctly with all values. Value checking within the component
      will be added at a later date.
    </p>
    <Stepper {...args} />
  </>
);

export const Basic = Template.bind({});
Basic.args = {
  currentStep: 1,
  maxDisplayedSteps: 5,
  completedStepsShown: 3,
  children: [
    <Step key="Overview">Overview</Step>,
    <Step key="Configuration">Configuration</Step>,
    <Step key="Update">Update</Step>,
    <Step key="Install">Install</Step>,
    <Step key="Billing">Billing</Step>,
    <Step key="Address">Address</Step>,
    <Step key="Confirmation">Confirmation</Step>,
  ],
};
