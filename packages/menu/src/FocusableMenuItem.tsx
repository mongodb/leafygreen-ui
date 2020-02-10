import React from 'react';

export const FocusableMenuItemProps = {};
export interface FocusableMenuItemProps {
  children: React.ReactElement;
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

export default FocusableMenuItem;
