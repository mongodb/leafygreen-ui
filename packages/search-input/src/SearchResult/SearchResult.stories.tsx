/* eslint-disable react/display-name */
import React from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import { SearchResult, type SearchResultProps } from '.';

const meta: StoryMetaType<typeof SearchResult> = {
  title: 'Components/SearchInput/SearchResult',
  component: SearchResult,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, 'This is a description'],
        disabled: [false, true],
        highlighted: [false, true],
      },
      decorator: (Instance, ctx) => (
        <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
          <Instance />
        </LeafyGreenProvider>
      ),
    },
  },
  args: {
    children: 'Some text',
    description: 'This is a description',
  },
  argTypes: {
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
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
};
export default meta;

export const Demo = ({ children, ...rest }: SearchResultProps) => (
  <LeafyGreenProvider darkMode={rest.darkMode}>
    <SearchResult {...rest}>{children}</SearchResult>
  </LeafyGreenProvider>
);
Demo.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
