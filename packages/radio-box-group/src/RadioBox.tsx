import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import Size from './Size';

const radioBoxWrapper = createDataProp('radio-box-wrapper');
const radioBoxInput = createDataProp('radio-box-input');

export const radioBoxSizes: { [K in Size]: string } = {
  [Size.Default]: css`
    width: 139px;
  `,

  [Size.Compact]: css`
    padding-right: 4px;
    padding-left: 4px;
  `,

  [Size.Full]: css`
    flex: 1;
  `,
};

const inputStyles = css`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

interface StateForStyles {
  checked: boolean;
  disabled: boolean;
  showFocus: boolean;
}

const getRadioDisplayStyles = ({
  checked,
  disabled,
  showFocus,
}: StateForStyles) => {
  const baseStyles = css`
    transition: border 150ms ease-in-out;
    box-sizing: content-box;
    padding: 15px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    vertical-align: top;
    overflow-wrap: break-word;
    background-color: white;
    border: 1px solid ${uiColors.gray.light1};
    color: ${uiColors.gray.dark2};
    border-radius: 3px;
    z-index: 2;

    ${radioBoxWrapper.selector}:hover & {
      border-color: ${uiColors.gray.base};
    }
  `;

  if (disabled) {
    return cx(
      baseStyles,
      css`
        color: ${uiColors.gray.light1};
        cursor: not-allowed;

        &,
        ${radioBoxWrapper.selector}:hover & {
          background: ${uiColors.gray.light3};
          border-color: ${uiColors.gray.light2};
        }
      `,
    );
  }

  if (checked) {
    const focusState = css`
      ${radioBoxInput.selector}:focus ~ & {
        border-color: #63b0d0;
      }
    `;

    return cx(
      baseStyles,
      css`
        border-color: ${uiColors.green.base};

        ${radioBoxWrapper.selector}:hover & {
          border-color: ${uiColors.green.base};
        }
      `,
      { [focusState]: showFocus },
    );
  }

  return baseStyles;
};

// We use a div for the checked state rather than a pseudo-element
// because said pseudo-element would need to be on the label element
// which can't use the contained input's checked pseudo-class.
const getInteractionIndicatorStyle = ({
  checked,
  disabled,
  showFocus,
}: StateForStyles) => {
  if (disabled) {
    return '';
  }

  const baseStyles = css`
    position: absolute;
    transition: all 150ms ease-in-out;
    top: -2px;
    bottom: -2px;
    right: -2px;
    left: -2px;
    transform: scale(0.9, 0.8);
    z-index: -1;
    border-radius: 4px;

    ${radioBoxWrapper.selector}:hover & {
      background-color: ${uiColors.gray.light2};
      transform: scale(1);
      z-index: 1;
    }
  `;

  const focusStyle = css`
    ${radioBoxInput.selector}:focus ~ & {
      transform: scale(1);
      background-color: #63b0d0;
      z-index: 1;
    }
  `;

  if (checked) {
    return cx(
      baseStyles,
      css`
        background-color: ${uiColors.green.base};
        transform: scale(1);
        z-index: 1;

        ${radioBoxWrapper.selector}:hover & {
          background-color: ${uiColors.green.base};
        }
      `,
      { [focusStyle]: showFocus },
    );
  }

  return cx(baseStyles, { [focusStyle]: showFocus });
};

export const radioWrapper = css`
  display: flex;
  position: relative;

  // Establishes the root element as a new stacking context
  // so that the z-index of the span within the button doesn't
  // appear above other elements on the page that it shouldn't.
  z-index: 0;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;

const getStatefulStyles = (state: StateForStyles) => ({
  radioDisplay: getRadioDisplayStyles(state),
  interactionIndicator: getInteractionIndicatorStyle(state),
});

export interface RadioBoxProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  size?: Size;
  name?: string;

  /**
   * className supplied to RadioBox container.
   */
  className?: string;

  /**
   * Used to determine what RadioBox is checked.
   */
  value: string | number;

  /**
   * Boolean that determines if the RadioBox is disabled.
   */
  disabled?: boolean;

  /**
   * Id for RadioBox and respective label.
   */
  id?: string;

  /**
   * Content that will appear inside of the RadioBox component's label.
   */
  children?: React.ReactNode;

  /**
   * If RadioBoxGroup is uncontrolled, the default property makes this RadioBox checked on the initial render.
   */
  default?: boolean;
}

/**
 * # RadioBox
 *
 * RadioBox component
 *
 * ```
  <RadioBox value='radio-box-1'>RadioBox 1</RadioBox>
```
 * @param props.className className supplied to RadioBox container.
 * @param props.value Used to determine what RadioBox is active.
 * @param props.disabled Boolean that determines if the RadioBox is disabled.
 * @param props.id Id for RadioBox and respective label.
 * @param props.children Content that will appear inside of RadioBox.
 * @param props.default If RadioBoxGroup is uncontrolled, the default property makes this RadioBox checked on the initial render.
 */
export default function RadioBox({
  className = '',
  onChange,
  value,
  checked = false,
  disabled = false,
  id,
  size = Size.Default,
  children,
  name,
  ...rest
}: RadioBoxProps & Omit<HTMLElementProps<'input', never>, 'size'>) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const styles = getStatefulStyles({ checked, disabled, showFocus });

  return (
    <label
      {...radioBoxWrapper.prop}
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
        {...radioBoxInput.prop}
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

      <div className={styles.interactionIndicator} />

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
  default: PropTypes.bool,
};
