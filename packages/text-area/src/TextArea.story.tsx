import React from 'react';
import { StoryFn } from '@storybook/react';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import TextArea, { State, TextAreaProps } from '.';

type LGProviderBaseFontSize = 14 | 16;

const meta: StoryMetaType<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    default: 'LiveExample',
    generate: {
      props: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
        disabled: [false, true],
        state: Object.values(State),
        label: [undefined, 'Label'],
        description: [undefined, 'This is a description for the text area'],
      },
      excludeCombinations: [
        {
          label: undefined,
          description: 'This is a description for the text area',
        },
      ],
    },
  },
  argTypes: {
    baseFontSize: {
      options: [undefined, 13, 16],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
  args: {
    label: 'Label',
    description: 'This is a description for the text area',
    errorMessage: 'This is an error message',
    disabled: false,
    placeholder: 'Placeholder',
  },
};
export default meta;

export const LiveExample: StoryFn<
  TextAreaProps & { baseFontSize: LGProviderBaseFontSize }
> = ({
  darkMode,
  baseFontSize,
  ...args
}: TextAreaProps & { baseFontSize: LGProviderBaseFontSize }) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <TextArea darkMode={darkMode} {...args} />
  </LeafygreenProvider>
);
LiveExample.argTypes = {
  baseFontSize: {
    options: [14, 16],
    control: { type: 'radio' },
    description:
      'Storybook prop only. This font size is passed into the LeafygreenProvider. ',
  },
};
LiveExample.args = {
  // @ts-expect-error
  baseFontSize: 14,
};

export const Generated = () => {};
