import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import ComponentPreview from './decorators/ComponentPreview';

// Add decorators globally to wrap our stories with
addDecorator(withInfo);
addDecorator(
  withOptions({
    name: 'leafyGreen UI Kit',
    url: 'https://github.com/10gen/leafygreen-ui',
  }),
);
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
