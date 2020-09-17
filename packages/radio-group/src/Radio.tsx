import React from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { RadioGroupProps } from './RadioGroup';
<<<<<<< HEAD
import { Variant, Size } from './types';
=======
import { Size } from './types';
>>>>>>> origin

const styledDiv = createDataProp('styled-div');
const inputDisplayWrapper = createDataProp('input-display-wrapper');
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
  [Size.XSmall]: css`
    margin-top: -3px;
  `,
  [Size.Small]: css`
    margin-top: -2px;
  `,
  [Size.Default]: css`
    margin-top: 1px;
  `,
};

const labelColorSet = {
  [Mode.Light]: {
    base: css`
      color: ${uiColors.gray.dark2};
    `,

    disabled: css`
      color ${uiColors.gray.base};
    `,
  },

  [Mode.Dark]: {
    base: css`
      color: ${uiColors.white};
    `,

    disabled: css`
      color: ${uiColors.gray.light1};
    `,
  },
};

const labelStyle = css`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  line-height: 20px;
`;

// Note colors are not in our palette
const inputColorSet = {
  [Mode.Light]: css`
    &:checked + ${inputDisplayWrapper.selector} > ${styledDiv.selector} {
      background-color: #2798bd;
      border-color: #2798bd;

      &:after {
        transform: scale(1);
      }
    }

    &:focus + ${inputDisplayWrapper.selector}:before {
      transform: scale(1);
      opacity: 1;
      border-color: #9dd0e7;
    }

    &:disabled + ${inputDisplayWrapper.selector} > ${styledDiv.selector} {
      border-color: ${uiColors.gray.light1};
      background-color: ${uiColors.gray.light2};
    }
  `,

  [Mode.Dark]: css`
    &:checked + ${inputDisplayWrapper.selector} > ${styledDiv.selector} {
      background-color: #43b1e5;
      border-color: #43b1e5;

      &:after {
        transform: scale(1);
      }
    }

    &:focus + ${inputDisplayWrapper.selector}:before {
      transform: scale(1);
      opacity: 1;
      border-color: ${uiColors.blue.base};
    }

    &:disabled + ${inputDisplayWrapper.selector} > ${styledDiv.selector} {
      background-color: ${uiColors.gray.dark2};
      border-color: rgba(255, 255, 255, 0.15);
    }
  `,
};

const disabledChecked = {
  [Mode.Light]: css`
    &:disabled + ${inputDisplayWrapper.selector} > ${styledDiv.selector} {
      background-color: ${uiColors.gray.light1};
      border-color: ${uiColors.gray.light1};

      &:after {
        background-color: ${uiColors.gray.light2};
        transform: scale(1);
      }
    }
  `,

  [Mode.Dark]: css`
    &:disabled + ${inputDisplayWrapper.selector} > ${styledDiv.selector} {
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

const divColorSet = {
  [Mode.Light]: css`
    border: 2px solid ${uiColors.gray.dark1};
    background-color: rgba(255, 255, 255, 0.31);
  `,

  [Mode.Dark]: css`
    border: 2px solid ${uiColors.white};
    background-color: rgba(255, 255, 255, 0.2);
  `,
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
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
  }

  &:after {
    content: '';
    box-shadow: inset 0 -1px 0 0 #f1f1f1, 0 1px 0 0 rgba(0, 0, 0, 0.08),
      0 1px 1px 0 rgba(6, 22, 33, 0.22);
    background-color: white;
    border-radius: 100%;
    transform: scale(0);
  }

  ${inputDataProp.selector}:disabled + ${inputDisplayWrapper.selector} > & {
    cursor: not-allowed;

    &:after {
      box-shadow: none;
    }
  }
`;

const divSize = {
  [Size.Small]: css`
    &:after {
      width: 4px;
      height: 4px;
      transition: transform 0.2s cubic-bezier(0.16, 1.54, 0, 1.31),
        border-color 0.15s ease-in-out;
    }
  `,
  [Size.Default]: css`
    &:after {
      width: 8px;
      height: 8px;
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
        border-color 0.15s ease-in-out;
    }
  `,
};

const interactionRingSize = {
  [Size.Small]: css`
    height: 14px;
    width: 14px;
  `,
  [Size.Default]: css`
    height: 20px;
    width: 20px;
  `,
};

const interactionRing = css`
  position: relative;
  flex-shrink: 0;

  &:before {
    content: '';
    transition: all 0.2s ease-in-out;
    position: absolute;
    top: -3px;
    bottom: -3px;
    left: -3px;
    right: -3px;
    transform: scale(0.8);
    opacity: 0;
    border-radius: 100%;
    display: flex;
    flex-shrink: 0;
    border: 3px solid transparent;
  }

  &:hover:before {
    transform: scale(1);
    opacity: 1;
  }

  ${inputDataProp.selector}:disabled + &:before {
    opacity: 0;
  }
`;

const interactionRingHoverStyles = {
  [Mode.Light]: css`
    &:before {
      border-color: rgba(184, 196, 194, 0.3);
    }
  `,

  [Mode.Dark]: css`
    &:before {
      border-color: rgba(255, 255, 255, 0.2);
    }
  `,
};

const labelMargin = css`
  margin-left: 8px;
`;

export type RadioProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> &
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
  onChange,
  value,
  disabled,
  id,
  name,
  darkMode,
  checked = false,
  size = Size.Default,
  ...rest
}: RadioProps) {
  const normalizedSize =
    size === Size.Small || Size.XSmall ? Size.Small : Size.Default;
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <div className={containerMargin}>
      <label
        htmlFor={id}
        className={cx(
          labelStyle,
          labelColorSet[mode].base,
          { [labelColorSet[mode].disabled]: disabled, [css`
              font-size: 12px;
            `]: size === Size.XSmall, },
          className,
        )}
      >
        <input
          {...rest}
          {...inputDataProp.prop}
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

        <div
          {...inputDisplayWrapper.prop}
          className={cx(
            interactionRing,
            interactionRingHoverStyles[mode],
            interactionRingSize[normalizedSize],
          )}
        >
          <div
            {...styledDiv.prop}
            className={cx(divStyle, divColorSet[mode], divSize[normalizedSize])}
          />
        </div>

        <div className={cx(labelMargin, offsets[size])}>{children}</div>
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
  variant: PropTypes.oneOf(['default', 'light']),
  size: PropTypes.oneOf(['small', 'default']),
  default: PropTypes.bool,
};

export default Radio;
