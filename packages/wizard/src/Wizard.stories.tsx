import React from 'react';
import { StoryObj } from '@storybook/react';

import { Wizard } from '.';

export default {
  title: 'Components/Wizard',
  component: Wizard,
};

export const LiveExample: StoryObj<typeof Wizard> = {
  parameters: {
    controls: {
      exclude: ['children', 'activeStep', 'onStepChange'],
    },
  },
  render: props => <Wizard {...props}></Wizard>,
};

export const Controlled: StoryObj<typeof Wizard> = {
  parameters: {
    controls: {
      exclude: ['children', 'onStepChange'],
    },
  },
  render: ({ activeStep, ...props }) => {
    return (
      <Wizard
        activeStep={activeStep}
        // eslint-disable-next-line no-console
        onStepChange={x => console.log(`Set activeStep to ${x}`)}
        {...props}
      ></Wizard>
    );
  },
};
