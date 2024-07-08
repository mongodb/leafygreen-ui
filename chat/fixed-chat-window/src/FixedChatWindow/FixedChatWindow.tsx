import React, {
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';
import { TransitionChildren } from 'react-transition-group/Transition';
import { ChatWindow } from '@lg-chat/chat-window';

import { cx } from '@leafygreen-ui/emotion';
import ChevronDown from '@leafygreen-ui/icon/dist/ChevronDown';
import Popover from '@leafygreen-ui/popover';

import { ChatTrigger } from '../ChatTrigger/ChatTrigger';

import {
  baseStyles,
  chatWindowContainerStyles,
  chatWindowStyles,
} from './FixedChatWindow.styles';
import { FixedChatWindowProps } from '.';

export const FixedChatWindow = forwardRef(
  (
    {
      className,
      children,
      defaultOpen = false,
      darkMode,
      trigger,
      badgeText,
      triggerText,
      title,
      open,
      onTriggerClick,
      onClose,
      popoverProps,
      ...rest
    }: FixedChatWindowProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const [localOpen, setLocalOpen] = useState<boolean>(defaultOpen);

    const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = e => {
      if (open === undefined) setLocalOpen(o => !o);
      onTriggerClick?.(e);
    };

    const handleClose: MouseEventHandler<HTMLButtonElement> = e => {
      if (open === undefined) setLocalOpen(false);
      onClose?.(e);
    };

    return (
      <div ref={ref} {...rest} className={cx(baseStyles, className)}>
        {trigger ?? (
          <ChatTrigger onClick={handleTriggerClick}>{triggerText}</ChatTrigger>
        )}
        <Popover
          justify="end"
          align="top"
          {...popoverProps}
          active={open ?? localOpen}
        >
          <Transition nodeRef={chatWindowRef} in timeout={100}>
            {
              (status => (
                <div
                  ref={chatWindowRef}
                  className={chatWindowContainerStyles}
                  style={{
                    transform:
                      status === 'entering' || status === 'entered'
                        ? 'scale(1)'
                        : 'scale(0)',
                    opacity:
                      status === 'entering' || status === 'entered' ? 1 : 0,
                  }}
                >
                  <ChatWindow
                    darkMode={darkMode}
                    badgeText={badgeText}
                    className={chatWindowStyles}
                    title={title}
                    onClose={handleClose}
                    iconSlot={<ChevronDown />}
                  >
                    {children}
                  </ChatWindow>
                </div>
              )) as TransitionChildren
            }
          </Transition>
        </Popover>
      </div>
    );
  },
);

FixedChatWindow.displayName = 'FixedChatWindow';
