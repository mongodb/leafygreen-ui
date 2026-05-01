import React, { forwardRef, useMemo } from 'react';

import {
  CompoundComponent,
  filterChildren,
  findChild,
} from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import {
  ActionCard,
  Actions,
  Links,
  Promotion,
  VerifiedBanner,
} from '../components';
import { MessageContext } from '../MessageContext';
import { MessageSubcomponentProperty } from '../shared.types';

import { getContainerStyles } from './Message.styles';
import { type MessageProps } from './Message.types';
import { MessageContent } from './MessageContent';

export const Message = CompoundComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, MessageProps>(
    (
      {
        children,
        className,
        darkMode: darkModeProp,
        isSender = true,
        markdownProps,
        messageBody,
        sourceType,
        ...rest
      },
      fwdRef,
    ) => {
      const { darkMode, theme } = useDarkMode(darkModeProp);

      const contextValue = useMemo(
        () => ({
          messageBody,
        }),
        [messageBody],
      );

      // Find subcomponents
      const actionCard = findChild(
        children,
        MessageSubcomponentProperty.ActionCard,
      );
      const promotion = findChild(
        children,
        MessageSubcomponentProperty.Promotion,
      );
      const actions = findChild(children, MessageSubcomponentProperty.Actions);
      const verifiedBanner = findChild(
        children,
        MessageSubcomponentProperty.VerifiedBanner,
      );
      const links = findChild(children, MessageSubcomponentProperty.Links);

      // Filter out subcomponents from children
      const remainingChildren = filterChildren(
        children,
        Object.values(MessageSubcomponentProperty),
      );

      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <MessageContext.Provider value={contextValue}>
            <div
              className={getContainerStyles({
                className,
                isSender,
                theme,
              })}
              ref={fwdRef}
              {...rest}
            >
              <MessageContent sourceType={sourceType} {...markdownProps}>
                {messageBody ?? ''}
              </MessageContent>
              {actionCard}
              {promotion}
              {actions}
              {verifiedBanner}
              {links}
              {remainingChildren}
            </div>
          </MessageContext.Provider>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'Message',
    ActionCard,
    Actions,
    Links,
    VerifiedBanner,
    Promotion,
  },
);
