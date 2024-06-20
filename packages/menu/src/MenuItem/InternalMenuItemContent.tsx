import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import {
  InferredPolymorphicProps,
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';
import { color, spacing } from '@leafygreen-ui/tokens';

import { useMenuContext, useSubMenuContext } from '../MenuContext';

import {
  getDarkInLightModeMenuItemStyles,
  getMenuItemStyles,
  getSubMenuItemStyles,
} from './MenuItem.styles';
import { MenuItemProps, Variant } from './MenuItem.types';

export type InternalMenuItemContentProps = InferredPolymorphicProps<
  PolymorphicAs,
  MenuItemProps
> & {
  index: number;
};

/**
 * Internal component shared by MenuItem and SubMenu
 */
export const InternalMenuItemContent = React.forwardRef<
  HTMLElement,
  InternalMenuItemContentProps
>(
  (
    {
      as: asProp,
      index,
      id,
      disabled = false,
      active = false,
      description,
      glyph,
      variant = Variant.Default,
      children,
      className,
      rightGlyph,
      ...rest
    },
    fwdRef,
  ) => {
    const { as } = useInferredPolymorphic(asProp, rest, 'button');

    const { theme, darkMode, highlight, renderDarkMenu } = useMenuContext();
    const { depth, hasIcon: parentHasIcon } = useSubMenuContext();
    const isSubMenuItem = depth > 0;
    const highlighted = id === highlight?.id;

    const defaultAnchorProps =
      as === 'a'
        ? {
            as,
            target: '_self',
            rel: '',
          }
        : {};

    return (
      <InputOption
        ref={fwdRef}
        as={as}
        role="menuitem"
        data-index={index}
        aria-disabled={disabled}
        aria-current={active ?? undefined}
        disabled={disabled}
        darkMode={darkMode}
        showWedge
        highlighted={highlighted}
        data-depth={depth}
        className={cx(
          getMenuItemStyles({
            active,
            disabled,
            highlighted,
            theme,
            variant,
          }),

          {
            [getSubMenuItemStyles({ theme, parentHasIcon })]: isSubMenuItem,

            // TODO: Remove dark-in-light mode styles
            // after https://jira.mongodb.org/browse/LG-3974
            [getDarkInLightModeMenuItemStyles({
              active,
              disabled,
              highlighted,
              theme,
              variant,
            })]: theme === 'light' && renderDarkMenu,
            [css`
              &:after {
                background-color: ${color.dark.border.secondary.default};
              }
            `]: theme === 'light' && renderDarkMenu && depth > 0,
          },
          className,
        )}
        {...defaultAnchorProps}
        {...rest}
      >
        <InputOptionContent
          leftGlyph={glyph}
          description={description}
          rightGlyph={rightGlyph}
          preserveIconSpace={false}
          className={cx({
            [css`
              position: relative;
              padding-left: ${parentHasIcon ? spacing[900] : spacing[600]}px;
              border-top: 1px solid transparent;
            `]: depth > 0,
          })}
        >
          <div
            className={css`
              font-weight: 500;
            `}
          >
            {children}
          </div>
        </InputOptionContent>
      </InputOption>
    );
  },
);

InternalMenuItemContent.displayName = 'InternalMenuItemContent';
