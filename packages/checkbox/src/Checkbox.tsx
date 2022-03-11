import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { Label } from '@leafygreen-ui/typography';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { LegacyCheck } from './LegacyCheck';
import SvgCheck from './SvgCheck';
import SvgIndeterminate from './SvgIndeterminate';
import { Transition, TransitionStatus } from 'react-transition-group';

const checkboxWrapper = createDataProp('checkbox-wrapper');
const checkboxInput = createDataProp('checkbox-input');

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const checkBoxSize = 14;
const checkAnimationDuration = 100;
const hypotenusePct = 100 * Math.sqrt(2); // ensure the circle reaches the corners of the box
const circleDiffPct = 100 - hypotenusePct;

const containerStyle = css`
  --lg-checkbox-base-duration: 0ms;
  display: grid;
  grid-template-columns: ${checkBoxSize}px max-content;
  grid-template-areas: 'check label' '. description';
  position: relative;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:hover
    > ${checkboxInput.selector}:not([disabled])
    + ${checkboxWrapper.selector} {
    box-shadow: 0 0 0 3px ${palette.gray.light2};
  }
`;

// Toggles on the animation timing
const enableAnimationStyles = css`
  --lg-checkbox-base-duration: ${checkAnimationDuration}ms;
  // Enable var access in pseudo elements
  *:before,
  *:after {
    --lg-checkbox-base-duration: ${checkAnimationDuration}ms;
  }

  @media (prefers-reduced-motion: reduce) {
    --lg-checkbox-base-duration: 0ms;
    *:before,
    *:after {
      --lg-checkbox-base-duration: 0ms;
    }
  }
`;

/** &:disabled won't work and [disabled] isn't a valid property because this isn't an input */
const disabledContainerStyle = css`
  cursor: not-allowed;
`;

const inputStyle = css`
  margin: 0;
  position: absolute;
  height: 0;
  width: 0;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
`;

const inputFocusStyles = css`
  &:focus + ${checkboxWrapper.selector} {
    box-shadow: 0 0 0 2px ${palette.gray.light2},
      0 0 0 4px ${palette.blue.light1};
  }
`;

// TODO: Refresh - remove when darkmode is updated
const inputFocusStylesDarkMode = css`
  &:focus + ${checkboxWrapper.selector}:after {
    content: '';
    bottom: 0;
    left: 3px;
    right: 3px;
    height: 2px;
    position: absolute;
    background-color: #43b1e5;
    border-radius: 2px;
    box-shadow: unset;
  }
`;

const checkWrapperBaseStyle = css`
  --lg-checkbox-border-color: ${palette.gray.dark2};
  grid-area: check;
  position: relative;
  display: flex;
  z-index: 1;
  height: ${checkBoxSize}px;
  width: ${checkBoxSize}px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 2px solid var(--lg-checkbox-border-color);
  overflow: hidden;
  background-color: transparent;
  transition: box-shadow 100ms ease-in-out, background-color 0ms linear,
    border-color 0ms linear;

  // delay border-color out
  transition-delay: 0ms, 0ms, var(--lg-checkbox-base-duration);

  /**
   * The animated background circle
   */
  &:before {
    content: '';
    position: absolute;
    inset: ${circleDiffPct}%;
    z-index: 1;
    border-radius: 100%;
    background-color: ${palette.blue.base};
    transform: scale(0);
    transform-origin: center center;
    transition: transform var(--lg-checkbox-base-duration) ease-in-out;
    transition-delay: calc(var(--lg-checkbox-base-duration) / 2);
  }
`;

const checkWrapperCheckedStyle = css`
  --lg-checkbox-border-color: ${palette.blue.base};
  background-color: ${palette.blue.base};
  // Delay background transition in
  transition-delay: 0ms, var(--lg-checkbox-base-duration), 0ms;

  &:before {
    transform: scale(1);
    // No delay on enter
    transition-delay: 0ms;
  }
`;

const checkWrapperDisabledStyle = css`
  --lg-checkbox-border-color: ${palette.gray.light2};
  background-color: ${palette.gray.light3};
  box-shadow: unset;

  &:before {
    background-color: ${palette.gray.light3};
  }
`;

const checkWrapperCheckedDisabledStyle = css`
  background-color: var(--lg-checkbox-border-color);

  &:before {
    background-color: var(--lg-checkbox-border-color);
  }
`;

const flourishScale = 2;

const flourishStyles = css`
  grid-area: check;
  height: ${checkBoxSize}px;
  width: ${checkBoxSize}px;
  z-index: 0;
  border-radius: 100%;
  background-color: ${palette.blue.dark1};
  opacity: 1;
  transform: scale(0);
  transform-origin: center center;
  transition: 0ms ease-in-out;
  transition-property: transform, opacity;
`;

const flourishStylesChecked = css`
  // only animate flourish on enter
  transition-duration: calc(4 * var(--lg-checkbox-base-duration));
  transform: scale(${flourishScale});
  opacity: 0;
`;

