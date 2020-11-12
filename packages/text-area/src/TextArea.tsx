import React, { useState, useMemo } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { IdAllocator, Either } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing, fontFamilies } from '@leafygreen-ui/tokens';
import { Description, Label } from '@leafygreen-ui/typography';

const idAllocator = IdAllocator.create('textarea');

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

const textAreaStyle = css`
  width: 100%;
  min-height: ${spacing[6]}px;
  resize: none;
  border-radius: 4px;
  margin: 0;
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

const errorMessageStyle = css`
  font-size: 14px;
  height: 20px;
  padding-top: 4px;
  font-weight: normal;
`;

interface ColorSets {
  defaultBorder: string;
  textArea: string;
  errorBorder: string;
  errorMessage: string;
}

const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
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
  },
  [Mode.Dark]: {
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
        <Label htmlFor={id} disabled={disabled}>
          {label}
        </Label>
      )}
      {description && <Description>{description}</Description>}
      <InteractionRing darkMode={darkMode} disabled={disabled}>
        <textarea
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
      </InteractionRing>
      {!disabled && state === State.Error && errorMessage && (
        <div className={cx(errorMessageStyle, colorSets[mode].errorMessage)}>
          <label>{errorMessage}</label>
        </div>
      )}
    </div>
  );
}
