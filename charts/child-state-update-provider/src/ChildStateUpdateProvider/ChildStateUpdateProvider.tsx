import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from 'react';

interface ChildStateUpdateType {
  [statePropName: string]: any;
}

const childStateUpdateContext = createContext<{
  updateChildState: (id: string, stateUpdate: ChildStateUpdateType) => void;
  childStateUpdates: ChildStateUpdateType;
}>({
  childStateUpdates: {},
  updateChildState: () => {},
});

export function useChildStateUpdateContext() {
  return useContext(childStateUpdateContext);
}

export function ChildStateUpdateProvider({ children }: PropsWithChildren<{}>) {
  const [childStateUpdates, setChildStateUpdates] = React.useState<{
    [id: string]: ChildStateUpdateType;
  }>({});

  const updateChildState = useCallback(
    (id: string, stateUpdate: ChildStateUpdateType) => {
      setChildStateUpdates(prev => ({
        ...prev,
        [id]: { ...prev[id], ...stateUpdate },
      }));
    },
    [],
  );

  return (
    <childStateUpdateContext.Provider
      value={{ updateChildState, childStateUpdates }}
    >
      {children}
    </childStateUpdateContext.Provider>
  );
}
