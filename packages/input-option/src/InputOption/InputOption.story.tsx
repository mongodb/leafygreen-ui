import React from 'react';

import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';

import { InputOption, type InputOptionProps } from '.';

export default StoryMeta({
  title: 'Components/InputOption',
  component: InputOption,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        'setError',
        'filteredOptions',
        'initialValue',
        'value',
        'children',
      ],
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    highlighted: {
      control: 'boolean',
    },
    selected: {
      control: 'boolean',
    },
    showWedge: {
      control: 'boolean',
    },
    as: storybookArgTypes.as,
  },
});

const Template = (props: InputOptionProps) => (
  <InputOption {...props}>Some text</InputOption>
);

export const Basic = Template.bind({});
