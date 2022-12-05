import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';
import React from 'react';
import { SearchResult } from './SearchResult';
import { SearchResultProps } from './SearchResult.types';

export default {
  title: 'Components/SearchInput/SearchResult',
  component: SearchResult,
  args: {
    children: 'Some text',
  },
  argTypes: {
    ...storybookArgTypes,
  },
  parameters: {
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
  },
};

const Template = ({ children, ...rest }: SearchResultProps) => (
  <SearchResult {...rest}>{children}</SearchResult>
);

export const Result = Template.bind({});
