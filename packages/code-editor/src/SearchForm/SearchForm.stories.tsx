import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import type { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { SearchForm } from './SearchForm';

const Root = (Story: StoryFn, context: any) => (
  <LeafyGreenProvider
    darkMode={context?.args.darkMode}
    baseFontSize={context?.args.baseFontSize}
  >
    <Story />
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof SearchForm> = {
  title: 'Components/Inputs/CodeEditor/SearchForm',
  component: SearchForm,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'extensions'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: Object.values(BaseFontSize),
      },
      decorator: Root,
    },
  },
  decorators: [Root],
  args: {
    baseFontSize: BaseFontSize.Body1,
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
  },
};

export default meta;

const Template: StoryFn<typeof SearchForm> = args => <SearchForm {...args} />;

export const LiveExample = Template.bind({});
export const Generated = () => {};
