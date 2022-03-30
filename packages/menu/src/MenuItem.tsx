import React from 'react';
import PropTypes from 'prop-types';
import { createDataProp } from '@leafygreen-ui/lib';
import { BoxProps, ExtendableBox } from '@leafygreen-ui/box';
import { InternalMenuItemContent } from './InternalMenuItemContent';
import { BaseMenuItemProps } from './types';
import { InternalMenuItemBox } from './InternalMenuItemBox';

const menuItemContainer = createDataProp('menu-item-container');

const MenuItem: ExtendableBox<
  BaseMenuItemProps & { ref?: React.Ref<any> },
  'button'
> = React.forwardRef(
  (
    {
      disabled = false,
      active = false,
      size = 'default',
      className,
      children,
      description,
      glyph,
      ...rest
    }: BaseMenuItemProps,
    ref: React.Ref<any>,
  ) => {
    return (
      <li role="none">
        <InternalMenuItemBox
          ref={ref}
          className={className}
          active={active}
          disabled={disabled}
          size={size}
          {...menuItemContainer.prop}
          {...rest}
        >
          <InternalMenuItemContent
            disabled={disabled}
            active={active}
            description={description}
            glyph={glyph}
            container={menuItemContainer}
          >
            {children}
          </InternalMenuItemContent>
        </InternalMenuItemBox>
      </li>
    );
  },
);

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  description: PropTypes.node,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default MenuItem;

export type MenuItemElement = React.ReactComponentElement<
  typeof MenuItem,
  BoxProps<'button', BaseMenuItemProps & { ref?: React.Ref<any> }>
>;
