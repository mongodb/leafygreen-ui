/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType, StoryType } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { State } from '../SearchInput';
import { SearchInputContextProvider } from '../SearchInputContext';
import { SearchResult } from '../SearchResult';

import { SearchResultsMenu } from '.';

const demoChild = <SearchResult>Search Result</SearchResult>;

const meta: StoryMetaType<typeof SearchResultsMenu, { state: State }> = {
  title: 'Components/SearchInput/SearchResultsMenu',
  component: SearchResultsMenu,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        children: [undefined, demoChild],
        state: Object.values(State),
      },
      excludeCombinations: [
        {
          state: State.Loading,
          children: demoChild,
        },
      ],
      decorator: (Instance, ctx) => {
        const [open, setOpen] = useState(false);
        useEffect(() => {
          setOpen(true);
        }, []);
        const divRef = React.useRef<HTMLDivElement>(null);
        return (
          <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
            <SearchInputContextProvider state={ctx?.args.state}>
              <div
                ref={divRef}
                className={css`
                  height: 0;
                  color: transparent;

                  td:has(&) {
                    vertical-align: top;
                  }
                `}
              >
                SearchInput Placeholder
              </div>
              <Instance refEl={divRef} open={open} />
            </SearchInputContextProvider>
          </LeafyGreenProvider>
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

export const Generated: StoryType<typeof SearchResultsMenu> = () => <></>;
Generated.parameters = {
  chromatic: {
    delay: transitionDuration.slowest,
    // This test is flaky
    // FIXME: componentize & test the menu contents
    disableSnapshot: true,
  },
};
