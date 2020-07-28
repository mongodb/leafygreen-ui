import React, { createContext, useContext, useMemo, useReducer } from 'react';

const Types = {
  ToggleHeaderCheckedState: 'TOGGLE_HEADER_CHECKED',
  ToggleIndividualChecked: 'TOGGLE_INDIVIDUAL_CHECKED',
  ToggleIndividualDisabled: 'TOGGLE_INDIVIDUAL_DISABLED',
  RegisterRow: 'REGISTER_ROW',
} as const;

type Types = typeof Types[keyof typeof Types];

export { Types };

interface ActionPayload {
  [Types.ToggleHeaderCheckedState]: undefined;
  [Types.ToggleIndividualChecked]: {
    index: string;
    checked: boolean;
  };
  [Types.ToggleIndividualDisabled]: {
    index: string;
    disabled: boolean;
  };
  [Types.RegisterRow]: {
    index: string;
    checked?: boolean;
    disabled: boolean;
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

export interface State {
  headerCheckState: {
    checked: boolean;
    indeterminate: boolean;
  };
  rowState: Record<string, { checked: boolean; disabled: boolean }>;
}

interface RowProviderInterface {
  children: React.ReactNode;
}

interface ContextInterface {
  state: State;
  dispatch: Dispatch;
}

const RowContext = createContext<ContextInterface>({
  state: {
    rowState: {},
    headerCheckState: { checked: false, indeterminate: false },
  },
  dispatch: () => {},
});

export function reducer(state: State, action: Action): State {
  let rowState;

  switch (action.type) {
    case Types.RegisterRow:
      rowState = {
        ...state.rowState,
        [action.payload.index]: {
          disabled: action.payload.disabled,
          checked:
            action.payload.checked != null
              ? action.payload.checked
              : state.rowState[action.payload.index].checked,
        },
      };

      return {
        ...state,
        rowState,
      };

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
        rowState: setEveryRowState(
          state.rowState,
          !state.headerCheckState.checked,
        ),
      };

    default:
      return { ...state };
  }
}

export function RowProvider({ children }: RowProviderInterface) {
  const initialState: State = {
    headerCheckState: {
      checked: false,
      indeterminate: false,
    },

    rowState: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <RowContext.Provider value={contextValue}>{children}</RowContext.Provider>
  );
}

export function useRowContext() {
  return useContext(RowContext);
}

const setHeaderCheckedStateOnRowChecked = (
  { headerCheckState }: State,
  newRowState: State['rowState'],
): State['headerCheckState'] => {
  if (headerCheckState.indeterminate) {
    const boolArray = Object.values(newRowState).filter(
      newRowObjects => !newRowObjects.disabled,
    );

    console.log('here', boolArray);

    const checkSame = boolArray.every(
      val => val.checked === boolArray[0].checked,
    );

    return {
      indeterminate: !checkSame,
      checked: boolArray[0].checked,
    };
  }

  return {
    checked: false,
    indeterminate: true,
  };
};

const setEveryRowState = (
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
