/* eslint-disable react/display-name */
import React from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import { Chip } from './Chip';

const meta: StoryMetaType<typeof Chip> = {
  title: 'Components/Combobox/Chip',
  component: Chip,
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
