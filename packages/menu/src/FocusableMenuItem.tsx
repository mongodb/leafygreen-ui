import React from 'react';

export interface FocusableMenuItemProps {
  children: React.ReactElement;
}

const FocusableMenuItem = React.forwardRef(
  ({ children }: FocusableMenuItemProps, forwardRef) => {
    return React.cloneElement(children, {
      ref: forwardRef,
    });
  },
);

FocusableMenuItem.displayName = 'FocusableMenuItem';

export default FocusableMenuItem;
