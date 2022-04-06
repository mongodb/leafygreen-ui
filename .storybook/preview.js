import { addDecorator } from '@storybook/react';
import ComponentPreview from './decorators/ComponentPreview';
import ReactStrictMode from './decorators/ReactStrictMode';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: '',
      order: ['Overview', 'Packages'],
      locales: '',
    },
  },
};

addDecorator(ReactStrictMode);
addDecorator(ComponentPreview);
