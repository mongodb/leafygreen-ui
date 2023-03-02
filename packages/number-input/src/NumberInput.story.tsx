import React from 'react';
import { ComponentStory } from '@storybook/react';

import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';

import { Size } from './NumberInput/NumberInput.types';
import { NumberInput } from '.';

export default StoryMeta({
  title: 'Components/NumberInput',
  component: NumberInput,
  args: {
    label: 'label',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    // disabled: {
    //   control: 'boolean',
    // },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
  parameters: {
    default: 'Demo',
    controls: {
      exclude: [
        'as',
        'children',
        'aria-labelledby',
        'aria-describedby',
        'aria-label',
        'value',
      ],
    },
  },
});

const Template: ComponentStory<typeof NumberInput> = props => (
  <NumberInput {...props} />
);

export const Basic = Template.bind({});
