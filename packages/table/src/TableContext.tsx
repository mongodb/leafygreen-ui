import React, { createContext, useContext, useMemo } from 'react';

const Types = {
  SelectableTable: 'SELECTABLE_TABLE',
  ToggleHeaderCheckedState: 'TOGGLE_HEADER_CHECKED',
  SetColumnInfo: 'SET_COLUMN_INFO',
  SortTableData: 'SORT_TABLE_DATA',
  ToggleIndividualChecked: 'TOGGLE_INDIVIDUAL_CHECKED',
  ToggleIndividualDisabled: 'TOGGLE_INDIVIDUAL_DISABLED',
  SetHasNestedRows: 'SET_HAS_NESTED_ROWS',
  SetHasRowSpan: 'SET_HAS_ROW_SPAN',
  RegisterRow: 'REGISTER_ROW',
} as const;

type Types = typeof Types[keyof typeof Types];

export { Types };

interface ActionPayload {
  [Types.SelectableTable]: boolean;
  [Types.ToggleHeaderCheckedState]: undefined;
  [Types.ToggleIndividualChecked]: {
    index: number;
    checked: boolean;
  };
  [Types.ToggleIndividualDisabled]: {
    index: number;
    disabled: boolean;
  };
  [Types.RegisterRow]: {
    index: number;
    checked?: boolean;
    disabled?: boolean;
  };
  [Types.SetColumnInfo]: {
    dataType?: DataType;
    index: number;
  };
  [Types.SetHasRowSpan]: boolean;
  [Types.SetHasNestedRows]: boolean;
  [Types.SortTableData]: {
    columnId: number;
    accessorValue: () => string;
    data: Array<unknown>;
  };
}

type ActionMap<A extends Record<string, any>> = {
  [Key in keyof A]: A[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: A[Key];
      };
};

type Action = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

type Dispatch = (action: Action) => void;

interface Sort {
  columnId?: number;
  direction: 'asc' | 'desc';
  accessorValue?: () => string;
}

const DataType = {
  Number: 'Number',
  Quantity: 'quantity',
  Weight: 'weight',
  ZipCode: 'zipCode',
  String: 'string',
  Date: 'date',
} as const;

type DataType = typeof DataType[keyof typeof DataType];

export { DataType };

export interface State {
  sort?: Sort;
  data: Array<any>;
  columnInfo?: {
    [k in number]: { dataType?: DataType };
  };
  selectable?: boolean;
  headerCheckState: {
    checked: boolean;
    indeterminate: boolean;
  };
  rowState: Record<number, { checked: boolean; disabled: boolean }>;
  hasNestedRows?: boolean;
  hasRowSpan?: boolean;
}

interface TableProviderInterface {
  children: React.ReactNode;
  state: State;
  dispatch: Dispatch;
}

interface ContextInterface {
  state: State;
  dispatch: Dispatch;
}

const TableContext = createContext<ContextInterface>({
  state: {
    data: [],
    rowState: {},
    headerCheckState: { checked: false, indeterminate: false },
  },
  dispatch: () => {},
});

export function reducer(state: State, action: Action): State {
  let rowState;
  // const currentRow = state.rowState[action?.payload.index]

  switch (action.type) {
    case Types.SetHasRowSpan:
      return {
        ...state,
        hasRowSpan: action.payload,
      };

    case Types.SetHasNestedRows:
      return {
        ...state,
        hasNestedRows: action.payload,
      };

    case Types.RegisterRow:
      return Object.assign({}, state, {
        rowState: {
          ...state.rowState,
          [action.payload.index]: {
            disabled: action.payload.disabled,
            checked: action.payload.checked,
          },
        },
      });

    case Types.ToggleIndividualDisabled:
      rowState = {
        ...state.rowState,
        [action.payload.index]: {
          ...state.rowState[action.payload.index],
          disabled: action.payload.disabled,
        },
      };

      return {
        ...state,
        rowState,
      };

    case Types.ToggleIndividualChecked:
      rowState = {
        ...state.rowState,
        [action.payload.index]: {
          ...state.rowState[action.payload.index],
          checked: state.rowState[action.payload.index].disabled
            ? false
            : action.payload.checked,
        },
      };

      return {
        ...state,
        rowState,
        headerCheckState: setHeaderCheckedStateOnRowChecked(state, rowState),
      };

    case Types.ToggleHeaderCheckedState:
      return {
        ...state,
        headerCheckState: {
          indeterminate: false,
          checked: !state.headerCheckState.checked,
        },
        rowState: setEveryrowState(
          state.rowState,
          !state.headerCheckState.checked,
        ),
      };

    case Types.SelectableTable:
      return {
        ...state,
        selectable: action.payload,
      };

    case Types.SetColumnInfo:
      return {
        ...state,
        columnInfo: {
          ...state.columnInfo,
          [action.payload.index]: {
            dataType: action.payload.dataType,
          },
        },
      };

    case Types.SortTableData:
      return {
        ...state,
        sort: {
          columnId: action.payload.columnId,
          direction: state.sort?.direction === 'desc' ? 'asc' : 'desc',
          accessorValue: action.payload.accessorValue,
        },
        data: sortFunction({
          data: action.payload.data,
          direction: state.sort?.direction === 'desc' ? 'asc' : 'desc',
          accessorValue: action.payload.accessorValue,
        }),
      };

    default:
      return { ...state };
  }
}

export function TableProvider({
  children,
  state,
  dispatch,
}: TableProviderInterface) {
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
}

export function useTableContext() {
  return useContext(TableContext);
}

const setHeaderCheckedStateOnRowChecked = (
  { headerCheckState }: State,
  newrowState: State['rowState'],
): State['headerCheckState'] => {
  if (headerCheckState.indeterminate) {
    const boolArray = Object.values(newrowState);
    const checkSame = boolArray.every(
      val => val.checked === boolArray[0].checked,
    );

    return {
      indeterminate: !checkSame,
      checked: boolArray[0].checked,
    };
  }

  return {
    checked: !headerCheckState.checked,
    indeterminate: true,
  };
};

const setEveryrowState = (
  currentRowState: State['rowState'],
  newCheckedState: boolean,
) => {
  const updatedRowState: State['rowState'] = currentRowState;
  let key: any;

  for (key in currentRowState) {
    updatedRowState[key].checked = updatedRowState[key].disabled
      ? false
      : newCheckedState;
  }

  return updatedRowState;
};

const alphanumericCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export const sortFunction = ({
  data,
  accessorValue,
  direction,
}: {
  data: Array<any>;
  accessorValue: (data: any) => string;
  direction: 'asc' | 'desc';
}) => {
  return data.sort((a, b) => {
    const aVal = accessorValue(a);
    const bVal = accessorValue(b);

    if (direction !== 'desc') {
      return alphanumericCollator.compare(aVal, bVal);
    }

    return alphanumericCollator.compare(bVal, aVal);
  });
};
