import React, { useState } from 'react';
import {
  storybookArgTypes,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';

import { WizardFooter } from '.';

const meta: StoryMetaType<typeof WizardFooter> = {
  title: 'Components/Wizard/WizardFooter',
  component: WizardFooter,
  parameters: {
    default: 'LiveExample',
  },
  argTypes: {
    backButtonProps: { control: 'object' },
    cancelButtonProps: { control: 'object' },
    primaryButtonProps: { control: 'object' },
    activeStep: { control: 'number' },
    totalSteps: { control: 'number' },
    onStepChange: storybookArgTypes.func,
    isControlled: { control: 'boolean' },
  },
};

export default meta;

const Template: StoryType<typeof WizardFooter> = args => {
  const [step, setStep] = useState(args.activeStep || 0);

  return (
    <WizardFooter
      {...args}
      activeStep={step}
      onStepChange={newStep => {
        setStep(newStep);
        args.onStepChange?.(newStep);
      }}
    />
  );
};

export const LiveExample = Template.bind({});
LiveExample.args = {
  activeStep: 1,
  totalSteps: 3,
  backButtonProps: {
    children: 'Back',
  },
  cancelButtonProps: {
    children: 'Cancel',
  },
  primaryButtonProps: {
    children: 'Next',
    variant: 'primary',
  },
};

export const FirstStep = Template.bind({});
FirstStep.args = {
  activeStep: 0,
  totalSteps: 3,
  cancelButtonProps: {
    children: 'Cancel',
  },
  primaryButtonProps: {
    children: 'Get Started',
    variant: 'primary',
  },
};

export const LastStep = Template.bind({});
LastStep.args = {
  activeStep: 2,
  totalSteps: 3,
  backButtonProps: {
    children: 'Back',
  },
  cancelButtonProps: {
    children: 'Cancel',
  },
  primaryButtonProps: {
    children: 'Finish',
    variant: 'primary',
  },
};

export const DangerousAction = Template.bind({});
DangerousAction.args = {
  activeStep: 1,
  totalSteps: 2,
  backButtonProps: {
    children: 'Back',
  },
  cancelButtonProps: {
    children: 'Cancel',
  },
  primaryButtonProps: {
    children: 'Delete Resource',
    variant: 'danger',
  },
};

export const WithCustomHandlers = Template.bind({});
WithCustomHandlers.args = {
  activeStep: 1,
  totalSteps: 3,
  backButtonProps: {
    children: 'Go Back',
    onClick: () => alert('Custom back handler'),
  },
  cancelButtonProps: {
    children: 'Exit',
    onClick: () => alert('Custom cancel handler'),
  },
  primaryButtonProps: {
    children: 'Continue',
    variant: 'primary',
    onClick: () => alert('Custom primary handler'),
  },
};

export const MinimalFooter = Template.bind({});
MinimalFooter.args = {
  activeStep: 0,
  totalSteps: 1,
  primaryButtonProps: {
    children: 'Done',
    variant: 'primary',
  },
};
