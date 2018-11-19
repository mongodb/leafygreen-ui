import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { colors } from '@leafygreen-ui/theme';
import { ccClassname } from '@leafygreen-ui/lib';
import { lighten, darken } from 'polished';

const buttonThemes = {
  default: {
    color: colors.gray[1],
    backgroundColor: colors.mongodb.white,
    backgroundImage: `linear-gradient(${colors.mongodb.white}, ${lighten(0.2, colors.gray[5])})`,
    borderColor: colors.gray[6],
    boxShadow: `inset 0 -1px 0 ${colors.gray[6]}`,

    hover: {
      color: colors.gray[0],
      borderColor: colors.gray[5],
      backgroundColor: colors.mongodb.white,
      backgroundImage: `linear-gradient(${lighten(0.5, colors.gray[5])}, ${lighten(0.15, colors.gray[5])})`,
      boxShadow: `inset 0 -1px 0 ${colors.gray[5]}, 0 1px 4px rgba(0, 0, 0, 0.1)`,
    },

    active: {
      borderColor: colors.gray[5],
      backgroundImage: `linear-gradient(${lighten(0.15, colors.gray[5])}, ${lighten(0.5, colors.gray[5])})`,
      boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.1)',
    },
  },

  primary: {
    color: colors.mongodb.white,
    backgroundColor: colors.green[2],
    backgroundImage: `linear-gradient(${colors.green[2]}, ${lighten(0.025, colors.green[1])})`,
    borderColor: darken(0.02, colors.green[2]),
    boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.15)',

    hover: {
      borderColor: darken(0.07, colors.green[1]),
      backgroundColor: darken(0.05, colors.green[2]),
      backgroundImage: `linear-gradient(${darken(0.025, colors.green[2])}, ${darken(0.025, colors.green[1])})`,
      boxShadow: `inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)`,
    },

    active: {
      color: colors.mongodb.white,
      backgroundColor: colors.green[2],
      backgroundImage: `linear-gradient(${darken(0.025, colors.green[1])}, ${darken(0.025, colors.green[2])})`,
      borderColor: darken(0.07, colors.green[1]),
      boxShadow: `inset 0 2px 2px rgba(0, 0, 0, 0.2)`,
    },
  },

  info: {
    color: colors.green[2],
    backgroundColor: 'transparent',
    borderColor: colors.green[2],
    boxShadow: 'none',

    hover: {
      color: colors.mongodb.white,
      backgroundColor: darken(0.05, colors.green[2]),
      backgroundImage: `linear-gradient(${colors.green[2]}, ${lighten(0.025, colors.green[1])})`,
      borderColor: darken(0.02, colors.green[1]),
      boxShadow: 'inset 0 -1px rgba(0, 0, 0, 0.15)',
    },

    active: {
      color: colors.mongodb.white,
      backgroundColor: colors.green[2],
      backgroundImage: `linear-gradient(${darken(0.025, colors.green[1])}, ${darken(0.025, colors.green[2])})`,
      borderColor: darken(0.07, colors.green[1]),
      boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.2)',
    },
  },

  danger: {
    color: colors.mongodb.white,
    backgroundColor: '#BD180F',
    backgroundImage: `linear-gradient(${darken(0.1, colors.mongodb.alertRed)}, ${darken(0.2, colors.mongodb.alertRed)})`,
    borderColor: '#97130C',
    boxShadow: `inset 0 -1px 0 0 ${darken(0.25, colors.mongodb.alertRed)}`,

    hover: {
      backgroundColor: darken(0.05, '#BD180F'),
      backgroundImage: `linear-gradient(${darken(0.15, colors.mongodb.alertRed)}, ${darken(0.25, colors.mongodb.alertRed)})`,
      borderColor: darken(0.1, '#BD180F'),
      boxShadow: `0 1px 4px rgba(0, 0, 0, 0.1), inset 0 -1px 0 ${darken(0.25, colors.mongodb.alertRed)}`,
    },

    active: {
      backgroundImage: `linear-gradient(${darken(0.2, colors.mongodb.alertRed)}, ${darken(0.1, colors.mongodb.alertRed)})`,
      boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.1)',
    },
  },

  dark: {
    color: colors.mongodb.white,
    borderColor: colors.gray[0],
    backgroundImage: `linear-gradient(${colors.gray[3]}, ${colors.gray[1]})`,
    boxShadow: `inset 0 -1px 0 ${colors.gray[0]}`,

    hover: {
      backgroundImage: 'linear-gradient(#7C7F82, #41474A)',
      borderColor: '#303030',
      boxShadow: `inset 0 -1px 0 ${colors.gray[0]}`,
    },

    active: {
      backgroundImage: `linear-gradient(${colors.gray[1]}, ${colors.gray[3]})`,
      borderColor: colors.gray[0],
    },
  },
}

