import React from 'react';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { cx } from '@leafygreen-ui/emotion';
import Tooltip from '@leafygreen-ui/tooltip';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import ChevronLeft from '@leafygreen-ui/icon/dist/ChevronLeft';
import { useSideNavContext } from '../SideNav/SideNavContext';
import { InlineKeyCode } from '@leafygreen-ui/typography';
import { CollapseToggleProps } from './types';
import {
  buttonBaseStyles,
  buttonThemeStyles,
  buttonCollapsedStyles,
  iconWrapper,
  keyboardShortcut,
} from './styles';

export const iconClassName = createUniqueClassName('collapse-menu');

function CollapseToggle({
  className,
  collapsed,
  hideTooltip,
  ...rest
}: CollapseToggleProps) {
  const { navId, darkMode, theme } = useSideNavContext();

  const Chevron = collapsed ? ChevronRight : ChevronLeft;

  return (
    <Tooltip
      darkMode={darkMode}
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
        <InlineKeyCode className={keyboardShortcut} darkMode={!darkMode}>
          [
        </InlineKeyCode>
      </span>
    </Tooltip>
  );
}

export default CollapseToggle;
