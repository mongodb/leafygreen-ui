import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { BaseHeader, TitleVariant } from '../BaseHeader';

import { getDividerStyles } from './Header.styles';
import { HeaderProps } from './Header.types';

export function Header({ title, showDivider, headerContent }: HeaderProps) {
  const { theme } = useDarkMode();
  return (
    <BaseHeader
      className={showDivider ? getDividerStyles(theme) : undefined}
      titleProps={{ value: title, variant: TitleVariant.Secondary }}
      headerContent={headerContent}
    />
  );
}
