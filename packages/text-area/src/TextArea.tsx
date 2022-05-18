import React, { useState } from 'react';
import { Either, HTMLElementProps } from '@leafygreen-ui/lib';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import {
  spacing,
  fontFamilies,
  BaseFontSize,
  focusRing,
  hoverRing,
} from '@leafygreen-ui/tokens';
import { useIdAllocator, useValidation } from '@leafygreen-ui/hooks';
import {
  Description,
  Label,
  bodyTypeScaleStyles,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';
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
  font-family: ${fontFamilies.default};
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
  border-radius: 6px;
  transition: 150ms ease-in-out;
  transition-property: border-color, box-shadow;
  margin-top: 2px;

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: ${focusRing[Mode.Light].input};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const errorMessageStyle = css`
  display: flex;
  height: 20px;
  padding-top: 5px;
  align-items: center;
  font-weight: normal;
`;

const errorMessageLabelStyles = css`
  line-height: 1;
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
      color: ${palette.gray.dark3};
      background-color: ${palette.white};
      border-color: ${palette.gray.base};

      &:hover:not(:disabled) {
        border-color: ${palette.gray.base};
        box-shadow: ${hoverRing[Mode.Light].gray};
      }

      &:disabled {
        color: ${palette.gray.base};
        background-color: ${palette.gray.light2};
        border-color: ${palette.gray.light1};
      }
    `,
    errorBorder: css`
      border-color: ${palette.red.base};

      &:hover:not(:disabled) {
        border-color: ${palette.red.base};
        box-shadow: ${hoverRing[Mode.Light].red};
      }

      &:disabled {
        border-color: ${palette.gray.light1};
      }
    `,
    errorMessage: css`
      color: ${palette.red.base};
    `,
    disabledText: css`
      color: ${palette.gray.base};
    `,
  },
  [Mode.Dark]: {
    textArea: css`
      color: ${palette.gray.light3};
      background-color: ${palette.gray.dark3};
      border-color: ${palette.gray.base};

      &:hover:not(:disabled) {
        border-color: ${palette.gray.base};
        box-shadow: ${hoverRing[Mode.Dark].gray};
      }

      &:disabled {
        color: ${palette.gray.dark1};
        background-color: ${palette.gray.dark3};
        border-color: ${palette.gray.dark2};
      }
    `,

    errorBorder: css`
      border-color: ${palette.red.light1};

      &:hover:not(:disabled) {
        border-color: ${palette.red.light1};
        box-shadow: ${hoverRing[Mode.Dark].red};
      }

      &:disabled {
        border-color: ${palette.gray.dark2};
      }
    `,

    errorMessage: css`
      color:${palette.red.light1};
    `,
    disabledText: css`
      color: ${palette.gray.base};
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
  /**
   * Callback to be executed when the input stops being focused.
   */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;

  /**
   * Callback to be executed when the value of the input field changes.
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;

  /**
   * Override the global `baseFontSize` set in LeafygreenProvider
   */
  baseFontSize?: BaseFontSize;
};

type AriaLabels = 'label' | 'aria-labelledby';
export type TextAreaProps = Either<BaseTextAreaProps, AriaLabels>;

const TextArea: React.ComponentType<React.PropsWithRef<TextAreaProps>> =
  React.forwardRef(function TextArea(
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
      onBlur,
      handleValidation,
      'aria-labelledby': ariaLabelledby,
      baseFontSize: baseFontSizeProp,
      ...rest
    }: TextAreaProps,
    forwardedRef: React.Ref<HTMLTextAreaElement>,
  ) {
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
    const errorBaseFontSize = useUpdatedBaseFontSize();
    const id = useIdAllocator({ prefix: 'textarea', id: idProp });
    const mode = darkMode ? Mode.Dark : Mode.Light;

    const isControlled = typeof controlledValue === 'string';
    const [uncontrolledValue, setValue] = useState('');
    const value = isControlled ? controlledValue : uncontrolledValue;

    // Validation
    const validation = useValidation<HTMLTextAreaElement>(handleValidation);

    const onBlurHandler: React.FocusEventHandler<HTMLTextAreaElement> = e => {
      if (onBlur) {
        onBlur(e);
      }

      validation.onBlur(e);
    };

    const onValueChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
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
          >
            {label}
          </Label>
        )}
        {description && (
          <Description
            darkMode={darkMode}
            disabled={disabled}
          >
            {description}
          </Description>
        )}
          <textarea
            {...rest}
            ref={forwardedRef}
            title={label != null ? label : undefined}
            id={id}
            className={cx(
              textAreaStyle,
              bodyTypeScaleStyles[baseFontSize],
              colorSets[mode].textArea,
              {
                [colorSets[mode].errorBorder]:
                  state === State.Error && !disabled,
              },
            )}
            disabled={disabled}
            onChange={onValueChange}
            onBlur={onBlurHandler}
            value={value}
          />
        {!disabled && state === State.Error && errorMessage && (
          <div className={cx(errorMessageStyle, colorSets[mode].errorMessage)}>
            <Warning className={errorIconStyle} />
            <label className={cx(bodyTypeScaleStyles[errorBaseFontSize], errorMessageLabelStyles)}>{errorMessage}</label>
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
