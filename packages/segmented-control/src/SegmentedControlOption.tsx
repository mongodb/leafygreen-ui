import React, { useRef } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import Box from '@leafygreen-ui/box';
import { Size, Mode } from './types';
import { useEffect } from 'react';

/**
 * Styles
 */
const optionStyle = ({
  mode = 'light',
  size = 'default',
}: {
  mode: Mode;
  size: Size;
  index: number;
}) => css`
  --padding-inline: 12px;

  ${size === 'small' &&
  css`
    --font-size: 12px;
    --line-height: 16px;
    --padding-block: 3px;
    --text-transform: uppercase;
    --font-weight: bold;
    --divider-height: 12px;
  `}
  ${size === 'default' &&
  css`
    --font-size: 14px;
    --line-height: 24px;
    --padding-block: 3px;
    --text-transform: none;
    --font-weight: normal;
    --divider-height: 18px;
  `}
  ${size === 'large' &&
  css`
    --font-size: 16px;
    --line-height: 28px;
    --padding-block: 4px;
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
  width: 100%;
  align-items: center;
  justify-content: center;

  --divider-background-color: ${uiColors.gray.light1};

  &:first-child,
  &[data-lg-checked='true'],
  &[data-lg-checked='true'] + [data-lg-checked='false'] {
    --divider-background-color: transparent;
  }

  /* 
   * Adds the divider line to unselected segments 
   */
  &:before {
    --divider-width: 1px;
    content: '';
    position: absolute;
    height: var(--divider-height);
    width: var(--divider-width);
    left: calc(0px - (var(--segment-gap) + var(--divider-width)) / 2);
    top: calc(
      (var(--line-height) + var(--padding-block) * 2 - var(--divider-height)) /
        2
    );
    transition: background-color 100ms ease-in-out;
    background-color: var(--divider-background-color);
  }
`;

const interactionRingStyle = css`
  width: 100%;
  z-index: 1;

  /* disable the interaction ring hover state */
  &:hover > [data-leafygreen-ui='interaction-ring'] {
    box-shadow: none;
  }
`;

const boxStyle = css`
  text-decoration: none;
`;

const buttonStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  padding: var(--padding-block) var(--padding-inline);
  background-color: var(--base-background-color);
  border-radius: 4px;
  text-align: center;
  font-size: var(--font-size);
  line-height: var(--line-height);
  text-transform: var(--text-transform, none);
  font-weight: var(--font-weight);
  color: var(--base-text-color);
  box-shadow: 0px 1px 2px var(--base-shadow-color);
  cursor: pointer;
  transition: all 100ms ease-in-out;
  text-decoration: none;
  outline: none;
  border: 2px solid transparent;
  /* margin-inline: -1px; */

  &:hover {
    color: var(--hover-text-color);
    background-color: var(--hover-background-color);
    border-color: var(--background-color);

    &[aria-selected='true'],
    &:disabled {
      border-color: transparent;
      background-color: transparent;
    }
  }

  &[aria-selected='true'] {
    color: var(--active-text-color);
  }

  &:disabled {
    color: var(--disabled-text-color);
    cursor: not-allowed;
  }
`;

const labelStyle = css`
  display: inline-flex;
  align-items: center;
  gap: calc(var(--font-size) / 2);
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
  _focused?: boolean;
  _index: number;
  _followFocus?: boolean;
  'aria-controls'?: string;
  _onClick?: (value: string) => void;
  [key: string]: any;
}

/**
 * Component
 */
const SegmentedControlOption = React.forwardRef<
  HTMLDivElement,
  SegmentedControlOptionProps
>(
  (
    {
      value,
      children,
      disabled = false,
      as,
      className,
      id,
      size = 'default',
      darkMode = false,
      _onClick,
      _name: name,
      _checked: checked,
      _focused: focused,
      _index: index,
      _followFocus: followFocus,
      'aria-controls': ariaControls,
      ...rest
    }: SegmentedControlOptionProps,
    forwardedRef,
  ) => {
    const mode = darkMode ? 'dark' : 'light';

    const onClick = () => {
      _onClick?.(value);
    };

    const didComponentMount = useRef(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
      if (didComponentMount.current) {
        if (focused) {
          // Respond in the DOM when this option is given focus
          buttonRef?.current?.focus();

          if (followFocus) {
            // Used to ensure native click default events fire when using keyboard navigation
            buttonRef?.current?.click();
          }
        }
      }
      didComponentMount.current = true;
    }, [focused, followFocus, forwardedRef]);

    return (
      <div
        className={cx(optionStyle({ mode, size, index }), className)}
        ref={forwardedRef}
        data-lg-checked={checked}
      >
        <InteractionRing darkMode={darkMode} className={interactionRingStyle}>
          <Box as={as} tabIndex={-1} className={boxStyle} {...rest}>
            <button
              role="tab"
              id={id}
              tabIndex={focused ? 0 : -1}
              aria-selected={checked}
              aria-controls={ariaControls}
              disabled={disabled}
              className={buttonStyle}
              ref={buttonRef}
              onClick={onClick}
            >
              <span className={labelStyle}>{children}</span>
            </button>
          </Box>
        </InteractionRing>
      </div>
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
