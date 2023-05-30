/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';

import { StoryMetaType } from '@leafygreen-ui/lib';

import { SearchResult } from '../SearchResult';

import { SearchResultsMenu } from '.';

const meta: StoryMetaType<typeof SearchResultsMenu> = {
  title: 'Components/SearchInput/Menu',
  component: SearchResultsMenu,
  parameters: {
    default: null,
    generate: {
      props: {
        darkMode: [false, true],
      },
      args: {
        open: true,
      },
      decorator: Instance => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const divRef = React.useRef<HTMLDivElement>(null);
        return (
          <>
            <div ref={divRef}>SearchInput Placeholder</div>
            <Instance refEl={divRef} />
          </>
        );
      },
    },
  },
};
export default meta;

export const Demo = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={divRef}>SearchInput Placeholder</div>
      <SearchResultsMenu refEl={divRef} open={open}>
        <SearchResult description="This is a description">
          Example 1
        </SearchResult>
        <SearchResult>Example 2</SearchResult>
        <SearchResult description="This is a description">
          Example 3
        </SearchResult>
      </SearchResultsMenu>
    </>
  );
};
Demo.parameters = {
  chromatic: { disableSnapshot: true },
};
