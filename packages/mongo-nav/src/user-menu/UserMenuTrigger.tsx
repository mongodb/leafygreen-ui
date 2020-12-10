import React, { useRef } from 'react';
import CaretUpIcon from '@leafygreen-ui/icon/dist/CaretUp';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { breakpoints, mq } from '../breakpoints';
import { NavElement } from '../types';
import { useOnElementClick } from '../on-element-click-provider';

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

  ${mq({
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

const interactionRingBorderRadius = '50px';

const openBaseButtonStyle = css`
  background-color: ${uiColors.gray.light2};
  color: ${uiColors.gray.dark3};
  font-weight: bold;
`;

const menuNameStyle = css`
  margin-left: 2px;
  max-width: 162px;

  ${mq({
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
  active?: boolean;
  children?: React.ReactElement;
}

const UserMenuTrigger = React.forwardRef<HTMLDivElement, UserMenuTriggerProps>(
  ({ open, name, setOpen, children, ...rest }: UserMenuTriggerProps, ref) => {
    const onElementClick = useOnElementClick();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const viewportSize = useViewportSize();

    const isTablet = viewportSize
      ? viewportSize.width < breakpoints.medium
      : false;

    // Show first initial on tablets and smaller, otherwise use the full name passed in
    const displayName = isTablet ? name.split('')[0] : name;

    const activeWidth = css`
      width: ${buttonRef?.current?.getBoundingClientRect().width}px;
    `;

    return (
      <div ref={ref}>
        <InteractionRing
          borderRadius={interactionRingBorderRadius}
          forceState={{ hovered: open ? false : undefined }}
        >
          <button
            {...rest}
            {...buttonDataProp.prop}
            ref={buttonRef}
            className={cx(baseButtonStyles, {
              [openBaseButtonStyle]: open,
              [activeWidth]: open,
            })}
            onClick={onElementClick(NavElement.UserMenuTrigger, event => {
              setOpen(curr => !curr);
              event.stopPropagation();
            })}
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

            {open ? (
              <CaretUpIcon {...iconDataProp.prop} className={openIconStyle} />
            ) : (
              <CaretDownIcon
                {...iconDataProp.prop}
                className={closedIconStyle}
              />
            )}
            {children}
          </button>
        </InteractionRing>
      </div>
    );
  },
);

UserMenuTrigger.displayName = 'UserMenuTrigger';

export default UserMenuTrigger;
