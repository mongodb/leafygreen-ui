import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

export const Size = {
  Default: 'default',
  Small: 'small',
  XSmall: 'xsmall',
} as const;

export type Size = typeof Size[keyof typeof Size];

export const Variant = {
  Default: 'default',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const toggleInput = createDataProp('toggle-input');
const toggleGroove = createDataProp('toggle-groove');

const transitionInMS = 150;

const inputStyle = css`
  margin: 0;
  position: absolute;
  left: 100%;
  top: 100%;
  pointer-events: none;
  opacity: 0;
`;

// We use a div for the focus state rather than a pseudo-element
// because said pseudo-element would need to be on the label element
// which can't use the contained input's focus pseudo-class.
const focusStateStyle = css`
  transition: all ${transitionInMS}ms ease-in-out;
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  border: 3px solid #63b0d0;
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
  variant: Variant;
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

const getGrooveStyles = ({ variant, checked, disabled }: StateForStyle) => {
  const variants: { [K in Variant]: string } = {
    [Variant.Default]: (() => {
      if (disabled) {
        return css`
          background-color: rgba(6, 22, 33, 0.09);
          border-color: rgba(6, 22, 33, 0.04);
        `;
      }

      const variantStyle = css`
        box-shadow: inset 0 0 5px rgba(6, 22, 33, 0.1);
      `;

      if (checked) {
        return variantStyle;
      }

      return cx(
        variantStyle,
        css`
          background-color: rgba(61, 79, 88, 0.1);
          border-color: rgba(18, 22, 22, 0.03);
        `,
      );
    })(),

    [Variant.Dark]: (() => {
      if (disabled) {
        return css`
          background-color: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.1);
        `;
      }

      const variantStyle = css`
        box-shadow: inset 0 0 10px rgba(6, 22, 33, 0.15);
      `;

      if (checked) {
        return variantStyle;
      }

      return cx(
        variantStyle,
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
      variants[variant],
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
      variants[variant],
    );
  }

  return cx(baseStyle, variants[variant]);
};

const getSliderStyles = ({
  size,
  variant,
  checked,
  disabled,
}: StateForStyle) => {
  const sliderVariants: { [K in Variant]: string } = {
    [Variant.Default]: (() => {
      const variantStyle = css`
        &:before {
          background-image: linear-gradient(${uiColors.white}, #f6f6f6);
        }
      `;

      if (disabled) {
        return cx(
          variantStyle,
          css`
            background-color: rgba(6, 22, 33, 0.09);
          `,
        );
      }

      return cx(
        variantStyle,
        css`
          ${variantStyle}
          background-color: white;
          box-shadow: 0 0 2px rgba(28, 192, 97, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.25), inset 0 -1px 0 #f1f1f1;
        `,
      );
    })(),

    [Variant.Dark]: (() => {
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
      sliderVariants[variant],
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
    sliderVariants[variant],
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

interface ToggleProps {
  size: Size;
  variant: Variant;
  checked?: boolean;
  disabled: boolean;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
}

interface ToggleState {
  checked: boolean;
}

export default class Toggle extends PureComponent<
  ToggleProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof ToggleProps>,
  ToggleState
> {
  static displayName = 'Toggle';

  static propTypes = {
    size: PropTypes.oneOf(['default', 'small', 'xsmall']),
    variant: PropTypes.oneOf(['default', 'dark']),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    size: Size.Default,
    variant: Variant.Default,
    disabled: false,
    className: '',
    onChange: () => {},
  };

  state: ToggleState = { checked: false };
  checkboxId = `toggle-${Math.floor(Math.random() * 10000000)}`;

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, checked } = this.props;

    if (onChange) {
      onChange(e);
    }

    if (checked == null) {
      this.setState({ checked: e.target.checked });
    }
  };
  render() {
    const checkboxId = this.props.id || this.checkboxId;
    const {
      name = checkboxId,
      checked = this.state.checked,
      className,
      disabled,
      size,
      variant,
      ...rest
    } = this.props;

    const statefulStyles = getStatefulStyles({
      checked,
      disabled,
      size,
      variant,
    });

    return (
      <label
        className={cx(statefulStyles.container, className)}
        htmlFor={checkboxId}
      >
        <input
          {...toggleInput.prop}
          {...rest}
          id={checkboxId}
          className={inputStyle}
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          aria-disabled={disabled}
          aria-checked={checked}
          onChange={this.onChange}
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
}
