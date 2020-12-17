import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { transparentize } from 'polished';
import Box, { ExtendableBox } from '@leafygreen-ui/box';

export const Variant = {
  Default: 'default',
  Primary: 'primary',
  Info: 'info',
  Danger: 'danger',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Normal: 'normal',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

const buttonVariants: { readonly [K in Variant]: string } = {
  [Variant.Default]: css`
    color: ${uiColors.gray.dark2};
    border: 1px solid ${uiColors.gray.light1};
    background-color: ${uiColors.gray.light3};
    background-image: linear-gradient(
      ${uiColors.white},
      ${uiColors.gray.light2}
    );
    box-shadow: inset 0 -1px 0 ${uiColors.gray.light1};

    &:before {
      border-color: ${uiColors.gray.light1};
      background-color: ${uiColors.gray.light2};
      background-image: linear-gradient(${uiColors.gray.light3}, #dde4e2);
      box-shadow: inset 0 -1px 0 ${uiColors.gray.light1},
        0 1px 4px ${transparentize(0.9, uiColors.black)};
    }

    &:after {
      border-color: ${uiColors.gray.light1};
      background-color: ${uiColors.gray.light3};
      background-image: linear-gradient(#dde4e2, ${uiColors.gray.light3});
      box-shadow: inset 0 2px 2px ${transparentize(0.9, uiColors.black)};
    }

    &:focus,
    &:hover {
      color: ${uiColors.gray.dark2};
    }
  `,

  [Variant.Primary]: css`
    color: ${uiColors.white};
    border: 1px solid #158242;
    background-color: ${uiColors.green.base};
    background-image: linear-gradient(${uiColors.green.base}, #18964c);
    box-shadow: inset 0 -1px 0 #158242;

    &:before {
      background-color: #129f4c;
      background-image: linear-gradient(#129f4c, #148040);
      box-shadow: 0 1px 4px ${transparentize(0.9, uiColors.black)},
        inset 0 -1px 0 #158242;
    }

    &:after {
      background-color: ${uiColors.green.base};
      background-image: linear-gradient(#148040, #129f4c);
      box-shadow: inset 0 2px 2px ${uiColors.green.dark2};
    }

    &:focus,
    &:hover {
      color: ${uiColors.white};
    }
  `,

  [Variant.Info]: css`
    color: ${uiColors.green.base};
    background-color: transparent;
    background-image: none;
    border: 1px solid ${uiColors.green.base};
    box-shadow: none;

    &:before {
      background-color: #129f4c;
      background-image: linear-gradient(#129f4c, #148040);
      box-shadow: 0 1px 4px ${transparentize(0.9, uiColors.black)},
        inset 0 -1px 0 #158242;
    }

    &:after {
      background-color: ${uiColors.green.base};
      background-image: linear-gradient(#148040, #129f4c);
      box-shadow: inset 0 2px 2px ${uiColors.green.dark2};
    }

    &:not(:disabled) {
      &:focus,
      &:hover,
      &:active {
        border-color: #158242;
        color: ${uiColors.white};
      }
    }
  `,

  [Variant.Danger]: css`
    color: ${uiColors.white};
    border: 1px solid ${uiColors.red.dark2};
    background-color: ${uiColors.red.base};
    background-image: linear-gradient(#e45b26, #b63016);
    box-shadow: inset 0 -1px 0 0 ${uiColors.red.dark2};

    &:before {
      background-color: ${uiColors.red.dark2};
      background-image: linear-gradient(#e45b26, ${uiColors.red.dark2});
      box-shadow: 0 1px 4px ${transparentize(0.9, uiColors.black)},
        inset 0 -1px 0 ${uiColors.red.dark2};
    }

    &:after {
      background-color: ${uiColors.red.dark2};
      background-image: linear-gradient(#ad231b, #e45b26);
      box-shadow: inset 0 2px 2px ${uiColors.red.dark2};
    }

    &:focus,
    &:hover {
      color: ${uiColors.white};
    }
  `,

  [Variant.Dark]: css`
    color: ${uiColors.white};
    border: 1px solid ${uiColors.gray.dark2};
    background-color: ${uiColors.gray.dark1};
    background-image: linear-gradient(
      ${uiColors.gray.base},
      ${uiColors.gray.dark1}
    );
    box-shadow: inset 0 -1px 0 ${uiColors.gray.dark2};

    &:before {
      background-image: linear-gradient(
        ${uiColors.gray.base},
        ${uiColors.gray.dark2}
      );
      box-shadow: 0 1px 4px ${transparentize(0.9, uiColors.black)},
        inset 0 -1px 0 ${uiColors.gray.dark2};
    }

    &:after {
      background-image: linear-gradient(
        ${uiColors.gray.dark1},
        ${uiColors.gray.base}
      );
      box-shadow: inset 0 2px 2px ${uiColors.gray.dark2};
    }

    &:focus,
    &:hover {
      color: ${uiColors.white};
    }
  `,
};

const interactionRingSizes: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
  `,

  [Size.Small]: css`
    height: 25px;
  `,

  [Size.Normal]: css`
    height: 32px;
  `,

  [Size.Large]: css`
    height: 48px;
  `,
} as const;

const buttonSizes: Record<Size, string> = {
  [Size.XSmall]: css`
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
  `,

  [Size.Small]: css`
    font-size: 14px;
  `,

  [Size.Normal]: css`
    font-size: 14px;
  `,

  [Size.Large]: css`
    font-size: 16px;
  `,
};

const spanSizes: Record<Size, string> = {
  [Size.XSmall]: css`
    padding: 0 8px;
  `,

  [Size.Small]: css`
    padding: 0 10px;
  `,

  [Size.Normal]: css`
    padding: 0 12px;
  `,

  [Size.Large]: css`
    padding: 0 20px;
  `,
} as const;

const glyphMargins: Record<Size, string> = {
  [Size.XSmall]: css`
    margin-right: 2px;
  `,

  [Size.Small]: css`
    margin-right: 4px;
  `,

  [Size.Normal]: css`
    margin-right: 5px;
  `,

  [Size.Large]: css`
    margin-right: 8px;
  `,
} as const;

const focusStyle = css`
  &:focus {
    text-decoration: none;

    &:not(:disabled):before {
      opacity: 1;
    }
  }
`;

const baseStyle = css`
  position: relative;
  // Establishes the root element as a new stacking context
  // so that the z-index of the span within the button doesn't
  // appear above other elements on the page that it shouldn't.
  z-index: 0;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  align-items: stretch;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
  transition: all 120ms ease;
  user-select: none;
  padding: 0;

  &:focus {
    outline: none;
  }

  &:hover {
    text-decoration: none;
  }

  // We're using CSS pseudo elements here in order to
  // transition the gradients between button pseudo classes.
  &:before,
  &:after {
    content: '';
    transition: 0.15s opacity ease-in-out;
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 2px;
  }

  &:not(:disabled) {
    &:focus,
    &:hover {
      &:before {
        opacity: 1;
      }
    }

    &:active:after {
      opacity: 1;
    }
  }
`;

const disabledStyle = css`
  color: ${uiColors.gray.base};
  border-color: ${uiColors.gray.light1};
  background-color: ${uiColors.gray.light2};
  background-image: none;
  box-shadow: none;
  pointer-events: none;
`;

interface BaseButtonProps {
  disabled?: boolean;
  darkMode?: boolean;
  variant?: Variant;
  size?: Size;
  glyph?: React.ReactElement;
  className?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  href?: string;
  forceState?: {
    focused?: boolean;
    active?: boolean;
    // Supporting "hovered" requires factoring out all the &:hover
    // styles from the the base style and each variant's styles
  };
}

const Button: ExtendableBox<
  BaseButtonProps & { ref?: React.Ref<any> },
  'button'
> = React.forwardRef(
  (
    {
      className,
      borderRadius,
      children,
      disabled = false,
      darkMode = false,
      variant = Variant.Default,
      size = Size.Normal,
      glyph,
      forceState = {},
      ...rest
    }: BaseButtonProps,
    ref: React.Ref<any>,
  ) => {
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();

    const commonProps = {
      ref,
      className: cx(
        baseStyle,
        buttonSizes[size],
        buttonVariants[variant],
        { [disabledStyle]: disabled },
        { [focusStyle]: showFocus },
        {
          [css`
            border-radius: ${borderRadius};

            &:before,
            &:after {
              border-radius: calc(${borderRadius} - 1px);
            }
          `]: borderRadius !== undefined,
        },
        {
          [css`
            &:before {
              opacity: 1;
            }
          `]: forceState.focused === true,
        },
        {
          [css`
            &:after {
              opacity: 1;
            }
          `]: forceState.active === true,
        },
      ),
      // only add a disabled prop if not an anchor
      ...(typeof rest.href !== 'string' && { disabled }),
      'aria-disabled': disabled,
    };

    const spanStyle = css`
      // Usually for this to take effect, you would need the element to be
      /* ￿positioned￿. Due to an obscure part of CSS spec, flex children */
      // respect z-index without the position property being set.
      //
      // https://www.w3.org/TR/css-flexbox-1/#painting
      z-index: 1;
      display: inline-flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    `;

    const modifiedGlyph =
      glyph && children
        ? React.cloneElement(glyph, {
            className: cx({ [glyphMargins[size]]: glyph != null }),
          })
        : glyph;

    const content = (
      <span className={cx(spanStyle, spanSizes[size])}>
        {modifiedGlyph}
        {children}
      </span>
    );

    let button;

    if (typeof rest.href === 'string') {
      button = (
        <Box as="a" {...commonProps} {...rest}>
          {content}
        </Box>
      );
    } else {
      // we give button a default "as" value based on the `href` prop, if a custom
      // "as" prop is supplied, it will overwrite this value through {...rest}
      button = (
        <Box as="button" type="button" {...commonProps} {...rest}>
          {content}
        </Box>
      );
    }

    return (
      <InteractionRing
        className={cx(interactionRingSizes[size], className)}
        borderRadius={borderRadius ?? '3px'}
        darkMode={darkMode}
        disabled={disabled}
        forceState={forceState}
      >
        {button}
      </InteractionRing>
    );
  },
);

Button.displayName = 'Button';

Button.propTypes = {
  darkMode: PropTypes.bool,
  variant: PropTypes.oneOf(Object.values(Variant)),
  size: PropTypes.oneOf(Object.values(Size)),
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  // @ts-ignore
  as: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]),
  href: PropTypes.string,
  glyph: PropTypes.element,
  borderRadius: PropTypes.string,
};

export default Button;
