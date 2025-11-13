import React, { forwardRef } from 'react';

import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import { IconButton } from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';

import { MessagePromptsProvider } from '../MessagePromptsContext';

import {
  childrenContainerStyles,
  getLabelStyles,
  getOuterWrapperStyles,
  headerStyles,
  innerWrapperStyles,
} from './MessagePrompts.styles';
import { MessagePromptsProps } from './MessagePrompts.types';

export const MessagePrompts = forwardRef<HTMLDivElement, MessagePromptsProps>(
  (
    {
      children,
      darkMode: darkModeProp,
      enableHideOnSelect = true,
      label,
      onClickRefresh,
      ...rest
    },
    ref,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const hasSelectedPrompt: boolean = React.Children.toArray(children).some(
      child => isComponentType(child, 'MessagePrompt') && child.props.selected,
    );

    const shouldHide = enableHideOnSelect && hasSelectedPrompt;
    const showHeader = label || onClickRefresh;

    return (
      <MessagePromptsProvider hasSelectedPrompt={hasSelectedPrompt}>
        <div
          className={getOuterWrapperStyles({
            enableTransition: enableHideOnSelect,
            shouldHide,
          })}
          ref={ref}
          {...rest}
        >
          <div className={innerWrapperStyles}>
            {showHeader && (
              <div className={headerStyles}>
                {label && (
                  <Body className={getLabelStyles(theme)}>{label}</Body>
                )}
                {onClickRefresh && (
                  <IconButton
                    aria-label="Refresh prompts"
                    darkMode={darkMode}
                    disabled={hasSelectedPrompt}
                    onClick={onClickRefresh}
                    title="Refresh prompts"
                  >
                    <RefreshIcon />
                  </IconButton>
                )}
              </div>
            )}
            <div className={childrenContainerStyles}>{children}</div>
          </div>
        </div>
      </MessagePromptsProvider>
    );
  },
);

MessagePrompts.displayName = 'MessagePrompts';
