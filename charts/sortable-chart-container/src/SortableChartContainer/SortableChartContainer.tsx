import React, {
  PropsWithChildren,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import {
  closestCenter,
  DndContext,
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

export function SortableChartContainer({
  children,
}: PropsWithChildren<{}>): ReactElement {
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
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortableIds}
          strategy={verticalListSortingStrategy}
        >
          {childrenArray}
        </SortableContext>
      </DndContext>
    </>
  );

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
  }
}
