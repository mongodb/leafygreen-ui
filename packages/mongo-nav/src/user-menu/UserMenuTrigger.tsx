import React, { useRef } from 'react';
import Icon from '@leafygreen-ui/icon';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { breakpoints, facepaint } from '../breakpoints';
import { NavElement } from '../types';
import InteractionRingWrapper from '../helpers/InteractionRingWrapper';
import { useOnElementClick } from '../on-element-click-provider/index';

const buttonDataProp = createDataProp('button-data-prop');
const iconDataProp = createDataProp('icon-data-prop');

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

const ringClassName = css`
  border-radius: 50px;
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
  children?: React.ReactElement;
}

export default function UserMenuTrigger({
  open,
  name,
  setOpen,
  children,
  ...rest
}: UserMenuTriggerProps) {
  const onElementClick = useOnElementClick();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { width: viewportWidth } = useViewportSize();
  const isTablet = viewportWidth < breakpoints.medium;

  // Show first initial on tablets and smaller, otherwise use the full name passed in
  const displayName = isTablet ? name.split('')[0] : name;

  const activeWidth = css`
    width: ${buttonRef?.current?.getBoundingClientRect().width}px;
  `;

  return (
    <InteractionRingWrapper
      ringClassName={ringClassName}
      selector={buttonDataProp.selector}
    >
      <button
        {...rest}
        {...buttonDataProp.prop}
        ref={buttonRef}
        className={cx(baseButtonStyles, {
          [openBaseButtonStyle]: open,
          [activeWidth]: open,
        })}
        onClick={e => {
          onElementClick(NavElement.UserMenuTrigger, e);
          setOpen(curr => !curr);
        }}
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
        {children}
      </button>
    </InteractionRingWrapper>
  );
}
