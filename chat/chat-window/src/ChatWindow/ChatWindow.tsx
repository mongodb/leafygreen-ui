import React, { forwardRef, ReactChild } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import {
  useLeafyGreenChatContext,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { TitleBar } from '@lg-chat/title-bar';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';

import {
  contentContainerStyles,
  getContainerStyles,
  getInputBarStyles,
  getInputBarWrapperStyles,
} from './ChatWindow.styles';
import { ChatWindowProps } from './ChatWindow.types';

export const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(
  (
    {
      children,
      className,
      darkMode: darkModeProp,
      title,
      badgeText,
      onClose,
      iconSlot,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const { containerWidth, variant } = useLeafyGreenChatContext();

    const isCompact = variant === Variant.Compact;
    const isMobile = !!containerWidth && containerWidth < breakpoints.Tablet;
    const flattenedChildren = flattenChildren(children) as Array<ReactChild>;
    const renderedChildren = flattenedChildren.map(child => {
      if (isComponentType(child, 'InputBar')) {
        return (
          <div
            className={getInputBarWrapperStyles({
              isCompact,
              isMobile,
            })}
            key="input-bar-container"
          >
            <div className={getInputBarStyles(isCompact)}>{child}</div>
          </div>
        );
      } else {
        return child;
      }
    });

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={getContainerStyles({
            className,
            isCompact,
            theme,
          })}
          ref={fwdRef}
          {...rest}
        >
          {!isCompact && title && (
            <TitleBar
              title={title}
              badgeText={badgeText}
              onClose={onClose}
              iconSlot={iconSlot}
            />
          )}
          <div className={contentContainerStyles}>{renderedChildren}</div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

ChatWindow.displayName = 'ChatWindow';
