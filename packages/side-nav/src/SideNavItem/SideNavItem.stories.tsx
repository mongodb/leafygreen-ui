/* eslint-disable react/display-name */
import React from 'react';

import { StoryMetaType, Theme } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import SideNavContext from '../SideNav/SideNavContext';

import SideNavItem from './SideNavItem';

const meta: StoryMetaType<typeof SideNavItem> = {
  title: 'Components/SideNav/SideNavItem',
  component: SideNavItem,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        active: [false, true],
        disabled: [false, true],
      },
      args: {
        children: 'SideNav Item',
      },
      decorator: (Instance, ctx) => (
        <SideNavContext.Provider
          value={{
            width: 200,
            baseFontSize: BaseFontSize.Body1,
            darkMode: ctx?.args.darkMode,
            theme: ctx?.args.darkMode ? Theme.Dark : Theme.Light,
            collapsed: false,
          }}
        >
          <Instance />
        </SideNavContext.Provider>
      ),
    },
  },
};

export default meta;

export const Generated = () => <></>;
