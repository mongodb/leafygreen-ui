import React, { useContext } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import {
  InferredPolymorphicProps,
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { MenuContext } from '../MenuContext';

import {
  getDarkInLightModeMenuItemStyles,
  getMenuItemStyles,
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

    const { theme, darkMode, highlightIndex, renderDarkMenu } =
      useContext(MenuContext);
    const highlighted = index === highlightIndex;

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
        className={cx(
          getMenuItemStyles({
            active,
            disabled,
            highlighted,
            theme,
            variant,
          }),

          // TODO: Remove dark-in-light mode styles
          // after https://jira.mongodb.org/browse/LG-3974
          {
            [getDarkInLightModeMenuItemStyles({
              active,
              disabled,
              highlighted,
              theme,
              variant,
            })]: theme === 'light' && renderDarkMenu,
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
