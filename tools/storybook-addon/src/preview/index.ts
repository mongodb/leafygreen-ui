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

import { Theme } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';
import {
  Body,
  H1,
  H2,
  H3,
  InlineCode,
  Link,
  Subtitle,
} from '@leafygreen-ui/typography';

import { PARAM_KEY, withGlobalTheme } from '../globalThemeToggle';

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
  },

  /**
   * Modes
   */
  viewport: {
    viewports: {
      desktop: {
        name: 'Desktop',
        styles: {
          width: breakpoints.XLDesktop + 1 + 'px',
          height: '1080px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: breakpoints.Tablet + 'px',
          height: '1024px',
        },
      },
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
    },
  },
  [PARAM_KEY]: {
    themes: {
      [Theme.Light]: {
        name: 'Light',
        theme: Theme.Light,
        darkMode: false,
      },
      [Theme.Dark]: {
        name: 'Dark',
        theme: Theme.Dark,
        darkMode: true,
      },
    },
  },
};

const preview: Preview = {
  parameters,
  decorators: [
    withGlobalTheme,
    ReactStrictMode,
    ComponentPreview,
    PropCombinations,
  ],
};

export default preview;
