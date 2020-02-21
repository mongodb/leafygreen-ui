import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp } from '@leafygreen-ui/lib';

const inputSelectorProp = createDataProp('input-selector');
const iconSelectorProp = createDataProp('icon-selector');

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

const descriptionStyle = css`
  color: ${uiColors.gray.dark1};
  font-size: 14px;
  height: 20px;
  font-weight: normal;
  padding-bottom: 8px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const inputContainerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 0;
`;

const inputStyle = css`
  width: 400px;
  height: 36px;
  border-radius: 4px;
  padding-left: 12px;
  font-size: 14px;
  font-weight: normal;
  background-color: ${uiColors.white};
  border: 1px solid;
  z-index: 1;

  &:placeholder {
    color: ${uiColors.gray.base};
  }

  &:focus {
    outline: none;
    z-index: 2;

    & ~ ${iconSelectorProp.selector} {
      z-index: 2;
    }
  }

  &:disabled {
    background-color: ${uiColors.gray.light2};
  }
`;

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

const inputIconStyle = css`
  position: absolute;
  display: flex;
  align-items: center;
  right: 12px;
  z-index: 1;
`;

const errorIconStyle = css`
  color: ${uiColors.red.base};
`;

const validIconStyle = css`
  color: ${uiColors.green.base};
`;

const optionalStyle = css`
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

function getStatefulInputStyles(state: State, optional: boolean) {
  switch (state) {
    case State.Valid: {
      return css`
        padding-right: 30px;
        border-color: ${uiColors.green.base};
      `;
    }

    case State.Error: {
      return css`
        padding-right: 30px;
        border-color: ${uiColors.red.base};
      `;
    }

    default: {
      return css`
        padding-right: ${optional ? 60 : 12}px;
        border-color: ${uiColors.gray.light1};
      `;
    }
  }
}

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
      id: propsId,
      label,
      description,
      optional = false,
      disabled = false,
      onChange,
      placeholder,
      errorMessage,
      state = State.None,
      value: controlledValue,
      className,
      ...rest
    }: TextInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
    const isControlled = typeof controlledValue === 'string';
    const [uncontrolledValue, setValue] = useState('');
    const value = isControlled ? controlledValue : uncontrolledValue;
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();
    const [generatedId] = useState(
      `text-input-${Math.floor(Math.random() * 10000000)}`,
    );
    const id = propsId ?? generatedId;

    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (onChange) {
        onChange(e);
      }

      if (!isControlled) {
        setValue(e.target.value);
      }
    }

    return (
      <div className={cx(textInputStyle, labelStyle, className)}>
        <label htmlFor={id} className={labelStyle}>
          {label}
        </label>
        {description && <p className={descriptionStyle}>{description}</p>}
        <div className={inputContainerStyle}>
          <input
            {...inputSelectorProp.prop}
            {...rest}
            className={cx(inputStyle, getStatefulInputStyles(state, optional))}
            type="text"
            value={value}
            required={!optional}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onValueChange}
            ref={forwardRef}
            id={id}
          />
          <div {...iconSelectorProp.prop} className={inputIconStyle}>
            {state === State.Valid && (
              <Icon glyph="Checkmark" className={validIconStyle} />
            )}

            {state === State.Error && (
              <Icon glyph="Warning" className={errorIconStyle} />
            )}

            {state === State.None && optional && (
              <div className={optionalStyle}>
                <p>Optional</p>
              </div>
            )}
          </div>
          <div
            className={cx(interactionRing, interactionRingHoverStyle, {
              [interactionRingFocusStyle]: showFocus,
            })}
          />
        </div>
        {state === State.Error && errorMessage && (
          <div className={errorMessageStyle}>
            <label>{errorMessage}</label>
          </div>
        )}
      </div>
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
