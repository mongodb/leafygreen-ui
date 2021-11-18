import createIconComponent from './createIconComponent';
import glyphs from './glyphs';

export { default as createIconComponent } from './createIconComponent';
export { default as glyphs } from './glyphs';
export { Size, sizeMap } from './glyphCommon';
export { isComponentGlyph } from './isComponentGlyph';
export default createIconComponent(glyphs);
