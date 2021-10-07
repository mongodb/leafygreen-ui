import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp, HTMLElementProps, Either } from '@leafygreen-ui/lib';
import { useIdAllocator, useValidation } from '@leafygreen-ui/hooks';
import { Description, Label } from '@leafygreen-ui/typography';

const iconSelectorProp = createDataProp('icon-selector');

export const State = {
  None: 'none',
  Valid: 'valid',
  Error: 'error',
} as const;

export type State = typeof State[keyof typeof State];

export const TextInputType = {
  Email: 'email',
  Password: 'password',
  Search: 'search',
  Text: 'text',
  Url: 'url',
  Tel: 'tel',
  Number: 'number',
} as const;

export type TextInputType = typeof TextInputType[keyof typeof TextInputType];

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

interface TextInputProps extends HTMLElementProps<'input', HTMLInputElement> {
  /**
   * id associated with the TextInput component.
   */
  id?: string;

  /**
   * Text shown in bold above the input element.
   */
  label?: string | null;

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

  /**
   *  determines whether or not the component appears in dark mode.
   */
  darkMode?: boolean;

  type?: TextInputType;

  handleValidation?: (value: string) => void;

  ['aria-labelledby']?: string;
}

type AriaLabels = 'label' | 'aria-labelledby';
type AccessibleTextInputProps =
  | Either<TextInputProps, AriaLabels>
  | (TextInputProps & { type: 'search'; 'aria-label': string });

const interactionRingStyle = css`
  width: 100%;
`;

const textInputStyle = css`
  display: flex;
  flex-direction: column;
`;

const inputContainerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 0;
`;

const inputStyle = css`
  width: 100%;
  height: 36px;
  border-radius: 4px;
  padding-left: 12px;
  font-size: 14px;
  font-weight: normal;
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  border: 1px solid;
  transition: border-color 150ms ease-in-out;
  z-index: 1;
  outline: none;

  &::placeholder {
    color: ${uiColors.gray.base};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const inputIconStyle = css`
  position: absolute;
  display: flex;
  align-items: center;
  right: 12px;
  z-index: 1;
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
  font-size: 14px;
  min-height: 20px;
  padding-top: 4px;
  font-weight: normal;
`;

interface ColorSets {
  inputColor: string;
  inputBackgroundColor: string;
  disabledColor: string;
  disabledBackgroundColor: string;
  errorIconColor: string;
  errorBorder: string;
  errorMessage: string;
  optional: string;
  defaultBorder: string;
  validBorder: string;
}

const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    inputColor: uiColors.gray.dark3,
    inputBackgroundColor: uiColors.white,
    disabledColor: uiColors.gray.base,
    disabledBackgroundColor: uiColors.gray.light2,
    errorIconColor: uiColors.red.base,
    errorMessage: uiColors.red.base,
    errorBorder: uiColors.red.base,
    optional: uiColors.gray.dark1,
    defaultBorder: uiColors.gray.base,
    validBorder: uiColors.green.base,
  },
  [Mode.Dark]: {
    inputColor: uiColors.white,
    inputBackgroundColor: '#394F5A',
    disabledColor: uiColors.gray.dark1,
    disabledBackgroundColor: '#263843',
    errorIconColor: '#EF8D6F',
    errorMessage: '#EF8D6F',
    errorBorder: '#5a3c3b',
    optional: uiColors.gray.light1,
    defaultBorder: '#394F5A',
    validBorder: '#394F5A',
  },
} as const;

const interactionRingColor: Record<Mode, Record<'valid' | 'error', string>> = {
  [Mode.Light]: {
    [State.Error]: uiColors.red.light3,
    [State.Valid]: uiColors.green.light3,
  },
  [Mode.Dark]: {
    [State.Error]: uiColors.red.dark2,
    [State.Valid]: uiColors.gray.dark1,
  },
};

