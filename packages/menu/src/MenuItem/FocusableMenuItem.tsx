import React from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '../utils/useDescendants';

import { FocusableMenuItemProps } from './MenuItem.types';

/**
 * For internal use only: Component to allow us to include non-MenuItems in a Menu's group of focusable elements
 * @internal
 */
export const FocusableMenuItem = React.forwardRef(
  ({ children }: FocusableMenuItemProps, __) => {
    const { ref } = useDescendant({});
    return React.cloneElement(children, {
      ref,
    });
  },
);

FocusableMenuItem.displayName = 'FocusableMenuItem';

FocusableMenuItem.propTypes = {
  children: PropTypes.element.isRequired,
  onFocus: PropTypes.func,
};

export default FocusableMenuItem;
