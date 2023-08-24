import { createContext, useContext } from 'react';

import { DatePickerContextProps } from './DatePickerContext.types';

export const DatePickerContext = createContext<DatePickerContextProps>({});
export const DatePickerProvider = DatePickerContext.Provider;
export const useDatePickerContext = () => useContext(DatePickerContext);
