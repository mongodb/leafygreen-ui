import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { createDataProp, HTMLElementProps } from '@leafygreen-ui/lib';
import { uiColors, palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { RadioGroupProps } from './RadioGroup';
import { Size } from './types';

const inputDisplay = createDataProp('radio-input-display');
const inputDisplayWrapper = createDataProp('radio-input-display-wrapper');
const inputDataProp = createDataProp('input-element');

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
    `,
    [Size.Small]: css`
      margin-top: -3px;
    `,
    [Size.Default]: css`
      margin-top: 0;
    `,
  },
  [Mode.Dark]: {
    [Size.XSmall]: css`
      margin-top: -3px;
    `,
    [Size.Small]: css`
      margin-top: -2px;
    `,
    [Size.Default]: css`
      margin-top: 1px;
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

// Note colors are not in our palette
const inputColorSet = {
  [Mode.Light]: css`
    &:checked + ${inputDisplayWrapper.selector} ${inputDisplay.selector} {
      background-color: ${palette.blue.base};
      border-color: ${palette.blue.base};

      &:after {
        transform: scale(1);
      }
    }

    &:focus-visible + div div {
      box-shadow: 0 0 0 2px ${palette.white}, 0 0 0 4px ${palette.blue.light1};
    }

    &:focus + div:before {
      transform: scale(1);
      opacity: 1;
      border-color: ${uiColors.blue.light1};
    }

    &:disabled + ${inputDisplayWrapper.selector} ${inputDisplay.selector} {
      border-color: ${palette.gray.light2};
      background-color: ${palette.gray.light3};

      &:after {
        transform: scale(1);
        background-color: ${palette.gray.light3};
      }
    }
  `,

  [Mode.Dark]: css`
    &:checked + ${inputDisplayWrapper.selector} ${inputDisplay.selector} {
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

    &:disabled + ${inputDisplayWrapper.selector} ${inputDisplay.selector} {
      background-color: ${uiColors.gray.dark2};
      border-color: rgba(255, 255, 255, 0.15);
    }
  `,
};

const disabledChecked = {
  [Mode.Light]: css`
    &:disabled + ${inputDisplayWrapper.selector} ${inputDisplay.selector} {
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light2};

      &:after {
        background-color: ${palette.gray.light3};
        transform: scale(1);
      }
    }
  `,

  [Mode.Dark]: css`
    &:disabled + ${inputDisplayWrapper.selector} ${inputDisplay.selector} {
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
`;

const divColorSet = (mode: Mode, size: Size) => {
  const colorSets = {
    [Mode.Light]: css`
      border: ${size === Size.Default ? `3px` : `2px`} solid
        ${palette.gray.dark2};
      background-color: ${palette.white};
    `,

    [Mode.Dark]: css`
      border: 2px solid ${uiColors.white};
      background-color: rgba(255, 255, 255, 0.2);
    `,
  };
  return colorSets[mode];
};

const divStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: background-color 0.15s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 100%;

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

  ${inputDataProp.selector}:disabled + ${inputDisplayWrapper.selector} & {
    &:after {
      box-shadow: none;
    }
  }
`;

const divSize: Omit<Record<Size, Record<Mode, string>>, 'xsmall'> = {
  [Size.Small]: {
    [Mode.Light]: css`
      &:after {
        width: 6px;
        height: 6px;
        transition: transform 0.2s cubic-bezier(0.16, 1.54, 0, 1.31),
          border-color 0.15s ease-in-out;
      }
    `,
    [Mode.Dark]: css`
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
      &:after {
        width: 8px;
        height: 8px;
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
          border-color 0.15s ease-in-out;
      }
    `,
    [Mode.Dark]: css`
      &:after {
        width: 8px;
        height: 8px;s
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

export type RadioProps = Omit<HTMLElementProps<'input', never>, 'size'> &
  Pick<RadioGroupProps, 'darkMode' | 'size'> & {
    default?: boolean;
    id?: string | number;
  };

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
            `]: darkMode,
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
          {...inputDataProp.prop}
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
          className={cx(inputStyle, inputColorSet[mode], {
            [disabledChecked[mode]]: disabled && checked,
          })}
        />

        <InteractionRing
          darkMode={darkMode}
          disabled={disabled}
          focusTargetElement={inputElement}
          className={cx(radioBoxStyle, radioBoxSize[normalizedSize])}
          borderRadius="100%"
          color={!darkMode ? { focused: 'transparent' } : undefined} // TODO: Refresh - overriding the focus style for light mode
          {...inputDisplayWrapper.prop}
        >
          <div
            {...inputDisplay.prop}
            className={cx(
              divStyle,
              divColorSet(mode, normalizedSize),
              divSize[normalizedSize][mode],
              {
                [css`
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
                `]: darkMode,
              },
            )}
          />
        </InteractionRing>

        <div
          className={cx(
            css`
              margin-left: ${size === Size.XSmall && darkMode === true
                ? 4
                : 8}px;
            `,
            offsets[mode][size],
          )}
        >
          {children}
        </div>
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
