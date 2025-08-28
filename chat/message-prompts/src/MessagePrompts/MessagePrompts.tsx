import React, { ForwardedRef, forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';

import { MessagePromptsProvider } from '../MessagePromptsContext';

import {
  childrenContainerStyles,
  containerStyles,
  getLabelStyles,
} from './MessagePrompts.styles';
import { MessagePromptsProps } from '.';

export const MessagePrompts = forwardRef(
  (
    { children, label, darkMode: darkModeProp, ...rest }: MessagePromptsProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const hasSelectedPrompt: boolean = React.Children.toArray(children).some(
      child => isComponentType(child, 'MessagePrompt') && child.props.selected,
    );

    return (
      <MessagePromptsProvider hasSelectedPrompt={hasSelectedPrompt}>
        <div className={containerStyles}>
          {label && <Body className={getLabelStyles(theme)}>{label}</Body>}
          <div className={childrenContainerStyles} ref={ref} {...rest}>
            {children}
          </div>
        </div>
      </MessagePromptsProvider>
    );
  },
);

MessagePrompts.displayName = 'MessagePrompts';
