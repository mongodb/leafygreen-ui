import React, { useState } from 'react';
import { Either, HTMLElementProps } from '@leafygreen-ui/lib';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing, fontFamilies } from '@leafygreen-ui/tokens';
import { useIdAllocator, useValidation } from '@leafygreen-ui/hooks';
import { Description, Label } from '@leafygreen-ui/typography';

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
        border-color: ${uiColors.white}; // same as background color
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
        border-color: #394f5a; // same as background color
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

type BaseTextAreaProps = HTMLElementProps<'textarea', HTMLTextAreaElement> & {
  id?: string;
  darkMode?: boolean;
  label?: string | null;
  description?: string;
  state?: State;
  errorMessage?: string;
  handleValidation?: (value: string) => void;
};

type AriaLabels = 'label' | 'aria-labelledby';
type TextAreaProps = Either<BaseTextAreaProps, AriaLabels>;

const TextArea: React.ComponentType<
  React.PropsWithRef<TextAreaProps>
> = React.forwardRef(function TextArea(
  {
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
    handleValidation,
    'aria-labelledby': ariaLabelledby,
    ...rest
  }: TextAreaProps,
  forwardedRef: React.Ref<HTMLTextAreaElement>,
) {
  const id = useIdAllocator({ prefix: 'textarea', id: idProp });
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

  if (!label && !ariaLabelledby) {
    console.error(
      'For screen-reader accessibility, label or aria-labelledby must be provided to TextArea.',
    );
  }

  // Validation
  const { handleBlur, handleKeyPress } = useValidation<HTMLTextAreaElement>(
    handleValidation,
  );

  return (
    <div className={cx(containerStyles, className)}>
      {label && (
        <Label darkMode={darkMode} htmlFor={id} disabled={disabled}>
          {label}
        </Label>
      )}
      {description && (
        <Description darkMode={darkMode}>{description}</Description>
      )}
      <InteractionRing
        darkMode={darkMode}
        disabled={disabled}
        ignoreKeyboardContext={true}
      >
        <textarea
          {...rest}
          ref={forwardedRef}
          title={label != null ? label : undefined}
          id={id}
          className={cx(textAreaStyle, colorSets[mode].textArea, {
            [colorSets[mode].errorBorder]: state === State.Error,
            [css`
              background-color: #5a3c3b;
            `]: state === State.Error && darkMode,
          })}
          disabled={disabled}
          onChange={onValueChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
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
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
  id: PropTypes.string,
  darkMode: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  errorMessage: PropTypes.string,
  state: PropTypes.oneOf(Object.values(State)),
};

export default TextArea;