function getStatefulInputStyles({
  state,
  optional,
  mode,
  disabled,
}: {
  state: State;
  optional: boolean;
  mode: Mode;
  disabled: boolean;
}) {
  switch (state) {
    case State.Valid: {
      return css`
        padding-right: 30px;
        border-color: ${!disabled ? colorSets[mode].validBorder : 'inherit'};
      `;
    }

    case State.Error: {
      return cx(
        css`
          padding-right: 30px;
          border-color: ${!disabled ? colorSets[mode].errorBorder : 'inherit'};
        `,
        {
          [css`
            background-color: #5a3c3b;
          `]: mode === Mode.Dark,
        },
      );
    }

    default: {
      return css`
        padding-right: ${optional ? 60 : 12}px;
        border-color: ${colorSets[mode].defaultBorder};
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
 * @param props.darkMode determines whether or not the component appears in dark mode.
 */
const TextInput: React.ComponentType<
  React.PropsWithRef<AccessibleTextInputProps>
> = React.forwardRef(
  (
    {
      label,
      description,
      onChange,
      placeholder,
      errorMessage,
      optional = false,
      disabled = false,
      state = State.None,
      type = TextInputType.Text,
      id: propsId,
      value: controlledValue,
      className,
      darkMode = false,
      'aria-labelledby': ariaLabelledby,
      handleValidation,
      ...rest
    }: AccessibleTextInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
    const mode = darkMode ? Mode.Dark : Mode.Light;
    const isControlled = typeof controlledValue === 'string';
    const [uncontrolledValue, setValue] = useState('');
    const value = isControlled ? controlledValue : uncontrolledValue;
    const id = useIdAllocator({ prefix: 'textinput', id: propsId });

    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (onChange) {
        onChange(e);
      }

      if (!isControlled) {
        setValue(e.target.value);
      }
    }

    if (type !== 'search' && !label && !ariaLabelledby) {
      console.error(
        'For screen-reader accessibility, label or aria-labelledby must be provided to TextInput.',
      );
    }

    if (type === 'search' && !rest['aria-label']) {
      console.error(
        'For screen-reader accessibility, aria-label must be provided to TextInput.',
      );
    }

    const RenderedCheckmarkIcon = darkMode
      ? CheckmarkWithCircleIcon
      : CheckmarkIcon;

    // Validation
    const { handleBlur, handleKeyPress } = useValidation<HTMLInputElement>(
      handleValidation,
    );

    return (
      <div className={cx(textInputStyle, className)}>
        {label && (
          <Label darkMode={darkMode} htmlFor={id} disabled={disabled}>
            {label}
          </Label>
        )}
        {description && (
          <Description darkMode={darkMode}>{description}</Description>
        )}
        <div className={inputContainerStyle}>
          <InteractionRing
            className={interactionRingStyle}
            darkMode={darkMode}
            disabled={disabled}
            ignoreKeyboardContext={true}
            color={
              state === State.Valid || state === State.Error
                ? {
                    hovered: interactionRingColor[mode][state],
                  }
                : undefined
            }
          >
            <input
              {...rest}
              aria-labelledby={ariaLabelledby}
              type={type}
              className={cx(
                inputStyle,
                css`
                  color: ${colorSets[mode].inputColor};
                  background-color: ${colorSets[mode].inputBackgroundColor};

                  &:focus {
                    border: 1px solid ${colorSets[mode].inputBackgroundColor};
                  }

                  &:disabled {
                    color: ${colorSets[mode].disabledColor};
                    background-color: ${colorSets[mode]
                      .disabledBackgroundColor};

                    &:-webkit-autofill {
                      &,
                      &:hover,
                      &:focus {
                        appearance: none;
                        border: 1px solid ${colorSets[mode].defaultBorder};
                        -webkit-text-fill-color: ${colorSets[mode]
                          .disabledColor};
                        -webkit-box-shadow: 0 0 0px 1000px
                          ${colorSets[mode].disabledBackgroundColor} inset;
                      }
                    }
                  }
                `,
                getStatefulInputStyles({ state, optional, mode, disabled }),
              )}
              value={value}
              required={!optional}
              disabled={disabled}
              placeholder={placeholder}
              onChange={onValueChange}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              ref={forwardRef}
              id={id}
              autoComplete={disabled ? 'off' : rest?.autoComplete || 'on'}
              aria-invalid={state === 'error'}
            />
          </InteractionRing>

          <div {...iconSelectorProp.prop} className={inputIconStyle}>
            {state === State.Valid && (
              <RenderedCheckmarkIcon
                role="presentation"
                className={validIconStyle}
              />
            )}

            {state === State.Error && (
              <WarningIcon
                role="presentation"
                className={css`
                  color: ${colorSets[mode].errorIconColor};
                `}
              />
            )}

            {state === State.None && optional && (
              <div
                className={cx(
                  optionalStyle,
                  css`
                    color: ${colorSets[mode].optional};
                  `,
                )}
              >
                <p>Optional</p>
              </div>
            )}
          </div>
        </div>
        {state === State.Error && errorMessage && (
          <div
            className={cx(
              errorMessageStyle,
              css`
                color: ${colorSets[mode].errorMessage};
              `,
            )}
          >
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
