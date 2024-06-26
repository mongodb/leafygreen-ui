import React, { ComponentPropsWithRef, ReactElement } from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';

import { MenuDescendantsContext, useMenuContext } from '../MenuContext';

import { getFocusableMenuItemWrapperStyles } from './FocusableMenuItem.styles';

/**
 * Renders arbitrary focusable components as descendants in a menu context.
 *
 * By wrapping a single focusable component in `FocusableMenuItem`,
 * it will be registered as a menu item descendant,
 * and will be focusable using standard menu arrow key interactions.
 *
 * Note: the single child of `FocusableMenuItem` must _itself_ be focusable.
 * Wrapping a focusable element (e.g. `input` in a `div`)
 * will not enable menu descendant functionality.
 *
 * @internal
 */
export const FocusableMenuItem = React.forwardRef<
  HTMLElement,
  ComponentPropsWithRef<'div'>
>(({ children, className, ...rest }, fwdRef) => {
  const { theme } = useMenuContext();
  const { ref } = useDescendant(MenuDescendantsContext, fwdRef, {});
  const child = React.Children.only(children) as ReactElement;

  return child ? (
    <div
      className={cx(getFocusableMenuItemWrapperStyles(theme), className)}
      role="menuitem"
      {...rest}
    >
      {React.cloneElement(child, {
        ref,
      })}
    </div>
  ) : null;
});

FocusableMenuItem.displayName = 'FocusableMenuItem';

FocusableMenuItem.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FocusableMenuItem;
