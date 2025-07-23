import { GlyphName } from '@leafygreen-ui/icon';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export { BaseFontSize };

export const RichLinkBadgeColors = {
  Gray: 'gray',
  Blue: 'blue',
  Green: 'green',
  Purple: 'purple',
  Red: 'red',
  Yellow: 'yellow',
} as const;
export type RichLinkBadgeColor =
  (typeof RichLinkBadgeColors)[keyof typeof RichLinkBadgeColors];

export interface RichLinkBadgeProps extends DarkModeProps {
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
   * The background color of the badge
   * @default 'gray'
   */
  color?: RichLinkBadgeColor;
}
