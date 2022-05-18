import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import TextArea, { TextAreaProps } from './TextArea';
import { ComponentStory } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

export const StoryTextArea: React.FC<
  TextAreaProps & { lgProviderBaseFontSize: 14 | 16 }
> = props => <TextArea {...props} />;

export default {
  title: 'Packages/TextArea',
  component: StoryTextArea,
  argTypes: {
    baseFontSize: {
      options: [13, 16],
      control: { type: 'radio' },
    },
    lgProviderBaseFontSize: {
      options: [14, 16],
      control: { type: 'radio' },
    },
    darkMode: {
      control: 'boolean',
    },
  },
  excludeStories: ['StoryTextArea'],
};

const Template: ComponentStory<typeof StoryTextArea> = ({
  baseFontSize,
  darkMode,
  lgProviderBaseFontSize,
  ...args
}: TextAreaProps & { lgProviderBaseFontSize: 14 | 16 }) => (
  <LeafygreenProvider baseFontSize={lgProviderBaseFontSize}>
    <div
      className={css`
        padding: 30px;
        background-color: ${darkMode ? palette.black : 'white'};
      `}
    >
      <TextArea darkMode={darkMode} baseFontSize={baseFontSize} {...args} />
    </div>
  </LeafygreenProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Label',
  description: 'This is a description for the textarea',
  errorMessage: 'This is an error message',
  disabled: false,
  placeholder: 'Placeholder',
};
