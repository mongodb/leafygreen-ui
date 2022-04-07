import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { uiColors, palette } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
import { useIdAllocator, useValidation } from '@leafygreen-ui/hooks';
import { Description, Label } from '@leafygreen-ui/typography';
import { fontFamilies, typeScales, BaseFontSize } from '@leafygreen-ui/tokens';
import {
  AccessibleTextInputProps,
  Mode,
  SizeVariant,
  State,
  TextInputFontSize,
  TextInputType,
} from './types';

const iconSelectorProp = createDataProp('icon-selector');

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
  font-weight: normal;
  border: 1px solid;
  transition: border-color 150ms ease-in-out;
  z-index: 1;
  outline: none;

  &:disabled {
    cursor: not-allowed;
  }

  /* clears the ‘X’ from Internet Explorer & Chrome */
  &[type='search'] {
    &::-ms-clear,
    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }
  }
`;

const inputIconStyle = css`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1;
`;

const inputIconStyleSize: Record<SizeVariant, string> = {
  [SizeVariant.XSmall]: css`
    right: 10px;
  `,
  [SizeVariant.Small]: css`
    right: 10px;
  `,
  [SizeVariant.Default]: css`
    right: 12px;
  `,
  [SizeVariant.Large]: css`
    right: 16px;
  `,
};

const optionalStyle = css`
  font-size: 12px;
  font-style: italic;
  font-weight: normal;
`;

const errorMessageStyle = css`
  font-size: 13px;
  min-height: 20px;
  padding-top: 4px;
  font-weight: normal;
