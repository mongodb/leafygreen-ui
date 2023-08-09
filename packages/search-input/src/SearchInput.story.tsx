/* eslint-disable no-console */
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { StoryFn } from '@storybook/react';
import { kebabCase, startCase } from 'lodash';

import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { Body, H2 } from '@leafygreen-ui/typography';

import { State } from './SearchInput/SearchInput.types';
import {
  SearchInput,
  type SearchInputProps,
  SearchResult,
  SearchResultGroup,
} from '.';

const meta: StoryMetaType<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'value',
        'id',
        'showWedge',
        'onSubmit',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        disabled: [false, true],
      },
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    state: { control: 'select', options: Object.values(State) },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

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

export const LiveExample: StoryFn<SearchInputProps> = (
  args: SearchInputProps,
) => {
  const [currentPage, setPage] = useState<typeof data[0]>();
  const [searchResults, setSearchResults] = useState(data);

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    console.log('Storybook: handleChange', { value });
    args.onChange?.(e);

    setSearchResults(
      data.filter(datum => datum.name.includes(kebabCase(value))),
    );
  };

  const handleSelect: FormEventHandler<HTMLFormElement> = e => {
    const { value } = (e.target as HTMLFormElement)[0] as HTMLInputElement;
    args.onSelect?.(e);
    console.log('Storybook: handleSelect', { value });

    setPage(
      data.find(
        /// @ts-ignore
        item => kebabCase(item.name) === kebabCase(value),
      ),
    );
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
          <SearchResult
            key={item.name}
            description={item.description}
            onClick={() => console.log('Storybook: Clicked', item.name)}
          >
            {startCase(item.name)}
          </SearchResult>
        ))}
      </SearchInput>
      {currentPage && (
        <div
          className={css`
            min-width: min-content;
            margin-block: 20px;
            padding: 20px;
            outline: 1px solid green;
          `}
        >
          <H2>{startCase(currentPage.name)}</H2>
          <Body>{currentPage.description}</Body>
        </div>
      )}
    </div>
  );
};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};
LiveExample.argTypes = {
  onChange: { action: 'Change' },
  onSubmit: { action: 'Submit' },
  onClick: { action: 'Click' },
};

export const Basic: StoryFn<SearchInputProps> = (props: SearchInputProps) => (
  <SearchInput
    className={css`
      width: 200px;
    `}
    {...props}
  />
);
Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithResults: StoryFn<SearchInputProps> = (
  props: SearchInputProps,
) => (
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
WithResults.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
