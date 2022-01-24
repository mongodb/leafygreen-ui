import React, { useState } from 'react';
import { Either, HTMLElementProps } from '@leafygreen-ui/lib';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { spacing, fontFamilies } from '@leafygreen-ui/tokens';
import { useIdAllocator, useValidation } from '@leafygreen-ui/hooks';
import { Description, Label } from '@leafygreen-ui/typography';
import Warning from '@leafygreen-ui/icon/dist/Warning';

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
  margin: 0;
  padding: 10px 12px 1px 12px;
  font-size: 14px;
  font-weight: normal;
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
  display: flex;
  height: 20px;
  padding-top: 4px;
  font-weight: normal;
`;

const errorIconStyle = css`
  margin-right: 3px;
`;
interface ColorSets {
  textArea: string;
  errorBorder: string;
  errorMessage: string;
  disabledText: string;
}

const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    textArea: css`
      // TODO: Refresh - set one font family & size
      font-family: ${fontFamilies.default};
      font-size: 13px;
      color: ${palette.gray.dark3};
      background-color: ${palette.white};
      border-color: ${palette.gray.base};
      border-radius: 6px;

      &:focus {
        border-color: ${palette.white}; // same as background color
      }

      &:disabled {
        color: ${palette.gray.light1};
        background-color: ${palette.gray.light3};
        border-color: ${palette.gray.light2};
      }
    `,
    errorBorder: css`
      border-color: ${palette.red.base};
      &:disabled {
        border-color: ${palette.red.base};
      }
    `,
    errorMessage: css`
      color: ${palette.red.base};
      font-family: ${fontFamilies.default};
      font-size: 13px;
    `,
    disabledText: css`
      color: ${palette.gray.base};
    `,
  },
  [Mode.Dark]: {
    textArea: css`
      // TODO: Refresh - set one font family & size
      font-family: ${fontFamilies.legacy};
      font-size: 14px;
      color: ${uiColors.white};
      background-color: #394f5a;
      border-color: #394f5a;
      border-radius: 4px; // TODO: Refresh - remove this when darkMode is updated

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
      font-family: ${fontFamilies.legacy};
      font-size: 14px;
    `,
    disabledText: css`
      color: ${uiColors.gray.dark1};
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

  // Validation
  const validation = useValidation<HTMLTextAreaElement>(handleValidation);

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (!isControlled) {
      setValue(e.target.value);
    }

    validation.onChange(e);
  };

  if (!label && !ariaLabelledby) {
    console.error(
      'For screen-reader accessibility, label or aria-labelledby must be provided to TextArea.',
    );
  }

  return (
    <div className={cx(containerStyles, className)}>
      {label && (
        <Label
          darkMode={darkMode}
          htmlFor={id}
          disabled={disabled}
          // className={cx({
          //   [colorSets[mode].disabledText] : disabled
          // })}
        >
          {label}
        </Label>
      )}
      {description && (
        <Description
          darkMode={darkMode}
          disabled={disabled}
          className={cx({
            [css`
              padding-bottom: 4px;
            `]: !darkMode,
          })}
        >
          {description}
        </Description>
      )}
      <InteractionRing
        darkMode={darkMode}
        disabled={disabled}
        ignoreKeyboardContext={true}
        borderRadius={darkMode ? '4px' : '6px'} // TODO: Refresh - remove after darkmode is redesigned
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
          onBlur={validation.onBlur}
          value={value}
        />
      </InteractionRing>
      {!disabled && state === State.Error && errorMessage && (
        <div className={cx(errorMessageStyle, colorSets[mode].errorMessage)}>
          {
            // TODO: Refresh - remove conditional logic
            !darkMode && <Warning className={errorIconStyle} />
          }
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
