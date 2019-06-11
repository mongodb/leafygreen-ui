import React from 'react';
import PropTypes from 'prop-types';
import { createDataProp } from '@leafygreen-ui/lib';
import emotion from '@leafygreen-ui/emotion';
import { colors } from '@leafygreen-ui/theme';

const { css, cx } = emotion;

const radioBoxInput = createDataProp('radio-box-input');

export const radioBoxSizes = {
  default: css`
    width: 139px;
  `,

  compact: css`
    padding-right: 4px;
    padding-left: 4px;
  `,

  full: css`
    flex: 1;
  `,
};

const inputStyles = css`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

const getRadioDisplayStyles = ({ checked, disabled }) => {
  const baseStyles = css`
    transition: box-shadow 150ms ease-in-out;
    box-sizing: content-box;
    padding: 15px;
    font-weight: normal;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    vertical-align: top;
    overflow-wrap: break-word;
    background-color: white;
    border: 1px solid ${colors.gray[5]};
    border-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    z-index: 2;
  `;

  if (disabled) {
    return cx(
      baseStyles,
      css`
        background: ${colors.gray[8]};
        border-color: ${colors.gray[7]};
        box-shadow: none;
        color: ${colors.gray[5]};
        cursor: not-allowed;

        &:hover {
          background: ${colors.gray[8]};
          border-color: ${colors.gray[7]};
        }
      `,
    );
  }

  if (checked) {
    return cx(
      baseStyles,
      css`
        border-color: ${colors.green[2]};
        transition: box-shadow 150ms ease-in-out, border-color 0ms;
        box-shadow: none;

        &:hover {
          border-color: ${colors.green[3]};
        }
      `,
    );
  }

  return cx(
    baseStyles,
    css`
      ${radioBoxInput.selector}:focus ~ & {
        border-color: rgba(67, 177, 229, 0.25);
        border-radius: 3px;
      }

      &:hover {
        border-color: ${colors.gray[3]};
      }
    `,
  );
};

// We use a div for the checked state rather than a pseudo-element
// because said pseudo-element would need to be on the label element
// which can't use the contained input's checked pseudo-class.
const getCheckedStateStyle = ({ checked }) => {
  const baseStyles = css`
    position: absolute;
    transition: all 150ms ease-in-out;
    top: -2px;
    bottom: -2px;
    right: -2px;
    left: -2px;
    transform: scale(0.9, 0.8);
    opacity: 0;
    z-index: -1;
  `;

  if (checked) {
    return cx(
      baseStyles,
      css`
        border-radius: 3px;
        background-color: ${colors.green[2]};
        transform: scale(1);
        opacity: 1;
        z-index: 1;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
      `,
    );
  }

  return baseStyles;
};

export const radioWrapper = css`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;

const getStatefulStyles = states => ({
  radioDisplay: getRadioDisplayStyles(states),
  checkedState: getCheckedStateStyle(states),
});

export default function RadioBox({
  className,
  onChange,
  value,
  checked,
  disabled,
  id,
  size,
  children,
  name,
  ...rest
}) {
  const styles = getStatefulStyles({ checked, disabled });

  return (
    <label
      htmlFor={id}
      className={cx(
        radioWrapper,
        {
          [radioBoxSizes['full']]: size === 'full',
        },
        className,
      )}
    >
      <input
        {...rest}
        type="radio"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        checked={checked}
        aria-checked={checked}
        disabled={disabled}
        aria-disabled={disabled}
        className={inputStyles}
      />

      <div className={styles.checkedState} />

      <div className={cx(styles.radioDisplay, radioBoxSizes[size])}>
        {children}
      </div>
    </label>
  );
}

RadioBox.displayName = 'RadioBox';

RadioBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
};

RadioBox.defaultProps = {
  onChange: () => {},
  disabled: false,
  className: '',
};
