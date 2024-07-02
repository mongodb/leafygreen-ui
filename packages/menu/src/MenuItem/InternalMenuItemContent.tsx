import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import {
  InferredPolymorphicProps,
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';
import { color } from '@leafygreen-ui/tokens';

import {
  useMenuContext,
  useMenuGroupContext,
  useSubMenuContext,
} from '../MenuContext';

import {
  getDarkInLightModeMenuItemStyles,
  getMenuItemStyles,
  getNestedMenuItemStyles,
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
    const { depth: submenuDepth, hasIcon: submenuHasIcon } =
      useSubMenuContext();
    const { depth: groupDepth, hasIcon: groupHasIcon } = useMenuGroupContext();
    const isNested = !!(submenuDepth || groupDepth);

    // @ts-expect-error
    // highlighted isn't a prop on this component, but could be passed in from MenuItem.
    // Generally this will not be provided, but is permitted here to support isolated visual testing in Storybook
    const forceHighlight = rest.highlighted;
    const highlighted = id === highlight?.id || forceHighlight;

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
        data-depth={submenuDepth}
        className={cx(
          getMenuItemStyles({
            active,
            disabled,
            highlighted,
            theme,
            variant,
          }),

          {
            [getNestedMenuItemStyles({
              theme,
              submenuDepth,
              submenuHasIcon,
              groupDepth,
              groupHasIcon,
            })]: isNested,

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
            `]: theme === 'light' && renderDarkMenu && submenuDepth > 0,
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
