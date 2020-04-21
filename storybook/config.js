import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withPerformance } from 'storybook-addon-performance';
import ComponentPreview from './decorators/ComponentPreview';
import ReactStrictMode from './decorators/ReactStrictMode';
import theme from './theme';

addParameters({
  options: {
    name: 'LeafyGreen UI',
    theme,
  },
});

// Add decorators globally to wrap our stories with
addDecorator(ReactStrictMode);
addDecorator(ComponentPreview);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withPerformance);

// Dynamically load all stories found in the packages sub-directories (excluding node_modules) that
// match the ".stories.js" extension
const req = require.context(
  '../packages',
  true,
  /^((?!node_modules).)*[.]story[.](t|j)sx?$/im,
);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
