import React from 'react';
import PropTypes from 'prop-types';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { Description, Label } from '@leafygreen-ui/typography';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { LegacyCheck } from './LegacyCheck';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { Check } from './Check';
import { checkAnimationDuration, checkBoxSize } from './constants';
import { CheckboxProps } from './types';

const checkClassName = createUniqueClassName();
const inputClassName = createUniqueClassName();

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const containerStyle = css`
  --lg-checkbox-base-duration: 0ms;
  display: grid;
  grid-template-columns: ${checkBoxSize}px auto;
  grid-template-areas: 'label label' '. description';
  gap: 0 8px;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  z-index: 0;
`;

// Toggles on the animation timing
const enableAnimationStyles = css`
  // if there is no motion preference
  @media (prefers-reduced-motion: no-preference) {
    --lg-checkbox-base-duration: ${checkAnimationDuration}ms;
    // Enable var access in pseudo elements
    *:before,
    *:after {
      --lg-checkbox-base-duration: ${checkAnimationDuration}ms;
    }
  }
`;

/** &:disabled won't work and [disabled] isn't a valid property because this isn't an input */
const disabledContainerStyle = css`
  cursor: not-allowed;
`;

const labelStyle = css`
  grid-area: label;
  display: grid;
  grid-template-columns: ${checkBoxSize}px auto;
  grid-template-areas: 'check text';
  gap: 8px;
  align-items: baseline;
  justify-content: flex-start;
  cursor: pointer;
`;

const labelHoverSelector = `
  &:hover:not(:focus-within)
    > .${inputClassName}:not([disabled])
      + .${checkClassName}
`;

const labelHoverStyle = css`
  ${labelHoverSelector} {
    box-shadow: 0 0 0 3px ${palette.gray.light2};
  }
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
  &:focus + .${checkClassName} {
    box-shadow: 0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.blue.light1};
  }
`;

// TODO: Refresh - remove when darkmode is updated
const inputFocusStylesDarkMode = css`
  &:focus + .${checkClassName}:after {
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

const labelTextStyle = css`
  align-self: baseline;
`;

const descriptionStyle = css`
  grid-area: description;
`;

const labelTextColorStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,

  [Mode.Dark]: css`
    color: ${uiColors.gray.light3};
  `,
};

const disabledTextStyle = css`
  color: ${palette.gray.dark1};
`;

/**
 * Checkboxes should be used whenever a user has an option they’d like to opt in or out of.
 *
 * Unlike toggles, checkboxes are used for actions, or features, that don’t immediately turn on or off. Checkboxes are usually found in forms as opposed to config pages.
 */
function Checkbox({
  darkMode = false,
  checked: checkedProp,
  label = '',
  description,
  disabled = false,
  indeterminate: indeterminateProp,
  animate = true,
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

  return (
    <div
      className={cx(
        containerStyle,
        {
          [disabledContainerStyle]: disabled,
          [enableAnimationStyles]: animate,
        },
        className,
      )}
      style={style}
    >
      <Label
        className={cx(labelStyle, labelHoverStyle, {
          // TODO: Refresh - remove darkMode logic
          [css`
            align-items: flex-start;
            ${labelHoverSelector} {
              box-shadow: unset;
            }
          `]: darkMode,
        })}
        htmlFor={checkboxId}
        id={labelId}
      >
        <input
          {...rest}
          id={checkboxId}
          className={cx(inputClassName, inputStyle, {
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
            indeterminate={indeterminateProp}
            disabled={disabled}
            animate={animate}
            selector={checkClassName}
          />
        ) : (
          <Check
            isChecked={isChecked}
            indeterminate={indeterminateProp}
            disabled={disabled}
            animate={animate}
            selector={checkClassName}
          />
        )}

        {label && (
          <span
            className={cx(labelTextStyle, labelTextColorStyle[mode], {
              [disabledTextStyle]: disabled,
              // TODO: Refresh - remove dark mode styles
              [css`
                font-family: ${fontFamilies.legacy};
                font-size: 14px;
                padding-left: 1px;
              `]: darkMode,
              [css`
                color: #babdbe;
              `]: darkMode && disabled,
            })}
          >
            {label}
          </span>
        )}
      </Label>

      {description && (
        <Description className={descriptionStyle} darkMode={darkMode}>
          {description}
        </Description>
      )}
    </div>
  );
}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  darkMode: PropTypes.bool,
  description: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animate: PropTypes.bool,
};

export default Checkbox;
