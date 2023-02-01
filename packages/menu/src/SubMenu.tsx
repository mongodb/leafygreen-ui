import React, { useCallback, useContext, useState } from 'react';
import { Transition } from 'react-transition-group';
import { ExitHandler } from 'react-transition-group/Transition';
import PropTypes from 'prop-types';

import Box, { BoxProps } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUpIcon from '@leafygreen-ui/icon/dist/ChevronUp';
import IconButton from '@leafygreen-ui/icon-button';
import {
  createUniqueClassName,
  getNodeTextContent,
  HTMLElementProps,
  Theme,
} from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

import MenuContext from './MenuContext';
import {
  activeDescriptionTextStyle,
  activeIconStyle,
  activeMenuItemContainerStyle,
  activeTitleTextStyle,
  descriptionTextThemeStyle,
  disabledMenuItemContainerThemeStyle,
  disabledTextStyle,
  focusedMenuItemContainerStyle,
  focusedSubMenuItemBorderStyles,
  getFocusedStyles,
  getHoverStyles,
  linkDescriptionTextStyle,
  linkStyle,
  mainIconBaseStyle,
  mainIconThemeStyle,
  menuItemContainerStyle,
  menuItemContainerThemeStyle,
  menuItemHeight,
  paddingLeftWithGlyph,
  paddingLeftWithoutGlyph,
  textContainer,
  titleTextStyle,
} from './styles';
import { Size } from './types';

const subMenuContainerClassName = createUniqueClassName('sub-menu-container');
const iconButtonClassName = createUniqueClassName('icon-button');
const chevronClassName = createUniqueClassName('icon-button-chevron');

const iconButtonContainerSize = 28;

const subMenuStyle = css`
  padding-right: ${iconButtonContainerSize + 16}px;
  align-items: center;
  justify-content: flex-start;
`;

const subMenuThemeStyle: Record<Theme, string> = {
  [Theme.Light]: cx(
    subMenuStyle,
    css`
      background-color: ${palette.black};
    `,
  ),
  [Theme.Dark]: cx(
    subMenuStyle,
    css`
      background-color: ${palette.gray.light2};
    `,
  ),
};

const subMenuOpenStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: transparent;

    &:hover {
      background-color: ${palette.gray.dark3};
    }
  `,
  [Theme.Dark]: css`
    background-color: transparent;

    &:hover {
      background-color: ${palette.gray.light1};
    }
  `,
};

const closedIconStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    transition: color 200ms ease-in-out;
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    transition: color 200ms ease-in-out;
    color: ${palette.gray.dark1};
  `,
};

const openIconStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

const iconButtonStyle = css`
  position: absolute;
  z-index: 1;
  right: 8px;
  top: 0;
  bottom: 0;
  margin: auto;
  transition: background-color ${transitionDuration.default}ms ease-in-out;
`;

const iconButtonThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};

    &:hover {
      background-color: ${palette.gray.dark2};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.light2};

    &:hover {
      &:before {
        background-color: ${palette.gray.light3};
      }
    }
  `,
};

const iconButtonFocusedThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus-visible {
      .${chevronClassName} {
        color: ${palette.white};
      }
    }
  `,
  [Theme.Dark]: css`
    &:focus-visible {
      .${chevronClassName} {
        color: ${palette.black};
      }
    }
  `,
};

const openIconButtonStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.light2};
  `,
};

const ulStyle = css`
  list-style: none;
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: height ${transitionDuration.default}ms ease-in-out;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    right: 0;
    z-index: 1;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

const ulThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &::before,
    &::after {
      background-color: ${palette.gray.dark2};
    }
  `,
  [Theme.Dark]: css`
    &::before,
    &::after {
      background-color: ${palette.gray.light1};
    }
  `,
};

const menuItemText = css`
  width: 100%;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  padding-left: 16px;
  text-shadow: none;
