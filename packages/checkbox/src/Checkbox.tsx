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

const checkboxWrapper = createDataProp('checkbox-wrapper');

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

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

const textColorSet: { [K in Mode]: string } = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,

  [Mode.Dark]: css`
    color: ${uiColors.gray.light3};
  `,
};

const baseTextStyle = css`
  margin-left: 8px;
  flex-grow: 1;
  align-self: baseline;
`;

const containerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:hover > ${checkboxWrapper.selector}:not([data-leafygreen-disabled="true"]) {
    box-shadow: 0 0 0 3px ${palette.gray.light2};
  }
`;

const checkWrapperBaseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 2px solid ${palette.gray.dark2};
  background-color: transparent;
  height: 14px;
  width: 14px;
  transition: 100ms ease-in-out;
  transition-properties: box-shadow;
`;

const checkWrapperCheckedStyle = css`
  border-color: ${palette.blue.base};
  background-color: ${palette.blue.base};
`;
const checkWrapperDisabledCheckedStyle = css`
  border-color: ${palette.gray.light2};
  background-color: ${palette.gray.light2};
`;
const checkWrapperDisabledUncheckedStyle = css`
  border-color: ${palette.gray.light2};
  background-color: ${palette.gray.light3};
`;

/** &:disabled won't work and [disabled] isn't a valid property because this isn't an input */
const disabledContainerStyle = css`
  cursor: not-allowed;
`;

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

  const textVariantStyle = darkMode
    ? textColorSet[Mode.Dark]
    : textColorSet[Mode.Light];

  return (
    <Label
      className={cx(containerStyle, className, {
        [disabledContainerStyle]: disabled,
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
        <div
          {...checkboxWrapper.prop}
          className={cx(checkWrapperBaseStyle, {
            [checkWrapperCheckedStyle]: isChecked,
            [checkWrapperDisabledUncheckedStyle]: disabled,
            [checkWrapperDisabledCheckedStyle]: disabled && isChecked,
          })}
        >
          {isChecked && !indeterminateProp && (
            <SvgCheck fill={disabled ? palette.gray.light3 : palette.white} />
          )}
          {indeterminateProp && (
            <SvgIndeterminate
              fill={disabled ? palette.gray.light3 : palette.white}
            />
          )}
        </div>
      )}

      {label && (
        <span
          className={cx(baseTextStyle, textVariantStyle, {
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
