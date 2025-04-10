/* eslint-disable react/display-name */
import React from 'react';
import { InstanceDecorator } from '@lg-tools/storybook-utils';
import noop from 'lodash/noop';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';

import { Menu } from '../Menu';
import { MenuContext } from '../MenuContext';
import { MenuItem } from '../MenuItem';
import { getLgIds } from '../utils';

/**
 * Implements a MenuContext wrapper around each `MenuItem`, `SubMenu` or `MenuGroup`
 */
export const withMenuContext =
  (): InstanceDecorator<typeof MenuItem & typeof Menu> => (Instance, ctx) => {
    const {
      args: {
        darkMode: darkModeProp,
        renderDarkMenu,
        highlight,
        moveHighlight,
        setHighlight,
        lgIds = getLgIds(),
      },
    } = ctx ?? {
      args: {
        darkMode: false,
        renderDarkMenu: false,
        highlight: undefined,
        moveHighlight: noop,
        setHighlight: noop,
        lgIds: getLgIds(),
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
            highlight,
            moveHighlight,
            setHighlight,
            lgIds,
          }}
        >
          <Instance />
        </MenuContext.Provider>
      </div>
    );
  };
