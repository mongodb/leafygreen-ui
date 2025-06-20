import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface SectionNavProps
  extends HTMLElementProps<'nav'>,
    DarkModeProps {
  /**
   * The title
   */
  title?: string;
}
