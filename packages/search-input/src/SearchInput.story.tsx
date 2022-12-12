import React from 'react';
import { ComponentStory } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { SearchResult } from './SearchResult';
import { SearchInput } from '.';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    id: { control: 'string' },
    placeholder: { control: 'string' },
    value: { control: 'string' },
    disabled: { control: 'boolean' },
    ref: { control: 'none' },
  },
};

const Template: ComponentStory<typeof SearchInput> = props => (
  <SearchInput {...props} />
);

export const Basic = Template.bind({});

export const WithResults: ComponentStory<typeof SearchInput> = props => (
  <SearchInput {...props}>
    <SearchResult description="This is a description">Example 1</SearchResult>
    <SearchResult>Example 2</SearchResult>
    <SearchResult description="This is a description">Example 3</SearchResult>
  </SearchInput>
);
