import { createContext, useContext, useRef, useState } from 'react';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';

import { MenuItemProps } from '../MenuItem';
import { SubMenuProps } from '../SubMenu';

type Props = MenuItemProps & SubMenuProps;

type DescendantId = string;

interface DescendantElAndProps extends Props {
  element?: HTMLElement;
  _internalId?: DescendantId;
}

type DescendantMap = Map<DescendantId, DescendantElAndProps>;

interface UseDescendantsContext {
  map: React.MutableRefObject<DescendantMap>;
  force: Function;
  ref: React.MutableRefObject<HTMLUListElement>;
}

export const createDescendants = () =>
  createContext<Partial<UseDescendantsContext>>({});
export const DescendantContext = createDescendants();

export const useDescendants = () => {
  const map = useRef(new Map<DescendantId, DescendantElAndProps>());
  const [, force] = useState();
  const ref = useRef<HTMLUListElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const newList: Array<HTMLElement> = Array.from(
      ref.current.querySelectorAll('[data-descendant]'),
    );

    const domListChanged =
      newList.length !== map.current.size ||
      !newList.every(element => {
        const internalId = element.getAttribute('data-descendant');

        if (internalId !== null) {
          return map.current?.get(internalId)?.element === element;
        }
      });

    if (domListChanged) {
      const tempMap: DescendantMap = new Map();
      newList.forEach((element: HTMLElement) => {
        const id = element.getAttribute('data-descendant');

        if (id) {
          const props = map.current.get(id);
          tempMap.set(id, { element, ...props });
        }
      });

      map.current = new Map(tempMap);
    }
  });

  return {
    ref,
    map,
    force,
  };
};

const genId: () => DescendantId = () =>
  `_${Math.random().toString(36).substr(2, 9)}`;

export const useDescendant = (props: Record<string, any>) => {
  const ref = useRef<HTMLElement | null>(null);
  const { map, force } = useContext(DescendantContext);
  const id = useRef<string | undefined>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsomorphicLayoutEffect(() => {
    if (!id.current) {
      id.current = genId();
    }

    // Do this once, on mount, so that parent map is populated
    map?.current.set(id.current, {
      ...props,
      _internalId: id.current,
    });
    force?.({});

    return () => {
      // Remove from parent "state" on unmount
      map?.current.delete(id!.current!);

      // Clean up local "state"
      id.current = undefined;

      force?.({});
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!map) {
      return;
    }

    // The item could unmount or un-render with `return null`
    if (id.current && ref.current) {
      ref.current.setAttribute('data-descendant', id.current);
    }

    // Keep props up to date on every render
    if (id.current && map.current.has(id.current)) {
      map.current.set(id.current, {
        ...map.current.get(id.current),
        ...props,
        _internalId: id.current,
      });
    }
  });

  return { ref, id: id.current };
};