`;

const menuItemBorder = css`
  position: absolute;
  width: 100%;
  height: 1px;
  background: ${palette.gray.dark2};
  top: 0;
`;

const menuItemBorderBottom = css`
  ${menuItemBorder};
  top: unset;
  bottom: 0;
`;

const subItemStyle = css`
  // Reassign the variable for specificity
  --lg-menu-item-text-color: ${palette.gray.light1};
  position: relative;
  min-height: 32px;

  > div {
    padding-left: 16px;
  }

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    right: 0;
    z-index: 1;
    bottom: 0;
  }
`;

const subItemThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};

    &::after {
      background-color: ${palette.gray.dark2};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};

    &:hover {
      color: ${palette.black};
    }

    &::after {
      background-color: ${palette.gray.light1};
    }
  `,
};

const subMenuItemHeight = 32;

interface BaseSubMenuProps extends HTMLElementProps<'button'> {
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
   *
   * @type `<Icon />` component
   *
   */
  glyph?: React.ReactElement;

  /**
   * Main text rendered in `SubMenu`.
   */
  title?: string;

  /**
   * Content rendered inside of `SubMenu`.
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children?: React.ReactNode;

  onClick?: React.MouseEventHandler;

  onExited?: ExitHandler<HTMLElement>;

  href?: string;

  /**
   * Size of the MenuItem component, can be `default` or `large`. This size only affects the parent MenuItem, nested child MenuItems do not change.
   */
  size?: Size;

  /**
   * The component or HTML Element that the button is rendered as.
   *
   * To use with NextJS Links, pass in a component that wraps the Link:
   * ```js
   * const Linker = ({ href, children, ...props }) => (
   *  <NextLink href={href}>
   *    <a {...props}>{children}</a>
   *  </NextLink>
   * );
   * <Button as={Linker} />
   * ```
   * @type HTMLElement | React.Component
   */
  as?: React.ElementType<any>;
}

export type SubMenuProps = BoxProps<'button', BaseSubMenuProps>;

