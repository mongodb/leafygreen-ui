import { PropsWithChildren } from 'react';

export type DragProviderProps = PropsWithChildren<{
  onDragStart?(event: { active: string }): void;
  onDragEnd?(event: { active: string; over: string }): void;
}>;
