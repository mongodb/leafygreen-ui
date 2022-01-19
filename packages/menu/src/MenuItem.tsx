import React from 'react';
import PropTypes from 'prop-types';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import Box, { BoxProps, ExtendableBox } from '@leafygreen-ui/box';
import {
  menuItemContainerStyle,
  activeMenuItemContainerStyle,
  disabledMenuItemContainerStyle,
  focusedMenuItemContainerStyle,
  linkStyle,
  disabledTextStyle,
  mainIconStyle,
  activeIconStyle,
  titleTextStyle,
  activeTitleTextStyle,
  descriptionTextStyle,
  linkDescriptionTextStyle,
  activeDescriptionTextStyle,
  textContainer,
} from './styles';

const menuItemContainer = createDataProp('menu-item-container');

const focusTitleTextStyle = css`
  ${menuItemContainer.selector}:focus & {
    color: ${palette.blue.dark3};
  }
`;

const focusDescriptionTextStyle = css`
  ${menuItemContainer.selector}:focus & {
    color: ${palette.blue.light3};
  }
`;

const mainIconFocusedStyle = css`
  ${menuItemContainer.selector}:focus > & {
    color: ${palette.white};
  }
`;

const Size = {
  Default: 'default',
  Large: 'large',
} as const;

type Size = typeof Size[keyof typeof Size];

const menuItemHeight: Record<Size, string> = {
  [Size.Default]: css`
    min-height: 36px;
  `,

  [Size.Large]: css`
    min-height: 56px;
  `,
};

interface BaseMenuItemProps {
  /**
   * Determines whether or not the MenuItem is active.
   */
  active?: boolean;

  /**
   * Description element displayed below title in MenuItem.
   */
  description?: React.ReactNode;

  /**
   * Determines whether or not the MenuItem is disabled.
   */
  disabled?: boolean;

  /**
   * Slot to pass in an Icon rendered to the left of `MenuItem` text.
   */
  glyph?: React.ReactElement;

  /**
   * Size of the MenuItem component, can be `default` or `large`
   */
  size?: Size;

  /**
   * className applied to  `li` element
   */
  className?: string;

  /**
   * Content to appear inside of `<MenuItem />` component
   */
  children?: React.ReactNode;

  href?: string;
}

const MenuItem: ExtendableBox<
  BaseMenuItemProps & { ref?: React.Ref<any> },
  'button'
> = React.forwardRef(
  (
    {
      disabled = false,
      active = false,
      size = 'default',
      className,
      children,
      description,
      glyph,
      ...rest
    }: BaseMenuItemProps,
    ref: React.Ref<any>,
  ) => {
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();

    const updatedGlyph =
      glyph &&
      React.cloneElement(glyph, {
        role: 'presentation',
        className: cx(
          mainIconStyle,
          {
            [activeIconStyle]: active,
            [mainIconFocusedStyle]: showFocus,
          },
          glyph.props?.className,
        ),
      });

    const commonProps = {
      ...rest,
      ...menuItemContainer.prop,
      ref,
      className: cx(
        menuItemContainerStyle,
        menuItemHeight[size],
        linkStyle,
        titleTextStyle,
        {
          [activeTitleTextStyle]: active,
          [disabledTextStyle]: disabled,
          [focusTitleTextStyle]: showFocus,
          [activeMenuItemContainerStyle]: active,
          [disabledMenuItemContainerStyle]: disabled,
          [focusedMenuItemContainerStyle]: showFocus,
        },
        className,
      ),
      role: 'menuitem',
      tabIndex: disabled ? -1 : undefined,
      // only add a disabled prop if not an anchor
      ...(typeof rest.href !== 'string' && { disabled }),
      'aria-disabled': disabled,
    };

    const anchorProps = {
      target: '_self',
      rel: '',
    };

    const content = (
      <>
        {updatedGlyph}
        <div className={textContainer}>
          <div>{children}</div>
          {description && (
            <div
              className={cx(descriptionTextStyle, {
                [activeDescriptionTextStyle]: active,
                [disabledTextStyle]: disabled,
                [focusDescriptionTextStyle]: showFocus,
                [linkDescriptionTextStyle]: typeof rest.href === 'string',
              })}
            >
              {rest.href}
              {description}
            </div>
          )}
        </div>
      </>
    );

    if (typeof rest.href === 'string') {
      return (
        <li role="none">
          <Box as="a" {...anchorProps} {...commonProps}>
            {content}
          </Box>
        </li>
      );
    }

    return (
      <li role="none">
        <Box as="button" {...commonProps}>
          {content}
        </Box>
      </li>
    );
  },
);

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  description: PropTypes.node,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default MenuItem;

export type MenuItemElement = React.ReactComponentElement<
  typeof MenuItem,
  BoxProps<'button', BaseMenuItemProps & { ref?: React.Ref<any> }>
>;
