// Descendants
export {
  createDescendantsContext,
  type Descendant,
  type DescendantsContextProps,
  type DescendantsList,
  DescendantsProvider,
  type DescendantsProviderProps,
  getDescendantById,
  getDescendantByIndex,
  useDescendant,
  useDescendantsContext,
  useInitDescendants,
} from './Descendants';
// Highlight
export {
  createHighlightContext,
  type Direction,
  type HighlightChangeHandler,
  type HighlightContextProps,
  type HighlightHookReturnType,
  HighlightProvider,
  type Index,
  useHighlight,
  useHighlightContext,
} from './Highlight';
