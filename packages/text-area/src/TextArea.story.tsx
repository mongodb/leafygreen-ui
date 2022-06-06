import React from 'react';
import TextArea, { TextAreaProps } from './TextArea';
import { ComponentStory } from '@storybook/react';
import defaultArgTypes from '../../../stories/defaultArgTypes';

export const StoryTextArea: React.FC<TextAreaProps> = props => (
  <TextArea {...props} />
);

export default {
  title: 'Packages/TextArea',
  component: StoryTextArea,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    darkMode: defaultArgTypes.darkMode,
    ref: { control: 'none' },
  },
  excludeStories: ['StoryTextArea'],
};

const Template: ComponentStory<typeof StoryTextArea> = args => (
  <TextArea {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Label',
  description: 'This is a description for the textarea',
  errorMessage: 'This is an error message',
};
