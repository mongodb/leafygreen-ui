import { useState, useCallback } from 'react';

/**
 * Hook to subscribe to changes in a ref element.
*/
export default function useElementNode<ElementType = HTMLElement>() {
  const [element, setElement] = useState<ElementType | null>(null);

  const elementRefCallback = useCallback((node: ElementType | null) => {
    if (node) {
      setElement(node);
    }
  }, []);

  return [element, elementRefCallback] as const;
}
