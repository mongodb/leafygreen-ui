import React from 'react';
import { transparentize } from 'polished';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { createUniqueClassName, HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';
import Tooltip from '@leafygreen-ui/tooltip';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import ChevronLeft from '@leafygreen-ui/icon/dist/ChevronLeft';
import { useSideNavContext } from './SideNavContext';
import { InlineKeyCode } from '@leafygreen-ui/typography';

const iconClassName = createUniqueClassName('collapse-menu');

const buttonStyles = css`
  position: absolute;
  bottom: ${spacing[3]}px;
  right: -${spacing[3]}px;
  width: ${spacing[5]}px;
  height: ${spacing[5]}px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;

  color: ${palette.green.dark2};
  box-shadow: 0 3px 4px ${transparentize(0.9, palette.black)};
  background-color: ${palette.white};
  border: 1px solid ${palette.gray.light2};
  cursor: pointer;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: color, border-color, box-shadow;

  &:hover {
    background-color: ${palette.gray.light3};
    box-shadow: 0 2px 2px ${transparentize(0.8, palette.black)};

    .${iconClassName} {
      transform: translate3d(-2px, 0, 0);
    }
  }

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

const buttonFocusStyles = css`
  &:focus {
    color: ${palette.blue.base};
    border-color: transparent;
    box-shadow: 0 3px 4px ${transparentize(0.9, palette.black)},
      // Focus ring
      0 0 0 2px ${palette.white},
      0 0 0 4px ${palette.blue.light1};
  }
`;

const buttonCollapsedStyles = css`
  &:hover {
    .${iconClassName} {
      transform: translate3d(2px, 0, 0);
    }
  }
`;

const iconWrapper = css`
  transition: transform 80ms ease-in-out;
  display: inline-block;
  height: 16px;

  ${prefersReducedMotion(`
    transition-property: unset;
  `)}
`;

const keyboardShortcut = css`
  background-color: ${palette.gray.dark2};
  color: ${palette.white};
  border-color: ${palette.gray.dark1};
  padding: 0 3px 2px 2px;
  box-shadow: 0 3px 3px -2px rgba(113, 39, 39, 0.3), 0 0 2px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.15);
  line-height: 1em;
  margin-left: ${spacing[2]}px;
`;

interface CollapseToggleProps extends HTMLElementProps<'button'> {
  collapsed?: boolean;
  hideTooltip?: boolean;
}

function CollapseToggle({
  className,
  collapsed,
  hideTooltip,
  ...rest
}: CollapseToggleProps) {
  const { usingKeyboard } = useUsingKeyboardContext();
  const { navId } = useSideNavContext();

  const Chevron = collapsed ? ChevronRight : ChevronLeft;

  return (
    <Tooltip
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
            buttonStyles,
            {
              [buttonFocusStyles]: usingKeyboard,
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
        {/* TODO: When InlinkeKeyCode accepts `darkMode`, pass that prop instead of custom styles in className */}
        <InlineKeyCode className={keyboardShortcut}>[</InlineKeyCode>
      </span>
    </Tooltip>
  );
}

export default CollapseToggle;
