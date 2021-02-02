import { LGGlyph } from './types';

/** Helper type to check if element is a LeafyGreen UI Glyph  */
export function isComponentGlyph(
  child: React.ReactNode,
): child is React.ReactElement<LGGlyph.ComponentProps> {
  return (
    child != null &&
    typeof child === 'object' &&
    'type' in child &&
    (child.type as any).isGlyph === true
  );
}
