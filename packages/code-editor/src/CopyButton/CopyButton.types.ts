import { ComponentPropsWithoutRef } from 'react';

export interface CopyProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onCopy'> {
  onCopy?: () => void;
  getContents: () => string;
  isPanelVariant?: boolean;
}
