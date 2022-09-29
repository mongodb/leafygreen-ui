import React from 'react';
import TextArea from '.';
import { TextAreaProps } from './types';
import { storybookArgTypes } from '@leafygreen-ui/lib';

import { ComponentStory } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

type LGProviderBaseFontSize = 14 | 16;

export const StoryTextArea: React.FC<
  TextAreaProps & { lgProviderBaseFontSize: LGProviderBaseFontSize }
> = props => <TextArea {...props} />;

export default {
  title: 'Components/TextArea',
  component: StoryTextArea,
  argTypes: {
    baseFontSize: {
      options: [undefined, 13, 16],
      control: { type: 'radio' },
    },
    lgProviderBaseFontSize: {
      options: [14, 16],
      control: { type: 'radio' },
      description:
        'Storybook prop only. This font size is passed into the LeafygreenProvider. ',
    },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
    ref: { control: 'none' },
  },
  excludeStories: ['StoryTextArea'],
};

const Template: ComponentStory<typeof StoryTextArea> = ({
  baseFontSize,
  darkMode,
  lgProviderBaseFontSize,
  ...args
}: TextAreaProps & { lgProviderBaseFontSize: LGProviderBaseFontSize }) => (
  <LeafygreenProvider baseFontSize={lgProviderBaseFontSize}>
    <TextArea darkMode={darkMode} baseFontSize={baseFontSize} {...args} />
  </LeafygreenProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Label',
  description: 'This is a description for the text area',
  errorMessage: 'This is an error message',
  disabled: false,
  placeholder: 'Placeholder',
  lgProviderBaseFontSize: 14,
};
