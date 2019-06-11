import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@leafygreen-ui/theme';
import { emotion } from '@leafygreen-ui/lib';
import { lighten, darken } from 'polished';
import omit from 'lodash/omit';

const { css, cx } = emotion;

export enum Variant {
  Default = 'default',
  Primary = 'primary',
  Info = 'info',
  Danger = 'danger',
  Dark = 'dark',
}

export enum Size {
  XSmall = 'xsmall',
  Small = 'small',
  Normal = 'normal',
  Large = 'large',
}

/** Helper type to extract an HTML element's valid props */
type HTMLElementProps<
  Element extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[Element] extends React.DetailedHTMLProps<
  infer Props,
  any
>
  ? Props
  : never;

const buttonVariants: { readonly [K in Variant]: string } = {
  [Variant.Default]: css`
    color: ${colors.gray[1]};
    background-color: ${colors.mongodb.white};
    background-image: linear-gradient(
      ${colors.mongodb.white},
      ${lighten(0.2, colors.gray[5])}
    );
    border-color: ${colors.gray[6]};
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
    border-color: ${darken(0.02, colors.green[2])};
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
    border-color: #97130c;
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
    border-color: ${colors.gray[0]};
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
    line-height: 21px;
    text-transform: uppercase;
    font-weight: bold;
  `,

  [Size.Small]: css`
    height: 25px;
    padding: 0 10px;
    line-height: 23px;
  `,

  [Size.Normal]: css`
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 32px;
    text-transform: none;
    font-weight: normal;
  `,

  [Size.Large]: css`
    height: 45px;
    line-height: 44px;
    font-size: 16px;
    padding: 0 20px;
  `,
};

const baseStyle = css`
  color: ${colors.gray[1]};
  background-color: ${colors.mongodb.white};
  background-image: linear-gradient(
    ${colors.mongodb.white},
    ${lighten(0.2, colors.gray[5])}
  );
  border: 1px solid ${colors.gray[6]}};
  box-shadow: inset 0 -1px 0 ${colors.gray[6]};
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  line-height: 32px;
  text-transform: none;
  font-weight: normal;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  border-radius: 3px;
  display: inline-block;
  transition: all 120ms ease;
  text-decoration: none;
  cursor: pointer;

  &:disabled {
    color: ${colors.gray[3]};
    border-color: ${colors.gray[5]};
    background-color: ${colors.gray[7]};
    background-image: none;
    box-shadow: none;
    cursor: not-allowed;
  }

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
      box-shadow: inset 0 -1px 0 ${colors.gray[5]}, 0 1px 4px rgba(0, 0, 0, 0.1);
      outline: none;
    }
  }

  &:active:not(:disabled) {
    border-color: ${colors.gray[5]};
    background-color: linear-gradient(
      ${lighten(0.15, colors.gray[5])},
      ${lighten(0.5, colors.gray[5])}
    );
    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
    outline: none;
  }
`;

interface SharedButtonProps {
  variant: Variant;
  size: Size;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

interface LinkButtonProps extends HTMLElementProps<'a'>, SharedButtonProps {
  href: string;
}

interface ButtonButtonProps extends SharedButtonProps, SharedButtonProps {
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

export default class Button extends Component<ButtonProps> {
  static displayName = 'Button';

  static defaultProps = {
    variant: Variant.Default,
    size: Size.Normal,
    className: '',
    children: null,
    disabled: false,
  };

  /*
  NOTE(JeT):
  Without the `any` type annotation here, @types/react will try to infer TS prop types from it,
  merging them together with ButtonProps (see LibraryManagedAttributes and MergePropTypes in @types/react).
  Unfortunately, this merging uses keyof, which appears to drop the [key: string] index signature, meaning TS won't
  allow us to pass unrecognized props down to custom components when we're using the `as` prop. This workaround avoids
  the attempt at merging, while still getting runtime type-checking for non-TS consumers of the library.
  */
  static propTypes: any = {
    variant: PropTypes.oneOf(['default', 'primary', 'info', 'danger', 'dark']),
    size: PropTypes.oneOf(['xsmall', 'small', 'normal', 'large']),
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    href: PropTypes.string,
  };

  render() {
    const { className, children, disabled, variant, size } = this.props;

    const commonProps = {
      className: cx(
        baseStyle,
        buttonSizes[size],
        buttonVariants[variant],
        className,
      ),
      disabled,
      'aria-disabled': disabled,
    };

    const rest = omit(this.props, [
      'as',
      'className',
      'disabled',
      'size',
      'variant',
      'children',
    ]);

    if (usesCustomElement(this.props)) {
      const Root = this.props.as;

      return (
        <Root {...rest} {...commonProps}>
          {children}
        </Root>
      );
    }

    if (usesLinkElement(this.props)) {
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
        {...(rest as HTMLElementProps<'button'>)} //eslint-disable-line
        {...commonProps}
      >
        {children}
      </button>
    );
  }
}
