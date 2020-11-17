import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  HTMLElementProps,
  createDataProp,
  IdAllocator,
} from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

export const Size = {
  Default: 'default',
  Small: 'small',
  XSmall: 'xsmall',
} as const;

export type Size = typeof Size[keyof typeof Size];

export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

const toggleInput = createDataProp('toggle-input');
const toggleGroove = createDataProp('toggle-groove');

const transitionInMS = 150;
export const interactionRingSize = 3;

const inputStyle = css`
  position: absolute;
  margin: 0;
  left: 0;
  top: 0;
  height: 0;
  width: 0;
  pointer-events: none;
  opacity: 0;
`;

// We use a div for the focus state rather than a pseudo-element
// because said pseudo-element would need to be on the label element
// which can't use the contained input's focus pseudo-class.
const focusStateStyle = css`
  transition: all ${transitionInMS}ms ease-in-out;
  position: absolute;
  top: -${interactionRingSize}px;
  bottom: -${interactionRingSize}px;
  left: -${interactionRingSize}px;
  right: -${interactionRingSize}px;
  border: ${interactionRingSize}px solid #63b0d0;
  border-radius: 50px;
  opacity: 0;
  transform: scale(0.8);

  ${toggleInput.selector}:focus ~ & {
    opacity: 1;
    transform: scale(1);
  }
`;

interface StateForStyle {
  size: Size;
  mode: Mode;
  checked: boolean;
  disabled: boolean;
}

const getContainerStyles = ({ size, disabled }: StateForStyle) => {
  const sizeStyle: { [K in Size]: string } = {
    [Size.Default]: css`
      height: 32px;
      width: 62px;
    `,

    [Size.Small]: css`
      height: 22px;
      width: 40px;
    `,

    [Size.XSmall]: css`
      height: 14px;
      width: 26px;
    `,
  };

  return cx(
    css`
      position: relative;
      display: inline-block;
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
    `,
    sizeStyle[size],
  );
};

const getGrooveStyles = ({ mode, checked, disabled }: StateForStyle) => {
  const colorSets: { [K in Mode]: string } = {
    [Mode.Light]: (() => {
      if (disabled) {
        return css`
          background-color: rgba(6, 22, 33, 0.09);
          border-color: rgba(6, 22, 33, 0.04);
        `;
      }

      const colorSet = css`
        box-shadow: inset 0 0 5px rgba(6, 22, 33, 0.1);
      `;

      if (checked) {
        return colorSet;
      }

      return cx(
        colorSet,
        css`
          background-color: rgba(61, 79, 88, 0.1);
          border-color: rgba(18, 22, 22, 0.03);
        `,
      );
    })(),

    [Mode.Dark]: (() => {
      if (disabled) {
        return css`
          background-color: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.1);
        `;
      }

      const colorSet = css`
        box-shadow: inset 0 0 10px rgba(6, 22, 33, 0.15);
      `;

      if (checked) {
        return colorSet;
      }

      return cx(
        colorSet,
        css`
          background-color: rgba(6, 22, 33, 0.4);
          border-color: rgba(6, 22, 33, 0.1);
        `,
      );
    })(),
  };

  const baseStyle = css`
    transition: ${transitionInMS}ms all ease-in-out, 0 background-color linear;
    display: inline-block;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid;

    // We're animating this pseudo-element in order to give the toggle groove
    // background an animation in and out.
    &:before {
      content: '';
      transition: ${transitionInMS}ms all ease-in-out;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 50px;
      background-color: #43b1e5;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
      opacity: 0;
      transform: scale(0.85);
    }
  `;

  if (disabled) {
    return cx(
      baseStyle,
      css`
        &:before {
          opacity: 0;
        }
      `,
      colorSets[mode],
    );
  }

  if (checked) {
    return cx(
      baseStyle,
      css`
        // We set background-color here to avoid a small issue with overflow clipping
        // that makes this look less seamless than it should.
        background-color: #43b1e5;
        border-color: #2e9ed3;
        transition-delay: ${transitionInMS}ms;

        &:before {
          transform: scale(1);
          opacity: 1;
        }
      `,
      colorSets[mode],
    );
  }

  return cx(baseStyle, colorSets[mode]);
};

