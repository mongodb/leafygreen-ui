import React from 'react';
import { ComponentMeta } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  storybookArgTypes,
  // @ts-ignore
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
    children: {
      control: 'text',
    },
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
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'aria-label',
        'aria-labelledby',
      ],
    },
  },
} as ComponentMeta<any>;

const Template = ({ children, ...rest }: SearchResultProps) => (
  <LeafyGreenProvider darkMode={rest.darkMode}>
    <SearchResult {...rest}>{children}</SearchResult>
  </LeafyGreenProvider>
);

export const Result = Template.bind({});
