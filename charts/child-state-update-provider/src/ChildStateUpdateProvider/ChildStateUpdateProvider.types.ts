import { PropsWithChildren } from 'react';

export type DragProviderProps = PropsWithChildren<{
  onDragEnd?(event: { active: string; over: string }): void;
}>;
