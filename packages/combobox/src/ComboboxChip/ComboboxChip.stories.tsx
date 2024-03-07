/* eslint-disable react/display-name */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ComboboxChip } from './ComboboxChip';

const meta: StoryMetaType<typeof ComboboxChip> = {
  title: 'Components/Combobox/ComboboxChip',
  component: ComboboxChip,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        displayName: [
          'Chip',
          '5f4dcc3b5aa765d61d8327deb882cf995f4dcc3b5aa765d61d8327deb882cf99',
        ],
      },
      args: {},
      decorator: (Instance, context) => {
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <Instance />
          </LeafyGreenProvider>
        );
      },
    },
  },
};
export default meta;

export const Generated = () => <></>;
