import React, { ComponentType } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { AriaCurrentValue, getNodeTextContent } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';
import { spacing as spacingToken } from '@leafygreen-ui/tokens';
import {
  Align,
  Justify,
  Tooltip,
  TooltipVariant,
} from '@leafygreen-ui/tooltip';

import { useChatLayoutContext } from '../../ChatLayout';
import { ChatSideNavSubcomponentProperty } from '../ChatSideNav.types';

import { getItemStyles, textOverflowStyles } from './ChatSideNavItem.styles';
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
      const { shouldRenderExpanded } = useChatLayoutContext();

      const tooltipTextContent = getNodeTextContent(children);

      return (
        <Tooltip
          align={Align.Right}
          justify={Justify.Middle}
          spacing={spacingToken[100]}
          variant={TooltipVariant.Compact}
          trigger={
            <Component
              {...rest}
              aria-current={
                active ? AriaCurrentValue.Page : AriaCurrentValue.Unset
              }
              className={getItemStyles({
                active,
                className,
                shouldRenderExpanded,
                theme,
              })}
              onClick={onClick}
              ref={ref}
            >
              <span className={textOverflowStyles}>{children}</span>
            </Component>
          }
        >
          {tooltipTextContent}
        </Tooltip>
      );
    },
  ) as ComponentType<ChatSideNavItemProps>,
  {
    displayName: 'ChatSideNavItem',
    key: ChatSideNavSubcomponentProperty.SideNavItem,
  },
);
