import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { css, cx } from '@leafygreen-ui/emotion';
import { lighten, darken } from 'polished';
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
    color: ${colors.gray[1]};
    background-color: ${colors.mongodb.white};
    background-image: linear-gradient(
      ${colors.mongodb.white},
      ${lighten(0.2, colors.gray[5])}
    );
    border: 1px solid ${colors.gray[6]}};
    box-shadow: inset 0 -1px 0 ${colors.gray[6]};
    &:focus,
    &:hover {
      &:not(:disabled) {
        color: ${colors.gray[0]};
        border-color: ${colors.gray[5]};
        background-color: ${colors.mongodb.white};
        background-image: linear-gradient(
          ${lighten(0.5, colors.gray[5])},
          ${lighten(0.15, colors.gray[5])}
        );
        box-shadow: inset 0 -1px 0 ${colors.gray[5]},
          0 1px 4px rgba(0, 0, 0, 0.1);
      }
    }
    &:active:not(:disabled) {
      color: ${colors.gray[1]};
      background-color: ${colors.mongodb.white};
      background-image: linear-gradient(
        ${lighten(0.15, colors.gray[5])},
        ${lighten(0.5, colors.gray[5])}
      );
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
      border-color: ${colors.gray[5]};
    }
  `,

  [Variant.Primary]: css`
    color: ${colors.mongodb.white};
    background-color: ${colors.green[2]};
    background-image: linear-gradient(
      ${colors.green[2]},
      ${lighten(0.025, colors.green[1])}
    );
    border: 1px solid ${darken(0.02, colors.green[2])};
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    &:focus,
    &:hover {
      &:not(:disabled) {
        color: ${colors.mongodb.white};
        border-color: ${darken(0.07, colors.green[1])};
        background-color: ${darken(0.05, colors.green[2])};
        background-image: linear-gradient(
          ${darken(0.025, colors.green[2])},
          ${darken(0.025, colors.green[1])}
        );
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15),
          0 1px 4px rgba(0, 0, 0, 0.1);
      }
    }
    &:active:not(:disabled) {
      color: ${colors.mongodb.white};
      background-color: ${colors.green[2]};
      background-image: linear-gradient(
        ${darken(0.025, colors.green[1])},
        ${darken(0.025, colors.green[2])}
      );
      border-color: ${darken(0.07, colors.green[1])};
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.2);
    }
  `,

  [Variant.Info]: css`
    color: ${colors.green[2]};
    background-color: transparent;
    background-image: none;
    border: 1px solid ${colors.green[2]};
    border-color: ${colors.green[2]};
    box-shadow: none;
    &:focus,
    &:hover {
      &:not(:disabled) {
        color: ${colors.mongodb.white};
        background-color: ${darken(0.05, colors.green[2])};
        background-image: linear-gradient(
          ${colors.green[2]},
          ${lighten(0.025, colors.green[1])}
        );
        border-color: ${darken(0.02, colors.green[1])};
        box-shadow: inset 0 -1px rgba(0, 0, 0, 0.15);
      }
    }
    &:active:not(:disabled) {
      color: ${colors.mongodb.white};
      background-color: ${colors.green[2]};
      background-image: linear-gradient(
        ${darken(0.025, colors.green[1])},
        ${darken(0.025, colors.green[2])}
      );
      border-color: ${darken(0.07, colors.green[1])};
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.2);
    }
  `,

  [Variant.Danger]: css`
    color: ${colors.mongodb.white};
    background-color: #bd180f;
    background-image: linear-gradient(
      ${darken(0.1, colors.mongodb.alertRed)},
      ${darken(0.2, colors.mongodb.alertRed)}
    );
    border: 1px solid #97130c;
    box-shadow: inset 0 -1px 0 0 ${darken(0.25, colors.mongodb.alertRed)};
    &:focus,
    &:hover {
      &:not(:disabled) {
        color: ${colors.mongodb.white};
        background-color: ${darken(0.05, '#BD180F')};
        background-image: linear-gradient(
          ${darken(0.15, colors.mongodb.alertRed)},
          ${darken(0.25, colors.mongodb.alertRed)}
        );
        border-color: ${darken(0.1, '#BD180F')};
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1),
          inset 0 -1px 0 ${darken(0.25, colors.mongodb.alertRed)};
      }
    }
    &:active:not(:disabled) {
      color: ${colors.mongodb.white};
      background-color: #bd180f;
      background-image: linear-gradient(
        ${darken(0.2, colors.mongodb.alertRed)},
        ${darken(0.1, colors.mongodb.alertRed)}
      );
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
      border-color: #97130c;
    }
  `,

  [Variant.Dark]: css`
    color: ${colors.mongodb.white};
    border: 1px solid ${colors.gray[0]}};
    background-image: linear-gradient(${colors.gray[3]}, ${colors.gray[1]});
    box-shadow: inset 0 -1px 0 ${colors.gray[0]};
    &:focus,
    &:hover {
      &:not(:disabled) {
        color: ${colors.mongodb.white};
        background-image: linear-gradient(#7c7f82, #41474a);
        border-color: #303030;
        box-shadow: inset 0 -1px 0 ${colors.gray[0]};
      }
    }
    &:active:not(:disabled) {
      color: ${colors.mongodb.white};
      background-image: linear-gradient(${colors.gray[1]}, ${colors.gray[3]});
      border-color: ${colors.gray[0]};
      box-shadow: inset 0 -1px 0 ${colors.gray[0]};
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
  color: ${colors.gray[3]};
  border-color: ${colors.gray[5]};
  background-color: ${colors.gray[7]};
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
