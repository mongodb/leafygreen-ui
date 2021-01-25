import React, { useCallback, useContext, useEffect, useState } from 'react';
import { transparentize } from 'polished';
import { css, cx } from '@leafygreen-ui/emotion';
import ChevronLeftIcon from '@leafygreen-ui/icon/dist/ChevronLeft';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import { usePrevious } from '@leafygreen-ui/hooks';
import IconButton from '@leafygreen-ui/icon-button';
import { keyMap } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import Tooltip, { Align, Justify, TriggerEvent } from '@leafygreen-ui/tooltip';
import { SideNavContext } from './contexts';
import { transitionDurationMilliseconds } from './utils';

const buttonStyle = css`
  position: absolute;
  top: 16px;
  right: -17px;
  height: 32px;
  width: 32px;
  z-index: 1;
  color: ${uiColors.green.dark2};
  background-color: ${uiColors.gray.light3};
  border: 1px solid ${uiColors.gray.light2};
  box-shadow: 0 3px 4px ${transparentize(0.88, uiColors.black)};
  cursor: pointer;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;

  &:hover,
  &:focus {
    border-width: 0;
  }
`;

const navCollapsedHoveredButtonStyle = css`
  right: -16px; // Button shouldn't move when nav border is removed
`;

const buttonIconStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transition: opacity ${transitionDurationMilliseconds}ms ease-in-out;
`;

const inactiveButtonIconStyle = css`
  opacity: 0;
  visibility: hidden;
`;

interface Props {
  navId: string;
  onTrigger: () => void;
  onMouseOver?: React.MouseEventHandler;
}

export default function CollapseButton({
  navId,
  onTrigger,
  onMouseOver,
}: Props) {
  const { collapsed, hovered } = useContext(SideNavContext);

  const [, forceRerender] = useState(false);

  const wasCollapsed = usePrevious(collapsed);

  const shouldHideTooltip =
    wasCollapsed !== undefined && collapsed !== wasCollapsed;

  useEffect(() => {
    if (shouldHideTooltip) {
      // Re-enable tooltip only after the collapse transition is finished
      const id = setTimeout(() => {
        forceRerender(value => !value);
      }, transitionDurationMilliseconds);

      return () => clearTimeout(id);
    }
  }, [shouldHideTooltip]);

  const onKeyDown: React.KeyboardEventHandler = useCallback(
    event => {
      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      if (event.keyCode === keyMap.Space) {
        event.preventDefault();
        event.stopPropagation();

        onTrigger();
      }
    },
    [onTrigger],
  );

  const description = `${collapsed ? 'Expand' : 'Collapse'} sidebar`;

  const shouldRenderCollapsedState = collapsed && !hovered;

  let content = (
    <IconButton
      className={cx(buttonStyle, {
        [navCollapsedHoveredButtonStyle]: collapsed && hovered,
      })}
      aria-label={description}
      aria-controls={navId}
      aria-expanded={!shouldRenderCollapsedState}
      onClick={onTrigger}
      onKeyDown={onKeyDown}
      onMouseOver={onMouseOver}
    >
      <ChevronLeftIcon
        className={cx(buttonIconStyle, {
          [inactiveButtonIconStyle]: collapsed,
        })}
      />
      <ChevronRightIcon
        className={cx(buttonIconStyle, {
          [inactiveButtonIconStyle]: !collapsed,
        })}
      />
    </IconButton>
  );

  if (!shouldHideTooltip) {
    content = (
      <Tooltip
        darkMode={true}
        align={Align.Right}
        justify={Justify.Middle}
        triggerEvent={TriggerEvent.Hover}
        trigger={content}
        onClick={onTrigger}
      >
        {description} ( [ )
      </Tooltip>
    );
  }

  return content;
}

CollapseButton.displayName = 'CollapseButton';
