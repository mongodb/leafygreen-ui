import React from 'react';
import { ComponentMeta } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { defaultStorybookArgTypes } from '@leafygreen-ui/lib';

import { SearchResult, type SearchResultProps } from '.';

export default {
  title: 'Components/SearchInput/SearchResult',
  component: SearchResult,
  args: {
    children: 'Some text',
    description: 'This is a description',
  },
  argTypes: {
    children: defaultStorybookArgTypes.children,
    darkMode: defaultStorybookArgTypes.darkMode,
    description: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    highlighted: {
      control: 'boolean',
    },
    href: {
      control: 'text',
      if: { arg: 'as', eq: 'a' },
    },
  },
  parameters: {
    default: null,
    chromatic: { disableSnapshot: true },
  },
} as ComponentMeta<any>;

const Template = ({ children, ...rest }: SearchResultProps) => (
  <LeafyGreenProvider darkMode={rest.darkMode}>
    <SearchResult {...rest}>{children}</SearchResult>
  </LeafyGreenProvider>
);

export const Result = Template.bind({});
