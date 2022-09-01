import createIconComponent from './createIconComponent';
import glyphs from './glyphs';

// TODO: TSDoc
export { LGGlyph } from './types';
export { Size } from './glyphCommon';
export { default as createIconComponent } from './createIconComponent';
export { default as createGlyphComponent } from './createGlyphComponent';
export { default as glyphs } from './glyphs';
export { isComponentGlyph } from './isComponentGlyph';
export default createIconComponent(glyphs);
