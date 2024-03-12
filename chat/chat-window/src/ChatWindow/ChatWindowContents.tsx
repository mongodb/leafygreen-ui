import React, { ForwardedRef, forwardRef, ReactChild } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';
import { TitleBar } from '@lg-chat/title-bar';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';

import {
  baseStyles,
  contentContainerStyles,
  lgInputBarContainerStyles,
  lgInputBarStyles,
  mobileInputBarContainerStyles,
  themeStyles,
} from './ChatWindow.styles';
import { ChatWindowProps } from '.';

export const ChatWindowContents = forwardRef(
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
    }: ChatWindowProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const { containerWidth } = useLeafyGreenChatContext();
    const flattenedChildren = flattenChildren(children) as Array<ReactChild>;
    const renderedChildren = flattenedChildren.map(child => {
      if (isComponentType(child, 'InputBar')) {
        return (
          <div
            className={cx(lgInputBarContainerStyles, {
              [mobileInputBarContainerStyles]:
                !!containerWidth && containerWidth < breakpoints.Tablet,
            })}
            key="input-bar-container"
          >
            <div className={lgInputBarStyles}>{child}</div>
          </div>
        );
      } else {
        return child;
      }
    });

    return (
      <div
        className={cx(baseStyles, themeStyles[theme], className)}
        ref={ref}
        {...rest}
      >
        <TitleBar
          title={title}
          badgeText={badgeText}
          onClose={onClose}
          iconSlot={iconSlot}
        />
        <div className={contentContainerStyles}>{renderedChildren}</div>
      </div>
    );
  },
);

ChatWindowContents.displayName = 'ChatWindowContents';
