import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { createUniqueClassName, HTMLElementProps } from '@leafygreen-ui/lib';
import { uiColors, palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { RadioGroupProps } from './RadioGroup';
import { Size } from './types';

const inputWrapperClassName = createUniqueClassName('radio-input-wrapper');
const inputDisplayClassName = createUniqueClassName('radio-input-display');
const inputClassName = createUniqueClassName('input-element');

const Mode = {
  Dark: 'dark',
  Light: 'light',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

export { Mode };

const containerMargin = css`
  margin-top: 8px;
`;

const offsets = {
  [Mode.Light]: {
    [Size.XSmall]: css`
      margin-top: -3px;
      margin-left: 4px;
    `,
    [Size.Small]: css`
      margin-top: -3px;
      margin-left: 8px;
    `,
    [Size.Default]: css`
      margin-top: 0;
      margin-left: 8px;
    `,
  },
  [Mode.Dark]: {
    [Size.XSmall]: css`
      margin-top: -3px;
      margin-left: 4px;
    `,
    [Size.Small]: css`
      margin-top: -2px;
      margin-left: 8px;
    `,
    [Size.Default]: css`
      margin-top: 1px;
      margin-left: 8px;
    `,
  },
};

const labelColorSet = {
  [Mode.Light]: {
    base: css`
      color: ${palette.black};
      font-family: ${fontFamilies.default};
    `,

    disabled: css`
      cursor: not-allowed;
      color: ${palette.gray.dark1};
    `,
  },

  [Mode.Dark]: {
    base: css`
      color: ${uiColors.white};
    `,

    disabled: css`
      cursor: not-allowed;
      color: ${uiColors.gray.light1};
    `,
  },
};

const labelStyle = css`
  display: flex;
  line-height: 20px;
  cursor: pointer;
  align-items: flex-start;
  font-size: 13px;
  font-weight: 700;
`;

const inputColorSet = {
  [Mode.Light]: css`
    &:checked + .${inputWrapperClassName} .${inputDisplayClassName} {
      background-color: ${palette.blue.base};
      border-color: ${palette.blue.base};

      &:after {
        transform: scale(1);
      }
    }

    &:focus-visible + .${inputWrapperClassName} .${inputDisplayClassName} {
      box-shadow: 0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.blue.light1};
    }

    &:disabled + .${inputWrapperClassName} .${inputDisplayClassName} {
      border-color: ${palette.gray.light2};
      background-color: ${palette.gray.light3};

      &:after {
        transform: scale(1);
        background-color: ${palette.gray.light3};
      }
    }
  `,

  [Mode.Dark]: css`
    &:checked + .${inputWrapperClassName} .${inputDisplayClassName} {
      background-color: #43b1e5;
      border-color: #43b1e5;

      &:after {
        transform: scale(1);
      }
    }

    &:focus + div:before {
      transform: scale(1);
      opacity: 1;
      border-color: ${uiColors.blue.base};
    }

    &:disabled + .${inputWrapperClassName} .${inputDisplayClassName} {
      background-color: ${uiColors.gray.dark2};
      border-color: rgba(255, 255, 255, 0.15);
    }
  `,
};

const disabledChecked = {
  [Mode.Light]: css`
    &:disabled + .${inputWrapperClassName} .${inputDisplayClassName} {
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light2};

      &:after {
        background-color: ${palette.gray.light3};
        transform: scale(1);
      }
    }
  `,

  [Mode.Dark]: css`
    &:disabled + .${inputWrapperClassName} .${inputDisplayClassName} {
      border-color: ${uiColors.gray.dark2};

      &:after {
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(1);
      }
    }
  `,
};

const inputStyle = css`
  height: 0;
  width: 0;
  opacity: 0;
  margin: 0;
`;

const divColorSet = {
  [Mode.Light]: css`
    border-color: ${palette.gray.dark2};
    background-color: ${palette.white};
  `,
  [Mode.Dark]: css`
    border-color: ${uiColors.white};
    background-color: rgba(255, 255, 255, 0.2);
  `,
};

const divStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 100%;
  border-style: solid;

  &:before {
    content: '';
    position: absolute;
    border-radius: 100%;
  }

  &:after {
    content: '';
    background-color: white;
    border-radius: 100%;
    transform: scale(0);
  }

  .${inputClassName} {
    &:disabled + .${inputWrapperClassName} & {
      &:after {
        box-shadow: none;
      }
    }
  }
`;

const divSize: Omit<Record<Size, Record<Mode, string>>, 'xsmall'> = {
  [Size.Small]: {
    [Mode.Light]: css`
      border-width: 2px;

      &:after {
        width: 6px;
        height: 6px;
        transition: transform 0.15s cubic-bezier(0.16, 1.54, 0, 1.31),
          border-color 0.15s ease-in-out;
      }
    `,
    [Mode.Dark]: css`
      border-width: 2px;

      &:after {
        width: 4px;
        height: 4px;
        transition: transform 0.2s cubic-bezier(0.16, 1.54, 0, 1.31),
          border-color 0.15s ease-in-out;
      }
    `,
  },
  [Size.Default]: {
    [Mode.Light]: css`
      border-width: 3px;

      &:after {
        width: 8px;
        height: 8px;
        transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275),
          border-color 0.15s ease-in-out;
      }
    `,
    [Mode.Dark]: css`
      border-width: 2px;

      &:after {
        width: 8px;
        height: 8px;
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
          border-color 0.15s ease-in-out;
      }
    `,
  },
};

const radioBoxSize = {
  [Size.Small]: css`
    height: 14px;
    width: 14px;
  `,
  [Size.Default]: css`
    height: 20px;
    width: 20px;
  `,
};

const radioBoxStyle = css`
  position: relative;
  flex-shrink: 0;
`;

export interface RadioProps
  extends Omit<HTMLElementProps<'input'>, 'size'>,
    Pick<RadioGroupProps, 'darkMode' | 'size'> {
  /**
   * Used to determine what Radio is active.
   */
  value: string | number;
  /**
   * If RadioGroup is uncontrolled, the default property makes this Radio checked on the initial render.
   */
  default?: boolean;

  /**
   * Boolean that determines if the Radio is disabled.
   */
  disabled?: boolean;
  /**
   * Content that will appear inside of Radio.
   */
  children?: React.ReactNode;
}

/**
 * # Radio
 *
 * Radio component
 *
 * ```
  <Radio value='radio-1'>Radio 1</Radio>
```
 * @param props.disabled Boolean that determines if the Radio is disabled.
 * @param props.children Content that will appear inside of Radio.
 * @param props.value Used to determine what Radio is active.
 * @param props.id Id for Radio and respective label.
 * @param props.default If RadioGroup is uncontrolled, the default property makes this Radio checked on the initial render.
 * @param props.className className supplied to Radio container.
 * @param props.size Size of Radio buttons.
 */
function Radio({
  children,
  className,
  onChange = () => {},
  value,
  disabled = false,
  id,
  name,
  darkMode = false,
  checked,
  size = Size.Default,
  ...rest
}: RadioProps) {
  const normalizedSize =
    size === Size.Small || size === Size.XSmall ? Size.Small : Size.Default;

  const mode = darkMode ? Mode.Dark : Mode.Light;

  const [inputElement, setInputElement] = useState<HTMLElement | null>(null);

  return (
    <div className={containerMargin}>
      <label
        htmlFor={id}
        className={cx(
          labelStyle,
          labelColorSet[mode].base,
          {
            [css`
              font-size: 14px;
              font-weight: 400;
            `]: darkMode, // TODO: Refresh - remove when darkMode is updated
            [labelColorSet[mode].disabled]: disabled,
            [css`
              font-size: 12px;
            `]: size === Size.XSmall, // TODO: keeping this style until XS is deprecated
          },
          className,
        )}
      >
        <input
          {...rest}
          ref={setInputElement}
          checked={!!checked}
          id={id}
          name={name}
          type="radio"
          onChange={onChange}
          value={value}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
          className={cx(inputClassName, inputStyle, inputColorSet[mode], {
            [disabledChecked[mode]]: disabled && checked,
          })}
        />

        <InteractionRing
          darkMode={darkMode}
          disabled={disabled}
          focusTargetElement={inputElement}
          className={cx(
            inputWrapperClassName,
            radioBoxStyle,
            radioBoxSize[normalizedSize],
          )}
          borderRadius="100%"
          color={darkMode ? undefined : { focused: 'transparent' }} // TODO: Refresh - overriding the focus style for light mode
        >
          <div
            className={cx(
              inputDisplayClassName,
              divStyle,
              divColorSet[mode],
              divSize[normalizedSize][mode],
              {
                [css`
                  transition: background-color 0.15s ease-in-out;

                  &:before {
                    top: -5px;
                    bottom: -5px;
                    left: -5px;
                    right: -5px;
                  }

                  &:after {
                    box-shadow: inset 0 -1px 0 0 #f1f1f1,
                      0 1px 0 0 rgba(0, 0, 0, 0.08),
                      0 1px 1px 0 rgba(6, 22, 33, 0.22);
                  }
                `]: darkMode, // TODO: Refresh - remove when darkMode is updated
              },
            )}
          />
        </InteractionRing>

        <div className={cx(offsets[mode][size])}>{children}</div>
      </label>
    </div>
  );
}

Radio.displayName = 'Radio';

Radio.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'default']),
  default: PropTypes.bool,
  darkMode: PropTypes.bool,
};

export default Radio;
