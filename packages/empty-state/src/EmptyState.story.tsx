import { storybookArgTypes } from '@leafygreen-ui/lib';

import { ThreeFeaturesWithActionsAndLink } from './FeaturesEmptyState/FeaturesEmptyState.story';

export default {
  title: 'Components/EmptyState',
  argTypes: {
    graphic: { control: 'none' },
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

export const LiveExample = ThreeFeaturesWithActionsAndLink;
LiveExample.args = {
  ...ThreeFeaturesWithActionsAndLink.args,
  title: 'Sample title of features empty state',
};
