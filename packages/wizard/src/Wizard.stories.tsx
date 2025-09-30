/* eslint-disable no-console */
import React from 'react';
import { faker } from '@faker-js/faker';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import Card from '@leafygreen-ui/card';

import { Wizard } from '.';

faker.seed(0);

export default {
  title: 'Composition/Data Display/Wizard',
  component: Wizard,
  parameters: {
    default: 'LiveExample',
  },
  decorators: [
    Fn => (
      <div style={{ margin: -100, height: '100vh', width: '100vw' }}>
        <Fn />
      </div>
    ),
  ],
} satisfies StoryMetaType<typeof Wizard>;

export const LiveExample: StoryObj<typeof Wizard> = {
  parameters: {
    controls: {
      exclude: ['children', 'activeStep', 'onStepChange'],
    },
  },
  render: props => (
    <Wizard {...props}>
      {['Apple', 'Banana', 'Carrot'].map((title, i) => (
        <Wizard.Step
          key={i}
          title={`Step ${i + 1}: ${title}`}
          description={faker.lorem.paragraph()}
        >
          <Card>{faker.lorem.paragraph(10)}</Card>
        </Wizard.Step>
      ))}
      <Wizard.Footer
        backButtonProps={{
          onClick: () => console.log('[Storybook] Clicked Back'),
        }}
        cancelButtonProps={{
          children: 'Cancel',
          onClick: () => console.log('[Storybook] Clicked Cancel'),
        }}
        primaryButtonProps={{
          children: 'Primary',
          onClick: () => console.log('[Storybook] Clicked Primary'),
        }}
      />
    </Wizard>
  ),
};

export const Controlled: StoryObj<typeof Wizard> = {
  parameters: {
    controls: {
      exclude: ['children', 'onStepChange'],
    },
  },
  args: {
    activeStep: 0,
  },
  render: ({ activeStep, ...props }) => {
    return (
      <Wizard
        activeStep={activeStep}
        onStepChange={x =>
          console.log(`[Storybook] activeStep should change to ${x}`)
        }
        {...props}
      >
        {['Apple', 'Banana', 'Carrot'].map((title, i) => (
          <Wizard.Step
            key={i}
            title={`Step ${i + 1}: ${title}`}
            description={faker.lorem.paragraph()}
          >
            <Card>
              <p>
                This Wizard is controlled. Clicking the buttons will not do
                anything. Use the Storybook controls to see the next step
              </p>
              {faker.lorem.paragraph(10)}
            </Card>
          </Wizard.Step>
        ))}
        <Wizard.Footer
          backButtonProps={{
            onClick: () => console.log('[Storybook] Clicked Back'),
          }}
          cancelButtonProps={{
            children: 'Cancel',
            onClick: () => console.log('[Storybook] Clicked Cancel'),
          }}
          primaryButtonProps={{
            children: 'Primary',
            onClick: () => console.log('[Storybook] Clicked Primary'),
          }}
        />
      </Wizard>
    );
  },
};
