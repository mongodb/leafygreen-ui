interface Sort {
  columnId?: number;
  direction: 'asc' | 'desc';
  key?: string;
}

export interface State {
  sort: Sort;
  data: Array<any>;
  stickyColumns: Array<number>;
  selectable: boolean;
  mainCheckState: boolean;
}

export const coerceArray = (arg: any) => {
  if (Array.isArray(arg)) {
    return [...arg];
  } else {
    return [arg];
  }
};
