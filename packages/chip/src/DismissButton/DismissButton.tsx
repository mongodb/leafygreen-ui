import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  dismissButtonBaseDisabledStyles,
  dismissButtonBaseStyle,
  dismissButtonDisabledStyle,
  dismissButtonThemeStyle,
} from './DismissButton.styles';
import { type DismissButtonProps } from './DismissButton.types';

/**
 * @internal
 */
export function DismissButton({
  label,
  disabled,
  variant,
  onDismiss,
  dismissButtonAriaLabel,
}: DismissButtonProps) {
  const { theme } = useDarkMode();

  const labelText =
    typeof label === 'string' ? `Deselect ${label}` : 'Deselect';
  const ariaLabel = dismissButtonAriaLabel ? dismissButtonAriaLabel : labelText;

  return (
    <button
      data-testid="chip-dismiss-button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      className={cx(
        dismissButtonBaseStyle,
        dismissButtonThemeStyle(variant, theme),
        {
          [cx(
            dismissButtonDisabledStyle[theme],
            dismissButtonBaseDisabledStyles,
          )]: disabled,
        },
      )}
      onClick={onDismiss}
    >
      <Icon glyph="X" aria-hidden />
    </button>
  );
}

DismissButton.displayName = 'DismissButton';
