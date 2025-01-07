import React, { MouseEventHandler } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';
import { InferredPolymorphic } from '@leafygreen-ui/polymorphic';

import { LGIDs } from '../constants';
import { MenuDescendantsContext } from '../MenuContext';

import { InternalMenuItemContent } from './InternalMenuItemContent';
import { menuItemClassName, menuItemContainerStyles } from './MenuItem.styles';
import { InternalMenuItemProps } from './MenuItem.types';

export const MenuItem = InferredPolymorphic<InternalMenuItemProps, 'button'>(
  (
    { as, disabled = false, active = false, onClick, ...rest },
    fwdRef: React.Ref<any>,
  ) => {
    const { index, ref, id } = useDescendant(MenuDescendantsContext, fwdRef, {
      active,
      disabled,
    });

    const handleClick: MouseEventHandler = e => {
      if (disabled) return;
      onClick?.(e);
    };

    return (
      <li
        id={id}
        role="none"
        className={cx(menuItemClassName, menuItemContainerStyles)}
        data-testid={LGIDs.item}
      >
        <InternalMenuItemContent
          as={as}
          id={id}
          ref={ref}
          index={index}
          active={active}
          disabled={disabled}
          data-id={id}
          onClick={handleClick}
          {...rest}
        />
      </li>
    );
  },
  'MenuItem',
);

export default MenuItem;
