import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';

import { SearchInput, SearchResult } from '.';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    id: { control: 'string' },
    placeholder: { control: 'string' },
    value: { control: 'string' },
    disabled: { control: 'boolean' },
    ref: { control: 'none' },
  },
  parameters: {
    controls: {
      exclude: [...storybookExcludedControlParams, 'value', 'id'],
    },
  },
} as unknown as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = props => (
  <SearchInput {...props} />
);

export const Basic = Template.bind({});

export const WithResults: ComponentStory<typeof SearchInput> = props => (
  <SearchInput
    className={css`
      width: 200px;
    `}
    {...props}
  >
    <SearchResult
      onClick={() => {
        console.log('Click');
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
      Example 4
    </SearchResult>
  </SearchInput>
);
