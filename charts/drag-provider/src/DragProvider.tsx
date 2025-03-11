import React, {
  cloneElement,
  type MouseEvent,
  ReactElement,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DropAnimation,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { DragProviderProps } from './DragProvider.types';

/**
 * ChartCards in particular have open and closed states. Since these states
 * are stored internal to those components, we need some way to determine
 * if a particular card is open or closed when it is being dragged and we need
 * to render it's overlay.
 *
 * This function finds the open state of a drag element based on data attributes
 * added to the element.
 */
function findDragElementOpenState(
  elem: HTMLElement,
  dragId: string,
): boolean | null {
  const dragElement = elem.querySelector(`[data-drag-id="${dragId}"]`);
  const isOpen = dragElement?.getAttribute('data-is-open');
  return typeof isOpen === 'string' ? isOpen === 'true' : null;
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.3', // Keeps placeholder component opaque while overlay drops into it
      },
    },
  }),
};

/**
 * By design our drag handle is the entire header. Since the header has interactive
 * elements in it, we need to add a custom handler on activation to prevent drag
 * when something like a button is clicked.
 */
MouseSensor.activators = [
  {
    eventName: 'onMouseDown',
    handler: ({ nativeEvent: event }: MouseEvent) => {
      const element = event.target as HTMLElement;
      let cur: HTMLElement | null = element;

      while (cur) {
        /**
         * Block Dnd if element has data-no-dnd attribute. Used so open button and
         * slot props can still be clickable inside the drag target
         */
        if (cur.dataset.noDnd) {
          return false;
        }
        cur = cur.parentElement;
      }

      return true;
    },
  },
];

export function DragProvider({
  children,
  onDragEnd,
}: DragProviderProps): ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null); // which element is 'picked up'
  const childrenArray = React.Children.toArray(children);
  const sensors = useSensors(useSensor(MouseSensor));
  const childrenRef = useRef<null | HTMLDivElement>(null);

  /**
   * List of child IDs that will be sortable. This is passed to SortableContext
   * and is needed so that dnd-kit can properly calculate 'active' and 'above'
   * elements during drag.
   */
  const items = useMemo(() => {
    return childrenArray.map(
      child => (child as React.ReactElement).props.dragId,
    );
  }, [childrenArray]);

  /**
   * Children are parsed through to set the `key` of each child and to
   * properly set the state so that correct styling is applied.
   */
  const childrenElements = useMemo(
    () =>
      childrenArray.map(child => {
        const dragId = (child as React.ReactElement).props?.dragId;

        return cloneElement(
          child as React.ReactElement,
          dragId
            ? {
                key: dragId,
                state: activeId === dragId ? 'dragging' : 'unset',
              }
            : {},
        );
      }),
    [activeId, childrenArray],
  );

  /**
   * When a user "picks up" a draggable component, `DragOverlay` is rendered as
   * the component that moves around while the user drags. In order to match the
   * underlying component, we must find that component and duplicate it.
   */
  const activeElement = useMemo(() => {
    if (!activeId || childrenArray.length < 1) {
      return null;
    }

    const elem = childrenArray.find(
      child => (child as React.ReactElement).props.dragId === activeId,
    ) as React.ReactElement;

    const overlayProps: { state: string; isOpen?: boolean } = {
      state: 'overlay',
    };

    const openState = findDragElementOpenState(childrenRef.current!, activeId);

    if (openState !== null) {
      overlayProps.isOpen = openState;
    }

    return cloneElement(elem, overlayProps);
  }, [activeId, childrenArray]);

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    onDragEnd?.({ active: active.id, over: over.id });
    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div ref={childrenRef}>{childrenElements}</div>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>{activeElement}</DragOverlay>
    </DndContext>
  );
}
