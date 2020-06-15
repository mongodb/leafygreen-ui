import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import CaretUpIcon from '@leafygreen-ui/icon/dist/CaretUp';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import {
  menuItemContainerStyle,
  activeMenuItemContainerStyle,
  disabledMenuItemContainerStyle,
  focusedMenuItemContainerStyle,
  linkStyle,
  disabledTextStyle,
  paddingLeft,
  menuItemPadding,
  svgWidth,
} from './styles';
import { ExitHandler } from 'react-transition-group/Transition';

const subMenuContainer = createDataProp('sub-menu-container');
const iconButton = createDataProp('icon-button');

const subMenuContainerHeight = 56;
const iconButtonContainerHeight = 28;

const liStyle = css`
  position: relative;
  overflow: hidden;
`;

const subMenuStyle = css`
  min-height: 56px;
  border-top: 1px solid ${uiColors.gray.light2};
  background-color: ${uiColors.gray.light3};
  align-items: center;
  justify-content: flex-start;
`;

const subMenuOpenStyle = css`
  background-color: transparent;

  &:hover {
    background-color: ${uiColors.gray.light2};
  }
`;

const focusedIconStyle = css`
  ${subMenuContainer.selector}:focus + ${iconButton.selector} & {
    color: ${uiColors.blue.dark2};
  }
`;

const closedIconStyle = css`
  transition: color 200ms ease-in-out;
  color: ${uiColors.gray.base};
`;

const openIconStyle = css`
  color: ${uiColors.gray.dark2};
`;

const mainTextStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  color: ${uiColors.gray.dark3};
  ${subMenuContainer.selector}:focus & {
    color: ${uiColors.blue.dark3};
  }
`;

const activeMainTextStyle = css`
  font-weight: bolder;
  color: ${uiColors.green.dark3};
`;

const iconButtonStyle = css`
  position: absolute;
  z-index: 1;
  right: 8px;
  top: ${subMenuContainerHeight / 2 - iconButtonContainerHeight / 2}px;
  margin: auto;
  background-color: ${uiColors.gray.light3};
  transition: background-color 150ms ease-in-out;

  ${subMenuContainer.selector}:hover + & {
    background-color: ${uiColors.gray.light2};
  }
`;

const iconButtonFocusedStyle = css`
  ${subMenuContainer.selector}:focus + & {
    background-color: ${uiColors.blue.light3};

    &:hover:before {
      background-color: ${uiColors.blue.light2};
    }
  }
`;

const openIconButtonStyle = css`
  background-color: ${uiColors.white};
`;

const mainIconStyle = css`
  color: ${uiColors.gray.base};
  margin-right: ${paddingLeft - svgWidth - menuItemPadding}px;
  flex-shrink: 0;

  ${subMenuContainer.selector}:hover > & {
    color: ${uiColors.gray.dark1};
  }
`;

const mainIconFocusedStyle = css`
  ${subMenuContainer.selector}:focus > & {
    color: ${uiColors.blue.base};
  }
`;

const activeIconStyle = css`
  color: ${uiColors.green.base};
  ${subMenuContainer.selector}:hover > & {
    color: ${uiColors.green.base};
  }
`;

const ulStyle = css`
  list-style: none;
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: height 150ms ease-in-out;
`;

const menuItemBorder = css`
  position: absolute;
  width: 100%;
  height: 1px;
  background: ${uiColors.gray.light2};
  top: 0;
