import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Size, Mode } from './types';

/**
 * Styles
 */

const checkedSelector = '[data-checked="true"]';
const uncheckedSelector = '[data-checked="false"]';

const optionStyle = ({
  mode = 'light',
  size = 'default',
}: {
  mode: Mode;
  size: Size;
}) => {
  const vars: {
    [key: string]: string;
  } = {};

  if (size == 'small') {
    vars.fontSize = '12px';
    vars.lineHeight = '16px';
    vars.inlinePadding = '3px';
    vars.textTransform = 'uppercase';
    vars.fontWeight = 'bold';
    vars.dividerHeight = '12px';
  } else if (size == 'large') {
    vars.fontSize = '16px';
    vars.lineHeight = '28px';
    vars.inlinePadding = '4px';
    vars.textTransform = 'none';
    vars.fontWeight = 'normal';
    vars.dividerHeight = '20px';
  } else {
    vars.fontSize = '14px';
    vars.lineHeight = '24px';
    vars.inlinePadding = '3px';
    vars.textTransform = 'none';
    vars.fontWeight = 'normal';
    vars.dividerHeight = '18px';
  }

  if (mode == 'dark') {
    vars.baseTextColor = uiColors.gray.light1;
    vars.baseBackgroundColor = 'transparent';
    vars.baseShadowColor = 'transparent';
    vars.hoverTextColor = uiColors.gray.light2;
    vars.hoverBackgroundColor = uiColors.gray.dark2;
    vars.activeTextColor = uiColors.white;
    vars.disabledTextColor = uiColors.gray.dark1;
  } else {
    vars.baseTextColor = uiColors.gray.dark1;
    vars.baseBackgroundColor = 'transparent';
    vars.baseShadowColor = 'transparent';
    vars.hoverTextColor = uiColors.gray.dark3;
    vars.hoverBackgroundColor = uiColors.white;
    vars.activeTextColor = uiColors.gray.dark3;
    vars.disabledTextColor = uiColors.gray.light1;
  }

  return css`
    // Variables that are used in child elements get assigned to custom props
    // Otherwise, we simply assign the property to the interpolated JS variable
    --font-size: ${vars.fontSize}

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${vars.inlinePadding} 12px;
    border-radius: 4px;
    text-align: center;
    font-size: var(--font-size);
    line-height: ${vars.lineHeight};
    text-transform: ${vars.textTransform};
    font-weight: ${vars.fontWeight};
    color: ${vars.baseTextColor};
    background-color: ${vars.baseBackgroundColor};
    box-shadow: 0px 1px 2px ${vars.baseShadowColor};
    cursor: pointer;
    transition: all 100ms ease-in-out;
    z-index: 1;

    &:hover {
      color: ${vars.hoverTextColor};

      &:after {
        background-color: ${vars.hoverBackgroundColor};
      }

      &${checkedSelector}, &[data-disabled='true'] {
        border-color: transparent;
        background-color: transparent;

        &:after {
          background-color: transparent;
        }
      }
    }

    &${checkedSelector} {
      color: ${vars.activeTextColor};
    }

    &[data-disabled='true'] {
      color: ${vars.disabledTextColor};
      cursor: not-allowed;
    }

    // Hover indicator
    &:after {
      content: '';
      position: absolute;
      height: calc(100% - 2px);
      width: 100%;
      top: 1px;
      left: 0;
      background-color: transparent;
      z-index: -1;
      border-radius: inherit;
      transition: all 100ms ease-in-out;
    }

    // Adds the divider line to unselected segments 
    &:before {
      content: '';
      position: absolute;
      height: ${vars.dividerHeight};
      width: 1px;
      left: calc(0px - (var(--segment-gap, 1px) + 1px) / 2);
      background-color: transparent;
      transition: all 100ms ease-in-out;
    }

    &${uncheckedSelector} {
      &:not(:first-child) {
        &:not(${checkedSelector} + ${uncheckedSelector}) {
          // no divider to the left of the checked segment
          &:before {
            background-color: ${uiColors.gray.light1}; 
          }
        }
      }
    }
  `;
};

const radioInputStyle = css`
  height: 0;
  width: 0;
  margin: 0;
  opacity: 0;
  pointer-events: none;
`;

const labelStyle = css`
  display: inline-flex;
  align-items: center;
  gap: calc(var(--font-size) / 2);
  z-index: 3;
`;

/**
 * Types
 */

// Internal “Private” Props
// _name - the name of the segmented control. Used to group the HTML radio inputs
// _checked - whether the option is checked. Defined by the parent
// _onChange - the onChange handler passed in from the SegmentedControl
export interface SegmentedControlOptionProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  as?: any;
  className?: string;
  id?: string;
  size?: Size;
  darkMode?: boolean;
  _name?: string;
  _checked?: boolean;
  _onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Component
 */
const SegmentedControlOption = React.forwardRef<
  HTMLLabelElement,
  SegmentedControlOptionProps
>(function SegmentedControlOption(
  {
    value,
    children,
    disabled = false,
    as = 'label', // TODO
    className,
    id,
    size = 'default',
    darkMode = false,
    _onChange: onChange,
    _name: name,
    _checked: checked,
  }: SegmentedControlOptionProps,
  forwardedRef,
) {
  const mode = darkMode ? 'dark' : 'light';

  return (
    <label
      htmlFor={id}
      className={cx(optionStyle({ mode, size }), className)}
      data-disabled={`${disabled}`}
      data-checked={`${checked}`}
      ref={forwardedRef}
    >
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        className={radioInputStyle}
      />
      <span className={labelStyle}>{children}</span>
    </label>
  );
});

SegmentedControlOption.displayName = 'SegmentedControlOption';

export default SegmentedControlOption;
