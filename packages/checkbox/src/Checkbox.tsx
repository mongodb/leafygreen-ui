import React from 'react';
import PropTypes from 'prop-types';
import { createDataProp, IdAllocator } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  spritesheetLight,
  spritesheetDark,
  disabledLight,
  disabledLightChecked,
  disabledDark,
  disabledDarkChecked,
  indeterminateLight,
  indeterminateDark,
} from './img';

const checkboxWrapper = createDataProp('checkbox-wrapper');

const height = 20;
const width = 600;

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const wrapperStyleAnimated = css`
  transition: 300ms opacity ease-in-out;
`;

const wrapperStyle = css`
  height: ${height}px;
  width: ${height}px;
  display: inline-block;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  opacity: 0.9;
`;

const checkboxStyle = css`
  height: ${height}px;
  width: ${width}px;
  background-size: contain;
  background-repeat: no-repeat;
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

const wrapperStyleChecked = css`
  opacity: 1;
`;

const checkboxStyleAnimated = css`
  transition: 500ms transform steps(29);
`;

const checkboxStyleChecked = css`
  transform: translate3d(${-width + height}px, 0, 0);
`;

const textColorSet: { [K in Mode]: string } = {
  [Mode.Light]: css`
    color: #464c4f; // theme colors.gray[1]
  `,

  [Mode.Dark]: css`
    color: #f4f6f6; // theme colors.gray[8]
  `,
};

const baseTextStyle = css`
  margin-left: 3px;
  font-size: 14px;
  line-height: 1.3em;
  flex-grow: 1;
  position: relative;
  top: 2px;
`;

const boldTextStyle = css`
  font-weight: bold;
  top: 1px;
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

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
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

const idAllocator = IdAllocator.create('checkbox');

function Checkbox({
  darkMode = false,
  checked: checkedProp,
  label = '',
  disabled = false,
  indeterminate: indeterminateProp,
  bold = false,
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
  const normalizedIndeterminate = React.useRef(indeterminateProp);
  const inputRef = React.useRef(null);
  const checkboxId = React.useMemo(() => idProp ?? idAllocator.generate(), [
    idProp,
  ]);
  const labelId = `${checkboxId}-label`;

  React.useEffect(() => {
    if (indeterminateProp != null) {
      normalizedIndeterminate.current = indeterminateProp;
    }
  }, [indeterminateProp]);

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
    if (normalizedIndeterminate.current) {
      onChange(e);
      e.stopPropagation();
    }
  };

  const textVariantStyle = darkMode
    ? textColorSet[Mode.Dark]
    : textColorSet[Mode.Light];

  const checkboxBackgroundImage = (() => {
    if (darkMode) {
      if (disabled) {
        if (normalizedChecked) {
          return css`
            background-image: url(${disabledLightChecked});
          `;
        }

        return css`
          background-image: url(${disabledLight});
        `;
      }

      if (indeterminateProp) {
        return css`
          background-image: url(${indeterminateLight});
        `;
      }

      return css`
        background-image: url(${spritesheetLight});
      `;
    } else {
      if (disabled) {
        if (normalizedChecked) {
          return css`
            background-image: url(${disabledDarkChecked});
          `;
        }

        return css`
          background-image: url(${disabledDark});
        `;
      }

      if (indeterminateProp) {
        return css`
          background-image: url(${indeterminateDark});
        `;
      }

      return css`
        background-image: url(${spritesheetDark});
      `;
    }
  })();

  return (
    <label
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
        aria-checked={
          normalizedIndeterminate.current ? 'mixed' : normalizedChecked
        }
        aria-labelledby={labelId}
        onClick={onClick}
        onChange={onChange}
      />

      <div
        {...checkboxWrapper.prop}
        className={cx(wrapperStyle, {
          [wrapperStyleChecked]:
            normalizedChecked && !normalizedIndeterminate.current && !disabled,
          [wrapperStyleAnimated]:
            animate && !normalizedIndeterminate.current && !disabled,
        })}
      >
        <div
          className={cx(checkboxStyle, checkboxBackgroundImage, {
            [checkboxStyleChecked]:
              normalizedChecked &&
              !normalizedIndeterminate.current &&
              !disabled,
            [checkboxStyleAnimated]:
              animate && !normalizedIndeterminate.current && !disabled,
          })}
        />
      </div>

      {label && (
        <span
          className={cx(baseTextStyle, textVariantStyle, {
            [disabledTextStyle]: disabled,
            [boldTextStyle]: bold,
          })}
        >
          {label}
        </span>
      )}
    </label>
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