const SubMenu = React.forwardRef(
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
      size = Size.Default,
      ...rest
    }: SubMenuProps,
    ref: React.Ref<any>,
  ) => {
    const { theme, darkMode } = useContext(MenuContext);
    const hoverStyles = getHoverStyles(subMenuContainerClassName, theme);
    const focusStyles = getFocusedStyles(subMenuContainerClassName, theme);

    const nodeRef = React.useRef(null);

    const [iconButtonElement, setIconButtonElement] =
      useState<HTMLElement | null>(null);

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

    const ChevronIcon = open ? ChevronDownIcon : ChevronUpIcon;
    const chevronIconStyles = cx({
      [openIconStyle[theme]]: open,
      [closedIconStyle[theme]]: !open,
    });

    const handleChevronClick = (e: React.MouseEvent) => {
      // we stop the event from propagating and closing the entire menu
      e.nativeEvent.stopImmediatePropagation();

      if (setOpen) {
        setOpen(!open);
      }
    };

    // TODO: This code is duplicated in `MenuItem`
    // We should consider combining these.
    // See: https://github.com/mongodb/leafygreen-ui/pull/1176
    const isAnchor = typeof rest.href === 'string';

    const updatedGlyph =
      glyph &&
      React.cloneElement(glyph, {
        role: 'presentation',
        className: cx(
          mainIconBaseStyle,
          mainIconThemeStyle[theme],
          focusStyles.iconStyle,
          {
            [activeIconStyle[theme]]: active,
          },
          glyph.props?.className,
        ),
      });

    const boxProps = {
      ref,
      role: 'menuitem',
      'aria-haspopup': true,
      onClick: onRootClick,
      tabIndex: disabled ? -1 : undefined,
      'aria-disabled': disabled,
      // only add a disabled prop if not an anchor
      ...(typeof rest.href !== 'string' && { disabled }),
    };

    const anchorProps = isAnchor
      ? {
          target: '_self',
          rel: '',
        }
      : {};

    const content = (
      <>
        {updatedGlyph}
        <div className={textContainer}>
          <div
            data-text={getNodeTextContent(children)}
            className={cx(
              titleTextStyle,
              hoverStyles.text,
              {
                [activeTitleTextStyle[theme]]: active,
                [hoverStyles.activeText]: active,
                [disabledTextStyle[theme]]: disabled,
              },
              focusStyles.textStyle,
            )}
          >
            {title}
          </div>
          {description && (
            <div
              className={cx(
                descriptionTextThemeStyle[theme],
                {
                  [activeDescriptionTextStyle[theme]]: active,
                  [disabledTextStyle[theme]]: disabled,
                  [linkDescriptionTextStyle]: typeof rest.href === 'string',
                },
                focusStyles.descriptionStyle,
              )}
            >
              {description}
            </div>
          )}
        </div>
      </>
    );

    const as = isAnchor ? 'a' : 'button';

    return (
      <li role="none">
        <Box
          as={as}
          {...boxProps}
          {...anchorProps}
          {...rest}
          className={cx(
            subMenuContainerClassName,
            menuItemContainerStyle,
            menuItemContainerThemeStyle[theme],
            menuItemHeight(size),
            linkStyle,
            subMenuThemeStyle[theme],
            {
              [activeMenuItemContainerStyle[theme]]: active,
              [disabledMenuItemContainerThemeStyle[theme]]: disabled,
              [subMenuOpenStyle[theme]]: open,
            },
            focusedMenuItemContainerStyle[theme],
            className,
          )}
        >
          {content}
          <IconButton
            data-testid="lg-sub-menu-icon-button"
            darkMode={!darkMode}
            ref={setIconButtonElement}
            aria-label={open ? 'Close Sub-menu' : 'Open Sub-menu'}
            className={cx(
              iconButtonClassName,
              iconButtonStyle,
              iconButtonThemeStyle[theme],
              iconButtonFocusedThemeStyle[theme],
              {
                [openIconButtonStyle[theme]]: open,
              },
            )}
            onClick={handleChevronClick}
          >
            <ChevronIcon
              role="presentation"
              className={cx(chevronClassName, chevronIconStyles)}
              size={14}
            />
          </IconButton>
        </Box>

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
              className={cx(
                ulStyle,
                ulThemeStyles[theme],
                css`
                  &::before {
                    // this is the width for the UL border
                    width: calc(
                      100% -
                        ${glyph
                          ? paddingLeftWithGlyph
                          : paddingLeftWithoutGlyph}px
                    );
                  }
                `,
                {
                  [css`
                    height: ${subMenuItemHeight * numberOfMenuItems}px;
                  `]: state === 'entered',
                },
              )}
              role="menu"
              aria-label={title}
            >
              {React.Children.map(
                children as React.ReactElement,
                (child, index) => {
                  const { className, ...rest } = child.props;
                  return React.cloneElement(child, {
                    size: Size.Default,
                    children: (
                      <>
                        <div className={menuItemBorder} />
                        <span className={menuItemText}>
                          {child.props.children}
                        </span>
                        {index === numberOfMenuItems - 1 && (
                          <div className={menuItemBorderBottom} />
                        )}
                      </>
                    ),
                    className: cx(
                      subItemStyle,
                      subItemThemeStyle[theme],
                      css`
                        // padding-left of the button
                        padding-left: ${glyph
                          ? paddingLeftWithGlyph
                          : paddingLeftWithoutGlyph}px;
                        &::after {
                          // this is the width for the button bottom border
                          width: calc(
                            100% -
                              ${glyph
                                ? paddingLeftWithGlyph
                                : paddingLeftWithoutGlyph}px
                          );
                        }
                      `,
                      focusedSubMenuItemBorderStyles[theme],
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
                    ...rest,
                  });
                },
              )}
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
