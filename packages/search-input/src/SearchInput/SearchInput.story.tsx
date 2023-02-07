/* eslint-disable no-console */
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { kebabCase, startCase } from 'lodash';

import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  // @ts-ignore
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';
import { Body, H1 } from '@leafygreen-ui/typography';

import { SearchInput, SearchResult, SearchResultGroup } from '..';

import { State } from './SearchInput.types';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    state: { control: 'select', options: Object.values(State) },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'value',
        'id',
        'showWedge',
        'onSubmit',
      ],
    },
  },
} as ComponentMeta<typeof SearchInput>;

export const Basic: ComponentStory<typeof SearchInput> = props => (
  <SearchInput
    className={css`
      width: 200px;
    `}
    {...props}
  />
);

export const WithResults: ComponentStory<typeof SearchInput> = props => (
  <SearchInput
    className={css`
      width: 200px;
    `}
    onChange={() => {
      console.log('SB: Change');
    }}
    {...props}
  >
    <SearchResult
      onClick={() => {
        console.log('SB: Click Apple');
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
      <SearchResult description="A moderately hot chili pepper used to flavor dishes">
        Cayenne
      </SearchResult>
      <SearchResult>Ghost pepper</SearchResult>
      <SearchResult>Habanero</SearchResult>
      <SearchResult>Jalapeño</SearchResult>
      <SearchResult>Red pepper</SearchResult>
      <SearchResult>Scotch bonnet</SearchResult>
    </SearchResultGroup>
  </SearchInput>
);

const data = [
  {
    name: 'apple',
    description:
      'A round fruit which typically has thin red or green skin and crisp flesh',
  },
  {
    name: 'banana',
    description: ' Along curved fruit which grows in clusters',
  },
  {
    name: 'carrot',
    description: 'A tapering orange-colored root eaten as a vegetable',
  },
  {
    name: 'dragonfruit',
    description:
      'The fruit of a pitahaya cactus, with leathery red, pink, or yellow skin ',
  },
  {
    name: 'eggplant',
    description: 'The purple egg-shaped fruit of a tropical Old World plant',
  },
  {
    name: 'fig',
    description:
      'A soft pear-shaped fruit with sweet dark flesh and many small seeds',
  },
  {
    name: 'grape',
    description:
      'A berry, typically green, purple, red, or black, growing in clusters on a vine',
  },
  {
    name: 'honeydew',
    description:
      'A melon of a variety with smooth pale skin and sweet green flesh',
  },
  {
    name: 'iceberg-lettuce',
    description:
      'A lettuce of a variety having a dense round head of crisp pale leaves.',
  },
  {
    name: 'jalapeño',
    description:
      'A very hot green chili pepper, used especially in Mexican-style cooking',
  },
  {
    name: 'kiwi',
    description: 'A fruit with a thin hairy skin, green flesh, and black seeds',
  },
  {
    name: 'lemon',
    description:
      'A yellow, oval citrus fruit with thick skin and fragrant, acidic juice:',
  },
  {
    name: 'melon',
    description:
      'The large round fruit of a plant of the gourd family, with sweet pulpy flesh and many seeds',
  },
  {
    name: 'nectarine',
    description:
      'A peach of a variety with smooth, thin, brightly colored skin and rich firm flesh.',
  },
  {
    name: 'orange',
    description:
      'A round juicy citrus fruit with a tough bright reddish-yellow rind',
  },
  {
    name: 'pomegranate',
    description:
      'An orange-sized fruit with a tough reddish outer skin and sweet red gelatinous flesh containing many seeds',
  },
  {
    name: 'quince',
    description:
      'A hard, acid pear-shaped fruit used in preserves or as flavoring',
  },
  {
    name: 'raspberry',
    description:
      'An edible soft fruit related to the blackberry, consisting of a cluster of reddish-pink drupelets',
  },
  {
    name: 'strawberry',
    description: 'A sweet soft red fruit with a seed-studded surface',
  },
  {
    name: 'tomato',
    description:
      'A glossy red, or occasionally yellow, pulpy edible fruit that is eaten as a vegetable or in salad',
  },
  {
    name: 'ugli-fruit',
    description:
      'A mottled green and yellow citrus fruit which is a hybrid of a grapefruit and a tangerine',
  },
  {
    name: 'vanilla',
    description:
      'A tropical climbing orchid that has fragrant flowers and long podlike fruit',
  },
  {
    name: 'watermelon',
    description:
      'The large fruit of a plant of the gourd family, with smooth green skin, red pulp, and watery juice',
  },
  {
    name: 'ximenia',
    description:
      'Can be eaten raw and can be used to make juice, jams or intoxicating drinks',
  },
  {
    name: 'yam',
    description:
      'The edible starchy tuber of a climbing plant that is widely grown in tropical and subtropical countries',
  },
  {
    name: 'zucchini',
    description: 'A green variety of smooth-skinned summer squash',
  },
];

export const LiveSearch: ComponentStory<typeof SearchInput> = args => {
  const [currentPage, setPage] = useState<typeof data[0]>();
  const [searchResults, setSearchResults] = useState(data);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setSearchResults(data.filter(datum => datum.name.includes(target.value)));
  };

  const handleSelect: FormEventHandler<HTMLFormElement> = e => {
    /// @ts-ignore
    setPage(data.find(item => item.name === kebabCase(e.target?.[0].value)));
  };

  return (
    <div
      className={css`
        width: 256px;
      `}
    >
      <SearchInput
        aria-label="Item"
        onChange={handleChange}
        onSubmit={handleSelect}
        {...args}
      >
        {searchResults.map(item => (
          <SearchResult key={item.name} description={item.description}>
            {startCase(item.name)}
          </SearchResult>
        ))}
      </SearchInput>
      {currentPage && (
        <div>
          <H1>{startCase(currentPage.name)}</H1>
          <Body>{currentPage.description}</Body>
        </div>
      )}
    </div>
  );
};
LiveSearch.argTypes = {};
