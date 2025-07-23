import React, { useCallback, useEffect, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';

import { ulStyleOverrides, useSideNavContext } from '../SideNav';
import {
  baseStyle,
  buttonClassName,
  indentedStyle,
  themeStyle,
} from '../SideNavGroup/SideNavGroup.styles';
import { SideNavGroupHeader } from '../SideNavGroupHeader';

import {
  collapsibleBaseStyle,
  collapsibleFocusThemeStyle,
  collapsibleGroupBaseStyles,
  collapsibleThemeStyle,
  expandIconStyle,
  openExpandIconStyle,
  transitionStyles,
  ulStyles,
  ulTransitionStyles,
} from './SideNavGroupCollapsed.styles';
import { SideNavGroupCollapsedProps } from './SideNavGroupCollapsed.types';

/**
 * @internal
 */
export function SideNavGroupCollapsed({
  groupHeaderProps,
  open,
  setOpen,
  menuGroupLabelId,
  indentLevel,
  children,
  isActiveGroup,
  accessibleGlyph,
  header,
}: SideNavGroupCollapsedProps) {
  const { width, theme, darkMode } = useSideNavContext();
  const { usingKeyboard } = useUsingKeyboardContext();

  const [ulHeight, setUlHeight] = useState(0);

  const menuId = useIdAllocator({ prefix: 'menu' });

  const nodeRef = React.useRef(null);

  const ulRef = useCallback((node: HTMLUListElement) => {
    if (node !== null) {
      setUlHeight(node.getBoundingClientRect().height);
    }
  }, []);

  // compute the entered ul wrapper styles based on the ul height
  useEffect(() => {
    transitionStyles['entered'] = css`
      opacity: 1;
      max-height: ${ulHeight + 1}px; // +1 for border
      border-bottom: 1px solid
        ${darkMode ? palette.gray.dark1 : palette.gray.light2};
    `;
  }, [open, ulHeight, darkMode]);

  return (
    <>
      <button
        {...groupHeaderProps}
        aria-controls={menuId}
        aria-expanded={open}
        className={cx(
          buttonClassName,
          baseStyle,
          themeStyle[theme],
          collapsibleBaseStyle,
          collapsibleThemeStyle[theme],
          css`
            width: ${width}px;
          `,
          {
            [collapsibleFocusThemeStyle[theme]]: usingKeyboard,
            [indentedStyle(indentLevel, darkMode)]: indentLevel > 1,
          },
        )}
        onClick={() => setOpen((curr: boolean) => !curr)}
      >
        <SideNavGroupHeader
          isActiveGroup={isActiveGroup}
          header={header}
          accessibleGlyph={accessibleGlyph}
        />
        <ChevronRight
          role="presentation"
          size={12}
          className={cx(expandIconStyle, {
            [openExpandIconStyle]: open,
          })}
        />
      </button>
      <Transition
        in={open}
        appear
        timeout={150}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
      >
        {(state: TransitionStatus) => (
          <div
            ref={nodeRef}
            className={cx(collapsibleGroupBaseStyles, transitionStyles[state])}
          >
            <ul
              ref={ulRef}
              id={menuId}
              aria-labelledby={menuGroupLabelId}
              className={cx(ulStyleOverrides, ulStyles, {
                [ulTransitionStyles]: ['entering', 'entered'].includes(state),
              })}
            >
              {children}
            </ul>
          </div>
        )}
      </Transition>
    </>
  );
}
