import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { Label } from '@leafygreen-ui/typography';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { LegacyCheck } from './LegacyCheck';

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

  &:focus + ${checkboxWrapper.selector}:after {
    content: '';
    bottom: 0;
    left: 3px;
    right: 3px;
    height: 2px;
    position: absolute;
    background-color: #43b1e5;
    border-radius: 2px;
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
  margin-left: 3px;
  flex-grow: 1;
  align-self: baseline;
`;

const containerStyle = css`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;

  &:hover > ${checkboxWrapper.selector} {
    opacity: 1;
  }
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
  const normalizedChecked = React.useMemo(
    () => (checkedProp != null ? checkedProp : checked),
    [checkedProp, checked],
  );

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
      })}
      style={style}
      htmlFor={checkboxId}
      id={labelId}
    >
      <input
        {...rest}
        id={checkboxId}
        ref={inputRef}
        className={inputStyle}
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={normalizedChecked}
        aria-label="checkbox"
        aria-disabled={disabled}
        aria-checked={indeterminateProp ? 'mixed' : normalizedChecked}
        aria-labelledby={labelId}
        onClick={onClick}
        onChange={onChange}
      />

      {darkMode ? (
        <LegacyCheck
          normalizedChecked={normalizedChecked}
          indeterminateProp={indeterminateProp}
          disabled={disabled}
          animate={animate}
          checkboxWrapper={checkboxWrapper}
        />
      ) : (
        <div></div>
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
