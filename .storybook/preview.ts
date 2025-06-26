import { withDarkMode } from '@lg-tools/storybook-decorators';
import { Preview } from '@storybook/react';

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
  decorators: [withDarkMode()],
};

export default preview;
