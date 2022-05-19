import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import {
  createDataProp,
  HTMLElementProps,
  Either,
  DarkModeProps,
} from '@leafygreen-ui/lib';
import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { uiColors, palette } from '@leafygreen-ui/palette';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';

export const Size = {
  Default: 'default',
  Small: 'small',
  XSmall: 'xsmall',
} as const;

export type Size = typeof Size[keyof typeof Size];

export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

const toggleButton = createDataProp('toggle-button');

const buttonSelectors = {
  checked: `${toggleButton.selector}[aria-checked="true"]`,
  unchecked: `${toggleButton.selector}[aria-checked="false"]`,
  disabled: `${toggleButton.selector}:disabled`,
};

const sliderSelector = {
  checked: `${buttonSelectors.checked} > &`,
  unchecked: `${buttonSelectors.unchecked} > &`,
  disabled: `${buttonSelectors.disabled} > &`,
};

const checkmarkSelector = {
  checked: `${buttonSelectors.checked}:not(:disabled) &`,
  unchecked: `${buttonSelectors.unchecked}:not(:disabled) &`,
  disabledChecked: `${buttonSelectors.checked}:disabled &`,
  disabledUnchecked: `${buttonSelectors.unchecked}:disabled &`,
};

const transitionInMS = 150;

const baseSliderStyles = css`
  transition: all ${transitionInMS}ms ease-in-out;
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  ${sliderSelector.disabled} {
    &:before,
    &:after {
      content: none;
    }
  }
`;

const baseButtonStyles = css`
  transition: ${transitionInMS}ms all ease-in-out, 0s background-color linear;
  display: inline-block;
  flex-shrink: 0;
  position: relative;
  padding: 0;
  border-radius: 50px;
  border: 1px solid;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  &[aria-checked='true'] {
    // We set background-color here to avoid a small issue with overflow clipping
    // that makes this look less seamless than it should.
    background-color: ${palette.blue.base};
    border-color: ${palette.blue.base};
    transition-delay: ${transitionInMS}ms;

    &:before {
      transform: scale(1);
      opacity: 1;
    }
  }

  // We're animating this pseudo-element in order to give the toggle groove
  // background an animation in and out.
  &:before {
    content: '';
    transition: ${transitionInMS}ms all ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50px;
    background-color: ${palette.blue.base};
    opacity: 0;
    transform: scale(0.85);
  }

  &:disabled:before {
    opacity: 0;
  }
`;

const baseButtonFocusStyles = css`
  &:focus-visible {
    box-shadow: 0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.blue.light1};
  }
`;

const baseLabelStyle = css`
  transition: all ${transitionInMS}ms ease-in-out;
  position: absolute;
  top: 1px;
  bottom: 0;
  margin: auto;
  height: 11px;
  line-height: 11px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  color: white;
  user-select: none;
`;

const onLabelStyle = css`
  left: 9px;
`;

const offLabelStyle = css`
  right: 6px;
`;

const sizeStyles = {
  [Size.Default]: {
    button: css`
      height: 32px;
      width: 56px;
    `,

    slider: css`
      height: 28px;
      width: 28px;
      left: 1px;

      ${sliderSelector.checked} {
        transform: translate3d(24px, 0, 0);
      }
    `,
  },

  [Size.Small]: {
    button: css`
      height: 22px;
      width: 40px;
    `,

    slider: css`
      height: 18px;
      width: 18px;
      left: 1px;

      ${sliderSelector.checked} {
        transform: translate3d(18px, 0, 0);
      }
    `,
  },

  [Size.XSmall]: {
    button: css`
      height: 14px;
      width: 26px;
    `,

    slider: css`
      height: 12px;
      width: 12px;

      ${sliderSelector.checked} {
        transform: translate3d(12px, 0, 0);
      }
    `,
  },
} as const;

// TODO: Refresh - remove when darkMode is updated
const sizeStylesDarkMode: Record<Size, string> = {
  [Size.Default]: css`
    ${sliderSelector.checked} {
      transform: translate3d(30px, 0, 0);
    }

    ${sliderSelector.disabled} {
      height: 28px;
      width: 28px;
    }
  `,
  [Size.Small]: css`
    height: 20px;
    width: 20px;
    left: 0;

    ${sliderSelector.disabled} {
      height: 18px;
      width: 18px;
      left: 1px;
    }

    ${buttonSelectors.checked}:disabled {
      transform: translate3d(17px, 0, 0);
    }
  `,
  [Size.XSmall]: css`
    ${sliderSelector.disabled} {
      height: 10px;
      width: 10px;
      left: 1px;
    }

    ${buttonSelectors.checked}:disabled {
      transform: translate3d(11px, 0, 0);
    }
  `,
};

const modeStyles = {
  [Mode.Light]: {
    button: css`
      &[aria-checked='false']:not(:disabled) {
        background-color: ${palette.gray.base};
        border-color: ${palette.gray.base};
      }

      &:disabled {
        background-color: ${palette.gray.light2};
        border-color: ${palette.gray.light2};
      }
    `,

    slider: css`
      background-color: ${palette.white};
      display: flex;
      justify-content: center;
      align-items: center;

      ${sliderSelector.disabled} {
        background-color: ${palette.gray.light3};
      }
    `,

    // TODO: Refresh - leaving because of destructuring below
    offLabel: css``,
    onLabel: css``,
  },

  [Mode.Dark]: {
    button: css`
      box-shadow: inset 0 0 10px rgba(6, 22, 33, 0.15);

      &[aria-checked='false']:not(:disabled) {
        background-color: rgba(6, 22, 33, 0.4);
        border-color: rgba(6, 22, 33, 0.1);
      }

      &[aria-checked='true'] {
        background-color: #43b1e5;
        border-color: #2e9ed3;
      }

      &:before {
        background-color: #43b1e5;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
      }

      &:disabled {
        background-color: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.1);
      }
    `,

    slider: css`
      ${sliderSelector.checked} {
        background-color: white;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.25),
          inset 0 -1px 0 #cdcdcd;

        &:before {
          opacity: 0;
        }

        &:after {
          opacity: 1;
        }
      }

      ${sliderSelector.unchecked} {
        background-color: #6f767b;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.25),
          inset 0 -1px 0 ${uiColors.gray.dark2};
      }

      ${sliderSelector.disabled} {
        background-color: rgba(255, 255, 255, 0.15);
        background-image: none;
        box-shadow: none;
      }
    `,

    offLabel: css`
      color: ${uiColors.gray.light1};
    `,

    onLabel: css`
      color: ${uiColors.white};
      text-shadow: 0 0 2px ${uiColors.blue.base};
    `,
  },
} as const;

