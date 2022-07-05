import React from 'react';
import PropTypes from 'prop-types';

export interface FocusableMenuItemProps {
  children: React.ReactElement;
  onFocus?: React.FocusEventHandler;
}

/** For internal use only: Component to allow us to include non-MenuItems in a Menu's group of focusable elements */
const FocusableMenuItem = React.forwardRef(
  ({ children }: FocusableMenuItemProps, forwardRef) => {
    return React.cloneElement(children, {
      ref: forwardRef,
    });
  },
);

FocusableMenuItem.displayName = 'FocusableMenuItem';

FocusableMenuItem.propTypes = {
  children: PropTypes.element.isRequired,
  onFocus: PropTypes.func
};

export default FocusableMenuItem;

export type FocusableMenuItemElement = React.ReactComponentElement<
  typeof FocusableMenuItem,
  FocusableMenuItemProps & { ref?: React.Ref<any> }
>;
