import React, { ForwardedRef, forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import Popover from '@leafygreen-ui/popover';
import { spacing } from '@leafygreen-ui/tokens';

import { InlineMessageFeedback } from '../InlineMessageFeedback';

import {
  baseStyles,
  contentContainerStyles,
  themeStyles,
} from './PopoverMessageFeedback.styles';
import { PopoverMessageFeedbackProps } from '.';

export const PopoverMessageFeedback = forwardRef(
  (
    {
      darkMode: darkModeProp,
      cancelButtonText,
      onCancel,
      cancelButtonProps,
      submitButtonText,
      submitButtonProps,
      onSubmit,
      textareaProps,
      onClose,
      label,
      ...rest
    }: PopoverMessageFeedbackProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={true}>
        {/* @ts-ignore usePortal should not be an issue since popoverProps are being passed directly */}
        <Popover
          ref={forwardedRef}
          spacing={spacing[3]}
          {...rest}
          className={cx(baseStyles, themeStyles[theme])}
        >
          <div className={contentContainerStyles}>
            <InlineMessageFeedback
              cancelButtonText={cancelButtonText}
              onCancel={onCancel}
              cancelButtonProps={cancelButtonProps}
              submitButtonText={submitButtonText}
              submitButtonProps={submitButtonProps}
              onSubmit={onSubmit}
              textareaProps={textareaProps}
              onClose={onClose}
              label={label}
            />
          </div>
        </Popover>
      </LeafyGreenProvider>
    );
  },
);

PopoverMessageFeedback.displayName = 'PopoverMessageFeedback';
