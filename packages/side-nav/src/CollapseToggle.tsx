import React from 'react';
import { transparentize } from 'polished';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing, fontFamilies } from '@leafygreen-ui/tokens';
import Tooltip from '@leafygreen-ui/tooltip';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import ChevronLeft from '@leafygreen-ui/icon/dist/ChevronLeft';
import { useSideNavContext } from './SideNavContext';

const buttonDataProp = createDataProp('button');

const buttonStyles = css`
  transition: all 150ms ease-in-out;
  position: absolute;
  bottom: ${spacing[3]}px;
  right: -${spacing[3]}px;
  width: ${spacing[5]}px;
  height: ${spacing[5]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  color: ${uiColors.green.dark2};
  box-shadow: 0 3px 4px ${transparentize(0.9, uiColors.black)};
  background-color: ${uiColors.white};
  border: 1px solid ${uiColors.gray.light2};
  cursor: pointer;

  &:hover {
    background-color: ${uiColors.gray.light3};
    box-shadow: 0 2px 2px ${transparentize(0.8, uiColors.black)};
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
    color: ${uiColors.blue.base};
    border-color: transparent;
    box-shadow: 0 3px 4px ${transparentize(0.9, uiColors.black)},
      0 0 0 3px ${uiColors.blue.light1};
  }
`;

const iconWrapper = css`
  transition: transform 80ms ease-in-out;
  display: inline-block;
  height: 16px;

  ${buttonDataProp.selector}:hover & {
    transform: translate3d(-2px, 0, 0);
  }

  ${prefersReducedMotion(`
		${buttonDataProp.selector}:hover & {
			transform: translate3d(0, 0, 0);
		}
	`)}
`;

const iconWrapperCollapsed = css`
  ${buttonDataProp.selector}:hover & {
    transform: translate3d(2px, 0, 0);
  }

  ${prefersReducedMotion(`
		${buttonDataProp.selector}:hover & {
			transform: translate3d(0, 0, 0);
		}
	`)}
`;

const keyboardShortcut = css`
  font-family: ${fontFamilies.code};
  background-color: ${uiColors.gray.dark2};
  padding: 0 3px 2px 2px;
  border-radius: 2px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.3), 0 0 2px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.15);
  border: 1px solid ${uiColors.gray.dark1};
  line-height: 1em;
  color: ${uiColors.white};
  margin-left: ${spacing[2]}px;
`;

type DetailedElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

interface CollapseToggleProps extends DetailedElementProps<HTMLButtonElement> {
  collapsed?: boolean;
  hideTooltip?: boolean;
}

function CollapseToggle({
  className,
  collapsed,
  hideTooltip,
  ...rest
}: CollapseToggleProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const { navId } = useSideNavContext();

  const Chevron = collapsed ? ChevronRight : ChevronLeft;

  return (
    <Tooltip
      darkMode
      align="right"
      justify="middle"
      open={typeof hideTooltip === 'boolean' ? !hideTooltip : undefined}
      trigger={
        <button
          aria-label="Collapse navigation"
          aria-controls={navId}
          aria-expanded={!collapsed}
          className={cx(
            buttonStyles,
            { [buttonFocusStyles]: showFocus },
            className,
          )}
          {...buttonDataProp.prop}
          {...rest}
        >
          <div
            className={cx(iconWrapper, {
              [iconWrapperCollapsed]: collapsed,
            })}
          >
            <Chevron role="presentation" />
          </div>
        </button>
      }
    >
      <span aria-hidden>
        {collapsed ? 'Expand' : 'Collapse'}
        <kbd className={keyboardShortcut}>[</kbd>
      </span>
    </Tooltip>
  );
}

export default CollapseToggle;
