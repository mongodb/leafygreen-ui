export { createGlyphComponent } from './createGlyphComponent';
export type { IconProps } from './createIconComponent';
export { createIconComponent } from './createIconComponent';
export { Size, sizeMap } from './glyphCommon';
export { type GlyphName, glyphs } from './glyphs';
export {
  /**
   * @deprecated Use named export `{ Icon }` instead. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.
   */
  Icon as default,
  Icon,
} from './Icon';
export { isComponentGlyph } from './isComponentGlyph';
export { LGGlyph } from './types';
