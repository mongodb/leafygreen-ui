import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withPerformance } from 'storybook-addon-performance';
import ComponentPreview from './decorators/ComponentPreview';
import ReactStrictMode from './decorators/ReactStrictMode';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
}

// Add decorators globally to wrap our stories with
addDecorator(ReactStrictMode);
addDecorator(ComponentPreview);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withPerformance);