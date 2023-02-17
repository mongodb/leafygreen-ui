import React from 'react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';

import { InputOption, type InputOptionProps } from '.';

export default {
  title: 'Components/InputOption',
  component: InputOption,
  parameters: {
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'aria-label',
        'aria-labelledby',
        'setError',
        'filteredOptions',
        'initialValue',
        'value',
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
    ...storybookArgTypes,
  },
};

const Template = (props: InputOptionProps) => (
  <InputOption {...props}>Some text</InputOption>
);

export const Basic = Template.bind({});
