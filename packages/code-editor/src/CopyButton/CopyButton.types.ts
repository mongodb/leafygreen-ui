import { ComponentPropsWithoutRef } from 'react';

export interface CopyProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onCopy'> {
  onCopy?: Function;
  // contents: string;
  getContents: () => string;
  withLanguageSwitcher?: boolean;
  isPanelVariant?: boolean;
}
