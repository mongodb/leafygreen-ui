import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { BaseHeader, LabelVariants } from '../BaseHeader';

import { getDividerStyles } from './Header.styles';
import { HeaderProps } from './Header.types';

export function Header({ label, showDivider, headerContent }: HeaderProps) {
  const { theme } = useDarkMode();
  return (
    <BaseHeader
      className={showDivider ? getDividerStyles(theme) : undefined}
      labelProps={{ value: label, variant: LabelVariants.Secondary }}
      headerContent={headerContent}
    />
  );
}
