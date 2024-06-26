import React, { ComponentPropsWithRef, ReactElement } from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';

import { MenuDescendantsContext, useMenuContext } from '../MenuContext';

import { getMenuDescendantWrapperStyles } from './MenuDescendant.styles';

/**
 * Renders arbitrary focusable components as descendants in a menu context.
 *
 * By wrapping a single focusable component in `MenuDescendant`,
 * it will be registered as a menu item descendant,
 * and will be focusable using standard menu arrow key interactions.
 *
 * Note: the single child of `MenuDescendant` must _itself_ be focusable.
 * Wrapping a focusable element (e.g. `input` in a `div`)
 * will not enable the menu descendant functionality.
 */
export const MenuDescendant = React.forwardRef<
  HTMLElement,
  ComponentPropsWithRef<'div'>
>(({ children, className, ...rest }, fwdRef) => {
  const { theme } = useMenuContext();
  const { ref, id } = useDescendant(MenuDescendantsContext, fwdRef, {});
  const child = React.Children.only(children) as ReactElement;

  return child ? (
    <div
      id={id}
      className={cx(getMenuDescendantWrapperStyles(theme))}
      {...rest}
    >
      {React.cloneElement(child, {
        ref,
      })}
    </div>
  ) : null;
});

MenuDescendant.displayName = 'MenuDescendant';
MenuDescendant.propTypes = {
  children: PropTypes.node,
};
