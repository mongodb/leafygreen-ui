import React from 'react';

import { Size as ImportedSize } from '@leafygreen-ui/tokens';

export const Variant = {
  Compact: 'compact',
  Default: 'default',
  Collapsible: 'collapsible',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export const Size = {
  Default: ImportedSize.Default,
  Small: ImportedSize.Small,
} as const;
export type Size = (typeof Size)[keyof typeof Size];

export interface CollectionToolbarProps {
  size?: typeof ImportedSize.Default | typeof ImportedSize.Small;
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}
