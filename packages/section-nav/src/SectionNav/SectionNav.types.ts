import { ComponentPropsWithRef } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

export interface SectionNavProps
  extends ComponentPropsWithRef<'nav'>,
    DarkModeProps,
    LgIdProps {
  /**
   * The title
   */
  title?: string;

  /**
   * The content of the section nav
   */
  children: React.ReactNode;
}
