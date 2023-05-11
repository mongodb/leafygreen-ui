import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';

import { TextAreaProps } from './TextArea/TextArea.types';
import TextArea from '.';

type LGProviderBaseFontSize = 14 | 16;

const StoryTextArea: React.FC<
  TextAreaProps & { lgProviderBaseFontSize: LGProviderBaseFontSize }
> = props => <TextArea {...props} />;

export default {
  title: 'Components/TextArea',
  component: StoryTextArea,
  parameters: {
    controls: {
      exclude: [...storybookExcludedControlParams],
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
    ref: { control: 'none' },
  },
  args: {
    label: 'Label',
    description: 'This is a description for the text area',
    errorMessage: 'This is an error message',
    disabled: false,
    placeholder: 'Placeholder',
  },
} as ComponentMeta<typeof TextArea>;

export const Basic: ComponentStory<typeof TextArea> = ({
  darkMode,
  ...args
}: TextAreaProps) => <TextArea darkMode={darkMode} {...args} />;

export const WithProvider: ComponentStory<typeof StoryTextArea> = ({
  darkMode,
  lgProviderBaseFontSize,
  ...args
}: TextAreaProps & { lgProviderBaseFontSize: LGProviderBaseFontSize }) => (
  <LeafygreenProvider baseFontSize={lgProviderBaseFontSize}>
    <TextArea darkMode={darkMode} {...args} />
  </LeafygreenProvider>
);
WithProvider.argTypes = {
  lgProviderBaseFontSize: {
    options: [14, 16],
    control: { type: 'radio' },
    description:
      'Storybook prop only. This font size is passed into the LeafygreenProvider. ',
  },
};
WithProvider.args = {
  lgProviderBaseFontSize: 14,
};
