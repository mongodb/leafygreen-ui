import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import ComponentPreview from './decorators/ComponentPreview';
import theme from './theme';

addParameters({
  options: {
    name: 'LeafyGreen UI',
    theme,
  },
});

// Add decorators globally to wrap our stories with
addDecorator(ComponentPreview);
addDecorator(withKnobs);

// Dynamically load all stories found in the packages sub-directories (excluding node_modules) that
// match the ".stories.js" extension
const req = require.context(
  '../packages',
  true,
  /^((?!node_modules).)*[.]story[.](t|j)sx?$/im,
);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
