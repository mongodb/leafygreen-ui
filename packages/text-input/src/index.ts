export {
  /**
   * @deprecated Use named export `{ TextInput }` instead. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.
   */
  default,
  default as TextInput,
} from './TextInput';
// Export types
export type { TextInputProps } from './TextInput';
// Export constants
export {
  SizeVariant,
  State,
  TextInputFontSize,
  TextInputType,
} from './TextInput';
export { DEFAULT_LGID_ROOT, getLgIds } from './utils/getLgIds';
