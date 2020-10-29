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
  transition: border-color 150ms ease-in-out

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

  // ${textAreaProp.selector} {
  //   &:hover ~ &,
  //   &:focus ~ & {
  //     transform: scale(1);
  //   }
  // }

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
  textArea: {
    backgroundColor: string;
    color: string;
    focusBorder: string;
  };
  disabled: {
    backgroundColor: string;
    color: string;
  };
  interactionRing: {
    backgroundColor: string;
    focusColor: string;
  };
  error: {
    border: string;
    message: string;
  };
}

const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    labelColor: uiColors.gray.dark2,
    descriptionColor: uiColors.gray.dark1,
    defaultBorder: uiColors.gray.light1,
    textArea: {
      color: uiColors.gray.dark3,
      backgroundColor: uiColors.white,
      focusBorder: uiColors.white,
    },
    disabled: {
      color: uiColors.gray.base,
      backgroundColor: uiColors.gray.light2,
    },
    interactionRing: {
      backgroundColor: uiColors.gray.light2,
      focusColor: '#9dd0e7',
    },
    error: {
      border: uiColors.red.base,
      message: uiColors.red.base,
    },
  },
  [Mode.Dark]: {
    labelColor: uiColors.white,
    descriptionColor: uiColors.gray.light1,
    defaultBorder: '#394F5A',
    textArea: {
      color: uiColors.white,
      backgroundColor: '#394F5A',
      focusBorder: '#394F5A',
    },
    disabled: {
      color: uiColors.gray.dark1,
      backgroundColor: '#263843',
    },
    interactionRing: {
      backgroundColor: uiColors.gray.dark1,
      focusColor: uiColors.blue.base,
    },
    error: {
      message: '#EF8D6F',
      border: '#5a3c3b',
    },
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
              color: ${colorSets[mode].textArea.color};
              background-color: ${colorSets[mode].textArea.backgroundColor};
              border: 1px solid ${colorSets[mode].defaultBorder};

              &:focus {
                border-color: ${colorSets[mode].textArea.focusBorder};
              }

              &:disabled {
                color: ${colorSets[mode].disabled.color};
                background-color: ${colorSets[mode].disabled.backgroundColor};
              }
            `,
            {
              [css`
                border: 1px solid ${colorSets[mode].error.border};
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
                background-color: ${colorSets[mode].interactionRing
                  .backgroundColor};

                ${textAreaProp.selector}:focus ~ & {
                  background-color: ${colorSets[mode].interactionRing
                    .focusColor};
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
              color: ${colorSets[mode].error.message};
            `,
          )}
        >
          <label>{errorMessage}</label>
        </div>
      )}
    </div>
  );
}
