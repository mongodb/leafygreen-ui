/* eslint-disable react/jsx-key, react/display-name, react-hooks/rules-of-hooks */
import React from 'react';
import { InstanceDecorator } from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';

import { Menu } from '../Menu';
import { MenuContext } from '../MenuContext';
import { MenuItem } from '../MenuItem';

/**
 * Implements a MenuContext wrapper around each `MenuItem`, `SubMenu` or `MenuGroup`
 */
export const withMenuContext =
  (): InstanceDecorator<typeof MenuItem & typeof Menu> => (Instance, ctx) => {
    const {
      args: { darkMode: darkModeProp, renderDarkMenu },
    } = ctx ?? {
      args: {
        darkMode: false,
        renderDarkMenu: false,
      },
    };

    const darkMode = darkModeProp ?? false;
    const theme = darkMode ? Theme.Dark : Theme.Light;

    return (
      <div
        className={css`
          max-width: 256px;
        `}
      >
        <MenuContext.Provider
          value={{
            darkMode,
            theme,
            renderDarkMenu,
          }}
        >
          <Instance />
        </MenuContext.Provider>
      </div>
    );
  };
