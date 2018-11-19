import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import ComponentPreview from './decorators/ComponentPreview';

// Configure the Storybook UI
setOptions({
  name: 'leafyGreen UI Kit',
  url: 'https://github.com/10gen/leafygreen-ui',
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

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