const getSliderStyles = ({ size, mode, checked, disabled }: StateForStyle) => {
  const colorSets: { [K in Mode]: string } = {
    [Mode.Light]: (() => {
      const colorSet = css`
        &:before {
          background-image: linear-gradient(${uiColors.white}, #f6f6f6);
        }
      `;

      if (disabled) {
        return cx(
          colorSet,
          css`
            background-color: rgba(6, 22, 33, 0.09);
          `,
        );
      }

      return cx(
        colorSet,
        css`
          ${colorSet}
          background-color: white;
          box-shadow: 0 0 2px rgba(28, 192, 97, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.25), inset 0 -1px 0 #f1f1f1;
        `,
      );
    })(),

    [Mode.Dark]: (() => {
      if (disabled) {
        return css`
          background-color: rgba(255, 255, 255, 0.15);
          background-image: none;
        `;
      }

      if (checked) {
        return css`
          background-color: white;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.25),
            inset 0 -1px 0 #cdcdcd;

          &:before {
            opacity: 0;
          }

          &:after {
            opacity: 1;
          }
        `;
      }

      return css`
        background-color: #6f767b;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.25),
          inset 0 -1px 0 ${uiColors.gray.dark2};
      `;
    })(),
  };

  const transformBySize: { [K in Size]: number } = {
    default: 30,
    small: 18,
    xsmall: 12,
  };

  const sizes: { [K in Size]: number } = {
    default: 28,
    small: disabled ? 18 : 20,
    xsmall: disabled ? 10 : 12,
  };

  const baseStyles = css`
    transition: all ${transitionInMS}ms ease-in-out;
    border-radius: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow: hidden;
    height: ${sizes[size]}px;
    width: ${sizes[size]}px;
    transform: translate3d(${checked ? transformBySize[size] : 0}px, 0, 0);
  `;

  if (disabled) {
    return cx(
      baseStyles,
      css`
        left: 1px;

        &:before,
        &:after {
          display: none;
        }
      `,
      colorSets[mode],
    );
  }

  return cx(
    baseStyles,
    css`
      left: ${size === 'default' ? 1 : 0}px;

      &:before,
      &:after {
        content: '';
        transition: opacity ${transitionInMS}ms ease-in-out;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      &:before {
        opacity: 1;
      }

      &:after {
        opacity: 0;
        background-image: linear-gradient(
          rgba(220, 220, 220, 0),
          rgba(220, 220, 220, 0.5)
        );
      }
    `,
    colorSets[mode],
  );
};

const baseLabelStyle = css`
  transition: all ${transitionInMS}ms ease-in-out;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 11px;
  line-height: 11px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  color: white;
  user-select: none;
`;

const onLabelStyle = cx(
  baseLabelStyle,
  css`
    left: 9px;

    ${toggleInput.selector}:hover ~ ${toggleGroove.selector} > &,
    ${toggleInput.selector}:focus ~ ${toggleGroove.selector} > & {
      color: white;
    }
  `,
);

const offLabelStyle = cx(
  baseLabelStyle,
  css`
    right: 6px;
    color: ${uiColors.gray.base};
  `,
);

const getStatefulStyles = (states: StateForStyle) => ({
  slider: getSliderStyles(states),
  groove: getGrooveStyles(states),
  container: getContainerStyles(states),
});

interface BaseToggleProps {
  size?: Size;
  darkMode?: boolean;
}

type ToggleProps = BaseToggleProps &
  Omit<HTMLElementProps<'input', never>, keyof BaseToggleProps>;

const idAllocator = IdAllocator.create('toggle');

function Toggle({
  name,
  className,
  size = Size.Default,
  darkMode = false,
  disabled = false,
  onChange: onChangeProp = () => {},
  checked: checkedProp,
  id: idProp,
  ...rest
}: ToggleProps) {
  const [checked, setChecked] = useState(false);
  const toggleId = useMemo(() => idProp ?? idAllocator.generate(), [idProp]);
  const normalizedChecked = checkedProp || checked;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeProp) {
      onChangeProp(e);
    }

    if (checkedProp == null) {
      setChecked(e.target.checked);
    }
  };

  const statefulStyles = getStatefulStyles({
    disabled,
    size,
    checked: normalizedChecked,
    mode: darkMode ? Mode.Dark : Mode.Light,
  });

  return (
    <label
      className={cx(statefulStyles.container, className)}
      htmlFor={toggleId}
    >
      <input
        {...toggleInput.prop}
        {...rest}
        id={toggleId}
        className={inputStyle}
        type="checkbox"
        name={name}
        disabled={disabled}
        aria-disabled={disabled}
        checked={normalizedChecked}
        aria-checked={normalizedChecked}
        onChange={onChange}
      />

      <div className={focusStateStyle} />

      <div {...toggleGroove.prop} className={statefulStyles.groove}>
        {size === 'default' && !disabled && (
          <>
            <div className={onLabelStyle}>On</div>
            <div className={offLabelStyle}>Off</div>
          </>
        )}

        <div className={statefulStyles.slider} />
      </div>
    </label>
  );
}

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  size: PropTypes.oneOf(['default', 'small', 'xsmall']),
  darkMode: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Toggle;
