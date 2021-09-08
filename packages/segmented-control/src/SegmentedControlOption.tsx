import React, { useRef } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { Size, Mode } from './types';
import Box from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Styles
 */

// The border color is slightly different from the base gray for accessibility reasons
const checkedSelector = '[data-checked="true"]';
const uncheckedSelector = '[data-checked="false"]';

const optionStyle = ({
  mode = 'light',
  size = 'default',
}: {
  mode: Mode;
  size: Size;
}) => css`
  ${size === 'small' &&
  css`
    --font-size: 12px;
    --line-height: 16px;
    --inline-padding: 3px;
    --text-transform: uppercase;
    --font-weight: bold;
    --divider-height: 12px;
  `}
  ${size === 'default' &&
  css`
    --font-size: 14px;
    --line-height: 24px;
    --inline-padding: 3px;
    --text-transform: none;
    --font-weight: normal;
    --divider-height: 18px;
  `}
  ${size === 'large' &&
  css`
    --font-size: 16px;
    --line-height: 28px;
    --inline-padding: 4px;
    --text-transform: none;
    --font-weight: normal;
    --divider-height: 20px;
  `}

  ${mode === 'light' &&
  css`
    --base-text-color: ${uiColors.gray.dark1};
    --base-background-color: transparent;
    --base-shadow-color: transparent;
    --hover-text-color: ${uiColors.gray.dark3};
    --hover-background-color: ${uiColors.white};
    --active-text-color: ${uiColors.gray.dark3};
    --disabled-text-color: ${uiColors.gray.light1};
  `}
  ${mode === 'dark' &&
  css`
    --base-text-color: ${uiColors.gray.light1};
    --base-background-color: transparent;
    --base-shadow-color: transparent;
    --hover-text-color: ${uiColors.gray.light2};
    --hover-background-color: ${uiColors.gray.dark2};
    --active-text-color: ${uiColors.white};
    --disabled-text-color: ${uiColors.gray.dark1};
  `}

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--inline-padding) 12px;
  border-radius: 4px;
  text-align: center;
  font-size: var(--font-size);
  line-height: var(--line-height);
  text-transform: var(--text-transform, none);
  font-weight: var(--font-weight);
  color: var(--base-text-color); // color
  background-color: var(--base-background-color); // color
  box-shadow: 0px 1px 2px var(--base-shadow-color); // color
  cursor: pointer;
  transition: all 100ms ease-in-out;
  z-index: 1;
  text-decoration: none;

  &:hover {
    color: var(--hover-text-color);

    &:after {
      background-color: var(--hover-background-color);
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
    color: var(--active-text-color); // color
  }

  &[data-disabled='true'] {
    color: var(--disabled-text-color); // color
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

  /* 
   * Adds the divider line to unselected segments 
   */
  &:before {
    content: '';
    position: absolute;
    height: var(--divider-height);
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
          background-color: ${uiColors.gray.light1}; // color
        }
      }
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

const boxStyle = css`
  color: inherit;
  cursor: inherit;
  text-decoration: none;
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
  [key: string]: any;
}

/**
 * Component
 */
const SegmentedControlOption = React.forwardRef<
  HTMLLabelElement,
  SegmentedControlOptionProps
>(
  (
    {
      value,
      children,
      disabled = false,
      as = React.Fragment,
      className,
      id,
      size = 'default',
      darkMode = false,
      _onChange: onChange,
      _name: name,
      _checked: checked,
      ...rest
    }: SegmentedControlOptionProps,
    forwardedRef,
  ) => {
    const mode = darkMode ? 'dark' : 'light';
    const labelId = `${id}-label`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      // If a user changes the value with the keyboard,
      // the click event on an anchor wrapper will not fire,
      // so we programatically navigate here
      if (as === 'a' && rest.href) {
        window.location.assign(rest.href);
      }
    };

    return (
      <Box as={as} className={boxStyle} tabIndex="-1" {...rest}>
        <label
          htmlFor={id}
          id={labelId}
          className={cx(optionStyle({ mode, size }), className)}
          data-disabled={`${disabled}`}
          data-checked={`${checked}`}
          ref={forwardedRef}
        >
          <span className={labelStyle}>{children}</span>
          <input
            type="radio"
            name={name}
            value={value}
            id={id}
            disabled={disabled}
            onChange={handleChange}
            checked={checked}
            className={radioInputStyle}
            aria-labelledby={labelId}
          />
        </label>
      </Box>
    );
  },
);

SegmentedControlOption.displayName = 'SegmentedControlOption';

export default SegmentedControlOption;

/**
 * Basic:
 *
 * label
 *  input
 *  span
 *    text
 *
 * Link:
 *
 * label
 *  input
 *  a/Link
 *    span
 *      text
 */
