import React from 'react';

import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import { InferredPolymorphic, PolymorphicAs } from '@leafygreen-ui/polymorphic';

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
        className={className}
        disabled={disabled}
        aria-labelledby={rest['aria-labelledby']}
        aria-label={ariaLabel}
      >
        <InputOptionContent preserveIconSpace={false}>
          {children}
        </InputOptionContent>
      </InputOption>
    );
  },
  'SuggestedPrompt',
);

SuggestedPrompt.displayName = 'SuggestedPrompt';
