import React, { forwardRef } from 'react';

import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import { IconButton } from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { spacing as spacingToken } from '@leafygreen-ui/tokens';
import {
  Align,
  Justify,
  Tooltip,
  TooltipVariant,
} from '@leafygreen-ui/tooltip';
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
                  <Tooltip
                    align={Align.Right}
                    justify={Justify.Middle}
                    spacing={spacingToken[100]}
                    trigger={
                      <IconButton
                        aria-label="Refresh prompts"
                        darkMode={darkMode}
                        disabled={hasSelectedPrompt}
                        onClick={onClickRefresh}
                      >
                        <RefreshIcon />
                      </IconButton>
                    }
                    variant={TooltipVariant.Compact}
                  >
                    Refresh prompts
                  </Tooltip>
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
