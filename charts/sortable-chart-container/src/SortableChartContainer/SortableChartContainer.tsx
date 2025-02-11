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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5', // Keeps placeholder component opaque while overlay drops into it
      },
    },
  }),
};

export function SortableChartContainer({
  children,
}: PropsWithChildren<{}>): ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [childrenArray, setChildrenArray] = useState(
    React.Children.toArray(children),
  );

  const sortableIds = useMemo(
    () =>
      childrenArray.reduce<Array<number>>((ids, child) => {
        if ((child as React.ReactElement).props?.sortId) {
          ids.push((child as ReactElement).props?.sortId);
        }

        return ids;
      }, []),
    [childrenArray],
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortableIds}
          strategy={verticalListSortingStrategy}
        >
          {childrenArray.map(child => {
            const sortId = (child as React.ReactElement).props?.sortId;
            return cloneElement(child as React.ReactElement, {
              key: sortId,
              state: activeId === sortId ? 'dragging' : 'unset',
            });
          })}
        </SortableContext>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeId
            ? cloneElement(
                childrenArray.find(
                  child =>
                    (child as React.ReactElement).props.sortId === activeId,
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

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setChildrenArray(currentChildren => {
        const oldIndex = currentChildren.findIndex(
          child => (child as React.ReactElement).props?.sortId === active.id,
        );
        const newIndex = currentChildren.findIndex(
          child => (child as React.ReactElement).props?.sortId === over.id,
        );

        return arrayMove(currentChildren, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
}
