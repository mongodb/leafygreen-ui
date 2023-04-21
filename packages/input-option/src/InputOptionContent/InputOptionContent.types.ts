export interface InputOptionContentProps {
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
}
