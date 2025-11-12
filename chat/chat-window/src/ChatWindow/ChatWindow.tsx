import React, { forwardRef, ReactChild } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { TitleBar } from '@lg-chat/title-bar';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import {
  getContainerStyles,
  hiddenSpacerStyles,
  inputBarWrapperStyles,
} from './ChatWindow.styles';
import { ChatWindowProps } from './ChatWindow.types';

export const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(
  (
    { children, className, darkMode: darkModeProp, title, badgeText, ...rest },
    fwdRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);

    const flattenedChildren = flattenChildren(children) as Array<ReactChild>;
    const renderedChildren = flattenedChildren.map(child => {
      if (isComponentType(child, 'InputBar')) {
        return (
          <div className={inputBarWrapperStyles} key="input-bar-wrapper">
            {child}
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
          })}
          ref={fwdRef}
          {...rest}
        >
          {title && <TitleBar title={title} badgeText={badgeText} />}
          {/* Hidden spacer to push messages and input bar to bottom when content is shorter than container */}
          <div aria-hidden="true" className={hiddenSpacerStyles} />
          {renderedChildren}
        </div>
      </LeafyGreenProvider>
    );
  },
);

ChatWindow.displayName = 'ChatWindow';
