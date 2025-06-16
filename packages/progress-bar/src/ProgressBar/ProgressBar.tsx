import React from 'react';

import { Size, Variant } from '@leafygreen-ui/tokens';

import { ProgressBarProps } from './ProgressBar.types';

export function ProgressBar({
  type,
  value,
  variant = Variant.Info,
  label,
  valueType = 'fraction',
  maxValue = 100,
  valueUnits,
  showIcon = false,
  size = Size.Default,
  description,
  darkMode = false,
  disabled = false,
  ...rest
}: ProgressBarProps) {
  return <div>your content here</div>;
}

ProgressBar.displayName = 'ProgressBar';
