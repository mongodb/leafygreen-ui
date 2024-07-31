import { ComponentProps } from 'react';

export interface InputOptionContentProps extends ComponentProps<'div'> {
  /**
   * Content to appear inside of option
   */
  children: React.ReactNode;

  /**
   * Optional description text
   */
  description?: React.ReactNode;

  /**
   * Glyph to be displayed to the left of content
   */
  leftGlyph?: React.ReactNode;

  /**
   * Glyph to be displayed to the right of content
   */
  rightGlyph?: React.ReactNode;

  /**
   *
   * Preserves space before the text content for a left glyph.
   *
   * Use in menus where some items may or may not have icons/glyphs,
   * in order to keep text across menu items aligned
   *
   * @default {true}
   */
  preserveIconSpace?: boolean;
}
