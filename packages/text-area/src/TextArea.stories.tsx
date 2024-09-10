import React from 'react';
import {
  storybookArgTypes,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import TextArea, { State, TextAreaProps } from '.';

type LGProviderBaseFontSize = 14 | 16;

const meta: StoryMetaType<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
        label: [undefined, 'Label'],
        description: [undefined, 'This is a description for the text area'],
        state: Object.values(State),
        disabled: [false, true],
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

interface FontSizeProps {
  baseFontSize: LGProviderBaseFontSize;
}

export const LiveExample: StoryType<typeof TextArea, FontSizeProps> = ({
  darkMode,
  baseFontSize,
  ...args
}: TextAreaProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <TextArea darkMode={darkMode} {...args} />
  </LeafygreenProvider>
);
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};
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
