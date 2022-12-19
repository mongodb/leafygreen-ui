import React from 'react';

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
  <SearchResult {...rest}>{children}</SearchResult>
);

export const Result = Template.bind({});
