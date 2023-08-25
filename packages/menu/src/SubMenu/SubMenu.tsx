import React, { useCallback, useContext, useState } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUpIcon from '@leafygreen-ui/icon/dist/ChevronUp';
import IconButton from '@leafygreen-ui/icon-button';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { MenuContext } from '../MenuContext';
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
} from '../styles';
import { Size } from '../types';

import {
  chevronClassName,
  closedIconStyle,
  iconButtonClassName,
  iconButtonFocusedThemeStyle,
  iconButtonStyle,
  iconButtonThemeStyle,
  menuItemBorder,
  menuItemBorderBottom,
  menuItemText,
  openIconButtonStyle,
  openIconStyle,
  subItemStyle,
  subItemThemeStyle,
  subMenuContainerClassName,
  subMenuOpenStyle,
  subMenuThemeStyle,
  ulStyle,
  ulThemeStyles,
} from './SubMenu.styles';
import { SubMenuProps } from './SubMenu.types';

const subMenuItemHeight = 32;

export const SubMenu = InferredPolymorphic<SubMenuProps, 'button'>(
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
      as,
      ...rest
    },
    ref: React.Ref<any>,
  ): React.ReactElement => {
    const { Component } = useInferredPolymorphic(as, rest, 'button');
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
    const isAnchor = Component === 'a';

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

    const baseProps = {
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
                  [linkDescriptionTextStyle]: isAnchor,
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

    return (
      <li role="none">
        <Component
          {...baseProps}
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
        </Component>

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
