import React from 'react';
import {
  ComponentPreview,
  PropCombinations,
  ReactStrictMode,
} from '@lg-tools/storybook-decorators';
import {
  storybookExcludedArgTypes,
  storybookExcludedControlParams,
} from '@lg-tools/storybook-utils';
import {
  Controls,
  Description,
  Primary,
  Subtitle as StorybookSubtitle,
  Title,
} from '@storybook/blocks';
import type { Preview } from '@storybook/react';

import { type Exists } from '@leafygreen-ui/lib';
import {
  Body,
  H1,
  H2,
  H3,
  InlineCode,
  Link,
  Subtitle,
} from '@leafygreen-ui/typography';

import { darkTheme, lightTheme } from '../themes';

const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  argTypes: {
    // By default we set specific argTypes to `control: none`
    ...storybookExcludedArgTypes,
  },
  controls: {
    exclude: [...storybookExcludedControlParams],
    expanded: true,
    matchers: {
      color: /.*(c|C)olor$/,
      date: /Date$/,
    },
    sort: 'requiredFirst',
  },
  docs: {
    components: {
      h1: H1,
      h2: H2,
      h3: H3,
      h4: Subtitle,
      h5: Body,
      p: Body,
      a: Link,
      code: InlineCode,
    },
    source: { type: 'code' },
    page: () => (
      <>
        <Title />
        <StorybookSubtitle />
        <Description />
        <Primary />
        <Controls />
      </>
    ),
  },
  darkMode: {
    dark: { ...darkTheme },
    light: { ...lightTheme },
  },
};

/**
 * Temporary compatibility type in order to build in Storybook 7 and 8
 * (while we support React 17 and 18)
 */
type Storybook7CompatiblePreviewType = Preview & {
  /** Uses the `tags` property from the Preview type if it exists, otherwise defaults to an array */
  tags: Exists<Preview, 'tags', Array<string>>;
};

const preview: Storybook7CompatiblePreviewType = {
  parameters,
  decorators: [ReactStrictMode, ComponentPreview, PropCombinations],
  tags: ['autodocs'],
};

export default preview;
