import React, { useState, useMemo } from 'react';
import { IdAllocator, Either, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing, fontFamilies } from '@leafygreen-ui/tokens';

const idAllocator = IdAllocator.create('textarea');
const textAreaProp = createDataProp('area-selector');

export const State = {
  None: 'none',
  Error: 'error',
} as const;

export type State = typeof State[keyof typeof State];

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

const labelStyle = css`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  padding-bottom: 4px;
`;

const descriptionStyle = css`
  font-size: 14px;
  line-height: 16px;
  font-weight: normal;
  padding-bottom: 4px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const textAreaContainer = css`
  margin-top: 4px;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 0;
`;

const textAreaStyle = css`
  width: 100%;
  min-height: ${spacing[6]}px;
  resize: none;
  border-radius: 4px;
  padding-left: 12px;
  font-size: 14px;
  font-weight: normal;
  font-family: ${fontFamilies.default};
  z-index: 1;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const interactionRingStyles = css`
  transition: all 150ms ease-in-out;
  transform: scale(0.9, 0.8);
  border-radius: 7px;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
  pointer-events: none;
  background-color: pink;

  ${textAreaProp.selector}:hover ~ & {
    transform: scale(1);
  }

  ${textAreaProp.selector}:focus ~ & {
    transform: scale(1);
  }
`;

const errorMessageStyle = css`
  font-size: 14px;
  height: 20px;
  padding-top: 4px;
  font-weight: normal;
`;

interface ColorSets {
  labelColor: string;
  descriptionColor: string;
  textAreaBackgroundColor: string;
  textAreaColor: string;
  disabledBackgroundColor: string;
  disabledColor: string;
  interactionRing: string;
  interactionRingFocus: string;
  errorBorder: string;
  errorMessage: string;
}

const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    labelColor: uiColors.gray.dark2,
    descriptionColor: uiColors.gray.dark1,
    textAreaColor: uiColors.gray.dark3,
    textAreaBackgroundColor: uiColors.white,
    disabledColor: uiColors.gray.base,
    disabledBackgroundColor: uiColors.gray.light2,
    interactionRing: uiColors.gray.light2,
    interactionRingFocus: '#9dd0e7',
    errorBorder: uiColors.red.base,
    errorMessage: uiColors.red.base,
  },
  [Mode.Dark]: {
    labelColor: uiColors.white,
    descriptionColor: uiColors.gray.light1,
    textAreaColor: uiColors.white,
    textAreaBackgroundColor: '#394F5A',
    disabledColor: uiColors.gray.dark1,
    disabledBackgroundColor: '#263843',
    interactionRing: uiColors.gray.dark1,
    interactionRingFocus: uiColors.blue.base,
    errorBorder: '#5a3c3b',
    errorMessage: '#EF8D6F',
  },
};

type BaseTextAreaProps = JSX.IntrinsicElements['textarea'] & {
  id?: string;
  darkMode?: boolean;
  label: string;
  description?: string;
  state?: State;
  errorMessage?: string;
};

type AriaLabels = 'label' | 'aria-labelledby';
type TextAreaProps = Either<BaseTextAreaProps, AriaLabels>;

export default function TextArea({
  label,
  description,
  className,
  errorMessage,
  darkMode = false,
  disabled = false,
  state = State.None,
  id: idProp,
  value: controlledValue,
  onChange,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: TextAreaProps) {
  const id = useMemo(() => idProp ?? idAllocator.generate(), [idProp]);
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const isControlled = typeof controlledValue === 'string';
  const [uncontrolledValue, setValue] = useState('');
  const value = isControlled ? controlledValue : uncontrolledValue;

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (!isControlled) {
      setValue(e.target.value);
    }
  };

  if (!label && !ariaLabelledBy) {
    console.error(
      'For screen-reader accessibility, label or aria-labelledby must be provided to IconButton.',
    );
  }

  return (
    <div className={containerStyles}>
      {label && (
        <label
          htmlFor={id}
          className={cx(
            labelStyle,
            css`
              color: ${colorSets[mode].labelColor};
            `,
          )}
        >
          {label}
        </label>
      )}
      {description && (
        <p
          className={cx(
            descriptionStyle,
            css`
              color: ${colorSets[mode].descriptionColor};
            `,
          )}
        >
          {description}
        </p>
      )}
      <div className={textAreaContainer}>
        <textarea
          {...textAreaProp.prop}
          {...rest}
          title={label}
          id={id}
          className={cx(
            textAreaStyle,
            css`
              color: ${colorSets[mode].textAreaColor};
              background-color: ${colorSets[mode].textAreaBackgroundColor};

              &:disabled {
                color: ${colorSets[mode].disabledColor};
                background-color: ${colorSets[mode].disabledBackgroundColor};
              }
            `,
            {
              [css`
                border: 1px solid ${colorSets[mode].errorBorder};
              `]: state === State.Error,
              [css`
                background-color: #5a3c3b;
              `]: state === State.Error && darkMode,
            },
            className,
          )}
          disabled={disabled}
          onChange={onValueChange}
          value={value}
        />

        {!disabled && (
          <div
            className={cx(
              interactionRingStyles,
              css`
                background-color: ${colorSets[mode].interactionRing};

                ${textAreaProp.selector}:focus ~ & {
                  background-color: ${colorSets[mode].interactionRingFocus};
                }
              `,
            )}
          />
        )}
      </div>
      {!disabled && state === State.Error && errorMessage && (
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
}
