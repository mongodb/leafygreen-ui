import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface SectionProps
  extends HTMLElementProps<'section'>,
    DarkModeProps {
  /**
   * Optional boolean to render section in a Card UI
   */
  renderInCard?: boolean;

  /**
   * Required title text
   */
  title: string;
}
