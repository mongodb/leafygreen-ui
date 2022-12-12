import React from 'react';

import { SearchResult } from '../SearchResult';

import { SearchResultsMenu } from '.';

export default {
  title: 'Components/SearchInput/Menu',
  component: SearchResultsMenu,
};

const Template = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={divRef}>SearchInput Placeholder</div>
      <SearchResultsMenu refEl={divRef} open>
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

export const Basic = Template.bind({});
