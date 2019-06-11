import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@leafygreen-ui/theme';
import emotion from '@leafygreen-ui/emotion';

const { css, cx } = emotion;

export enum Variant {
  Default = 'default',
  Dark = 'dark',
  Danger = 'danger',
  Warning = 'warning',
  DarkBlue = 'darkBlue',
  LightBlue = 'lightBlue',
  Primary = 'primary',
  Outline = 'outline',
}

export const baseStyle = css`
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  font-size: 11px;
  line-height: 20px;
  border-radius: 50px;
  height: 20px;
  padding-left: 9px;
  padding-right: 9px;
  text-transform: uppercase;
  color: ${colors.mongodb.white};
`;

export const badgeVariants: { readonly [K in Variant]: string } = {
  default: css`
    background-color: ${colors.gray[6]};
    color: ${colors.gray[3]};
  `,

  dark: css`
    background-color: ${colors.gray[2]};
  `,

  danger: css`
    background-color: ${colors.mongodb.red};
  `,

  warning: css`
    background-color: ${colors.mongodb.yellow};
  `,

  darkBlue: css`
    background-color: ${colors.mongodb.navyBlue};
  `,

  lightBlue: css`
    background-color: ${colors.mongodb.blue};
  `,

  primary: css`
    background-color: ${colors.mongodb.green};
  `,

  outline: css`
    border: 1px solid ${colors.gray[3]};
    color: ${colors.gray[3]};
  `,
};

interface BadgeProps {
  className: string;
  children?: React.ReactNode;
  variant: Variant;
}

export default class Badge extends PureComponent<
  BadgeProps & React.HTMLAttributes<HTMLDivElement>
> {
  static displayName = 'Badge';

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    variant: PropTypes.oneOf([
      'default',
      'danger',
      'warning',
      'darkBlue',
      'lightBlue',
      'primary',
      'outline',
      'dark',
    ]),
  };

  static defaultProps = {
    className: '',
    variant: Variant.Default,
  };

  render() {
    const { children, variant, className, ...rest } = this.props;

    return (
      <div
        {...rest}
        className={cx(baseStyle, badgeVariants[variant], className)}
      >
        {children}
      </div>
    );
  }
}
