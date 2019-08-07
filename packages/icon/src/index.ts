/// <reference path="../typings/svgr.d.ts" />

import createIconComponent from './createIconComponent';
import glyphs from './glyphs';

export { glyphs, createIconComponent };
export { Size } from './createIconComponent';
export default createIconComponent(glyphs);
