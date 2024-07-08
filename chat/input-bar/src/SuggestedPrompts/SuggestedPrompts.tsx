import React from 'react';

import { InputOption } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { validateChildren } from '@leafygreen-ui/lib';
import { Overline } from '@leafygreen-ui/typography';

import {
  suggestedPromptsLabelStyle,
  suggestedPromptsLabelWrapperStyle,
  themeStyles,
} from './SuggestedPrompts.styles';
import { SuggestedPromptsProps } from './SuggestedPrompts.types';

export const SuggestedPrompts = ({
  children,
  label,
  ...rest
}: SuggestedPromptsProps) => {
  const validatedChildren = validateChildren(children, [
    'SuggestedPrompt',
    'SuggestedPrompts',
  ]);

  const { theme } = useDarkMode();

  return (
    <div className={themeStyles[theme]}>
      <InputOption
        aria-label={label}
        isInteractive={false}
        className={suggestedPromptsLabelWrapperStyle}
        {...rest}
      >
        <Overline className={suggestedPromptsLabelStyle[theme]}>
          {label}
        </Overline>
      </InputOption>
      {validatedChildren}
    </div>
  );
};

SuggestedPrompts.displayName = 'SuggestedPrompts';
