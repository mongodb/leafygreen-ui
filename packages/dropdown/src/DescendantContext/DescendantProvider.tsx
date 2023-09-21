import { createContext, useContext, useRef, useState } from 'react';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';

import { ItemProps } from '../types';

import { List, Map, UseDescendantsContext } from './DescendantProvider.types';

export const useDescendants = (): UseDescendantsContext => {
  const list = useRef<List>([]);
  const map = useRef<Map>({});
  const [, force] = useState<{}>();
  const ref = useRef<HTMLElement | undefined>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const newList = Array.from(
      ref.current.querySelectorAll('[data-descendant]'),
    );

    // If the DOM elements changed (element arrays are different)
    const domListChanged =
      newList.length !== list.current.length ||
      !newList.every((e, i) => {
        return list.current[i].element === e;
      });

    if (domListChanged) {
      // @ts-expect-error
      list.current = newList.map(element => {
        const props =
          map.current[element.getAttribute('data-descendant') as string];

        return {
          element,
          ...props,
        };
      });
      force({});
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
  props: ItemProps,
) => {
  const index = useRef<number | undefined>(-1);
  const ref = useRef<HTMLElement | null>(null);
  const { list, map, force } = useContext<Partial<UseDescendantsContext>>(ctx);
  const id = useRef<string | undefined>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    // Initialize id
    if (!id.current) {
      id.current = genId();
    }

    // Do this once, on mount, so that parent map is populated ASAP
    if (map?.current) {
      map.current[id.current] = { ...props, _internalId: id.current };
      force?.({});

      return () => {
        // Remove from parent "state" on unmount
        delete map!.current?.[id.current!];
        // @ts-expect-error
        list.current = list?.current.filter(a => a._internalId !== id.current);

        // Clean up local "state"
        index.current = -1;
        id.current = undefined;

        force?.({});
      };
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    // The item could unmount or un-render with `return null`
    if (ref.current && id.current) {
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

  return { index: index.current, ref, id: id.current, force };
};

export const createDescendants = () =>
  createContext<Partial<UseDescendantsContext>>({});
export const DescendantContext = createDescendants();
