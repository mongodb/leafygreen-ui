import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import IconButton from '@leafygreen-ui/icon-button';
import Box, { BoxProps, ExtendableBox } from '@leafygreen-ui/box';
import CaretUpIcon from '@leafygreen-ui/icon/dist/CaretUp';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
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
  color: ${uiColors.gray.dark1};
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

const descriptionTextStyle = css`
  font-size: 11px;
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

const subMenuItemHeight = 36;

interface SubMenuProps {
  /**
   * Determines if `<SubMenu />` item appears open
   */
  open?: boolean;

  /**
   * Function to set the value of `open` in `<SubMenu />`
   */
  setOpen?: (value: boolean) => void;

  /**
   * className applied to `SubMenu` root element
   */
  className?: string;

  /**
   * Content to appear below main text of SubMenu
   */
  description?: string | React.ReactElement;

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

  /**
   * Main text rendered in `SubMenu`.
   */
  title?: string;

  /**
   * Content rendered inside of `SubMenu`.
   */
  children?: React.ReactNode;

  onClick?: React.MouseEventHandler;

  onExited?: ExitHandler<HTMLElement>;

  href?: string;
}

const SubMenu: ExtendableBox<
  SubMenuProps & { ref?: React.Ref<any> },
  'button'
> = React.forwardRef(
  (
    {
      title,
      children,
      onClick,
      description,
      setOpen,
      className,
      glyph,
      onExited = () => {},
      open = false,
      active = false,
      disabled = false,
      ...rest
    }: SubMenuProps,
    ref: React.Ref<any>,
  ) => {
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();
    const nodeRef = React.useRef(null);

    const [
      iconButtonElement,
      setIconButtonElement,
    ] = useState<HTMLElement | null>(null);

    const onRootClick = useCallback(
      (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
          React.MouseEvent<HTMLButtonElement, MouseEvent>,
      ) => {
        if (iconButtonElement?.contains(e.target as HTMLElement)) {
          e.preventDefault();
        } else if (onClick) {
          onClick(e);
        }
      },
      [iconButtonElement, onClick],
    );

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

    const sharedBoxProps = {
      ...subMenuContainer.prop,
      ...rest,
      ref,
      onClick: onRootClick,
      role: 'menuitem',
      'aria-haspopup': true,
      className: cx(
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
      ),
    };

    const boxContent = (
      <>
        {updatedGlyph}
        <div>
          <div
            className={cx(mainTextStyle, {
              [activeMainTextStyle]: active,
            })}
          >
            {title}
          </div>

          <div
            className={cx(descriptionTextStyle, {
              [disabledTextStyle]: disabled,
            })}
          >
            {description}
          </div>
        </div>
      </>
    );

    const renderBox =
      typeof rest.href === 'string' ? (
        <Box as="a" {...sharedBoxProps}>
          {boxContent}
        </Box>
      ) : (
        <Box as="button" {...sharedBoxProps}>
          {boxContent}
        </Box>
      );

    const openCloseiconStyle = open ? openIconStyle : closedIconStyle;

    const caretIconStyles = cx(openCloseiconStyle, {
      [focusedIconStyle]: showFocus,
    });

    return (
      <li role="none" className={liStyle}>
        {renderBox}
        <IconButton
          {...iconButton.prop}
          ref={setIconButtonElement}
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
  },
);

SubMenu.displayName = 'SubMenu';

SubMenu.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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

export type SubMenuElement = React.ReactComponentElement<
  typeof SubMenu,
  BoxProps<'button', SubMenuProps & { ref?: React.Ref<any> }>
>;
