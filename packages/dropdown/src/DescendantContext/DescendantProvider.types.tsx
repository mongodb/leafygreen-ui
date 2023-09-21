import { ItemProps } from '../types';

export type Id = string;

export type SharedProperties = ItemProps & { _internalId: Id };

export type ListElement = SharedProperties & {
  element: HTMLElement;
};

export type List = Array<ListElement>;

export type Map = Record<Id, SharedProperties>;

export interface UseDescendantsContext {
  ref: React.RefObject<HTMLElement | undefined>;
  list: React.RefObject<List>;
  map: React.RefObject<Map>;
  force: (arg: {}) => void;
}
