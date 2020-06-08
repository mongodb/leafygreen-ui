import React from 'react';
import PropTypes from 'prop-types';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import Box, { BoxProps, OverrideComponentCast } from '@leafygreen-ui/box';
import {
  menuItemContainerStyle,
  activeMenuItemContainerStyle,
  disabledMenuItemContainerStyle,
  focusedMenuItemContainerStyle,
  linkStyle,
  disabledTextStyle,
  svgWidth,
  paddingLeft,
  menuItemPadding,
} from './styles';

const menuItemContainer = createDataProp('menu-item-container');

const titleTextStyle = css`
  width: 100%;
  font-size: 14px;
  font-weight: normal;
  color: ${uiColors.gray.dark2};
`;

const focusTitleTextStyle = css`
  ${menuItemContainer.selector}:focus & {
    color: ${uiColors.blue.dark3};
  }
`;

const activeTitleTextStyle = css`
  font-weight: bold;
  color: ${uiColors.green.dark3};
`;

const activeDescriptionTextStyle = css`
  color: ${uiColors.green.dark2};
`;

const descriptionTextStyle = css`
  font-size: 12px;
  font-weight: normal;
  color: ${uiColors.gray.dark1};
`;

const focusDescriptionTextStyle = css`
  ${menuItemContainer.selector}:focus & {
    color: ${uiColors.blue.dark2};
  }
`;

const mainIconStyle = css`
  color: ${uiColors.gray.base};
  margin-right: ${paddingLeft - svgWidth - menuItemPadding}px;
  flex-shrink: 0;

  ${menuItemContainer.selector}:hover > & {
    color: ${uiColors.gray.dark1};
  }
`;

const mainIconFocusedStyle = css`
  ${menuItemContainer.selector}:focus > & {
    color: ${uiColors.blue.base};
  }
`;

const activeIconStyle = css`
  color: ${uiColors.green.base};
  ${menuItemContainer.selector}:hover > & {
    color: ${uiColors.green.base};
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
}

// eslint-disable-next-line
const MenuItem: OverrideComponentCast<BaseMenuItemProps> = React.forwardRef(
  <
    C extends React.ElementType = 'button',
    H extends string | undefined = undefined
  >(
    {
      disabled = false,
      active = false,
      size = 'default',
      className,
      children,
      description,
      glyph,
      ...rest
    }: BoxProps<C, H, BaseMenuItemProps>,
    ref: React.Ref<any>,
  ) => {
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();

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

    const commonProps = {
      ...rest,
      ...menuItemContainer.prop,
      ref,
      className: cx(
        menuItemContainerStyle,
        menuItemHeight[size],
        linkStyle,
        {
          [activeMenuItemContainerStyle]: active,
          [disabledMenuItemContainerStyle]: disabled,
          [focusedMenuItemContainerStyle]: showFocus,
        },
        className,
      ),
      role: 'menuitem',
      tabIndex: disabled ? -1 : undefined,
      // only add a disabled prop if not an anchor
      ...(!rest.href && { disabled }),
      'aria-disabled': disabled,
    };

    const anchorProps = {
      target: '_self',
      rel: '',
    };

    const content = (
      <>
        {updatedGlyph}
        <div
          className={css`
            width: 100%;
          `}
        >
          <div
            className={cx(titleTextStyle, {
              [activeTitleTextStyle]: active,
              [disabledTextStyle]: disabled,
              [focusTitleTextStyle]: showFocus,
            })}
          >
            {children}
          </div>
          {description && (
            <div
              className={cx(descriptionTextStyle, {
                [activeDescriptionTextStyle]: active,
                [disabledTextStyle]: disabled,
                [focusDescriptionTextStyle]: showFocus,
              })}
            >
              {description}
            </div>
          )}
        </div>
      </>
    );

    if (rest.href) {
      return (
        <li>
          <Box as="a" {...anchorProps} {...commonProps}>
            {content}
          </Box>
        </li>
      );
    }

    return (
      <li>
        <Box as="button" {...commonProps}>
          {content}
        </Box>
      </li>
    );
  },
);

// @ts-ignore Property 'displayName' does not exist on type 'OverrideComponentCast<BaseMenuItemProps>'.
MenuItem.displayName = 'MenuItem';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
MenuItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  description: PropTypes.node,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
  ref: PropTypes.shape({ current: PropTypes.instanceOf(Element).isRequired }),
};

export default MenuItem;
