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
  padding: 10px 12px 1px 12px;
  font-size: 14px;
  font-weight: normal;
  font-family: ${fontFamilies.default};
  line-height: 16px;
  z-index: 1;
  border: 1px solid;
  transition: border-color 150ms ease-in-out;

  &:focus {
    outline: none;
    border: 1px solid;
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

  ${textAreaProp.selector}:focus ~ & {
    transform: scale(1);
  }

  ${textAreaProp.selector}:hover ~ & {
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
  defaultBorder: string;
  textArea: string;
  errorBorder: string;
  errorMessage: string;
  interactionRing: string;
}

const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    labelColor: css`
      color: ${uiColors.gray.dark2};
    `,
    descriptionColor: css`
      color: ${uiColors.gray.dark1};
    `,
    defaultBorder: css`
      border-color: ${uiColors.gray.light1};
    `,
    textArea: css`
      color: ${uiColors.gray.dark3};
      background-color: ${uiColors.white};
      border-color: ${uiColors.gray.light1};

      &:focus {
        border-color: ${uiColors.white};
      }

      &:disabled {
        color: ${uiColors.gray.base};
        background-color: ${uiColors.gray.light2};
      }
    `,
    errorBorder: css`
      border-color: ${uiColors.red.base};
    `,
    errorMessage: css`
      color: ${uiColors.red.base};
    `,
    interactionRing: css`
      background-color: ${uiColors.gray.light2};

      ${textAreaProp.selector}:focus ~ & {
        background-color: ${uiColors.blue.light1};
      }
    `,
  },
  [Mode.Dark]: {
    labelColor: css`
      color: ${uiColors.white};
    `,

    descriptionColor: css`
      color: ${uiColors.gray.light1};
    `,

    defaultBorder: css`
      border-color: #394f5a;
    `,

    textArea: css`
      color: ${uiColors.white};
      background-color: #394f5a;
      border-color: #394f5a;

      &:focus {
        border-color: #394f5a;
      }

      &:disabled {
        color: ${uiColors.gray.dark1};
        background-color: #263843;
      }
    `,

    errorBorder: css`
      border-color: #ef8d6f;
    `,

    errorMessage: css`
      color: #ef8d6f;
    `,

    interactionRing: css`
      background-color: ${uiColors.gray.dark1};

      ${textAreaProp.selector}:focus ~ & {
        background-color: ${uiColors.blue.base};
      }
    `,
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
          className={cx(labelStyle, colorSets[mode].labelColor)}
        >
          {label}
        </label>
      )}
      {description && (
        <p className={cx(descriptionStyle, colorSets[mode].descriptionColor)}>
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
            colorSets[mode].textArea,
            {
              [colorSets[mode].errorBorder]: state === State.Error,
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
              colorSets[mode].interactionRing,
            )}
          />
        )}
      </div>
      {!disabled && state === State.Error && errorMessage && (
        <div className={cx(errorMessageStyle, colorSets[mode].errorMessage)}>
          <label>{errorMessage}</label>
        </div>
      )}
    </div>
  );
}
