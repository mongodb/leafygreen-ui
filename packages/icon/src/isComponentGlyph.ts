import { ComponentType, isValidElement, ReactNode } from 'react';

import { LGGlyph } from './types';

type Unknown = {} | null | undefined;

type ExtendedComponentType =
  | ComponentType<any> & {
      [key: string]: any;
    };
/**
 * Helper type to check if element is a LeafyGreen UI Glyph
 * @internal
 */
function isComponentGlyph(node: ReactNode): node is LGGlyph.Element;
function isComponentGlyph(
  component: ExtendedComponentType,
): component is LGGlyph.Component;
function isComponentGlyph(
  child: ReactNode | ExtendedComponentType | Unknown,
): child is LGGlyph.Element | LGGlyph.Component {
  // If we're received a rendered component (i.e. ReactNode)
  if (isValidElement(child)) {
    return (
      child != null &&
      typeof child === 'object' &&
      'type' in child &&
      (child.type as any).isGlyph === true
    );
  }

  // If we've received a component function
  return (
    child != null &&
    typeof child === 'function' &&
    'isGlyph' in child &&
    child.isGlyph === true
  );
}

export { isComponentGlyph };
