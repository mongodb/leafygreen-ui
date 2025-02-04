import {
  ComponentPreview,
  PropCombinations,
  ReactStrictMode,
} from '@lg-tools/storybook-decorators';
import {
  storybookExcludedArgTypes,
  storybookExcludedControlParams,
} from '@lg-tools/storybook-utils';
import type { Preview } from '@storybook/react';

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

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    argTypes: {
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
    },
    darkMode: {
      dark: darkTheme,
      light: lightTheme,
    },
  },
  decorators: [PropCombinations, ReactStrictMode, ComponentPreview],
};

export default preview;
