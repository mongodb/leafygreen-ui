import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { css, cx } from '@leafygreen-ui/emotion';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import {
  InferredPolymorphic,
  useInferredPolymorphicComponent,
} from '@leafygreen-ui/polymorphic';

import { MenuContext, MenuDescendantsContext } from '../MenuContext';
import { Size } from '../types';

import {
  getMenuItemStyles,
  menuItemClassName,
  menuItemContainerStyles,
} from './MenuItem.styles';
import { MenuItemProps, Variant } from './MenuItem.types';

export const MenuItem = InferredPolymorphic<MenuItemProps, 'button'>(
  (
    {
      as: asProp,
      disabled = false,
      active = false,
      description,
      glyph,
      size = Size.Default,
      variant = Variant.Default,
      children,
      className,
      rightGlyph,
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
        id={id}
        role="none"
        className={cx(menuItemClassName, menuItemContainerStyles)}
      >
        <InputOption
          ref={ref}
          as={as}
          role="menuitem"
          target="_self"
          rel=""
          data-index={index}
          aria-disabled={disabled}
          aria-current={active ?? undefined}
          disabled={disabled}
          darkMode={darkMode}
          data-id={id}
          showWedge
          highlighted={isHighlighted}
          className={cx(
            getMenuItemStyles({
              theme,
              size,
              active,
              variant,
            }),
            className,
          )}
          // FIXME: explicit labelledby
          aria-labelledby={rest['aria-labelledby'] ?? ''}
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
