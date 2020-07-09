import React, { createContext, useContext, useMemo } from 'react';

const Types = {
  SelectableTable: 'SELECTABLE_TABLE',
  ToggleHeaderCheckedState: 'TOGGLE_HEADER_CHECKED',
  ToggleHeaderIndeterminate: 'TOGGLE_HEADER_INDETERMINATE',
  SetColumnInfo: 'SET_COLUMN_INFO',
  SortTableData: 'SORT_TABLE_DATA',
  ToggleIndividualChecked: 'TOGGLE_INDIVIDUAL_CHECKED',
  SetHasNestedRows: 'SET_HAS_NESTED_ROWS',
  SetHasRowSpan: 'SET_HAS_ROW_SPAN',
} as const;

type Types = typeof Types[keyof typeof Types];

export { Types };

interface ActionPayload {
  [Types.SelectableTable]: boolean;
  [Types.ToggleHeaderCheckedState]: boolean | undefined;
  [Types.ToggleHeaderIndeterminate]: boolean;
  [Types.SetColumnInfo]: {
    dataType?: DataType;
    index: number;
  };
  [Types.SetHasRowSpan]: boolean;
  [Types.SetHasNestedRows]: boolean;
  [Types.SortTableData]: {
    columnId: number;
    key: string;
    data: Array<unknown>;
  };
  [Types.ToggleIndividualChecked]: {
    index: number;
    checked?: boolean;
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
  key?: string;
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
  headerCheckState?: boolean;
  headerIndeterminate?: boolean;
  rowCheckedState?: Record<number, boolean>;
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
  state: {},
  dispatch: () => {},
});

export function reducer(state: State, action: Action): State {
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

    case Types.ToggleIndividualChecked:
      return {
        ...state,
        rowCheckedState: {
          ...state.rowCheckedState,
          [action.payload.index]: action.payload.checked,
        },
      };

    case Types.SelectableTable:
      return {
        ...state,
        selectable: action.payload,
      };

    case Types.ToggleHeaderCheckedState:
      return {
        ...state,
        headerCheckState: action.payload ?? !state.headerCheckState,
        headerIndeterminate: false,
      };

    case Types.ToggleHeaderIndeterminate:
      return {
        ...state,
        headerIndeterminate: action.payload,
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
          key: action.payload.key,
        },
        data: sortFunction({
          data: action.payload.data,
          direction: state.sort?.direction === 'desc' ? 'asc' : 'desc',
          key: action.payload.key,
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

const alphanumericCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export const sortFunction = ({
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