const baseCheckmarkStyles = css`
  display: flex;
  color: var(--color);
  transition: color ${transitionInMS}ms ease-in-out;
`;

const checkmarkStyles = css`
  ${checkmarkSelector.checked} {
    --color: ${palette.blue.base};
  }

  ${checkmarkSelector.unchecked} {
    --color: ${palette.white};
  }

  ${checkmarkSelector.disabledChecked} {
    --color: ${palette.gray.light1};
  }

  ${checkmarkSelector.disabledUnchecked} {
    --color: ${palette.gray.light3};
  }
`;

const checkmarkSize: Omit<Record<Size, number>, 'xsmall'> = {
  [Size.Default]: 16,
  [Size.Small]: 14,
};

interface BaseToggleProps extends DarkModeProps {
  /**
   * Sets the size of the toggle.
   *
   * default: `'default'`
   */
  size?: Size;

  /**
   * Sets the checked state of the Toggle.
   */
  checked?: boolean;

  /**
   * Disables the Toggle.
   *
   * default: `false`
   */
  disabled?: boolean;

  /**
   * `onChange` fires when the internally-managed `checked` state of the component is updated. Receives the updated checked state of the toggle as its first argument, and the associated mouse event as the second.
   */
  onChange?: (
    checked: boolean,
    mouseEvent: React.MouseEvent<HTMLButtonElement>,
  ) => void;

  /**
   * Adds a className to the outermost element.
   */
  className?: string;
}

type ToggleProps = Either<
  BaseToggleProps &
    Omit<HTMLElementProps<'button', never>, keyof BaseToggleProps>,
  'aria-label' | 'aria-labelledby'
>;

function Toggle({
  className,
  size = Size.Default,
  darkMode = false,
  disabled = false,
  onChange: onChangeProp,
  onClick: onClickProp,
  checked: controlledChecked,
  ...rest
}: ToggleProps) {
  validateAriaLabelProps(rest, Toggle.displayName);

  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const isControlled = typeof controlledChecked === 'boolean';
  const normalizedChecked = controlledChecked ?? checked;

  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      onClickProp?.(e);

      if (isControlled) {
        onChangeProp?.(!controlledChecked, e);
      } else {
        setChecked(curr => {
          const updatedState = !curr;
          onChangeProp?.(updatedState, e);
          return updatedState;
        });
      }
    },
    [isControlled, controlledChecked, onClickProp, onChangeProp],
  );

  const {
    button: buttonModeStyles,
    slider: sliderModeStyles,
    offLabel: offLabelModeStyles,
    onLabel: onLabelModeStyles,
  } = modeStyles[darkMode ? Mode.Dark : Mode.Light];

  const { button: buttonSizeStyles, slider: sliderSizeStyles } =
    sizeStyles[size];

  return (
    <InteractionRing
      darkMode={darkMode}
      disabled={disabled}
      borderRadius="50px"
      focusTargetElement={buttonElement}
      className={className}
      color={darkMode ? undefined : { focused: 'transparent' }} // TODO: Refresh - overriding the focus style for light mode
    >
      <button
        role="switch"
        type="button"
        onClick={onClick}
        aria-checked={normalizedChecked}
        disabled={disabled}
        aria-disabled={disabled}
        ref={setButtonElement}
        className={cx(
          baseButtonStyles,
          {
            [baseButtonFocusStyles]: !darkMode,
          },
          buttonModeStyles,
          buttonSizeStyles,
          {
            [css`
              width: 62px;
            `]: size === Size.Default && darkMode, // TODO: Refresh - remove when darkMode is updated
          },
        )}
        {...toggleButton.prop}
        {...rest}
      >
        {/* TODO: Refresh - remove when darkMode is updated  */}
        {size === 'default' && !disabled && darkMode && (
          <>
            <span
              aria-hidden={true}
              className={cx(baseLabelStyle, onLabelStyle, onLabelModeStyles)}
            >
              On
            </span>

            <span
              aria-hidden={true}
              className={cx(baseLabelStyle, offLabelStyle, offLabelModeStyles)}
            >
              Off
            </span>
          </>
        )}

        <div
          className={cx(
            baseSliderStyles,
            sliderSizeStyles,
            { [sizeStylesDarkMode[size]]: darkMode }, // TODO: Refresh - remove when darkMode is updated
            sliderModeStyles,
          )}
        >
          {/* TODO: Refresh - remove conditional when darkMode is updated  */}
          {size !== Size.XSmall && !darkMode && (
            <CheckmarkIcon
              aria-hidden={true}
              className={cx(baseCheckmarkStyles, checkmarkStyles)}
              size={checkmarkSize[size]}
            />
          )}
        </div>
      </button>
    </InteractionRing>
  );
}

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  size: PropTypes.oneOf(['default', 'small', 'xsmall']),
  darkMode: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default Toggle;
