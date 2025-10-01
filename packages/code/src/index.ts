import { Code, CopyButtonAppearance } from './Code';
export { Code, CopyButtonAppearance };
export type { CodeProps } from './Code/Code.types';
export { CopyButton } from './CopyButton';
export { variantColors } from './globalStyles';
export { Panel } from './Panel';
export type { LanguageOption } from './Panel/Panel.types';
export type { SyntaxProps } from './Syntax/Syntax.types';
export type { LineHighlightingDefinition } from './types';
export { Language } from './types';
export { getLgIds, type GetLgIdsReturnType } from './utils';
/**
 * @deprecated Use named export `{ Code }` instead. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.
 */
export default Code;
