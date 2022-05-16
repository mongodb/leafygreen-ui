import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import TextArea, { TextAreaProps } from './TextArea';
import { ComponentStory } from '@storybook/react';

export const StoryTextArea: React.FC<TextAreaProps> = props => (
  <TextArea {...props} />
);

export default {
  title: 'Packages/TextArea',
  component: StoryTextArea,
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
  },
  excludeStories: ['StoryTextArea'],
};

const Template: ComponentStory<typeof StoryTextArea> = ({
  darkMode,
  ...args
}: TextAreaProps) => (
  <div
    className={css`
      padding: 30px;
      background-color: ${darkMode ? palette.black : 'white'};
    `}
  >
    <TextArea darkMode={darkMode} {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Label',
  description: 'This is a description for the textarea',
  errorMessage: 'This is an error message',
};
