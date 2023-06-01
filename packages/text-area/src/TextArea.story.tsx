import React from 'react';
import { StoryFn } from '@storybook/react';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import TextArea, { TextAreaProps } from '.';

type LGProviderBaseFontSize = 14 | 16;

const meta: StoryMetaType<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    default: 'Basic',
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
    ref: { control: 'none' },
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

export const Basic: StoryFn<typeof TextArea> = ({
  darkMode,
  ...args
}: TextAreaProps) => <TextArea darkMode={darkMode} {...args} />;

export const WithProvider: StoryFn<
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
WithProvider.argTypes = {
  baseFontSize: {
    options: [14, 16],
    control: { type: 'radio' },
    description:
      'Storybook prop only. This font size is passed into the LeafygreenProvider. ',
  },
};
WithProvider.args = {
  // @ts-expect-error
  baseFontSize: 14,
};
