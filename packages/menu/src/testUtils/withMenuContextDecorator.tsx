/* eslint-disable react/jsx-key, react/display-name, react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import { InstanceDecorator } from '@lg-tools/storybook-utils';

import { Descendant } from '@leafygreen-ui/descendants';
import { Theme } from '@leafygreen-ui/lib';

import { Menu } from '../Menu';
import { MenuContext } from '../MenuContext';
import { MenuItem } from '../MenuItem';

/** Implements a MenuContext wrapper around each `MenuItem` */
export const withMenuContext =
  (): InstanceDecorator<typeof MenuItem & typeof Menu> => (Instance, ctx) => {
    const {
      args: { darkMode: darkModeProp, renderDarkMenu, highlighted },
    } = ctx ?? {
      args: {
        darkMode: false,
        renderDarkMenu: false,
        highlighted: false,
      },
    };

    const darkMode = (renderDarkMenu || darkModeProp) ?? false;
    const theme = darkMode ? Theme.Dark : Theme.Light;

    const ref = useRef<HTMLButtonElement>(null);
    const [testDescendant, setTestDescendant] = useState<Descendant>();
    useEffect(() => {
      setTestDescendant({
        ref,
        element: ref.current,
        id: ref?.current?.getAttribute('data-id'),
        index: Number(ref?.current?.getAttribute('data-index')),
      } as Descendant);
    }, []);

    return (
      <MenuContext.Provider
        value={{
          highlight: highlighted ? testDescendant : undefined,
          darkMode,
          theme,
        }}
      >
        <Instance ref={ref} data-theme={theme} />
      </MenuContext.Provider>
    );
  };
