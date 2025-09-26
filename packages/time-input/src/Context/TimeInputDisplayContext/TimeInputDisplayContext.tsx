import { createContext } from 'react';
import { TimeInputDisplayContextProps } from './TimeInputDisplayContext.types';

export const TimeInputDisplayContext =
  createContext<TimeInputDisplayContextProps>({});

export const TimeInputDisplayProvider = ({
  children,
  ...props
}: PropsWithChildren<TimeInputDisplayProviderProps>) => {
  return (
    <TimeInputDisplayContext.Provider value={props}>
      {children}
    </TimeInputDisplayContext.Provider>
  );
};

export const useTimeInputDisplayContext = () => {
  return useContext(TimeInputDisplayContext);
};
