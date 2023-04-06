import { storybookArgTypes } from '@leafygreen-ui/lib';

import { ThreeFeaturesWithActionsAndLink } from './FeaturesEmptyState/FeaturesEmptyState.story';

export default {
  title: 'Components/EmptyState',
  argTypes: {
    graphic: { control: 'none' },
    externalLink: { control: 'none' },
    primaryButton: { control: 'none' },
    secondaryButton: { control: 'none' },
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