`;

interface ColorSets {
  inputColor: string;
  defaultBorder: string;
  inputBackgroundColor: string;
  placeholderColor: string;

  disabledColor: string;
  disabledBorderColor: string;
  disabledBackgroundColor: string;

  errorIconColor: string;
  errorBorder: string;
  errorMessage: string;

  validBorder: string;
  validIconColor: string;

  optional: string;
}

const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    inputColor: palette.black,
    inputBackgroundColor: palette.white,
    defaultBorder: palette.gray.base,
    placeholderColor: palette.gray.light1,

    disabledColor: palette.gray.base,
    disabledBorderColor: palette.gray.light1,
    disabledBackgroundColor: palette.gray.light2,

    errorIconColor: palette.red.base,
    errorMessage: palette.red.base,
    errorBorder: palette.red.base,

    validBorder: palette.green.dark1,
    validIconColor: palette.green.dark1,
    optional: palette.gray.dark1,
  },
  [Mode.Dark]: {
    inputColor: uiColors.white,
    inputBackgroundColor: '#394F5A',
    defaultBorder: '#394F5A',
    placeholderColor: uiColors.gray.base,

    disabledColor: uiColors.gray.dark1,
    disabledBorderColor: '#394F5A',
    disabledBackgroundColor: '#263843',

    errorIconColor: '#EF8D6F',
    errorMessage: '#EF8D6F',
    errorBorder: '#5a3c3b',

    validBorder: '#394F5A',
    validIconColor: uiColors.green.base,
    optional: uiColors.gray.light1,
  },
} as const;

const interactionRingColor: Record<Mode, Record<'valid' | 'error', string>> = {
  [Mode.Light]: {
    [State.Error]: palette.red.light3,
    [State.Valid]: palette.green.light3,
  },
  [Mode.Dark]: {
    [State.Error]: uiColors.red.dark2,
    [State.Valid]: uiColors.gray.dark1,
  },
};

interface SizeSet {
  inputHeight: number;
  inputText: TextInputFontSize;
  text: TextInputFontSize;
  lineHeight: number;
  padding: number;
}

function getStatefulInputStyles({
  state,
  optional,
  mode,
  disabled,
  sizeSet,
}: {
  state: State;
  optional: boolean;
  mode: Mode;
  disabled: boolean;
  sizeSet: SizeSet;
}) {
  switch (state) {
    case State.Valid: {
      return css`
        padding-right: 36px;
        border-color: ${!disabled ? colorSets[mode].validBorder : 'inherit'};
      `;
    }

    case State.Error: {
      return cx(
        css`
          padding-right: 36px;
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
        padding-right: ${optional ? 60 : sizeSet.padding}px;
        border-color: ${disabled
          ? colorSets[mode].disabledBorderColor
          : colorSets[mode].defaultBorder};
      `;
    }
  }
}

function getSizeSets(baseFontSize: BaseFontSize, sizeVariant: SizeVariant) {
  const sizeSets: Record<SizeVariant, SizeSet> = {
    [SizeVariant.XSmall]: {
      inputHeight: 22,
      inputText: 13,
      text: 13,
      lineHeight: 20,
      padding: 10,
    },
    [SizeVariant.Small]: {
      inputHeight: 28,
      inputText: 13,
      text: 13,
      lineHeight: 20,
      padding: 10,
    },
    [SizeVariant.Default]: {
      inputHeight: 36,
      inputText: baseFontSize,
      text: baseFontSize,
      lineHeight:
        baseFontSize == BaseFontSize.Body2
          ? typeScales.body2.lineHeight
          : typeScales.body1.lineHeight,
      padding: 12,
    },
    [SizeVariant.Large]: {
      inputHeight: 48,
      inputText: 18,
      text: 18,
      lineHeight: 22,
      padding: 16,
    },
  };
  return sizeSets[sizeVariant];
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
 * @param props.onBlur Callback to be executed when the input stops being focused.
 * @param props.placeholder The placeholder text shown in the input field before the user begins typing.
 * @param props.errorMessage The message shown below the input field if the value is invalid.
 * @param props.state The current state of the TextInput. This can be none, valid, or error.
 * @param props.value The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
 * @param props.className className supplied to the TextInput container.
 * @param props.darkMode determines whether or not the component appears in dark mode.
 * @param props.sizeVariant determines the size of the text and the height of the input.
 */
const TextInput: React.ComponentType<
  React.PropsWithRef<AccessibleTextInputProps>
> = React.forwardRef(
  (
    {
      label,
      description,
      onChange,
      onBlur,
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
      sizeVariant = SizeVariant.Default,
      'aria-labelledby': ariaLabelledby,
      handleValidation,
      baseFontSize = BaseFontSize.Body1,
      ...rest
    }: AccessibleTextInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
    const mode = darkMode ? Mode.Dark : Mode.Light;
    const isControlled = typeof controlledValue === 'string';
    const [uncontrolledValue, setValue] = useState('');
    const value = isControlled ? controlledValue : uncontrolledValue;
    const id = useIdAllocator({ prefix: 'textinput', id: propsId });
    const sizeSet = getSizeSets(baseFontSize, sizeVariant);

    // Validation
    const validation = useValidation<HTMLInputElement>(handleValidation);

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = e => {
      if (onBlur) {
        onBlur(e);
      }

      validation.onBlur(e);
    };

    const onValueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      if (onChange) {
        onChange(e);
      }

      if (!isControlled) {
        setValue(e.target.value);
      }

      validation.onChange(e);
    };

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

    return (
      <div className={cx(textInputStyle, className)}>
        {label && (
          <Label
            darkMode={darkMode}
            htmlFor={id}
            disabled={disabled}
            className={css`
              font-size: ${sizeSet.text}px;
            `}
          >
            {label}
          </Label>
        )}
        {description && (
          <Description
            darkMode={darkMode}
            disabled={disabled}
            className={cx(
              css`
                font-size: ${sizeSet.text}px;
                line-height: ${sizeSet.lineHeight}px;
              `,
            )}
          >
            {description}
          </Description>
        )}
        <div className={inputContainerStyle}>
          <InteractionRing
            borderRadius={mode === 'dark' ? '4px' : '6px'}
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
                  font-size: ${sizeSet.inputText}px;
                  height: ${sizeSet.inputHeight}px;
                  padding-left: ${sizeSet.padding}px;
                  border-radius: 6px;
                  font-family: ${fontFamilies.default};

                  &::placeholder {
                    color: ${colorSets[mode].placeholderColor};
                    font-weight: normal;
                  }

                  &:focus {
                    border: 1px solid ${colorSets[mode].inputBackgroundColor};
                  }

                  &:disabled {
                    color: ${colorSets[mode].disabledColor};
                    background-color: ${colorSets[mode]
                      .disabledBackgroundColor};
                    border-color: ${colorSets[mode].disabledBorderColor};

                    &::placeholder {
                      color: ${colorSets[mode].disabledColor};
                    }

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
                getStatefulInputStyles({
                  state,
                  optional,
                  mode,
                  disabled,
                  sizeSet,
                }),
              )}
              value={value}
              required={!optional}
              disabled={disabled}
              placeholder={placeholder}
              onChange={onValueChange}
              onBlur={onBlurHandler}
              ref={forwardRef}
              id={id}
              autoComplete={disabled ? 'off' : rest?.autoComplete || 'on'}
              aria-invalid={state === 'error'}
            />
          </InteractionRing>

          <div
            {...iconSelectorProp.prop}
            className={cx(inputIconStyle, inputIconStyleSize[sizeVariant])}
          >
            {state === State.Valid && (
              <RenderedCheckmarkIcon
                role="presentation"
                className={css`
                  color: ${colorSets[mode].validIconColor};
                `}
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

            {state === State.None && !disabled && optional && (
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
                font-size: ${sizeSet.text}px;
                line-height: ${sizeSet.lineHeight}px;
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
  sizeVariant: PropTypes.oneOf(Object.values(SizeVariant)),
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
};

export default TextInput;
