/* eslint-disable no-console */
import React, { ChangeEventHandler, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { startCase } from 'lodash';

import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';

import { SearchInput, SearchResult, SearchResultGroup } from '..';

import { State } from './SearchInput.types';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    state: { control: 'select', options: Object.values(State) },
    id: { control: 'string' },
    placeholder: { control: 'string' },
    value: { control: 'string' },
    disabled: { control: 'boolean' },
    ref: { control: 'none' },
  },
  parameters: {
    controls: {
      exclude: [...storybookExcludedControlParams, 'value', 'id', 'showWedge'],
    },
  },
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = props => (
  <SearchInput {...props} />
);

export const Basic = Template.bind({});

export const WithResults: ComponentStory<typeof SearchInput> = props => (
  <SearchInput
    className={css`
      width: 200px;
    `}
    onChange={() => {
      console.log('Change');
    }}
    onClear={() => {
      console.log('Clear');
    }}
    {...props}
  >
    <SearchResult
      onClick={() => {
        console.log('Click Apple');
      }}
      description="This is a description"
    >
      Apple
    </SearchResult>
    <SearchResult>Banana</SearchResult>
    <SearchResult as="a" href="#" description="This is a link">
      Carrot
    </SearchResult>
    <SearchResult description="This is a very very long description. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
      Dragonfruit
    </SearchResult>
    <SearchResultGroup label="Peppers">
      <SearchResult>Cayenne</SearchResult>
      <SearchResult>Ghost pepper</SearchResult>
      <SearchResult>Habanero</SearchResult>
      <SearchResult>Jalapeño</SearchResult>
      <SearchResult>Red pepper</SearchResult>
      <SearchResult>Scotch bonnet</SearchResult>
    </SearchResultGroup>
  </SearchInput>
);

export const LiveSearch: ComponentStory<typeof SearchInput> = () => {
  const data = [
    'apple',
    'banana',
    'carrot',
    'dragonfruit',
    'eggplant',
    'fig',
    'grape',
    'honeydew',
    'iceberg-lettuce',
    'jalapeño',
    'kiwi',
    'lemon',
    'melon',
    'nectarine',
    'orange',
    'pomegranate',
    'quince',
    'raspberry',
    'strawberry',
    'tomato',
    'ugli-fruit',
    'viola',
    'watermelon',
    'xylophone',
    'yam',
    'zebra',
  ];

  const [searchResults, setSearchResults] = useState(data);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setSearchResults(data.filter(datum => datum.includes(target.value)));
  };

  return (
    <SearchInput
      aria-label="Item"
      onChange={handleChange}
      className={css`
        width: 256px;
      `}
    >
      {searchResults.map(datum => (
        <SearchResult key={datum}>{startCase(datum)}</SearchResult>
      ))}
    </SearchInput>
  );
};
