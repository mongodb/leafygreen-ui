import ComponentPreview from './decorators/ComponentPreview';
import ReactStrictMode from './decorators/ReactStrictMode';
import PropCombinationsDecorator from './decorators/PropCombinations';

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
      method: '',
      order: [
        'Overview',
        'Developer Guide',
        'Sample Pages (WIP)',
        'Contexts',
        'Packages',
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

export const decorators = [
  PropCombinationsDecorator,
  ReactStrictMode,
  ComponentPreview,
];

const preview: Preview = {
  parameters,
  decorators,
};

export default preview;
