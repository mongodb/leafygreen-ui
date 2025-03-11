import React from 'react';

import { DndKitProvider } from './DndKitProvider';
import { DragProviderProps } from './DragProvider.types';

export function DragProvider({ children, onDragEnd }: DragProviderProps) {
  return <DndKitProvider onDragEnd={onDragEnd}>{children}</DndKitProvider>;
}
