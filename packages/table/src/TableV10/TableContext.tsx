import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const TableActionTypes = {
  RegisterColumn: 'REGISTER_COLUMN_INFO',
  SetHasNestedRows: 'SET_HAS_NESTED_ROWS',
  SetHasRowSpan: 'SET_HAS_ROW_SPAN',
  SetData: 'SET_DATA',
} as const;

/**
 * @deprecated
 */
type TableActionTypes =
  (typeof TableActionTypes)[keyof typeof TableActionTypes];

export { TableActionTypes };

/**
 * @deprecated
 */
interface ActionPayload {
  [TableActionTypes.RegisterColumn]: {
    dataType?: DataType;
    index: number;
  };
  [TableActionTypes.SetData]: Array<any>;
  [TableActionTypes.SetHasRowSpan]: boolean;
  [TableActionTypes.SetHasNestedRows]: boolean;
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

const DataType = {
  Number: 'number',
  Weight: 'weight',
  ZipCode: 'zipCode',
  String: 'string',
  Date: 'date',
} as const;

type DataType = (typeof DataType)[keyof typeof DataType];

export { DataType };

/**
 * @deprecated
 */
export interface State {
  data: Array<any>;
  columnInfo?: Record<number, { dataType?: DataType }>;
  hasNestedRows?: boolean;
  hasRowSpan?: boolean;
}

/**
 * @deprecated
 */
interface TableProviderInterface {
  children: React.ReactNode;
  data: Array<any>;
}

/**
 * @deprecated
 */
interface ContextInterface {
  state: State;
  dispatch: Dispatch;
}

/**
 * @deprecated
 */
const TableContext = createContext<ContextInterface>({
  state: {
    data: [],
  },
  dispatch: () => {},
});

/**
 * @deprecated
 */
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

    default:
      return state;
  }
}

export function TableProvider({ children, data }: TableProviderInterface) {
  const initialState: State = {
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
