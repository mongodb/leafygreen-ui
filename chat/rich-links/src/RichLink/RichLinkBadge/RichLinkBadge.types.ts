import { GlyphName } from '@leafygreen-ui/icon/src/glyphs';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export { BaseFontSize };

export const Variant = {
  Gray: 'gray',
  Blue: 'blue',
  Green: 'green',
  Purple: 'purple',
  Red: 'red',
  Yellow: 'yellow',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export interface RichLinkBadgeProps
  extends HTMLElementProps<'span', never>,
    DarkModeProps {
  /**
   * The badge's label text
   */
  label: React.ReactNode;

  /**
   * The name of the glyph to display in the badge
   */
  glyph?: GlyphName;

  /**
   * Determines the base font-size of the component
   *
   * @default 13
   */
  baseFontSize?: BaseFontSize;

  /**
   * The color of the chip
   * @default 'gray'
   */
  variant?: Variant;
}
