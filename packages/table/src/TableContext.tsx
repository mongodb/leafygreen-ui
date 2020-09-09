import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from 'react';

const TableActionTypes = {
  RegisterColumn: 'REGISTER_COLUMN_INFO',
  SortTableData: 'SORT_TABLE_DATA',
  SetHasNestedRows: 'SET_HAS_NESTED_ROWS',
  SetHasRowSpan: 'SET_HAS_ROW_SPAN',
  SetData: 'SET_DATA',
} as const;

type TableActionTypes = typeof TableActionTypes[keyof typeof TableActionTypes];

export { TableActionTypes };

interface ActionPayload {
  [TableActionTypes.RegisterColumn]: {
    dataType?: DataType;
    index: number;
  };
  [TableActionTypes.SetData]: Array<any>;
  [TableActionTypes.SetHasRowSpan]: boolean;
  [TableActionTypes.SetHasNestedRows]: boolean;
  [TableActionTypes.SortTableData]: {
    columnId: number;
    accessorValue: (data: any) => string;
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
  direction?: 'asc' | 'desc';
  accessorValue?: (data: any) => string;
}

const DataType = {
  Number: 'number',
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
  columnInfo?: Record<number, { dataType?: DataType }>;
  hasNestedRows?: boolean;
  hasRowSpan?: boolean;
}

interface TableProviderInterface {
  children: React.ReactNode;
  data: Array<any>;
}

interface ContextInterface {
  state: State;
  dispatch: Dispatch;
}

const TableContext = createContext<ContextInterface>({
  state: {
    data: [],
  },
  dispatch: () => {},
});

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case TableActionTypes.SetHasRowSpan:
      return {
        ...state,
        hasRowSpan: action.payload,
      };

    case TableActionTypes.SetHasNestedRows:
      return {
        ...state,
        hasNestedRows: action.payload,
      };

    case TableActionTypes.RegisterColumn:
      return {
        ...state,
        columnInfo: {
          ...state.columnInfo,
          [action.payload.index]: {
            dataType: action.payload.dataType,
          },
        },
      };

    case TableActionTypes.SetData:
      return {
        ...state,
        data: action.payload,
      };

    case TableActionTypes.SortTableData:
      return {
        ...state,
        sort: {
          columnId: action.payload.columnId,
          direction: state.sort?.direction === 'desc' ? 'asc' : 'desc',
          accessorValue: action.payload.accessorValue,
        },
      };

    default:
      return state;
  }
}

export function TableProvider({ children, data }: TableProviderInterface) {
  const initialState: State = {
    sort: {
      direction: undefined,
    },
    data,
    hasNestedRows: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: TableActionTypes.SetData,
      payload: data,
    });
  }, [data]);

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

export const getDataComparisonFunction = <T extends {}>({
  accessorValue,
  direction,
}: {
  accessorValue: (data: T) => string;
  direction: 'asc' | 'desc';
}) => {
  return (a: T, b: T) => {
    const aVal = accessorValue(a);
    const bVal = accessorValue(b);

    if (direction !== 'desc') {
      return alphanumericCollator.compare(aVal, bVal);
    }

    return alphanumericCollator.compare(bVal, aVal);
  };
};
