import { addDecorator, addParameters } from '@storybook/react';
import ComponentPreview from './decorators/ComponentPreview';
import ReactStrictMode from './decorators/ReactStrictMode';
import {
  H1,
  H2,
  H3,
  Subtitle,
  Body,
  InlineCode,
  Link,
} from '@leafygreen-ui/typography';

const H4 = ({ children, ...rest }) => (
  <Subtitle as="h4" {...rest}>
    <strong>{children}</strong>
  </Subtitle>
);

const H5 = ({ children, ...rest }) => (
  <Body {...rest}>
    <strong>{children}</strong>
  </Body>
);

export const argTypes = {
  className: {
    description: '`className` prop passed to the component',
    control: 'text',
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /.*(c|C)olor$/,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: '',
      order: ['Overview', 'Developer Guide', 'Sample Pages (WIP)', 'Contexts', 'Packages'],
      locales: '',
    },
  },
  docs: {
    components: {
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      h5: H5,
      p: Body,
      a: Link,
      code: InlineCode,
    },
  },
};

addDecorator(ReactStrictMode);
addDecorator(ComponentPreview);
