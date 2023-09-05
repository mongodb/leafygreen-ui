import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  chipButtonBaseDisabledStyles,
  chipButtonDisabledStyle,
  chipButtonStyle,
  chipButtonThemeStyle,
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
}: DismissButtonProps) {
  const { theme } = useDarkMode();

  // if aria prop then use that, else check if label is a string and use that else use generic label
  // const labelText = typeof label === 'string' ? `Deselect ${label}` : '';

  return (
    <button
      aria-label={`Deselect ${label}`} //TODO: make a prop
      aria-disabled={disabled}
      disabled={disabled}
      className={cx(chipButtonStyle, chipButtonThemeStyle(variant, theme), {
        [cx(chipButtonDisabledStyle[theme], chipButtonBaseDisabledStyles)]:
          disabled,
      })}
      onClick={onDismiss}
    >
      <Icon glyph="X" />
    </button>
  );
}

DismissButton.displayName = 'DismissButton';
