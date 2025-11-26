import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Body, Description, H3 } from '@leafygreen-ui/typography';

import { WizardProvider } from '../WizardContext';

import { WizardStep, WizardStepProps } from '.';

const meta: StoryMetaType<typeof WizardStep> = {
  title: 'Composition/Wizard/WizardStep',
  component: WizardStep,
  parameters: {
    default: 'LiveExample',
  },
  decorators: [
    Story => (
      <WizardProvider activeStep={0} updateStep={() => {}} totalSteps={1}>
        <Story />
      </WizardProvider>
    ),
  ],
};

export default meta;

interface WizardStepStoryProps extends WizardStepProps {
  title: string;
  description: string;
}

export const LiveExample: StoryObj<WizardStepStoryProps> = {
  args: {
    title: 'Step 1: Basic Information',
    description: 'Please provide your basic information to get started.',
    children: (
      <div>
        <Body>This is the content of the step.</Body>
        <Body>
          You can include forms, instructions, or any other content here.
        </Body>
      </div>
    ),
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    children: { control: 'text' },
  },
  render: args => (
    <WizardStep>
      <div>
        <H3>{args.title}</H3>
        <Description>{args.description}</Description>
        <Body>{args.children}</Body>
      </div>
    </WizardStep>
  ),
};
