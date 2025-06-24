import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

/**
 * The CM Editor by default grows as lines are added. There are ways using
 * specific classes to set things like heights on the editor, but this is
 * inconvenient for consumers because they couldn't just use emotion's css prop
 * or className prop to set a height. By wrapping the editor in 2 divs, the
 * inner set to 100% height of the outer with the appropriate overflow, consumers
 * can set the height of the outer wrapper and have the editor behave as expected.
 */
export const editorInnerWrapperStyles = css`
  height: 100%;
  overflow-y: auto;
`;

export const getEditorOuterWrapperBaseStyles = (theme: Theme) => css`
  overflow: hidden;
  border-radius: ${borderRadius[300]}px;
  border: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
`;
