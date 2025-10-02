import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';

import { MessagePromptsProvider } from '../MessagePromptsContext';

import {
  childrenContainerStyles,
  getContainerStyles,
  getLabelStyles,
} from './MessagePrompts.styles';
import { MessagePromptsProps } from './MessagePrompts.types';

export const MessagePrompts = forwardRef<HTMLDivElement, MessagePromptsProps>(
  (
    {
      children,
      darkMode: darkModeProp,
      enableHideOnSelect = false,
      label,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const hasSelectedPrompt: boolean = React.Children.toArray(children).some(
      child => isComponentType(child, 'MessagePrompt') && child.props.selected,
    );

    const shouldHide = enableHideOnSelect && hasSelectedPrompt;

    return (
      <MessagePromptsProvider hasSelectedPrompt={hasSelectedPrompt}>
        <div
          className={getContainerStyles({
            enableTransition: enableHideOnSelect,
            shouldHide,
          })}
          ref={ref}
          {...rest}
        >
          {label && <Body className={getLabelStyles(theme)}>{label}</Body>}
          <div className={childrenContainerStyles}>{children}</div>
        </div>
      </MessagePromptsProvider>
    );
  },
);

MessagePrompts.displayName = 'MessagePrompts';
