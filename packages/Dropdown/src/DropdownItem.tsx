import * as React from 'react';
import PropTypes from 'prop-types';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

const containerStyle = css`
  list-style: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  padding-left: 16px;
  text-decoration: none;
  margin: 0px;
  &:hover {
    background-color: ${colors.gray[8]};
    transition: background 300ms ease-in-out;
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
   * If supplied, Menu Item will be rendered inside of `a` tags.
   */
  href?: string;

  /**
   * Class name that will be applied to root DropdownItem element.
   */
  className?: string;

  /**
   * Callback function to be executed when DropdownItem is clicked.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Main text displayed in DropdownItem.
   */
  title?: string;

  /**
   * Description text displayed below title in DropdownItem.
   */
  description?: string;

  /**
   * Determines whether or not the DropdownItem is diabled.
   */
  disabled?: boolean;

  /**
   * Determines whether or not the DropdownItem is active.
   */
  active?: boolean;
}

/**
 * # DropdownItem
 *
 * `''
<DropdownItem>Hello World!</DropdownItem>
 * `''
 * @param props.href If supplied, DropdownItem will render inside of `a` tags.
 * @param props.onClick Function to be executed when DropdownItem is clicked.
 * @param props.className Classname applied to DropdownItem.
 * @param props.children Content to appear inside of the DropdownItem.
 * @param props.title Main text to appear inside of DropdownItem
 * @param props.description Subtext to appear inside of DropdownItem
 * @param props.disabled Determines if the DropdownItem is disabled
 * @param props.active Determines whether the DropdownItem will appear as active
 *
 */
export default function DropdownItem({
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
    <li
      {...rest}
      className={cx(
        containerStyle,
        baseTextStyle,
        active && activeStyle,
        disabled && disabledStyle,
        className,
      )}
    >
      <Root onClick={clickHandler} href={href}>
        <p className={cx(titleTextStyle)}>{title}</p>
        {description && (
          <p className={cx(descriptionTextStyle)}>{description}</p>
        )}
      </Root>
    </li>
  );
}

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

DropdownItem.defaultProps = {
  disabled: false,
  active: false,
};
