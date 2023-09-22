import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  groupStyle,
  labelStyle,
  labelThemeStyle,
} from './DropdownLabel.styles';
import { DropdownLabelProps } from './DropdownLabel.types';

export function DropdownLabel({
  className,
  label,
  children,
  ...rest
}: DropdownLabelProps) {
  const { theme } = useDarkMode();
  const groupId = useIdAllocator({ prefix: 'select-option-group' });

  return (
    <div className={cx(groupStyle, className)} {...rest}>
      <div id={groupId} className={cx(labelStyle, labelThemeStyle[theme])}>
        {label}
      </div>
      <div role="group" aria-labelledby={groupId}>
        {children}
      </div>
    </div>
  );
}

DropdownLabel.displayName = 'DropdownLabel';
