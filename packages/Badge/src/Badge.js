import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

export const baseStyle = css`
  display: inline-block;
  font-weight: bold;
  font-size: 11px;
  line-height: 20px;
  border-radius: 10px;
  padding: 0px 9px;
  text-transform: uppercase;
  color: ${colors.mongodb.white};
`;

export const badgeVariants = {
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

export const clickable = css`
  cursor: pointer;
  text-decoration: none;
`;

export default class Badge extends PureComponent {
  static displayName = 'Badge';

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    tag: PropTypes.oneOf(['span', 'a']),
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
    variant: 'default',
    tag: 'span',
    children: null
  };

  render() {
    let {
      children,
      variant,
      className,
      tag: Tag,
      ...rest
    } = this.props;

    if (rest.href) {
      Tag = 'a';
    }

    const variantStyle = badgeVariants[variant];
    const clickStyle = rest.onClick || rest.href && clickable;

    return (
      <Tag
        {...rest}
        className={ccClassName(
          css`${baseStyle} ${variantStyle} ${clickStyle}`,
          className,
        )}
      >
        {children}
      </Tag>
    );
  }
}
