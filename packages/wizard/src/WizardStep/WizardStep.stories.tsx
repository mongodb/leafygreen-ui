import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Body } from '@leafygreen-ui/typography';

import { WizardProvider } from '../WizardContext';

import { WizardStep } from '.';

const meta: StoryMetaType<typeof WizardStep> = {
  title: 'Composition/Wizard/WizardStep',
  component: WizardStep,
  parameters: {
    default: 'LiveExample',
  },
  decorators: [
    Story => (
      <WizardProvider activeStep={0} updateStep={() => {}}>
        <Story />
      </WizardProvider>
    ),
  ],
  argTypes: {
    title: storybookArgTypes.children,
    description: storybookArgTypes.children,
    children: storybookArgTypes.children,
  },
};

export default meta;

export const LiveExample: StoryObj<typeof WizardStep> = {
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
  render: args => <WizardStep {...args} />,
};

export const WithLongDescription: StoryObj<typeof WizardStep> = {
  args: {
    title: 'Step 2: Detailed Configuration',
    description: (
      <div>
        <Body>
          This step involves more complex configuration options. Please read
          carefully before proceeding.
        </Body>
        <Body>
          <ul>
            <li>Configure your primary settings</li>
            <li>Set up your preferences</li>
            <li>Review the terms and conditions</li>
          </ul>
        </Body>
      </div>
    ),
    children: (
      <div>
        <Body>Complex form content would go here...</Body>
        <button type="button">Sample Button</button>
      </div>
    ),
  },
};
