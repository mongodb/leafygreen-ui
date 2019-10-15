import { useState, useCallback } from 'react';

/**
 * Hook to subscribe to changes in a ref element.
 * Example:
 ```
 const Example = () => {
   [ refNode, setRefNode ] = useElementNode()
   return (
     <div ref={setRefNode}>I am a ref</div>
   )
  }
```
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
