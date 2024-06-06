import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { css, cx } from '@leafygreen-ui/emotion';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphicComponent,
} from '@leafygreen-ui/polymorphic';

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
      as: asProp,
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
    const as = useInferredPolymorphicComponent(asProp, rest, 'button');
    const { theme, darkMode, highlightIndex } = useContext(MenuContext);
    const { index, ref, id } = useDescendant(MenuDescendantsContext, fwdRef, {
      active,
      disabled,
    });

    const isHighlighted = index === highlightIndex;

    return (
      <li
        ref={ref}
        id={id}
        role="none"
        className={cx(menuItemClassName, menuItemContainerStyles)}
      >
        <InputOption
          as={as}
          role="menuitem"
          target="_self"
          rel=""
          // tabIndex={-1}
          data-index={index}
          aria-disabled={disabled}
          aria-current={active ?? undefined}
          disabled={disabled}
          darkMode={darkMode}
          showWedge
          // highlighted={isHighlighted}
          data-highlighted={isHighlighted}
          className={cx(
            getMenuItemStyles({
              theme,
              size,
              active,
              variant,
            }),
            className,
          )}
          {...rest}
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
