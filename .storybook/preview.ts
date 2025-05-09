import { Preview } from '@storybook/react';

console.log('📍📍📍 Running Local Storybook preview.ts configuration');
const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Overview',
        'Developer Guide',
        'Components',
        'Contexts',
        'Hooks',
        'LeafyGreen Provider',
        'Form',
        'Lib Utilities',
        'Sample Pages (WIP)',
      ],
      locales: '',
    },
  },
};

const preview: Preview = {
  parameters,
  decorators: [],
};

export default preview;
