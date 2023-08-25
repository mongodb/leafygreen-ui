import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import ChevronLeft from '@leafygreen-ui/icon/dist/ChevronLeft';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import Tooltip from '@leafygreen-ui/tooltip';
import { InlineKeyCode } from '@leafygreen-ui/typography';

import { useSideNavContext } from '../SideNav/SideNavContext';

import {
  buttonBaseStyles,
  buttonCollapsedStyles,
  buttonThemeStyles,
  iconClassName,
  iconWrapper,
  keyboardShortcut,
} from './CollapseToggle.styles';
import { CollapseToggleProps } from './CollapseToggle.types';

/**
 * @internal
 */
export function CollapseToggle({
  className,
  collapsed,
  hideTooltip,
  ...rest
}: CollapseToggleProps) {
  const { navId, theme } = useSideNavContext();

  const Chevron = collapsed ? ChevronRight : ChevronLeft;

  return (
    <Tooltip
      usePortal={false}
      align="right"
      justify="middle"
      open={typeof hideTooltip === 'boolean' ? !hideTooltip : undefined}
      trigger={
        <button
          data-testid="side-nav-collapse-toggle"
          aria-label="Collapse navigation"
          aria-controls={navId}
          aria-expanded={!collapsed}
          className={cx(
            buttonBaseStyles,
            buttonThemeStyles[theme],
            {
              [buttonCollapsedStyles]: collapsed,
            },
            className,
          )}
          {...rest}
        >
          <div className={cx(iconClassName, iconWrapper)}>
            <Chevron role="presentation" />
          </div>
        </button>
      }
    >
      <span aria-hidden>
        {collapsed ? 'Expand' : 'Collapse'}
        <InlineKeyCode className={keyboardShortcut}>[</InlineKeyCode>
      </span>
    </Tooltip>
  );
}
