import {
  ComponentPreview,
  ReactStrictMode,
  PropCombinations,
} from '@lg-tools/storybook-decorators';

import {
  storybookExcludedArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  InlineCode,
  Link,
} from '@leafygreen-ui/typography';
import { Preview } from '@storybook/react';

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
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Overview',
        'Developer Guide',
        'Components',
        'Contexts',
        'Hooks',
        'LeafyGreen Provider',
        'Form',
        'Lib Utilities',
        'Sample Pages (WIP)',
      ],
      locales: '',
    },
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
};

export const decorators = [PropCombinations, ReactStrictMode, ComponentPreview];

const preview: Preview = {
  parameters,
  decorators,
};

export default preview;
