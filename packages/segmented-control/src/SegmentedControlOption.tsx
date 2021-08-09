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
  transition: all 100ms ease-in-out;

  // TODO - Make selected pill animate over

  /* 
   * Adds the divider line to unselected segments 
   */

  &:before {
    content: '';
    position: absolute;
    height: 24px;
    width: 1px;
    left: -4px;
    background-color: transparent;
    font-weight: normal;
    transition: all 100ms ease-in-out;
  }

  &${uncheckedSelector} {
    &:not(:first-child) {
      /* &:not(:hover) { */
      &:not(${checkedSelector} + ${uncheckedSelector}) {
        // no divider to the left of the checked segment
        /* &:not(:hover + ${uncheckedSelector}) { */
        // no divider to the left of hovered segments
        &:before {
          background-color: ${uiColors.gray.light1};
        }
        /* } */
      }
      /* } */
    }
  }

  // TODO Try white highlight on hover, but smaller than selected segment

  &:hover {
    /* border-color: ${borderColor}; */
    color: ${uiColors.gray.dark3};
    background-color: ${uiColors.white};
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

// Internal “Private” Props
// _name - the name of the segmented control. Used to group the HTML radio inputs
// _checked - whether the option is checked. Defined by the parent
// _onChange - the onChange handler passed in from the SegmentedControl
//
// ❓ TODO: Decide how darkMode & size are handled internally.
// Is it handled purely by CSS variables, passed in as a private prop,
// or a react context? My recommendation is CSS vars.
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
