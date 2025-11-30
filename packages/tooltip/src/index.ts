import Tooltip from './Tooltip';

export {
  Align,
  DismissMode,
  hoverDelay,
  Justify,
  RenderMode,
  type TooltipProps,
  TooltipVariant,
  TriggerEvent,
} from './Tooltip';
export { useTooltipTriggerEventHandlers } from './Tooltip/utils/useTooltipTriggerEventHandlers';

export { Tooltip }; // named
/**
 * @deprecated Use named export `{ Tooltip }` instead. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.
 */
export default Tooltip; // default
