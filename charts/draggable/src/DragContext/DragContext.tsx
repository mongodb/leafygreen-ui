import React, {
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useState,
} from 'react';
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
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
  items,
  onDragEnd,
}: PropsWithChildren<{
  items: Array<UniqueIdentifier>;
  onDragEnd?(event: { active: string; over: string }): void;
}>): ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const childrenElements = React.Children.toArray(children).map(child => {
    const key = (child as React.ReactElement).props?.key;
    return cloneElement(child as React.ReactElement, {
      key,
      state: activeId === key ? 'dragging' : 'unset',
    });
  });

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

        <DragOverlay dropAnimation={dropAnimation}>
          {activeId
            ? cloneElement(
                React.Children.toArray(children).find(
                  child => (child as React.ReactElement).props.id === activeId,
                ) as React.ReactElement,
                {
                  state: 'overlay',
                },
              )
            : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
