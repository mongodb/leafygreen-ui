import React from 'react';
import PropTypes from 'prop-types';
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

    &:not(:disabled) {
      &:focus,
      &:hover {
        border-color: ${uiColors.gray.light1};
        background-color: ${uiColors.gray.light2};
        background-image: linear-gradient(${uiColors.gray.light3}, #DDE4E2);
        box-shadow: inset 0 -1px 0 ${uiColors.gray.light1},
          0 1px 4px ${transparentize(0.9, uiColors.black)};
      }

      &:active {
        border-color: ${uiColors.gray.light1};
        background-color: ${uiColors.gray.light3};
        background-image: linear-gradient(#DDE4E2, ${uiColors.gray.light3});
        box-shadow: inset 0 2px 2px ${transparentize(0.9, uiColors.black)};
      }
    }
  `,

  [Variant.Primary]: css`
    color: ${uiColors.white};
    border: 1px solid #158242;
    background-color: ${uiColors.green.base};
    background-image: linear-gradient(${uiColors.green.base}, #18964c);
    box-shadow: inset 0 -1px 0 #158242;

    &:not(:disabled) {
      &:focus,
      &:hover {
        background-color: #129f4c;
        background-image: linear-gradient(#129f4c, #148040);
        box-shadow: 0 1px 4px ${transparentize(0.9, uiColors.black)},
          inset 0 -1px 0 #158242;
      }

      &:active {
        background-color: ${uiColors.green.base};
        background-image: linear-gradient(#148040, #129f4c);
        box-shadow: inset 0 2px 2px #158242;
      }
    }
  `,

  [Variant.Info]: css`
    color: ${uiColors.green.base};
    background-color: transparent;
    background-image: none;
    border: 1px solid ${uiColors.green.base};
    box-shadow: none;

    &:not(:disabled) {
      &:focus,
      &:hover {
        color: ${uiColors.white};
        border-color: #158242;
        background-color: #129f4c;
        background-image: linear-gradient(#129f4c, #148040);
        box-shadow: 0 1px 4px ${transparentize(0.9, uiColors.black)},
          inset 0 -1px 0 #158242;
      }

      &:active {
        color: ${uiColors.white};
        border-color: #158242;
        background-color: ${uiColors.green.base};
        background-image: linear-gradient(#148040, #129f4c);
        box-shadow: inset 0 2px 2px #158242;
      }
    }
  `,

  [Variant.Danger]: css`
    color: ${uiColors.white};
    border: 1px solid ${uiColors.red.dark2};
    background-color: ${uiColors.red.base};
    background-image: linear-gradient(#e45b26, #b63016);
    box-shadow: inset 0 -1px 0 0 ${uiColors.red.dark2};

    &:not(:disabled) {
      &:focus,
      &:hover {
        background-color: ${uiColors.red.dark2};
        background-image: linear-gradient(#e45b26, ${uiColors.red.dark2});
        box-shadow: 0 1px 4px ${transparentize(0.9, uiColors.black)},
          inset 0 -1px 0 ${uiColors.red.dark2};
      }

      &:active {
        background-color: ${uiColors.red.dark2};
        background-image: linear-gradient(${uiColors.red.dark2}, #e45b26);
        box-shadow: inset 0 1px 0 ${uiColors.red.dark2};
      }
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

    &:not(:disabled) {
      &:focus,
      &:hover {
        background-image: linear-gradient(
          ${uiColors.gray.base},
          ${uiColors.gray.dark2}
        );
        box-shadow: 0 1px 4px ${transparentize(0.9, uiColors.black)},
          inset 0 -1px 0 ${uiColors.gray.dark2};
      }

      &:active {
        background-image: linear-gradient(
          ${uiColors.gray.dark1},
          ${uiColors.gray.base}
        );
        box-shadow: inset 0 -1px 0 ${uiColors.gray.dark2};
      }
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
  &:hover {
    text-decoration: none;
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

export default function Button(props: ButtonProps) {
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

  if (usesCustomElement(props)) {
    const Root = props.as;

    return (
      <Root {...rest} {...commonProps}>
        {children}
      </Root>
    );
  }

  if (usesLinkElement(props)) {
    return (
      <a {...(rest as HTMLElementProps<'a'>)} {...commonProps}>
        {children}
      </a>
    );
  }

  // NOTE(JeT): The button's `type` will be overridden if it is in the passed-in props
  return (
    <button
      type="button"
      {...(rest as HTMLElementProps<'button'>)}
      {...commonProps}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'info', 'danger', 'dark']),
  size: PropTypes.oneOf(['xsmall', 'small', 'normal', 'large']),
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  href: PropTypes.string,
};

Button.displayName = 'Button';
