import React from 'react';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { transparentize } from 'polished';
import omit from 'lodash/omit';

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
  `,
};

const buttonSizes: { readonly [K in Size]: string } = {
  [Size.XSmall]: css`
    height: 22px;
    padding: 0 8px;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
  `,

  [Size.Small]: css`
    height: 25px;
    padding: 0 10px;
    font-size: 14px;
  `,

  [Size.Normal]: css`
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
  `,

  [Size.Large]: css`
    height: 45px;
    font-size: 16px;
    padding: 0 20px;
  `,
};

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
  align-items: center;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
  transition: all 120ms ease;
  user-select: none;
  overflow: hidden;

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

interface SharedButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

interface LinkButtonProps extends HTMLElementProps<'a'>, SharedButtonProps {
  href: string;
}

interface ButtonButtonProps
  extends HTMLElementProps<'button'>,
    SharedButtonProps {
  href?: null;
}

type CustomElementButtonProps = SharedButtonProps & {
  as: React.ElementType<any>;
  [key: string]: any;
};

type ButtonProps =
  | LinkButtonProps
  | ButtonButtonProps
  | CustomElementButtonProps;

function usesCustomElement(
  props: ButtonProps,
): props is CustomElementButtonProps {
  return (props as any).as != null;
}

function usesLinkElement(
  props: LinkButtonProps | ButtonButtonProps,
): props is LinkButtonProps {
  return props.href != null;
}

const Button = React.forwardRef((props: ButtonProps, forwardRef) => {
  const {
    className = '',
    children = null,
    disabled = false,
    variant = Variant.Default,
    size = Size.Normal,
  } = props;

  const commonProps = {
    className: cx(
      baseStyle,
      buttonSizes[size],
      buttonVariants[variant],
      { [disabledStyle]: disabled },
      className,
    ),
    // only add a disabled prop if not an anchor
    ...(!usesLinkElement(props) && { disabled }),
    'aria-disabled': disabled,
  };

  const rest = omit(props, [
    'as',
    'className',
    'disabled',
    'size',
    'variant',
    'children',
  ]);

  const renderButton = (Root: React.ElementType<any> = 'button') => (
    <Root
      ref={forwardRef}
      type={Root === 'button' ? 'button' : undefined}
      {...(rest as HTMLElementProps<any>)}
      {...commonProps}
    >
      <span
        className={css`
          // Usually for this to take effect, you would need the element to be
          // "positioned". Due to an obscure part of CSS spec, flex children
          // respect z-index without the position property being set.
          //
          // https://www.w3.org/TR/css-flexbox-1/#painting
          z-index: 1;
        `}
      >
        {children}
      </span>
    </Root>
  );

  if (usesCustomElement(props)) {
    return renderButton(props.as);
  }

  if (usesLinkElement(props)) {
    return renderButton('a');
  }

  return renderButton();
});

Button.displayName = 'Button';

export default Button;
