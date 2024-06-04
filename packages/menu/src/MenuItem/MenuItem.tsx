import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { css, cx } from '@leafygreen-ui/emotion';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { InferredPolymorphic, PolymorphicAs } from '@leafygreen-ui/polymorphic';

import { MenuContext, MenuDescendantsContext } from '../MenuContext';
import { Size } from '../types';

import {
  getMenuItemContentStyles,
  getMenuItemStyles,
  menuItemContainerStyles,
} from './MenuItem.styles';
import { MenuItemProps, Variant } from './MenuItem.types';

const menuItemClassName = createUniqueClassName('menu_item');

export const MenuItem = InferredPolymorphic<MenuItemProps, 'button'>(
  (
    {
      as = 'button' as PolymorphicAs,
      disabled = false,
      active = false,
      size = Size.Default,
      className,
      children,
      description,
      glyph,
      variant = Variant.Default,
      ...rest
    },
    fwdRef: React.Ref<any>,
  ) => {
    const { theme, darkMode, highlightIndex } = useContext(MenuContext);
    const { index, ref } = useDescendant(MenuDescendantsContext, fwdRef, {
      active,
      disabled,
    });

    const isHighlighted = index === highlightIndex;

    const conditionalProps =
      as === 'a'
        ? {
            target: '_self',
            rel: '',
          }
        : { disabled };

    return (
      <li
        role="none"
        ref={ref}
        className={cx(menuItemClassName, menuItemContainerStyles, className)}
      >
        <InputOption
          {...rest}
          darkMode={darkMode}
          showWedge
          as={as}
          role="menuitem"
          tabIndex={-1}
          data-index={index}
          aria-disabled={disabled}
          aria-current={active ?? undefined}
          highlighted={isHighlighted}
          {...conditionalProps}
          className={getMenuItemStyles({
            theme,
            size,
            active,
            variant,
          })}
        >
          <InputOptionContent
            leftGlyph={glyph}
            description={description}
            preserveIconSpace={false}
            className={getMenuItemContentStyles({
              hasGlyph: !!glyph,
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
      </li>
    );
  },
  'MenuItem',
);

MenuItem.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  description: PropTypes.node,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default MenuItem;
