import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';

import { DescendantsList } from '../Descendants.types';

import {
  DescendantContextType,
  RegisterDescendantFn,
} from './DescendantsContext';

export interface DescendantProviderProps<T extends HTMLElement> {
  descendants: DescendantsList<T>;
  setDescendants: Dispatch<SetStateAction<DescendantsList<T>>>;
  context: DescendantContextType<T>;
}

export const DescendantProvider = <T extends HTMLElement>({
  context,
  children,
  descendants,
  setDescendants,
}: // getDescendants,
PropsWithChildren<DescendantProviderProps<T>>) => {
  const Provider = context.Provider;

  const registerDescendant: RegisterDescendantFn<T> = useCallback(
    (element?: T | null) => {
      if (!element) return () => {};

      const _name = element.innerHTML;

      // console.log('Registering descendant', _name, descendants);

      setDescendants((items: DescendantsList<T>) => {
        if (items.length === 0) {
          console.log('Inserting', _name, 'at index', 0);
          return [{ element, index: 0 }] as DescendantsList<T>;
        }

        // Get the index of the element within the DOM relative to existing descendants
        const index = findDOMIndex(element, items);
        let newItems: DescendantsList<T>;

        // If we know what index to insert this element, do so
        if (index === -1) {
          console.log('Inserting', _name, 'at end index', items.length);
          // append this element
          newItems = [
            ...items,
            {
              element,
              index: items.length,
            },
          ];
        } else {
          console.log('Inserting', _name, 'at index', index);
          newItems = insertAt(items, { element, index }, index);
        }

        return newItems;

        // If the element exists in the DOM,
        // if (doesDOMElementExist) {
        //   const trackedIndex = items.findIndex(item => item.element === element);
        //   const isElementTracked = trackedIndex >= 0;
        //   const areIndexesEqual = isElementTracked && trackedIndex === DOMIndex;

        //   // If the element already exists in the right place in descendants, skip.
        //   if (areIndexesEqual) {
        //     // console.log(__name, 'already exists at index', trackedIndex);
        //     return trackedIndex;
        //   } else {
        //     let newItems = [...items];

        //     // Remove the element from the descendants list if necessary
        //     if (isElementTracked) {
        //       console.log(
        //         __name,
        //         'exists at index',
        //         trackedIndex,
        //         'but should be at index',
        //         DOMIndex,
        //       );
        //       newItems = removeIndex(newItems, trackedIndex);
        //     }

        //     // Insert the element into the descendants list at the given DOMIndex
        //     // newItems.splice(DOMIndex, 0, { element, index: DOMIndex });
        //     newItems = insertAt(items, { element, index: DOMIndex }, DOMIndex);

        //     // Set the new descendants
        //     console.log('Registering', __name, 'at index', DOMIndex);
        //     setDescendants(newItems);

        //     return DOMIndex;
        //   }
        // }
        //  else {
        //   // 3. If the element does not exist in the DOM
        //   // Unregister the descendant if necessary
        //   const trackedIndex = items.findIndex(item => item.element === element);
        //   const isElementTracked = trackedIndex >= 0;

        //   if (isElementTracked) {
        //     const newItems = removeIndex(items, trackedIndex);
        //     setDescendants(newItems);
        //   }

        //   console.log('DOM element does not exist for', __name);
        //   isElementTracked && console.log('Tracked at index', trackedIndex);

        //   return -1;
        // }
      });

      return () => {
        if (!element) return;
        setDescendants(items => items.filter(item => element !== item.element));
      };
    },
    [],
  );

  const providerValue = useMemo(
    () => ({
      descendants,
      registerDescendant,
    }),
    [descendants, registerDescendant],
  );

  return <Provider value={providerValue}>{children}</Provider>;
};

/**
 * Returns the 1 + the index of the registered descendant immediately preceding the search element.
 *
 * e.g.:
 *
 * ```tsx
 * <div>A</div>
 * <div>B</div>
 * <span />
 * <div>C</div>
 * <div>D</div>

 * descendants = [<A>, <B>, <D>]
 *
 * findDOMIndex(<C>, descendants) // 2 (since <B> is the closest _tracked_ DOM node preceding <C>)
 * ```
 *
 */
function findDOMIndex<T extends HTMLElement>(
  element: T,
  items: DescendantsList<T>,
): number {
  if (!element || !items.length) return -1;

  // Loop through items (backwards for performance),
  // and check whether the element is before or after the current item

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    const currElem = item.element;
    if (!item) continue;

    if (currElem === element) return i;

    const isCurrentElementBeforeSearchElement = isElementPreceding(
      currElem,
      element,
    );

    if (isCurrentElementBeforeSearchElement) {
      return i + 1;
    }
  }

  return -1;
}

/**
 * Returns whether ElementA precedes ElementAB in the DOM
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
 */
function isElementPreceding(elemA: HTMLElement, elemB: HTMLElement) {
  return Boolean(
    elemB.compareDocumentPosition(elemA) & Node.DOCUMENT_POSITION_PRECEDING,
  );
}

/**
 * Copy an array of items with a new item added at a specific index.
 * @param array The source array
 * @param item The item to insert into the array
 * @param index The index to insert the item at
 * @returns A copy of the array with the item inserted at the specified index
 */
function insertAt<T extends any>(
  array: Array<T>,
  item: T,
  index?: number,
): Array<T> {
  if (index == null || !(index in array)) {
    return [...array, item];
  }

  const arrStart = array.slice(0, index);
  const arrEnd = array.slice(index);

  return [...arrStart, item, ...arrEnd];
}

// function removeIndex<T extends any>(array: Array<T>, index: number): Array<T> {
//   if (index == null || !(index in array)) {
//     return [...array];
//   }

//   const arrStart = array.slice(0, index);
//   const arrEnd = array.slice(index + 1);

//   return [...arrStart, ...arrEnd];
// }
