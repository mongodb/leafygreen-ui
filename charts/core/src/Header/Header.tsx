import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { BaseHeader, LabelVariants } from '../BaseHeader';

import { getHeaderStyles } from './Header.styles';
import { HeaderProps } from './Header.types';

export function Header({
  label,
  closeButtonProps,
  fullScreenButtonProps,
  resetButtonProps,
}: HeaderProps) {
  const { theme } = useDarkMode();
  return (
    <BaseHeader
      className={getHeaderStyles(theme)}
      labelProps={{ value: label, variant: LabelVariants.Secondary }}
      closeButtonProps={closeButtonProps}
      fullScreenButtonProps={fullScreenButtonProps}
      resetButtonProps={resetButtonProps}
    />
  );
}
