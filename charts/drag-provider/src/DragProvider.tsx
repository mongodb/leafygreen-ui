import React from 'react';
import { ChildStateUpdateProvider } from '@lg-charts/child-state-update-provider';

import { DndKitProvider } from './DndKitProvider';
import { DragProviderProps } from './DragProvider.types';

export function DragProvider({ children, onDragEnd }: DragProviderProps) {
  return (
    <ChildStateUpdateProvider>
      <DndKitProvider onDragEnd={onDragEnd}>{children}</DndKitProvider>
    </ChildStateUpdateProvider>
  );
}
