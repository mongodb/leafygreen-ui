import React, { ComponentType, useEffect, useRef, useState } from 'react';

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

      const textRef = useRef<HTMLSpanElement>(null);
      const [isTruncated, setIsTruncated] = useState(false);

      const tooltipTextContent = getNodeTextContent(children);

      useEffect(() => {
        const checkTruncation = () => {
          if (!textRef.current) {
            return;
          }

          const shouldTruncate =
            textRef.current.scrollWidth > textRef.current.clientWidth;

          if (isTruncated === shouldTruncate) {
            return;
          }

          setIsTruncated(shouldTruncate);
        };

        checkTruncation();

        const resizeObserver = new ResizeObserver(checkTruncation);

        if (textRef.current) {
          resizeObserver.observe(textRef.current);
        }

        return () => {
          resizeObserver.disconnect();
        };
      }, [children, isTruncated]);

      return (
        <Tooltip
          align={Align.Right}
          enabled={isTruncated}
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
              <span className={textOverflowStyles} ref={textRef}>
                {children}
              </span>
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
