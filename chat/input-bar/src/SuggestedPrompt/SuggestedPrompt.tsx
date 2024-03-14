import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { InputOption } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { InferredPolymorphic, PolymorphicAs } from '@leafygreen-ui/polymorphic';

import {
  contentClassName,
  suggestedPromptDisabledStyle,
  suggestedPromptStyles,
  suggestedPromptThemeStyles,
} from './SuggestedPrompt.styles';
import { SuggestedPromptProps } from './SuggestedPrompt.types';

export const SuggestedPrompt = InferredPolymorphic<SuggestedPromptProps, 'li'>(
  (
    {
      as = 'li' as PolymorphicAs,
      children,
      disabled,
      className,
      darkMode,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useDarkMode(darkMode);
    const textContent = getNodeTextContent(children);
    /**
     * If `rest[aria-label]` exists, use that;
     * if `rest['aria-labelledby']` exists, then we have no label;
     * if neither exist we set the label to `textContent`
     */
    const ariaLabel =
      rest['aria-label'] ?? (rest['aria-labelledby'] ? '' : textContent);

    return (
      <InputOption
        {...rest}
        as={as}
        ref={ref}
        className={cx(
          suggestedPromptStyles,
          suggestedPromptThemeStyles[theme],
          {
            [suggestedPromptDisabledStyle[theme]]: disabled,
          },
          className,
        )}
        disabled={disabled}
        aria-labelledby={rest['aria-labelledby']}
        aria-label={ariaLabel}
      >
        <div className={contentClassName}>{children}</div>
      </InputOption>
    );
  },
  'SuggestedPrompt',
);

SuggestedPrompt.displayName = 'SuggestedPrompt';
