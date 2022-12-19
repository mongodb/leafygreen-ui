import React from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';

import { SearchResult, type SearchResultProps } from '.';

export default {
  title: 'Components/SearchInput/SearchResult',
  component: SearchResult,
  args: {
    children: 'Some text',
    description: 'This is a description',
  },
  argTypes: {
    ...storybookArgTypes,
    disabled: {
      control: 'boolean',
    },
    focused: {
      control: 'boolean',
    },
    href: {
      control: 'text',
      if: { arg: 'as', eq: 'a' },
    },
  },
  parameters: {
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'aria-label',
        'aria-labelledby',
      ],
    },
  },
};

const Template = ({ children, ...rest }: SearchResultProps) => (
  <LeafyGreenProvider darkMode={rest.darkMode}>
    <SearchResult {...rest}>{children}</SearchResult>
  </LeafyGreenProvider>
);

export const Result = Template.bind({});
