import { keyMap as _keyMap } from '@leafygreen-ui/lib';
export { wrapJSX } from './wrapJSX';
export { getNameAndValue } from './getNameAndValue';
export { getDisplayNameForValue } from './getDisplayNameForValue';
export { flattenChildren } from './flattenChildren';

// TODO - remove this when lib/keyMap supports Backspace & Delete
export const keyMap = {
  ..._keyMap,
  Backspace: 8,
  Delete: 46,
} as const;
