import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

/**
 * Styles
 */

// The border color is slightly different from the base gray for accessibility reasons
const borderColor = '#869499';

const checkedSelector = '[data-checked="true"]';
const uncheckedSelector = '[data-checked="false"]';

const wrapperStyle = (checked: boolean) => css`
  position: relative;
  display: inline-block;
  padding: 4px 12px;
  line-height: 24px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  text-align: center;
  color: ${checked ? uiColors.gray.dark3 : uiColors.gray.dark1};
  background-color: ${checked ? uiColors.gray.light2 : 'transparent'};
  border-color: ${checked ? borderColor : 'transparent'};
  cursor: pointer;
  box-shadow: 0px 1px 2px ${checked ? 'rgba(6,22,33,0.3)' : 'transparent'};

  /* 
   * Adds the divider line to unselected segments 
   */
  &${uncheckedSelector} {
    &:not(:first-child) {
      &:not(:hover) {
        &:not(${checkedSelector} + ${uncheckedSelector}) {
          // no divider to the left of the checked segment
          &:not(:hover + ${uncheckedSelector}) {
            // no divider to the left of hovered segments
            &:before {
              content: '';
              position: absolute;
              height: 24px;
              width: 1px;
              left: -1px;
              background-color: ${uiColors.gray.light1};
            }
          }
        }
      }
    }
  }

  &:hover {
    border-color: ${borderColor};
  }

  &[data-disabled='true'] {
    color: ${uiColors.gray.light1};
    cursor: not-allowed;

    &:hover {
      border-color: transparent;
    }
  }
`;

const radioInputStyle = css`
  height: 0;
  width: 0;
  margin: 0;
  opacity: 0;
  pointer-events: none;
`;

const labelStyle = css`
  cursor: inherit;
`;

/**
 * Types
 */

export interface SegmentedControlOptionProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  as?: any;
  className?: string;
  id?: string;
  _name?: string;
  _checked?: boolean;
  _onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Component
 */
const SegmentedControlOption = React.forwardRef(function SegmentedControlOption(
  {
    value,
    children,
    disabled = false,
    as,
    className,
    id,
    _onChange: onChange,
    _name: name,
    _checked: checked,
  }: SegmentedControlOptionProps,
  forwardedRef,
) {
  return (
    <label
      htmlFor={id}
      className={cx(wrapperStyle(!!checked), className)}
      data-disabled={`${disabled}`}
      data-checked={`${checked}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        ref={forwardedRef}
        className={cx(radioInputStyle)}
      ></input>

      <span className={cx(labelStyle)}>{children}</span>
    </label>
  );
});

export default SegmentedControlOption;
