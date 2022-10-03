import React from 'react';
import { ComponentStory } from '@storybook/react';
import SearchInput from '.';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
}

const Template: ComponentStory<typeof SearchInput> = (props) => (
  <SearchInput {...props} />
);

export const Basic = Template.bind({});