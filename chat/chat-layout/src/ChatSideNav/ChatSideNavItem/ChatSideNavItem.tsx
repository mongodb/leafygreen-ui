import React, { ComponentType } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { AriaCurrentValue } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { ChatSideNavSubcomponentProperty } from '../ChatSideNav.types';

import { getItemStyles } from './ChatSideNavItem.styles';
import type {
  BaseChatSideNavItemProps,
  ChatSideNavItemProps,
} from './ChatSideNavItem.types';

export const ChatSideNavItem = CompoundSubComponent(
  InferredPolymorphic<BaseChatSideNavItemProps, 'div'>(
    (
      { as, active = false, className, children, onClick, ...restProps },
      ref,
    ) => {
      const { Component, rest } = useInferredPolymorphic(as, restProps, 'div');
      const { theme } = useDarkMode();

      return (
        <Component
          {...rest}
          aria-current={active ? AriaCurrentValue.Page : AriaCurrentValue.Unset}
          className={getItemStyles({
            active,
            theme,
            className,
          })}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </Component>
      );
    },
  ) as ComponentType<ChatSideNavItemProps>,
  {
    displayName: 'ChatSideNavItem',
    key: ChatSideNavSubcomponentProperty.SideNavItem,
  },
);
