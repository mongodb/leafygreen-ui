import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';

import { groupStyle, labelStyle } from './DropdownLabel.styles';
import { DropdownLabelProps } from './DropdownLabel.types';

export type ReactEmpty = null | undefined | false | '';

export function DropdownLabel({
  className,
  label,
  children,
  ...rest
}: DropdownLabelProps) {
  const groupId = useIdAllocator({ prefix: 'select-option-group' });

  return (
    <div className={cx(groupStyle, className)} {...rest}>
      <div id={groupId} className={labelStyle}>
        {label}
      </div>
      <div role="group" aria-labelledby={groupId}>
        {children}
      </div>
    </div>
  );
}

DropdownLabel.displayName = 'OptionGroup';