const checkIconStyles = css`
  z-index: 1;
  transform-origin: center;
  transition: transform var(--lg-checkbox-base-duration) ease-in-out;
`;

const checkInStyles = css`
  transform: scale(1) rotate(0);
`;

const checkOutStyles = css`
  transform: scale(0) rotate(-45deg);
`;

const checkIconTransitionStyles: Record<TransitionStatus, string> = {
  entering: checkOutStyles,
  entered: checkInStyles,
  exiting: checkOutStyles,
  exited: checkOutStyles,
  unmounted: checkOutStyles,
};

const baseLabelStyle = css`
  grid-area: label;
  margin-left: 8px;
  flex-grow: 1;
  align-self: baseline;
`;

const textColorSet: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,

  [Mode.Dark]: css`
    color: ${uiColors.gray.light3};
  `,
};

const disabledTextStyle = css`
  color: #babdbe; // theme colors.gray[5]
`;

interface CheckboxProps extends HTMLElementProps<'input', never> {
  darkMode?: boolean;
  checked?: boolean;
  label: React.ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  bold?: boolean;
  animate?: boolean;
}

function Checkbox({
  darkMode = false,
  checked: checkedProp,
  label = '',
  disabled = false,
  indeterminate: indeterminateProp,
  animate = false,
  className,
  onClick: onClickProp,
  onChange: onChangeProp,
  id: idProp,
  style,
  name,
  ...rest
}: CheckboxProps) {
  const [checked, setChecked] = React.useState(false);
  const isChecked = React.useMemo(
    () => (checkedProp != null ? checkedProp : checked),
    [checkedProp, checked],
  );
  const { usingKeyboard } = useUsingKeyboardContext();
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const inputRef = React.useRef(null);
  const checkboxId = useIdAllocator({ prefix: 'checkbox', id: idProp });
  const labelId = `${checkboxId}-label`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeProp) {
      onChangeProp(e);
    }

    if (checkedProp == null) {
      setChecked(e.target.checked);
    }
  };

  const onClick = (
    e: React.MouseEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    if (onClickProp) {
      onClickProp(e);
    }

    // For Microsoft Edge and IE, when checkbox is indeterminate, change event does not fire when clicked.
    // Explicitly call onChange for this case
    if (indeterminateProp) {
      onChange(e);
      e.stopPropagation();
    }
  };

  const CheckIcon = indeterminateProp ? SvgIndeterminate : SvgCheck;
  const showCheckIcon = indeterminateProp || isChecked;
  const checkIconColor = disabled ? palette.gray.light3 : palette.white;
  const shouldAnimate = animate;

  return (
    <Label
      className={cx(containerStyle, className, {
        [disabledContainerStyle]: disabled,
        [enableAnimationStyles]: shouldAnimate,
        // TODO: Refresh - remove darkMode logic
        [css`
          &:hover > ${checkboxWrapper.selector} {
            box-shadow: unset;
          }
        `]: darkMode,
      })}
      style={style}
      htmlFor={checkboxId}
      id={labelId}
    >
      <input
        {...rest}
        {...checkboxInput.prop}
        id={checkboxId}
        ref={inputRef}
        className={cx(inputStyle, {
          [inputFocusStyles]: usingKeyboard && !darkMode,
          // TODO: Refresh - remove darkMode logic
          [inputFocusStylesDarkMode]: darkMode,
        })}
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={isChecked}
        aria-label="checkbox"
        aria-disabled={disabled}
        aria-checked={indeterminateProp ? 'mixed' : isChecked}
        aria-labelledby={labelId}
        onClick={onClick}
        onChange={onChange}
      />
      {darkMode ? (
        <LegacyCheck
          isChecked={isChecked}
          indeterminateProp={indeterminateProp}
          disabled={disabled}
          animate={animate}
          checkboxWrapper={checkboxWrapper}
        />
      ) : (
        <>
          <div
            {...checkboxWrapper.prop}
            className={cx(checkWrapperBaseStyle, {
              [checkWrapperCheckedStyle]: showCheckIcon,
              [checkWrapperDisabledStyle]: disabled,
              [checkWrapperCheckedDisabledStyle]: disabled && showCheckIcon,
            })}
          >
            <Transition
              in={showCheckIcon}
              timeout={shouldAnimate ? checkAnimationDuration : 0}
            >
              {state => (
                <CheckIcon
                  stroke={checkIconColor}
                  className={cx(
                    checkIconStyles,
                    checkIconTransitionStyles[state],
                  )}
                />
              )}
            </Transition>
          </div>
          {!usingKeyboard && (
            <div
              className={cx(flourishStyles, {
                [flourishStylesChecked]: isChecked,
              })}
            />
          )}
        </>
      )}

      {label && (
        <span
          className={cx(baseLabelStyle, textColorSet[mode], {
            [disabledTextStyle]: disabled,
          })}
        >
          {label}
        </span>
      )}
    </Label>
  );
}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  darkMode: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  bold: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animate: PropTypes.bool,
};

export default Checkbox;
