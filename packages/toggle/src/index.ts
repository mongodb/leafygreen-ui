export {
  /**
   * @deprecated Use named export `{ Toggle }` instead. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.
   */
  default,
  default as Toggle,
} from './Toggle/Toggle';
export type { ToggleProps } from './Toggle/types';
export { Size } from './Toggle/types';
export { DEFAULT_LGID_ROOT, getLgIds } from './utils/getLgIds';
