import React, {
  cloneElement,
  type MouseEvent,
  ReactElement,
  useMemo,
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
import { useChildStateUpdateContext } from '@lg-charts/child-state-update-provider';

import { DragProviderProps } from '../DragProvider.types';

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

export function DndKitProvider({
  children,
  onDragEnd,
}: DragProviderProps): ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null); // which element is 'picked up'
  const { childStateUpdates } = useChildStateUpdateContext();
  const childrenArray = React.Children.toArray(children);
  const sensors = useSensors(useSensor(MouseSensor));

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

    return cloneElement(elem, {
      state: 'overlay',
      /**
       * If a child's state updates internally and it triggers a visual change,
       * such as when an uncontrolled `ChartCard` opens or closes, we have no
       * way of knowing about this change. So we register those changes from
       * `ChartCard` and apply them here so that the "picked up" component
       * always matches the underlying.
       */
      ...childStateUpdates[activeId],
    });
  }, [activeId, childStateUpdates, childrenArray]);

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
        {childrenElements}
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>{activeElement}</DragOverlay>
    </DndContext>
  );
}
