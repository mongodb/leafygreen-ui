import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@leafygreen-ui/theme';
import { ccClassName, createDisplayName, emotion } from '@leafygreen-ui/lib';
import { lighten, darken } from 'polished';

const { css } = emotion;

const buttonVariants = {
  default: css`
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

  primary: css`
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

  info: css`
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

  danger: css`
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

  dark: css`
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

const buttonSizes = {
  xsmall: css`
    height: 22px;
    padding: 0 8px;
    font-size: 11px;
    line-height: 21px;
    text-transform: uppercase;
    font-weight: bold;
  `,

  small: css`
    height: 25px;
    padding: 0 10px;
    line-height: 23px;
  `,

  normal: css`
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 32px;
    text-transform: none;
    font-weight: normal;
  `,

  large: css`
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

export default class Button extends Component {
  static displayName = createDisplayName('Button');

  static defaultProps = {
    variant: 'default',
    size: 'normal',
    className: '',
    children: null,
    disabled: false,
  };

  static propTypes = {
    variant: PropTypes.oneOf(['default', 'primary', 'info', 'danger', 'dark']),
    size: PropTypes.oneOf(['xsmall', 'small', 'normal', 'large']),
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
  };

  render() {
    const {
      className,
      children,
      disabled,
      variant,
      size,
      ...rest
    } = this.props;

    const variantStyle = buttonVariants[variant] || buttonVariants.default;
    const sizeStyle = buttonSizes[size] || buttonSizes.normal;

    return (
      <button
        {...rest}
        className={ccClassName(
          css`${baseStyle} ${sizeStyle} ${variantStyle}`,
          className,
        )}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