const defaultButtonSize = {
  height: '32px',
  padding: '0 12px',
  fontSize: '14px',
  lineHeight: '32px',
  textTransform: 'none',
  fontWeight: 'normal',
}

const buttonSizes = {
  xsmall: {
    ...defaultButtonSize,
    height: '22px',
    padding: `0 8px`,
    fontSize: '11px',
    lineHeight: '21px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  small: {
    ...defaultButtonSize,
    height: '25px',
    padding: `0 10px`,
    lineHeight: '23px',
  },

  normal: defaultButtonSize,

  large: {
    ...defaultButtonSize,
    height: '45px',
    lineHeight: '44px',
    fontSize: '16px',
    padding: '0 20px',
  },
}

const buttonStyles = (theme, size) => css`
  color: ${theme.color};
  background-color: ${theme.backgroundColor};
  background-image: ${theme.backgroundImage};
  border: 1px solid ${theme.borderColor}};
  box-shadow: ${theme.boxShadow};
  height: ${size.height};
  padding: ${size.padding};
  font-size: ${size.fontSize};
  font-weight: ${size.fontWeight};
  line-height: ${size.lineHeight};
  text-transform: ${size.textTransform};
  box-sizing: border-box;
  border-radius: 3px;
  display: inline-block;
  transition: all 120ms ease;
  text-decoration: none;
  cursor: pointer;

  &[disabled] {
    color: ${colors.gray[3]};
    border-color: ${colors.gray[5]};
    background-color: ${colors.gray[7]};
    background-image: none;
    box-shadow: none;
    cursor: not-allowed;
  }

  &:focus,
  &:hover {
    &:not([disabled]) {
      color: ${theme.hover && theme.hover.color};
      border-color: ${theme.hover && theme.hover.borderColor};
      background-color: ${theme.hover && theme.hover.backgroundColor};
      background-image: ${theme.hover && theme.hover.backgroundImage};
      box-shadow: ${theme.hover && theme.hover.boxShadow};
      outline: none;
    }
  }

  &:active:not([disabled]) {
    color: ${theme.active && theme.active.color};
    borderColor: ${theme.active && theme.active.borderColor};
    background-color: ${theme.active && theme.active.backgroundColor};
    background-image: ${theme.active && theme.active.backgroundImage};
    box-shadow: ${theme.active && theme.active.boxShadow};
    outline: none;
  }
`

export default class Button extends Component {
  static defaultProps = {
    className: '',
    name: null,
    value: undefined,
    disabled: false,
    children: null,
    type: 'button',
    title: null,
    onClick: () => {},
    tabIndex: 0,
    variant: 'default',
    size: 'normal',
    style: null,
  }

  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    variant: PropTypes.string,
    size: PropTypes.string,
  }

  render() {
    const {
      onClick,
      className,
      style,
      children,
      name,
      value,
      disabled,
      type,
      tabIndex,
      title,
      variant,
      size,
    } = this.props

    const variantStyle = buttonThemes[variant] || buttonThemes.default;
    const sizeStyle = buttonSizes[size] || buttonSizes.normal;

    return (
      <button
        className={ccClassname(buttonStyles(variantStyle, sizeStyle), className)}
        style={style}
        name={name}
        title={title}
        onClick={onClick}
        tabIndex={tabIndex}
        value={value}
        disabled={disabled}
        type={type}>
        {children}
      </button>
    )
  }
}
