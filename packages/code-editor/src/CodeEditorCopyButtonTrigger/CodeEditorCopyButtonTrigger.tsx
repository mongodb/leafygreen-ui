import React from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { Button } from '@leafygreen-ui/button';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import { IconButton } from '@leafygreen-ui/icon-button';

import { CopyButtonVariant } from '../CodeEditorCopyButton/CodeEditorCopyButton.types';
import { COPIED_TEXT } from '../CodeEditorCopyButton/constants';

export interface CopyButtonTriggerProps {
  variant: CopyButtonVariant;
  copied: boolean;
  iconFill?: string;
  // All the props that will be cloned by Tooltip
  children?: React.ReactNode;
  className?: string;
  [key: string]: any; // For event handlers and other props spread by Tooltip
}

/**
 * A trigger component that properly handles React.cloneElement from Tooltip
 */
export const CopyButtonTrigger = React.forwardRef<
  HTMLButtonElement,
  CopyButtonTriggerProps
>(function CopyButtonTrigger(
  { variant, copied, iconFill, children, ...props },
  ref,
) {
  const icon = copied ? (
    <CheckmarkIcon fill={iconFill} />
  ) : (
    <CopyIcon fill={iconFill} />
  );
  const copiedAlert = copied && (
    <VisuallyHidden role="alert">{COPIED_TEXT}</VisuallyHidden>
  );

  if (variant === CopyButtonVariant.IconButton) {
    return (
      <IconButton {...props} ref={ref}>
        {icon}
        {copiedAlert}
        {children} {/* This is where Tooltip injects the tooltip content */}
      </IconButton>
    );
  }

  return (
    <Button leftGlyph={icon} size="xsmall" {...props} ref={ref}>
      {copiedAlert}
      {children} {/* This is where Tooltip injects the tooltip content */}
    </Button>
  );
});