`;

interface SharedSubMenuProps {
  /**
   * Determines if `<SubMenu />` item appears open
   */
  open?: boolean;

  /**
   * Function to set the value of `open` in `<SubMenu />`
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * className applied to `SubMenu` root element
   */
  className?: string;

  /**
   * Content to appear below main text of SubMenu
   */
  description?: React.ReactElement;

  /**
   * Determines if `<SubMenu />` item appears disabled
   */
  disabled?: boolean;

  /**
   * Determines if `<SubMenu />` item appears active
   */
  active?: boolean;
  /**
   * Slot to pass in an Icon rendered to the left of `SubMenu` text.
   */
  glyph?: React.ReactElement;

  onExited?: ExitHandler;
}

interface LinkSubMenuProps extends HTMLElementProps<'a'>, SharedSubMenuProps {
  href: string;
}

interface ButtonSubMenuProps
  extends HTMLElementProps<'button'>,
    SharedSubMenuProps {
  href?: null;
}

type SubMenuProps = LinkSubMenuProps | ButtonSubMenuProps;

function usesLinkElement(
  props: LinkSubMenuProps | ButtonSubMenuProps,
): props is LinkSubMenuProps {
  return props.href != null;
}

const subMenuItemHeight = 36;

const SubMenu = React.forwardRef((props: SubMenuProps, ref) => {
  const {
    title,
    description,
    href,
    children,
    setOpen,
    onKeyDown,
    className,
    onClick,
    glyph,
    onExited = () => {},
    open = false,
    active = false,
    disabled = false,
    ...rest
  } = props;

  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const nodeRef = React.useRef(null);
  const iconButtonRef: React.RefObject<HTMLElement | null> = useRef(null);

  const onRootClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
      React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (iconButtonRef.current?.contains(e.target as HTMLElement)) {
      e.preventDefault();
    } else if (onClick) {
      onClick(e);
    }
  };

  const numberOfMenuItems = React.Children.toArray(children).length;

  const updatedGlyph =
    glyph &&
    React.cloneElement(glyph, {
      className: cx(
        mainIconStyle,
        {
          [activeIconStyle]: active,
          [mainIconFocusedStyle]: showFocus,
        },
        glyph.props?.className,
      ),
    });

  const openCloseiconStyle = open ? openIconStyle : closedIconStyle;

  const caretIconStyles = cx(openCloseiconStyle, {
    [focusedIconStyle]: showFocus,
  });

  const renderedSubMenuItem = (Root: React.ElementType<any> = 'button') => (
    <li role="none" className={liStyle}>
      <Root
        {...subMenuContainer.prop}
        {...rest}
        onKeyDown={onKeyDown}
        role="menuitem"
        href={href}
        aria-haspopup="true"
        ref={ref}
        onClick={onRootClick}
        className={cx(
          menuItemContainerStyle,
          subMenuStyle,
          linkStyle,
          {
            [activeMenuItemContainerStyle]: active,
            [disabledMenuItemContainerStyle]: disabled,
            [subMenuOpenStyle]: open,
            [focusedMenuItemContainerStyle]: showFocus,
          },
          className,
        )}
      >
        {updatedGlyph}
        <div>
          <div
            className={cx(mainTextStyle, {
              [activeMainTextStyle]: active,
            })}
          >
            {title}
          </div>

          <div className={cx({ [disabledTextStyle]: disabled })}>
            {description}
          </div>
        </div>
      </Root>
      <IconButton
        {...iconButton.prop}
        ref={iconButtonRef}
        aria-label={open ? 'Close Sub-menu' : 'Open Sub-menu'}
        className={cx(iconButtonStyle, {
          [openIconButtonStyle]: open,
          [iconButtonFocusedStyle]: showFocus,
        })}
        onClick={(e: React.MouseEvent) => {
          // we stop the event from propagating and closing the entire menu
          e.nativeEvent.stopImmediatePropagation();

          if (setOpen) {
            setOpen(!open);
          }
        }}
      >
        {open ? (
          <CaretUpIcon className={caretIconStyles} />
        ) : (
          <CaretDownIcon className={caretIconStyles} />
        )}
      </IconButton>
      <Transition
        in={open}
        timeout={{
          enter: 0,
          exit: 150,
        }}
        mountOnEnter
        unmountOnExit
        onExited={onExited}
        nodeRef={nodeRef}
      >
        {(state: string) => (
          <ul
            ref={nodeRef}
            className={cx(ulStyle, {
              [css`
                height: ${subMenuItemHeight * numberOfMenuItems}px;
              `]: state === 'entered',
            })}
            role="menu"
            aria-label={title}
          >
            {React.Children.map(children as React.ReactElement, child => {
              return React.cloneElement(child, {
                children: (
                  <>
                    <div className={menuItemBorder} />
                    {child.props.children}
                  </>
                ),
                className: cx(
                  // SubMenuItem indentation based on how indented the title of a SubMenuItem is
                  // glyphs push title further in, therefore their children should have a thicker padding-left
                  css`
                    padding-left: ${glyph ? paddingLeft : 28}px;
                  `,
                  child.props.className,
                ),
                onClick: (
                  e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                    React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => {
                  child.props?.onClick?.(e);
                  if (onClick) {
                    onClick(e);
                  }
                },
              });
            })}
          </ul>
        )}
      </Transition>
    </li>
  );

  if (usesLinkElement(props)) {
    return renderedSubMenuItem('a');
  }

  return renderedSubMenuItem();
});

SubMenu.displayName = 'SubMenu';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
SubMenu.propTypes = {
  title: PropTypes.string,
  // @ts-ignore
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  // @ts-ignore
  href: PropTypes.string,
  children: PropTypes.node,
  setOpen: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  onClick: PropTypes.func,
  glyph: PropTypes.element,
  onExited: PropTypes.func,
  open: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SubMenu;
