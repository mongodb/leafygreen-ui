import React from 'react';
import {
  storybookArgTypes,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';

import { WizardStep } from '.';

const meta: StoryMetaType<typeof WizardStep> = {
  title: 'Components/Wizard/WizardStep',
  component: WizardStep,
  parameters: {
    default: 'LiveExample',
  },
  argTypes: {
    title: storybookArgTypes.children,
    description: storybookArgTypes.children,
    children: storybookArgTypes.children,
  },
};

export default meta;

const Template: StoryType<typeof WizardStep> = args => <WizardStep {...args} />;

export const LiveExample = Template.bind({});
LiveExample.args = {
  title: 'Step 1: Basic Information',
  description: 'Please provide your basic information to get started.',
  children: (
    <div>
      <p>This is the content of the step.</p>
      <p>You can include forms, instructions, or any other content here.</p>
    </div>
  ),
};

export const WithLongDescription = Template.bind({});
WithLongDescription.args = {
  title: 'Step 2: Detailed Configuration',
  description: (
    <div>
      <p>
        This step involves more complex configuration options. Please read
        carefully before proceeding.
      </p>
      <ul>
        <li>Configure your primary settings</li>
        <li>Set up your preferences</li>
        <li>Review the terms and conditions</li>
      </ul>
    </div>
  ),
  children: (
    <div>
      <p>Complex form content would go here...</p>
      <button type="button">Sample Button</button>
    </div>
  ),
};

export const MinimalStep = Template.bind({});
MinimalStep.args = {
  title: 'Final Step',
  description: 'Review and submit.',
  children: <p>Simple content for the final step.</p>,
};

export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  title: 'Step Without Description',
  children: (
    <div>
      <p>This step doesn&apos;t have a description.</p>
      <p>Sometimes you may want to omit the description for simpler steps.</p>
    </div>
  ),
};
