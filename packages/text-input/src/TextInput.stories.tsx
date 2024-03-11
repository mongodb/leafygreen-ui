import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import TextInput, { SizeVariant, State, TextInputProps } from '.';

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const meta: StoryMetaType<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'value', 'handleValidation'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        label: [undefined, 'Label'],
        description: [undefined, 'This is a description'],
        state: Object.values(State),
        disabled: [false, true],
      },
      excludeCombinations: [
        {
          label: undefined,
          description: 'This is a description',
        },
      ],
    },
  },
  args: {
    label: 'Label',
    description: 'This is a description',
    errorMessage: 'Invalid email',
  },
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    optional: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
    state: {
      control: 'select',
      options: Object.values(State),
    },
    sizeVariant: {
      control: 'select',
      options: Object.values(SizeVariant),
    },
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
  },
};
export default meta;

export const LiveExample: StoryFn<TextInputProps> = ({
  ...args
}: TextInputProps) => <TextInput {...args} />;
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithValidation = (args: TextInputProps) => {
  const [state, setState] = useState<'none' | 'valid' | 'error'>('none');

  const handleValidation = (value: string) => {
    if (value.match(emailRegex)) {
      setState('valid');
    } else {
      setState('error');
    }
  };

  return (
    <TextInput
      placeholder="lauren@ipsum.com"
      state={state}
      type="email"
      errorMessage="Invalid email"
      handleValidation={handleValidation}
      {...args}
    />
  );
};
WithValidation.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => {};
