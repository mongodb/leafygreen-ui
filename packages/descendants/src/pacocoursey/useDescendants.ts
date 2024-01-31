import { createContext, useContext, useEffect, useRef, useState } from 'react';

import {
  useForceRerender,
  useIsomorphicLayoutEffect,
} from '@leafygreen-ui/hooks';

export type Id = string;

export type SharedProperties = {} & { _internalId: Id };

export type ListElement = SharedProperties & {
  element: HTMLElement;
};

export type List = Array<ListElement>;

export type Map = Record<Id, SharedProperties>;

export interface UseDescendantsContext {
  ref: React.RefObject<HTMLElement>;
  list: React.RefObject<List>;
  map: React.RefObject<Map>;
  force: () => void;
}

export const useDescendants = (): UseDescendantsContext => {
  const list = useRef<List>([]);
  const map = useRef<Map>({});
  // const [, force] = useState<{}>();
  const force = useForceRerender();
  const ref = useRef<HTMLElement>(null);

  // On every render
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    // Read the current DOM nodes registered as descendants
    const descendantDOMElements = Array.from(
      ref.current.querySelectorAll('[data-descendant]'),
    );

    // If the DOM elements changed (element arrays are different)
    const domListChanged =
      descendantDOMElements.length !== list.current.length ||
      !descendantDOMElements.every((e, i) => {
        return list.current[i].element === e;
      });

    // If there is a diff between the current list & registered dom elements
    if (domListChanged) {
      // add stored props for the descendant id to the new element
      const newList = descendantDOMElements.map(element => {
        const descendantId = element.getAttribute('data-descendant') as string;
        const props = map.current[descendantId];

        return {
          element,
          ...props,
        };
      });

      // Update the stored list
      // @ts-expect-error
      list.current = newList;

      force();
    }
  });

  return {
    ref,
    list,
    map,
    force,
  };
};

// No idea what the chance of collision is here, probably fine?
const genId = () => `_${Math.random().toString(36).substr(2, 9)}`;

export const useDescendant = (
  ctx: React.Context<Partial<UseDescendantsContext>>,
  props: any,
) => {
  const index = useRef<number | undefined>(-1);
  const ref = useRef<HTMLElement | null>(null);
  const { list, map, force } = useContext<Partial<UseDescendantsContext>>(ctx);
  const id = useRef<string | undefined>();

  // On initial render
  useIsomorphicLayoutEffect(() => {
    // Initialize id
    if (!id.current) {
      id.current = genId();
    }

    // Do this once, on mount, so that parent map is populated ASAP
    if (map?.current) {
      // Add the current element to the stored map
      map.current[id.current] = { ...props, _internalId: id.current };
      // Force a rerender
      force?.();

      // When the element is unmounted
      return () => {
        // Remove from parent "state" on unmount
        delete map!.current?.[id.current!];
        // @ts-expect-error
        list.current = list?.current.filter(a => a._internalId !== id.current);

        // Clean up local "state"
        index.current = -1;
        id.current = undefined;

        force?.();
      };
    }
  }, []);

  // On every render
  useIsomorphicLayoutEffect(() => {
    // The item could unmount or un-render with `return null`
    if (ref.current && id.current) {
      // Add the 'data-descendant' attr to the current element
      ref.current.setAttribute('data-descendant', id.current);
    }

    // Keep props up to date on every render
    if (id.current && map?.current?.[id.current]) {
      map.current[id.current] = { ...props, _internalId: id.current };
    }

    index.current = list?.current?.findIndex(
      item => item._internalId === id.current,
    );
  });

  const rerender = useForceRerender();

  // Force a re-render if the current index is invalid
  useEffect(() => {
    if (index.current === -1) {
      rerender();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index.current, rerender]);

  return { index: index.current, ref, id: id.current, force };
};

export const createDescendants = () =>
  createContext<Partial<UseDescendantsContext>>({});
export const DescendantContext = createDescendants();
