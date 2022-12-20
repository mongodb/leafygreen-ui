import React from 'react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';

import { InputOption, type InputOptionProps } from '.';

export default {
  title: 'Components/Internal/InputOption',
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
    focused: {
      control: 'boolean',
    },
    active: {
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

export const Generic = Template.bind({});
