import React, { ReactNode } from 'react';

export interface SuggestedPromptsProps extends React.ComponentProps<'div'> {
  /**
   * Title for the group of options
   */
  label: string;

  /**
   * Must be <SuggestedPrompt /> or <SuggestedPrompts />
   */
  children: ReactNode;
}
