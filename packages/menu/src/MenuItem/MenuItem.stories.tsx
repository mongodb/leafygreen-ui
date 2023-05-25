/* eslint-disable react/display-name */
import React from 'react';

import { StoryMetaType } from '@leafygreen-ui/lib';

import MenuItem from './MenuItem';

const meta: StoryMetaType<typeof MenuItem> = {
  title: 'Components/Menu/MenuItem',
  component: MenuItem,
  parameters: {
    default: null,
    generate: {
      props: {
        darkMode: [false, true],
      },
      args: {
        children: 'Menu Item',
      },
      decorator: StoryFn => {
        return (
          <div>
            <StoryFn />
          </div>
        );
      },
    },
  },
};
export default meta;

export const Generated = () => {};
