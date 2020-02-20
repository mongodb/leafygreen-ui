import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp } from '@leafygreen-ui/lib';

export const State = {
  None: 'none',
  Valid: 'valid',
  Error: 'error',
} as const;

export type State = typeof State[keyof typeof State];

interface TextInputProps {
  /**
   * id associated with the TextInput component.
   */
  id?: string;

  /**
   * Text shown in bold above the input element.
   */
  label?: string;

  /**
   * Text that gives more detail about the requirements for the input.
   */
  description?: string;

  /**
   * Whether or not the field is optional.
   * Default: false
   */
  optional?: boolean;

  /**
   * Whether or not the field is currently disabled.
   * Default: false
   */
  disabled?: boolean;

  /**
   * Callback to be executed when the value of the input field changes.
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The placeholder text shown in the input field before the user begins typing.
   */
  placeholder?: string;

  /**
   * The message shown below the input field if the value is invalid.
   */
  errorMessage?: string;

  /**
   * The current state of the TextInput. This can be none, valid, or error.
   */
  state?: State;

  /**
   * The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
   */
  value?: string;

  /**
   * className supplied to the TextInput container.
   */
  className?: string;
}

const interactionRing = css`
  transition: all 150ms ease-in-out;
  transform: scale(0.9, 0.8);
  border-radius: 7px;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
  pointer-events: none;
  background-color: ${uiColors.gray.light2};
`;

const textInputStyle = css`
  display: flex;
  flex-direction: column;
`;

const labelStyle = css`
  color: ${uiColors.gray.dark2};
  font-size: 14px;
  font-weight: bold;
  height: 20px;
  padding-bottom: 8px;
`;

const inputContainerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 0;
`;

const errorIconStyle = css`
  position: absolute;
  right: 10px;
  color: ${uiColors.red.base};
`;

const validIconStyle = css`
  position: absolute;
  right: 10px;
  color: ${uiColors.green.base};
`;

const optionalStyle = css`
  position: absolute;
  right: 12px;
  color: ${uiColors.gray.dark1};
  font-size: 12px;
  font-style: italic;
  font-weight: normal;
`;

const errorMessageStyle = css`
  color: ${uiColors.red.base};
  font-size: 14px;
  height: 20px;
  padding-top: 4px;
  font-weight: normal;
`;

/**
 * # TextInput
 *
 * TextInput component
 *
 * ```
<TextInput label='Input Label' onChange={() => execute when value of input field changes}/>
```
 * @param props.id id associated with the TextInput component.
 * @param props.label Text shown in bold above the input element.
 * @param props.description Text that gives more detail about the requirements for the input.
 * @param props.optional Whether or not the field is optional.
 * @param props.disabled Whether or not the field is currently disabled.
 * @param props.onChange Callback to be executed when the value of the input field changes.
 * @param props.placeholder The placeholder text shown in the input field before the user begins typing.
 * @param props.errorMessage The message shown below the input field if the value is invalid.
 * @param props.state The current state of the TextInput. This can be none, valid, or error.
 * @param props.value The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
 * @param props.className className supplied to the TextInput container.
 */
const TextInput = React.forwardRef(
  (
    {
      id,
      label,
      description,
      optional = false,
      disabled = false,
      onChange,
      placeholder,
      errorMessage,
      state,
      value: controlledValue,
      className,
    }: TextInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
    const isControlled = typeof controlledValue === 'string';
    const [uncontrolledValue, setValue] = useState('');
    const value = isControlled ? controlledValue : uncontrolledValue;
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();
    const [hasFocus, setHasFocus] = useState(false);
    const inputSelectorProp = createDataProp('input-selector');
    const [generatedId, setId] = useState(
      id || `text-input-${Math.floor(Math.random() * 10000000)}`,
    );
    useEffect(() => setId(id || generatedId), [id]);

    function getInputColorFromState() {
      if (state === State.Error) {
        return uiColors.red.base;
      }

      if (state === State.Valid) {
        return uiColors.green.base;
      }

      return '#CCC';
    }

    function getInputPaddingFromState() {
      if (state === State.Valid || state === State.Error) {
        return '30px';
      }

      if (optional) {
        return '60px';
      }

      return '12px';
    }

    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (onChange) {
        onChange(e);
      }

      if (!isControlled) {
        setValue(e.target.value);
      }
    }

    const interactionRingFocusStyle = css`
      ${inputSelectorProp.selector}:focus ~ & {
        background-color: #9dd0e7;
        transform: scale(1);
        z-index: 1;
      }
    `;

    const interactionRingHoverStyle = css`
      ${inputSelectorProp.selector}:hover ~ & {
        transform: scale(1);
      }
    `;

    const descriptionStyle = css`
      color: ${uiColors.gray.dark1};
      font-size: 14px;
      height: ${description === '' ? '0' : '20'}px;
      font-weight: normal;
      padding-bottom: 8px;
      margin-top: 0px;
      margin-bottom: 0px;
    `;

    const inputStyle = css`
      width: 400px;
      height: 36px;
      border-radius: 4px;
      padding-left: 12px;
      font-size: 14px;
      font-weight: normal;
      z-index: ${hasFocus ? 2 : 1};
      background-color: ${disabled ? uiColors.gray.light2 : '#FFFFFF'};
      padding-right: ${getInputPaddingFromState()};
      border: 1px solid ${getInputColorFromState()};
      &:placeholder {
        color: ${uiColors.gray.base};
      }
      &:focus {
        outline: none;
      }
    `;

    return (
      <label
        htmlFor={generatedId}
        className={cx(textInputStyle, labelStyle, className)}
      >
        {label}
        <p className={descriptionStyle}>{description}</p>
        <div className={inputContainerStyle}>
          <input
            {...inputSelectorProp.prop}
            className={inputStyle}
            type="text"
            value={value}
            required={!optional}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onValueChange}
            ref={forwardRef}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            id={generatedId}
          />

          {state === State.Valid && (
            <Icon
              glyph="Checkmark"
              className={cx(
                validIconStyle,
                css`
                  z-index: ${hasFocus ? 2 : 1};
                `,
              )}
            />
          )}

          {state === State.Error && (
            <Icon
              glyph="Warning"
              className={cx(
                errorIconStyle,
                css`
                  z-index: ${hasFocus ? 2 : 1};
                `,
              )}
            />
          )}

          {state === State.None && optional && (
            <div
              className={cx(
                optionalStyle,
                css`
                  z-index: ${hasFocus ? 2 : 1};
                `,
              )}
            >
              <p>Optional</p>
            </div>
          )}

          <div
            className={cx(interactionRing, interactionRingHoverStyle, {
              [interactionRingFocusStyle]: showFocus,
            })}
          />
        </div>
        {state === State.Error && (
          <div className={errorMessageStyle}>
            <label>{errorMessage}</label>
          </div>
        )}
      </label>
    );
  },
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  state: PropTypes.oneOf(Object.values(State)),
  value: PropTypes.string,
  className: PropTypes.string,
};

export default TextInput;
