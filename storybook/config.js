import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import ComponentPreview from './decorators/ComponentPreview';

addParameters({
  options: {
    brandTitle: 'leafyGreen UI Kit',
    brandUrl: 'https://github.com/10gen/leafygreen-ui',
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
  /^((?!node_modules).)*[.]story[.]js$/im,
);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
