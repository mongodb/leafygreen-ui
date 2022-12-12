import React from 'react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';

import { SearchResult } from './SearchResult';
import type { SearchResultProps } from './SearchResult.types';

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
    active: {
      control: 'boolean',
    },
    showWedge: {
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
