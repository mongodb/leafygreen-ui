import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';

export interface SectionNavProps
  extends HTMLElementProps<'nav'>,
    DarkModeProps,
    LgIdProps {
  /**
   * The title
   */
  title?: string;
}
