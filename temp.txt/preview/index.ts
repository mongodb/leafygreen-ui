import {
  ComponentPreview,
  PropCombinations,
  ReactStrictMode,
} from '@lg-tools/storybook-decorators';
import { Preview } from '@storybook/react';

import {
  storybookExcludedArgTypes,
  storybookExcludedControlParams,
} from '@leafygreen-ui/lib';
import {
  Body,
  H1,
  H2,
  H3,
  InlineCode,
  Link,
  Subtitle,
} from '@leafygreen-ui/typography';

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
};

const decorators = [PropCombinations, ReactStrictMode, ComponentPreview];

const preview: Preview = {
  parameters,
  decorators,
};

export default preview;
