import * as React from 'react';
import PropTypes from 'prop-types';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';
import { menuGroup } from './MenuGroup';

const { css } = emotion;

const indentation = 16;

const containerStyle = css`
  min-height: 42px;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  padding-left: ${indentation}px;
  text-decoration: none;
  margin: 0px;
  &:hover {
    background-color: ${colors.gray[8]};
    transition: background 300ms ease-in-out;
  }

  &:first-child ~ ${menuGroup.selector} {
    border-top: 1px solid ${colors.gray[7]};
  }

  ${menuGroup.selector} + & {
    border-top: 1px solid ${colors.gray[7]};
  }

  ${menuGroup.selector} ${menuGroup.selector} & {
    padding-left: ${indentation * 2}px;
  }
`;

const baseTextStyle = css`
  cursor: pointer;
  color: ${colors.gray[1]};
  text-decoration: none;
  margin: 0px;
`;

const titleTextStyle = css`
  font-size: 14px;
  line-height: 16px;
  margin: 4px 0px;
`;

const descriptionTextStyle = css`
  font-size: 12px;
  margin: 2px 0px;
`;

const activeStyle = css`
  background-color: ${colors.gray[8]};
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 3px;
    top: 0;
    bottom: 0;
    left: -1px;
    background-color: ${colors.green[3]};
  }
`;

const disabledStyle = css`
  background: ${colors.gray[8]};
  color: ${colors.gray[5]};
  cursor: not-allowed;
`;

interface Props {
  /**
   * If supplied, MenuItem will be rendered inside of `a` tags.
   */
  href?: string;

  /**
   * Class name that will be applied to root MenuItem element.
   */
  className?: string;

  /**
   * Callback function to be executed when MenuItem is clicked.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Main text displayed in MenuItem.
   */
  title?: string;

  /**
   * Description text displayed below title in MenuItem.
   */
  description?: string;

  /**
   * Determines whether or not the MenuItem is diabled.
   */
  disabled?: boolean;

  /**
   * Determines whether or not the MenuItem is active.
   */
  active?: boolean;
}

/**
 * # MenuItem
 *
 * ```
<MenuItem>Hello World!</MenuItem>
 * ```
 * @param props.href If supplied, MenuItem will render inside of `a` tags.
 * @param props.onClick Function to be executed when MenuItem is clicked.
 * @param props.className Classname applied to MenuItem.
 * @param props.children Content to appear inside of the MenuItem.
 * @param props.title Main text to appear inside of MenuItem
 * @param props.description Subtext to appear inside of MenuItem
 * @param props.disabled Determines if the MenuItem is disabled
 * @param props.active Determines whether the MenuItem will appear as active
 *
 */
export default function MenuItem({
  href,
  onClick,
  className,
  title,
  description,
  disabled,
  active,
  ...rest
}: Props) {
  const Root = href ? 'a' : 'span';
  const clickHandler = !disabled ? onClick : undefined;

  return (
    <div
      {...rest}
      className={cx(
        containerStyle,
        baseTextStyle,
        active && activeStyle,
        disabled && disabledStyle,
        className,
      )}
      role="menuitem"
    >
      <Root onClick={clickHandler} href={href}>
        <p className={cx(titleTextStyle)}>{title}</p>
        {description && (
          <p className={cx(descriptionTextStyle)}>{description}</p>
        )}
      </Root>
    </div>
  );
}

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

MenuItem.defaultProps = {
  disabled: false,
  active: false,
};
