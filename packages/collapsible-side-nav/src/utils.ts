import { LGGlyph } from '@leafygreen-ui/icon/src/types';

export const transitionDurationMilliseconds = 150;

export type GlyphElement = React.ReactElement<LGGlyph.ComponentProps> & {
  type?: { isGlyph?: boolean };
};

export const GlyphVisibility = {
  Visible: 'visible',
  OnlyCollapsed: 'only-collapsed',
  OnlyExpanded: 'only-expanded',
} as const;

export type GlyphVisibility = typeof GlyphVisibility[keyof typeof GlyphVisibility];
