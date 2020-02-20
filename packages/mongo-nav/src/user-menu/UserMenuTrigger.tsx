import React, { useRef } from 'react';
import Icon from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import {useViewportSize} from '@leafygreen-ui/hooks';
import {breakpoints, facepaint} from '../breakpoints'

const buttonDataProp = createDataProp('button-data-prop');
const iconDataProp = createDataProp('icon-data-prop');

const interactionRing = css`
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
  border-radius: 50px;
  transform: scale(0.9, 0.8);
  transition: transform 150ms ease-in-out;
  background-color: ${uiColors.gray.light2};
  ${buttonDataProp.selector}:hover ~ & {
    transform: scale(1);
  }
  ${buttonDataProp.selector}:active ~ & {
    transform: scale(1);
  }
`;

const interactionRingFocusState = css`
  ${buttonDataProp.selector}:focus ~ & {
    background-color: #9dd0e7;
    transform: scale(1);
  }
`;

const baseButtonStyles = css`
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  position: relative;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid ${uiColors.gray.light2};
  background-color: ${uiColors.white};
  border-radius: 100px;
  transition: background 150ms ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${uiColors.gray.dark2};
  font-size: 12px;
  cursor: pointer;
  z-index: 1;

  ${facepaint({
    height: ['30px', '36px', '36px'],
  })}

  &:active {
    color: ${uiColors.gray.dark2};

    ${iconDataProp.selector} {
      color: ${uiColors.gray.dark1};
    }
  }

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

const openBaseButtonStyle = css`
  background-color: ${uiColors.gray.light2};
  color: ${uiColors.gray.dark3};
  font-weight: bold;
`;

const menuNameStyle = css`
  margin-left: 2px;
  max-width: 162px;

  ${facepaint({
    marginRight: ['8px', '8px', '24px'],
  })}
`;

const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const closedIconStyle = css`
  transition: color 200ms ease-in-out;
  color: ${uiColors.gray.base};
`;

const openIconStyle = css`
  color: ${uiColors.gray.dark2};
`;

interface UserMenuTriggerProps {
  name: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserMenuTrigger({
  open,
  name,
  setOpen,
}: UserMenuTriggerProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {width: viewportWidth} = useViewportSize()
  const isTablet = viewportWidth < breakpoints.medium;

  // Show first initial on tablets and smaller, otherwise use the full name passed in
  const displayName = isTablet ? name.split('')[0] : name

  const activeWidth = css`
    width: ${buttonRef?.current?.getBoundingClientRect().width}px;
  `;

  return (
    <>
      <button
        {...buttonDataProp.prop}
        ref={buttonRef}
        className={cx(baseButtonStyles, {
          [openBaseButtonStyle]: open,
          [activeWidth]: open,
        })}
        onClick={() => setOpen(curr => !curr)}
      >
        <span
          className={cx(menuNameStyle, truncate, {
            [css`
              margin-right: unset;
            `]: open,
          })}
        >
          {displayName}
        </span>

        <Icon
          {...iconDataProp.prop}
          glyph={open ? 'CaretUp' : 'CaretDown'}
          className={open ? openIconStyle : closedIconStyle}
        />
      </button>
      <div
        className={cx(interactionRing, {
          [interactionRingFocusState]: showFocus,
        })}
      />
    </>
  );
}
