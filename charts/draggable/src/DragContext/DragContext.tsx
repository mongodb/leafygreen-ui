import React, {
  cloneElement,
  PropsWithChildren,
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
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.3', // Keeps placeholder component opaque while overlay drops into it
      },
    },
  }),
};

export function DragContext({
  children,
  onDragEnd,
}: PropsWithChildren<{
  onDragEnd?(event: { active: string; over: string }): void;
}>): ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null);
  const childrenArray = React.Children.toArray(children);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const items = useMemo(() => {
    return childrenArray.map(
      child => (child as React.ReactElement).props.dragId,
    );
  }, [childrenArray]);

  const childrenElements = useMemo(
    () =>
      childrenArray.map(child => {
        const dragId = (child as React.ReactElement).props?.dragId;
        return cloneElement(child as React.ReactElement, {
          key: dragId,
          state: activeId === dragId ? 'dragging' : 'unset',
        });
      }),
    [activeId, childrenArray],
  );

  const activeElement = useMemo(() => {
    return activeId && childrenArray.length
      ? cloneElement(
          childrenArray.find(
            child => (child as React.ReactElement).props.dragId === activeId,
          ) as React.ReactElement,
          {
            state: 'overlay',
          },
        )
      : null;
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
    <>
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
    </>
  );
}
