import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InputOption } from '.';

export default {
  title: 'Components/Internal/InputOption',
  component: InputOption,
  parameters: {
    controls: {
      exclude: [
        'children',
        'aria-label',
        'setError',
        'onFilter',
        'onClear',
        'onChange',
        'filteredOptions',
        'className',
        'usePortal',
        'portalClassName',
        'portalContainer',
        'scrollContainer',
        'popoverZIndex',
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
    darkMode: {
      control: 'boolean',
    },
    showWedge: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof InputOption>;

const Template: ComponentStory<typeof InputOption> = props => (
  <InputOption {...props}>Some text</InputOption>
);

export const Generic = Template.bind({});
