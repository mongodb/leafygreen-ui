import { storybookArgTypes } from '@leafygreen-ui/lib';

import { ThreeFeaturesWithActions } from './FeaturesEmptyState/FeaturesEmptyState.story';

export default {
  title: 'Components/EmptyState',
  argTypes: {
    thumbnail: { control: 'none' },
    description: { control: 'text' },
    ExternalLink: { control: 'none' },
    PrimaryButton: { control: 'none' },
    SecondaryButton: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['className'],
    },
  },
};

export const LiveExample = ThreeFeaturesWithActions;
LiveExample.args = {
  title: 'Triggers have no dependencies yet',
};
