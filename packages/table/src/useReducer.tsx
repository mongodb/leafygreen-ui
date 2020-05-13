import { Reducer } from 'react';
import { State } from './utils';

const alphanumericCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

const sortFunction = ({
  data,
  key,
  direction,
}: {
  data: Array<any>;
  key: string;
  direction: 'asc' | 'desc';
}) => {
  return data.sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (direction !== 'desc') {
      return alphanumericCollator.compare(aVal, bVal);
    }

    return alphanumericCollator.compare(bVal, aVal);
  });
};

// type Action =
//   | { type: 'IS_SELECTABLE_TABLE' }
//   | { type: 'SWITCH_CHECKMARK' }
//   | { type: 'ADD_STICKY_COLUMN' }
//   | { type: 'SORT' };

const Types = {
  SelectableTable: 'SELECTABLE_TABLE',
  ToggleMainChecked: 'TOGGLE_MAIN_CHECKED',
  AddStickyColumnIndex: 'ADD_STICKY_COLUMN_INDEX',
  SortTableData: 'SORT_TABLE_DATA',
} as const;

type Types = typeof Types[keyof typeof Types];

interface ActionPayload {
  [Types.SelectableTable]: boolean;
  [Types.ToggleMainChecked]: boolean;
  [Types.AddStickyColumnIndex]: number;
  [Types.SortTableData]: {
    columnId: number;
    key: string;
    data: Array<any>;
  };
}

type ActionMap<A extends { [key: string]: any }> = {
  [Key in keyof A]: A[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: A[Key];
      };
};

type ActionType = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

export function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case Types.SelectableTable:
      return {
        ...state,
        selectable: action.payload,
      };
    case Types.ToggleMainChecked:
      return {
        ...state,
        mainCheckState: !state.mainCheckState,
      };
    case Types.AddStickyColumnIndex:
      return {
        ...state,
        stickyColumns: [...state.stickyColumns, action.payload],
      };
    case Types.SortTableData:
      return {
        ...state,
        sort: {
          columnId: action.payload.columnId,
          direction: state.sort.direction === 'desc' ? 'asc' : 'desc',
          key: action.payload.key,
        },
        data: sortFunction({
          data: action.payload.data,
          direction: state.sort.direction === 'desc' ? 'asc' : 'desc',
          key: action.payload.key,
        }),
      };
    default:
      return state;
  }
}
