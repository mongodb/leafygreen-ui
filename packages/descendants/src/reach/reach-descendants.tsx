import * as React from 'react';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';

const useForceUpdate = () => {
  const [_, force] = React.useState<any>();
  return () => force({});
};

function createDescendantContext<DescendantType extends Descendant>(
  name: string,
  initialValue = {},
) {
  type T = DescendantContextValue<DescendantType>;
  const descendants: Array<DescendantType> = [];
  const ctx = React.createContext<T>({
    descendants,
    registerDescendant: () => () => {},
    ...initialValue,
  });
  ctx.displayName = name;
  return ctx;
}

/**
 * This hook registers our descendant by passing it into an array. We can then
 * search that array by to find its index when registering it in the component.
 * We use this for focus management, keyboard navigation, and typeahead
 * functionality for some components.
 *
 * The hook accepts the element node and (optionally) a key. The key is useful
 * if multiple descendants have identical text values and we need to
 * differentiate siblings for some reason.
 *
 * Our main goals with this are:
 *   1) maximum composability,
 *   2) minimal API friction
 *   3) SSR compatibility*
 *   4) concurrent safe
 *   5) index always up-to-date with the tree despite changes
 *   6) works with memoization of any component in the tree (hopefully)
 *
 * As for SSR, the good news is that we don't actually need the index on the
 * server for most use-cases, as we are only using it to determine the order of
 * composed descendants for keyboard navigation. However, in the few cases where
 * this is not the case, we can require an explicit index from the app.
 */
function useDescendant<DescendantType extends Descendant>(
  descendant: Omit<DescendantType, 'index'>,
  context: React.Context<DescendantContextValue<DescendantType>>,
) {
  const forceUpdate = useForceUpdate();
  const { registerDescendant, descendants } = React.useContext(context);

  // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render and we will re-register descendants so that
  // everything is up-to-date before the user interacts with a collection.
  const index = descendants.findIndex(
    item => item.element === descendant.element,
  );

  // Prevent any flashing
  useIsomorphicLayoutEffect(() => {
    if (!descendant.element) forceUpdate();
    return registerDescendant({ ...descendant, index } as DescendantType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descendant, index, registerDescendant]);

  return index;
}

function useDescendantsInit<DescendantType extends Descendant>() {
  return React.useState<Array<DescendantType>>([]);
}

function useDescendants<DescendantType extends Descendant>(
  ctx: React.Context<DescendantContextValue<DescendantType>>,
) {
  return React.useContext(ctx).descendants;
}

function DescendantProvider<DescendantType extends Descendant>({
  context: Ctx,
  children,
  items,
  set,
}: {
  context: React.Context<DescendantContextValue<DescendantType>>;
  children: React.ReactNode;
  items: Array<DescendantType>;
  set: React.Dispatch<React.SetStateAction<Array<DescendantType>>>;
}) {
  const registerDescendant = React.useCallback(
    ({
      element,
      index: explicitIndex,
      ...rest
    }: Omit<DescendantType, 'index'> & { index?: number | undefined }) => {
      if (!element) return () => {};

      set(items => {
        // performance.mark('set-start')
        if (explicitIndex != null && explicitIndex !== -1) {
          return insertAt(
            items,
            { element, index: explicitIndex, ...rest } as DescendantType,
            explicitIndex,
          );
        }

        if (items.length === 0) {
          // If there are no items, register at index 0 and bail.
          return [{ ...rest, element, index: 0 } as DescendantType];
        }

        const index = findDOMIndex(items, element);
        let newItems: Array<DescendantType>;

        if (index === -1) {
          newItems = [
            ...items,
            { ...rest, element, index: items.length } as DescendantType,
          ];
        } else {
          newItems = insertAt(
            items,
            { ...rest, element, index } as DescendantType,
            index,
          );
        }

        return newItems;
      });

      return () => {
        if (!element) return;
        set(items => items.filter(item => element !== item.element));
      };
    },
    // set is a state setter initialized by the useDescendantsInit hook.
    // We can safely ignore the lint warning here because it will not change
    // between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Ctx.Provider
      value={React.useMemo(() => {
        return {
          descendants: items,
          registerDescendant,
        };
      }, [items, registerDescendant])}
    >
      {children}
    </Ctx.Provider>
  );
}

function isElementPreceding(a: Element, b: Element) {
  return Boolean(
    b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING,
  );
}

function findDOMIndex<DescendantType extends Descendant>(
  items: Array<DescendantType>,
  element: Element,
) {
  if (!element) return -1;
  if (!items.length) return -1;

  let length = items.length;

  // Most of the times, the new item will be added at the end of the list, so we
  // do a findeIndex in reverse order, instead of wasting time searching the
  // index from the beginning.
  while (length--) {
    const currentElement = items[length].element;
    if (!currentElement) continue;

    if (isElementPreceding(currentElement, element)) {
      return length + 1;
    }
  }

  return -1;
}

/**
 * Copy an array of items with a new item added at a specific index.
 * @param array The source array
 * @param item The item to insert into the array
 * @param index The index to insert the item at
 * @returns A copy of the array with the item inserted at the specified index
 */
function insertAt<T extends Array<any>>(
  array: T,
  item: T[number],
  index?: number,
): T {
  if (index == null || !(index in array)) {
    return [...array, item] as T;
  }

  return [...array.slice(0, index), item, ...array.slice(index)] as T;
}

////////////////////////////////////////////////////////////////////////////////
// Types

type SomeElement<T> = T extends Element ? T : HTMLElement;

interface Descendant<ElementType = HTMLElement> {
  element: SomeElement<ElementType> | null;
  index: number;
}

interface DescendantContextValue<DescendantType extends Descendant> {
  descendants: Array<DescendantType>;
  registerDescendant(descendant: DescendantType): () => void;
}

////////////////////////////////////////////////////////////////////////////////
// Exports

export type { Descendant, DescendantContextValue };
export {
  createDescendantContext,
  DescendantProvider,
  useDescendant,
  useDescendants,
  useDescendantsInit,
};
